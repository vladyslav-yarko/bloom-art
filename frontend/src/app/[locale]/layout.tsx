import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

import { HomeContextProvider } from '@/context/HomeContext'


type Props = {
	children: React.ReactNode
	params: Promise<{ locale: string }>
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
		<html lang={locale}>
			<body>
				<NextIntlClientProvider locale={locale} messages={messages}>
                    <HomeContextProvider>
                        {children}
                    </HomeContextProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)

}
