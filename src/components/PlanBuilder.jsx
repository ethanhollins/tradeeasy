import React, { Component } from 'react';
import BranchContainer from './Branch/BranchContainer';
import InfoPanel from './Branch/InfoPanel';
import Branch from '../utils/Branch';

class PlanBuilder extends Component
{
    state = {
        branches: {}
    }

    render()
    {
        return (
            <React.Fragment>
                {/* <InfoPanel

                /> */}
                <BranchContainer
                    getBlock={this.getBlock}
                    getBranch={this.getBranch}
                    setSelected={this.setSelected}
                    BlockType={BlockType}
                />
            </React.Fragment>
        );    
    }

    componentDidMount()
    {
        let branch = new Branch({name:"On New Bar"});
        branch.getOpenAtOffset(0).add(this.getBlock("set"));
        branch.getOpenAtOffset(1).add(this.getBlock("above"));
        branch.getOpenAtOffset(2).add(this.getBlock("set"));
        branch.getOpenAtOffset(3).add(this.getBlock("buy"));
        branch.getOpenAtOffset(4).add(this.getBlock("set"));
        branch.getOpenAtOffset(3).selected = true;
        
        let { branches } = this.state;
        console.log(branch.objectify())

        branches[branch.block.name] = branch.gotoOpen();
        this.setState({ branches });
    }

    getBranch = (name) =>
    {
        return this.state.branches[name];
    }

    getSubBranchAtPos = (branch, sub, pos) =>
    {
        const { branches } = this.state;
        const sub_split = sub.split('-');
        let c_sub = "";
        let c_pos = 0;
        sub_split.forEach((i, idx) =>
        {
            c_sub = sub_split.slice(0, idx+1).join("-");
            c_pos += branches[branch][c_sub].length;

            if (pos < c_pos) return true;
        });

        return [c_sub, (c_pos - pos - 1)];
    }

    getBlock = (name) =>
    {
        return {
            "set": {
                "name": "set",
                "type": BlockType.ACTION,
                "actors": 1,
                "params": 1,
                "result": [null]
            },
            "buy": {
                "name": "buy",
                "type": BlockType.ACTION,
                "actors": 1,
                "params": 1,
                "result": ["Something"]
            },
            "above": {
                "name": "above",
                "type": BlockType.QUESTION,
                "actors": 1,
                "params": 1,
                "result": [
                    "YES", "NO"
                ]
            }
        }[name];
    }

    setSelected = (step) =>
    {
        const { branches } = this.state;
        step.setSelected();
        this.setState({ branches });
    }
}

const BlockType = {
    ACTION: 1,
    QUESTION: 2
}

export default PlanBuilder;