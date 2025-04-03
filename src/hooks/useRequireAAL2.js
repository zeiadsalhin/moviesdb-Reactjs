import { useEffect, useState } from "react";
import { supabase } from "../utils/authConfig";

// This hook checks if the user is authenticated with AAL2 (Authenticator Assurance Level 2)
// If the user is not authenticated with AAL2, it returns a boolean value indicating the status
// and a loading state. It does not redirect the user to the login page.
// This is useful for components that need to check the authentication level without redirecting the user.

// Instead of redirecting, return status
export const useRequireAAL2 = () => {
    const [isAAL1, setIsAAL1] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const checkAuthLevel = async () => {
            const { data: userData, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

            if (error) {
                // If error occurs, treat it like not authenticated
                setIsAAL1(true);
            } else {
                const authLevel = userData?.currentLevel;
                // console.log("Auth Level:", authLevel);
                if (authLevel === "aal1" && userData?.nextLevel === "aal2") {
                    setIsAAL1(true);
                }
            }

            setChecking(false);
        };

        checkAuthLevel();
    }, []);

    return { isAAL1, checking };
};
