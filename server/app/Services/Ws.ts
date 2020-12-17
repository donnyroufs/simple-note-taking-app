import Server from '@ioc:Adonis/Core/Server'
import noteService from 'App/Services/Note'
import { ChangedContentDto, CreateCategoryDto, DestroyCategoryDto, Events } from 'Common/index'

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

    socket.on(Events.changedContent, async (payload: ChangedContentDto) => {
      await noteService.updateOrCreate(payload)
      socket.emit(Events.updatedContent)
    })

    socket.on(Events.createCategory, async (payload: CreateCategoryDto) => {
      const createdCategory = await noteService.create(payload.category)
      socket.emit(Events.createdCategory, createdCategory)
    })

    socket.on(Events.destroyCategory, async (payload: DestroyCategoryDto) => {
      await noteService.destroy(payload.id)
      socket.emit(Events.destroyedCategory)
    })
  }

  private async emitNotes(socket: Socket) {
    const notes = await noteService.all()
    socket.emit(Events.getNotes, notes)
  }
}

export default new Ws()
