const { createInterface } = require('readline');


let cordinates = [];
let highlandSize = { x:0, y: 0 }


// L R 90 graus.
// M Mover a sonda.
// P Aciona a camera.

// adicionar linhas de entrada para tamanho do planalto [X]
// adicionar a direção que a sonda esta apontada [X]
// adicionar posição atual da sonda [X]
// adicionar um movimento a sonda [X]
// adicionar linhas de entrada para adicionar mais sondas [X]

function workMovement(index) {
    let movement = {
        'S': () => cordinates[index].y--,
        'W': () => cordinates[index].x--,
        'E': () => cordinates[index].x++,
        'N': () => cordinates[index].y++
    }

    movement[cordinates[index].d]()
    console.log(cordinates[index])
}

function workDirections(inputDirection,index) {

    if(inputDirection === 'L'){
        let changedDirection = {
            'S':'E',
            'E':'N',
            'N':'W',
            'W':'S'
        }
        cordinates[index].d = changedDirection[inputDirection];
    }

    if(inputDirection === 'R'){
        let changedDirection = {
            'S':'W',
            'W':'N',
            'N':'E',
            'E':'S'
        }
        cordinates[index].d = changedDirection[inputDirection];
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
        highlandSize.x = answer
        questions[1]()
    }),
    
    1: () => readLine.question("Defina o tamanho do eixo y do planalto: ", answer => {
        highlandSize.y = answer
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
        const actualIndex = cordinates.length - 1
        if(answer.includes(!'M' || !'P' || !'L' || !'R')) return;

        answer.forEach(order => {
            
            if(order === 'M'){
                workMovement(actualIndex)
            }

        } )
            
        questions[4]()
    }),

    4: () => readLine.question("Inserir mais uma sonda? s = (sim) n = (não): ", answer => {
        answer === 's' ? questions[2]() : readLine.close();
    })
}

questions[0]()


