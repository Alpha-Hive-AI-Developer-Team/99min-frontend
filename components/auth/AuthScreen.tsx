"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";
import ticketIcon from "@/public/assets/images/ticketIcon.svg";

const AuthScreen: React.FC = () => {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm flex flex-col items-center">
          
          {/* Top Section: Ticket Graphic */}
          <div className="mb-12 flex justify-center">
            <Image src={ticketIcon} alt="Ticket Icon" width={132} height={100} />
          </div>
  
          {/* Middle Section: Login */}
          <div className="w-full mb-6">
            <Link href="/auth/login" className="block">
              <Button 
                variant="primary"
                size="lg"
                fullWidth
                className="hover:opacity-90"
              >
                Login
              </Button>
            </Link>
            <p className="text-center text-textGray text-sm mt-3 font-normal">
              Access your account quickly.
            </p>
          </div>
  
          {/* Bottom Section: Sign Up */}
          <div className="w-full">
            <Button 
              variant="secondary"
              size="lg"
              fullWidth
              className="hover:opacity-90"
            >
              Sign Up
            </Button>
            <p className="text-center text-textGray text-sm mt-3 font-normal">
              Create a new account in seconds.
            </p>
          </div>
  
        </div>
      </div>
    );
  };

export default AuthScreen;
