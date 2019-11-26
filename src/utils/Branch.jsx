import BranchStep from './BranchStep';

class Branch
{
    start = [];

    constructor(name)
    {
        this.name = name;
    }

    addStep = (pos, block) =>
    {
        if (this.start.length === 0)
        {
            this.start.push([new BranchStep(block, null)]);
        }
        else
        {
            if (pos < 0)
            {
                const pos = this.getOpen();

                this.start[pos[0]].push([new BranchStep(block, null)]);
            }
            else
            {
                const step = this.getOpenStepByPos(pos);
    
                if (step !== null)
                    step.add(block)
            }
        }
    }

    addSub = (pos, block) =>
    {
        if (this.start === null)
        {
            this.start = new BranchStep(block, null);
        }
        else
        {
            
            if (pos < 0)
            {
                this.start.push([new BranchStep(block, null)]);
            }
            else
            {
                const step = this.getOpenStepByPos(pos);
    
                if (step !== null)
                    step.add(block)
            }
        }
    }

    deleteStep = (pos) =>
    {
        if (pos < 0)
        {

        }
        else
        {
            const step = this.getOpenStepByPos(pos);
            
            if (step !== null)
                step.delete()
        }
    }

    changeStep = (pos, block) =>
    {
        const step = this.getOpenStepByPos(pos);

        if (step !== null)
            step.change(block)
    }


    getOpenStepByPos = (pos) =>
    {
        if (this.start !== null)
        {
            let c_pos = 0;
            let open_pos = this.getOpen();
            let c_step = this.start[open_pos[0]][open_pos[1]];
            while (c_pos !== pos)
            {
                let t_step = c_step.gotoOpen();
                if (t_step === null || t_step === undefined) return c_step;
                
                c_step = t_step;
                c_pos += 1;
            }

            return c_step;
        }
        else return null;
    }

    getOpen = () =>
    {
        let result = null;
        let result_step = null;
        this.start.forEach((i, i_idx) =>
        {
            i.forEach((j, j_idx) =>
            {
                if (result === null || j.open)
                {
                    result = [i_idx, j_idx];
                }
            });
        });

        if (result_step !== null)
            result_step.setOpen(true);
        return result;
    }

    stringify = () =>
    {

    }
}

export default Branch;
