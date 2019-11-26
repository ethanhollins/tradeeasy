import React, { Component } from 'react';
import ActionBlock from './Blocks/ActionBlock';
import QuestionBlock from './Blocks/QuestionBlock';
import ItemBlock from './Blocks/ItemBlock';
import Connector from './Blocks/Connector';

class Step extends Component
{
    state = {
        pos: 0,
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
                    properties={{pos:{x:0,y:this.state.pos*2+1}}}
                    getCamera={this.getCamera}
                    getContainerPos={this.getContainerPos}
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
        let { pos, step } = this.state;
        pos = properties.pos;
        step = properties.step;

        this.setState({ pos, step });
    }

    update = () =>
    {
        const { pos } = this.state;
        const container = this.getContainer();
        const camera = this.getCamera();

        const screen_pos = camera.convertWorldPosToScreenPos({x:0,y:pos*2});
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

    getOpp = () =>
    {
        const { step } = this.state;
        const { BlockType } = this.props;

        if (step !== null)
        {
            if (step.block.type === BlockType.ACTION)
                return <ActionBlock
                    properties={{pos:{x:0,y:0}}}
                    getCamera={this.getCamera}
                    getContainerPos={this.getContainerPos}
                /> 
            else if (step.block.type === BlockType.QUESTION)
                return <QuestionBlock
                    properties={{pos:{x:0,y:0}}}
                    getCamera={this.getCamera}
                    getContainerPos={this.getContainerPos}
                /> 
        }
    }

    getInput = () =>
    {
        const test = [1];
        return test.map((i) => 
        {
            return <ItemBlock
                key={i}
                properties={{pos:{x:-1.25*i,y:0}}}
                getCamera={this.getCamera}
                getContainerPos={this.getContainerPos}
            />
        });
    }

    getOutput = () =>
    {
        const test = [1];
        return test.map((i) => 
        {
            return <ItemBlock
                key={i}
                properties={{pos:{x:1.25*i,y:0}}}
                getCamera={this.getCamera}
                getContainerPos={this.getContainerPos}
            />
        });
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