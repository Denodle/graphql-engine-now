import { HandlerOptions } from "@zeit/integration-utils";
import { getListView } from "./list";
import { getSetupInitialView } from "./setup/initial";
import { getSetupExistingView } from "./setup/existing-endpoint";

export const getPageContent = async (options: HandlerOptions) => {

  switch(options.payload.action){
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
