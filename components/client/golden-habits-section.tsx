"use client"

import Image from "next/image"


interface GoldenHabit {
  icon: string // image path
  title: string
  description: string
  color?: string // background color (e.g. 'bg-orange-500' or hex)
}

interface GoldenHabitsSectionProps {
  habits: GoldenHabit[]
  sectionTitle?: string
  colors?: {
    main: string
    light: string
    dark: string
    contrastText: string
  }
}

export default function GoldenHabitsSection({ habits, sectionTitle, colors }: GoldenHabitsSectionProps & { colors?: { main: string, light: string, dark: string, contrastText: string } }) {
  // Couleur principale pour le fond et le badge si non précisé dans habit
  const mainColor = (colors?.main && colors.main.startsWith('#')) ? colors.main : undefined;
  return (
    <section className="py-16 pt-8" style={mainColor ? { background: mainColor + '10' } : { background: '#FFF7ED' }}>
      <div className="container mx-auto px-4">
        {sectionTitle && (
          <h2 className="text-center text-xl md:text-2xl font-bold mb-10" style={mainColor ? { color: colors?.main } : { color: '#F97316' }}>
            {sectionTitle}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {habits.map((habit, idx) => {
            const badgeBg = habit.color || colors?.main || 'bg-orange-500';
            const badgeStyle = badgeBg && badgeBg.startsWith('#') ? { background: badgeBg, color: colors?.contrastText || '#fff' } : {};
            const circleBg = habit.color || colors?.main || 'bg-orange-500';
            const circleStyle = circleBg && circleBg.startsWith('#') ? { background: circleBg + '20' } : {};
            return (
              <div key={idx} className="flex flex-col md:flex-row items-center gap-6">
                <div className={`flex-shrink-0 w-24 h-24 rounded-full flex items-center justify-center relative`} style={circleStyle}>
                  <Image src={habit.icon} alt={habit.title} width={60} height={60} className="object-contain" />
                </div>
                <div>
                  <div className="mb-2">
                    <span className={`inline-block px-4 py-2 rounded font-bold text-sm`} style={badgeStyle}>{habit.title}</span>
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {habit.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
