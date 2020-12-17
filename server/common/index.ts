export enum Events {
  getNotes = 'getNotes',
  changedContent = 'changedContent',
  updatedContent = 'updatedContent',
  createCategory = 'createCategory',
  createdCategory = 'createdCategory',
  destroyCategory = 'destroyCategory',
  destroyedCategory = 'destroyedCategory',
}

export interface ChangedContentDto {
  id: number
  category: string
  content: string
}

export interface CreateCategoryDto {
  category: string
}

export interface DestroyCategoryDto {
  id: number
}
