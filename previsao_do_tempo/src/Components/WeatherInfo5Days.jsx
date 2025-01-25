function WeatherInfo5Days ({ weather_5days }) {
  
  if (!weather_5days || !weather_5days.list) {
    return;
  }

  let daysForecast = {};

  for(let forecast of weather_5days.list) {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();

    if(!daysForecast[date]){
        daysForecast[date] = forecast
    }
  }
  const nextDays = Object.values(daysForecast).slice(1,6);
  console.log(nextDays);
  
  return (
    <div className="bg-white p-7 pb-10 rounded-lg shadow-md w-full max-w-5xl mb-36">
      <h2 className="text-2xl font-bold text-gray-600 mb-4 text-center">
        Próximos 5 dias
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-9">
        {nextDays.map((forecast) => (
          <div
            key={forecast.dt}
            className="bg-blue-100 text-white p-6 rounded shadow hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out w-full "
          >
            <p className="text-lg font-semibold text-gray-600">
              {new Date(forecast.dt * 1000).toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <div className="flex items-center justify-center my-2">
              <img
                src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                alt="Ícone do clima"
              />
            </div>
            <p className="text-gray-700 text-center italic mb-2">
              {forecast.weather[0].description}
            </p>
            <p className="text-sm text-gray-600">
              Temperatura mín:{" "}
              <span className="font-semibold">
                {Math.round(forecast.main.temp_min)} ºC
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Temperatura máx:{" "}
              <span className="font-semibold">
                {Math.round(forecast.main.temp_max)} ºC
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Sensação térmica:{" "}
              <span className="font-semibold">
                {Math.round(forecast.main.feels_like)} ºC
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Umidade:{" "}
              <span className="font-semibold">{forecast.main.humidity}%</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default WeatherInfo5Days;