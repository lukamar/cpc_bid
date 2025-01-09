export default function Card({ title, children }) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h2 className="text-lg font-medium mb-4">{title}</h2>
      {children}
    </div>
  );
}