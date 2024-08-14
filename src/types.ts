export interface Question {
  id: number,
  question: string,
  options: string[],
  answer: string,
  images: boolean;
  questionImage?: string;
}