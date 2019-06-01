import fetch from "node-fetch";
import { Project } from "../../../interfaces/Project";

const BASE_URL = "https://api.digitalocean.com/v2";

export const destroyDigitalocean = async (token: string, project: Project) => {

    try {
        const responseAllDroplets = await fetch(`${BASE_URL}/droplets`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        const AllDroplets = await responseAllDroplets.json();

        const projectID = AllDroplets.droplets.find((droplet: any) => droplet.name === 'Hasura-' + project.api.name);

        const response = await fetch(`${BASE_URL}/droplets/${projectID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const json = await response.json();
        return true;
    } catch (e) {
        return false;
    }

};
