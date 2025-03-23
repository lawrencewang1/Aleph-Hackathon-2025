import {
  MiniKit,
  VerificationLevel,
  ISuccessResult,
  MiniAppVerifyActionErrorPayload,
  IVerifyResponse,
} from "@worldcoin/minikit-js";
import { useCallback, useState } from "react";

export type VerifyCommandInput = {
  action: string;
  signal?: string;
  verification_level?: VerificationLevel; // Default: Orb
};

const verifyPayload: VerifyCommandInput = {
  action: "test-action", // This is your action ID from the Developer Portal
  signal: "",
  verification_level: VerificationLevel.Orb, // Orb | Device
};

export const VerifyBlock = () => {
  const [handleVerifyResponse, setHandleVerifyResponse] = useState<
    MiniAppVerifyActionErrorPayload | IVerifyResponse | null
  >(null);

  const handleVerify = useCallback(async () => {
    if (!MiniKit.isInstalled()) {
      console.warn("Tried to invoke 'verify', but MiniKit is not installed.");
      return null;
    }

    const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);

    // no need to verify if command errored
    if (finalPayload.status === "error") {
      console.log("Command error");
      console.log(finalPayload);

      setHandleVerifyResponse(finalPayload);
      return finalPayload;
    }

    // Verify the proof in the backend
    const verifyResponse = await fetch(
      `${process.env.NEXTAUTH_URL}/api/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: finalPayload as ISuccessResult, // Parses only the fields we need to verify
          action: verifyPayload.action,
          signal: verifyPayload.signal, // Optional
        }),
      }
    );

    // TODO: Handle Success!
    const verifyResponseJson = await verifyResponse.json();

    if (verifyResponseJson.status === 200) {
      console.log("Verification success!");
      console.log(finalPayload);
    }

    setHandleVerifyResponse(verifyResponseJson);
    return verifyResponseJson;
  }, []);

  return (
    <div style={{ 
      position: 'absolute', 
      top: '20px', 
      right: '20px', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'flex-end'
    }}>
      <h1 style={{ margin: '0 0 10px 0', fontSize: '16px', color: 'white' }}>Verify Block</h1>
      <button 
        className="bg-green-500 p-4" 
        onClick={handleVerify}
        style={{ 
          borderRadius: '4px', 
          border: 'none', 
          cursor: 'pointer' 
        }}
      >
        Test Verify
      </button>
      <span style={{ display: 'none' }}>{JSON.stringify(handleVerifyResponse, null, 2)}</span>
    </div>
  );
};
