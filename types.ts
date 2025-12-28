
export interface TechProduct {
  id: number;
  productA: string;
  priceA: number;
  productB: string;
  priceB: number;
  correct: 'A' | 'B';
  reason: string;
}

export type GameScreen = 'START' | 'QUIZ' | 'FEEDBACK' | 'RESULT';

export interface GameState {
  screen: GameScreen;
  currentQuestionIndex: number;
  score: number;
  selectedQuestions: TechProduct[];
  lastResult: {
    correct: boolean;
    userChoice: 'A' | 'B' | null;
  } | null;
}
