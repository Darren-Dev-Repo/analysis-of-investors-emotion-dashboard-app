import { NextResponse } from 'next/server';

const HF_API_KEY = process.env.HF_API_KEY;
const DEMO_PASSCODE = process.env.DEMO_PASSCODE;
const MODEL_URL = "https://api-inference.huggingface.co/models/IDEA-CCNL/Erlangshen-Roberta-110M-Sentiment";

function bertConfToScore(direction: number, confidence: number) {
  if (direction === 0) return 0.0;
  const magnitude = Math.max(0, Math.min(1, (confidence - 0.5) / 0.5)) * 0.9;
  return direction * magnitude;
}

async function queryHF(text: string) {
  if (!text) return 0.0;
  
  const response = await fetch(MODEL_URL, {
    headers: { 
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ inputs: text }),
  });

  if (!response.ok) {
    throw new Error('Hugging Face API 回應錯誤');
  }

  const result = await response.json();

  const bestPrediction = result[0][0]; 
  
  let direction = 0;
  if (bestPrediction.label === 'LABEL_1' || bestPrediction.label === 'POSITIVE') direction = 1;
  else if (bestPrediction.label === 'LABEL_0' || bestPrediction.label === 'NEGATIVE') direction = -1;

  return bertConfToScore(direction, bestPrediction.score);
}

export async function POST(req: Request) {
  try {
    const { title, message, pushType, passcode } = await req.json();

    // 授權碼例外處理
    if (passcode !== DEMO_PASSCODE) {
      return NextResponse.json({ error: "授權碼錯誤，請確認後再試" }, { status: 401 });
    }

    const [titleScore, messageScore] = await Promise.all([
      queryHF(title),
      queryHF(message)
    ]);

    const pushVal = pushType === '推' ? 1 : (pushType === '噓' ? -1 : 0);
    
    const stance = titleScore * pushVal;
    let finalScore = (0.7 * messageScore) + (0.3 * stance);

    // 留言中立則整體中立
    if (messageScore === 0) {
      finalScore = 0;
    }

    finalScore = Math.max(-1.0, Math.min(1.0, finalScore));

    return NextResponse.json({ score: Number(finalScore.toFixed(2)) });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "伺服器運算錯誤或模型正在載入，請稍後再試" }, { status: 500 });
  }
}