export default function Grade1Page() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-4">
      <div className="border-4 border-dashed border-white/60 p-12 max-w-2xl w-full rounded-2xl flex flex-col items-center text-center gap-8 shadow-2xl relative">
        <div className="absolute top-4 left-6 text-white/20 text-3xl transform -rotate-12">1 + 1 = 2</div>
        <div className="absolute bottom-6 right-8 text-white/20 text-4xl transform rotate-6">✓</div>

        <h1 className="text-6xl text-white drop-shadow-md">
          1학년 수학교실
        </h1>
        
        <p className="text-3xl text-yellow-100 max-w-lg leading-relaxed">
          1학년 수학 수업 자료와 과제를 확인하는 곳입니다.
          기초부터 튼튼하게! 재미있는 수학의 세계로 떠나볼까요?
        </p>
      </div>
    </div>
  );
}
