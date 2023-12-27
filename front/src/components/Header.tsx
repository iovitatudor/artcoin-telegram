import React, {FC} from "react";
import {Link} from "react-router-dom";

const Header: FC = () => {
  return (
    <div className="header-area">
      <Link to="/">
        <img src="/images/logo.svg" alt=""/>
      </Link>
    </div>
  );
}

export default Header;