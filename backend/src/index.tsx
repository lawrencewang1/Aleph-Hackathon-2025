import React from 'react';
import MiniKitProvider from './minikit-provider';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ["latin"] });

export default async function Root({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<MiniKitProvider>
				<body className={inter.className}>{children}</body>
			</MiniKitProvider>
		</html>
	)
}