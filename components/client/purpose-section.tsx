"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function PurposeSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-3 min-h-[420px]">
        
        {/* Left Section - Red with Goli branding */}
        <motion.div 
          className="relative bg-[#D72638] flex flex-col justify-center items-center text-center px-8 py-16 lg:py-20"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Goli Logo & Text */}
          <div className="z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <h1 className="text-white text-6xl font-bold tracking-tight">goli</h1>
              <span className="bg-white text-[#D72638] text-sm font-bold px-3 py-1 rounded-full mt-1 inline-block">
                FOR GOOD
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white text-xl lg:text-2xl font-semibold mb-6 max-w-md"
            >
              At the core of it all, we lead with purpose.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-black text-white px-6 py-3 text-base font-semibold hover:bg-gray-900 transition"
            >
              LEARN MORE
            </motion.button>
          </div>

          {/* Girl Image */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
            <Image
              src="/footer.png"
              alt="Happy girl"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </motion.div>

        {/* Middle Section - Turquoise with Vitamin Angels */}
        <motion.div 
          className="bg-[#007D8C] flex justify-center items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4">
            <Image src="/vitamin-angels-logo.png" alt="Vitamin Angels" width={50} height={50} />
            <span className="text-white text-2xl font-bold">vitamin angels</span>
          </div>
        </motion.div>

        {/* Right Section - Dark Green with Eden Reforestation */}
        <motion.div 
          className="bg-[#143B2D] flex justify-center items-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center text-white">
            <Image src="/eden-logo.png" alt="Eden Reforestation Projects" width={80} height={50} className="mb-2" />
            <p className="text-sm tracking-wide opacity-90">PLANT TREES | SAVE LIVES</p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
