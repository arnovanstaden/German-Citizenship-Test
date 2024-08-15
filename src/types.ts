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
  /**
   * The progress of the quiz
   */
  progress: number,
  /**
   * The number of correct answers
   */
  correctAnswers: number,
  /**
   * The ids of the questions to be asked for this quiz round
   */
  sampleQuestionIds: number[];
  /**
   * The ids of the questions that have been asked
   */
  askedQuestions: number[];
  /**
   * The current question being asked
   */
  currentQuestion: number;
}