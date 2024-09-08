import axios from "axios";

import env from "../../env.js";


const getOptions = (method = "GET", url, params = {}) => {
    return {
        method,
        url,
        headers: {
            accept: "application/json",
            "x-cg-demo-api-key": env.X_CG_DEMO_API_KEY
        },
        params: {
            ...params
        },
    }
};

export const getCoinsList = async (coinsId) => {
    const url = "https://api.coingecko.com/api/v3/coins/markets";

    const params = {
        vs_currency: "usd",
        ids: coinsId
    }

    const options = getOptions(undefined, url, params);

    try {
        const response = await axios.request(options);

        return response.data;

    } catch (error) {
        console.error(`Error, getCoinsList: ${error}`);

        return null;
    }
}


export const getCoinData = async (coinId) => {
    const url = "https://api.coingecko.com/api/v3/coins/markets";

    const params = {
        vs_currency: "usd",
        ids: coinId
    }

    const options = getOptions(undefined, url, params);

    try {
        const response = await axios.request(options);

        return response.data;

    } catch (error) {
        console.error(`Error, getCoinsList: ${error}`);

        return null;
    }
}