import * as React from "react";
const Bank = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={39}
    viewBox="0 0 48 49"
    fill="none"
    {...props}
    style={{marginTop:'-8px', marginLeft:'-0.5px'}}
  >
    <path
      d="M8 17.8999L24 10.8999L40 17.8999"
      stroke="#fff"
      strokeWidth={2}
    />
    <path d="M13.5 19.8999L13.5 33.8999" stroke="#fff" strokeWidth={2} />
    <path d="M20.5 19.8999L20.5 33.8999" stroke="#fff" strokeWidth={2} />
    <path d="M27.5 19.8999L27.5 33.8999" stroke="#fff" strokeWidth={2} />
    <path d="M34.5 19.8999L34.5 33.8999" stroke="#fff" strokeWidth={2} />
    <path d="M9 37.8999H39" stroke="#fff" strokeWidth={2} />
  </svg>
);
export default Bank;
