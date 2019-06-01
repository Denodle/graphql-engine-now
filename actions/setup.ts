import { Project } from "../interfaces/Project";
import { getListView } from "../views/list";
import { HandlerOptions } from "@zeit/integration-utils";
import { setupDigitalocean } from "../lib/provider/digitalocean/setup";

export const setup = async (project: Project, options: HandlerOptions, config: any) => {

    const metadata = await options.zeitClient.getMetadata();
    metadata.projects = metadata.projects || [];

    switch (project.type) {
        case 'Self hosted':
            const urlSecret = await options.zeitClient.ensureSecret('graphql-url', project.url);
            const passwordSecret = await options.zeitClient.ensureSecret('graphql-secret', project.secret);
            await options.zeitClient.upsertEnv(project.id, `GRAPHQL_URL`, urlSecret);
            await options.zeitClient.upsertEnv(project.id, `GRAPHQL_SECRET`, passwordSecret);

            metadata.projects = [...metadata.projects, { ...project } ];
            break;

        case 'DigitalOcean':
            const token = '';
            await setupDigitalocean(token, project, config);
            break;
    }

    await options.zeitClient.setMetadata(metadata);

    return getListView(options);
}
