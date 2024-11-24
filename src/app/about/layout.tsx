export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-16 section-wrapper">
      <div className="prose prose-base prose-a:text-primary-600 max-w-none">{children}</div>
    </div>
  );
}
