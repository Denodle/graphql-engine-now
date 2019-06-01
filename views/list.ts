import { HandlerOptions, htm } from "@zeit/integration-utils";

export const getListView = async ({ payload }: HandlerOptions) => {
  return htm`
    <Box>
        Hello world
    </Box>
  `;
};
