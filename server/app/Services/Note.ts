import Note from 'App/Models/Note'
import { ChangedContentDto } from 'App/common/types'

class NoteService {
  public async all() {
    return Note.all()
  }

  public async updateOrCreate({ category, content }: ChangedContentDto) {
    console.log('received', { category, content })
    await Note.updateOrCreate({ category: category }, { content })
  }

  public async create(category) {
    return Note.create({ category, content: '' })
  }

  public async destroy(id: number) {
    const note = await Note.find(id)
    note?.delete()
  }
}

export default new NoteService()
