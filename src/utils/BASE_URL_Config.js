// This file contains the base URL configuration for the application.
// It sets the base URL based on the environment mode (development or production).
// The URL is used for making API requests or linking to resources.
export const BASE_URL =
    import.meta.env.MODE === "development"
        ? "http://192.168.1.5:5173"
        : "https://moviesreactalfa.netlify.app";
