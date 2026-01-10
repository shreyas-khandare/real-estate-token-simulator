export default function Page({ title, children }) {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      {title && <h1 className="text-xl font-semibold">{title}</h1>}
      {children}
    </div>
  );
}
