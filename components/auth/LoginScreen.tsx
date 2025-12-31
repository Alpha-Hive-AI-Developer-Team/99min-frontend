"use client";

import React from 'react';
import Link from "next/link";
import { Button, Input } from "@/components/ui";
import { AuthPageLayout, AuthHeader, AuthFormFooter } from "./shared";

const LoginScreen: React.FC = () => {
  return (
    <AuthPageLayout 
      backButtonHref="/"
      contentMaxWidth="sm"
      contentClassName="justify-center"
    >
      <AuthHeader 
        title="Welcome Back"
        subtitle="Login to continue"
      />

      <form className="w-full">
        <Input
          type="email"
          id="email"
          label="Email"
          placeholder="your@email.com"
        />

        <Input
          type="password"
          id="password"
          label="Password"
          placeholder="Enter your password"
          showPasswordToggle
          className="mb-2"
        />

        {/* Forgot Password Link */}
        <div className="flex justify-end mb-6">
          <Link href="/auth/forgot-password">
            <Button
              type="button"
              variant="link"
              size="sm"
            >
              Forgot Password?
            </Button>
          </Link>
        </div>

        {/* Login Button */}
       <Link href="/dashboard/explore"> <Button type="submit" variant="primary" size="lg" fullWidth>
          Login
        </Button> </Link>

        {/* Sign Up Footer */}
        <AuthFormFooter
          question="No account?"
          linkText="Sign Up"
          linkHref="/auth/signup"
          className="mt-6"
        />
      </form>
    </AuthPageLayout>
  );
};

export default LoginScreen;
