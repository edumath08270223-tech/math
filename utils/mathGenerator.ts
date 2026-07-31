import Fraction from "fraction.js";

export type MathProblem = {
  question: string;
  answer: string;
};

// Helper: 랜덤 정수 생성 (0 제외 가능)
const getRandomInt = (min: number, max: number, excludeZero = false): number => {
  let val = Math.floor(Math.random() * (max - min + 1)) + min;
  if (excludeZero && val === 0) {
    return getRandomInt(min, max, excludeZero);
  }
  return val;
};

// Helper: 괄호가 필요한 음수 처리
const formatNum = (num: number | Fraction): string => {
  const str = num.toString();
  return str.startsWith("-") ? `(${str})` : str;
};

// 1단계: 정수의 덧셈과 뺄셈
const generateLevel1 = (): MathProblem => {
  const a = getRandomInt(-15, 15);
  const b = getRandomInt(-15, 15);
  const isAdd = Math.random() > 0.5;
  const question = `${a} ${isAdd ? "+" : "-"} ${formatNum(b)}`;
  const answer = (isAdd ? a + b : a - b).toString();
  return { question, answer };
};

// 2단계: 정수의 곱셈과 나눗셈 (나눗셈은 정수로 떨어지도록 조작)
const generateLevel2 = (): MathProblem => {
  const isMul = Math.random() > 0.5;
  if (isMul) {
    const a = getRandomInt(-12, 12);
    const b = getRandomInt(-12, 12);
    return { question: `${a} × ${formatNum(b)}`, answer: (a * b).toString() };
  } else {
    // 나눗셈: b * answer = a 가 되도록
    const b = getRandomInt(-12, 12, true);
    const ans = getRandomInt(-12, 12);
    const a = b * ans;
    return { question: `${a} ÷ ${formatNum(b)}`, answer: ans.toString() };
  }
};

// 3단계: 정수의 혼합계산 (덧/뺄/곱/나눗 중 2개 연산)
const generateLevel3 = (): MathProblem => {
  // A + B * C 형태
  const c = getRandomInt(-10, 10);
  const b = getRandomInt(-10, 10);
  const a = getRandomInt(-20, 20);
  const question = `${a} + ${formatNum(b)} × ${formatNum(c)}`;
  const answer = (a + b * c).toString();
  return { question, answer };
};

// 4단계: 유리수(분수)의 덧셈과 뺄셈
const generateLevel4 = (): MathProblem => {
  const isAdd = Math.random() > 0.5;
  const f1 = new Fraction(getRandomInt(-5, 5), getRandomInt(2, 6, true));
  const f2 = new Fraction(getRandomInt(-5, 5), getRandomInt(2, 6, true));
  const question = `${f1.toFraction()} ${isAdd ? "+" : "-"} ${formatNum(f2)}`;
  const result = isAdd ? f1.add(f2) : f1.sub(f2);
  return { question, answer: result.toFraction() };
};

// 5단계: 유리수의 곱셈과 나눗셈
const generateLevel5 = (): MathProblem => {
  const isMul = Math.random() > 0.5;
  const f1 = new Fraction(getRandomInt(-6, 6, true), getRandomInt(2, 7, true));
  const f2 = new Fraction(getRandomInt(-6, 6, true), getRandomInt(2, 7, true));
  
  if (isMul) {
    const question = `${f1.toFraction()} × ${formatNum(f2)}`;
    return { question, answer: f1.mul(f2).toFraction() };
  } else {
    const question = `${f1.toFraction()} ÷ ${formatNum(f2)}`;
    return { question, answer: f1.div(f2).toFraction() };
  }
};

// 6단계: 유리수의 사칙연산 혼합 (간단한 A + B * C 형태)
const generateLevel6 = (): MathProblem => {
  const a = new Fraction(getRandomInt(-3, 3), getRandomInt(2, 4, true));
  const b = new Fraction(getRandomInt(-3, 3), getRandomInt(2, 4, true));
  const c = new Fraction(getRandomInt(-3, 3, true), getRandomInt(2, 4, true));
  
  const question = `${a.toFraction()} + ${formatNum(b)} × ${formatNum(c)}`;
  const answer = a.add(b.mul(c)).toFraction();
  return { question, answer };
};

export const generateProblem = (level: number): MathProblem => {
  switch (level) {
    case 1: return generateLevel1();
    case 2: return generateLevel2();
    case 3: return generateLevel3();
    case 4: return generateLevel4();
    case 5: return generateLevel5();
    case 6: return generateLevel6();
    default: return generateLevel1();
  }
};
