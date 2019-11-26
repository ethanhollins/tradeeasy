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
                width="100" 
                height="100"
            >
                <rect x="48" y="0" width="4" height="100" fill="rgb(80,80,80)" />
            </svg>
        );
    }
}

export default Connector;