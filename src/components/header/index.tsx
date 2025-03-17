import React from "react";
import "./index.scss";
export default function Header({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`header ${className}`}>{children}</div>;
}
