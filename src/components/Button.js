import classes from "../Styles/Button.module.css";

export default function Button({ className, children, ...rest }) {
  //console.log(`${classes.button} ${className}`);
  return (
    <button className={`${classes.button} ${className}`} {...rest}>
      {children}
    </button>
  );
}
