import { HandlerOptions, htm } from "@zeit/integration-utils";
import { Table, HeaderItem } from "../components/Table";

export const getListView = async ({ payload }: HandlerOptions) => {
  return htm`
    <Box>
      <Box display="flex" justifyContent="center" marginBottom="14px">
        <Box textAlign="center" maxWidth="550px">
          <Box fontSize="24px" fontWeight="400" marginBottom="10px" marginTop="20px">Endpoints</Box>
          <Box lineHeight="24px">
            Create GraphQL endpoint within any of the supported providers with a couple of clicks. All required information to use
            the endpoint will be exposed to all your projects.
          </Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button small>Create</Button>
      </Box>
        <${Table} header=${htm`
            <${HeaderItem}>NAME</${HeaderItem}>
            <${HeaderItem}>HOSTED AT</${HeaderItem}>
        `}>

        </${Table}>
    </Box>
  `;
};
