// import { useState } from 'react';

// const menuItems = [
//   {
//     title: "Introduction",
//     description: "Re-usable components built using Radix UI and Tailwind CSS.",
//     image: "/vercel.svg", // Image path
//   },
//   {
//     title: "Installation",
//     description: "How to install dependencies and structure your app.",
//     image: "/next.svg", // Image path
//   },
//   {
//     title: "Typography",
//     description: "Styles for headings, paragraphs, lists...etc",
//     image: "/images/typography.png", // Image path
//   },
// ];

// export default function NavigationMenu() {
//   const [activeImage, setActiveImage] = useState(menuItems[0].image);

//   return (
//     <div className="flex space-x-4">
//       <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
//         <h2 className="text-lg font-semibold mb-4">Getting Started</h2>
//         <ul className="space-y-2">
//           {menuItems.map((item, index) => (
//             <li key={index}>
//               <a
//                 href="#"
//                 onMouseEnter={() => setActiveImage(item.image)}
//                 className="block p-2 hover:bg-gray-200 rounded"
//               >
//                 <h3 className="font-semibold">{item.title}</h3>
//                 <p className="text-sm text-gray-600">{item.description}</p>
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden">
//         <img src={activeImage} alt="Current section" className="w-64 h-64 object-cover" />
//       </div>
//     </div>
//   );
// }
