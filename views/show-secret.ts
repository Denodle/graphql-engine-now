import { htm as html, HandlerOptions } from "@zeit/integration-utils";
import { Project } from "../interfaces/Project";

export const getShowSecretView = async ({ payload, zeitClient }: HandlerOptions, project: Project) => {
    return html`
    <Box>
      <Fieldset>
          <FsContent>
              <H2>Admin secret</H2>
              <Box marginBottom="10px">
                  This is your admin secret which enables you to access GraphQL Engine's console.
              </Box>
              <Input value="123456789" disabled />
          </FsContent>
          <FsFooter>
            <P>Please keep this secret as it gives complete control over your database!</P>
            </FsFooter>
      </Fieldset>
        <Fieldset>
          <FsContent>
              <Button action=${'dashboard:' + project.id}>Back to dashboard</Button>
          </FsContent>
      </Fieldset>
    </Box>
  `;
};
