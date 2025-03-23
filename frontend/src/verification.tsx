import { useState, useEffect } from 'react';

// Define the type for verification result
interface VerificationResult {
  nullifier_hash: string;
  merkle_root: string;
  proof: string;
  credential_type: string;
  // Add any other fields returned by worldID.verify()
}

export function useWorldcoinVerification() {
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if WorldID SDK is available
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.worldID) {
      console.warn('WorldID SDK not loaded. Make sure to include the script in your HTML.');
    }
  }, []);

  const verify = async () => {
    if (typeof window === 'undefined' || !window.worldID) {
      setError('WorldID SDK not available');
      return null;
    }

    setIsVerifying(true);
    setError(null);

    try {
      const result = await window.worldID.verify({
        app_name: "MRC", // Your app name
        action: "verify", // The action being performed
        signal: "user_verification", // Optional signal string
        // You can add more parameters as needed according to the docs
      });
      
      setVerificationResult(result);
      return result;
    } catch (err) {
      console.error('Verification failed:', err);
      setError(err instanceof Error ? err.message : 'Verification failed');
      return null;
    } finally {
      setIsVerifying(false);
    }
  };

  return <p>test</p>;
} 