import { Html, Heading, Hr, Link, Text, Button } from "@react-email/components";

interface EmailTemplateProps {
  type: "REGISTER" | "FORGET";
  url: string;
  name: string | null;
}

export default function EmailTemplate({ type, url, name }: EmailTemplateProps) {
  return (
    <Html lang="en">
      <Heading>
        Colhive :{" "}
        {type === "REGISTER" ? "Email Verification" : "Password Reset"}
      </Heading>
      <Hr />
      <Text>Hi, {name}</Text>
      <Text>
        {type === "REGISTER"
          ? "You're almost set to start using our services. Simply click on the link below to verify your email address and get started."
          : "Seems like you forgot your password for Colhive. If this is true, click below to reset your password."}
      </Text>
      <Button href={url}>
        {type === "REGISTER" ? "Verify email" : "Reset Password"}
      </Button>
      {type === "FORGET" && (
        <Text>
          If you did not request for resetting your password, you can safely
          ignore this email.
        </Text>
      )}
    </Html>
  );
}
