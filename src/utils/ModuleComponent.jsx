class ModuleComponent
{
    member_vars = {}
    comp = []

    constructor()
    {
        /*
         * TODO:
         * Pass branch objects
         * Retrieve their functions and add to comp
         * reset member vars on run
         * add run/call function
         * add reference to main module for global vars
         * 
         */
    }

    getVar = (key) =>
    {
        return this.member_vars[key]
    }

    setVar = (key, value) =>
    {
        this.member_vars[key] = value;
    }
}

export default ModuleComponent;