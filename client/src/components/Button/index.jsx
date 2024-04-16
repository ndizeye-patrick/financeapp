import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-[7px]",
};
const variants = {
  fill: {
    black_900_01: "bg-black-900_01 text-white-A700_02",
  },
};
const sizes = {
  xs: "h-[52px] px-[35px] text-sm",
  sm: "h-[57px] px-[35px] text-[15px]",
  md: "h-[68px] px-[35px] text-base",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "xs",
  color = "black_900_01",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex items-center justify-center text-center cursor-pointer font-bold bg-black-900_01 ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["xs", "sm", "md"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["black_900_01"]),
};

export { Button };
