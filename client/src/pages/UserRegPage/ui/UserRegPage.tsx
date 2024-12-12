import { MemoUserRegistrationForm } from "@/features/auth/UserRegistrationForm";

export function UserRegPage() {
    return (
        <>
        <div
        style={{ paddingTop: "20px", paddingBottom: "40px", height: "100vh", backgroundColor: "#E1DBFD"}}
      >
            <MemoUserRegistrationForm />
            </div>
        </>
    );
}
