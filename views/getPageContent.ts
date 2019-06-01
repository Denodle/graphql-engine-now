import { HandlerOptions } from "@zeit/integration-utils";
import { getListView } from "./list";

export const getPageContent = async (options: HandlerOptions) => {
  // This will be a basic router but for now just return list of APIs
  return getListView(options);
};
