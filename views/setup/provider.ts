import { htm as html, HandlerOptions } from "@zeit/integration-utils";
import { getListView } from "../list";
import { Project } from "../../interfaces/Project";
import { setupDigitalocean } from "../../lib/provider/digitalocean/setup";
import { listDbSizes, listRegions } from "../../lib/do-api/do-api";

export const getSetupProviderView = async ({ payload, zeitClient }: HandlerOptions, project: Project, submit: boolean = false) => {

    let errors = '';

    const providers = [
        {
            name: 'DigitalOcean',
            html: html`
                <Fieldset>
                    <FsContent>
                        <H2>Choose your server size</H2>
                        <Select name="size">
                            ${listDbSizes().map(({slug, ram, cpu, storage}: any) => html`
                                <Option value=${slug} caption=${ram +' RAM; '+ cpu +'; '+ storage} />
                            `)}
                        </Select>
                    </FsContent>
                </Fieldset>

                <Fieldset>
                    <FsContent>
                        <H2>Choose your server region</H2>
                        <Select name="size">
                            ${(await listRegions(project.apiKey)).map(({name, slug}: any) => html`
                                <Option value=${slug} caption=${name} />
                            `)}
                        </Select>
                    </FsContent>
                </Fieldset>
            `,
        },
    ];

    const provider = providers.find((provider) => provider.name === project.type);

    if(submit) {

        const { clientState } = payload;

        if (!provider) {
            errors = 'Provider not found!';
        } else {
            switch (provider.name) {
                case 'DigitalOcean':
                    if (clientState.size === '' || clientState.region === '') {
                        errors = 'Sorry, you have to enter all required information!';
                    } else {
                        // setupDigitalocean(project.api.key, project, {size: clientState.size, region: clientState.region});
                    }
                    break;
            }
        }

        if (errors === '') {
            return getListView({ payload, zeitClient });
        }

        //errors = 'Sorry, we were not able to connect to your existing GraphQL Engine! Check entered data and try again.';
    }

    return html`
        <Box>
            <Fieldset>
                <FsContent>
                    <H1>3. Configure server</H1>
                </FsContent>
            </Fieldset>

            ${errors !== '' ? html`<Notice type="error">${errors}</Notice>` : ''}

            ${provider && provider.html}

            <Fieldset>
                <FsContent>
                    <Button action=${'provider-submit:' + project.id}>Setup server</Button>
                </FsContent>
            </Fieldset>
        </Box>
    `;
};
