'use client' // Required for Next.js

import { ReactNode, useEffect } from 'react';
import { MiniKit } from '@worldcoin/minikit-js'
import React from 'react';

export default function MiniKitProvider({ children }: { children: ReactNode }) {
	useEffect(() => {
		// Passing appId in the install is optional 
		// but allows you to access it later via `window.MiniKit.appId`
		const appId = process.env.NEXT_PUBLIC_APP_ID // Ensure this is prefixed with NEXT_PUBLIC_
		if (!appId) {
			console.error("Missing NEXT_PUBLIC_APP_ID")
			return;
		}
		MiniKit.install(appId) 
	}, [])

	return <>{children}</>
}