"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const items = [
  { href: "/", route: "home", icon: "home", label: "首页" },
  { href: "/pv", route: "pv", icon: "pv", label: "光伏布置" },
  { href: "/storage", route: "storage", icon: "storage", label: "储能布置" },
  { href: "/config", route: "config", icon: "config", label: "配置推荐" },
  { href: "/self", route: "self", icon: "energy", label: "自给率" },
  { href: "/carbon", route: "carbon", icon: "carbon", label: "碳排放" },
  { href: "/formula", route: "formula", icon: "formula", label: "计算公式" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="nav-wrap">
        <Link className="brand" href="/" onClick={() => setOpen(false)}>
          <span className="brand-mark" />
          <span>
            <b>光伏设计查询</b>
            <span>PV Design Query Toolkit</span>
          </span>
        </Link>
        <nav id="nav" className={open ? "open" : ""}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active" : ""}
              data-route={item.route}
              onClick={() => setOpen(false)}
            >
              <span className={`ico ${item.icon}`} />
              {item.label}
            </Link>
          ))}
        </nav>
        <button className="menu" type="button" aria-label="展开导航" onClick={() => setOpen(!open)}>
          <i />
          <i />
          <i />
        </button>
      </div>
    </header>
  );
}
