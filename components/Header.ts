import { htm as html } from '@zeit/integration-utils';

export const Header = ({ children }: { children: any }) => html`
  <Box fontSize="24px" fontWeight="400" marginBottom="10px" marginTop="20px">${children}</Box>
`;
