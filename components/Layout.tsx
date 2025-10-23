import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const router = useRouter();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => router.pathname === path;

  return (
    <>
      <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <span className="nav-logo-main">ZC</span>
            <span className="nav-logo-sub">Education</span>
          </Link>
          <ul className="nav-links">
            <li>
              <Link href="/" className={isActive("/") ? "active" : ""}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/approach" className={isActive("/approach") ? "active" : ""}>
                Approach
              </Link>
            </li>
            <li>
              <Link href="/outcomes" className={isActive("/outcomes") ? "active" : ""}>
                Outcomes
              </Link>
            </li>
            <li>
              <Link href="/journal" className={isActive("/journal") ? "active" : ""}>
                Journal
              </Link>
            </li>
            <li>
              <Link href="/contact" className={isActive("/contact") ? "active" : ""}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <main>{children}</main>
      <footer className="footer">
        <p className="footer-text">
          ZC Education · By invitation only · Est. 2024
        </p>
      </footer>
    </>
  );
}

