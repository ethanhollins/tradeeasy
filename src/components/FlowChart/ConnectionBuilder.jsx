import React, { Component } from 'react';

class ConnectionBuilder extends Component
{
    state = {
        connections: {},
        paths: []
    }

    render()
    {
        return (
            <div>
            </div>
        );    
    }

    addConnection = (n1, n2) =>
    {
        const start = [n1.pos.x, n1.pos.y];
        const end = [n2.pos.x, n2.pos.y];

        let { connections, paths } = this.state;
        
        const start_p = this.getClosestCorner(end, start);
        let closest_p = null;        
        paths.forEach((conn) =>
        {
            if (this.isEqual(end, conn[conn.length-3]))
            {
                conn.slice(2, conn.length-3).forEach((i) =>
                {
                    if (closest_p === null)
                        closest_p = i;
                    else if (this.getDist(start_p, i) < this.getDist(start_p, closest_p))
                        closest_p = i;
                });
            }
        });

        const end_p = this.getClosestCorner(start_p, end);
        const start_dist = this.getDist(start_p, end_p);
        let final_path = null;
        if (closest_p !== null && this.getDist(start_p, closest_p) < start_dist)
        {
            const pre_conn = this.connectToNode(start, start_p, false);

            final_path = this.findPath(start_p, closest_p, []);
            final_path.unshift(pre_conn[0], pre_conn[1]);
        }
        else
        {
            const pre_conn = this.connectToNode(start, start_p, false);
            const post_conn = this.connectToNode(end, end_p, true);
            
            final_path = this.findPath(start_p, end_p, []);
            final_path.unshift(pre_conn[0], pre_conn[1]);
            final_path.push(post_conn[0], post_conn[1]);
        }

        final_path.forEach((p, idx) =>
        {
            if (idx == 0) return;

            let { connections } = this.state;

            const p1 = final_path[idx-1];
            const p2 = p;
            const r_p1 = this.roundPoint(p1);
            const r_p2 = this.roundPoint(p2);

            const key = this.getKey(r_p1, r_p2);

            const connection = {

            };

            if (Object.keys(connections).includes(key))
                connections[key].push(connection);
            else
                connections[key] = [connection]


        });
        console.log(connections);
        paths.push(final_path);
        return final_path;
    }

    findPath = (current, end, path) =>
    {
        path.push(current);
        if (this.isEqual(current, end))
        {
            return path;
        }
        
        const offs = [[-1,0], [0,1], [1,0], [0,-1]];
        let closest_p = null;
        offs.forEach((i) =>
        {
            let new_p = this.addPoints(current, i);

            if (closest_p === null)
                closest_p = new_p;
            else if (this.getDist(new_p, end) < this.getDist(closest_p, end))
                closest_p = new_p;
        });

        return this.findPath(closest_p, end, path);
    }

    connectToNode = (p1, p2, is_end) =>
    {
        const offs_start = [
            [[0,0],[0.5,0.5],[0,-0.5]], 
            [[1,0],[-0.5,0.5],[0,-0.5]], 
            [[0,1],[0.5,-0.5],[0,0.5]], 
            [[1,1],[-0.5,-0.5],[0,0.5]]
        ];

        const offs_end = [
            [[0,0],[0.5,0],[0,0.5]], 
            [[1,0],[-0.5,0],[0,0.5]], 
            [[0,1],[0.5,0],[0,-0.5]], 
            [[1,1],[-0.5,0],[0,-0.5]]
        ];

        let result = [];
        for (let i=0; i<offs_start.length; i++)
        {
            if (this.isEqual(this.addPoints(p1, offs_start[i][0]), p2))
            {
                let add_one = null;
                let add_two = null;
                if (is_end)
                {
                    add_one = this.addPoints(p2, offs_end[i][1]);
                    add_two = this.addPoints(add_one, offs_end[i][2]);
                }
                else
                {
                    add_one = this.addPoints(p2, offs_start[i][1]);
                    add_two = this.addPoints(add_one, offs_start[i][2]);
                }
                
                result = [add_one, add_two];
                break;
            }
        }

        return result;
    }

    getDist = (p1, p2) =>
    {
        return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
    }
    
    getClosestCorner = (start, end) =>
    {
        const offs = [[0,0], [1,0], [0,1], [1,1]];
        let closest_p = null;
        offs.forEach((i) =>
        {
            let new_p = this.addPoints(end, i);

            if (closest_p === null)
                closest_p = new_p;
            else if (this.getDist(new_p, start) < this.getDist(closest_p, start))
                closest_p = new_p;
        });

        return closest_p;
    }

    getKey = (p1, p2) =>
    {
        return String(
            p1[0] + "," + p1[1] + 
            "-" +
            p2[0] + "," + p2[1]
        );
    }

    addPoints = (p1, p2) =>
    {
        return [p1[0]+p2[0], p1[1]+p2[1]];
    }

    roundPoint = (p) =>
    {
        return [Math.ceil(p[0]), Math.ceil(p[1])];
    }

    isEqual = (p1, p2) =>
    {
        return p1[0] === p2[0] && p1[1] === p2[1];
    }

    draw = () =>
    {
        const { getCanvas, getCamera } = this.props;
        const { paths } = this.state;

        const camera = getCamera();
        const canvas = getCanvas();
        const ctx = canvas.getContext("2d");
        
        ctx.setLineDash([]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(0, 0, 0, 1.0)`;
        
        paths.forEach((conn) =>
        {
            let world_pos = camera.convertWorldPosToScreenPos({x:conn[0][0], y:conn[0][1]});

            ctx.beginPath();
            ctx.moveTo(world_pos.x, world_pos.y);

            conn.slice(1, conn.length).forEach((i) =>
            {
                world_pos = camera.convertWorldPosToScreenPos({x:i[0], y:i[1]});

                ctx.lineTo(world_pos.x, world_pos.y);
            });
            ctx.stroke();

        });

    }
}

export default ConnectionBuilder;