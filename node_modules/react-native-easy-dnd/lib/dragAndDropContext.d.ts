import * as React from "react";
import { Context, ProviderProps } from "create-react-context";
import { DNDContext, DraggableProps, DroppableProps } from "./types";
interface Props {
    children: ProviderProps<DNDContext>['children'];
}
declare type DNDContextType = Context<DNDContext>;
export interface DragAndDropContext {
    Consumer: DNDContextType["Consumer"];
    Provider: React.ComponentType<Props>;
    Draggable: React.ForwardRefExoticComponent<DraggableProps>;
    Droppable: React.ForwardRefExoticComponent<DroppableProps>;
}
declare function createDndContext(): DragAndDropContext;
export { createDndContext };
