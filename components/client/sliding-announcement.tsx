"use client";

import { motion, useAnimation } from "framer-motion";
import { CreditCard, Sparkles, Truck, X } from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";

// Memoized Icon Component
const AnnouncementIcon = memo(
  ({ icon: Icon, delay }: { icon: any; delay: number }) => (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay,
      }}
    >
      <Icon className="w-5 h-5" />
    </motion.div>
  )
);

AnnouncementIcon.displayName = "AnnouncementIcon";

// Memoized Floating Sparkle
const FloatingSparkle = memo(({ index }: { index: number }) => {
  const position = {
    left: `${10 + index * 20}%`,
    top: "50%",
  };

  return (
    <motion.div
      className="absolute -translate-y-1/2"
      style={position}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
        y: [0, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: index * 0.4,
        ease: "easeInOut",
      }}
    >
      <Sparkles className="w-3 h-3 text-yellow-300" />
    </motion.div>
  );
});

FloatingSparkle.displayName = "FloatingSparkle";

const ModernSlidingAnnouncement = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (!isVisible) return;

    const sequence = async () => {
      await controls.start({
        x: ["-100%", "0%"],
        transition: { duration: 0.6, ease: "easeOut" },
      });

      // Gentle pulse animation
      controls.start({
        scale: [1, 1.02, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    };

    sequence();
  }, [controls, isVisible]);

  const handleClose = useCallback(() => {
    controls
      .start({
        x: "-100%",
        opacity: 0,
        transition: { duration: 0.4, ease: "easeIn" },
      })
      .then(() => setIsVisible(false));
  }, [controls]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[51] overflow-hidden h-10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 100%",
        }}
      />

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 2,
        }}
      />

      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[0, 1, 2, 3, 4].map((i) => (
          <FloatingSparkle key={i} index={i} />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative h-full flex justify-center items-center gap-3 px-12"
        animate={controls}
      >
        {/* Left Icon */}
        <AnnouncementIcon icon={Truck} delay={0.3} />

        {/* Main Text */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="text-center text-sm font-bold text-white drop-shadow-md flex items-center gap-2">
            <span className="hidden sm:inline">🎉</span>
            <span>التوصيل بالمجان و الدفع عند الإستلام</span>
            <span className="hidden sm:inline">🎉</span>
          </p>
        </motion.div>

        {/* Right Icon */}
        <AnnouncementIcon icon={CreditCard} delay={0.5} />

        {/* Close button */}
        <motion.button
          onClick={handleClose}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200 backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0.7 }}
          aria-label="إغلاق الإعلان"
        >
          <X className="w-4 h-4 text-white" />
        </motion.button>
      </motion.div>

      {/* Bottom border accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-300 to-transparent"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default ModernSlidingAnnouncement;
