export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-4">
      <div className="border-4 border-dashed border-white/60 p-12 max-w-2xl w-full rounded-2xl flex flex-col items-center text-center gap-8 shadow-2xl relative">
        {/* Decorative Chalk marks */}
        <div className="absolute top-4 left-6 text-white/20 text-3xl transform -rotate-12">x² + y²</div>
        <div className="absolute bottom-6 right-8 text-white/20 text-4xl transform rotate-6">∑</div>

        <h1 className="text-6xl text-white drop-shadow-md">
          나만의 교육용 웹앱 만들기
        </h1>
        
        <p className="text-3xl text-yellow-100 max-w-lg leading-relaxed">
          이곳은 선생님과 학생들이 자유롭게 소통하고 
          학습할 수 있는 가상의 아날로그 칠판입니다. 
          새로운 기능을 추가하여 수업을 더 재밌게 만들어보세요!
        </p>

        <div className="mt-8">
          <button className="px-8 py-4 bg-transparent border-4 border-dashed border-yellow-300 text-yellow-300 text-4xl rounded-xl hover:bg-yellow-300 hover:text-teal-900 transition-all duration-300 transform hover:scale-105 hover:-rotate-2 cursor-pointer shadow-[4px_4px_0_rgba(255,255,255,0.2)]">
            + 기능 추가하기
          </button>
        </div>
      </div>
    </div>
  );
}
