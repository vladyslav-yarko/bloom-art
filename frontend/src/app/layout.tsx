import "@/styles/globals.css"

import type { Metadata } from "next";

import Navbar from '@/features/Navbar'
import Footer from "@/features/Footer";
import { NavbarContextProvider } from '@/context/NavbarContext'
import { HomeContextProvider } from "@/context/HomeContext";


export const metadata: Metadata = {
	title: 'a',
	description: 'a',
	icons: {
		icon: [
			{ url: '/favicon.ico' },
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
		],
		apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
		other: [
			{
				rel: 'manifest',
				url: '/site.webmanifest',
			},
		],
	},
}


export default function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {
	return (
		<html lang='en'>
			<body>
				<NavbarContextProvider>
					<Navbar />
				</NavbarContextProvider>
				<main>
					<HomeContextProvider>
						{children}
					</HomeContextProvider>
				</main>
				<Footer />
			</body>
		</html>
	)
}
