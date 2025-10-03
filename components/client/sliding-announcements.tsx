"use client";

import { motion } from "framer-motion";
import { CreditCard, Truck } from "lucide-react";
import { memo } from "react";

// Memoized Icon Component
const AnnouncementIcon = memo(({ icon: Icon }: { icon: any }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.4,
      ease: "easeOut",
    }}
  >
    <Icon className="w-4 h-4" />
  </motion.div>
));

AnnouncementIcon.displayName = "AnnouncementIcon";

const ModernSlidingAnnouncement = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[51] overflow-hidden h-10 bg-gradient-to-r from-red-600 to-red-500"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.2,
      }}
    >
      {/* Subtle shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 3,
        }}
      />

      {/* Content */}
      <div className="relative h-full flex justify-center items-center gap-3 px-4">
        {/* Left Icon */}
        <AnnouncementIcon icon={Truck} />

        {/* Main Text */}
        <motion.p
          className="text-center text-sm font-bold text-white drop-shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          التوصيل بالمجان و الدفع عند الإستلام 🎉
        </motion.p>

        {/* Right Icon */}
        <AnnouncementIcon icon={CreditCard} />
      </div>
    </motion.div>
  );
};

export default ModernSlidingAnnouncement;
