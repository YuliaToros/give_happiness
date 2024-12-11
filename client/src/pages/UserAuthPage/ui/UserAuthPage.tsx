import { MemoUserAuthorizationForm } from "@/features/auth/UserAuthorizationForm";

// не используем props
export function UserAuthPage() {
  return (
    <>
      <div
        style={{ paddingTop: "20px", paddingBottom: "40px", height: "100vh" }}
      >
        <MemoUserAuthorizationForm />
      </div>
    </>
  );
}
