import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import React from "react"

import Navbar from '@/features/Navbar'
import { NavbarContextProvider } from '@/context/NavbarContext'
import { HomeContextProvider } from '@/context/HomeContext'
import { GlobalContextProvider } from '@/context/GlobalContext'
import { Metadata } from 'next'


type Props = {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}


export const metadata: Metadata = {
	title: 'Bloom-Art: Home',
}


export function generateStaticParams() {
	return routing.locales.map((locale: string) => ({ locale }))
}


export default async function LocaleLayout({ children, params }: Props) {
	// Ensure that the incoming `locale` is valid
	const { locale } = await params
	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	setRequestLocale(locale);
	const messages = (await import(`@/messages/${locale}.json`)).default
	
	return (
		<>
			<NextIntlClientProvider locale={locale} messages={messages}>
				<NavbarContextProvider>
					<Navbar />
				</NavbarContextProvider>
				<GlobalContextProvider>
					<HomeContextProvider>
						<main>{children}</main>
					</HomeContextProvider>
				</GlobalContextProvider>
			</NextIntlClientProvider>
		</>
	)
}
