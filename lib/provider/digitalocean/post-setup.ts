import fetch from "node-fetch";
import { Project } from "../../../interfaces/Project";
import { HandlerOptions } from "@zeit/integration-utils";
import { checkHealth } from "../../../checks/health";

const BASE_URL = "https://api.digitalocean.com/v2";

export const postSetupDigitalocean = async (project: Project, options: HandlerOptions) => {

    try {
        const response = await fetch(`${BASE_URL}/droplets`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${project.apiKey}`
            }
        });
        const { droplets } = await response.json();

        const droplet = droplets.find((d: any) => d.name === 'Hasura-' + project.id);

        if (droplet && droplet.status === 'active'){
            const newProject = { ...project, url: "http://" + droplet.networks['v4'][0].ip_address + "/" };
            const health = await checkHealth(newProject);

            if(!health){
                return false;
            }
        }

        if(droplet && droplet.status === 'active'){

            const metadata = await options.zeitClient.getMetadata();
            metadata.projects = metadata.projects || [];

            const newProject = { ...project, url: "http://" + droplet.networks['v4'][0].ip_address + "/", created: true };
            metadata.projects = metadata.projects.filter((p: Project) => p.id !== project.id);
            metadata.projects = [...metadata.projects, { ...newProject }];

            const urlSecret = await options.zeitClient.ensureSecret('graphql-url', newProject.url);
            await options.zeitClient.upsertEnv(project.id, `GRAPHQL_URL`, urlSecret);

            await options.zeitClient.setMetadata(metadata);

            return true;
        }

        return false;

    } catch (e) {
        return false;
    }

};
