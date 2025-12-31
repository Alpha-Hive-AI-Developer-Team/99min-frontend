"use client";

import React from 'react';
import Link from "next/link";
import { Button, Input, BackButton } from "@/components/ui";
import Image from "next/image";
import ticketIcon from "@/public/assets/images/ticketIcon.svg";

const LoginScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      {/* Top Bar with Back Arrow */}
      <div className="w-full max-w-sm mx-auto flex justify-start mb-4">
        <BackButton href="/" />
      </div>

      {/* Main Content Container */}
      <div className="grow flex flex-col items-center justify-center w-full max-w-sm mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative w-32 h-20 transform -rotate-12 select-none pointer-events-none">
            <Image src={ticketIcon} alt="Ticket Icon" width={132} height={100} />
          </div>
          <h1 className="text-3xl font-bold text-textBlack mt-6">Welcome Back</h1>
          <p className="text-textGray mt-2 font-normal">Login to continue</p>
        </div>

        {/* Login Form */}
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
          <Button type="submit" variant="primary" size="lg" fullWidth>
            Login
          </Button>

          {/* Sign Up Footer */}
          <div className="text-center text-textGray text-sm mt-6 font-normal">
            No account?{' '}
            <Button type="button" variant="link" size="sm" className="ml-1">
              Sign Up
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default LoginScreen;
