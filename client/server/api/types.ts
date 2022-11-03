// client/server/api/types.ts
export type Tag = {
  id: string
  name: string
}

export type Post = {
  id: string
  title: string
  publishedAt: string
  tag: Array<Tag>
  text: string
}
