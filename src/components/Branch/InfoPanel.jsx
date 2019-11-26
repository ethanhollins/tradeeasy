import React, { Component } from 'react';

class InfoPanel extends Component
{
    state = {}

    render()
    {
        return (
            <div
                ref="panel_container"
                id="panel_container"
                style={container_style}
            >

            </div>
        )
    }
}

const container_style = {
    position: 'relative',
    display: 'inline-block',
    overflow: 'hidden',
    width: 'calc(40% - 2px)',
    height: '100%',
    backgroundColor: 'rgb(240,240,240)',
    borderRight: '2px solid rgb(80,80,80)'
    
}

export default InfoPanel; 