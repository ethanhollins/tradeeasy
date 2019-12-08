import React from 'react';
import Block from "./Block";

class Connector extends Block
{
    getBadge = () =>
    {
        return (
            <svg
                ref="body"
                style={connector_style}
                width={this.props.cellSize}
                height={this.props.cellSize*(1/2)}
            >
                <rect 
                    x="48" y="0" 
                    width="4" height={this.props.cellSize*(1/2)} 
                    fill="rgb(80,80,80)" 
                />
            </svg>
        );
    }
}

const connector_style = {
    position:'absolute',
    userSelect: "none"
}

export default Connector;