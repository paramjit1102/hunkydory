import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { seoStore } from "@/lib/seo-store";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#FFFBF5"
};

export async function generateMetadata(): Promise<Metadata> {
  const globalConfig = seoStore.getGlobal();
  const homePage = seoStore.getPageByPath("/");
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || globalConfig.siteUrl || "http://localhost:3000";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: homePage?.title || globalConfig.siteName,
      template: globalConfig.titleTemplate || `%s | ${globalConfig.siteName}`
    },
    description: homePage?.description || globalConfig.defaultDescription,
    keywords: homePage?.keywords || globalConfig.defaultKeywords,
    authors: [{ name: `${globalConfig.siteName} Educational Platform` }],
    creator: globalConfig.siteName,
    openGraph: {
      title: homePage?.ogTitle || homePage?.title || globalConfig.siteName,
      description: homePage?.ogDescription || homePage?.description || globalConfig.defaultDescription,
      siteName: globalConfig.siteName,
      locale: "en_US",
      type: "website"
    },
    twitter: {
      card: homePage?.twitterCard || "summary_large_image",
      title: homePage?.twitterTitle || homePage?.title || globalConfig.siteName,
      description: homePage?.twitterDescription || homePage?.description || globalConfig.defaultDescription
    },
    robots: {
      index: !homePage?.robots.includes("noindex"),
      follow: !homePage?.robots.includes("nofollow")
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
      ]
    },
    verification: {
      google: globalConfig.googleSiteVerification || undefined,
      other: globalConfig.bingSiteVerification
        ? { "msvalidate.01": globalConfig.bingSiteVerification }
        : undefined
    }
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalConfig = seoStore.getGlobal();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: globalConfig.siteName,
    description: globalConfig.defaultDescription,
    slogan: "Every Child Can Learn. Every Child Can Shine.",
    telephone: `+91 ${globalConfig.telephone}`,
    email: globalConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: globalConfig.streetAddress,
      addressLocality: globalConfig.addressLocality,
      postalCode: globalConfig.postalCode,
      addressCountry: globalConfig.addressCountry
    },
    sameAs: globalConfig.socialLinks || []
  };

  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {globalConfig.googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${globalConfig.googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${globalConfig.googleAnalyticsId}');
              `}
            </Script>
          </>
        )}
        {globalConfig.googleTagManagerId && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${globalConfig.googleTagManagerId}');
            `}
          </Script>
        )}
      </head>
      <body className="min-h-full flex flex-col bg-[#FFFDF9] text-slate-800 antialiased font-sans">
        {/* Skip to Content for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-amber-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg"
        >
          Skip to main content
        </a>
        <div id="main-content" className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
