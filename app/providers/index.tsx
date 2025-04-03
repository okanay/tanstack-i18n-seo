import { ToastManager } from "./toast";
import { PropsWithChildren } from "react";

export const RootProviders = (props: PropsWithChildren) => {
  return (
    <>
      <ToastManager />
      {props.children}
    </>
  );
};
