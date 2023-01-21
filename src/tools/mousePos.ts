
export default function mousePos(ws,mouseClass) {
    console.log('mousePos');
    mouseClass.getPosition().then((r) => {
        console.log(r)
        ws.send(JSON.stringify(r))
    })
}
