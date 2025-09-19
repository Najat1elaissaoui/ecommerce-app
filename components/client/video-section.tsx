"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { colors } from "@/lib/colors"

export default function VideoSection() {
  return (
    <section className="w-full py-20 bg-white text-gray-900">
      <div className="container mx-auto px-4">
        
        {/* Section header */}
        <div className="text-center mb-12">
          <Badge 
            className="mb-4 px-4 py-2 text-sm font-semibold bg-orange-100 text-orange-600 border border-orange-300"
          >
            🎥 CONTENU VIDÉO EXCLUSIF
          </Badge>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Guides
            <span className="block" style={{ color: colors.primary.orange }}>
              & Techniques
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Maîtrisez l'art de la supplémentation avec nos guides vidéo exclusifs réalisés par des experts.
          </p>
        </div>

        {/* Video container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
        >
          <div className="relative aspect-video">
            <iframe
              src="https://www.youtube.com/embed/tg7Ui-DieTg?si=fqA_81RG-3F8Xn7E"
              title="Guide Vidéo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-3xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
