import { Project } from "../interfaces/Project";
import { destroyDigitalocean } from "../lib/provider/digitalocean/destoy";
import { getListView } from "../views/list";
import { HandlerOptions } from "@zeit/integration-utils";
import { destroyProject } from "../lib/zeit";

export const destroy = async (project: Project, options: HandlerOptions) => {
    switch(project.type){
        case 'Self hosted':
            break;
        case 'DigitalOcean':
            await destroyDigitalocean(project.apiKey, project);
            break;
    }

    await destroyProject(project.id, options);

    return getListView(options);
}
