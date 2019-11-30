import React from 'react';
import Block from "./Block";

class Connector extends Block
{
    getBadge = () =>
    {
        return (
            <svg
                ref="body"
                style={{position:'absolute'}}
                width={this.props.cellSize} 
                height={this.props.cellSize}
            >
                <rect x="48" y="25" width="4" height={this.props.cellSize*(2/3)+1} fill="rgb(80,80,80)" />
            </svg>
        );
    }
}

export default Connector;