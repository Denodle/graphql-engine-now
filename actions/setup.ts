import { Project } from "../interfaces/Project";
import { getListView } from "../views/list";
import { HandlerOptions } from "@zeit/integration-utils";
import { setupDigitalocean } from "../lib/provider/digitalocean/setup";

export const setup = async (project: Project, options: HandlerOptions, config: any) => {

    const metadata = await options.zeitClient.getMetadata();
    metadata.projects = metadata.projects || [];

    switch (project.type) {
        case 'Self hosted':
            const urlSecret = await options.zeitClient.ensureSecret(`graphql_url`, options.payload.clientState.url);
            const adminSecret = await options.zeitClient.ensureSecret(`graphql_admin`, options.payload.clientState.secret);
            await options.zeitClient.upsertEnv(options.payload.clientState.project, `GRAPHQL_URL`, urlSecret);
            await options.zeitClient.upsertEnv(options.payload.clientState.project, `GRAPHQL_ADMIN_SECRET`, adminSecret);

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
