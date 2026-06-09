import type { Metadata, Viewport } from "next";
import { Lora, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const lora = Lora({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hoteltumacosanmarino.com"),
  title: {
    default: "Hotel San Marino Tumaco | El Morro se vive aquí",
    template: "%s | Hotel San Marino Tumaco",
  },
  description:
    "Hotel en El Morro Tumaco cerca al mar, con restaurante, piscina, parqueadero, habitaciones familiares y reserva directa por WhatsApp.",
  applicationName: "Hotel San Marino Tumaco",
  category: "travel",
  keywords: [
    "hotel en Tumaco",
    "hotel en El Morro Tumaco",
    "hotel cerca al mar en Tumaco",
    "hotel con piscina en Tumaco",
    "hotel con restaurante en Tumaco",
  ],
  openGraph: {
    title: "Hotel San Marino Tumaco | El Morro se vive aquí",
    description:
      "Hospédate cerca del mar y descubre Tumaco desde una estadía cómoda, cálida y con sabor local.",
    locale: "es_CO",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#153B52",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
