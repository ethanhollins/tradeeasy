class Branch
{
    next = [];
    open = false;
    selected = false;

    constructor(block, prev, pos)
    {
        this.block = block;
        this.prev = prev;

        if (pos === undefined)
            this.pos = 0;
        else
            this.pos = pos;
    }

    add = (block) =>
    {
        const new_step = new Branch(
            block, this, this.next.length
        );
        this.next.push(new_step);

        return new_step;
    }

    delete = () =>
    {
        const open_pos = this.getOpen();
        const step = open_pos === null ? null : this.next[open_pos];
        this.prev.replaceStep(step, this.pos);
        return this;
    }

    change = (block) =>
    {
        let result = [];

        for (let i=0; i<block.result.length; i++)
        {
            if (i < this.next.length)
                result.push(this.next[i]);
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
            this.next.splice(pos, pos+1);
        else
        {
            step.pos = pos;
            this.next[pos] = step;
        }
    }

    isPos = (pos) =>
    {
        return this.pos === pos;
    }

    getOpen = () =>
    {
        let result = null;
        let result_step = null;
        this.next.forEach((i, i_idx) =>
        {
            if (result === null || i.open)
            {
                result = i_idx;
                result_step = i;
            }
        });

        if (result_step !== null)
            result_step.setOpen();
        return result;
    }

    gotoOpen = () =>
    {
        const pos = this.getOpen();
        return pos !== null ? this.next[pos] : null;
    }

    setOpen = () =>
    {
        this.prev.next.forEach(i =>
        {
            if (i.pos === this.pos)
                this.open = true;
            else
                i.open = false;

        });
        // set all prev next to open := false
    }

    setSelected = () =>
    {
        this.selected = !this.selected;

        let c_step = this.gotoOpen();
        while (c_step !== null && c_step !== undefined)
        {
            c_step.selected = false;
            c_step = c_step.gotoOpen();
        }

        c_step = this.prev;
        while (c_step !== null && c_step !== undefined)
        {
            c_step.selected = false;
            c_step = c_step.prev;
        }

    }

    // getNextStep = (id) =>
    // {
    //     let result = null;
    //     this.next.forEach((i, i_idx) =>
    //     {
    //         i.forEach((j, j_idx) =>
    //         {
    //             if (j.id === id)
    //             {
    //                 result = [i_idx, j_idx];
    //                 return true;
    //             }
    //         });
    //     });

    //     return result;
    // }

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

        this.next.forEach(i =>
        {
            result.next.push(i.objectify());
        });

        return result;
    }

}

export default Branch;