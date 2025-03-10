export const generateRandomUsername = async () => {
    const adjectives = ["Cool", "Epic", "Fast", "Funky", "Brave", "Mysterious"];
    const nouns = ["Tiger", "Eagle", "Phoenix", "Ninja", "Shadow", "Voyager"];

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(Math.random() * 10000); // Ensures uniqueness

    return `${randomAdjective}${randomNoun}${randomNumber}`;
};
