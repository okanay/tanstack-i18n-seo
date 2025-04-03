import { ImageProvider } from "./image";
import { ToastManager } from "./toast";
import { PropsWithChildren } from "react";

export const RootProviders = (props: PropsWithChildren) => {
  return (
    <>
      <ImageProvider>
        <ToastManager />
        {props.children}
      </ImageProvider>
    </>
  );
};
