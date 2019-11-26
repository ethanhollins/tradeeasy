import React from 'react';
import Block from "./Block";

class ActionBlock extends Block
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
                <rect x="2" y="2" width="96" height="96" stroke="rgb(80,80,80)" strokeWidth="4" fill="rgb(255,255,255)" />
            </svg>
        );
    }
}

export default ActionBlock;