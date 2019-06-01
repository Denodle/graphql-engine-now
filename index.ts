import { withUiHook, htm } from "@zeit/integration-utils";

let count = 0;

export default withUiHook(async ({ payload, zeitClient }) => {
  count += 1;

  return htm`
    <Page>
      <Button>Count Me</Button>
    <button>hello</button>
      ${count}
    </Page>
  `;
});
