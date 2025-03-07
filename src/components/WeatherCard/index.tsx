import * as C from "./styles";
import ArrowUp from "../../images/icons/upload.png";
import ArrowDown from "../../images/icons/download.png";
import Raindrop from "../../images/icons/raindrop-close-up.png";
import Umbrella from "../../images/icons/protection-symbol-of-opened-umbrella-silhouette-under-raindrops.png"
import { Weather } from "../../types/Weather";
import { formatDate } from "../../helpers/formatDate";
import { celsiusToFahrenheit } from "../../helpers/celsiusToFahrenheit";
import { useEffect, useState } from "react";
import { mmToInch } from "../../helpers/mmToInch";

export const WeatherCard = ({ item }: { item: Weather }) => {
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [precipitation, setPrecipitation] = useState('');

    useEffect(() => {
        setMin(item.temperature.min + "°C");
        setMax(item.temperature.max + "°C");
        setPrecipitation(item.rain.precipitation + "mm");
    }, []);

    function handleClick(value: string) {
        if (value.includes("°C")) {
            value.includes("max") && setMax(celsiusToFahrenheit(value.replace("max", "")));
            value.includes("min") && setMin(celsiusToFahrenheit(value.replace("min", "")));
        }
        if (value.includes("°F")) {
            value.includes("max") && setMax(item.temperature.max + "°C");
            value.includes("min") && setMin(item.temperature.min + "°C");
        }
        if (value.includes("prec")) {
            value.includes("mm") && setPrecipitation(mmToInch(value.replace("mm", "")));
            value.includes("inch") && setPrecipitation(item.rain.precipitation + "mm");
        }
    };

    return (
        <C.Container>
            <C.Info>
                <C.Date>{formatDate(item.date)}</C.Date>
                <C.Resume>{item.text}</C.Resume>
            </C.Info>
            <C.Statistics>
                <C.Max onClick={() => handleClick(max + "max")}>
                    <C.Icon
                        src={ArrowUp}
                        alt="Arrow up icon"
                    />
                    <C.Text textColor="#0478BD">{max}</C.Text>
                </C.Max>
                <C.Min onClick={() => handleClick(min + "min")}>
                    <C.Icon
                        src={ArrowDown}
                        alt="Arrow down icon"
                    />
                    <C.Text textColor="#C93838">{min}</C.Text>
                </C.Min>
                <C.Precipitation onClick={() => handleClick(precipitation + "prec")}>
                    <C.Icon
                        src={Raindrop}
                        alt="Raindrop icon"
                    />
                    <C.Text textColor="#000">{precipitation}</C.Text>
                </C.Precipitation>
                <C.Probability>
                    <C.Icon
                        src={Umbrella}
                        alt="Umbrella icon"
                    />
                    <C.Text textColor="#000">{item.rain.probability}%</C.Text>
                </C.Probability>
            </C.Statistics>
        </C.Container>
    );
};