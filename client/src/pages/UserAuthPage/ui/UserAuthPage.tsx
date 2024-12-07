import { MemoUserAuthorizationForm } from "@/features/auth/UserAuthorizationForm";

// не используем props
export function UserAuthPage() {
    return (
        <>
            <h1>AuthPage</h1>
            <MemoUserAuthorizationForm />
        </>
    );
}

