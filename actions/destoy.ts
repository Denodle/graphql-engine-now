import { Project } from "../interfaces/Project";
import { destroyDigitalocean } from "../lib/provider/digitalocean/destoy";
import { getListView } from "../views/list";
import { HandlerOptions } from "@zeit/integration-utils";

export const destroy = async (project: Project, options: HandlerOptions) => {
    switch(project.type){
        case 'Self hosted':
            break;
        case 'DigitalOcean':
            const token = '';
            await destroyDigitalocean(token, project);
            break;
    }

    let metadata = await options.zeitClient.getMetadata();
    metadata.projects = metadata.projects || [];
    metadata.projects = metadata.projects.filter((p: Project) => project.id !== p.id);
    await options.zeitClient.setMetadata(metadata);

    return getListView(options);
}
