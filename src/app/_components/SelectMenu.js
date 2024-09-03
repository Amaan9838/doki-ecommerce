// // components/SelectMenu.js
// 'use client';
// import React, { useState } from "react";

// const options = [
//   "Alphabetically, A-Z",
//   "Alphabetically, Z-A",
//   "Price, low to high",
//   "Price, high to low",
//   "Date, old to new",
//   "Date, new to old",
// ];

// const SelectMenu = () => {
//   const [selectedOption, setSelectedOption] = useState("");
//   const [isOpen, setIsOpen] = useState(false);

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     setIsOpen(false);
//   };

//   return (
//     <div className="select-container">
//       <div className="select-header" onClick={() => setIsOpen(!isOpen)}>
//         {selectedOption || "Select an option"}
//         <span className={`arrow ${isOpen ? "open" : ""}`}></span>
//       </div>
//       {isOpen && (
//         <ul className="select-options">
//           {options.map((option) => (
//             <li
//               key={option}
//               className={`select-option ${
//                 selectedOption === option ? "selected" : ""
//               }`}
//               onClick={() => handleOptionClick(option)}
//             >
//               {option}
//               {selectedOption === option && (
//                 <span className="tick">✔</span>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SelectMenu;


import React from 'react';

function SelectMenu({ options, selected, onChange }) {
  return (
    <select value={selected} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default SelectMenu;
