import { Project } from "../interfaces/Project";
import { HandlerOptions } from "@zeit/integration-utils";
import { postSetupDigitalocean } from "../lib/provider/digitalocean/post-setup";

export const postSetup = async (project: Project, options: HandlerOptions) => {
    switch (project.type) {
        case 'Self hosted':
            break;
        case 'DigitalOcean':
            await postSetupDigitalocean(project, options);
            break;
    }
}
