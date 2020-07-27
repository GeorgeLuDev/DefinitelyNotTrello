import * as React from "react";
import { Context } from "create-react-context";
import { DroppableProps, DNDContext } from "./types";
export declare function droppable(Consumer: Context<DNDContext>["Consumer"]): React.ForwardRefExoticComponent<DroppableProps>;
