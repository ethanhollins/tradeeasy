import Node from './Node';

class ActivityNode extends Node
{
    getWidth = () =>
    {
        return 200 * 0.68;
    }

    getHeight = () =>
    {
        return 125 * 0.58;
    }

    getStyle = () =>
    {
        return {
            position: 'absolute',
            width: this.getWidth() + 'px',
            height: this.getHeight() + 'px',
            backgroundColor: 'rgb(255, 255, 255)',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: 'rgb(0, 0, 0)'
        }
    }

}

export default ActivityNode;