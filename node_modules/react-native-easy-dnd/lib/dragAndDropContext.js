import * as React from "react";
import createReactContext from "create-react-context";
import { draggable } from "./draggable";
import { droppable } from "./droppable";
function createDndContext() {
    const Context = createReactContext({});
    const { Provider, Consumer } = Context;
    class DragAndDropProvider extends React.Component {
        constructor() {
            super(...arguments);
            this.state = {
                draggables: [],
                droppables: [],
                dragOffset: [0, 0]
            };
            this.registerDraggable = (id, data) => {
                const existing = this.getDraggable(id);
                if (existing) {
                    throw new Error(`Draggable has already been registered.`);
                }
                const draggable = Object.assign({ id, layout: { x: 0, y: 0, width: 0, height: 0 }, dragging: false }, data);
                this.setState(({ draggables }) => ({
                    draggables: [...draggables, draggable]
                }));
            };
            this.updateDraggable = (id, data) => {
                this.setState(({ draggables }) => ({
                    draggables: draggables.map(draggable => {
                        if (draggable.id === id) {
                            return Object.assign({}, draggable, data);
                        }
                        return draggable;
                    })
                }));
            };
            this.unregisterDraggable = (id) => {
                this.setState(({ draggables }) => ({
                    draggables: draggables.filter(draggable => draggable.id !== id)
                }));
            };
            this.registerDroppable = (id, data) => {
                const existing = this.getDroppable(id);
                if (existing) {
                    throw new Error(`Droppable has already been registered.`);
                }
                const droppable = Object.assign({ id }, data, { layout: { x: 0, y: 0, width: 0, height: 0 } });
                this.setState(({ droppables }) => ({
                    droppables: [...droppables, droppable]
                }));
            };
            this.unregisterDroppable = (id) => {
                this.setState(({ draggables }) => ({
                    draggables: draggables.filter(draggable => draggable.id !== id)
                }));
            };
            this.updateDroppable = (id, data) => {
                this.setState(({ droppables }) => ({
                    droppables: droppables.map(droppable => {
                        if (droppable.id === id) {
                            return Object.assign({}, droppable, data);
                        }
                        return droppable;
                    })
                }));
            };
            this.getDraggable = (id) => {
                return this.state.draggables.find(draggable => draggable.id === id);
            };
            this.getDroppable = (id) => {
                return this.state.droppables.find(droppable => droppable.id === id);
            };
            this.getDroppableInArea = ({ x, y }) => {
                const _x = x - this.state.dragOffset[0];
                const _y = y - this.state.dragOffset[1];
                return this.state.droppables.find(({ layout }) => {
                    return (layout &&
                        _x >= layout.x &&
                        _y >= layout.y &&
                        _x <= layout.x + layout.width &&
                        _y <= layout.y + layout.height);
                });
            };
            this.handleDragStart = (id, position) => {
                const draggable = this.getDraggable(id);
                if (draggable) {
                    const { layout } = draggable;
                    const center = [
                        layout.x + Math.round(layout.width / 2),
                        layout.y + Math.round(layout.height / 2)
                    ];
                    const dragOffset = [position.x - center[0], position.y - center[1]];
                    this.setState({
                        currentDragging: id,
                        dragOffset
                    });
                    if (draggable.onDragStart) {
                        draggable.onDragStart();
                    }
                }
            };
            this.handleDragEnd = (draggingId, position) => {
                const droppable = this.getDroppableInArea(position);
                const draggable = this.getDraggable(draggingId);
                if (draggable && droppable && droppable.onDrop) {
                    droppable.onDrop(draggable, position);
                }
                if (draggable && draggable.onDragEnd) {
                    draggable.onDragEnd(droppable);
                }
                this.setState({ currentDragging: undefined, dragOffset: [0, 0] });
            };
            this.handleDragMove = (draggingId, position) => {
                const currentDroppable = this.getDroppableInArea(position);
                const draggable = this.getDraggable(draggingId);
                const prevDroppingId = this.state.currentDropping;
                if (currentDroppable) {
                    if (currentDroppable.id !== this.state.currentDropping && draggable) {
                        this.setState({ currentDropping: currentDroppable.id });
                        if (currentDroppable.onEnter) {
                            currentDroppable.onEnter(draggable, position);
                        }
                    }
                }
                else if (this.state.currentDropping) {
                    if (prevDroppingId) {
                        const prevDroppable = this.getDroppable(prevDroppingId);
                        if (prevDroppable && prevDroppable.onLeave) {
                            prevDroppable.onLeave(draggable, position);
                        }
                    }
                    this.setState({ currentDropping: undefined });
                }
            };
        }
        render() {
            return (React.createElement(Provider, { value: {
                    currentDragging: this.state.currentDragging,
                    currentDropping: this.state.currentDropping,
                    droppables: this.state.droppables,
                    draggables: this.state.draggables,
                    dragOffset: this.state.dragOffset,
                    registerDraggable: this.registerDraggable,
                    updateDraggable: this.updateDraggable,
                    unregisterDraggable: this.unregisterDraggable,
                    registerDroppable: this.registerDroppable,
                    updateDroppable: this.updateDroppable,
                    unregisterDroppable: this.unregisterDroppable,
                    handleDragStart: this.handleDragStart,
                    handleDragEnd: this.handleDragEnd,
                    handleDragMove: this.handleDragMove,
                    getDraggable: this.getDraggable,
                    getDroppable: this.getDroppable
                } }, this.props.children));
        }
    }
    const Draggable = draggable(Consumer);
    const Droppable = droppable(Consumer);
    return {
        Provider: DragAndDropProvider,
        Draggable,
        Droppable,
        Consumer
    };
}
export { createDndContext };
