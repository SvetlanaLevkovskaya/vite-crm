interface Thumbnails {
  avatar: string
  avatar_2x: string
  avatar_webp: string
  avatar_webp_2x: string
}

interface Designer {
  avatar: string
  username: string
  thumbnails: Thumbnails
}

export interface Comment {
  id: number
  issue: string
  designer: Designer
  date_created: string
  message: string
}
