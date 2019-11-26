import React from 'react';
import Block from "./Block";

class ItemBlock extends Block
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
                <circle cx="50" cy="50" r="40" stroke="rgb(80,80,80)" strokeWidth="4" fill="rgb(80,80,80)" />
            </svg>
        );
    }
}

export default ItemBlock;