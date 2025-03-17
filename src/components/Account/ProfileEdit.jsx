import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Avatar, Box, Button, TextField, Typography, IconButton, Skeleton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

const ProfileEdit = ({ passAuth }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    avatar: "https://via.placeholder.com/100",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await passAuth.auth.getUser();
      if (data?.user) {
        setUser(data.user);

        setProfile((prev) => ({
          ...prev,
          name: data.user.user_metadata?.display_name || "Guest User",
          email: data.user.email || "your.email@example.com",
        }));

        fetchUserProfile(data.user.id);
      } else {
        console.error("Error fetching user:", error?.message);
      }
    };

    const fetchUserProfile = async (userId) => {
      const { data, error } = await passAuth
        .from("user_profiles")
        .select("avatar_url, bio")
        .eq("id", userId)
        .single();

      if (data) {
        setProfile((prev) => ({
          ...prev,
          bio: data.bio || prev.bio,
          avatar: data.avatar_url || prev.avatar,
        }));
      } else {
        console.error("Error fetching profile:", error?.message);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleEditClick = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setSelectedFile(null);
    setPreviewImage(null);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Set preview image
    }
  };

  const handleSave = async () => {
    if (!user?.id) return;
    setUploading(true);
    let avatarUrl = profile.avatar;

    // Upload new avatar if selected
    if (selectedFile) {
      const filePath = `${user.id}/profile/${selectedFile.name}`;
      const { error } = await passAuth.storage
        .from("avatars")
        .upload(filePath, selectedFile, { upsert: true });

      if (error) {
        console.error("Error uploading image:", error.message);
      } else {
        avatarUrl = passAuth.storage.from("avatars").getPublicUrl(filePath).data.publicUrl;
      }
    }

    // Update display name in passAuth Auth
    const { error: updateUserError } = await passAuth.auth.updateUser({
      data: { display_name: profile.name },
    });

    if (updateUserError) {
      console.error("Error updating display name:", updateUserError.message);
    }

    // Update bio and avatar in user_profiles table
    const { error: updateProfileError } = await passAuth
      .from("user_profiles")
      .update({ bio: profile.bio, avatar_url: avatarUrl })
      .eq("id", user.id);

    if (updateProfileError) {
      console.error("Error updating profile:", updateProfileError.message);
    } else {
      setProfile((prev) => ({ ...prev, avatar: avatarUrl }));
    }

    setUploading(false);
    setIsEditing(false);
    setPreviewImage(null);
  };

  return (
    <Box sx={{ textAlign: "center", mt: 3, p: 3, borderRadius: 2, backgroundColor: "rgba(0, 0, 0, 0.7)", maxWidth: 500, marginInline: "auto" }}>
      <Box sx={{ position: "relative", display: "inline-block" }}>
        
          {loading ? (
            <Skeleton variant="circular" width={100} height={100} sx={{ margin: "0 auto" }} />
          ) : (
            <Avatar
              src={previewImage || profile.avatar}
              alt={profile.name}
              sx={{ width: 100, height: 100, margin: "0 auto", mb: 2 }}
            />
          )}
          {isEditing && !loading && (
            <label htmlFor="upload-avatar">
            <IconButton
              sx={{
                position: "absolute",
                bottom: 10,
                right: 0,
                background: "rgba(0,0,0,0.6)",
                color: "#fff",
                "&:hover": { background: "rgba(0,0,0,0.8)" },
              }}
              component="span"
            >
              <EditIcon />
            </IconButton>
            </label>
          )}
        
        <input type="file" accept="image/*" id="upload-avatar" onChange={handleFileChange} style={{ display: "none" }} />
      </Box>

      {loading ? (
        <>
          <Skeleton width={120} height={30} sx={{ margin: "0 auto", mb: 1 }} />
          <Skeleton width={180} height={20} sx={{ margin: "0 auto", mb: 2 }} />
          <Skeleton width="80%" height={60} sx={{ margin: "0 auto", mb: 2 }} />
          <Skeleton width={150} height={40} sx={{ margin: "0 auto" }} />
        </>
      ) : isEditing ? (
        <>
          <TextField name="name" label="Display Name" value={profile.name} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField name="bio" label="Bio" value={profile.bio} onChange={handleChange} fullWidth multiline rows={2} sx={{ mb: 2 }} />
          <Button variant="contained" startIcon={<SaveIcon />} sx={{ mr: 2, backgroundColor: "#99050d", color: "#fff" }} onClick={handleSave} disabled={uploading}>
            {uploading ? "Uploading..." : "Save"}
          </Button>
          <Button variant="outlined" startIcon={<CloseIcon />} onClick={handleCancel}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h5">{profile.name}</Typography>
          <Typography variant="body2" sx={{ color: "#bbb", mb: 2 }}>{profile.email}</Typography>
          <Typography variant="body2" sx={{ color: "#fff", mb: 2 }}>{profile.bio}</Typography>
          <Button variant="contained" startIcon={<EditIcon />} sx={{ backgroundColor: "#99050d", color: "#fff" }} onClick={handleEditClick}>
            Edit Profile
          </Button>
        </>
      )}
    </Box>
  );
};

ProfileEdit.propTypes = {
  passAuth: PropTypes.object.isRequired,
};

export default ProfileEdit;
