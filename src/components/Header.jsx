import {
  IoBagOutline,
  IoPersonOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { Link, useFetcher } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlHeader);

    return () => window.removeEventListener("scroll", controlHeader);
  }, [lastScrollY]);

  return (
    <header className={`site-header ${isVisible ? "visible" : "hidden"}`}>
      <div className="site-header-container">
        <Link to="/" className="header-brand">
          Yummy.
        </Link>
        <div className="header-links">
          <Link className="header-link">NEW FLAVOURS</Link>
          <Link className="header-link">BEST SELLERS</Link>
          <Link className="header-link">SHOP</Link>
        </div>
        <div className="header-icons">
          <Link className="header-icon">
            <IoSearchOutline />
          </Link>
          <Link className="header-icon">
            <IoPersonOutline />
          </Link>
          <Link className="header-icon">
            <IoBagOutline />
          </Link>
        </div>
      </div>
    </header>
  );
}
