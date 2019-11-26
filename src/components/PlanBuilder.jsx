import React, { Component } from 'react';
import BranchContainer from './Branch/BranchContainer';
import InfoPanel from './Branch/InfoPanel';
import BranchStep from '../utils/BranchStep';

class PlanBuilder extends Component
{
    state = {
        branches: {}
    }

    render()
    {
        return (
            <React.Fragment>
                <InfoPanel

                />
                <BranchContainer
                    getBlock={this.getBlock}
                    getBranch={this.getBranch}
                    BlockType={BlockType}
                />
            </React.Fragment>
        );    
    }

    componentDidMount()
    {
        let branch = new BranchStep({name:"On New Bar"});
        branch.getOpenAtOffset(0).add(this.getBlock("set"));
        branch.getOpenAtOffset(1).add(this.getBlock("above"));
        branch.getOpenAtOffset(2).add(this.getBlock("set"));
        branch.getOpenAtOffset(3).add(this.getBlock("set"));
        branch.getOpenAtOffset(4).add(this.getBlock("set"));
        
        let { branches } = this.state;

        branches[branch.block.name] = branch.gotoOpen();
        this.setState({ branches });
    }

    addStep = (branch, sub, pos, name) =>
    {
        const { branches } = this.state;
        const sub_result = this.getSubBranchAtPos(branch, sub, pos);
        const sub_mod = sub_result[0];
        const sub_pos = sub_result[1];
        const block = this.getBlock(name);

        branches[branch][sub_mod].splice(sub_pos, 0, block);

        this.setState({ branches });
    }

    changeStep = (branch, sub, pos, name) =>
    {
        const { branches } = this.state;
        const sub_result = this.getSubBranchAtPos(branch, sub, pos);
        const sub_mod = sub_result[0];
        const sub_pos = sub_result[1];
        const block = this.getBlock(name);

        branches[branch][sub_mod][sub_pos] = block;

        this.setState({ branches });
    }

    removeStep = (branch, sub, pos) =>
    {
        const { branches } = this.state;
        const sub_result = this.getSubBranchAtPos(branch, sub, pos);
        const sub_mod = sub_result[0];
        const sub_pos = sub_result[1];

        branches[branch][sub_mod].splice(sub_pos, 1);

        this.setState({ branches });
    }

    addBranch = (name) =>
    {

    }

    renameBranch = (branch, name) =>
    {
        
    } 

    removeBranch = (branch) =>
    {

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
                "supporters": 1,
                "result": ["Nothing"]
            },
            "buy": {
                "name": "buy",
                "type": BlockType.ACTION,
                "actors": 1,
                "supporters": 1,
                "result": ["Something"]
            },
            "above": {
                "name": "above",
                "type": BlockType.QUESTION,
                "actors": 1,
                "supporters": 1,
                "result": [
                    "YES", "NO"
                ]
            }
        }[name];
    }
}

const BlockType = {
    ACTION: 1,
    QUESTION: 2
}

export default PlanBuilder;