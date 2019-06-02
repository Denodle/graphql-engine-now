import { htm as html, HandlerOptions } from "@zeit/integration-utils";
import { Project } from "../../interfaces/Project";
import { setup } from "../../actions/setup";
import { regionsDigitalocean } from "../../lib/provider/digitalocean/regions";
import { typesDigitalocean } from "../../lib/provider/digitalocean/types";

export const getSetupProviderView = async ({ payload, zeitClient }: HandlerOptions, project: Project, submit: boolean = false) => {

    let errors = '';

    let regions = [];
    switch(project.type){
        case 'DigitalOcean':
            regions = await regionsDigitalocean(project.apiKey);
            break;
    }

    let types: any = [];
    switch (project.type) {
        case 'DigitalOcean':
            types = await typesDigitalocean(project.apiKey);
            break;
    }

    console.log(regions, types);

    const providers = [
        {
            name: 'DigitalOcean',
            html: html`
                <Fieldset>
                    <FsContent>
                        <H2>Server type</H2>
                        <Box marginBottom="10px">
                            You will be able to change this later.
                        </Box>
                        <Select name="size" value=${types[0].slug || ''}>
                            ${types.map(({slug, ram, cpu, storage}: any) => html`
                                <Option value=${slug} caption=${ram +' RAM; '+ cpu +'vCPU; '+ storage+ 'GB'} />
                            `)}
                        </Select>
                    </FsContent>
                    <FsFooter>
                        <P>DigitalOcean charges different rates for every server type.</P>
                    </FsFooter>
                </Fieldset>

                <Fieldset>
                    <FsContent>
                        <H2>Region</H2>
                        <Box marginBottom="10px">
                            This is the region where your server will be hosted.
                        </Box>
                        <Select name="region" value=${regions.map(({ slug }: any) => slug)[0] || ''}>
                            ${regions.map(({name, slug}: any) => html`
                                <Option value=${slug} caption=${name} />
                            `)}
                        </Select>
                    </FsContent>
                    <FsFooter>
                        <P>Choose the one most closest to you for optimal latency.</P>
                    </FsFooter>
                </Fieldset>
            `,
        },
    ];

    const provider = providers.find((provider) => provider.name === project.type);

    if(submit) {

        const { clientState } = payload;

        if (!provider) {
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

            ${provider && provider.html}

            <Fieldset>
                <FsContent>
                    <Button action=${'provider-submit:' + project.id}>Create</Button>
                </FsContent>
            </Fieldset>
        </Box>
    `;
};
