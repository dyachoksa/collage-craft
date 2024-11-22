export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="prose prose-base prose-a:text-primary-600 max-w-none">{children}</div>
    </div>
  );
}
