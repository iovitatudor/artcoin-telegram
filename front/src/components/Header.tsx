import React, {FC, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";

const Header: FC = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="header-area">
      <Link to="/">
        <img src="/images/logo.svg" alt=""/>
      </Link>
    </div>
  );
}

export default Header;