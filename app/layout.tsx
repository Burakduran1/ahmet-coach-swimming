import type { Metadata, Viewport } from 'next'
import { Montserrat, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ahmetswim.com'),
  title: {
    default: 'İzmir Yüzme Kursu | Buca & Bornova Yüzme Eğitimi | Ahmet Swim',
    template: '%s | İzmir Yüzme Kursu - Ahmet Swim',
  },
  description: 'İzmir yüzme kursu, Buca ve Bornova yüzme eğitimi. Çocuk yüzme dersi, yetişkin yüzme dersi, su korkusu terapisi, birebir özel ders, grup dersi. 3. Kademe Kıdemli Yüzme Antrenörü Ahmet Kemer. Buca yüzme kursu, Bornova yüzme hocası. Tel: +90 530 324 40 52',
  keywords: [
    'İzmir yüzme kursu',
    'İzmir yüzme dersi',
    'İzmir yüzme eğitimi',
    'İzmir yüzme hocası',
    'İzmir yüzme antrenörü',
    'Buca yüzme kursu',
    'Buca yüzme eğitimi',
    'Buca yüzme dersi',
    'Buca yüzme hocası',
    'Buca yüzme antrenörü',
    'Bornova yüzme kursu',
    'Bornova yüzme eğitimi',
    'Bornova yüzme dersi',
    'Bornova yüzme hocası',
    'Bornova yüzme antrenörü',
    'çocuk yüzme dersi İzmir',
    'çocuk yüzme kursu İzmir',
    'yetişkin yüzme dersi İzmir',
    'yetişkin yüzme kursu İzmir',
    'su korkusu terapisi İzmir',
    'su korkusu programı İzmir',
    'özel yüzme dersi İzmir',
    'birebir yüzme dersi',
    'grup yüzme dersi İzmir',
    'yüzme dersi İzmir',
    'yüzme kursu İzmir',
    'havuz yüzme dersi',
    'yüzme antrenörü İzmir',
    'profesyonel yüzme eğitimi',
    'Ahmet Swim',
    'Ahmet Kemer yüzme',
    'yüzmeye başlangıç',
    'yüzme teknikleri',
    'cankurtaran sertifikalı yüzme hocası',
  ],
  openGraph: {
    title: 'İzmir Yüzme Kursu | Buca & Bornova Yüzme Eğitimi | Ahmet Swim',
    description: 'İzmir yüzme kursu, Buca ve Bornova yüzme eğitimi. Çocuk, yetişkin, su korkusu programları. Birebir ve grup yüzme dersi. 3. Kademe Antrenör Ahmet Kemer. Tel: +90 530 324 40 52',
    url: 'https://ahmetswim.com',
    siteName: 'Ahmet Swim - İzmir Yüzme Kursu | Buca & Bornova',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'İzmir Yüzme Kursu | Buca & Bornova Yüzme Eğitimi | Ahmet Swim',
    description: 'İzmir yüzme kursu, Buca ve Bornova yüzme eğitimi. Çocuk, yetişkin, su korkusu. Birebir ve grup yüzme dersi. 3. Kademe Antrenör. Tel: +90 530 324 40 52',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://ahmetswim.com',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/icon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#F8FAFC',
  width: 'device-width',
  initialScale: 1,
}

// Yapay zeka asistanları ve arama motorları için zengin yapısal veri (Schema.org)
const SITE_URL = 'https://ahmetswim.com'
const PHONE = '+90 530 324 40 52'
const INSTAGRAM = 'https://www.instagram.com/ahmet.swim35'
const WHATSAPP = 'https://wa.me/905303244052'

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}#person`,
  "name": "Ahmet Kemer",
  "jobTitle": "3. Kademe Kıdemli Yüzme Antrenörü",
  "description": "İzmir'de Buca ve Bornova'da profesyonel yüzme antrenörlüğü yapan Ahmet Kemer, her yaştan öğrenciye İzmir yüzme kursu ve yüzme eğitimi vermektedir. 3. Kademe Kıdemli Yüzme Antrenörü ve Gümüş Cankurtaran sertifikasına sahiptir. Çocuk yüzme dersi, yetişkin yüzme dersi, su korkusu terapisi, birebir özel yüzme dersi ve grup yüzme dersi programları sunar.",
  "telephone": PHONE,
  "email": "ahmet@yuzme.com",
  "url": SITE_URL,
  "mainEntityOfPage": SITE_URL,
  "sameAs": [SITE_URL, INSTAGRAM, WHATSAPP],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "İzmir",
    "addressRegion": "İzmir",
    "addressCountry": "TR"
  },
  "areaServed": [
    { "@type": "City", "name": "Buca", "containedInPlace": { "@type": "City", "name": "İzmir" } },
    { "@type": "City", "name": "Bornova", "containedInPlace": { "@type": "City", "name": "İzmir" } }
  ],
  "knowsAbout": [
    "İzmir yüzme kursu", "Buca yüzme eğitimi", "Bornova yüzme eğitimi",
    "Çocuk yüzme dersi", "Yetişkin yüzme dersi", "Su korkusu terapisi",
    "Birebir özel yüzme dersi", "Grup yüzme dersi", "Yüzmeye başlangıç",
    "Yüzme teknikleri", "Havuz yüzme eğitimi", "Profesyonel yüzme antrenörlüğü"
  ],
  "hasCredential": [
    { "@type": "EducationalOccupationalCredential", "credentialCategory": "3. Kademe Kıdemli Yüzme Antrenörlüğü Belgesi" },
    { "@type": "EducationalOccupationalCredential", "credentialCategory": "Gümüş Cankurtaran Sertifikası" }
  ]
}

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Ahmet Swim - İzmir Yüzme Kursu | Buca Bornova Yüzme Eğitimi",
  "url": SITE_URL,
  "description": "İzmir yüzme kursu, Buca yüzme eğitimi, Bornova yüzme dersi. Çocuk yüzme, yetişkin yüzme, su korkusu programı. Birebir özel yüzme dersi ve grup yüzme dersi. 3. Kademe antrenör Ahmet Kemer. Tel: 0530 324 40 52.",
  "inLanguage": "tr-TR",
  "publisher": { "@id": `${SITE_URL}#person` }
}

const jsonLdLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "@id": `${SITE_URL}#business`,
  "name": "Ahmet Swim - İzmir Yüzme Kursu | Buca Bornova Yüzme Eğitimi",
  "description": "İzmir yüzme kursu, Buca yüzme kursu, Bornova yüzme kursu. Çocuk yüzme dersi, yetişkin yüzme dersi, su korkusu terapisi. Birebir özel yüzme dersi, grup yüzme dersi. 3. Kademe Kıdemli Yüzme Antrenörü Ahmet Kemer.",
  "url": SITE_URL,
  "telephone": PHONE,
  "owner": { "@id": `${SITE_URL}#person` },
  "areaServed": [
    { "@type": "Place", "name": "Buca, İzmir" },
    { "@type": "Place", "name": "Bornova, İzmir" }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "İzmir",
    "addressRegion": "İzmir",
    "addressCountry": "TR"
  },
  "priceRange": "$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "08:00",
    "closes": "20:00"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "İzmir yüzme eğitimleri",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Çocuk yüzme eğitimi İzmir" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Yetişkin yüzme eğitimi İzmir" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Su korkusu terapisi İzmir" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Birebir özel yüzme dersi Buca Bornova" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Grup yüzme dersi İzmir" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Yüzmeye başlangıç dersi" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Yüzme teknikleri geliştirme" } }
    ]
  }
}

const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntityOfPage": SITE_URL,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "İzmir'de yüzme dersi nerede veriliyor?",
      "acceptedAnswer": { "@type": "Answer", "text": "Ahmet Kemer, İzmir yüzme kursu kapsamında Buca ve Bornova ilçelerinde yüzme dersi vermektedir. Buca yüzme eğitimi ve Bornova yüzme eğitimi havuzlarda güvenli ve profesyonel ortamda sunulmaktadır." }
    },
    {
      "@type": "Question",
      "name": "Yüzme dersi için nasıl iletişime geçilir?",
      "acceptedAnswer": { "@type": "Answer", "text": "İzmir yüzme kursu ve yüzme dersi randevusu için 0530 324 40 52 numaralı telefondan, WhatsApp üzerinden veya Instagram @ahmet.swim35 üzerinden iletişime geçebilirsiniz. Web sitesi: ahmetswim.com" }
    },
    {
      "@type": "Question",
      "name": "Hangi yaş gruplarına yüzme eğitimi veriliyor?",
      "acceptedAnswer": { "@type": "Answer", "text": "Çocuk yüzme dersi, yetişkin yüzme dersi ve her yaş grubuna İzmir yüzme eğitimi verilmektedir. Yaş engel değildir; Buca ve Bornova'da kişiye özel yüzme programları uygulanır." }
    },
    {
      "@type": "Question",
      "name": "Su korkusu için özel program var mı?",
      "acceptedAnswer": { "@type": "Answer", "text": "Evet. İzmir'de su korkusu terapisi ve su korkusu programı sunulmaktadır. Özel yöntemlerle güven kazanma, adım adım suya alıştırma ve yüzmeye geçiş hedeflenir. Buca ve Bornova yüzme kursu kapsamında uygulanır." }
    },
    {
      "@type": "Question",
      "name": "Birebir özel yüzme dersi veriliyor mu?",
      "acceptedAnswer": { "@type": "Answer", "text": "Evet. İzmir'de birebir özel yüzme dersi ve grup yüzme dersi seçenekleri mevcuttur. Buca yüzme dersi ve Bornova yüzme dersi için uygun gün ve saatlerde randevu alınabilir." }
    },
    {
      "@type": "Question",
      "name": "Ahmet Swim yüzme antrenörü kimdir?",
      "acceptedAnswer": { "@type": "Answer", "text": "Ahmet Kemer, 3. Kademe Kıdemli Yüzme Antrenörü ve Gümüş Cankurtaran sertifikasına sahiptir. İzmir Buca ve Bornova'da çocuk yüzme, yetişkin yüzme ve su korkusu programlarıyla profesyonel yüzme eğitimi vermektedir." }
    }
  ]
}

// AI arama ve sesli asistanlar için özet (Google AI Overview, Perplexity, ChatGPT vb.)
const jsonLdWebPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "İzmir Yüzme Kursu | Buca & Bornova Yüzme Eğitimi - Ahmet Swim",
  "description": "Ahmet Kemer, İzmir Buca ve Bornova'da 3. Kademe Kıdemli Yüzme Antrenörü olarak çocuk, yetişkin ve su korkusu programları sunuyor. Birebir ve grup yüzme dersi. İletişim: 0530 324 40 52.",
  "url": SITE_URL,
  "inLanguage": "tr-TR",
  "publisher": { "@id": `${SITE_URL}#person` },
  "about": { "@id": `${SITE_URL}#business` }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className={`${montserrat.variable} ${playfair.variable} font-sans antialiased`}>
        {/* Yapay zeka ve arama motorları için yapısal veri */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
