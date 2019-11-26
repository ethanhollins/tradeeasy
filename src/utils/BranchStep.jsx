class BranchStep
{
    next = [];
    open = false;

    constructor(block, prev, pos)
    {
        this.block = block;
        this.prev = prev;

        if (pos === undefined)
            this.pos = [0,0];
        else
            this.pos = pos;
    }

    add = (block, sub_pos) =>
    {
        const open_pos = this.getOpen();
        let new_step = null;
        if (sub_pos !== undefined)
        {
            new_step = new BranchStep(
                block, this, 
                [
                    sub_pos, 
                    this.next[sub_pos].length
                ]
            );
            this.next[sub_pos].push(new_step);
        }
        else if (open_pos === null)
        {
            new_step = new BranchStep(block, this, [0, 0]);
            this.next.push([new_step]);
        }
        else
        {
            new_step = new BranchStep(
                block, this, 
                [
                    open_pos[0], 
                    this.next[open_pos[0]].length
                ]
            );
            this.next[open_pos[0]].push(new_step);
        }

        return new_step;
    }

    addSub = (block) =>
    {
        const new_step = new BranchStep(block, this, [this.next.length, 0]);
        this.next.push([new_step]);
    }

    delete = () =>
    {
        const open_pos = this.getOpen();
        const step = open_pos === null ? null : this.next[open_pos[0]][open_pos[1]];
        this.prev.replaceStep(step, this.pos);
        return this;
    }

    change = (block) =>
    {
        let result = [];

        for (let i=0; i<this.next.length; i++)
        {
            const sub = this.next[i];
            let result_sub = [];
            for (let j=0; j<block.result.length; j++)
            {
                if (j < sub.length)
                    result_sub.push(sub[j]);
            }
            result.push(result_sub);
        }

        this.next = result;
        this.block = block;

        return this;
    }

    move = () =>
    {

    }

    replaceStep = (step, pos) =>
    {
        if (step === null)
            this.next[pos[0]].splice(pos[1], pos[1]+1);
        else
        {
            step.pos = pos;
            this.next[pos[0]][pos[1]] = step;
        }
    }

    isPos = (pos) =>
    {
        return this.pos[0] === pos[0] && this.pos[1] === pos[1];
    }

    getOpen = () =>
    {
        let result = null;
        let result_step = null;
        this.next.forEach((i, i_idx) =>
        {
            i.forEach((j, j_idx) =>
            {
                if (result === null || j.open)
                {
                    result = [i_idx, j_idx];
                    result_step = j;
                }
            });
        });

        if (result_step !== null)
            result_step.setOpen(true);
        return result;
    }

    gotoOpen = () =>
    {
        const pos = this.getOpen();
        return pos !== null ? this.next[pos[0]][pos[1]] : null;
    }

    setOpen = (is_open) =>
    {
        this.open = is_open;
        // set all prev next to open := false
    }

    getNextStep = (id) =>
    {
        let result = null;
        this.next.forEach((i, i_idx) =>
        {
            i.forEach((j, j_idx) =>
            {
                if (j.id === id)
                {
                    result = [i_idx, j_idx];
                    return true;
                }
            });
        });

        return result;
    }

    getOpenAtOffset = (off) =>
    {
        let c_step = this;
        let pos = 0;
        let t_step = null;
        while (c_step !== null && c_step !== undefined && pos !== off)
        {
            t_step = c_step;
            c_step = c_step.gotoOpen();
            pos++;
        }

        return c_step === null || c_step === undefined ? t_step : c_step;
    }

    getOpenPath = (dest) =>
    {
        let path = [];

        let c_step = this;
        let pos = 0;
        while (c_step !== null && c_step !== undefined && pos !== dest)
        {
            path.push(c_step.pos);
            c_step = this.gotoOpen();
            pos++;
        }

        return path;
    }

    getStepFromPath = (path) =>
    {

    }

    getPath = () =>
    {
        let path = [];

        let c_step = this;
        while (c_step !== null && c_step !== undefined)
        {
            path.push(c_step.pos);
            c_step = c_step.prev;
        }

        return path;
    }

    gotoNext = () =>
    {

    }

    objectify = () =>
    {
        let result = {
            block: this.block.name,
            open: this.open,
            next: []
        };

        this.next.forEach((i, idx) =>
        {
            result.next.push([]);
            i.forEach((j) =>
            {
                result.next[idx].push(j.objectify());
            });
        });

        return result;
    }

}

export default BranchStep;