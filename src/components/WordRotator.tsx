import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import styles from './WordRotator.module.scss';

import LoveEmoji from '../assets/twemoji/1f970.svg';

const ROTATE_MS = 3000;
const ENTRANCE_MS = 600;

export default function WordRotator() {
  const words = ['TypeScript', 'React', 'Laravel', 'Minecraft', 'Docker'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let intervalId: number | undefined;
    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setIndex((prev) => (prev + 1) % words.length);
      }, ROTATE_MS);
    }, ENTRANCE_MS);
    return () => {
      window.clearTimeout(startId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, []);

  const currentWord = words[index];
  const characters = currentWord.split('');

  return (
    <motion.div
      layout
      className={styles.wordContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <motion.span layout className={styles.staticWord}>
        I love
      </motion.span>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={words[index]}
          className={styles.animatedContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {characters.map((char, i) => (
            <motion.span
              key={`${index}-${i}`}
              className={styles.animatedWord}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.04,
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
      <motion.div
        layout
        className={styles.loveEmojiContainer}
      >
        <img src={LoveEmoji.src} className="emoji" alt="Love Emoji" />
      </motion.div>
    </motion.div>
  );
}
