import { htm as html } from "@zeit/integration-utils";
import { Header } from "../../components/Header";
import { Description } from "../../components/Description";

export const getSetupInitialView = async () => {
    return html`
    <Box display="flex" justifyContent="center">
        <Box
            width="550px"
            maxWidth="550px"
            borderColor="#eaeaea"
            borderStyle="solid"
            borderWidth="1px"
            backgroundColor="#fff"
            textAlign="center"
            paddingRight="30px"
            paddingLeft="30px"
            paddingBottom="20px"
        >
            <${Header}>New endpoint</${Header}>
            <Box marginBottom="20px">
                <${Description}>
                    Creating a new GraphQL Engine is couple clicks away, but if you already have a server up and running you can also add it here.
                </${Description}>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="center">
                <Box marginBottom="5px">
                    <Button action="setup-new-endpoint">Create endpoint</Button>
                </Box>
                <Link action="setup-existing-endpoint">Add an existing endpoint</Link>
            </Box>
        </Box>
    </Box>
  `;
};
