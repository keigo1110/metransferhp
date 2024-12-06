'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const ArtShowcase = () => {
  const members = useMemo(() => {
    return ['岡空来', '金澤政宜', '中田裕紀', '南田桂吾']
      .sort(() => Math.random() - 0.5);
  }, []);

  const [currentFrame, setCurrentFrame] = useState(0);
  const [titleFrame, setTitleFrame] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
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
                <h2 className="text-3xl md:text-4xl font-bold mb-6">メンバー</h2>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                {members.join(' / ')}
                </p>
            </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* フッターセクション */}
      <footer className="bg-black py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Metransfer</h2>
          <p className="text-sm md:text-base text-gray-400">© 2024 Metransfer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ArtShowcase;