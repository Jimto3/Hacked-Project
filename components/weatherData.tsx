import { useEffect, useState } from "react";
import { fetchWeatherApi } from "openmeteo";

interface WeatherData {
  hourly: {
    time: Date[];
    temperature2m: number[];
    precipitation: number[];
  };
}

export const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const params = {
            latitude: 52.6278,
            longitude: 1.2983,
            hourly: ["temperature_2m", "precipitation"],
            past_hours: 1,
            forecast_days: 1,
            forecast_hours: 12
        };

        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);

        const response = responses[0];

        const utcOffsetSeconds = response.utcOffsetSeconds();
        const hourly = response.hourly()!;

        const range = (start: number, stop: number, step: number) =>
          Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

        const weatherData: WeatherData = {
          hourly: {
            time: range(
              Number(hourly.time()),
              Number(hourly.timeEnd()),
              hourly.interval()
            ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
            temperature2m: Array.from(hourly.variables(0)!.valuesArray()!),
            precipitation: Array.from(hourly.variables(1)!.valuesArray()!),
          },
        };

        setWeatherData(weatherData);
      } catch (err) {
        setError("Failed to fetch weather data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return { weatherData, loading, error };
};
