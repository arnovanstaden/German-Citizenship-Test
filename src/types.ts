export interface Question {
  id: number,
  question: string,
  options: {
    a: string,
    b: string,
    c: string,
    d: string
  },
  answer: string,
  images: boolean
}