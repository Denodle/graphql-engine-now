import { htm as html } from "@zeit/integration-utils";
import { regionsHeroku } from "./regions";

export const providerFieldsHeroku = async () => {

    try {
        const regions = regionsHeroku();

        return html`
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
        return '';
    }

};
