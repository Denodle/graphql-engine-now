import fetch from "node-fetch";

const BASE_URL = "https://api.heroku.com";

export const validateKeyHeroku = async (token: string) => {

    try {
        const response = await fetch(`${BASE_URL}/account`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/vnd.heroku+json; version=3",
                Authorization: `Bearer ${token}`
            }
        });

        return response.status === 200;
    } catch (e) {
        return false;
    }

};
