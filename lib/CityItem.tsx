/*
A single city component containing basic information about today's weather
(city name, current temperature, max temperature, min temperature )
*/

import Image from "next/image";

type PropsType = {
  key: string;
  name: string;
  temp: string;
  maxTemp: string;
  minTemp: string;
  icon: string;
};

const CityItem = (props: PropsType) => {
  return (
    <div className="w-[100%] h-[133px] bg-secondary rounded-[25px] px-[17px] py-[25px] text-white flex justify-center md:justify-between gap-[2vw]  ">
      <div className="flex flex-col justify-between">
        <div className="flex items-end gap-[5px]">
          <p className="text-5xl xl:text-4xl">
            {Math.round(Number(props.temp)) + "\u00B0"}
          </p>
          <p className="text-xs text-[#676B73]">
            H: {Math.round(Number(props.maxTemp))}
            <br />
            L: {Math.round(Number(props.minTemp))}
          </p>
        </div>
        <p className="text-[15px]">{props.name}</p>
      </div>
      <div className="self-end">
        <Image
          alt="weather icon"
          width={50}
          height={50}
          src={`https:${props.icon}`}
        ></Image>
      </div>
    </div>
  );
};
export default CityItem;
