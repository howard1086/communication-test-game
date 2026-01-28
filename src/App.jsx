import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { roles, questions } from './data';
import { ChevronRight, RotateCcw, Award, Zap, Coffee, HardHat, Briefcase, UserCheck, Star } from 'lucide-react';

const App = () => {
  const [gameState, setGameState] = useState('start'); // 'start', 'quiz', 'result'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({
    GM: 0, CE: 0, DEAN: 0, TL: 0, EXPERT: 0, PM: 0, STAFF: 0
  });
  const [resultRole, setResultRole] = useState(null);

  const startQuiz = () => {
    setGameState('quiz');
    setCurrentQuestionIndex(0);
    setScores({ GM: 0, CE: 0, DEAN: 0, TL: 0, EXPERT: 0, PM: 0, STAFF: 0 });
  };

  const handleAnswer = (optionScores) => {
    const newScores = { ...scores };
    Object.keys(optionScores).forEach(role => {
      newScores[role] += optionScores[role];
    });
    setScores(newScores);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores) => {
    let maxScore = -1;
    let winningRole = 'STAFF';

    Object.keys(finalScores).forEach(role => {
      if (finalScores[role] > maxScore) {
        maxScore = finalScores[role];
        winningRole = role;
      }
    });

    setResultRole(roles[winningRole]);
    setGameState('result');
  };

  const getRoleIcon = (title) => {
    switch (title) {
      case '总经理': return <Star className="w-12 h-12 text-yellow-500" />;
      case '总工程师': return <Zap className="w-12 h-12 text-blue-500" />;
      case '院长': return <Briefcase className="w-12 h-12 text-indigo-500" />;
      case '巴长': return <HardHat className="w-12 h-12 text-orange-500" />;
      case '专家': return <Award className="w-12 h-12 text-purple-500" />;
      case '项目负责人': return <UserCheck className="w-12 h-12 text-green-500" />;
      case '普通员工': return <Coffee className="w-12 h-12 text-gray-500" />;
      default: return <Coffee className="w-12 h-12 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans text-slate-900">
      <AnimatePresence mode="wait">
        {gameState === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden p-8 text-center"
          >
            <div className="mb-6 inline-block p-4 bg-blue-100 rounded-full">
              <Zap className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">通信设计院</h1>
            <h2 className="text-xl font-medium text-blue-600 mb-6">职场生存/进阶大测试</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              马年已到，职场之路变幻莫测。<br />
              作为一名通信设计院的老兵/新兵，<br />
              你究竟骨子里适合坐在哪个工位上？
            </p>
            <button
              onClick={startQuiz}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              开始测试 <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {gameState === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="h-2 bg-slate-100 w-full">
              <motion.div 
                className="h-full bg-blue-600" 
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
              />
            </div>
            <div className="p-8">
              <div className="text-blue-600 font-bold mb-2">第 {currentQuestionIndex + 1} / {questions.length} 题</div>
              <h2 className="text-xl font-bold text-slate-900 mb-8 leading-snug">
                {questions[currentQuestionIndex].text}
              </h2>
              <div className="space-y-4">
                {questions[currentQuestionIndex].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option.scores)}
                    className="w-full text-left p-4 rounded-2xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50 transition-all active:scale-98 group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="bg-slate-100 group-hover:bg-blue-200 text-slate-500 group-hover:text-blue-700 font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-slate-700 group-hover:text-slate-900 font-medium">
                        {option.text}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="bg-blue-600 p-8 text-center text-white">
              <div className="mb-4 inline-block p-4 bg-white/20 rounded-full backdrop-blur-sm">
                {getRoleIcon(resultRole.title)}
              </div>
              <p className="text-blue-100 font-medium mb-1">测试结果：你最适合担任</p>
              <h1 className="text-4xl font-black mb-2">{resultRole.title}</h1>
              <p className="bg-white/20 inline-block px-3 py-1 rounded-full text-sm">
                {resultRole.trait}
              </p>
            </div>
            <div className="p-8">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6 italic text-slate-700">
                “{resultRole.description}”
              </div>
              <h3 className="font-bold text-slate-900 mb-2">深度点评：</h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                {resultRole.comment}
              </p>
              <button
                onClick={startQuiz}
                className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                不服！再测一次 <RotateCcw className="w-5 h-5" />
              </button>
              <p className="text-center text-slate-400 text-sm mt-6">
                © 通信设计院生存指南 · 马年大吉
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
