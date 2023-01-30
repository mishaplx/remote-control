import { WebSocketServer } from 'ws'
import { MouseClass, providerRegistry } from '@nut-tree/nut-js'

import { MESSAGE_RESP } from './Type/type.js'
import mousePos from './tools/mousePos.js'
import 'dotenv/config'
import mouseModule from './tools/mouse.js'
import square from './tools/square.js'
import circle from './tools/circle.js'
import rectangle from './tools/rectungle.js'
import screenMain from './tools/screen.js'

const wss = new WebSocketServer({ port: Number(process.env.PORT) })

const mouseClass = new MouseClass(providerRegistry)
wss.on('connection', onConnection)
function onConnection(ws) {
    console.log('Новый пользователь')
    ws.on('message', async function message(data) {
        const message: string = data.toString().split(' ')

        if (message.includes(MESSAGE_RESP.MOUSE_POSITION)) {
            mousePos(ws, mouseClass)
        }
        if (message.includes(MESSAGE_RESP.MOUSE_RIGTH)) {
            await mouseModule.mouseNavigationRigth(mouseClass, message[1])
            return ws.send(JSON.stringify(MESSAGE_RESP.MOUSE_RIGTH))
        }
        if (message.includes(MESSAGE_RESP.MOUSE_UP)) {
            await mouseModule.mouseNavigationUP(mouseClass, message[1])
            return ws.send(JSON.stringify(MESSAGE_RESP.MOUSE_UP))
        }
        if (message.includes(MESSAGE_RESP.MOUSE_LEFT)) {
            await mouseModule.mouseNavigationLeft(mouseClass, message[1])
            return ws.send(JSON.stringify(MESSAGE_RESP.MOUSE_LEFT))
        }
        if (message.includes(MESSAGE_RESP.MOUSE_DOWN)) {
            await mouseModule.mouseNavigationDown(mouseClass, message[1])
            return ws.send(JSON.stringify(MESSAGE_RESP.MOUSE_DOWN))
        }
        if (message.includes(MESSAGE_RESP.DRAW_SQUARE)) {
            await square(mouseClass, message[1])
            return ws.send(JSON.stringify(MESSAGE_RESP.DRAW_RECTANGLE))
        }

        if (message.includes(MESSAGE_RESP.DRAW_RECTANGLE)) {
            await rectangle(mouseClass, message[1], message[2])
            return ws.send(JSON.stringify(MESSAGE_RESP.DRAW_RECTANGLE))
        }

        if (message.includes(MESSAGE_RESP.DRAW_CIRCLE)) {
            await circle(mouseClass, message[1])
            return ws.send(JSON.stringify(MESSAGE_RESP.DRAW_CIRCLE))
        }

        if (message.includes(MESSAGE_RESP.PRINT_SCRN)) {
            await screenMain(ws)
            return ws.send(JSON.stringify(MESSAGE_RESP.PRINT_SCRN))
        }
    })
    ws.on('close', function () {
        // отправка уведомления в консоль
        console.log('Пользователь отключился')
    })
}

console.log(`app start!, localhost:${process.env.PORT}`)
