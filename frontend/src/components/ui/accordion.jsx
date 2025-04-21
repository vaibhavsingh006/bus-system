import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Accordion = ({ children }) => {
  return <div className="border">{children}</div>;
};

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        className="flex w-full items-center justify-between py-4 font-medium transition-all hover:underline"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>
      <div
        className={`overflow-hidden text-sm transition-all ${isOpen ? "max-h-40 py-2" : "max-h-0"
          }`}
      >
        {children}
      </div>
    </div>
  );
};

export { Accordion, AccordionItem };
