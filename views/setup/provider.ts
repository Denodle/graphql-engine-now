import { htm as html, HandlerOptions } from "@zeit/integration-utils";
import { Project } from "../../interfaces/Project";
import { setup } from "../../actions/setup";
import { providerFields } from "../../actions/provider-fields";

export const getSetupProviderView = async ({ payload, zeitClient }: HandlerOptions, project: Project, submit: boolean = false) => {

    let errors = '';

    const providers = [
        'DigitalOcean',
        'Heroku',
    ];

    if(submit) {

        const { clientState } = payload;

        if (!providers.includes(project.type)) {
            errors = 'Provider not found!';
        } else if (clientState.size === '' || clientState.region === '') {
            errors = 'Sorry, you have to enter all required information!';
        } else {
            return await setup(project, { payload, zeitClient }, { size: clientState.size, region: clientState.region });
        }

    }

    return html`
        <Box>
            ${errors !== '' ? html`<Notice type="error">${errors}</Notice>` : ''}

            <Fieldset>
                <FsContent>
                    <H2>3. Configure server</H2>
                    <Box>
                        Choose the most appropriate settings for your new GraphQL Engine.
                    </Box>
                </FsContent>
            </Fieldset>

            ${await providerFields(project)}

            <Fieldset>
                <FsContent>
                    <Button action="provider-submit">Create</Button>
                </FsContent>
            </Fieldset>
        </Box>
    `;
};
