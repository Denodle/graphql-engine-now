import { htm as html } from "@zeit/integration-utils";

export const getShowFAQView = async (projectId: string) => {

    return html`
    <Box>
      <Fieldset>
          <FsContent>
              <H2>Frequently asked questions</H2>
              <Box>
                  We know that creating new GraphQL API can be intimidating, so we created this to help you get started with your new API more quickly.
                  <BR />
                  <BR />

                  <B>1. Do you have am example project?</B>
                  <Box marginBottom="10px">Yes, you can find it over <Link href="https://github.com/Denodle/test-hasura-now">here</Link>.</Box>

                  <B>2. How to change default settings?</B>
                  <Box marginBottom="10px">Integration does not allow changing default default settings right now. You will need to SSH into your server and set settings over there.</Box>

                  <B>3. How to change admin secret?</B>
                  <Box marginBottom="10px">Admin secret is just an option on Hasura, which means you will have to SSH into the server to change it.</Box>

                  <B>4. How to add data?</B>
                  <Box marginBottom="10px">You can add data by connecting to your GraphQl Engine's console. </Box>

                  <B>5. How to add event triggers using Zeit functions?</B>
                  <Box marginBottom="10px">You can add event triggers though GraphQL Engine's console. Keep in mind, you will have to deploy your functions first.</Box>

                  <B>6. How to add remote schemas?</B>
                  <Box marginBottom="10px">You can do it through GraphQL Engine's console.</Box>

                  <B>7. Were can I get more help?</B>
                  <Box>You can get more help by reading Hasura's <Link href="https://docs.hasura.io">documentation</Link> or by joining Discord <Link href="https://discordapp.com/invite/3FNQnWj">channel</Link>.</Box>
              </Box>
          </FsContent>
      </Fieldset>
      <Fieldset>
          <FsContent>
              <Button action=${'dashboard:' + projectId}>Back to dashboard</Button>
          </FsContent>
      </Fieldset>
    </Box>
  `;
};
