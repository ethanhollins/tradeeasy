import React, { Component } from 'react';

class Camera extends Component
{
    state = {
        pos: {x: 0, y: 0},
        zoom: 1.25
    }

    render()
    {
        return (
            <React.Fragment/>
        );
    }

    move = (x, y) =>
    {
        let { pos } = this.state;

        pos = {x:x, y:y};
        this.setState({pos});
    }

    pan = (dx, dy) =>
    {
        let { pos } = this.state;

        pos.x += dx;
        pos.y += dy;
        this.setState({pos});
    }

    zoom = (dz) =>
    {
        let { zoom } = this.state;
        const speed = -0.01;

        zoom += (dz * speed) * 0.15 * zoom;
        zoom = this.clampZoom(zoom);

        this.setState({zoom});
    }

    clampZoom = (zoom)  =>
    {
        const min = 0.5, max = 3;
        return Math.min(Math.max(zoom, min), max);
    }

    convertScreenPosToWorldPos = (screen_pos, size) =>
    {
        const { pos } = this.state;

        let world_pos = {x:0, y:0};
        size = size === undefined || size === null ? {width:0, height:0}: size;

        world_pos.x = (
            parseFloat(
                screen_pos.x 
                - this.getModifiedCellSize().width/2 
                - this.props.getCanvas().width/2 
                + size.width/2
            ) 
            / this.getModifiedCellSize().width 
            + pos.x
        );
        world_pos.y = (
            parseFloat(
                screen_pos.y 
                - this.getModifiedCellSize().height/2 
                - this.props.getCanvas().height/2 
                + size.height/2
            ) 
            / this.getModifiedCellSize().height 
            + pos.y
        );
    
        return world_pos;
    }

    convertWorldPosToScreenPos = (world_pos, size) =>
    {
        const { pos } = this.state;

        let screen_pos = {x:0, y:0};
        size = size === undefined || size === null ? {width:0, height:0}: size;

        screen_pos.x = (
            parseFloat(world_pos.x - pos.x) 
            * this.getModifiedCellSize().width 
            + this.props.getCanvas().width/2 
            - size.width/2 
            - this.getModifiedCellSize().width/2
        );
        screen_pos.y = (
            parseFloat(world_pos.y - pos.y) 
            * this.getModifiedCellSize().height 
            + this.props.getCanvas().height/2 
            - size.height/2 
            - this.getModifiedCellSize().height/2
        );
    
        return screen_pos;
    }

    getModifiedCellSize = () =>
    {
        const { zoom } = this.state;
        const { cellWidth, cellHeight } = this.props;
        
        return {
            width: cellWidth * zoom,
            height: cellHeight * zoom
        }
    }
}

export default Camera;