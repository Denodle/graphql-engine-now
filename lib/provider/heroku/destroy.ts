import fetch from "node-fetch";
import { Project } from "../../../interfaces/Project";

const BASE_URL = "https://api.heroku.com";

export const destroyHeroku = async (token: string, project: Project) => {

    try {
        const response = await fetch(`${BASE_URL}/apps`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/vnd.heroku+json; version=3",
                Authorization: `Bearer ${project.apiKey}`
            },
        });
        const apps = await response.json();

        const app = apps.find((a: any) => a.name.startsWith('hasura-' + project.api.name));
        if (app) {

            await fetch(`${BASE_URL}/apps/${app.name}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/vnd.heroku+json; version=3",
                    Authorization: `Bearer ${token}`
                },
            });

            return true;
        }

        return false;
    } catch (e) {
        return false;
    }

};
