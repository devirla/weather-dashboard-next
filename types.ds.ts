export type mainDataType = {
  name: string;
  date: string;
  temp: {
    c: string;
    f: string;
  };
  condition: {
    text: string;
    icon: string;
  };
  feelsLike: {
    c: string;
    f: string;
  };
  minTemp: {
    c: string;
    f: string;
  };
  maxTemp: {
    c: string,
    f: string,
  },
};

export type highlightxDataType = {
  windStatus: string;
  humidity: string;
};
