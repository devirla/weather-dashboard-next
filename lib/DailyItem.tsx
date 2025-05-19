/* 
Single component of 12 hours forecast weather list. It contains
hour, forecast temperature and condition icon. 
*/

import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

type PropsType = {
  key: string;
  time: string;
  conditionIcon: string;
  temperature: string;
};

function DailyItem(props: PropsType) {
  const date = new Date(props.time).toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
  });

  return (
    <CarouselItem className="basis-1/3 sm:basis-1/4">
      <div className="bg-white/6 rounded-[15px] border-solid border-[0.5px] border-[#EAEAEA] px-[2px] py-[10px] flex flex-col  items-center gap-[5px]">
        <p className="text-xs">{date}</p>
        <Image
          className="w-full"
          alt="weather icon"
          width={32}
          height={32}
          src={`https:${props.conditionIcon}`}
        ></Image>
        <p className="text-sm">
          {Math.round(Number(props.temperature)) + "\u00B0"}
        </p>
      </div>
    </CarouselItem>
  );
}
export default DailyItem;
