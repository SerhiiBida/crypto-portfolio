import axios from "axios";

import env from "../../env.js";


const getOptions = (method = "GET", url) => {
    return {
        method,
        url,
        headers: {
            "x-rapidapi-key": env.CG_X_RAPIDAPI_KEY,
            "x-rapidapi-host": env.CG_X_RAPIDAPI_HOST
        }
    }
};

export const getCoinsList = async () => {
    // Problem: 11-13 thousand coins...
    const url = "https://coingecko.p.rapidapi.com/coins/list";

    const options = getOptions(undefined, url);

    try {
        const response = await axios.request(options);

        return response.data;

    } catch (error) {
        console.error(error);
    }
};