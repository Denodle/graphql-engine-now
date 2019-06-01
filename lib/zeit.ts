import { HandlerOptions } from "@zeit/integration-utils";

export const getProject = async (id: string, options: HandlerOptions) => {

    const metadata = await options.zeitClient.getMetadata();
    metadata.projects = metadata.projects || [];

    const projectFromMetadata = metadata.projects.find((project: any) => project.id === id);

    if(projectFromMetadata){
        const projectInfoFromApi = await options.zeitClient.fetchAndThrow(`/v1/projects/${id}`, {});
        return { ...projectFromMetadata, api: { ...projectInfoFromApi } };
    }

    return null;

}
