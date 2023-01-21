export default async function circle(mouseClass, radius) {
    const mousePos = await mouseClass.getPosition()

    const newopos = {
        x: mousePos.x + Number(radius),
        y: mousePos.y,
    }
    console.log(newopos)
    console.log(radius)
    for (let i = 0; i <= Math.PI * 2; i += 0.1) {
        const point = {
            x: newopos.x + radius * Math.cos(i),
            y: newopos.y + radius * Math.sin(i),
        }
        await mouseClass.drag([point])
    }
}
