import React, { Component } from 'react';

class Node extends Component
{
    state = {
        id: null,
        pos: {x: 0, y:0},
        connections: [],
        order: 0,
        activity: "",
        styling: {},
        arrows: []
    }

    render()
    {
        return (
            <div 
                ref="body" 
                style={this.getStyle()}
            >
            </div>
        );    
    }

    componentDidMount()
    {   
        this.setProperties();
        this.setConnections();
    }
    
    componentDidUpdate()
    {
        this.updateNode();
    }

    setProperties = () =>
    {
        const { properties } = this.props;
        let {
            id,
            pos,
            connections,
            order,
            activity,
            styling
        } = this.state;

        id = properties.id;
        pos = properties.pos;
        connections = properties.connections;
        order = properties.order;
        activity = properties.activity;
        styling = properties.styling;

        this.setState({
            id,
            pos,
            connections,
            order,
            activity,
            styling
        });
    }

    setConnections = () =>
    {
        const { properties } = this.props;
        const { getConnectionBuilder } = this.props;
        const connection_builder = getConnectionBuilder();

        properties.connections.forEach((id) => 
        {
            const conn = this.getNode(id);
            if (conn)
            {
                connection_builder.addConnection(
                    properties, conn
                );
            }
        });
    }

    updateNode = () =>
    {
        const { pos } = this.state;
        const { body } = this.refs;
        const camera = this.props.getCamera();

        const mod_width = this.getWidth() * camera.state.zoom;
        const mod_height = this.getHeight() * camera.state.zoom;

        const screen_pos = camera.convertWorldPosToScreenPos(pos, {width: mod_width, height: mod_height});
        const cell_size = camera.getModifiedCellSize();

        body.style.left = (screen_pos.x + cell_size.width/2) + "px";
        body.style.top = (screen_pos.y + cell_size.height/2) + "px";

        body.style.width = mod_width + "px";
        body.style.height = mod_height + "px";
    }

    getNode = (id) =>
    {
        const { getNodes } = this.props;
        const nodes = getNodes();
        let result = null;
        nodes.forEach((i) =>
        {
            if (parseInt(i.id) === parseInt(id))
            {
                result = i;
                return true;
            }
        });
        return result;
    }

    getWidth = () =>
    {
        return 200 * .5;
    }

    getHeight = () =>
    {
        return 125 * .5;
    }

    getStyle = () =>
    {
        return {
            position: 'absolute',
            width: this.getWidth() + 'px',
            height: this.getHeight() + 'px',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: 'rgb(255, 0, 0)'
        }
    }
}

export default Node;