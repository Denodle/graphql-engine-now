import { HandlerOptions } from "@zeit/integration-utils";
import { Project } from "../interfaces/Project";

export const getProject = async (id: string, options: HandlerOptions) => {

    const metadata = await options.zeitClient.getMetadata();
    metadata.projects = metadata.projects || [];

    const projectFromMetadata = metadata.projects.find((project: any) => project.id === id);

    if(projectFromMetadata){
        const projectInfoFromApi = await options.zeitClient.fetchAndThrow(`/v1/projects/${id}`, {});
        return { ...projectFromMetadata, api: { name: projectInfoFromApi.name } };
    }

    return null;

}

export const addProject = async (project: Project, options: HandlerOptions) => {
    const metadata = await options.zeitClient.getMetadata();
    metadata.projects = [ ...metadata.projects, { ...project, api: { name: project.api.name } } ];
    await options.zeitClient.setMetadata(metadata);
};

export const updateProject = async (project: Project, options: HandlerOptions) => {
    const metadata = await options.zeitClient.getMetadata();
    metadata.projects = metadata.projects.filter(({id}: Project) => id !== project.id)
    metadata.projects = [ ...metadata.projects, { ...project, api: { name: project.api.name } } ];
    await options.zeitClient.setMetadata(metadata);
}

export const destroyProject = async (id: string, options: HandlerOptions) => {
    const metadata = await options.zeitClient.getMetadata();
    metadata.projects = metadata.projects || [];
    metadata.projects = metadata.projects.filter((project: Project) => project.id !== id);
    await options.zeitClient.setMetadata(metadata);
}

export const listOfPossibleProjects = async (options: HandlerOptions) => {
    const allProjects = await options.zeitClient.fetchAndThrow(`/v1/projects/list`, {});
    const metadata = await options.zeitClient.getMetadata();
    const addedProjects = metadata.projects || [];

    return allProjects.filter((p: any) => !addedProjects.find((ap: any) => ap.id === p.id));
};

