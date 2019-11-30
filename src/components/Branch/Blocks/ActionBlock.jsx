import React from 'react';
import Block from "./Block";

class ActionBlock extends Block
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
                    width={this.props.cellSize} 
                    height={this.props.cellSize}
                    onClick={this.onMainClick}
                >
                    <rect 
                        x={this.getSelectedOffset()} 
                        y={this.getSelectedOffset()} 
                        width={this.getSelectedSize()} 
                        height={this.getSelectedSize()} 
                        stroke="rgb(80,80,80)" strokeWidth="7" 
                        fill="rgb(255,255,255)" 
                    />
                </svg>
            );
        }
        else
        {
            return (
                <svg
                    ref="body"
                    style={{position:'absolute'}}
                    width={this.props.cellSize} 
                    height={this.props.cellSize}
                    onClick={this.onMainClick}
                >
                    <rect 
                        x={this.getDeselectedOffset()} 
                        y={this.getDeselectedOffset()} 
                        width={this.getDeselectedSize()} 
                        height={this.getDeselectedSize()} 
                        stroke="rgb(80,80,80)" strokeWidth="4" 
                        fill="rgb(255,255,255)" 
                    />
                </svg>
            );
        }
    }
    
    getDeselectedSize = () =>
    {
        return Math.round(this.getSelectedSize() * (2/3));
    }
    
    getDeselectedOffset = () =>
    {
        return Math.round((this.props.cellSize - this.getDeselectedSize()) / 2);
    }
    
    getSelectedSize = () =>
    {
        return Math.round(this.props.cellSize - 4);
    }
    
    getSelectedOffset = () =>
    {
        return Math.round((this.props.cellSize - this.getSelectedSize()) / 2);
    }
}

export default ActionBlock;