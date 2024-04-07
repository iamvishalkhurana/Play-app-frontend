import React from "react";
import Logo from "./Utils/Logo";
const Footer = () => {
  return (
    <div class=" bg-transparent text-white hidden md:block">
      <footer class="px-4">
        <div class="mx-auto flex max-w-7xl items-center justify-between py-2">
          <div class="mr-4 w-12 shrink-0 sm:w-16">
            <Logo />
          </div>
          <p class="text-sm">©2024 Play-App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
