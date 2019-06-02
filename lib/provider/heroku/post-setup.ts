import fetch from "node-fetch";
import { Project } from "../../../interfaces/Project";
import { HandlerOptions } from "@zeit/integration-utils";
import { updateProject } from "../../zeit";

const BASE_URL = "https://api.heroku.com";

export const postSetupHeroku = async (project: Project, options: HandlerOptions) => {

    try {
        const response = await fetch(`${BASE_URL}/apps`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/vnd.heroku+json; version=3",
                Authorization: `Bearer ${project.apiKey}`
            }
        });
        const apps = await response.json();

        const app = apps.find((a: any) => a.name.startsWith('hasura-' + project.api.name));

        if (app) {
            const newProject = { ...project, url: app.web_url, created: true };

            const urlSecret = await options.zeitClient.ensureSecret('graphql-url', newProject.url);
            await options.zeitClient.upsertEnv(project.id, `GRAPHQL_URL`, urlSecret);

            await updateProject(newProject, options);

            return true;
        }

        return false;

    } catch (e) {
        return false;
    }

};
