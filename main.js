const { createInterface } = require('readline');
// import {workMovement} from './functions'


let probes = [];
let probesMoved = 0;
let highlandSize = { x:0, y: 0 }


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
// Criar uma linha de instruções de movimento para cada sonda [] 

function workMovement(index) {
    let movement = {
        'S': () => probes[index].y--,
        'W': () => probes[index].x--,
        'E': () => probes[index].x++,
        'N': () => probes[index].y++
    }
    movement[probes[index].d]()
}

function workDirections(inputDirection,index) {

    if(inputDirection === 'L'){
        let changedDirection = {
            'S':'E',
            'E':'N',
            'N':'W',
            'W':'S'
        }
        probes[index].d = changedDirection[probes[index].d];
    }

    if(inputDirection === 'R'){
        let changedDirection = {
            'S':'W',
            'W':'N',
            'N':'E',
            'E':'S'
        }
        probes[index].d = changedDirection[probes[index].d];
    }
}

function workCordinates({ x, y, d }) {
    // if(x > highlandSize.x || x - 0) return;
    // if(y > highlandSize.y || y - 0) return;
    
    probes.push({ x, y, d})
    console.log(probes)
}

const readLine = createInterface({
    input:process.stdin,
    output:process.stdout
})

const questions = {

    0: () => readLine.question("Defina o tamanho do eixo x do planalto: ", answer => {
        if(answer < 0 || !Number(answer)){
            console.log('Entrada inválida, digite novamente!')
            questions[0]()
        }
        highlandSize.x = answer
        questions[1]()
    }),
    
    1: () => readLine.question("Defina o tamanho do eixo y do planalto: ", answer => {
        if(answer < 0 || !Number(answer)){
            console.log('Entrada inválida, digite novamente!')
            questions[0]()
        }
        highlandSize.y = answer
        questions[2]()
    }),

    2: () => readLine.question(`Defina as cordenadas da sonda ex(22N): `, answer => {

        if(!Number(answer[0]) || !Number(answer[1])|| !['N','S','E','W'].includes(answer[2])){
            console.log('Entrada inválida, digite novamente!')
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

        let orders = {
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

        for(const order of answer){
            if(!['L','R','M','P'].includes(order)){
                console.log('Instruções invalidas, digite novamente!')
                questions[3]()
                return;
            }
            orders[order]()
        }

        probesMoved++
        probesMoved > probes.length - 1 ? readLine.close() : questions[3]()
    }),

    4: () => readLine.question("Inserir mais uma sonda? s = (sim) n = (não): ", answer => {
        answer === 's' ? questions[2]() : questions[3]();
    })
}

questions[0]()


