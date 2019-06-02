import { Project } from "../interfaces/Project";
import { validateDigitaloceanKey } from "../lib/provider/digitalocean/validate-key";

export const validateProvider = async (project: Project) => {

    switch (project.type) {
        case 'DigitalOcean':
            return await validateDigitaloceanKey(project.apiKey);
    }

    return false;
}
