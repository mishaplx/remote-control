import fs from 'fs/promises'
import { join } from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import {
    ScreenClass,
    providerRegistry,
    FileType,
    MouseClass,
    Point,
    Region,
} from '@nut-tree/nut-js'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default async function screenMain(ws) {
    const screen = new ScreenClass(providerRegistry)
    const Mouse = new MouseClass(providerRegistry)
    const position: Point = await Mouse.getPosition()
    const folder = 'assets'
    const defaultSize = 300
    const sizePicture = {
        left: position.x,
        top: position.y,
        width: defaultSize,
        height: defaultSize,
    }
    const region = new Region(
        sizePicture.left - 100,
        sizePicture.top - 100,
        sizePicture.width,
        sizePicture.height
    )
    const path = join(__dirname, folder)

    try {
        const dir = await fs.readdir(join(__dirname, folder))
        if (dir.length !== 0) {
            for (const name of dir) {
                await fs.unlink(join(__dirname, folder, name))
            }
        }
        await screen.captureRegion('image.png', region, FileType.PNG, path)
        const image = await fs.readFile(join(path, 'image.png'))
        let buf = image.toString('base64')
        ws.send(`prnt_scrn ${buf}`)
    } catch (e) {
        console.log(e)
    }
}
