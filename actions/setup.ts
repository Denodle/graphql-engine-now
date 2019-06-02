import { Project } from "../interfaces/Project";
import { getListView } from "../views/list";
import { HandlerOptions } from "@zeit/integration-utils";
import generator from 'generate-password';
import { setupDigitalocean } from "../lib/provider/digitalocean/setup";
import { updateProject, addProject } from "../lib/zeit";
import { setupHeroku } from "../lib/provider/heroku/setup";
import { getUrl } from "../lib/url";

export const setup = async (project: Project, options: HandlerOptions, config: any) => {

    const setupProjectAdminSecret = async () => {
        const adminSecret = generator.generate({
            length: 16,
            numbers: true,
        });

        const newProject = { ...project, secret: adminSecret };
        await updateProject(newProject, options);

        const passwordSecret = await options.zeitClient.ensureSecret('graphql-secret', adminSecret);
        await options.zeitClient.upsertEnv(newProject.id, `GRAPHQL_SECRET`, passwordSecret);

        return newProject;
    }

    switch (project.type) {
        case 'Self hosted':
            const urlSecret = await options.zeitClient.ensureSecret('graphql-url', getUrl(project.url, 'v1/graphql'));
            const passwordSecretSelf = await options.zeitClient.ensureSecret('graphql-secret', project.secret);
            await options.zeitClient.upsertEnv(project.id, `GRAPHQL_URL`, urlSecret);
            await options.zeitClient.upsertEnv(project.id, `GRAPHQL_SECRET`, passwordSecretSelf);

            await addProject(project, options);
            break;
        case 'DigitalOcean':
            const newProjectDO = await setupProjectAdminSecret();
            await setupDigitalocean(newProjectDO.apiKey, newProjectDO, config);
            break;
        case 'Heroku':
            const newProjectH = await setupProjectAdminSecret();
            await setupHeroku(newProjectH.apiKey, newProjectH, config);
            break;
    }

    return getListView(options);
}
