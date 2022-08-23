const { createInterface } = require('readline');


let cordinates = { x: 0, y: 0, d:'N' };
let highlandSize = { x:0, y: 0 }


// L R 90 graus.
// M Mover a sonda.
// P Aciona a camera.

// adicionar a direção que a sonda esta apontada [X]
// adicionar posição atual da sonda [X]
// adicionar um movimento a sonda []
// adicionar linhas de entrada para tamanho do planalto []
// adicionar linhas de entrada para adicionar mais sondas []


function workDirections(inputDirection) {

    if(inputDirection === 'L'){
        let changedDirection = {
            'S':'E',
            'E':'N',
            'N':'W',
            'W':'S'
        }
        return changedDirection[cordinates.d];
    }

    if(inputDirection === 'R'){
        let changedDirection = {
            'S':'W',
            'W':'N',
            'N':'E',
            'E':'S'
        }
        return changedDirection[cordinates.d];
    }
}

function workCordinates({ x, y, d }) {
    // if(x > highlandSize.x || x - 0) return;
    // if(y > highlandSize.y || y - 0) return;

    const newX = Number(x) + cordinates.x;
    const newY = Number(y) + cordinates.y;
    const newD = d;
    console.log(newX,newY,newD)
    cordinates.x = newX;
    cordinates.y = newY;
    cordinates.d = newD;
}

const readLine = createInterface({
    input:process.stdin,
    output:process.stdout
})

const questions = {
    0 :() => readLine.question("Defina o tamanho do eixo x do planalto: ", answer => {
        highlandSize.x = answer;
        questions[1]()
    }),
    
    1 :() => readLine.question("Defina o tamanho do y do planalto: ", answer => {
        highlandSize.y = answer;
        questions[2]()
    }),

    2 :() => readLine.question("Insira as cordenadas: ", answer => {
        workCordinates({ 
            x: answer[0],
            y: answer[1],
            d: answer[2] 
        })
    
        console.log(cordinates)
        readLine.close()
    })
}

questions[0]()


