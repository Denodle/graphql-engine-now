import fetch from "node-fetch";

const BASE_URL = "https://api.digitalocean.com/v2";

export const validateDigitaloceanKey = async (token: string) => {

    try {
        const response = await fetch(`${BASE_URL}/sizes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        return response.status === 200;
    } catch (e) {
        return false;
    }

};
