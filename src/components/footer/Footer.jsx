import React from "react";

import FooterStatement from "./FooterStatement";
import FooterContent from "./FooterContent";

const Footer = () => {
  return (
    <footer
      className="
        relative
        w-full
        overflow-hidden
        bg-[#080808]
        text-[#F1F0EC]
      "
    >
      <FooterStatement />
      <FooterContent />
    </footer>
  );
};

export default Footer;