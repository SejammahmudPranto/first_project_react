export default function Label({ className, children, ...rest }) {
  return (
    <label className={className}>
      {" "}
      <input type="checkbox" {...rest} /> {children}{" "}
    </label>
  );
}
