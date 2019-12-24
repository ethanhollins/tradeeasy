class Utilities
{
    constructor()
    {
        this.set.argtype = ['var', null];
        this.buy.argtype = ['var', null];
        this.above.argtype = ['var', null];

    }

    /*
     * ACTION FUNCTIONS
     */

    set = (a, b) =>
    {

    }

    buy = (ticket) =>
    {

    }

    /*
     * QUESTION FUNCTIONS
     */

    above = (a, b) =>
    {

    }

    /*
     * ARGUMENT OBJECTS
     */

    /*
     * GENERAL
     */

    typeOf = (obj) =>
    {
        const stringified = obj.toString();
        const type = stringified.split(' ')[1].slice(0, -1);
      
        return type.toLowerCase();
    }

}

export default Utilities;