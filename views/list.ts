import { HandlerOptions, htm as html } from "@zeit/integration-utils";
import { Table, HeaderItem, TableRow, BodyItem } from "../components/Table";
import { Header } from "../components/Header";
import { Description } from "../components/Description";

export const getListView = async ({ payload, zeitClient }: HandlerOptions) => {

  const metadata = await zeitClient.getMetadata();
  metadata.projects = metadata.projects || [];

  let projects: any[] = [];

  for (let project of metadata.projects){
    const projectInfoFromApi = await zeitClient.fetchAndThrow(`/v1/projects/${(project as any).id}`, {});
    projects = [ ...projects, {...project, api: { ...projectInfoFromApi } } ]
  }

  return html`
    <Box>
      <Box display="flex" justifyContent="center" marginBottom="14px">
        <Box textAlign="center" maxWidth="550px">
          <${Header}>Endpoints</${Header}>
          <${Description}>
            Create GraphQL endpoint within any of the supported providers with a couple of clicks. All required information to use
            the endpoint will be exposed to all your projects.
          </${Description}>
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button small action="setup-initial">Create</Button>
      </Box>
        <${Table} header=${html`
            <${HeaderItem}>PROJECT</${HeaderItem}>
            <${HeaderItem}>HOSTED AT</${HeaderItem}>
        `}>
          ${projects.map((project: any) => html`
            <${TableRow}>
              <${BodyItem}>${project.api.name}</${BodyItem}>
              <${BodyItem}>${project.type}</${BodyItem}>
            </${TableRow}>
          `)}
        </${Table}>
    </Box>
  `;
};
