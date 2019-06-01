import { Project } from "../interfaces/Project";
import { destroyDigitalocean } from "../lib/provider/digitalocean/destoy";
import { getListView } from "../views/list";
import { HandlerOptions } from "@zeit/integration-utils";

export const destroy = async (project: Project, options: HandlerOptions) => {
    switch(project.type){
        case 'Self hosted':
            // TODO: Implement
            break;
        case 'DigitalOcean':
            const token = '';
            await destroyDigitalocean(token, project);
            break;
    }

    return getListView(options);
}
