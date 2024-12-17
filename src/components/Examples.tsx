import Image from "next/image";

const examples = [
  {
    title: "Travel Memories",
    image: "/images/travel-memories.webp",
  },
  {
    title: "Family Portrait",
    image: "/images/family-portrait.webp",
  },
  {
    title: "Food Collection",
    image: "/images/food-collection.webp",
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
                <Image
                  src={example.image}
                  width={480}
                  height={343}
                  alt={example.title}
                  className="w-full h-auto object-center object-cover"
                />
              </div>
              <h3 className="mt-6 text-base font-semibold text-gray-900">{example.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
