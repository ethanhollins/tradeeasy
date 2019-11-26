import React, { Component } from 'react';
import ActivityNode from './nodes/ActivityNode';

class Node extends Component
{
    state = {
        nodes: []
    }

    render()
    {
        return (
            <div 
                ref="node_container"
                className="node_container"
            >
                {this.props.getActivities()['On New Bar'].nodes.map((item) =>
                (
                    <ActivityNode
                        key={item.id}
                        properties={item}
                        getCamera={this.props.getCamera}
                        getConnectionBuilder={this.props.getConnectionBuilder}
                        getNodes={this.getNodes}
                    />
                ))}
            </div>
        );    
    }

    componentDidMount()
    {

    }

    componentDidUpdate()
    {

    }
    
    getNodes = () =>
    {
        return this.props.getActivities()['On New Bar'].nodes;
    }
}



export default Node;