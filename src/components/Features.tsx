import { ClockIcon, CloudIcon, LayoutIcon, PaletteIcon, Share2Icon, SparklesIcon } from "lucide-react";

const features = [
  {
    name: "AI-Powered Layout",
    description: "Smart algorithms arrange your photos perfectly every time",
    icon: SparklesIcon,
  },
  {
    name: "Lightning Fast",
    description: "Create beautiful collages in seconds, not hours",
    icon: ClockIcon,
  },
  {
    name: "Multiple Layouts",
    description: "Choose from dozens of pre-designed templates",
    icon: LayoutIcon,
  },
  {
    name: "Custom Styling",
    description: "Customize colors, borders, and spacing to match your style",
    icon: PaletteIcon,
  },
  {
    name: "Easy Sharing",
    description: "Share your creations directly to social media",
    icon: Share2Icon,
  },
  {
    name: "Cloud Storage",
    description: "Access your collages from anywhere, anytime",
    icon: CloudIcon,
  },
];

export default function Features() {
  return (
    <div id="features" className="py-16">
      <div className="section-wrapper">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Features</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">Everything you need to create amazing collages</p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="flow-root bg-white px-6 pb-8 rounded-lg border border-gray-100 hover:border-pink-200 transition-colors duration-300">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-pink-700 rounded-md shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                    <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
