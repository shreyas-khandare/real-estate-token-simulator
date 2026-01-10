export default function Card({ children }) {
  return (
    <div className="border rounded bg-white shadow-sm p-4">
      {children}
    </div>
  );
}
