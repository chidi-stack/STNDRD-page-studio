"use client";
import * as React from "react";
import { cj } from "../../utils";
import Link, { LinkProps } from "../../Basic/components/Link";
import type { LinkElement } from "../../types";

type NavbarBrandProps = LinkProps;

export type { NavbarBrandProps };

const NavbarBrand = React.forwardRef<LinkElement, NavbarBrandProps>(
  function NavbarBrand({ className = "", ...props }, ref) {
    return (
      <Link {...props} className={cj(className, "w-nav-brand")} ref={ref} />
    );
  }
);

export default NavbarBrand;
