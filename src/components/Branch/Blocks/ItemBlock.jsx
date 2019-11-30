import React from 'react';
import Block from "./Block";

class ItemBlock extends Block
{
    getBadge = () =>
    {
        const { step } = this.state;

        if (step === null || step === undefined)
        {
            return;
        }
        else if (step.isSelected())
        {
            return (
                <svg
                    ref="body"
                    style={{position:'absolute'}}
                    width="100" 
                    height="100"
                >
                    <rect x="0" y="25" width="100" height="50" fill="rgb(80,80,80)" />
                </svg>
            );
        }
        else
        {
            return;
        }

        
    }
}

export default ItemBlock;