class Utilities
{
    constructor()
    {
        this.set.argtype = ['var', null];
        this.buy.argtype = [null];
        this.above.argtype = ['var', null];

    }

    /*
     * ACTION FUNCTIONS
     */

    set = {
        'fn': (a, b) =>
        {

        },
        'argtype': ['var', null],
        'type': BlockType.ACTION,
        'result': ['var']
    }

    buy = {
        'fn': (ticket) =>
        {
    
        },
        'argtype': ['var', null],
        'type': BlockType.ACTION,
        'result': ['var']
    }

    /*
     * QUESTION FUNCTIONS
     */

    above = {
        'fn': (a, b) =>
        {
    
        },
        'argtype': ['var', null],
        'type': BlockType.QUESTION,
        'result': ['var']
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

const BlockType = {
    ACTION: 1,
    QUESTION: 2
}

export default Utilities;