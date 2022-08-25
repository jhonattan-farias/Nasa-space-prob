

function validate(type,answer) {
    const validations = {
       
        highland: function() {
        if(answer < 0 || !Number(answer)){
            console.log('Entrada inválida, digite novamente!')
            return true;
        }
        return false;
        },
        
        cordinates: function() {
            if(!Number(answer[0]) || !Number(answer[1])|| !['N','S','E','W'].includes(answer[2])){
                console.log('Entrada inválida, digite novamente!')
                return true;
            }
            return false;
        },

        instructions: function() {
            if(!['L','R','M','P'].includes(answer)){
                console.log('Instruções invalidas, digite novamente!')
                return true;
            }
            return false;
        }
    }
    return validations[type]()
}

module.exports = {
    validate,
}