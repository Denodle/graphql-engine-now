import { htm as html, HandlerOptions } from "@zeit/integration-utils";
import { getListView } from "../list";
import generator from 'generate-password';

export const getSetupNewView = async ({ payload, zeitClient }: HandlerOptions, submit: boolean = false) => {

    let errors = '';

    const projects = await zeitClient.fetchAndThrow(`/v1/projects/list`, {});

    const providers = [
        {
            name: 'DigitalOcean',
            key: 'digital-ocean',
            disabled: false,
            html: html`
                <Fieldset>
                    <FsContent>
                        <H2>Public API key</H2>
                        <Box marginBottom="10px">
                            Your public API key provided by DigitalOcean.
                        </Box>
                        <Input name="provider-public-api-key" value="" />
                    </FsContent>
                </Fieldset>
            `,
        },
        // {
        //     name: 'Docker',
        //     key: 'docker',
        //     disabled: true,
        // },
        // {
        //     name: 'Microsoft azure',
        //     key: 'microsoft-azure',
        //     disabled: true,
        // },
        // {
        //     name: 'AWS',
        //     key: 'aws',
        //     disabled: true,
        // },
        // {
        //     name: 'Google Cloud',
        //     key: 'google-cloud',
        //     disabled: true,
        // },
    ];

    if(submit) {

        const { clientState } = payload;

        const provider = providers.find(({key}) => clientState.provider === key);
        if (clientState.url === '' || clientState.project === '' || clientState.provider === ''){
            errors = 'Sorry, you have to enter all required information!';
        } else if (!provider) {
            errors = 'Your chosen provider is invalid!';
        } else {
            const urlSecret = await zeitClient.ensureSecret(`graphql_url`, clientState.url);
            const adminSecret = generator.generate({
                length: 16,
                numbers: true,
            });

            await zeitClient.upsertEnv(clientState.project, `GRAPHQL_URL`, urlSecret);
            await zeitClient.upsertEnv(clientState.project, `GRAPHQL_ADMIN_SECRET`, adminSecret);


            const metadata = await zeitClient.getMetadata();
            metadata.projects = metadata.projects || [];
            metadata.projects = [...metadata.projects, { id: clientState.project, type: provider.name, created: false } ];
            await zeitClient.setMetadata(metadata);

            return getListView({ payload, zeitClient });
        }

        //errors = 'Sorry, we were not able to connect to your existing GraphQL Engine! Check entered data and try again.';
    }

    return html`
        <Box>
            ${errors !== '' ? html`<Notice type="error">${errors}</Notice>` : ''}
            <Fieldset>
                <FsContent>
                    <H2>Adding an existing endpoint</H2>
                    <Box>
                        By completing the form below, you will add an existing GraphQL Engine to the list of endpoints.
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
                    <H2>Endpoint URL</H2>
                    <Box marginBottom="10px">
                        Existing GraphQL Engine's endpoint URL
                    </Box>
                    <Input name="url" value="" />
                </FsContent>
                <FsFooter>
                    <P>URL will be used to connect to your existing GraphQL Engine and will be exposed to your application as an environment variable.</P>
                </FsFooter>
            </Fieldset>
            <Fieldset>
                <FsContent>
                    <H2>Provider</H2>
                    <Box marginBottom="10px">
                        Choose an available provider for your project.
                    </Box>
                    <Select name="provider" value=${providers[0].key || ''}>
                        ${providers.map((provider: any) => html`
                            <Option value=${provider.key} caption=${provider.name} />
                        `)}
                    </Select>
                </FsContent>
            </Fieldset>
            <Fieldset>
                <FsContent>
                    <Button action="setup-new-endpoint-submit">Create a new endpoint</Button>
                </FsContent>
            </Fieldset>
        </Box>
    `;
};
