import { supabase } from "./authConfig";

export const getFactorInfo = async () => {
    try {
        // ✅ Get AAL Level
        const { data: aalData, error: aalError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        if (aalError) {
            console.error("Error fetching AAL:", aalError.message);
            return { aalLevel: null, factorId: null };
        }

        // ✅ Get Enrolled TOTP Factors
        const { data: factorsData, error: factorsError } = await supabase.auth.mfa.listFactors();
        if (factorsError) {
            console.error("Error fetching factors:", factorsError.message);
            return { aalLevel: aalData?.currentLevel || null, factorId: null };
        }

        // console.log("Factors Data:", factorsData); // Debugging

        // Ensure factorsData.totp is an array before accessing
        const totpFactor = factorsData?.totp?.length > 0 ? factorsData.totp[0] : null;

        return {
            aalLevel: aalData?.currentLevel || null, // "aal1" or "aal2"
            factorId: totpFactor?.id || null, // Null if no TOTP factor is found
        };
    } catch (error) {
        console.error("Unexpected error in getFactorInfo:", error);
        return { aalLevel: null, factorId: null };
    }
};



// Start a 2FA Challenge
export const start2FAChallenge = async (factorId) => {
    if (!factorId) return { error: "No 2FA factor found." };
    const { data, error } = await supabase.auth.mfa.challenge({ factorId });
    return { challengeId: data?.id, error };
};

// Verify 2FA Code
export const verifyTOTPCode = async (factorId, challengeId, totpCode) => {
    if (!factorId || !challengeId || !totpCode) {
        return { error: "Invalid 2FA challenge request." };
    }
    return await supabase.auth.mfa.verify({ factorId, challengeId, code: totpCode });
};
