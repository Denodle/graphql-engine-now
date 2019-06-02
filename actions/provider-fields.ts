import { Project } from "../interfaces/Project";
import { providerFielsDigitalocean } from "../lib/provider/digitalocean/provider-fields";

export const providerFields = async (project: Project) => {

    switch (project.type) {
        case 'DigitalOcean':
            return await providerFielsDigitalocean(project.apiKey);
    }

    return '';
}
