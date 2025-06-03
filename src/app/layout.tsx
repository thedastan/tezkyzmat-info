import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.scss";
import LayoutPage from "@/components/navbar/LayoutPage";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { SITE_DESCRIPTION, SITE_NAME } from "@/constants/seo.constants";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: SITE_NAME,
	description: SITE_DESCRIPTION,
	openGraph: {
		title: SITE_NAME,
		description: SITE_DESCRIPTION,
	},
};

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;
	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<NextIntlClientProvider messages={messages}>
					<LayoutPage>{children}</LayoutPage>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
