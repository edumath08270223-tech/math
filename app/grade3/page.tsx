export default function Grade3Page() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-4">
      <div className="border-4 border-dashed border-white/60 p-12 max-w-2xl w-full rounded-2xl flex flex-col items-center text-center gap-8 shadow-2xl relative">
        <div className="absolute top-4 left-6 text-white/20 text-3xl transform -rotate-12">⅓ + ⅙</div>
        <div className="absolute bottom-6 right-8 text-white/20 text-4xl transform rotate-6">∠</div>

        <h1 className="text-6xl text-white drop-shadow-md">
          3학년 수학교실
        </h1>
        
        <p className="text-3xl text-yellow-100 max-w-lg leading-relaxed">
          3학년 수학 수업 자료와 과제를 확인하는 곳입니다.
          분수와 소수, 다양한 수학적 사고력을 길러봅시다!
        </p>
      </div>
    </div>
  );
}
