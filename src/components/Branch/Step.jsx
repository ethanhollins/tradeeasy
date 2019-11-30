import React, { Component } from 'react';
import ActionBlock from './Blocks/ActionBlock';
import QuestionBlock from './Blocks/QuestionBlock';
import ItemBlock from './Blocks/ItemBlock';
import Connector from './Blocks/Connector';

class Step extends Component
{
    state = {
        idx: 0,
        pos: {x:0, y:0},
        step: null
    }

    render()
    {
        return (
            <div 
                ref="container" 
                style={this.getStyle()}
            >
                <Connector
                    properties={{pos:{x:this.state.pos.x,y:this.state.pos.y-(1/2)}}}
                    getCamera={this.getCamera}
                    getContainerPos={this.getContainerPos}
                    cellSize={this.props.cellSize}
                />
                <Connector
                    properties={{pos:{x:this.state.pos.x,y:this.state.pos.y+(1/2)}}}
                    getCamera={this.getCamera}
                    getContainerPos={this.getContainerPos}
                    cellSize={this.props.cellSize}
                />
                {this.getOpp()}
                {this.getInput()}
                {this.getOutput()}
            </div>
        );    
    }

    componentDidMount()
    {
        this.setup();
    }
    
    componentDidUpdate()
    {
        this.update();
    }

    setup = () =>
    {
        const { properties } = this.props;
        let { idx, pos, step } = this.state;
        idx = properties.idx;
        pos = properties.pos;
        step = properties.step;
        this.setState({ idx, pos, step });
    }

    update = () =>
    {
        const { pos } = this.state;
        const container = this.getContainer();
        const camera = this.getCamera();

        const screen_pos = camera.convertWorldPosToScreenPos({x:pos.x,y:pos.y});
        container.style.transform = `translate(${screen_pos.x}px, ${screen_pos.y}px)`;
    }

    add = () =>
    {
        const { step } = this.state;

        // step.add()
    }

    delete = () =>
    {
        const { step } = this.state;

        // step.delete()
    }

    change = () =>
    {
        const { step } = this.state;

        // step.change()
    }

    select = () =>
    {
        const { step } = this.state;
        const { setSelected } = this.props;

        setSelected(step);
    }

    isSelected = () =>
    {
        const { step } = this.state;
        return step.selected;
    }

    getOpp = () =>
    {
        const { step } = this.state;
        const { BlockType } = this.props;

        if (step !== null)
        {
            const properties = {
                pos: {x:0, y:0},
                step: this
            }
            if (step.block.type === BlockType.ACTION)
                return <ActionBlock
                    properties={properties}
                    getCamera={this.getCamera}
                    getContainerPos={this.getContainerPos}
                    cellSize={this.props.cellSize}
                /> 
            else if (step.block.type === BlockType.QUESTION)
                return <QuestionBlock
                    properties={properties}
                    getCamera={this.getCamera}
                    getContainerPos={this.getContainerPos}
                    cellSize={this.props.cellSize}
                /> 
        }
    }

    getInput = () =>
    {
        const { step } = this.state;
        let result = [];

        if (step !== null)
        {
            for (let i=0; i<step.block.actors; i++)
            {
                const properties = {
                    pos: {x:-1.4*(i+1), y:0},
                    step: this
                }
                result.push(<ItemBlock
                    key={i}
                    properties={properties}
                    getCamera={this.getCamera}
                    getContainerPos={this.getContainerPos}
                    cellSize={this.props.cellSize}
                />);
            }
        }

        return result;
    }

    getOutput = () =>
    {
        const { step } = this.state;
        let result = [];

        if (step !== null)
        {
            for (let i=0; i<step.block.params; i++)
            {
                const properties = {
                    pos: {x:1.4*(i+1), y:0},
                    step: this
                }
                result.push(<ItemBlock
                    key={i}
                    properties={properties}
                    getCamera={this.getCamera}
                    getContainerPos={this.getContainerPos}
                    cellSize={this.props.cellSize}
                />);
            }
        }

        return result;
    }

    getStyle = () =>
    {
        return {
            position: 'absolute'
        }
    }

    getCamera = () =>
    {
        return this.props.getCamera();
    }

    getContainer = () =>
    {
        return this.refs.container;
    }

    getContainerPos = () =>
    {
        return this.state.pos;
    }
    
}

export default Step;