const { createInterface } = require('readline');


let cordinates = [];
let highlandSize = { x:0, y: 0 }


// L R 90 graus.
// M Mover a sonda.
// P Aciona a camera.

// adicionar linhas de entrada para tamanho do planalto [X]
    // garantir que seja recebido apenas numeros inteiros [X] 
// adicionar cordenadas atuais da sonda [X]
    // garantir que as entradas sejam inteiros positivos [X]
    // garantir que a direção seja apenas (N S W E) [X]
// adicionar um movimento a sonda [X]
    // garantir que os movimentos da sonda recebidos sejam (M R L P) [X]
// adicionar linhas de entrada para adicionar mais sondas [X]

function workMovement(index) {
    let movement = {
        'S': () => cordinates[index].y--,
        'W': () => cordinates[index].x--,
        'E': () => cordinates[index].x++,
        'N': () => cordinates[index].y++
    }
    movement[cordinates[index].d]()
}

function workDirections(inputDirection,index) {

    if(inputDirection === 'L'){
        let changedDirection = {
            'S':'E',
            'E':'N',
            'N':'W',
            'W':'S'
        }
        cordinates[index].d = changedDirection[cordinates[index].d];
    }

    if(inputDirection === 'R'){
        let changedDirection = {
            'S':'W',
            'W':'N',
            'N':'E',
            'E':'S'
        }
        cordinates[index].d = changedDirection[cordinates[index].d];
    }
}

function workCordinates({ x, y, d }) {
    // if(x > highlandSize.x || x - 0) return;
    // if(y > highlandSize.y || y - 0) return;
    
    cordinates.push({ x, y, d})
    console.log(cordinates)
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

    2: () => readLine.question("Defina as cordenadas da sonda ex(22N): ", answer => {

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

        questions[3]()
    }),

    3: () => readLine.question("Defina o movimento da sonda: ", answer => {    
        const actualIndex = cordinates.length - 1
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
            if(!['L','R','M','P'].includes(order)) return;
            orders[order]()
        }

        questions[4]()
    }),

    4: () => readLine.question("Inserir mais uma sonda? s = (sim) n = (não): ", answer => {
        answer === 's' ? questions[2]() : readLine.close();
    })
}

questions[0]()


