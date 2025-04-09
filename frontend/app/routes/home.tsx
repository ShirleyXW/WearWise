import type { Route } from "./+types/home";
import ImageDisplay from "app/components/image_display"
import Accessory from "~/components/accessory";
import {useState} from "react";
import shop_top from "/assets/shop/top.png"
export function meta({}: Route.MetaArgs) {
  return [
    { title: "✨Try It On! 🕶️" },
    { name: "description", content: "Welcome to Xinli's accessory shop!" },
  ];
}

export default function Home() {
    const [selectedAccessory, setSelectedAccessory] = useState<string | null>(null);
  return (
      <div
          className="bg-gradient-to-br from-[#ffb627] via-[#fad643] to-[#ff5c8a] bg-black w-full h-screen flex flex-col items-center">
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
  );
}
