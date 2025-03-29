import type { Route } from "./+types/home";
import ImageDisplay from "app/components/image_display"
import Accessory from "~/components/accessory";
import {useState} from "react";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
    const [selectedAccessory, setSelectedAccessory] = useState<string | null>(null);
  return (
      <div
          className="bg-gradient-to-br from-[#ffb627] via-[#fad643] to-[#ff5c8a] bg-black w-full h-screen flex flex-col items-center">
          <ImageDisplay selectedAccessory={selectedAccessory}/>
          <Accessory onSelect={setSelectedAccessory}/>
      </div>
  );
}
