import { htm as html, HandlerOptions } from "@zeit/integration-utils";
import { Project } from "../interfaces/Project";

export const getDashboardView = async ({ payload, zeitClient }: HandlerOptions, project: Project) => {

    const getConsoleUrl = (url: string) => {
        if(!url) {
            return null;
        }

        if(url[url.length - 1] === '/') {
            return url + 'console';
        }

        return url + '/console';
    };

    return html`
        <Box>
            <Fieldset>
                <FsContent>
                    <Box
                        display="flex"
                        marginBottom="15px"
                    >
                        <H1>${project.api.name}</H1>
                        <Box flex="1"></Box>
                        <Button small action="">Back to endpoints</Button>
                    </Box>
                    <H2>Dashboard</H2>
                    <Box>
                        Here you can quickly access all required information and configure your endpoint. Also, we know that creating new GraphQL API can be intimidating, so we created a  <Link action=${'show-faq:' + project.id}>FAQ section</Link> to help you get started with your new API.
                    </Box>
                </FsContent>
            </Fieldset>
            <Fieldset>
                <FsContent>
                    <H2>Console</H2>
                    <P>GraphQL Engine's console is a powerful tool to manage your API. To access the console you need admin secret which can be found <Link action=${'show-secret:' + project.id}>here</Link>.</P>
                    <Link target="_blank" href=${getConsoleUrl(project.url)}><Button action=${'dashboard:' + project.id}>Open console</Button></Link>
                </FsContent>
            </Fieldset>
            <Fieldset>
                <FsContent>
                    <H2>${project.type === 'Self hosted' ? 'Remove endpoint' : 'Destroy endpoint'}</H2>
                    <P>${project.type === 'Self hosted' ? 'This endpoint was not created by the integration that\'s why we can only remove the connection with Zeit.' : 'This endpoint was created by an integration. By pressing the button below we will destroy everything associated with the endpoint.'}</P>
                    <Button action=${'destroy:' + project.id} warning>${project.type === 'Self hosted' ? 'Remove' : 'Destroy'}</Button>
                </FsContent>
            </Fieldset>
        </Box>
    `;
};
