import { useEffect, useState } from "react";
import { supabase } from "../utils/authConfig";

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
