import { htm as html } from "@zeit/integration-utils";

export const Table = ({
  header,
  children
}: {
  header: any;
  children: any;
}) => html`
  <Box
    width="100%"
    display="table"
    borderRadius="4px"
    borderColor="#eaeaea"
    overflow="hidden"
    borderStyle="solid"
    borderWidth="1px"
    marginTop="20px"
    marginBottom="20px"
  >
    <Box display="table-header-group" backgroundColor="#fff">
      <Box display="table-row">
        ${header}
      </Box>
    </Box>
    <Box display="table-row-group">
      ${children}
    </Box>
  </Box>
`;

export const TableRow = ({ children }: { children: any }) => html`
  <Box
    display="table-row"
  >
    ${children}
  </Box>
`;

export const HeaderItem = ({ children }: { children: any }) => html`
  <Box
    display="table-cell"
    padding="10px"
    borderColor="#eaeaea"
    borderStyle="solid"
    borderWidth="0px"
    borderBottomWidth="1px"
  >
    <Box fontWeight="400" color="#666666" fontSize="12px" >${children}</Box>
  </Box>
`;

export const BodyItem = ({ children }: { children: any }) => html`
  <Box
    display="table-cell"
    padding="10px"
    borderColor="#eaeaea"
    borderStyle="solid"
    borderWidth="0px"
    borderBottomWidth="1px"
  >
    ${children}
  </Box>
`;
