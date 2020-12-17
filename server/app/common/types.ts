export enum Events {
  changedContent = 'changedContent',
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
