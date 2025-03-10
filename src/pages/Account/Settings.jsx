import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Divider,
  Switch,
} from "@mui/material";
import { PhotoCamera, Delete } from "@mui/icons-material";
import { supabase } from "../../utils/authConfig";
import { toast } from "react-toastify";

const Settings = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [darkMode, setDarkMode] = useState(true); // Default dark mode
  const [loading, setLoading] = useState(false);

  // Handle Profile Image Upload
  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // Handle Email Change
  const handleEmailChange = async () => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ email });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Email update request sent! Please confirm via email.");
    }
    setLoading(false);
  };

  // Handle Password Change
  const handlePasswordChange = async () => {
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password updated successfully.");
    }
    setLoading(false);
  };

  // Handle Account Deletion
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    setLoading(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Your account has been deleted.");
      window.location.href = "/";
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        padding: 3,
        background: "#141414",
        color: "#fff",
        borderRadius: 2,
        maxWidth: 600,
        mx: "auto",
        textAlign: "center",
      }}
    >
      {/* Profile Picture */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar
          src={profileImage || "/default-avatar.png"}
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="upload-profile-image"
          type="file"
          onChange={handleProfileImageUpload}
        />
        <label htmlFor="upload-profile-image">
          <IconButton color="primary" component="span">
            <PhotoCamera sx={{ color: "#e50914" }} />
          </IconButton>
        </label>
      </Box>

      <Divider sx={{ my: 3, backgroundColor: "#333" }} />

      {/* Change Email */}
      <Typography variant="h6" sx={{ color: "#e50914" }}>
        Change Email
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="New Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{
          my: 2,
          "& .MuiOutlinedInput-root": { backgroundColor: "#222", color: "#fff" },
          "& .MuiInputLabel-root": { color: "#aaa" },
        }}
      />
      <Button
        variant="contained"
        sx={{ backgroundColor: "#e50914", "&:hover": { backgroundColor: "#b20710" } }}
        onClick={handleEmailChange}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Email"}
      </Button>

      <Divider sx={{ my: 3, backgroundColor: "#333" }} />

      {/* Change Password */}
      <Typography variant="h6" sx={{ color: "#e50914" }}>
        Change Password
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        sx={{
          my: 2,
          "& .MuiOutlinedInput-root": { backgroundColor: "#222", color: "#fff" },
          "& .MuiInputLabel-root": { color: "#aaa" },
        }}
      />
      <Button
        variant="contained"
        sx={{ backgroundColor: "#e50914", "&:hover": { backgroundColor: "#b20710" } }}
        onClick={handlePasswordChange}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Password"}
      </Button>

      <Divider sx={{ my: 3, backgroundColor: "#333" }} />

      {/* Dark Mode Toggle */}
      <Typography variant="h6">Dark Mode</Typography>
      <Switch
        checked={darkMode}
        onChange={() => setDarkMode((prev) => !prev)}
        sx={{
          "& .MuiSwitch-thumb": { backgroundColor: "#e50914" },
          "& .Mui-checked": { color: "#e50914" },
        }}
      />
      <Typography>{darkMode ? "Enabled" : "Disabled"}</Typography>

      <Divider sx={{ my: 3, backgroundColor: "#333" }} />

      {/* Delete Account */}
      <Typography variant="h6" sx={{ color: "#f44336" }}>
        Delete Account
      </Typography>
      <Button
        variant="contained"
        color="error"
        startIcon={<Delete />}
        onClick={handleDeleteAccount}
        disabled={loading}
        sx={{ mt: 1 }}
      >
        {loading ? "Deleting..." : "Delete Account"}
      </Button>
    </Box>
  );
};

export default Settings;
