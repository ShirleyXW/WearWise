import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "~/components/ui/carousel"
import {useState} from "react";
import {Card, CardContent} from "~/components/ui/card";
import acc3Url from "/assets/glasses/acc3.png";
import acc4Url from "/assets/glasses/acc4.png";
import acc5Url from "/assets/glasses/acc5.png";
import acc6Url from "/assets/glasses/acc6.png";
import acc7Url from "/assets/glasses/acc7.png";


const Accessory = ({ onSelect }: { onSelect: (imgUrl: string | null) => void }) => {
    const accessories = [acc3Url, acc4Url, acc5Url, acc6Url, acc7Url];
    const [selectedAccessory, setSelectedAccessory] = useState<string | null>(null);
    const wearAccessory = (imgUrl:string) => {
        const newSelection = selectedAccessory === imgUrl ? null : imgUrl;
        setSelectedAccessory(newSelection);
        onSelect(newSelection);
    }
    return (
        <Carousel>
            <CarouselContent className="-ml-1 h-full">
                {accessories.map((url, index) => (
                    <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6"
                                             onClick={() => wearAccessory(url)}>
                                    <img className="text-2xl font-semibold" src={url}  alt={`accessory_${index}`}/>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute z-30"/>
            <CarouselNext className="absolute z-30"/>
        </Carousel>
    )
}
export default Accessory