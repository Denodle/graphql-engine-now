import { Project } from "../interfaces/Project";
import { getListView } from "../views/list";
import { HandlerOptions } from "@zeit/integration-utils";
import generator from 'generate-password';
import { setupDigitalocean } from "../lib/provider/digitalocean/setup";
import { updateProject, addProject } from "../lib/zeit";

export const setup = async (project: Project, options: HandlerOptions, config: any) => {

    switch (project.type) {
        case 'Self hosted':
            const urlSecret = await options.zeitClient.ensureSecret('graphql-url', project.url);
            const passwordSecretSelf = await options.zeitClient.ensureSecret('graphql-secret', project.secret);
            await options.zeitClient.upsertEnv(project.id, `GRAPHQL_URL`, urlSecret);
            await options.zeitClient.upsertEnv(project.id, `GRAPHQL_SECRET`, passwordSecretSelf);

            await addProject(project, options);
            break;

        case 'DigitalOcean':
            const adminSecret = generator.generate({
                length: 16,
                numbers: true,
            });

            const passwordSecretDO = await options.zeitClient.ensureSecret('graphql-secret', adminSecret);
            await options.zeitClient.upsertEnv(project.id, `GRAPHQL_SECRET`, passwordSecretDO);
            await setupDigitalocean(project.apiKey, project, config);

            const newProject = { ...project, secret: adminSecret };
            await updateProject(newProject, options);
            break;
    }

    return getListView(options);
}
