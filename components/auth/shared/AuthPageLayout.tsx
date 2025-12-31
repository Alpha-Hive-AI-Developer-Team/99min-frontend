import React from 'react';
import { BackButton } from "@/components/ui";

interface AuthPageLayoutProps {
  children: React.ReactNode;
  backButtonHref?: string;
  backButtonOnClick?: () => void;
  backButtonVariant?: 'default' | 'circular';
  contentMaxWidth?: 'sm' | 'md' | 'lg';
  contentClassName?: string;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({
  children,
  backButtonHref,
  backButtonOnClick,
  backButtonVariant = 'default',
  contentMaxWidth = 'sm',
  contentClassName = '',
}) => {
  return (
    <div className="relative min-h-screen bg-white flex flex-col p-6">
      {/* Back Button - Leftmost Top */}
      {(backButtonHref || backButtonOnClick) && (
        <div className="absolute top-6 left-6">
          {backButtonHref ? (
            <BackButton variant={backButtonVariant} href={backButtonHref} />
          ) : (
            <BackButton variant={backButtonVariant} onClick={backButtonOnClick} />
          )}
        </div>
      )}

      {/* Main Content */}
      <div className={`grow flex flex-col items-center w-full ${maxWidthClasses[contentMaxWidth]} mx-auto ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default AuthPageLayout;

