import { htm as html } from "@zeit/integration-utils";
import { regionsDigitalocean } from "./regions";
import { typesDigitalocean } from "./types";

export const providerFielsDigitalocean = async (token: string) => {

    try {
        const types = await typesDigitalocean(token);
        const regions = await regionsDigitalocean(token);

        return html`
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
        `;
    } catch (e) {
        console.log('Fetch error: ', e.message);
        return '';
    }

};
