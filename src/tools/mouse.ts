
const mouseNavigationUP  = async (mouseClass,value)=> {
  console.log('mouseNavigationUP');
        const pointY = Number(value)
        const point = await mouseClass.getPosition()
        const newPoint = {
            x: point.x,
            y: point.y-pointY
        }
        await mouseClass.move([point, newPoint])
}

const mouseNavigationDown  = async (mouseClass,value)=> {
  console.log('mouseNavigationDown');
      const pointY = Number(value)

      const point = await mouseClass.getPosition()
      const newPoint = {
          x: point.x,
          y: point.y+pointY
      }
      await mouseClass.move([point, newPoint])
}
const mouseNavigationLeft  = async (mouseClass,value)=> {
  console.log('mouseNavigationLeft');
  const pointX = Number(value)
  console.log(pointX,'left');
  const point = await mouseClass.getPosition()
  const newPoint = {
    x: point.x - pointX,
    y: point.y
  }
  await mouseClass.move([point, newPoint])
}

const mouseNavigationRigth = async (mouseClass,value)=> {
  console.log('mouseNavigationRigth');
  const pointX = Number(value)

  const point = await mouseClass.getPosition()
  const newPoint = {
     x: point.x+pointX,
     y: point.y
  }
  await mouseClass.move([point, newPoint])
}
export default {mouseNavigationUP,mouseNavigationDown,mouseNavigationLeft,mouseNavigationRigth}
