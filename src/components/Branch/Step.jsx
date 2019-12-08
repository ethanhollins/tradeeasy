import React, { Component } from 'react';
import ActionBlock from './Blocks/ActionBlock';
import QuestionBlock from './Blocks/QuestionBlock';
import ItemBlock from './Blocks/ItemBlock';
import Connector from './Blocks/Connector';
import ResultBlock from './Blocks/ResultBlock';
import ToolBoxBlock from './Blocks/ToolBoxBlock';

class Step extends Component
{
    state = {
        pos: {x:0, y:0}
    }

    render()
    {
        return (
            <div 
                ref="container" 
                style={this.getStyle()}
                >
                {this.getConnectors()}
                {this.getOpp()}
                {this.getInput()}
                {this.getOutput()}
                {this.getResult()}
                {this.getToolBox()}
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
        let { pos } = this.state;
        pos = this.props.properties.pos;
        this.setState({ pos });
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
        const { step } = this.props.properties;

        // step.add()
    }

    delete = () =>
    {
        const { step } = this.props.properties;

        // step.delete()
    }

    change = () =>
    {
        const { step } = this.props.properties;

        // step.change()
    }

    select = () =>
    {
        const { step } = this.props.properties;
        const { setSelected } = this.props;

        setSelected(step);
    }

    toggleOpen = () =>
    {
        const { step } = this.props.properties;
        const { toggleOpen } = this.props;

        toggleOpen(step);
    }

    isSelected = () =>
    {
        const { step } = this.props.properties;
        return step.selected;
    }

    getOpp = () =>
    {
        const { step } = this.props.properties;
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
                    BlockType={this.props.BlockType}
                    cellSize={this.props.cellSize}
                /> 
            else if (step.block.type === BlockType.QUESTION)
                return <QuestionBlock
                    properties={properties}
                    getCamera={this.getCamera}
                    getContainerPos={this.getContainerPos}
                    BlockType={this.props.BlockType}
                    cellSize={this.props.cellSize}
                /> 
        }
    }

    getConnectors = () =>
    {
        const { pos } = this.state;
        const { cellSize } = this.props;
        const block_size = (cellSize) * (2/3);
        const connector_size = cellSize/2;
        const offset = ((block_size-connector_size)/2 + connector_size)/cellSize;
        
        return ([<Connector
            key={0}
            properties={{pos:{x:pos.x,y:pos.y - offset}}}
            getCamera={this.getCamera}
            getContainerPos={this.getContainerPos}
                    BlockType={this.props.BlockType}
                    cellSize={this.props.cellSize}
        />,
        <Connector
            key={1}
            properties={{pos:{x:pos.x,y:pos.y+offset}}}
            getCamera={this.getCamera}
            getContainerPos={this.getContainerPos}
            BlockType={this.props.BlockType}
            cellSize={this.props.cellSize}
        />]);
    }

    getInput = () =>
    {
        const { step } = this.props.properties;
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
                    BlockType={this.props.BlockType}
                    cellSize={this.props.cellSize}
                />);
            }
        }

        return result;
    }

    getOutput = () =>
    {
        const { step } = this.props.properties;
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
                    BlockType={this.props.BlockType}
                    cellSize={this.props.cellSize}
                />);
            }
        }

        return result;
    }

    getResult = () =>
    {
        const { step } = this.props.properties;

        if (step !== null)
        {
            if (step.block.result[0] !== null)
            {
                const properties = {
                    pos: {x:0, y:1-1/40},
                    step: this
                }
                return (
                    <ResultBlock
                        properties={properties}
                        getCamera={this.getCamera}
                        getContainerPos={this.getContainerPos}
                        BlockType={this.props.BlockType}
                        cellSize={this.props.cellSize}
                    />
                );
            }
        }
    }

    getToolBox = () =>
    {
        const { step } = this.props.properties;

        if (step !== null && step !== undefined)
        {
            if (step.selected)
            {
                const properties = {
                    //w/ RESULT: 2 - 1/3
                    //w/out RESULT: 1 + 1/3
                    pos: {x:0, y:1 + 1/3 - 1/8},
                    step: this
                }
                return (<ToolBoxBlock
                    properties={properties}
                    getCamera={this.getCamera}
                    getContainerPos={this.getContainerPos}
                    BlockType={this.props.BlockType}
                    cellSize={this.props.cellSize}
                />)
            }
        }
    }

    getStyle = () =>
    {
        const { zidx } = this.props.properties;
        return {
            position: 'absolute',
            zIndex: zidx
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

    getStep = () =>
    {
        return this.props.properties.step;
    }

    getBlockType = () =>
    {
        return this.getStep().block.type;
    }
    
}

export default Step;