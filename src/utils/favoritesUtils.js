import { supabase } from "./authConfig";

// Generic updateFavorites function
export const updateFavorites = async ({
    userId,
    column,
    itemId,
    action, // 'add' | 'remove' | 'toggle'
}) => {
    try {
        const { data, error: fetchError } = await supabase
            .from("user_profiles")
            .select(column)
            .eq("id", userId)
            .single();

        if (fetchError) throw fetchError;

        let currentList = data?.[column] || [];

        if (action === "add" && !currentList.includes(itemId)) {
            currentList.push(itemId);
        } else if (action === "remove") {
            currentList = currentList.filter(item => item !== itemId);
        } else if (action === "toggle") {
            currentList = currentList.includes(itemId)
                ? currentList.filter(item => item !== itemId)
                : [...currentList, itemId];
        }

        const { error: updateError } = await supabase
            .from("user_profiles")
            .update({ [column]: currentList })
            .eq("id", userId);

        if (updateError) throw updateError;

        return { success: true, updatedList: currentList };
    } catch (err) {
        console.error(`Error updating ${column}:`, err.message);
        return { success: false, error: err.message };
    }
};

// ✅ Specific helpers for Movies and TV using the generic util
export const toggleFavorite = (userId, type, itemId) => {
    const column = type === "movie" ? "favorite_movies" : "favorite_tv";
    return updateFavorites({ userId, column, itemId, action: "toggle" });
};

export const addFavorite = (userId, type, itemId) => {
    const column = type === "movie" ? "favorite_movies" : "favorite_tv";
    return updateFavorites({ userId, column, itemId, action: "add" });
};

export const removeFavorite = (userId, type, itemId) => {
    const column = type === "movie" ? "favorite_movies" : "favorite_tv";
    return updateFavorites({ userId, column, itemId, action: "remove" });
};

export const fetchFavorites = async (userId, type) => {
    const column = type === "movie" ? "favorite_movies" : "favorite_tv";

    try {
        const { data, error } = await supabase
            .from("user_profiles")
            .select(column)
            .eq("id", userId)
            .single();

        if (error) throw error;

        return { success: true, favorites: data?.[column] || [] };
    } catch (err) {
        console.error(`Error fetching ${column}:`, err.message);
        return { success: false, error: err.message };
    }
};
