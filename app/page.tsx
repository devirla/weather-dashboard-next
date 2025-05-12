import MainBox from "@/lib/MainBox";
import DailyBox from "@/lib/DailyBox";
import HighlightBox from "@/lib/HighlightBox";
import CitiesBox from "@/lib/CitiesBox";
import SearchBar from "@/lib/SearchBar";
import { auth } from "@/auth";
import SignInButton from "@/lib/SignInButton";
import SignOutButton from "@/lib/SignOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { highlightxDataType, mainDataType } from "@/types.ds";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  let city: string = "";

  query == undefined ? (city = "Warsaw") : (city = query);
  console.log("Query" + city);

  const session = await auth();

  const dataCurrent = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=a530cc803efe4ab2a1b204603252503&q=${city}`
  );
  const currentWeather = await dataCurrent.json();

  const dataForecast = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=a530cc803efe4ab2a1b204603252503&q=${city}&days=3`
  );

  const forecastWeather = await dataForecast.json();

  const MainBoxData: mainDataType = {
    name: currentWeather.location.name,
    date: currentWeather.location.localtime,
    temp: {
      c: currentWeather.current.temp_c,
      f: currentWeather.current.temp_f,
    },
    condition: {
      text: currentWeather.current.condition.text,
      icon: currentWeather.current.condition.icon,
    },
    feelsLike: {
      c: currentWeather.current.feelslike_c,
      f: currentWeather.current.feelslike_f,
    },
    minTemp: {
      c: forecastWeather.forecast.forecastday[0].day.mintemp_c,
      f: forecastWeather.forecast.forecastday[0].day.mintemp_f,
    },
    maxTemp: {
      c: forecastWeather.forecast.forecastday[0].day.maxtemp_c,
      f: forecastWeather.forecast.forecastday[0].day.maxtemp_f,
    },
  };

  const DailyBoxData = {
    sunrise: forecastWeather.forecast.forecastday[0].astro.sunrise,
    sunset: forecastWeather.forecast.forecastday[0].astro.sunset,
    nextDay: {
      temp: {
        c: forecastWeather.forecast.forecastday[1].day.avgtemp_c,
        f: forecastWeather.forecast.forecastday[1].day.avgtemp_f,
      },
      condition: {
        text: forecastWeather.forecast.forecastday[1].day.condition.text,
        icon: forecastWeather.forecast.forecastday[1].day.condition.icon,
      },
    },
  };

  const HighlightBoxData: highlightxDataType = {
    windStatus: currentWeather.current.wind_kph,
    humidity: currentWeather.current.humidity,
  };

  return (
    <div className="min-h-screen min-w-[360px] w-full bg-primary p-[8vw] xl:px-[15vw] xl:py-[3vh]">
      <nav className="sm:pb-[2vh] md:pb-[8vh] ">
        {session?.user ? (
          <div className="flex flex-col-reverse ">
            <div className="m-auto w-[60%] lg:w-[40%] lx:w-30%] pt-[6vh]">
              <SearchBar />
            </div>
            <div className="text-white flex gap-[2vw] justify-end pb-[3vh]">
              <div className="flex gap-[10px]">
                {session.user.image && (
                  <Avatar>
                    <AvatarImage src={session.user.image} />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                )}
                <p className="text-lg py-[1vh]"> {session.user.name}</p>
              </div>

              <SignOutButton />
            </div>
          </div>
        ) : (
          <div className="flex justify-end">
            <SignInButton />
          </div>
        )}
      </nav>
      <div
        className="w-full flex flex-col xl:flex-row
       xl:gap-[30px] pt-[30px] xl:justify-around"
      >
        <div className="w-full xl:w-[80%] flex flex-col gap-[50px]">
          <MainBox city={city} />
          <DailyBox city={city} />
        </div>
        <div className="flex flex-col gap-[50px]">
          <HighlightBox city={city} />
          <CitiesBox city={city} />
        </div>
      </div>
    </div>
  );
}
