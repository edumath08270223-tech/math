"use client";

import { useEffect, useRef, useState } from "react";
import SignaturePad from "react-signature-canvas";
import { supabase } from "@/utils/supabase/client";

type Signature = {
  id: string;
  name: string;
  signature_data: string;
  created_at: string;
};

export default function SignaturesPage() {
  const [name, setName] = useState("");
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [loading, setLoading] = useState(false);
  const sigCanvas = useRef<SignaturePad>(null);

  // Fetch signatures on load
  useEffect(() => {
    fetchSignatures();
  }, []);

  const fetchSignatures = async () => {
    const { data, error } = await supabase
      .from("signatures")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching signatures:", error);
    } else {
      setSignatures(data || []);
    }
  };

  const handleClear = () => {
    sigCanvas.current?.clear();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }
    
    if (sigCanvas.current?.isEmpty()) {
      alert("서명을 작성해주세요.");
      return;
    }

    setLoading(true);

    const signatureData = sigCanvas.current?.getTrimmedCanvas().toDataURL("image/png");

    if (!signatureData) {
      alert("서명 데이터를 가져오는데 실패했습니다.");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("signatures")
      .insert([{ name, signature_data: signatureData }]);

    if (error) {
      console.error("Error saving signature:", error);
      alert("저장 중 오류가 발생했습니다.");
    } else {
      setName("");
      sigCanvas.current?.clear();
      await fetchSignatures();
      alert("서명이 제출되었습니다!");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-start p-4 gap-12 w-full max-w-5xl mx-auto">
      
      {/* 서명 입력 폼 (칠판 테두리 스타일) */}
      <section className="border-4 border-dashed border-white/60 p-8 w-full rounded-2xl flex flex-col items-center gap-6 shadow-xl relative bg-teal-800">
        <h2 className="text-4xl text-yellow-300">서명 남기기</h2>
        <p className="text-xl text-white/80">아래에 이름과 서명을 남겨 우리 반 선언문에 동참해 주세요!</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-lg items-center mt-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            className="w-full bg-transparent border-b-2 border-white/50 text-3xl text-white placeholder-white/40 focus:outline-none focus:border-yellow-300 text-center py-2 font-nanum"
            maxLength={20}
          />
          
          <div className="w-full bg-white/10 rounded-lg p-2 border-2 border-white/30 relative">
            <span className="absolute top-2 left-2 text-white/40 text-sm font-sans z-0 pointer-events-none">여기에 서명하세요</span>
            <SignaturePad
              ref={sigCanvas}
              canvasProps={{
                className: "signature-canvas w-full h-48 cursor-crosshair rounded z-10 relative",
              }}
              penColor="white"
            />
          </div>

          <div className="flex gap-4 w-full justify-center">
            <button
              type="button"
              onClick={handleClear}
              className="px-6 py-2 text-2xl border-2 border-dashed border-white/50 text-white/70 hover:text-white hover:border-white transition-all rounded-lg"
            >
              지우기
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2 text-2xl bg-yellow-300 text-teal-900 font-bold rounded-lg hover:bg-yellow-400 transition-all shadow-md disabled:opacity-50"
            >
              {loading ? "제출 중..." : "제출하기"}
            </button>
          </div>
        </form>
      </section>

      {/* 서명 취합 문서 (종이/게시판 느낌) */}
      <section className="w-full bg-[#fdfbf7] p-12 rounded-sm shadow-[8px_8px_0_rgba(0,0,0,0.2)] text-gray-800 flex flex-col items-center min-h-[500px] relative">
        {/* 장식용 압정 느낌 */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-400 shadow-sm border border-red-500"></div>

        <h1 className="text-5xl font-bold border-b-2 border-gray-800 pb-4 mb-8 text-center w-full max-w-lg">
          우리의 선언문
        </h1>
        <p className="text-2xl text-center max-w-2xl mb-12 leading-loose text-gray-600">
          우리는 이 수학교실에서 서로 존중하고, 포기하지 않으며,
          즐겁게 수학을 배울 것을 다짐합니다.
        </p>

        {signatures.length === 0 ? (
          <p className="text-xl text-gray-400 mt-10">아직 등록된 서명이 없습니다. 첫 번째로 서명해 보세요!</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
            {signatures.map((sig) => (
              <div key={sig.id} className="flex flex-col items-center justify-center p-4 border-b border-dashed border-gray-300">
                <div className="h-20 flex items-center justify-center mb-2">
                  <img src={sig.signature_data} alt={`${sig.name}의 서명`} className="max-h-full max-w-full object-contain filter drop-shadow-sm invert" />
                </div>
                <span className="text-2xl font-bold text-gray-800">{sig.name}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
