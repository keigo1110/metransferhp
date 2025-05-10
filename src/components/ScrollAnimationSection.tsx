'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

// メンバー情報の型定義
interface MemberInfo {
  name: string;
  url: string;
  color: string;
}

const ArtShowcase = () => {
  // メンバー情報（仮のURL）
  const memberInfos: MemberInfo[] = useMemo(() => {
    return [
      { name: '岡空来', url: 'https://example.com/oka', color: 'from-blue-800/25 to-blue-600/15' },
      { name: '金澤政宜', url: 'https://kanassi.info/', color: 'from-indigo-800/25 to-indigo-600/15' },
      { name: '中田裕紀', url: 'https://yuki-nakata.org/', color: 'from-slate-700/30 to-slate-500/15' },
      { name: '南田桂吾', url: 'https://keigominamida.com/', color: 'from-gray-700/25 to-gray-500/15' }
    ].sort(() => Math.random() - 0.5);
  }, []);

  const [currentFrame, setCurrentFrame] = useState(0);
  const [titleFrame, setTitleFrame] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [bubbles, setBubbles] = useState<{id: number, left: string, size: number, animDuration: number, animDelay: number}[]>([]);
  // 各メンバーのホバー状態管理
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const TOTAL_FRAMES = 47;
  const TITLE_FRAMES = 86;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const element = containerRef.current;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      const visiblePercentage = Math.max(
        0,
        Math.min(
          1,
          (windowHeight - elementTop) / (elementHeight + windowHeight)
        )
      );

      const frame = Math.floor(visiblePercentage * (TOTAL_FRAMES - 1));
      setCurrentFrame(frame);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    let animationFrame: number;
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / 11000;

      const frame = Math.floor((progress % 1) * TITLE_FRAMES);
      setTitleFrame(frame);

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isMounted]);

  // バブルアニメーションの初期化
  useEffect(() => {
    if (isHovered) {
      const newBubbles = Array(10).fill(0).map((_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 10 + 5,
        animDuration: Math.random() * 1 + 0.5,
        animDelay: Math.random() * 0.5
      }));
      setBubbles(newBubbles);
    }
  }, [isHovered]);

  const getTitleImageUrl = (frame: number) => {
    return `/output_reduce/image_${frame.toString().padStart(4, '0')}.png`;
  };

  const getMainImageUrl = (frame: number) => {
    return `/images_reduce/image_${frame.toString().padStart(4, '0')}.png`;
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative">
      {/* オープニングセクション */}
      <section className="relative h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
        {/* 背景アニメーション */}
        <div className="absolute inset-0 opacity-40">
          <img
            src={getTitleImageUrl(titleFrame)}
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>

        {/* タイトルオーバーレイ */}
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 mix-blend-difference">
              Metransfer
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4 mix-blend-difference">
                波、泡沫、鼓動
            </p>
          </motion.div>
        </div>

        {/* スクロールインジケーター */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <p className="text-sm mb-2">Scroll</p>
            <div className="w-6 h-10 border-2 border-white rounded-full mx-auto flex justify-center">
              <div className="w-1 h-2 bg-white rounded-full mt-2">
                <motion.div
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* セパレーター */}
      <div className="h-24 bg-gradient-to-b from-black via-gray-900 to-black" />

      {/* メインアニメーションセクション */}
      <section ref={containerRef} className="h-[300vh] relative">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-black">
          <div className="relative w-full h-full max-w-[90vh] max-h-[90vh] mx-auto">
            <img
              src={getMainImageUrl(currentFrame)}
              alt={`アートフレーム ${currentFrame}`}
              className="w-full h-full object-contain"
            />
          </div>

          {/* テキストオーバーレイ */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-6 text-center">
              {currentFrame < 20 && (
                <div className="text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">波</h2>
                  </motion.div>
                </div>
              )}
              {currentFrame >= 20 && currentFrame < 30 && (
                <div className="text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">泡沫</h2>
                  </motion.div>
                </div>
              )}
              {currentFrame >= 30 && currentFrame < 40 && (
                <div className="text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">鼓動</h2>
                  </motion.div>
                </div>
              )}
              {currentFrame >= 40 && (
                <div className="text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">鼓動</h2>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 作品説明セクション */}
      <section className="bg-gradient-to-b from-black to-gray-900 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-16">
            <div className="text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">作品について</h2>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                    波打つ液体から泡沫を高速に飛び立たせることで、目の前に立体物を実体化する。そして、一瞬にして消滅させる。このように液体と泡沫を行き来して、次々と異なる立体物として形を現しては崩してを繰り返す、メタモルフォーゼする。このとめどない変身が多様な律動を刻み心を揺さぶる鼓動感を生みだす。
                </p>
              </motion.div>
            </div>

            <div className="text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-10">メンバー</h2>

                {/* シャボン玉風のメンバー表示 */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                  {memberInfos.map((member, index) => (
                    <div
                      key={index}
                      className="relative opacity-0 scale-90 animate-fadeIn"
                      style={{
                        animationDelay: `${index * 0.2}s`,
                        animationFillMode: 'forwards'
                      }}
                    >
                      <a
                        href={member.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                        onMouseEnter={() => setHoveredMember(index)}
                        onMouseLeave={() => setHoveredMember(null)}
                      >
                        {/* シャボン玉の外側 */}
                        <div className={`relative w-32 h-32 md:w-36 md:h-36 rounded-full p-[2px] transition-all duration-500 ${hoveredMember === index ? 'scale-110' : ''}`}>
                          {/* 虹色の枠線 */}
                          <div className="absolute inset-0 rounded-full opacity-50 bg-gradient-to-r from-slate-500/30 via-blue-500/20 to-indigo-500/30 animate-slowspin" />

                          {/* シャボン玉の内側 */}
                          <div className={`relative w-full h-full rounded-full bg-gradient-to-br ${member.color} backdrop-blur-sm flex items-center justify-center overflow-hidden`}>
                            {/* シャボン玉内の光沢エフェクト */}
                            <div className="absolute top-0 left-0 w-full h-full">
                              <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-white/10 blur-md" />
                              <div className="absolute bottom-0 right-0 w-1/4 h-1/4 rounded-full bg-white/10 blur-sm" />
                            </div>

                            {/* 名前 */}
                            <div className="relative z-10 text-center">
                              <p className="text-white font-medium text-lg md:text-xl">{member.name}</p>
                            </div>

                            {/* ホバー時の泡アニメーション */}
                            {hoveredMember === index && (
                              <div className="absolute inset-0 overflow-hidden">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className="absolute rounded-full bg-white/15"
                                    style={{
                                      width: Math.random() * 8 + 4,
                                      height: Math.random() * 8 + 4,
                                      left: `${Math.random() * 100}%`,
                                      bottom: "0",
                                      animation: `bubbleRise ${Math.random() * 1.5 + 1}s ease-out infinite`
                                    }}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* フッターセクション */}
      <footer className="bg-black py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Metransfer</h2>

          {/* 4ZIGENへ戻るボタン */}
          <div className="mb-10">
            <div
              className="inline-block"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <a
                href="https://4zigenhp.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative px-8 py-3 overflow-hidden rounded-full border border-white/20 bg-black/50 backdrop-blur-sm transition-transform duration-300 hover:scale-105"
              >
                <span className="relative z-10 text-white font-medium">4ZIGEN</span>

                {/* 波のアニメーション */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 overflow-hidden transition-all duration-500 ease-out"
                  style={{
                    opacity: isHovered ? 0.6 : 0,
                    transform: `translateY(${isHovered ? '0%' : '100%'})`,
                  }}
                />

                {/* 泡のアニメーション */}
                {isHovered && (
                  <div className="absolute inset-0 overflow-hidden">
                    {bubbles.map((bubble) => (
                      <div
                        key={bubble.id}
                        className="absolute rounded-full bg-white/30 backdrop-blur-sm animate-bubble"
                        style={{
                          width: bubble.size,
                          height: bubble.size,
                          left: bubble.left,
                          bottom: "-20px",
                          animation: `bubble ${bubble.animDuration}s ease-out ${bubble.animDelay}s infinite`
                        }}
                      />
                    ))}
                  </div>
                )}
              </a>
            </div>
          </div>

          <p className="text-sm md:text-base text-gray-400">© {new Date().getFullYear()} Metransfer. All rights reserved.</p>
        </div>
      </footer>

      {/* アニメーション用のスタイル */}
      <style jsx>{`
        @keyframes bubble {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-60px) scale(1.5);
            opacity: 0;
          }
        }

        @keyframes bubbleRise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.5;
          }
          100% {
            transform: translateY(-30px) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes slowspin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slowspin {
          animation: slowspin 15s linear infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ArtShowcase;