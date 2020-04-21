import Axios from "axios";

const url = 'https://covid19.mathdro.id/api';
const dailyurl = 'https://covid19.mathdro.id/api/daily';

const mapurl = 'https://covid19.mathdro.id/api/confirmed';
const countryurl = 'https://covid19.mathdro.id/api/countries';

export const fetchData = async (country) => {
    let changeableUrl = url;

    if (country) {
        changeableUrl = `${url}/countries/${country}`
    }

    try {
        const { data: { confirmed, recovered, deaths, lastUpdate, image, dailySummary} } = await Axios.get(changeableUrl);

        const modifiedData = { confirmed, recovered, deaths, lastUpdate, image, dailySummary };

        return modifiedData;

    } catch(error) {
        return error;
    }
}

export const fetchDailyData = async() => {
    try {
        const { data } = await Axios.get(dailyurl);

        return data.map(({confirmed, deaths, recovered, reportDate: date}) => ({confirmed: confirmed.total, recovered: recovered.total, deaths: deaths.total, date}));
    } catch(error) {
        return error;
    }
}

export const fetchMapData = async () => {
    try {
        const { data } = await Axios.get(mapurl);  

        return data.map(({ lat: latitude, long: longitude, countryRegion: name, confirmed}) => ({ latitude, longitude, name, confirmed }));
    } catch(error) {
        return error;
    }
}