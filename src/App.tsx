import { useMemo, useState } from 'react';
import { Share } from '@apps-in-toss/web-framework';
import { categories, getTier, maxScore } from './data';
import './App.css';

function formatWon(amount: number) {
  return amount.toLocaleString('ko-KR') + '원';
}

function App() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [shareStatus, setShareStatus] = useState<string | null>(null);

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
    setShareStatus(null);
  };

  const { totalScore, totalCost } = useMemo(() => {
    let score = 0;
    let cost = 0;
    for (const category of categories) {
      for (const item of category.items) {
        if (selected.has(item.id)) {
          score += item.score;
          cost += item.cost;
        }
      }
    }
    return { totalScore: score, totalCost: cost };
  }, [selected]);

  const percentage = Math.round((totalScore / maxScore) * 100);
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

  return (
    <div className="page">
      <header className="header">
        <h1>킹받음 지수 계산기</h1>
        <p>오늘 겪은 킹받는 순간을 체크해보세요</p>
      </header>

      <main className="checklist">
        {categories.map((category) => (
          <section key={category.id} className="category">
            <h2>
              <span className="category-emoji">{category.emoji}</span>
              {category.name}
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
        ))}
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
