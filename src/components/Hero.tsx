import Image from "next/image";

import { ArrowRightIcon, Wand2Icon } from "lucide-react";

import designInspirationSvg from "~/assets/undraw-design-inspiration.svg";

export default function Hero() {
  return (
    <>
      <div className="section-wrapper">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="py-10 sm:py-12 md:py-16 lg:py-20 xl:py-28">
            <div className="text-center md:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Create stunning collages</span>
                <span className="block text-pink-700">in seconds with AI</span>
              </h1>

              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:mx-auto md:mt-5 md:text-xl">
                Transform your photos into beautiful collages automatically. Our AI-powered tool arranges your images
                perfectly, every time.
              </p>

              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center md:justify-start">
                <div className="rounded-md shadow">
                  <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-700 hover:bg-pink-800 md:py-4 md:text-lg md:px-10">
                    <Wand2Icon className="h-5 w-5 mr-2" />
                    Try it free
                  </button>
                </div>

                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-pink-700 bg-pink-100 hover:bg-pink-200 md:py-4 md:text-lg md:px-10">
                    View examples
                    <ArrowRightIcon className="h-5 w-5 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="py-4 sm:py-6 md:py-8 lg:py-10 xl:py-14">
            <Image src={designInspirationSvg} alt="Collage Generator" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </>
  );
}
