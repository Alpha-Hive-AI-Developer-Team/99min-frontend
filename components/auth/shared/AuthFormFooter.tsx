import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui";

interface AuthFormFooterProps {
  question: string;
  linkText: string;
  linkHref: string;
  className?: string;
}

const AuthFormFooter: React.FC<AuthFormFooterProps> = ({
  question,
  linkText,
  linkHref,
  className = '',
}) => {
  return (
    <div className={`text-center text-textGray text-sm font-normal ${className}`}>
      {question}{' '}
      <Link href={linkHref}>
        <Button type="button" variant="link" size="sm" className="ml-1">
          {linkText}
        </Button>
      </Link>
    </div>
  );
};

export default AuthFormFooter;

