import React from "react";

const sizes = {
  xs: "text-sm font-medium leading-[18px]",
  lg: "text-xl font-medium leading-[100%]",
  s: "text-[15px] font-medium leading-[19px]",
  md: "text-base font-normal leading-5",
};

const Text = ({ children, className = "", as, size = "md", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-black-900_01 font-inter ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
