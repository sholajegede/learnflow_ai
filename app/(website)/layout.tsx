import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
        {children}
      <Footer />
    </div>
  )
};