import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "光伏设计查询",
  description: "光伏、储能、自给率与碳排放设计查询工具",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
