import { Project } from "../interfaces/Project";
import { providerFielsDigitalocean } from "../lib/provider/digitalocean/provider-fields";
import { providerFieldsHeroku } from "../lib/provider/heroku/provider-fields";

export const providerFields = async (project: Project) => {

    switch (project.type) {
        case 'DigitalOcean':
            return await providerFielsDigitalocean(project.apiKey);
        case 'Heroku':
            return await providerFieldsHeroku();
    }

    return '';
}
