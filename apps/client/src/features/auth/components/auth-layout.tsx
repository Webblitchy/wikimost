import React from "react";
import { Group, Text, useComputedColorScheme } from "@mantine/core";
import classes from "./auth.module.css";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  // Invert favicon color to be visible
  const colorScheme = useComputedColorScheme();
  let useFilter = 1;
  if (colorScheme === "dark") {
    useFilter = 0;
  }
  return (
    <>
      <Group justify="center" gap={8} className={classes.logo}>
        <img
          src="/favicon-32x32.png"
          alt="Wikimost"
          width={22}
          height={22}
          style={{
            filter:`invert(${useFilter})`,
          }}
        />
        <Text size="28px" fw={700} style={{ userSelect: "none" }}>
          Wikimost
        </Text>
      </Group>
      {children}
    </>
  );
}
