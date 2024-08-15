export interface Question {
  /**
   * The id of the question
   */
  id: number,
  /**
   * The question to be asked
   */
  question: string,
  /*
  * The options to choose from
  */
  options: string[],
  /**
   * The asnwer to the question
   */
  answer: string,
  /**
   * Whether the options refer to images
   */
  images: boolean;
  /*
 * Whether the question refers to an image
  */
  questionImage?: boolean;
}

export interface QuizSettings {
  /**
   * The number of questions to ask
   */
  questionCount: number,
}