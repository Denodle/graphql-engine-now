import { Project } from "../interfaces/Project";
import { validateKeyDigitalocean } from "../lib/provider/digitalocean/validate-key";
import { validateKeyHeroku } from "../lib/provider/heroku/validate-key";

export const validateProvider = async (project: Project) => {

    switch (project.type) {
        case 'DigitalOcean':
            return await validateKeyDigitalocean(project.apiKey);
        case 'Heroku':
            return await validateKeyHeroku(project.apiKey);
    }

    return false;
}
