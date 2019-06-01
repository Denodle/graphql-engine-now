import { htm as html } from '@zeit/integration-utils';

export const Description = ({ children }: { children: any }) => html`
    <Box lineHeight="24px">${children}</Box>
`;
