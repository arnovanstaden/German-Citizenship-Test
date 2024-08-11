export interface Question {
  id: number,
  question: string,
  options: {
    a: string,
    b: string,
    c: string,
    d: string
  },
  answer: 'a' | 'b' | 'c' | 'd',
  images: false
}