import { HandlerOptions, htm as html } from "@zeit/integration-utils";
import { Table, HeaderItem, TableRow, BodyItem } from "../components/Table";
import { Header } from "../components/Header";
import { Description } from "../components/Description";
import { Project } from "../interfaces/Project";
import { postSetup } from "../actions/post-setup";

export const getListView = async ({ payload, zeitClient }: HandlerOptions) => {

  let metadata = await zeitClient.getMetadata();
  metadata.projects = metadata.projects || [];
  let shouldAddRefresher = false;

  let projects: Project[] = [];

  for (let project of metadata.projects){
    const projectInfoFromApi = await zeitClient.fetchAndThrow(`/v1/projects/${project.id}`, {});
    projects = [ ...projects, {...project, api: { ...projectInfoFromApi } } ]
    if(!project.created){
      await postSetup({ ...project, api: { ...projectInfoFromApi } }, { payload, zeitClient });
      shouldAddRefresher = true;
    }
  }

  return html`
    <Box>
    ${shouldAddRefresher ? html`<AutoRefresh timeout="3000" />` : ''}
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
            <${HeaderItem}></${HeaderItem}>
        `}>
          ${projects.map(project => html`
            <${TableRow}>
              <${BodyItem}>${project.api.name}</${BodyItem}>
              <${BodyItem}>${project.type}</${BodyItem}>
              <${BodyItem}>
                <Box display="flex" justifyContent="flex-end" position="relative">
                  <Link action=${"dashboard:" + project.id} display="flex">
                    <Box display="flex" position="absolute" height="12px" top="2px" right="5px">
                      ${project.created ? html`<Img src="https://i.imgur.com/Qka4bHW.png" width="22" height="22" />` : html`<P>Creating...</P>`}
                    </Box>
                  </Link>
                </Box>
              </${BodyItem}>
            </${TableRow}>
          `)}
        </${Table}>
    </Box>
  `;
};
