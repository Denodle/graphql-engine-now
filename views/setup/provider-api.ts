import { htm as html, HandlerOptions } from "@zeit/integration-utils";
import { getListView } from "../list";
import { Project } from "../../interfaces/Project";
import { getSetupProviderView } from "./provider";

export const getSetupProviderApiView = async ({ payload, zeitClient }: HandlerOptions, project: Project, submit: boolean = false) => {

    let errors = '';

    if(submit) {

        const { clientState } = payload;

        if (clientState['api-key'] === '') {
            errors = 'Sorry, you have to enter all required information!';
        } else {
            project = {...project, apiKey: clientState['api-key']};
            
            const metadata = await zeitClient.getMetadata();
            metadata.projects = metadata.projects.filter(({id}: Project) => id !== project.id)
            metadata.projects = [...metadata.projects, project];
            await zeitClient.setMetadata(metadata);

            return getSetupProviderView({ payload, zeitClient }, project);
        }

    } else if (project.apiKey !== '') {
        return getSetupProviderView({ payload, zeitClient }, project);
    }

    return html`
        <Box>
            <Fieldset>
                <FsContent>
                    <H1>2. Provider API key</H1>
                </FsContent>
            </Fieldset>

            ${errors !== '' ? html`<Notice type="error">${errors}</Notice>` : ''}

            <Fieldset>
                <FsContent>
                    <H2>API key</H2>
                    <Box marginBottom="10px">
                        Your API key provided by DigitalOcean.
                    </Box>
                    <Input name="api-key" value="" />
                </FsContent>
            </Fieldset>

            <Fieldset>
                <FsContent>
                    <Button action=${'provider-api-submit:' + project.id}>Next</Button>
                </FsContent>
            </Fieldset>
        </Box>
    `;
};
