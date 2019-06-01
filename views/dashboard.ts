import { htm as html, HandlerOptions } from "@zeit/integration-utils";
import { Project } from "../interfaces/Project";

export const getDashboardView = async ({ payload, zeitClient }: HandlerOptions, project: Project) => {
    return html`
    <Box>
        Project ${project.api.name}
    </Box>
  `;
};
