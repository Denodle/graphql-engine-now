import { HandlerOptions } from "@zeit/integration-utils";
import { getListView } from "./list";
import { getSetupInitialView } from "./setup/initial";
import { getSetupExistingView } from "./setup/existing-endpoint";
import { getDashboardView } from "./dashboard";
import { Project } from "../interfaces/Project";
import { getProject } from "../lib/zeit";

export const getPageContent = async (options: HandlerOptions) => {

  const { action } = options.payload;

  if(action.startsWith('dashboard:')){
    const projectId = action.substring(10);
    const project: Project = await getProject(projectId, options);

    return await getDashboardView(options, project);
  }

  switch(action){
    case 'setup-initial':
      return await getSetupInitialView();
    case 'setup-existing-endpoint':
      return await getSetupExistingView(options);
    case 'setup-existing-endpoint-submit':
      return await getSetupExistingView(options, true);
    default:
      return await getListView(options);
  }

};
