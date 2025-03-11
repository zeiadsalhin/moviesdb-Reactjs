export const BASE_URL =
    import.meta.env.MODE === "development"
        ? "http://192.168.1.5:5173"
        : "https://moviesreactalfa.netlify.app";
