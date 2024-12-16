"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";

export const resetPasswordAction = async (formData: FormData) => {
    const supabase = await createClient();

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!password || !confirmPassword) {
        encodedRedirect(
            "error",
            "/protected/reset-password",
            "Password and confirm password are required",
        );
        return; // Early exit
    }

    if (password !== confirmPassword) {
        encodedRedirect(
            "error",
            "/protected/reset-password",
            "Passwords do not match",
        );
        return; // Early exit
    }

    const { error } = await supabase.auth.updateUser({
        password: password,
    });

    if (error) {
        console.error("Password update failed:", error.message); // Log error details
        encodedRedirect(
            "error",
            "/protected/reset-password",
            "Password update failed",
        );
        return; // Early exit
    }

    // Redirect to success page after successful password reset
    encodedRedirect("success", "/auth/success", "Password updated successfully");
};