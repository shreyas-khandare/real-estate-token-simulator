export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
}) {
  const base = "px-3 py-2 rounded text-sm transition";

  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-700 border hover:bg-gray-200",
  };

  return (
    <button type={type} onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
}
