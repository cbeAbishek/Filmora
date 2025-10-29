import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <SignUp appearance={{ elements: { formButtonPrimary: "bg-primary text-primary-foreground" } }} />
    </div>
  );
}
