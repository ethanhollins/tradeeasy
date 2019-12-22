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
        this.iterateBranches(branches);
    }

    onLoop = {}

    onTick = {}

    onNewBar = {}

    onTrade = {}

    onStopLoss = {}

    onTakeProfit = {}

    iterateBranches = (branches) =>
    {
        for (let name in branches)
        {
            this[name] = this.createComp(branches[name]);
        }
    }

    createComp = (branch) =>
    {
        let comp = branch.getModuleComponent();
        comp.next = [];

        branch.next.forEach(i =>
        {
            comp.next.push(this.createComp(i));
        });

        return comp;
    }
    
    runBacktest = (start, end) =>
    {
        
    }
    
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