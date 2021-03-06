import { HandlerOptions } from "@zeit/integration-utils";
import { getListView } from "./list";
import { getSetupInitialView } from "./setup/initial";
import { getSetupNewView } from "./setup/new-endpoint";
import { getSetupExistingView } from "./setup/existing-endpoint";
import { getDashboardView } from "./dashboard";
import { Project } from "../interfaces/Project";
import { getProject, getNewProject } from "../lib/zeit";
import { getShowSecretView } from "./show-secret";
import { destroy } from "../actions/destroy";
import { getSetupProviderView } from "./setup/provider";
import { getSetupProviderApiView } from "./setup/provider-api";
import { getShowFAQView } from "./show-faq";

export const getPageContent = async (options: HandlerOptions) => {

  const { action } = options.payload;

  if(action.startsWith('dashboard:')){
    const projectId = action.substring(10);
    const project: Project = await getProject(projectId, options);

    return await getDashboardView(options, project);
  }

  if (action.startsWith('show-secret:')) {
    const projectId = action.substring(12);
    const project: Project = await getProject(projectId, options);

    return await getShowSecretView(options, project);
  }

  if (action.startsWith('show-faq:')) {
    const projectId = action.substring(9);

    return await getShowFAQView(projectId);
  }

  if (action.startsWith('destroy:')) {
    const projectId = action.substring(8);
    const project: Project = await getProject(projectId, options);

    return await destroy(project, options);
  }

  switch(action){
    case 'setup-initial':
      return await getSetupInitialView(options);
    case 'setup-new-endpoint':
        return await getSetupNewView(options);
    case 'setup-new-endpoint-submit':
        return await getSetupNewView(options, true);
    case 'setup-existing-endpoint':
        return await getSetupExistingView(options);
    case 'setup-existing-endpoint-submit':
        return await getSetupExistingView(options, true);
    case 'provider-api-submit':
        return await getSetupProviderApiView(options, await getNewProject(options), true);
    case 'provider-submit':
        return await getSetupProviderView(options, await getNewProject(options), true);
    default:
      return await getListView(options);
  }

};
