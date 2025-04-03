import React from "react";
import { Link as ReactLink, type LinkProps } from "@tanstack/react-router";
import { useLanguage } from "./use-language";

interface Props extends Omit<LinkProps, "to"> {
  to: string;
  className?: string;
}

export const Link: React.FC<Props> = ({ to, children, ...rest }) => {
  const { language } = useLanguage();

  const localizedPath =
    to === "/"
      ? `/${language}`
      : `/${language}${to.startsWith("/") ? to : `/${to}`}`;

  return (
    <ReactLink to={localizedPath} {...rest}>
      {children}
    </ReactLink>
  );
};

Link.displayName = "Link";
