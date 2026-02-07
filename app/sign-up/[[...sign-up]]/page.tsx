import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mana-navy via-mana-blue-deep to-mana-navy">
      <SignUp />
    </div>
  );
}
