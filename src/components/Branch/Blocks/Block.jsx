import React, { Component } from 'react';

class Block extends Component
{
    state = {
        id: null,
        pos: {x: 0, y: 0}
    }

    render()
    {
        return (
            <React.Fragment>
                {this.getBadge()}
            </React.Fragment>
        );    
    }

    componentDidMount()
    {
        this.setup();
    }
    
    componentDidUpdate()
    {
        this.updateNode();
    }

    setup = () =>
    {
        const { properties } = this.props;
        let { pos } = this.state;

        pos = properties.pos;
        this.setState({ pos });
    }

    updateNode = () =>
    {
        const { pos } = this.state;
        const { body } = this.refs;
        const cont_pos = this.props.getContainerPos();
        const camera = this.props.getCamera();
        
        const new_pos = {
            x: pos.x,
            y: pos.y + cont_pos
        }

        const screen_pos = camera.convertWorldPosToScreenPos(new_pos);
        const cont_screen_pos = camera.convertWorldPosToScreenPos({x:0, y:cont_pos});
        
        const new_screen_pos = {
            x: screen_pos.x - cont_screen_pos.x,
            y: screen_pos.y - cont_screen_pos.y
        }

        body.style.transform = `translate(${new_screen_pos.x}px, ${new_screen_pos.y}px) rotate(${this.getRotation()}deg) scale(${camera.state.zoom})`;
    }

    getBadge = () =>
    {
        return (
            <svg
                ref="body"
                style={{position:'absolute'}}
                width="100" 
                height="100"
            >
                <circle cx="50" cy="50" r="48" stroke="rgb(80,80,80)" strokeWidth="4" fill="none" />
            </svg>
        );
    }

    getRotation = () =>
    {
        return 0;
    }
}

export default Block;