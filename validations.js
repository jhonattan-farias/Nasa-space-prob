const { highlandSize, probes } = require('./functions')

function validate() {
    const {
        highland,
        cordinates,
        instructions,
    } = {
       
        highland: function(answer) {
        if(answer < 0 || !Number(answer)){
            console.log('Entrada inválida, digite novamente!')
            return true;
        }
        return false;
        },
        
        cordinates: function(answer) {
            if(
                    answer.length < 3
                ||  Number(answer[1] > highlandSize.y)
                ||  Number(answer[0] > highlandSize.x)
                ||  Number(answer[0] < 0)
                ||  Number(answer[1] < 0)
                || !Number(answer[1])
                || !Number(answer[0]) 
                || !['N','S','E','W'].includes(answer[2])
            ){
                console.log('Entrada inválida, digite novamente!')
                return true;
            }
            return false;
        },

        instructions: function(answer) {
            if(!['L','R','M','P'].includes(answer)){
                console.log('Instruções invalidas, digite novamente!')
                return true;
            }
        },

        movement: function(index) {
            const probe = probes[index]
            if(
                   probe.x + 1 > highlandSize.x 
                || probe.x - 1 < 0
                || probe.y + 1 > highlandSize.y
                || probe.y - 1 < 0 
            ){
                console.log('The probe cannot go out of the demarked area')
                return true;
            }
            return false;
        }

    }
    return { highland, cordinates, instructions }
}

module.exports = {
    validate,
}