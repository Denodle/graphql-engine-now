import fetch from "node-fetch";
import { Project } from "../../../interfaces/Project";

const BASE_URL = "https://api.digitalocean.com/v2";

interface CreateConfig {
    region: string;
    size: string;
}

export const setupDigitalocean = async (token: string, project: Project, config: CreateConfig) => {

    try {
        await fetch(`${BASE_URL}/droplets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: 'Hasura-' + project.api.name,
                region: config.region,
                size: config.size,
                image: "hasura-18-04"
            })
        });
        return true;
    } catch (e) {
        return false;
    }

};
