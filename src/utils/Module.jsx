class Module
{
    global_vars = {}

    constructor(branches)
    {
        /*
         * TODO:
         * Add preset compositions in call func
         * link to onTick, onNewBar, onStopLoss etc. calls
         */
    }

    createComp = (comp, branch) =>
    {
        branch.forEach(i => 
        {
            comp.push([i.function, i.args]); // TODO
        });
    }

    onLoop = []

    onTick = []

    onNewBar = []

    onTrade = []

    onStopLoss = []

    onTakeProfit = []

    getGlobalVar = (key) =>
    {
        return this.global_vars[key]
    }

    setGlobalVar = (key, value) =>
    {
        this.global_vars[key] = value;
    }
}

export default Module;