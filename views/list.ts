import { HandlerOptions, htm as html } from "@zeit/integration-utils";
import { Table, HeaderItem } from "../components/Table";
import { Header } from "../components/Header";
import { Description } from "../components/Description";

export const getListView = async ({ payload }: HandlerOptions) => {
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
            <${HeaderItem}>NAME</${HeaderItem}>
            <${HeaderItem}>HOSTED AT</${HeaderItem}>
        `}>

        </${Table}>
    </Box>
  `;
};
