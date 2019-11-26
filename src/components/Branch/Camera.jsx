import React, { Component } from 'react';

class Camera extends Component
{
    state = {
        pos: {x: 0, y: 0},
        zoom: 0.8
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
        const { cellSize } = this.props;

        let world_pos = {x:0, y:0};
        size = size === undefined || size === null ? {width:0, height:0}: size;
        
        world_pos.x = (
            parseFloat(
                screen_pos.x
                - cellSize/2 
                - this.props.getWidth()/2 
                + size.width/2
            )
            / this.getModifiedCellSize() 
            + pos.x
        );
        world_pos.y = (
            parseFloat(
                screen_pos.y 
                - cellSize/2 
                - this.props.getHeight()/2 
                + size.height/2
            )
            / this.getModifiedCellSize() 
            + pos.y
        );
    
        return world_pos;
    }

    convertWorldPosToScreenPos = (world_pos, size) =>
    {
        const { pos } = this.state;
        const { cellSize } = this.props;

        let screen_pos = {x:0, y:0};
        size = size === undefined || size === null ? {width:0, height:0}: size;
        
        screen_pos.x = (
            parseFloat(world_pos.x - pos.x) 
            * this.getModifiedCellSize() 
            + this.props.getWidth()/2 
            - size.width/2
            - cellSize/2
        );
        screen_pos.y = (
            parseFloat(world_pos.y - pos.y) 
            * this.getModifiedCellSize() 
            + this.props.getHeight()/2 
            - size.height/2
            - cellSize/2
        );
    
        return screen_pos;
    }

    getModifiedCellSize = () =>
    {
        const { zoom } = this.state;
        const { cellSize } = this.props;
        
        return cellSize * zoom;
    }
}

export default Camera;