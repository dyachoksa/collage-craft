const examples = [
  {
    title: "Travel Memories",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Family Portrait",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Food Collection",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Examples() {
  return (
    <div id="examples" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Stunning Examples</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            See what&apos;s possible with our AI-powered collage maker
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {examples.map((example) => (
            <div key={example.title} className="relative group">
              <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 transition-opacity duration-300">
                <img src={example.image} alt={example.title} className="w-full h-full object-center object-cover" />
              </div>
              <h3 className="mt-6 text-base font-semibold text-gray-900">{example.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
