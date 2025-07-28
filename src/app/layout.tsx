import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.scss";
import LayoutPage from "@/components/navbar/LayoutPage";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { SITE_DESCRIPTION, SITE_NAME } from "@/constants/seo.constants";
import Script from "next/script";

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
			<head>
				{/* Yandex Metrika Script */}
				<Script
					id="yandex-metrika"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
							(function(m,e,t,r,i,k,a){
								m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
								m[i].l=1*new Date();
								for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
								k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
							})(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=103506111', 'ym');
							ym(103506111, 'init', {
								ssr:true,
								webvisor:true,
								clickmap:true,
								ecommerce:"dataLayer",
								accurateTrackBounce:true,
								trackLinks:true
							});
						`,
					}}
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<NextIntlClientProvider messages={messages}>
					<LayoutPage>{children}</LayoutPage>
				</NextIntlClientProvider>

				{/* Yandex Metrika noscript */}
				<noscript>
					<div>
						<img
							src="https://mc.yandex.ru/watch/103506111"
							style={{ position: "absolute", left: "-9999px" }}
							alt=""
						/>
					</div>
				</noscript>
			</body>
		</html>
	);
}
