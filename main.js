const { createInterface } = require('readline');
const { validate } = require('./validations')
let { 
    workMovement,
    workCordinates,
    workDirections, 
    probes, 
    highlandSize, 
    movedProbs 
} = require('./functions')

const readLine = createInterface({
    input:process.stdin,
    output:process.stdout
})

const questions = {

    0: () => readLine.question("Defina o tamanho do eixo x do planalto: ", answer => {
        const { highland } = validate()
        if(highland(answer)){
            questions[0]()
            return;
        }
        highlandSize.x = Number(answer)
        questions[1]()
    }),
    
    1: () => readLine.question("Defina o tamanho do eixo y do planalto: ", answer => {
        const { highland } = validate()
        if(highland(answer)){
            questions[1]()
            return;
        }
        highlandSize.y = Number(answer)
        questions[2]()
    }),

    2: () => readLine.question(`Defina as cordenadas da sonda ex(22N): `, answer => {
        const { cordinates } = validate()
        if(cordinates(answer)){
            questions[2]() 
            return;
        }
        workCordinates({ 
            x: Number(answer[0]),
            y: Number(answer[1]),
            d: answer[2] 
        })
        questions[4]()
    }),

    3: () => readLine.question(`Defina as instruções da sonda ${movedProbs + 1}: `, answer => {   
        const { instructions, movement } = validate()

        const probeInstructions = {
            'M': () => workMovement(movedProbs),
            'P': () => console.log('Área fotografada!'),
            'L': () => workDirections('L',movedProbs),
            'R': () => workDirections('R',movedProbs)
        }

        for(const instruction of answer){
            if(instructions(instruction)){
                questions[3]()
                return;
            }

            if(instruction === 'M' && movement(movedProbs)){
                questions[3]()
                return;
            }
            
            probeInstructions[instruction]()
        }

        movedProbs++

        if(movedProbs > probes.length - 1){
            const { x, y, d } = probes[movedProbs - 1]
            console.log(`${x} ${y} ${d}`)
            readLine.close()  
            return;
        }
        questions[3]()
    }),

    4: () => readLine.question("Inserir mais uma sonda? s = (sim) n = (não): ", answer => {
        answer === 's' ? questions[2]() : questions[3]();
    })
}

questions[0]()


