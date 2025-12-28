
import React, { useState, useEffect, useCallback } from 'react';
import { TechProduct, GameState } from './types';
import { TECH_DATA, GAME_QUESTION_COUNT, TIMER_DURATION } from './constants';
import { ScreenContainer, PrimaryButton, SecondaryButton } from './components/Layout';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    screen: 'START',
    currentQuestionIndex: 0,
    score: 0,
    selectedQuestions: [],
    lastResult: null,
  });

  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initGame = () => {
    const questions = shuffleArray(TECH_DATA).slice(0, GAME_QUESTION_COUNT);
    setGameState({
      screen: 'QUIZ',
      currentQuestionIndex: 0,
      score: 0,
      selectedQuestions: questions,
      lastResult: null,
    });
    setTimeLeft(TIMER_DURATION);
  };

  const handleChoice = useCallback((choice: 'A' | 'B' | null) => {
    const currentQuestion = gameState.selectedQuestions[gameState.currentQuestionIndex];
    const isCorrect = choice === currentQuestion.correct;

    setGameState(prev => ({
      ...prev,
      screen: 'FEEDBACK',
      score: isCorrect ? prev.score + 1 : prev.score,
      lastResult: {
        correct: isCorrect,
        userChoice: choice,
      }
    }));
  }, [gameState.selectedQuestions, gameState.currentQuestionIndex]);

  useEffect(() => {
    let timer: number;
    if (gameState.screen === 'QUIZ' && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft(prev => prev - 0.1);
      }, 100);
    } else if (gameState.screen === 'QUIZ' && timeLeft <= 0) {
      handleChoice(null);
    }
    return () => clearInterval(timer);
  }, [gameState.screen, timeLeft, handleChoice]);

  const nextQuestion = () => {
    if (gameState.currentQuestionIndex + 1 < GAME_QUESTION_COUNT) {
      setGameState(prev => ({
        ...prev,
        screen: 'QUIZ',
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        lastResult: null,
      }));
      setTimeLeft(TIMER_DURATION);
    } else {
      setGameState(prev => ({
        ...prev,
        screen: 'RESULT',
      }));
    }
  };

  const renderStart = () => (
    <div className="text-center">
      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-3xl">💡</span>
      </div>
      <h1 className="text-3xl font-bold mb-4 text-stone-800">
        数码产品价格猜猜看
      </h1>
      <p className="text-stone-500 mb-10 text-lg leading-relaxed">
        看看你对数码产品的市场行情了解多少？<br/>
        在两款产品中选出价格更高的一项。
      </p>
      <div className="flex flex-col items-center gap-4">
        <PrimaryButton onClick={initGame}>开始测验</PrimaryButton>
        <div className="text-sm text-stone-400 font-medium tracking-wide">
          共 3 道题 · 每题 10 秒
        </div>
      </div>
    </div>
  );

  const renderQuiz = () => {
    const question = gameState.selectedQuestions[gameState.currentQuestionIndex];
    const progress = (timeLeft / TIMER_DURATION) * 100;

    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-bold text-stone-400 uppercase tracking-wider">题目 {gameState.currentQuestionIndex + 1} / 3</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-amber-700">{Math.ceil(timeLeft)}s</span>
          </div>
        </div>

        <div className="mb-10 w-full bg-stone-100 h-2 rounded-full overflow-hidden">
          <div 
            className="h-full transition-all duration-100 ease-linear bg-amber-600" 
            style={{ width: `${progress}%` }}
          />
        </div>

        <h2 className="text-xl text-center mb-10 text-stone-800 font-bold">
          请选择单价更高的一项：
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => handleChoice('A')}
            className="group flex items-center justify-between p-6 border-2 border-stone-100 rounded-xl hover:border-amber-200 hover:bg-amber-50/30 transition-all text-left"
          >
            <div className="text-lg font-semibold text-stone-700 group-hover:text-amber-900 transition-colors pr-4">
              {question.productA}
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-stone-200 flex-shrink-0 group-hover:border-amber-400 flex items-center justify-center text-stone-300 group-hover:text-amber-500 font-bold">A</div>
          </button>

          <button
            onClick={() => handleChoice('B')}
            className="group flex items-center justify-between p-6 border-2 border-stone-100 rounded-xl hover:border-amber-200 hover:bg-amber-50/30 transition-all text-left"
          >
            <div className="text-lg font-semibold text-stone-700 group-hover:text-amber-900 transition-colors pr-4">
              {question.productB}
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-stone-200 flex-shrink-0 group-hover:border-amber-400 flex items-center justify-center text-stone-300 group-hover:text-amber-500 font-bold">B</div>
          </button>
        </div>
      </div>
    );
  };

  const renderFeedback = () => {
    const question = gameState.selectedQuestions[gameState.currentQuestionIndex];
    const isCorrect = gameState.lastResult?.correct;

    return (
      <div className="text-center">
        <div className={`text-5xl mb-4 ${isCorrect ? 'text-emerald-500' : 'text-rose-500'}`}>
          {isCorrect ? '● 正确' : '○ 错误'}
        </div>
        
        <div className="text-stone-400 text-sm mb-8">
          {isCorrect ? '恭喜，你的商业眼光很准！' : '哎呀，看来这道题有点迷惑性。'}
        </div>

        <div className="grid grid-cols-2 gap-px bg-stone-100 rounded-xl overflow-hidden mb-8">
          <div className={`p-6 bg-white ${question.correct === 'A' ? 'bg-amber-50' : ''}`}>
            <div className="text-xs text-stone-400 mb-1 uppercase">产品 A 价格</div>
            <div className={`text-xl font-bold ${question.correct === 'A' ? 'text-amber-700' : 'text-stone-400'}`}>${question.priceA.toLocaleString()}</div>
          </div>
          <div className={`p-6 bg-white ${question.correct === 'B' ? 'bg-amber-50' : ''}`}>
            <div className="text-xs text-stone-400 mb-1 uppercase">产品 B 价格</div>
            <div className={`text-xl font-bold ${question.correct === 'B' ? 'text-amber-700' : 'text-stone-400'}`}>${question.priceB.toLocaleString()}</div>
          </div>
        </div>

        <div className="bg-stone-50 rounded-xl p-6 mb-10 text-left border border-stone-100">
          <div className="flex items-center gap-2 mb-2 text-amber-700 font-bold text-sm">
            <span>📝</span> 定价逻辑分析
          </div>
          <p className="text-stone-600 text-sm leading-relaxed">
            {question.reason}
          </p>
        </div>

        <PrimaryButton onClick={nextQuestion}>
          {gameState.currentQuestionIndex + 1 === GAME_QUESTION_COUNT ? '查看最终得分' : '下一题'}
        </PrimaryButton>
      </div>
    );
  };

  const renderResult = () => {
    const isMaster = gameState.score === GAME_QUESTION_COUNT;
    
    return (
      <div className="text-center relative">
        {isMaster && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div 
                key={i} 
                className="confetti-piece"
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  animationDelay: `${Math.random() * 3}s`,
                  backgroundColor: ['#f59e0b', '#d97706', '#fbbf24'][i % 3]
                }} 
              />
            ))}
          </div>
        )}

        <div className={`w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 ${isMaster ? 'animate-celebrate' : ''}`}>
          <span className="text-4xl">{isMaster ? '🏆' : '📊'}</span>
        </div>
        
        <h2 className="text-2xl font-bold mb-2 text-stone-800">
          {isMaster ? '满分！定价专家' : '测验结束'}
        </h2>
        
        <div className="text-7xl font-bold text-[#78350f] my-6">
          {gameState.score}<span className="text-stone-300 text-3xl font-light"> / 3</span>
        </div>

        <p className="text-stone-500 mb-10">
          {isMaster ? '你对市场价值有着惊人的洞察力！' : `感谢参与，下次挑战争取拿到满分哦。`}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PrimaryButton onClick={initGame}>再玩一次</PrimaryButton>
          <SecondaryButton onClick={() => setGameState(prev => ({ ...prev, screen: 'START' }))}>回到主页</SecondaryButton>
        </div>
      </div>
    );
  };

  return (
    <ScreenContainer>
      {gameState.screen === 'START' && renderStart()}
      {gameState.screen === 'QUIZ' && renderQuiz()}
      {gameState.screen === 'FEEDBACK' && renderFeedback()}
      {gameState.screen === 'RESULT' && renderResult()}
      
      <div className="mt-8 pt-8 border-t border-stone-100 flex justify-between items-center text-[11px] text-stone-300 font-medium tracking-widest uppercase">
        <span>管理学院博览会</span>
        <span>定价策略互动测验</span>
      </div>
    </ScreenContainer>
  );
};

export default App;
