import "./globals.css";
import HeaderBar from "@/components/HeaderBar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/autonova-logoA.png" />
      </head>
      <body className="min-h-screen flex flex-col">
        <HeaderBar />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
