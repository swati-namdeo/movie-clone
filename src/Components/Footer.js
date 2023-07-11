import React from "react";

function Footer() {
  const handleClickFooter = () => {
    window.scroll(0, 0);
  };
  return (
    <div id="footerApp" onClick={handleClickFooter}>
      Back To Top
    </div>
  );
}

export default Footer;
