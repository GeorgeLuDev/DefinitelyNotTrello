import * as React from "react";
import { Context } from "create-react-context";
import { DraggableProps, DNDContext } from "./types";
export declare function draggable(Consumer: Context<DNDContext>["Consumer"]): React.ForwardRefExoticComponent<DraggableProps>;
