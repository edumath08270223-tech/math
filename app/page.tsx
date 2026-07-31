import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-4">
      <div className="border-4 border-dashed border-white/60 p-12 max-w-4xl w-full rounded-2xl flex flex-col items-center text-center gap-12 shadow-2xl relative">
        {/* Decorative Chalk marks */}
        <div className="absolute top-4 left-6 text-white/20 text-3xl transform -rotate-12 font-nanum">수학의 세계로!</div>
        <div className="absolute bottom-6 right-8 text-white/20 text-4xl transform rotate-6 font-nanum">재미있는 수학</div>

        <h1 className="text-6xl text-white drop-shadow-md font-nanum">
          어떤 메뉴를 선택할까요?
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-4">
          <Link href="/grade1" className="flex items-center justify-center h-32 bg-transparent border-4 border-dashed border-yellow-300 text-yellow-300 text-5xl rounded-xl hover:bg-yellow-300 hover:text-teal-900 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-[4px_4px_0_rgba(255,255,255,0.2)] font-nanum">
            1학년
          </Link>
          <Link href="/grade2" className="flex items-center justify-center h-32 bg-transparent border-4 border-dashed border-yellow-300 text-yellow-300 text-5xl rounded-xl hover:bg-yellow-300 hover:text-teal-900 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-[4px_4px_0_rgba(255,255,255,0.2)] font-nanum">
            2학년
          </Link>
          <Link href="/grade3" className="flex items-center justify-center h-32 bg-transparent border-4 border-dashed border-yellow-300 text-yellow-300 text-5xl rounded-xl hover:bg-yellow-300 hover:text-teal-900 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-[4px_4px_0_rgba(255,255,255,0.2)] font-nanum">
            3학년
          </Link>
          <Link href="/kids" className="flex items-center justify-center h-32 bg-transparent border-4 border-dashed border-yellow-300 text-yellow-300 text-5xl rounded-xl hover:bg-yellow-300 hover:text-teal-900 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-[4px_4px_0_rgba(255,255,255,0.2)] font-nanum">
            아이들
          </Link>
        </div>
      </div>
    </div>
  );
}
