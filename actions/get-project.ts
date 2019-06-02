import { HandlerOptions } from "@zeit/integration-utils";
import { Project } from "../interfaces/Project";

export const getProject = async (id: string, options: HandlerOptions) => {

    const project: Project = await getProject(id, options);

    return { ...project, api: { name: project.api.name }};

}
