import { supabase } from "../utils/authConfig";

// Fetch user info from your custom table (e.g., user_profiles)
export const getUserProfile = async (userId) => {
    try {
        const { data, error } = await supabase
            .from("user_profiles") // replace with your table name
            .select("*")
            .eq("id", userId) // or use "user_id" based on your schema
            .single();

        if (error) {
            throw error;
        }

        return data;
    } catch (err) {
        console.error("Error fetching user profile:", err.message);
        return null;
    }
};
