import "./globals.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import { PrimeReactProvider } from "primereact/api";
import { FeedbackProvider } from "@/context/FeedbackContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Test",
  description: "This is a technical assement test for recruitment process",
  icons: {
    icon: "/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen h-screen">
        <PrimeReactProvider>
          <FeedbackProvider>{children}</FeedbackProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
