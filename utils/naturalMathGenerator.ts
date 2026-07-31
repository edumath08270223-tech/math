export type MathProblem = {
  question: string;
  answer: string;
};

// 랜덤 자연수 생성기 (min~max)
const getRandomNatural = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 1단계: 1자리수 덧셈과 뺄셈
const generateLevel1 = (): MathProblem => {
  const isAdd = Math.random() > 0.5;
  if (isAdd) {
    const a = getRandomNatural(1, 9);
    const b = getRandomNatural(1, 9);
    return { question: `${a} + ${b}`, answer: (a + b).toString() };
  } else {
    // 뺄셈 시 큰 수에서 작은 수 빼기 (결과가 0 이상이 되도록)
    let a = getRandomNatural(1, 9);
    let b = getRandomNatural(1, 9);
    if (a < b) [a, b] = [b, a];
    return { question: `${a} - ${b}`, answer: (a - b).toString() };
  }
};

// 2단계: 2자리수와 1자리수의 덧셈과 뺄셈
const generateLevel2 = (): MathProblem => {
  const isAdd = Math.random() > 0.5;
  const a = getRandomNatural(10, 99); // 2자리수
  const b = getRandomNatural(1, 9);   // 1자리수
  
  if (isAdd) {
    // 무작위로 위치 변경 (a+b or b+a)
    const reverse = Math.random() > 0.5;
    return { 
      question: reverse ? `${b} + ${a}` : `${a} + ${b}`, 
      answer: (a + b).toString() 
    };
  } else {
    // 항상 2자리수에서 1자리수를 뺌
    return { question: `${a} - ${b}`, answer: (a - b).toString() };
  }
};

// 3단계: 두자리와 두자리의 덧셈
const generateLevel3 = (): MathProblem => {
  const a = getRandomNatural(10, 99);
  const b = getRandomNatural(10, 99);
  return { question: `${a} + ${b}`, answer: (a + b).toString() };
};

// 4단계: 두자리와 두자리의 뺄셈 (항상 결과가 자연수 0 이상)
const generateLevel4 = (): MathProblem => {
  let a = getRandomNatural(10, 99);
  let b = getRandomNatural(10, 99);
  if (a < b) [a, b] = [b, a];
  return { question: `${a} - ${b}`, answer: (a - b).toString() };
};

// 5단계: 여러번의 한자리 수 덧셈과 뺄셈 (A + B - C 등)
const generateLevel5 = (): MathProblem => {
  const nums = [getRandomNatural(1, 9), getRandomNatural(1, 9), getRandomNatural(1, 9)];
  // 4개 숫자로 할 수도 있음
  if (Math.random() > 0.5) nums.push(getRandomNatural(1, 9));
  
  let currentTotal = nums[0];
  let question = `${nums[0]}`;
  
  for (let i = 1; i < nums.length; i++) {
    // 현재 총합보다 작거나 같은 수로만 뺄셈 허용하여 중간 과정도 0 이상 유지
    const canSubtract = currentTotal >= nums[i];
    const isAdd = canSubtract ? Math.random() > 0.5 : true;
    
    if (isAdd) {
      question += ` + ${nums[i]}`;
      currentTotal += nums[i];
    } else {
      question += ` - ${nums[i]}`;
      currentTotal -= nums[i];
    }
  }
  return { question, answer: currentTotal.toString() };
};

// 6단계: 여러번의 두자리 수 덧셈과 뺄셈
const generateLevel6 = (): MathProblem => {
  const nums = [getRandomNatural(10, 99), getRandomNatural(10, 99), getRandomNatural(10, 99)];
  let currentTotal = nums[0];
  let question = `${nums[0]}`;
  
  for (let i = 1; i < nums.length; i++) {
    const canSubtract = currentTotal >= nums[i];
    const isAdd = canSubtract ? Math.random() > 0.5 : true;
    
    if (isAdd) {
      question += ` + ${nums[i]}`;
      currentTotal += nums[i];
    } else {
      question += ` - ${nums[i]}`;
      currentTotal -= nums[i];
    }
  }
  return { question, answer: currentTotal.toString() };
};

export const generateNaturalProblem = (level: number): MathProblem => {
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
