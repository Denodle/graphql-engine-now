import fetch from "node-fetch";

const BASE_URL = "https://api.digitalocean.com/v2";

export const regionsDigitalocean = async (token: string) => {

    try {
        const response = await fetch(`${BASE_URL}/regions`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const { regions } = await response.json();
        return regions.filter((r: any) => r.available).map((r: any) => ({ name: r.name, slug: r.slug }));
    } catch (e) {
        return [];
    }

};
