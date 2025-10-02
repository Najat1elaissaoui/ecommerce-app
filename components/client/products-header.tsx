"use client";

import { Input } from "@/components/ui/input";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { memo, useCallback, useMemo } from "react";

interface ProductsHeaderProps {
  viewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
  onSearchChange?: (value: string) => void;
}

// Memoized Sparkle component
const Sparkle = memo(({ index }: { index: number }) => {
  const position = useMemo(
    () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }),
    []
  );

  const animation = useMemo(
    () => ({
      y: [0, -20, 0],
      opacity: [0.3, 1, 0.3],
      scale: [0.8, 1.5, 0.8],
      rotate: [0, 180, 360],
    }),
    []
  );

  const transition = useMemo(
    () => ({
      duration: 2 + Math.random() * 2,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: Math.random() * 2,
    }),
    []
  );

  return (
    <motion.div
      className="absolute w-1 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
      style={position}
      animate={animation}
      transition={transition}
    />
  );
});

Sparkle.displayName = "Sparkle";

// Memoized Sparkles Icon
const AnimatedSparklesIcon = memo(() => (
  <motion.div
    className="absolute -top-4 -right-4 z-30"
    animate={{
      rotate: [0, 10, -10, 0],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
    }}
  >
    <Sparkles className="w-8 h-8 text-yellow-400 drop-shadow-lg" />
  </motion.div>
));

AnimatedSparklesIcon.displayName = "AnimatedSparklesIcon";

export default function ModernProductsHeader({
  viewMode = "grid",
  onViewModeChange,
  onSearchChange,
}: ProductsHeaderProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Optimized gradient transforms
  const gradientX = useTransform(mouseX, [0, 1000], ["0%", "100%"]);
  const gradientY = useTransform(mouseY, [0, 1000], ["0%", "100%"]);

  // Memoized mouse move handler
  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      const rect = event.currentTarget.getBoundingClientRect();
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  // Memoized search handler with debouncing potential
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange?.(event.target.value);
    },
    [onSearchChange]
  );

  // Animation variants - memoized
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: 60,
        scale: 0.9,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: "spring" as const,
          stiffness: 100,
          damping: 15,
        },
      },
    }),
    []
  );

  // Generate sparkles array once
  const sparkles = useMemo(() => Array.from({ length: 15 }, (_, i) => i), []);

  return (
    <motion.div
      className="mb-8 max-w-7xl mx-auto px-4 relative pt-10"
      onMouseMove={handleMouseMove}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Magical Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating sparkles */}
        {sparkles.map((i) => (
          <Sparkle key={i} index={i} />
        ))}
      </div>

      {/* Page Title */}
      <motion.div
        className="text-center mb-12 relative"
        variants={itemVariants}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl"
          style={{
            x: gradientX,
            y: gradientY,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main title */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-6 relative z-20 leading-tight p-2"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          <motion.span
            className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-extrabold drop-shadow-md px-2"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            كتالوج المنتجات
          </motion.span>

          <AnimatedSparklesIcon />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          اكتشف مجموعتنا الكاملة من المكملات الغذائية عالية الجودة المصممة
          خصيصاً لتحقيق أهدافك الصحية
        </motion.p>
      </motion.div>

      {/* Main Controls Container */}
      <motion.div className="space-y-6" variants={containerVariants}>
        {/* Search Bar - Full Width Centered */}
        <motion.div className="flex justify-center" variants={itemVariants}>
          <motion.div
            className="relative w-full max-w-2xl"
            whileHover={{ scale: 1.02 }}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Search icon */}
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10 pointer-events-none" />

            {/* Search input */}
            <Input
              type="search"
              placeholder="ابحث عن المنتجات، البروتين، الفيتامينات..."
              onChange={handleSearchChange}
              className="pr-12 pl-4 py-6 text-right text-lg rounded-full border-2 border-border focus:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20 shadow-lg backdrop-blur-sm bg-white/90 relative z-10 transition-all duration-300"
              aria-label="بحث عن المنتجات"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
