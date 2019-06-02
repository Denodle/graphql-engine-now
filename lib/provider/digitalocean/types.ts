import fetch from "node-fetch";

const BASE_URL = "https://api.digitalocean.com/v2";

export const typesDigitalocean = async (token: string) => {

    try {
        const response = await fetch(`${BASE_URL}/sizes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const { sizes } = await response.json();
        return sizes.filter((r: any) => r.available).map((r: any) => ({
            slug: r.slug,
            ram: r.memory,
            cpu: r.vcpus,
            storage: r.disk,
        }));
    } catch (e) {
        return [];
    }

};
