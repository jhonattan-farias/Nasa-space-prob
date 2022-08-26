const { highlandSize, probes } = require('./functions')

function validate() {
    const {
        highland,
        cordinates,
        instructions,
        movement
    } = {
        highland: function(answer) {
            if(answer < 0 || !Number(answer)){
                console.log('Entrada inválida, digite novamente!')
                return true;
            }
            return false;
        },
        
        cordinates: function(answer) {
            if(     answer.length < 3
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
            const logError = () => console.log('A sonda não pode sair da área demarcada!')
            const movementValidations = {
                'N': () => {
                   if(probe.y + 1 > highlandSize.y){
                        logError()
                        return true;
                   } 
                },
                'S': () => {
                    if(probe.y - 1 < 0 ){
                        logError()
                        return true;
                    }
                },
                'W': () => {
                    if(probe.x - 1 < 0){
                        logError()
                        return true;
                    }
                },
                'E': () => {
                    if(probe.x + 1 > highlandSize.x){
                        logError()
                        return true;
                    }
                }

            }

            return movementValidations[probe.d]()
        }

    }
    return { highland, cordinates, instructions, movement }
}

module.exports = {
    validate,
}