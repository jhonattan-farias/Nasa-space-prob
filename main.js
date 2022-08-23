const { createInterface } = require('readline');


let cordinates = { x: 0, y: 0, d:'N' };
let highlandSize = { x:0, y: 0 }


// L R 90 graus.
// M Mover a sonda.
// P Aciona a camera.

// adicionar linhas de entrada para tamanho do planalto [X]
// adicionar a direção que a sonda esta apontada [X]
// adicionar posição atual da sonda [X]
// adicionar um movimento a sonda [X]
// adicionar linhas de entrada para adicionar mais sondas []

function workMovement() {

    let movement = {
        'S': () => cordinates.y--,
        'W': () => cordinates.x--,
        'E': () => cordinates.x++,
        'N': () => cordinates.y++
    }

    movement[cordinates.d]()
    console.log(cordinates)
}

function workDirections(inputDirection) {

    if(inputDirection === 'L'){
        let changedDirection = {
            'S':'E',
            'E':'N',
            'N':'W',
            'W':'S'
        }
        cordinates.d = changedDirection[inputDirection];
    }

    if(inputDirection === 'R'){
        let changedDirection = {
            'S':'W',
            'W':'N',
            'N':'E',
            'E':'S'
        }
        cordinates.d = changedDirection[inputDirection];
    }
}

function workCordinates({ x, y, d }) {
    // if(x > highlandSize.x || x - 0) return;
    // if(y > highlandSize.y || y - 0) return;
    
    cordinates.x = Number(x) + cordinates.x;
    cordinates.y = Number(y) + cordinates.y;
    cordinates.d = d;
}

const readLine = createInterface({
    input:process.stdin,
    output:process.stdout
})

const questions = {
    0: () => readLine.question("Defina o tamanho do eixo x do planalto: ", answer => {
        highlandSize.x = answer;
        questions[1]()
    }),
    
    1: () => readLine.question("Defina o tamanho do y do planalto: ", answer => {
        highlandSize.y = answer;
        questions[2]()
    }),

    2: () => readLine.question("Defina as cordenadas da sonda: ", answer => {
        workCordinates({ 
            x: answer[0],
            y: answer[1],
            d: answer[2] 
        })
        questions[3]()
    }),

    3: () => readLine.question("Defina o movimento da sonda: ", answer => {
            workMovement()
    })
}

questions[0]()


