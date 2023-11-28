import PropTypes from "prop-types";

import "./Button.scss";

export default function Button({
  visible,
  text,
  className,
  onClick,
  children,
  variant,
  type,
  disabled,
  size,
  shape,
  testId,
}) {
  function handleClick(e) {
    if (onClick) {
      onClick(e);
    }
  }

  if (!visible) {
    return null;
  }

  return (
    <button
      data-testid={testId}
      className={`bj-button ${variant} ${type} ${size} ${shape} ${
        className ?? ""
      }`}
      disabled={disabled}
      onClick={handleClick}
    >
      {!!text && <div>{text}</div>}
      {!text && !!children && children}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  variant: PropTypes.oneOf(["default", "fire"]),
  type: PropTypes.oneOf(["contained", "outlined"]),
  size: PropTypes.oneOf(["small", "normal", "large"]),
  shape: PropTypes.oneOf(["straight", "rounded"]),
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  testId: PropTypes.string.isRequired,
};

Button.defaultProps = {
  variant: "default",
  type: "contained",
  size: "normal",
  shape: "straight",
  disabled: false,
  visible: true,
};
