// 목록에서 상세로 넘어가는 동안 보이는 골격 스켈레톤(클라이언트 내비게이션 Suspense fallback).
// 정적 + prefetch라 전환이 빠를 땐 거의 안 보이고, 느린 네트워크/캐시 미스에서 나타난다.
// BuildDetail 골격을 흉내내는 수준 — 실제 콘텐츠 크기를 정확히 맞출 필요는 없다.

/* shimmer 박스 — globals.css의 @keyframes shimmer 사용 */
function Bar({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-[shimmer_1.6s_ease-in-out_infinite] rounded bg-[length:200%_100%] ${className}`}
      style={{
        backgroundImage: 'linear-gradient(90deg, #f5f5f5 25%, #e9e9e9 37%, #f5f5f5 63%)',
      }}
    />
  );
}

export default function Loading() {
  return (
    <article className="mx-auto w-full max-w-[688px] px-4 pt-16" aria-hidden="true">
      <header>
        {/* 제목 */}
        <Bar className="h-5 w-2/3" />
        {/* 메타 행 (소속/역할/기간/기술) */}
        <div className="mt-6 space-y-2.5">
          <Bar className="h-4 w-40" />
          <Bar className="h-4 w-52" />
          <Bar className="h-4 w-44" />
          <Bar className="h-4 w-60" />
        </div>
      </header>

      <div className="mt-10 space-y-6">
        {/* 문단 라인 */}
        <Bar className="h-4 w-full" />
        <Bar className="h-4 w-11/12" />
        <Bar className="h-4 w-4/5" />
        {/* 이미지 블록 */}
        <Bar className="h-64 w-full" />
        <Bar className="h-4 w-full" />
        <Bar className="h-4 w-3/4" />
        <Bar className="h-56 w-full" />
      </div>
    </article>
  );
}
