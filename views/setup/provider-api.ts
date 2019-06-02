import { htm as html, HandlerOptions } from "@zeit/integration-utils";
import { Project } from "../../interfaces/Project";
import { getSetupProviderView } from "./provider";
import { updateProject } from "../../lib/zeit";
import { validateProvider } from "../../actions/validate-provider";

export const getSetupProviderApiView = async ({ payload, zeitClient }: HandlerOptions, project: Project, submit: boolean = false) => {

    let errors = '';

    if(submit) {

        const { clientState } = payload;

        if (clientState['api-key'] === '') {
            errors = 'Sorry, you have to enter all required information!';
       } else {
            project = { ...project, apiKey: clientState['api-key'] };

            const validKey = await validateProvider(project);

            if(validKey){
                await updateProject(project, { payload, zeitClient });

                return getSetupProviderView({ payload, zeitClient }, project);
            } else {
                errors = 'Sorry, API key is invalid!';
            }

        }

    } else if (project.apiKey !== '') {
        return getSetupProviderView({ payload, zeitClient }, project);
    }

    return html`
        <Box>
            ${errors !== '' ? html`<Notice type="error">${errors}</Notice>` : ''}

            <Fieldset>
                <FsContent>
                    <H2>2. Configure provider</H2>
                    <Box>
                        Before creating a server, we need to be able to access your chosen provider.
                    </Box>
                </FsContent>
            </Fieldset>

            <Fieldset>
                <FsContent>
                    <H2>API key</H2>
                    <Box marginBottom="10px">
                        Your API key from provider.
                    </Box>
                    <Input name="api-key" value="" type="password" />
                </FsContent>
                <FsFooter>
                    <P>This API key will be only used for this project.</P>
                </FsFooter>
            </Fieldset>

            <Fieldset>
                <FsContent>
                    <Button action=${'provider-api-submit:' + project.id}>Next</Button>
                </FsContent>
            </Fieldset>
        </Box>
    `;
};
