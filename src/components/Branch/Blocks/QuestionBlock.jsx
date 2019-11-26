import React from 'react';
import Block from "./Block";

class QuestionBlock extends Block
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
                 <rect x="10" y="10" width="80" height="80" stroke="rgb(80,80,80)" strokeWidth="4" fill="rgb(255,255,255)" />
            </svg>
        );
    }

    getRotation = () =>
    {
        return 45;
    }
}

export default QuestionBlock;