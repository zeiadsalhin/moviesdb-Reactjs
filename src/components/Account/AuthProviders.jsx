import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Box, Button, Typography, Stack } from "@mui/material";
import { Google, GitHub } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../../utils/BASE_URL_Config";

const providerDetails = {
  google: { name: "Google", color: "#4285F4", icon: <Google fontSize="small" /> },
  github: { name: "GitHub", color: "#222", icon: <GitHub fontSize="small" /> },
};

const AuthProviders = ({ passAuth }) => {
  const [linkedProviders, setLinkedProviders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLinkedProviders();
  }, []);

  const fetchLinkedProviders = async () => {
    const { data, error } = await passAuth.auth.getUserIdentities();
    if (error) {
      toast.error("Failed to fetch linked providers.", { position: "top-center", autoClose: 2000, theme: "dark" });
      return;
    }
    setLinkedProviders(data?.identities?.map((id) => id.provider) || []);
  };

  const handleProviderAction = async (provider, isLinked) => {
    setLoading(true);

    if (!isLinked) {
      const { error } = await passAuth.auth.linkIdentity({ 
        provider, 
        options: { 
            redirectTo: `${BASE_URL}/account/profile` }, 
        });
      if (error) {
        toast.error(error.message, { position: "top-center", autoClose: 2000, theme: "dark" });
        setLoading(false);
      } else {
        fetchLinkedProviders();
      }
    } else {
      const { data, error: fetchError } = await passAuth.auth.getUserIdentities();
      if (fetchError) {
        toast.error("Failed to fetch user identities.", { position: "top-center", autoClose: 2000, theme: "dark" });
        setLoading(false);
        return;
      }

      const identityToUnlink = data?.identities?.find((identity) => identity.provider === provider);
      if (!identityToUnlink) {
        toast.error(`No linked ${provider} account found.`, { position: "top-center", autoClose: 2000, theme: "dark" });
        setLoading(false);
        return;
      }

      const { error } = await passAuth.auth.unlinkIdentity(identityToUnlink);
      if (error) {
        toast.error(error.message, { position: "top-center", autoClose: 2000, theme: "dark" });
        setLoading(false);
      } else {
        toast.success(`${providerDetails[provider].name} unlinked successfully!`, { position: "top-center", autoClose: 2000, theme: "dark" });
        fetchLinkedProviders();
        setLoading(false);
      }
    }

  };

  return (
    <>
      <ToastContainer />
      <Box
        sx={{
          mt: 3,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: { xs: "100%", sm: 500 }, // Full width on mobile, limited on desktop
          marginInline: "auto"
        }}
      >
        <Typography variant="h6" sx={{ mb: 1.5, color: "#fff", fontWeight: "bold" }}>
          Manage Linked Accounts
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: "#bbb" }}>
          Link your social account for an easier sign-in experience.
          You can also unlink them at any time.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            width: "100%",
            justifyContent: "center",
          }}
        >
          {Object.keys(providerDetails).map((provider) => {
            const isLinked = linkedProviders.includes(provider);
            return (
              <Button
                key={provider}
                variant="contained"
                startIcon={providerDetails[provider].icon}
                onClick={() => handleProviderAction(provider, isLinked)}
                disabled={loading}
                sx={{
                  flexGrow: 1, // Makes buttons equal width in row layout
                  backgroundColor: isLinked ? "#555" : providerDetails[provider].color,
                  "&:hover": { backgroundColor: isLinked ? "#777" : providerDetails[provider].color },
                  color: "#fff",
                  fontWeight: "bold",
                  textTransform: "none",
                  py: 1.2, // Adjust button height
                  borderRadius: "8px",
                }}
              >
                {isLinked ? `Unlink ${providerDetails[provider].name}` : `Link ${providerDetails[provider].name}`}
              </Button>
            );
          })}
        </Stack>

      </Box>
    </>
  );
};

AuthProviders.propTypes = {
  passAuth: PropTypes.object.isRequired,
};

export default AuthProviders;
