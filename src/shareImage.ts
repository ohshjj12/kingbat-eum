import type { Tier } from './data';

export const SHARE_CARD_WIDTH = 720;
export const SHARE_CARD_HEIGHT = 960;

const FONT_STACK = '"Apple SD Gothic Neo", "Malgun Gothic", sans-serif';

function formatWon(amount: number) {
  return amount.toLocaleString('ko-KR') + '원';
}

function mixChannel(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function tierAccentColor(percentage: number) {
  const from = { r: 0x31, g: 0x82, b: 0xf6 };
  const to = { r: 0xf0, g: 0x44, b: 0x52 };
  const t = Math.min(1, Math.max(0, percentage / 100));
  return `rgb(${mixChannel(from.r, to.r, t)}, ${mixChannel(from.g, to.g, t)}, ${mixChannel(from.b, to.b, t)})`;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.max(0, Math.min(r, h / 2, w / 2));
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

export function drawShareCard(
  ctx: CanvasRenderingContext2D,
  params: { percentage: number; tier: Tier; totalCost: number },
) {
  const { percentage, tier, totalCost } = params;
  const width = SHARE_CARD_WIDTH;
  const height = SHARE_CARD_HEIGHT;
  const accent = tierAccentColor(percentage);

  ctx.clearRect(0, 0, width, height);

  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, '#ffffff');
  bg.addColorStop(1, '#f7f8fa');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  ctx.textAlign = 'center';

  ctx.fillStyle = '#8b95a1';
  ctx.font = `600 28px ${FONT_STACK}`;
  ctx.fillText('오늘의 킹받음 지수', width / 2, 120);

  ctx.font = `140px ${FONT_STACK}`;
  ctx.fillText(tier.emoji, width / 2, 320);

  ctx.fillStyle = '#191f28';
  ctx.font = `800 120px ${FONT_STACK}`;
  ctx.fillText(`${percentage}%`, width / 2, 460);

  ctx.fillStyle = accent;
  ctx.font = `700 48px ${FONT_STACK}`;
  ctx.fillText(tier.title, width / 2, 540);

  const gaugeX = 100;
  const gaugeY = 600;
  const gaugeW = width - 200;
  const gaugeH = 24;

  ctx.fillStyle = '#eef0f2';
  roundRect(ctx, gaugeX, gaugeY, gaugeW, gaugeH, 12);
  ctx.fill();

  const fillWidth = gaugeW * (Math.min(100, percentage) / 100);
  if (fillWidth > 0) {
    const fillGradient = ctx.createLinearGradient(gaugeX, 0, gaugeX + gaugeW, 0);
    fillGradient.addColorStop(0, '#3182f6');
    fillGradient.addColorStop(1, '#f04452');
    ctx.fillStyle = fillGradient;
    roundRect(ctx, gaugeX, gaugeY, fillWidth, gaugeH, 12);
    ctx.fill();
  }

  ctx.fillStyle = '#4e5968';
  ctx.font = `500 34px ${FONT_STACK}`;
  ctx.fillText('오늘 예상 홧김비용', width / 2, 700);

  ctx.fillStyle = '#f04452';
  ctx.font = `800 56px ${FONT_STACK}`;
  ctx.fillText(formatWon(totalCost), width / 2, 765);

  ctx.fillStyle = '#b0b8c1';
  ctx.font = `600 26px ${FONT_STACK}`;
  ctx.fillText('킹받음 지수 계산기', width / 2, height - 60);
}

export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png');
  });
}
