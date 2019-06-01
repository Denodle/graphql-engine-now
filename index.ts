import { withUiHook, htm as html } from "@zeit/integration-utils";
import { getPageContent } from "./views/getPageContent";

export default withUiHook(async options => {
  const page = await getPageContent(options);

  return html`
    <Page>
        ${page}
    </Page>
  `;
});
