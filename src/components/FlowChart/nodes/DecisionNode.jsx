import Node from './Node';

class DecisionNode extends Node
{
    getWidth = () =>
    {
        return 70;
    }

    getHeight = () =>
    {
        return 70;
    }

    getStyle = () =>
    {
        return {
            position: 'absolute',
            width: this.getWidth() + 'px',
            height: this.getHeight() + 'px',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: 'rgb(0, 0, 0)',
            transform: 'rotate(45deg)'
        }
    }

}

export default DecisionNode;