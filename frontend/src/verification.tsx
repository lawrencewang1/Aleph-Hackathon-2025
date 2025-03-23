import React from 'react';
import ReactDOM from 'react-dom/client';
import { VerifyBlock } from "./components/Verify";
import { PayBlock } from "./components/Pay";

// Add a non-null assertion operator (!) or use proper error handling
const rootElement = document.getElementById('verification-component');

// Option 1: Using non-null assertion (if you're confident the element exists)
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <div className="flex flex-col items-center justify-center gap-y-3">
        <VerifyBlock />
        <PayBlock />
      </div>
    </React.StrictMode>
  );
} else {
  console.error('Could not find element with ID "verification-component"');
}