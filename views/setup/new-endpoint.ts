import { htm as html, HandlerOptions } from "@zeit/integration-utils";
import generator from 'generate-password';
import { Project } from "../../interfaces/Project";
import { getSetupProviderApiView } from "./provider-api";

export const getSetupNewView = async ({ payload, zeitClient }: HandlerOptions, submit: boolean = false) => {

    let errors = '';

    const projects = await zeitClient.fetchAndThrow(`/v1/projects/list`, {});

    const providers = [
        'DigitalOcean',
    ];

    if(submit) {

        const { clientState } = payload;

        if (clientState.project === '' || clientState.provider === ''){
            errors = 'Sorry, you have to enter all required information!';
        } else if (!providers.includes(clientState.provider)) {
            errors = 'Your chosen provider is invalid!';
        } else {
            const adminSecret = generator.generate({
                length: 16,
                numbers: true,
            });

            await zeitClient.upsertEnv(clientState.project, `GRAPHQL_ADMIN_SECRET`, adminSecret);

            const project: Project = { id: clientState.project, type: clientState.provider, created: false, api: { name: '' }, apiKey: '' };
            const metadata = await zeitClient.getMetadata();
            metadata.projects = metadata.projects || [];
            metadata.projects = [...metadata.projects, project ];
            await zeitClient.setMetadata(metadata);

            return getSetupProviderApiView({ payload, zeitClient }, project);
        }

        //errors = 'Sorry, we were not able to connect to your existing GraphQL Engine! Check entered data and try again.';
    }

    return html`
        <Box>
            <Fieldset>
                <FsContent>
                    <H1>1. Create new endpoint</H1>
                </FsContent>
            </Fieldset>

            ${errors !== '' ? html`<Notice type="error">${errors}</Notice>` : ''}
            <Fieldset>
                <FsContent>
                    <H2>Adding a new endpoint</H2>
                    <Box>
                        By completing the form below, you will add a new GraphQL Engine to the list of endpoints.
                    </Box>
                </FsContent>
            </Fieldset>
            <Fieldset>
                <FsContent>
                    <H2>Project</H2>
                    <Box marginBottom="10px">
                        Choose a project you want to associate your endpoint with.
                    </Box>
                    <Select name="project" value=${projects[0].id || ''}>
                        ${projects.map((project: any) => html`
                            <Option value=${project.id} caption=${project.name} />
                        `)}
                    </Select>
                </FsContent>
                <FsFooter>
                    <P>We will only expose your GraphQL Engine to the selected project.</P>
                </FsFooter>
            </Fieldset>
            <Fieldset>
                <FsContent>
                    <H2>Provider</H2>
                    <Box marginBottom="10px">
                        Choose an available provider for your project.
                    </Box>
                    <Select name="provider" value=${providers[0] || ''}>
                        ${providers.map((provider) => html`
                            <Option value=${provider} caption=${provider} />
                        `)}
                    </Select>
                </FsContent>
            </Fieldset>
            <Fieldset>
                <FsContent>
                    <Button action="setup-new-endpoint-submit">Next</Button>
                </FsContent>
            </Fieldset>
        </Box>
    `;
};
