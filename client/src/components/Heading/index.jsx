import React from "react";

const sizes = {
  xl: "text-[40px] font-bold leading-[49px] md:text-[38px] sm:text-4xl",
  s: "text-[17px] font-semibold leading-[100%]",
  md: "text-[35px] font-bold leading-[43px] md:text-[33px] sm:text-[31px]",
  xs: "text-base font-bold",
  lg: "text-[38px] font-bold leading-[47px] md:text-4xl sm:text-[34px]",
};

const Heading = ({ children, className = "", size = "s", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`text-black-900_01 font-poppins ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
