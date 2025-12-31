export type PasswordStrength = 'weak' | 'medium' | 'strong';

export interface PasswordStrengthResult {
  strength: PasswordStrength;
  score: number;
  label: string;
  color: string;
}

export interface PasswordRequirement {
  label: string;
  check: (password: string) => boolean;
}

export const passwordRequirements: PasswordRequirement[] = [
  {
    label: 'At least 8 characters',
    check: (password) => password.length >= 8,
  },
  {
    label: 'One uppercase letter',
    check: (password) => /[A-Z]/.test(password),
  },
  {
    label: 'One lowercase letter',
    check: (password) => /[a-z]/.test(password),
  },
  {
    label: 'One number',
    check: (password) => /[0-9]/.test(password),
  },
];

export const calculatePasswordStrength = (password: string): PasswordStrengthResult => {
  if (!password) {
    return { strength: 'weak', score: 0, label: '', color: 'bg-gray-200' };
  }

  let score = 0;
  
  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Character variety checks
  if (/[a-z]/.test(password)) score += 1; // lowercase
  if (/[A-Z]/.test(password)) score += 1; // uppercase
  if (/[0-9]/.test(password)) score += 1; // number
  if (/[^a-zA-Z0-9]/.test(password)) score += 1; // special character
  
  if (score <= 2) {
    return { strength: 'weak', score, label: 'Weak', color: 'bg-red-500' };
  } else if (score <= 4) {
    return { strength: 'medium', score, label: 'Medium', color: 'bg-yellow-500' };
  } else {
    return { strength: 'strong', score, label: 'Strong', color: 'bg-green-500' };
  }
};

export const getPasswordRequirementStatus = (password: string) => {
  return passwordRequirements.map(req => ({
    ...req,
    met: req.check(password),
  }));
};

