import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.scss";
import LayoutPage from "@/components/navbar/LayoutPage";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { SITE_DESCRIPTION, SITE_NAME } from "@/constants/seo.constants";
import { routing } from "@/i18n/routing";
import Script from "next/script";
import { notFound } from "next/navigation";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff", 
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Генерируем статические параметры для всех языков
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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

// Исправленный интерфейс пропсов: locale теперь необязателен для валидации TS
interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>; 
}

export default async function RootLayout(props: RootLayoutProps) {
  // 1. Обязательно дожидаемся промиса параметров
  const resolvedParams = await props.params;
  const locale = resolvedParams.locale || routing.defaultLocale;

  // 2. Если локаль не входит в список разрешенных — отдаем 404
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // 3. Устанавливаем локаль для серверных функций (обязательно для статической генерации)
  setRequestLocale(locale);
  
  // 4. Загружаем сообщения именно для текущей локали
  const messages = await getMessages({ locale });

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
        {/* 5. Передаем и локаль, и сообщения в провайдер */}
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