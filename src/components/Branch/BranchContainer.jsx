import React, { Component } from 'react';
import Camera from './Camera';
import Step from './Step';

class BranchContainer extends Component
{
    state = {
        branch: "On New Bar",
        is_panning: false
    }

    render()
    {
        return (
            <div
                ref="branch_container"
                id="branch_container"
                style={container_style}
            >
                <Camera
                    ref="camera"
                    getWidth={this.getWidth}
                    getHeight={this.getHeight}
                    cellSize={CELL_SIZE}
                />
                {this.getSteps()}
                
            </div>
        );
    }

    componentDidMount()
    {
        window.addEventListener("mousedown", this.onMouseDown.bind(this));
        window.addEventListener("mousemove", this.onMouseMove.bind(this));
        window.addEventListener("mouseup", this.onMouseUp.bind(this));

        window.addEventListener('resize', this.update.bind(this));
        window.addEventListener("onwheel" in document ? "wheel" : "mousewheel", this.onScroll.bind(this));

    }

    componentDidUpdate()
    {

    }

    onMouseDown(e)
    {
        let { is_panning } = this.state;
        is_panning = true;

        this.setState({is_panning});
    }

    onMouseMove(e)
    {
        const { is_panning } = this.state;

        if (is_panning)
        {
            const { camera } = this.refs;

            camera.pan(
                0,
                -e.movementY / CELL_SIZE / camera.state.zoom
            );
            this.setState({ camera });
        }
    }

    onMouseUp(e)
    {
        let { is_panning } = this.state;
        is_panning = false;

        this.setState({is_panning});
    }
    
    onScroll(e)
    {
        const { camera } = this.refs;
        
        camera.zoom(e.deltaY);

        this.setState({ camera });
    }

    update = () =>
    {
        this.forceUpdate();
    }

    changeBranch = (new_branch) =>
    {
        let { branch } = this.state;
        branch = new_branch;
        this.setState({ branch });
    }

    changeSubBranch = (new_sub) =>
    {
        let { sub_branch } = this.state;

        if (new_sub !== null && new_sub !== sub_branch)
        {
            sub_branch = new_sub;
            this.setState({ sub_branch });
        }
    }
    
    getSubBranch = (start) =>
    {
        const { branch } = this.state;
        const branches = this.props.getBranches();
        if (branch in branches)
        {
            if (start in branches[branch])
            {
                let result = start;
                
                while (true)
                {
                    const sub = branches[branch][result];
                    if ("lastSub" in sub[sub.length-1])
                    {
                        if ((result + "-"+sub[sub.length-1].lastSub) in branches[branch])
                            result += "-"+sub[sub.length-1].lastSub;
                        else
                            return result;
                    }
                    else return result;
                }
            }
        }

        return null;
    }

    getSteps = () =>
    {
        const { branch } = this.state;
        
        let c_step = this.props.getBranch(branch);
        let steps = [];
        let idx = 0;
        let y_pos = 0;

        while (c_step !== undefined && c_step !== null)
        {
            const properties = {
                idx: idx,
                pos: {x:0, y:y_pos},
                step: c_step
            }

            steps.push(<Step
                key={idx}
                properties={properties}
                getCamera={this.getCamera}
                getBlock={this.props.getBlock}
                setSelected={this.props.setSelected}
                BlockType={this.props.BlockType}
                cellSize={CELL_SIZE}
            />);
            
            if (c_step.block.result[0] !== null)
                y_pos += 1 + (7/6);
            else
                y_pos += 1 + (2/3);
            
                idx += 1;
            c_step = c_step.gotoOpen();
        }

        return steps;
    }

    getWidth = () =>
    {
        return this.refs.branch_container.clientWidth;
    }

    getHeight = () =>
    {
        return this.refs.branch_container.clientHeight;
    }

    getCamera = () =>
    {
        return this.refs.camera;
    }
}

const CELL_SIZE = 100;

const container_style = {
    position: 'relative',
    display: 'inline-block',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(255,255,255)'
    
}

export default BranchContainer; 