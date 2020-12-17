import Server from '@ioc:Adonis/Core/Server'
import noteService from 'App/Services/Note'
import { ChangedContentDto, CreateCategoryDto, DestroyCategoryDto } from 'App/common/types'

import { Server as SocketIO, Socket } from 'socket.io'

class Ws {
  public io: SocketIO

  public start() {
    this.io = new SocketIO(Server.instance!)
    this.io.on('connection', async (socket: Socket) => {
      await this.init(socket)
    })
  }

  private async init(socket: Socket) {
    await this.emitNotes(socket)

    socket.on('changed-content', async (payload: ChangedContentDto) => {
      await noteService.updateOrCreate(payload)
      socket.emit('updated-content')
    })

    socket.on('create-category', async (payload: CreateCategoryDto) => {
      const createdCategory = await noteService.create(payload.category)
      socket.emit('created-category', createdCategory)
    })

    socket.on('destroy-category', async (payload: DestroyCategoryDto) => {
      console.log('destroying')
      await noteService.destroy(payload.id)
      socket.emit('destroyed-category')
    })
  }

  private async emitNotes(socket: Socket) {
    const notes = await noteService.all()
    socket.emit('notes', notes)
  }
}

export default new Ws()
