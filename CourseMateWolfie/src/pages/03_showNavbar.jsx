import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ShowNavbar({ children }) {
  const location = useLocation();
  const [showNav, setShowNav] = useState(false);

  // Hide navbar for th e login page
  useEffect(() => {
    if (
      location.pathname == "/" ||
      location.pathname == "/login" ||
      location.pathname == "/signup"
    )
      setShowNav(false);
    else setShowNav(true);
  }, [location]);
  return <div>{showNav && children}</div>;
}
