
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
    const simplePool = TECH_DATA.filter(q => q.id >= 11);
    const hardPool = TECH_DATA.filter(q => q.id < 11);
    const shuffledSimple = shuffleArray(simplePool);
    const shuffledHard = shuffleArray(hardPool);
    const selected: TechProduct[] = [];
    if (shuffledSimple.length > 0) selected.push(shuffledSimple.pop()!);
    if (shuffledHard.length > 0) selected.push(shuffledHard.pop()!);
    const remainingPool = [...shuffledSimple, ...shuffledHard];
    const finalShuffledRemaining = shuffleArray(remainingPool);
    while (selected.length < GAME_QUESTION_COUNT && finalShuffledRemaining.length > 0) {
      selected.push(finalShuffledRemaining.pop()!);
    }
    const finalQuestions = shuffleArray(selected);

    setGameState({
      screen: 'QUIZ',
      currentQuestionIndex: 0,
      score: 0,
      selectedQuestions: finalQuestions,
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
      lastResult: { correct: isCorrect, userChoice: choice }
    }));
  }, [gameState.selectedQuestions, gameState.currentQuestionIndex]);

  useEffect(() => {
    let timer: number;
    if (gameState.screen === 'QUIZ' && timeLeft > 0) {
      timer = window.setInterval(() => { setTimeLeft(prev => prev - 0.1); }, 100);
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
      setGameState(prev => ({ ...prev, screen: 'RESULT' }));
    }
  };

  const renderStart = () => (
    <div className="flex-1 flex flex-col items-center justify-center text-center border-[8px] border-[#1e293b] p-10">
      <div className="text-8xl mb-8">🏷️</div>
      <h1 className="text-6xl md:text-8xl font-black mb-6 text-[#1e293b] uppercase tracking-tighter">
        <span className="bg-[#605bff] text-white px-4">价格大对决</span>
      </h1>
      <p className="text-2xl md:text-3xl text-slate-600 mb-12 font-bold max-w-4xl leading-snug">
        游园会特别挑战！在两款产品中选出单价更高的一项。
        <br/><span className="text-[#605bff]">答对全部 3 题即可领取奖品！</span>
      </p>
      <PrimaryButton onClick={initGame} className="w-full max-w-2xl">
        点击开始挑战
      </PrimaryButton>
    </div>
  );

  const renderQuiz = () => {
    const question = gameState.selectedQuestions[gameState.currentQuestionIndex];
    const progress = (timeLeft / TIMER_DURATION) * 100;
    return (
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-black text-[#1e293b] uppercase">第 {gameState.currentQuestionIndex + 1} 题</h3>
          <div className={`px-6 py-2 text-3xl font-black tabular-nums border-4 border-[#1e293b] ${timeLeft < 3 ? 'bg-rose-500 text-white animate-pulse' : 'bg-white text-[#1e293b]'}`}>
            {Math.ceil(timeLeft)}S
          </div>
        </div>
        <div className="w-full bg-slate-100 h-6 border-4 border-[#1e293b] mb-12">
          <div className={`h-full transition-all duration-100 ease-linear ${timeLeft < 3 ? 'bg-rose-500' : 'bg-[#605bff]'}`} style={{ width: `${progress}%` }} />
        </div>
        <h2 className="text-4xl md:text-6xl text-center text-[#1e293b] font-black leading-tight mb-12">
          以下哪项单价<span className="text-[#605bff] underline">更高</span>？
        </h2>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <button onClick={() => handleChoice('A')} className="group border-[6px] border-[#1e293b] bg-white hover:bg-[#605bff] hover:text-white transition-colors text-center flex flex-col items-center justify-center p-8 gap-6">
            <span className="text-3xl md:text-5xl font-black leading-tight">{question.productA}</span>
            <div className="text-4xl font-black opacity-30 group-hover:opacity-100">OPTION A</div>
          </button>
          <button onClick={() => handleChoice('B')} className="group border-[6px] border-[#1e293b] bg-white hover:bg-[#605bff] hover:text-white transition-colors text-center flex flex-col items-center justify-center p-8 gap-6">
            <span className="text-3xl md:text-5xl font-black leading-tight">{question.productB}</span>
            <div className="text-4xl font-black opacity-30 group-hover:opacity-100">OPTION B</div>
          </button>
        </div>
      </div>
    );
  };

  const renderFeedback = () => {
    const question = gameState.selectedQuestions[gameState.currentQuestionIndex];
    const isCorrect = gameState.lastResult?.correct;
    return (
      <div className="flex-1 flex flex-col">
        <div className="text-center mb-8">
          <div className={`text-8xl font-black ${isCorrect ? 'text-emerald-500' : 'text-rose-500'}`}>
            {isCorrect ? '正确！' : '错误！'}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className={`p-10 border-4 border-[#1e293b] ${question.correct === 'A' ? 'bg-[#f3f4ff]' : 'bg-slate-50'}`}>
            <p className="text-xl font-black text-slate-400 mb-2 uppercase">选项 A</p>
            <p className={`text-4xl md:text-6xl font-black ${question.correct === 'A' ? 'text-[#605bff]' : 'text-slate-300'}`}>
              ￥{question.priceA.toLocaleString()}
            </p>
          </div>
          <div className={`p-10 border-4 border-[#1e293b] ${question.correct === 'B' ? 'bg-[#f3f4ff]' : 'bg-slate-50'}`}>
            <p className="text-xl font-black text-slate-400 mb-2 uppercase">选项 B</p>
            <p className={`text-4xl md:text-6xl font-black ${question.correct === 'B' ? 'text-[#605bff]' : 'text-slate-300'}`}>
              ￥{question.priceB.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-[#1e293b] text-white p-10 mb-8 flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4 text-[#ffcc4d] font-black text-3xl">
            <span>💡</span> 价格逻辑
          </div>
          <p className="text-2xl md:text-3xl leading-relaxed font-bold">
            {question.reason}
          </p>
        </div>

        <PrimaryButton onClick={nextQuestion} className="w-full">
          {gameState.currentQuestionIndex + 1 === GAME_QUESTION_COUNT ? '查看最终得分' : '继续挑战'}
        </PrimaryButton>
      </div>
    );
  };

  const renderResult = () => {
    const canGetPrize = gameState.score === GAME_QUESTION_COUNT;
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center border-[12px] border-[#1e293b] p-10 relative">
        {canGetPrize && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="confetti-piece" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s`, backgroundColor: ['#605bff', '#ff79b0', '#ffcc4d'][i % 3] }} />
            ))}
          </div>
        )}
        <div className="text-9xl mb-10">{canGetPrize ? '🏆' : '💀'}</div>
        <h2 className="text-6xl md:text-8xl font-black mb-6 text-[#1e293b] uppercase">挑战总结</h2>
        <div className="text-[12rem] font-black text-[#605bff] leading-none mb-10 tabular-nums">
          {gameState.score}<span className="text-slate-200 text-6xl mx-4">/</span><span className="text-slate-300 text-8xl">3</span>
        </div>
        
        <div className="mb-12 w-full max-w-4xl">
          {canGetPrize ? (
            <div className="bg-[#ffcc4d] border-4 border-[#1e293b] p-10 shadow-[10px_10px_0px_0px_#1e293b]">
              <p className="text-4xl md:text-6xl text-[#1e293b] font-black animate-pulse">
                ✨ 请找工作人员领取奖品 ✨
              </p>
            </div>
          ) : (
            <p className="text-3xl text-slate-400 font-black">差一点点！必须全对才有奖品哦！</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
          <PrimaryButton onClick={initGame} className="flex-1">重新开始</PrimaryButton>
          <SecondaryButton onClick={() => setGameState(prev => ({ ...prev, screen: 'START' }))} className="flex-1">返回首页</SecondaryButton>
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
    </ScreenContainer>
  );
};

export default App;
