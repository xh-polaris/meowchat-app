export interface Reply{
    id: string
    profile: string
    time: string
    text: string
    likes: number
}

export interface Comment{
    id: string
    profile: string
    time: string
    text: string
    likes: number
    reply: Reply[]
}

export interface Post{
    id: string
    profile: string
    time: string
    text: string
    images: string[]
    likes: number
}