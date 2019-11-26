import BlockType from '../components/PlanBuilder';

class SubBranch
{
    order = 0;
    open = false;

    steps = [];
    next = [];

    prev = null;

    constructor(order, prev)
    {
        this.order = order;
        this.prev = prev;
    }

    addStep = (pos, block) =>
    {
        if (block.type === BlockType.QUESTION)
        {
            // const open_result = this.getOpenSub();
            // const open_array = open_result[1];

            const sub_one = this.createSub(
                0,
                this.steps.slice(pos, this.steps.length), 
                this.next
            );

            const sub_two = this.createSub(
                1,
                [], 
                []
            );

            this.steps = this.steps.slice(0, pos);
            this.steps.push(block);

            this.next = [[sub_one], [sub_two]];
        }
        else
        {
            this.steps.splice(pos, 0, block);
        }
    }

    changeStep = (pos, block) =>
    {
        const c_block = this.steps[pos];

        if (c_block.type === block.type)
        {
            this.steps[pos] = block;
        }
        else
        {
            this.removeStep(pos);
            this.addStep(pos, block);
        }
    }

    removeStep = (pos) =>
    {
        const block = this.steps[pos];

        if (block.type === BlockType.QUESTION)
        {
            const open_result = this.getOpenSub();
            const open_array = open_result[1];

            this.steps.splice(pos, 1)

            if (open_array !== null)
            {
                this.steps.push(this.next[0][0].steps);
                this.next[0] = this.next[0][0].next;
            }
        }
        else
        {
            return this.steps.splice(pos, 1);
        }
    }

    createSub = (order, steps, next) =>
    {
        let t_sub = new SubBranch(order, this);
        t_sub.setSteps(steps);
        t_sub.setNext(next);

        return t_sub;
    }

    getOpenSub()
    {
        let open_sub = null;
        let open_array = null;
        this.next.forEach((i) =>
        {
            i.forEach((j) =>
            {
                if (j.open || open_sub === null)
                {
                    open_sub = j;
                    open_array = i;
                }
            })
        });

        open_sub.open = true;
        return [open_sub, open_array];
    }

    // getNextSub()
    // {
    //     let next_sub = null;
    //     this.next.forEach((i) =>
    //     {
    //         i.forEach((j) =>
    //         {
    //             if (j.open || next_sub === null)
    //             {
    //                 next_sub = j;
    //             }
    //         })
    //     });

    //     next_sub.open = true;
    //     return next_sub;
    // }

    setOrder = (order) =>
    {
        this.order = order;
    }

    setSteps = (steps) =>
    {
        this.steps = steps;
    }

    setOpen = (open) =>
    {
        this.open = open;
    }
}

export default SubBranch;