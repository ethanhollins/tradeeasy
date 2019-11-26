import Node from './Node';

class InitiationNode extends Node
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
            borderStyle: 'solid',
            borderWidth: '1px',
            borderRadius: '50px',
            borderColor: 'rgb(0, 0, 0)'
        }
    }

}

export default InitiationNode;