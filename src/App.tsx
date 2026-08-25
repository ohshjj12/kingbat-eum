import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Share } from '@apps-in-toss/web-framework';
import { CATEGORY_BONUS, categories, getTier } from './data';
import { SHARE_CARD_HEIGHT, SHARE_CARD_WIDTH, canvasToBlob, drawShareCard } from './shareImage';
import './App.css';

type CustomItem = {
  id: string;
  label: string;
  score: number;
  cost: number;
};

const MAX_CATEGORY_SELECTION = 2;

function formatWon(amount: number) {
  return amount.toLocaleString('ko-KR') + '원';
}

function App() {
  const [step, setStep] = useState<'select' | 'checklist'>('select');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [shareStatus, setShareStatus] = useState<string | null>(null);
  const [customItems, setCustomItems] = useState<CustomItem[]>([]);
  const [customLabel, setCustomLabel] = useState('');
  const [customScore, setCustomScore] = useState(5);
  const [customCost, setCustomCost] = useState('');
  const shareCanvasRef = useRef<HTMLCanvasElement>(null);

  const toggleCategory = (id: string) => {
    setSelectedCategoryIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (next.size >= MAX_CATEGORY_SELECTION) return prev;
        next.add(id);
      }
      return next;
    });
  };

  const clearCategorySelection = () => setSelectedCategoryIds(new Set());

  const filteredCategories = useMemo(
    () => categories.filter((category) => selectedCategoryIds.has(category.id)),
    [selectedCategoryIds],
  );

  const toggle = (id: string) => {
    setShareStatus(null);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const reset = () => {
    setSelected(new Set());
    setCustomItems([]);
    setShareStatus(null);
  };

  const addCustomItem = (event: FormEvent) => {
    event.preventDefault();
    const label = customLabel.trim();
    if (!label) return;
    const cost = Math.max(0, Number(customCost) || 0);
    setCustomItems((prev) => [
      ...prev,
      { id: `custom-${Date.now()}`, label, score: customScore, cost },
    ]);
    setCustomLabel('');
    setCustomScore(5);
    setCustomCost('');
    setShareStatus(null);
  };

  const removeCustomItem = (id: string) => {
    setShareStatus(null);
    setCustomItems((prev) => prev.filter((item) => item.id !== id));
  };

  const { totalScore, totalCost, comboCategoryIds, effectiveMaxScore } = useMemo(() => {
    let score = 0;
    let cost = 0;
    let itemsMax = 0;
    const combos: string[] = [];

    for (const category of filteredCategories) {
      let categoryChecked = 0;
      for (const item of category.items) {
        itemsMax += item.score;
        if (selected.has(item.id)) {
          score += item.score;
          cost += item.cost;
          categoryChecked += 1;
        }
      }
      if (categoryChecked === category.items.length) {
        score += CATEGORY_BONUS;
        combos.push(category.id);
      }
    }

    for (const item of customItems) {
      score += item.score;
      cost += item.cost;
    }

    return {
      totalScore: score,
      totalCost: cost,
      comboCategoryIds: combos,
      effectiveMaxScore: itemsMax + filteredCategories.length * CATEGORY_BONUS,
    };
  }, [filteredCategories, selected, customItems]);

  const percentage =
    effectiveMaxScore > 0 ? Math.min(100, Math.round((totalScore / effectiveMaxScore) * 100)) : 0;
  const tier = getTier(percentage);

  const shareText = `오늘의 킹받음 지수는 ${percentage}%!\n칭호: ${tier.emoji} ${tier.title}\n예상 홧김비용: ${formatWon(totalCost)}\n\n너의 킹받음 지수도 확인해봐 👉 킹받음 지수 계산기`;

  const handleShare = async () => {
    try {
      await Share.sendMessage({ message: shareText });
    } catch {
      try {
        await navigator.clipboard.writeText(shareText);
        setShareStatus('결과를 클립보드에 복사했어요.');
      } catch {
        setShareStatus('공유하기를 지원하지 않는 환경이에요.');
      }
    }
  };

  useEffect(() => {
    const canvas = shareCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    drawShareCard(ctx, { percentage, tier, totalCost });
  }, [percentage, tier, totalCost]);

  const handleSaveImage = async () => {
    const canvas = shareCanvasRef.current;
    if (!canvas) return;
    const blob = await canvasToBlob(canvas);
    if (!blob) {
      setShareStatus('이미지 생성에 실패했어요.');
      return;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kingbat-result.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setShareStatus('결과 이미지를 저장했어요.');
  };

  const handleImageShare = async () => {
    const canvas = shareCanvasRef.current;
    if (!canvas) return;
    const blob = await canvasToBlob(canvas);
    if (!blob) {
      setShareStatus('이미지 생성에 실패했어요.');
      return;
    }
    const file = new File([blob], 'kingbat-result.png', { type: 'image/png' });
    if (typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: '킹받음 지수 계산기', text: shareText });
        return;
      } catch (err) {
        if ((err as Error)?.name === 'AbortError') return;
      }
    }
    await handleSaveImage();
  };

  if (step === 'select') {
    const isMaxReached = selectedCategoryIds.size >= MAX_CATEGORY_SELECTION;
    return (
      <div className="page">
        <header className="header">
          <h1>킹받음 지수 계산기</h1>
          <p>오늘 체크할 카테고리를 최대 {MAX_CATEGORY_SELECTION}개 골라보세요</p>
        </header>

        <main className="category-select">
          <div className="select-status-row">
            <span className="select-count">
              {selectedCategoryIds.size} / {MAX_CATEGORY_SELECTION} 선택됨
            </span>
            <button
              type="button"
              className="select-all-btn"
              onClick={clearCategorySelection}
              disabled={selectedCategoryIds.size === 0}
            >
              선택 초기화
            </button>
          </div>
          <div className="category-select-grid">
            {categories.map((category) => {
              const isSelected = selectedCategoryIds.has(category.id);
              const isDisabled = !isSelected && isMaxReached;
              return (
                <button
                  type="button"
                  key={category.id}
                  className={`category-select-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                  onClick={() => toggleCategory(category.id)}
                  disabled={isDisabled}
                >
                  {isSelected && <span className="category-select-check">✓</span>}
                  <span className="category-select-emoji">{category.emoji}</span>
                  <span className="category-select-name">{category.name}</span>
                  <span className="category-select-count">{category.items.length}개 항목</span>
                </button>
              );
            })}
          </div>
        </main>

        <footer className="select-footer">
          <button
            type="button"
            className="btn-primary select-start-btn"
            disabled={selectedCategoryIds.size === 0}
            onClick={() => setStep('checklist')}
          >
            {selectedCategoryIds.size === 0
              ? '카테고리를 선택해주세요'
              : `${selectedCategoryIds.size}개 카테고리로 시작하기`}
          </button>
        </footer>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="header">
        <button type="button" className="back-btn" onClick={() => setStep('select')}>
          ← 카테고리 다시 선택
        </button>
        <h1>킹받음 지수 계산기</h1>
        <p>오늘 겪은 킹받는 순간을 체크해보세요</p>
      </header>

      <main className="checklist">
        {filteredCategories.map((category) => {
          const isCombo = comboCategoryIds.includes(category.id);
          return (
            <section key={category.id} className={`category ${isCombo ? 'combo' : ''}`}>
              <h2>
                <span className="category-emoji">{category.emoji}</span>
                {category.name}
                {isCombo && <span className="combo-badge">🎯 올킬! +{CATEGORY_BONUS}점</span>}
              </h2>
              <ul>
                {category.items.map((item) => {
                  const checked = selected.has(item.id);
                  return (
                    <li key={item.id}>
                      <label className={`item ${checked ? 'checked' : ''}`}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggle(item.id)}
                        />
                        <span className="item-label">{item.label}</span>
                        <span className="item-meta">
                          +{item.score}점
                          {item.cost > 0 && (
                            <span className="item-cost">
                              {' '}
                              · {formatWon(item.cost)}
                              {item.costLabel ? ` (${item.costLabel})` : ''}
                            </span>
                          )}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}

        <section className="category custom-section">
          <h2>
            <span className="category-emoji">✍️</span>
            직접 입력
          </h2>

          {customItems.length > 0 && (
            <ul>
              {customItems.map((item) => (
                <li key={item.id}>
                  <div className="item custom-item">
                    <span className="item-label">{item.label}</span>
                    <span className="item-meta">
                      +{item.score}점
                      {item.cost > 0 && <span className="item-cost"> · {formatWon(item.cost)}</span>}
                    </span>
                    <button
                      type="button"
                      className="custom-remove"
                      aria-label="삭제"
                      onClick={() => removeCustomItem(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <form className="custom-form" onSubmit={addCustomItem}>
            <input
              type="text"
              className="custom-input"
              placeholder="오늘 나만 겪은 킹받는 순간을 적어보세요"
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
              maxLength={40}
            />
            <div className="custom-form-row">
              <label className="custom-score-label">
                킹받음 점수 {customScore}점
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={customScore}
                  onChange={(e) => setCustomScore(Number(e.target.value))}
                />
              </label>
              <input
                type="number"
                className="custom-cost-input"
                placeholder="홧김비용(원)"
                min={0}
                value={customCost}
                onChange={(e) => setCustomCost(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-secondary custom-add-btn">
              추가하기
            </button>
          </form>
        </section>

        <section className="category share-card-section">
          <h2>
            <span className="category-emoji">🖼️</span>
            공유 카드
          </h2>
          <div className="share-card-wrap">
            <canvas
              ref={shareCanvasRef}
              width={SHARE_CARD_WIDTH}
              height={SHARE_CARD_HEIGHT}
              className="share-canvas"
            />
          </div>
          <div className="share-card-actions">
            <button type="button" className="btn-secondary" onClick={handleSaveImage}>
              이미지 저장
            </button>
            <button type="button" className="btn-primary" onClick={handleImageShare}>
              이미지로 공유
            </button>
          </div>
        </section>
      </main>

      <footer className="result">
        <div className="result-top">
          <div className="result-gauge">
            <div
              className="result-gauge-fill"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="result-percentage">{percentage}%</div>
        </div>
        <div className="result-tier">
          {tier.emoji} {tier.title}
        </div>
        <div className="result-cost">
          오늘 예상 홧김비용 <strong>{formatWon(totalCost)}</strong>
        </div>
        <div className="result-actions">
          <button type="button" className="btn-secondary" onClick={reset}>
            초기화
          </button>
          <button type="button" className="btn-primary" onClick={handleShare}>
            결과 공유하기
          </button>
        </div>
        {shareStatus && <p className="share-status">{shareStatus}</p>}
      </footer>
    </div>
  );
}

export default App;
