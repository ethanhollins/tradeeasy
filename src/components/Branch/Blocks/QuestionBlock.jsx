import React from 'react';
import Block from "./Block";

class QuestionBlock extends Block
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
                    style={main_style}
                    width={this.props.cellSize} 
                    height={this.props.cellSize}
                    onClick={this.onMainClick}
                >
                     <rect 
                        x={this.getSelectedOffset()} 
                        y={this.getSelectedOffset()} 
                        width={this.getSelectedSize()} 
                        height={this.getSelectedSize()} 
                        stroke="rgb(80,80,80)" strokeWidth="6" 
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
                    style={main_style}
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
        return Math.round(this.props.cellSize * (9/10));
    }

    getSelectedOffset = () =>
    {
        return Math.round((this.props.cellSize - this.getSelectedSize()) / 2);
    }

    getRotation = () =>
    {
        return 45;
    }
}

const main_style = {
    position:'absolute',
    cursor: "pointer",
    userSelect: "none"
}

export default QuestionBlock;