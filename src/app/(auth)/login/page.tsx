"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";
import { Container, Card, Input, Button } from "@/ui";

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If user is already logged in, bounce them to dashboard
  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // Successful login → go to dashboard, no login in history
      router.replace("/dashboard");
    } catch (err: unknown) {
      let message =
        "Could not sign you in. Please check your details and try again.";

      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/invalid-credential":
          case "auth/wrong-password":
          case "auth/user-not-found":
            message = "Invalid email or password.";
            break;
          case "auth/too-many-requests":
            message = "Too many attempts. Please wait a bit and try again.";
            break;
          default:
            console.error("Firebase auth error", {
              code: err.code,
              message: err.message,
            });
        }
      } else if (err instanceof Error) {
        console.error(err);
      } else {
        console.error("Unknown sign-in error", err);
      }

      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const disabled = isSubmitting;

  return (
    <Container
      direction="column"
      className="min-h-screen items-center justify-center bg-bg px-4"
    >
      <Card className="w-full max-w-sm">
        <div className="mb-4">
          <h1 className="text-lg font-semibold">Sign in</h1>
          <p className="mt-1 text-xs text-muted">
            Log in to access your dashboard and tasks.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={disabled}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={disabled}
          />

          {error && <p className="text-xs text-danger">{error}</p>}

          <Button
            type="submit"
            primary
            className="w-full mt-2"
            disabled={disabled || !email.trim() || !password}
            label={isSubmitting ? "Signing in…" : "Sign in"}
          />
        </form>
      </Card>
    </Container>
  );
}
