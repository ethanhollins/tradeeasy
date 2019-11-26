import React, { Component } from 'react';
import Camera from './Camera';
import NodeContainer from './NodeContainer';
import ConnectionBuilder from './ConnectionBuilder';

class FlowChart extends Component
{
    state = {
        is_panning: false
    }

    render()
    {
        return (
            <div 
                id="fc_container"
                ref="fc_container"
                style={flowchart_style}
                >
                <Camera 
                    ref="camera" 
                    getCanvas={this.getCanvas}
                    cellWidth={cell_width}
                    cellHeight={cell_height}
                />
                <canvas
                    id="fc_background"
                    ref="fc_background"
                />
                <ConnectionBuilder
                    ref="connection_builder"
                    getCamera={this.getCamera}
                    getCanvas={this.getCanvas}
                />
                <NodeContainer
                    getActivities={this.getActivities}
                    getCamera={this.getCamera}
                    getCanvas={this.getCanvas}
                    getConnectionBuilder={this.getConnectionBuilder}
                />
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

        this.updateCanvas();
    }

    componentDidUpdate()
    {
        this.update();
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

            const cell_size = camera.getModifiedCellSize();
            camera.pan(
                -e.movementX / cell_size.width,
                -e.movementY / cell_size.height
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

    update()
    {
        this.updateCanvas();
    }

    updateCanvas()
    {
        const { fc_container, fc_background, connection_builder } = this.refs;
        fc_background.setAttribute('height', fc_container.clientHeight);
        fc_background.setAttribute('width', fc_container.clientWidth);

        this.draw();
        connection_builder.draw();
    }

    draw()
    {
        const { fc_background, camera } = this.refs;
        const pos = camera.convertWorldPosToScreenPos({x: 0, y: 0});
        const cell_size = camera.getModifiedCellSize();
        const zoom = camera.state.zoom;
        const ctx = fc_background.getContext("2d");
        ctx.clearRect(0, 0, fc_background.width, fc_background.height);

        const mod_dash_size = dash_size * zoom;
        let x = pos.x % cell_size.width, y = pos.y % cell_size.height;

        let line_off_x = Math.round((x % mod_dash_size) * 1000) / 1000;
        let dash_off = Math.round((x - line_off_x)/mod_dash_size);
        line_off_x = dash_off % 2 === 0 ? line_off_x - mod_dash_size * 2.5 : line_off_x - mod_dash_size * 1.5;

        let line_off_y = Math.round((y % mod_dash_size) * 1000) / 1000;
        dash_off = Math.round((y - line_off_y)/mod_dash_size);
        line_off_y = dash_off % 2 === 0 ? line_off_y - mod_dash_size * 2.5 : line_off_y - mod_dash_size * 1.5;

        ctx.setLineDash([mod_dash_size, mod_dash_size]);
        ctx.strokeStyle = `rgba(200, 200, 200, 1.0)`;

        while (x < fc_background.width)
        {
            ctx.beginPath();
            ctx.moveTo(x, line_off_y);
            ctx.lineTo(x, fc_background.height);
            ctx.stroke();
            
            x += cell_size.width;
        }
    
        while (y < fc_background.height)
        {
            ctx.beginPath();


            ctx.moveTo(line_off_x, y);
            ctx.lineTo(fc_background.width, y);
            ctx.stroke();
            
            y += cell_size.height;
        }
    }

    getCanvas = () =>
    {
        return this.refs.fc_background;
    }

    getCamera = () =>
    {
        return this.refs.camera;
    }

    getActivities = () =>
    {
        return this.props.getActivities();
    }

    getConnectionBuilder = () =>
    {
        return this.refs.connection_builder;
    }
}

const cell_width = 200;
const cell_height = 125;
const dash_size = 12.5;

const flowchart_style = {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: '100%'
}

export default FlowChart;