import Module from './Module';

class Branch
{
    next = [];
    opened = 0;
    selected = false;

    constructor(block, prev, pos)
    {
        this.block = block;
        this.prev = prev;

        if (pos === undefined)
            this.pos = 0;
        else
            this.pos = pos;

        // this.runBacktest();
    }

    add = (block) =>
    {
        if (this.next.length < this.block.result.length)
        {
            const new_step = new Branch(
                block, this, this.next.length
            );
            this.next.push(new_step);
    
            return new_step;
        }

        return null;
    }

    insertAbove = (block) =>
    {

    }

    insertBelow = (block) =>
    {

    }

    delete = () =>
    {
        const step = this.getOpen();
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
    
    open = (pos) =>
    {
        if (pos < this.block.result.length)
        {
            this.opened = pos;
        }
    }
    
    toggleOpen = () =>
    {
        this.open((this.opened + 1) % this.block.result.length);
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
        return this.opened > this.next.length - 1 ? null : this.next[this.opened];
    }

    gotoOpen = () =>
    {
        return this.getOpen();
    }

    setOpen = () =>
    {
        this.prev.opened = this.pos;
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

    getSize = () =>
    {
        let count = 0;
        let c_step = this;
        while (c_step !== null && c_step !== undefined)
        {
            count++;
            c_step = c_step.gotoOpen();
        }

        return count;
    }

    objectify = () =>
    {
        let result = {
            block: this.block.name,
            opened: this.opened,
            next: []
        };

        this.next.forEach(i =>
        {
            result.next.push(i.objectify());
        });

        return result;
    }

    getModuleComponent = () =>
    {
        return {
            fn: this.block.name,
            args: this.block.args
        };
    }

    runBacktest = () =>
    {
        const mod = new Module(this.objectify());
    }

    save = () =>
    {

    }

}

export default Branch;