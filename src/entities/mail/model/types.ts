export interface BroadcastResponseDto {
  id: string
  subject: string
  body: string
  sentCount: number
  createdAt: string
}

export interface SendNewsletterDto {
  subject: string
  html: string
}
