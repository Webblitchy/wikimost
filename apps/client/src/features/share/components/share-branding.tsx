import { Affix, Button } from "@mantine/core";

export default function ShareBranding() {
  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Button
        variant="default"
        component="a"
        target="_blank"
        href="https://github.com/Webblitchy/wikimost"
      >
        Powered by Wikimost
      </Button>
    </Affix>
  );
}
