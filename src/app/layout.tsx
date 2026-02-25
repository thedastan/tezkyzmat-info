import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.scss";
import LayoutPage from "@/components/navbar/LayoutPage";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server"; // Добавили setRequestLocale
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
  verification: {
    other: {
      "facebook-domain-verification": ["s4jfzui6t9wcu2b5j3jqaaiaglet98"],
    },
  },
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  const resolvedParams = await props.params;
  const locale = resolvedParams.locale || "ru";

  // Обязательно для Next.js 15/16 в продакшене
  setRequestLocale(locale);
  
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <LayoutPage>{props.children}</LayoutPage>
        </NextIntlClientProvider>

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