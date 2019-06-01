import { withUiHook, htm } from "@zeit/integration-utils";
import { getPageContent } from "./views/getPageContent";

export default withUiHook(async options => {
  const page = await getPageContent(options);

  return htm`
    <Page>
        ${page}
    </Page>
  `;
});
