import React,{ useState } from "react";

const AccordionItem = ({ title, children, className }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className={`${className} border-b border-gray-200`}>
        <button
          onClick={toggleAccordion}
          className="w-full flex justify-between items-center p-4 text-left"
        >
          <span className="text-lg font-bold">{title}</span>
          <span>{isOpen ? '-' : '+'}</span>
        </button>
        {isOpen && (
          <div className="p-4 ">
            {children}
          </div>
        )}
      </div>
    );
  };
  
  export default AccordionItem;