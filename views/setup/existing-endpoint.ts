import { htm as html, HandlerOptions } from "@zeit/integration-utils";
import { setup } from "../../actions/setup";

export const getSetupExistingView = async ({ payload, zeitClient }: HandlerOptions, submit: boolean = false) => {

    let errors = '';

    const projects = await zeitClient.fetchAndThrow(`/v1/projects/list`, {});

    if(submit) {

        const { clientState } = payload;

        if (clientState.url === '' || clientState.secret === '' || clientState.project === ''){
            errors = 'Sorry, you have to enter all required information!';
        } else {
            const project = { id: clientState.project, type: 'Self hosted', created: true, url: clientState.url, secret: clientState.secret, api: { name: '' }, apiKey: '' };
            return await setup(project, { payload, zeitClient }, {});
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
                <H2>Admin secret</H2>
                <Box marginBottom="10px">
                    Valid admin secret which is used to login into GraphQL Engine
                </Box>
                <Input name="secret" value="" type="password" />
            </FsContent>
            <FsFooter>
                <P>We will use your admin secret to manage your GraphQL Engine.</P>
            </FsFooter>
        </Fieldset>
        <Fieldset>
            <FsContent>
                <Button action="setup-existing-endpoint-submit">Add an existing endpoint</Button>
            </FsContent>
        </Fieldset>
    </Box>
  `;
};
