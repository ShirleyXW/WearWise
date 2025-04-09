import type { Route } from "./+types/home";
import ImageDisplay from "app/components/image_display"
import Accessory from "~/components/accessory";
import {useState} from "react";
import shop_top from "/assets/shop/top.png"
import cat from "/assets/character/cat3.png"
export function meta({}: Route.MetaArgs) {
  return [
    { title: "✨Try It On! 🕶️" },
    { name: "description", content: "Welcome to Xinli's accessory shop!" },
  ];
}

export default function Home() {
    const [selectedAccessory, setSelectedAccessory] = useState<string | null>(null);
  return (
      <div>
          <div className="absolute top-4 left-4 text-white text-s opacity-70">
              by Xinli 😎
          </div>

          <div
              className="absolute z-1 lg:left-250 lg:top-40 lg:w-40 lg:h-40 md:w-40 md:h-40 md:right-20 md:top-30 animate-bounce"
              style={{animationDuration: '5s'}}>
                  <div className="bg-white text-black py-1 px-6 w-[200px] rounded-3xl text-sm shadow-md animate-bounce" style={{animationDuration: '5s'}}>
                      Try some glasses! 😽
                  </div>

              <img src={cat} alt="cat" className="w-full h-full"/>
          </div>
          <div
              className="bg-gradient-to-br from-[#ffb627] via-[#fad643] to-[#ff5c8a] w-full h-screen flex flex-col items-center">
              <ImageDisplay selectedAccessory={selectedAccessory}/>
              <img
                  src={shop_top}
                  alt="Shop Top Canopy"
                  className="absolute top-110 z-10 w-full max-w-md md:max-w-xl lg:max-w-3xl lg:h-70 md:h-70 pointer-events-none"
              />
              <div className="relative w-1/3 h-1/3 lg:mt-20 md:mt-20">
                  <Accessory onSelect={setSelectedAccessory}/>
              </div>
          </div>
      </div>
  );
}
