import * as React from "react";
export function droppable(Consumer) {
    class BaseDroppable extends React.Component {
        constructor(props) {
            super(props);
            this.onLayout = (...args) => {
                if (this.props.onLayout) {
                    this.props.onLayout(...args);
                }
                this.measure();
            };
            this.handleRef = (element) => {
                if (element && element.getNode) {
                    this.element = element.getNode();
                }
                else {
                    this.element = element;
                }
            };
            this.computeDistance = () => {
                const { currentDragging, getDraggable, getDroppable } = this.props.__dndContext;
                if (!currentDragging) {
                    return;
                }
                const draggable = getDraggable(currentDragging);
                const droppable = getDroppable(this.identifier);
                if (!draggable || !droppable) {
                    return;
                }
                return Math.sqrt(Math.pow((draggable.layout.x - droppable.layout.x), 2) +
                    Math.pow((draggable.layout.y - droppable.layout.y), 2));
            };
            this.identifier = this.props.customId || Symbol("droppable");
        }
        componentDidMount() {
            this.props.__dndContext.registerDroppable(this.identifier, {
                onDrop: this.props.onDrop,
                onEnter: this.props.onEnter,
                onLeave: this.props.onLeave
            });
        }
        componentWillUnmount() {
            this.props.__dndContext.unregisterDroppable(this.identifier);
        }
        componentDidUpdate(prevProps) {
            const updatedDroppable = {};
            if (prevProps.onEnter !== this.props.onEnter) {
                updatedDroppable.onEnter = this.props.onEnter;
            }
            if (prevProps.onDrop !== this.props.onDrop) {
                updatedDroppable.onDrop = this.props.onDrop;
            }
            if (prevProps.onLeave !== this.props.onLeave) {
                updatedDroppable.onLeave = this.props.onLeave;
            }
            if (Object.keys(updatedDroppable).length !== 0) {
                this.props.__dndContext.updateDroppable(this.identifier, updatedDroppable);
            }
        }
        measure() {
            if (this.element) {
                this.element.measureInWindow((x, y, width, height) => {
                    this.props.__dndContext.updateDroppable(this.identifier, {
                        layout: { x, y, width, height }
                    });
                });
            }
        }
        render() {
            const { children } = this.props;
            return children({
                computeDistance: this.computeDistance,
                active: this.props.__dndContext.currentDropping === this.identifier,
                viewProps: {
                    onLayout: this.onLayout,
                    ref: this.handleRef,
                    style: {
                        zIndex: -1
                    }
                }
            });
        }
    }
    BaseDroppable.defaultProps = {
        bounceBack: true
    };
    const Droppable = React.forwardRef((props, ref) => (React.createElement(Consumer, null, dndContext => (React.createElement(BaseDroppable, Object.assign({}, props, { ref: ref, __dndContext: dndContext }))))));
    Droppable.displayName = "ConnectedDroppable";
    return Droppable;
}
