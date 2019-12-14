class Module
{
    global_vars = {}

    constructor()
    {
        /*
         * TODO:
         * Add preset compositions in call func
         * link to onTick, onNewBar, onStopLoss etc. calls
         */
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