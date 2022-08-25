export function workMovement(index) {
    let movement = {
        'S': () => probes[index].y--,
        'W': () => probes[index].x--,
        'E': () => probes[index].x++,
        'N': () => probes[index].y++
    }
    movement[probes[index].d]()
}