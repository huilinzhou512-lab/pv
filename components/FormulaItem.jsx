"use client";

import { useState } from "react";

export default function FormulaItem({ title, children, open = false }) {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <div className={`formula-item ${isOpen ? "open" : ""}`}>
      <button className="formula-head" type="button" onClick={() => setIsOpen(!isOpen)}>
        {title}
        <span>{isOpen ? "收起" : "展开"}</span>
      </button>
      <div className="formula-body">
        <div className="formula-box">{children}</div>
      </div>
    </div>
  );
}
