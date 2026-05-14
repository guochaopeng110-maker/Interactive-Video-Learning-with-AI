'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const variants = ['A', 'B', 'C'] as const;
const variantNames: Record<string, string> = {
  A: 'Centered Card',
  B: 'Split Screen',
  C: 'Edge-to-Edge',
};

export default function PrototypeSwitcher() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get('variant') ?? 'A';

  function cycle(direction: 1 | -1) {
    const idx = variants.indexOf(current as typeof variants[number]);
    const next = variants[(idx + direction + variants.length) % variants.length];
    const params = new URLSearchParams(searchParams.toString());
    params.set('variant', next);
    router.push(`?${params.toString()}`);
  }

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-gray-900 text-white px-5 py-2.5 rounded-full shadow-xl select-none">
      <button onClick={() => cycle(-1)} className="text-sm px-1 hover:text-indigo-300 transition-colors">
        ←
      </button>
      <span className="text-xs font-medium tracking-wide min-w-[120px] text-center">
        {current} · {variantNames[current]}
      </span>
      <button onClick={() => cycle(1)} className="text-sm px-1 hover:text-indigo-300 transition-colors">
        →
      </button>
    </div>
  );
}
