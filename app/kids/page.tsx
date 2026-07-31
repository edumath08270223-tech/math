"use client";

import { useState, useEffect } from "react";
import { generateNaturalProblem, MathProblem } from "@/utils/naturalMathGenerator";

export default function KidsPage() {
  const [level, setLevel] = useState<number>(1);
  const [problem, setProblem] = useState<MathProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isWrong, setIsWrong] = useState(false);

  useEffect(() => {
    handleNewProblem(level);
  }, [level]);

  const handleNewProblem = (lvl: number) => {
    setProblem(generateNaturalProblem(lvl));
    setUserAnswer("");
    setFeedback("");
    setIsWrong(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem) return;

    // 공백 제거 및 비교
    const parsedInput = userAnswer.trim();
    const parsedAnswer = problem.answer;

    if (parsedInput === parsedAnswer) {
      setScore((s) => s + 1);
      setFeedback("정답입니다! 참 잘했어요 👏");
      setIsWrong(false);
      // 1초 뒤 새 문제
      setTimeout(() => handleNewProblem(level), 1000);
    } else {
      setFeedback(`오답입니다. 정답은 ${parsedAnswer} 에요. 비슷한 문제를 다시 풀어볼까요?`);
      setIsWrong(true);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-start p-4 w-full max-w-4xl mx-auto gap-8">
      {/* 칠판 컨테이너 */}
      <div className="border-8 border-yellow-800/80 p-8 w-full rounded-sm flex flex-col items-center gap-8 shadow-2xl relative bg-teal-900 border-double">
        {/* 분필 점수판 */}
        <div className="absolute top-4 right-6 text-white/80 text-3xl font-nanum transform rotate-2">
          맞힌 개수: {score}개
        </div>

        <h1 className="text-5xl text-yellow-300 drop-shadow-md font-nanum mt-8">
          자연수 사칙연산 마스터
        </h1>
        
        {/* 단계 선택기 */}
        <div className="flex flex-wrap gap-4 justify-center w-full">
          {[1, 2, 3, 4, 5, 6].map((l) => (
            <button
              key={l}
              onClick={() => {
                setLevel(l);
                setScore(0);
              }}
              className={`px-4 py-2 rounded-lg text-2xl font-nanum transition-all ${
                level === l 
                ? "bg-yellow-300 text-teal-900 border-2 border-yellow-300" 
                : "bg-transparent text-white border-2 border-white/50 hover:border-white"
              }`}
            >
              {l}단계
            </button>
          ))}
        </div>
        
        <p className="text-xl text-white/60">
          {level === 1 && "한자리수 덧셈과 뺄셈"}
          {level === 2 && "두자리와 한자리의 덧셈과 뺄셈"}
          {level === 3 && "두자리와 두자리의 덧셈"}
          {level === 4 && "두자리와 두자리의 뺄셈"}
          {level === 5 && "여러번의 한자리 수 덧셈과 뺄셈"}
          {level === 6 && "여러번의 두자리 수 덧셈과 뺄셈"}
        </p>

        {/* 문제 영역 */}
        <div className="text-7xl text-white my-8 font-mono tracking-widest bg-black/20 p-8 rounded-xl shadow-inner text-center w-full max-w-2xl break-words">
          {problem ? problem.question : "준비 중..."} = ?
        </div>

        {/* 입력 및 피드백 폼 */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full">
          <div className="flex gap-4">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="정답 입력"
              className="px-6 py-3 text-3xl bg-white/10 border-b-4 border-yellow-300 text-white focus:outline-none text-center font-nanum w-64"
            />
            <button
              type="submit"
              className="px-6 py-3 text-3xl bg-yellow-300 text-teal-900 font-bold rounded-lg hover:bg-yellow-400 transition-all font-nanum"
            >
              제출
            </button>
          </div>
          
          {feedback && (
            <div className={`text-3xl font-nanum ${isWrong ? "text-red-400" : "text-green-300"}`}>
              {feedback}
            </div>
          )}

          {isWrong && (
            <button
              type="button"
              onClick={() => handleNewProblem(level)}
              className="mt-4 px-6 py-2 text-2xl border-2 border-dashed border-yellow-200 text-yellow-200 hover:bg-yellow-200 hover:text-teal-900 transition-all rounded-full font-nanum"
            >
              보충학습 (비슷한 문제 다시 풀기)
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
