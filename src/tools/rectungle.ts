export default async function rectangle(mouseClass, value_length,value_width){

    const length = Number(value_length)
    const width = Number(value_width)

    let point = await mouseClass.getPosition()
    point = {x: point.x + length,y: point.y }
    await mouseClass.drag([point])

    point = await mouseClass.getPosition()
    point = {x: point.x, y:point.y + width }
    await mouseClass.drag([point])


    point = await mouseClass.getPosition()
    point = {x: point.x - length, y:point.y }
    await mouseClass.drag([point])

    point = await mouseClass.getPosition()
    point = {x: point.x, y:point.y - width }
    await mouseClass.drag([point])
}