import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children, navItems }) {
  return (
    <div className={`flex min-h-screen flex-col text-sm`}>
      <Navbar items={navItems} />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
