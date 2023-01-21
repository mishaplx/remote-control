
export default async function square(mouseClass,value) {
    const width = Number(value)

    let point = await mouseClass.getPosition()
    point = {x: point.x + width,y: point.y }
    await mouseClass.drag([point])

    point = await mouseClass.getPosition()
    point = {x: point.x, y:point.y + width }
    await mouseClass.drag([point])


    point = await mouseClass.getPosition()
    point = {x: point.x - width, y:point.y }
    await mouseClass.drag([point])

    point = await mouseClass.getPosition()
    point = {x: point.x, y:point.y - width }
    await mouseClass.drag([point])
}
