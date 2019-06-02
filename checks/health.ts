import { Project } from "../interfaces/Project";
import { getUrl } from "../lib/url";
import fetch from "node-fetch";

export const checkHealth = async (project: Project) => {

    try {
        const response = await fetch(getUrl(project.url, 'healthz'), {
            method: "GET"
        });

        return response.status === 200 && await response.text() === 'OK';
    } catch (e) {
        return false;
    }

}
