import React from 'react';
import Block from "./Block";

class ToolBoxBlock extends Block
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
                    style={toolbox_style}
                    width="250" 
                    height="75"
                >
                    <rect 
                        x="2" y="2" 
                        width="246" height="71" 
                        stroke="rgb(80,80,80)" strokeWidth="4" 
                        fill="rgb(255,255,255)"
                        rx="20" ry="20" 
                    />
                </svg>
            );
        }
        else
        {
            return;
        }

        
    }
}

const toolbox_style = {
    position:'absolute'
}

export default ToolBoxBlock;