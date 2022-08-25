const { createInterface } = require('readline');
const { validate } = require('./validations')
let { 
    workMovement,
    workCordinates,
    workDirections, 
    probes, 
    highlandSize, 
    probesMoved 
} = require('./functions')

// L R 90 graus.
// M Mover a sonda.
// P Aciona a camera.

// Adicionar linhas de entrada para tamanho do planalto [X]
    // Garantir que seja recebido apenas numeros inteiros [X] 
// Adicionar cordenadas atuais da sonda [X]
    // Garantir que as entradas sejam inteiros positivos [X]
    // Garantir que a direção seja apenas (N S W E) [X]
// Criar instruções de movimento para sonda [X]
    // Garantir que os movimentos da sonda recebidos sejam (M R L P) [X]
// Adicionar linhas de entrada para adicionar mais sondas [X]
// Garantir que as instruções de movimento sejam criadas apenas após que todas as sondas sejam adicionadas []
// Criar uma linha de instruções de movimento para cada sonda [X] 

const readLine = createInterface({
    input:process.stdin,
    output:process.stdout
})

const questions = {

    0: () => readLine.question("Defina o tamanho do eixo x do planalto: ", answer => {
        if(validate('highland',answer)){
            questions[0]()
            return;
        }
        highlandSize.x = answer
        questions[1]()
    }),
    
    1: () => readLine.question("Defina o tamanho do eixo y do planalto: ", answer => {
        if(validate('highland',answer)){
            questions[1]()
            return;
        }
        highlandSize.y = answer
        questions[2]()
    }),

    2: () => readLine.question(`Defina as cordenadas da sonda ex(22N): `, answer => {
        if(validate('cordinates',answer)){
            questions[2]() 
            return;
        }
        workCordinates({ 
            x: answer[0],
            y: answer[1],
            d: answer[2] 
        })

        questions[4]()
    }),

    3: () => readLine.question(`Defina as instruções da sonda ${probesMoved + 1}: `, answer => {    
        const actualIndex = probesMoved

        let instructions = {
            'M': () => workMovement(actualIndex),
            'P': () => {
                console.log('Fotografando area')
                setTimeout(() => {
                    console.log('Fotografado!')
                },500 
            )},
            'L': () => workDirections('L',actualIndex),
            'R': () => workDirections('R',actualIndex)
        }

        for(const instruction of answer){
            if(validate('instructions',instruction)){
                questions[3]()
                return;
            }
            instructions[instruction]()
        }

        probesMoved++
        console.log(probes)
        probesMoved > probes.length - 1 ? readLine.close() : questions[3]()
    }),

    4: () => readLine.question("Inserir mais uma sonda? s = (sim) n = (não): ", answer => {
        answer === 's' ? questions[2]() : questions[3]();
    })
}

questions[0]()


