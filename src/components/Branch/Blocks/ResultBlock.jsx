import React from 'react';
import Block from "./Block";

class ResultBlock extends Block
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
                <div
                    ref="body"
                    style={{position:'absolute', textAlign:"center", fontSize:"20px", fontWeight:"550", color:"rgb(80,80,80)", fontFamily:"'Segoe UI', Verdana, Geneva, sans-serif", width:"100px", height:"100px"}}
                    onClick={this.onResultClick}
                >
                    {this.getStep().block.result[0]}
                </div>
            );
        }
        else
        {
            return (
                <div
                    ref="body"
                    style={{position:'absolute', textAlign:"center", fontSize:"20px", fontWeight:"550", color:"rgb(80,80,80)", fontFamily:"'Segoe UI', Verdana, Geneva, sans-serif", width:"100px", height:"100px"}}
                    onClick={this.onResultClick}
                >
                    {this.getStep().block.result[0]}
                </div>
            );
        }

        
    }
}

export default ResultBlock;