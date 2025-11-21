'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Users } from 'lucide-react';

interface Skill {
  name: string;
  level: 'expert' | 'experienced' | 'experimented';
}

const TechSkills: Skill[] = [
  { name: 'React', level: 'expert' },
  { name: 'TypeScript', level: 'expert' },
  { name: 'Next.js', level: 'expert' },
  { name: 'Tailwind CSS', level: 'expert' },
  { name: 'Node.js', level: 'experienced' },
  { name: 'PostgreSQL', level: 'experienced' },
  { name: 'GraphQL', level: 'experienced' },
  { name: 'Docker', level: 'experimented' },
];

const SoftSkills: Skill[] = [
  { name: 'Communication', level: 'expert' },
  { name: 'Problem Solving', level: 'expert' },
  { name: 'Team Leadership', level: 'experienced' },
  { name: 'Project Management', level: 'experienced' },
  { name: 'Adaptability', level: 'expert' },
  { name: 'Critical Thinking', level: 'expert' },
];

const LevelBadge = ({ level }: { level: 'expert' | 'experienced' | 'experimented' }) => {
  const styles = {
    expert: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    experienced: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    experimented: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  };

  const labels = {
    expert: 'Expert',
    experienced: 'Experienced',
    experimented: 'Experimented',
  };

  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[level]}`}>
      {labels[level]}
    </span>
  );
};

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState<'tech' | 'soft'>('tech');

  const skills = activeTab === 'tech' ? TechSkills : SoftSkills;
  const icon = activeTab === 'tech' ? Code2 : Users;

  return (
    <section className="min-h-screen py-20 px-4 md:px-8 dark flex flex-col items-center justify-center">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-foreground mb-4 text-balance">
            Mi Stack de <span className="text-primary">Habilidades</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Combino habilidades técnicas con competencias blandas para entregar soluciones innovadoras
          </p>
        </motion.div>

        {/* Tab Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setActiveTab('tech')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'tech'
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                : 'bg-card text-foreground border border-border hover:border-primary'
            }`}
          >
            <Code2 size={20} />
            Tech Skills
          </button>
          <button
            onClick={() => setActiveTab('soft')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'soft'
                ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
                : 'bg-card text-foreground border border-border hover:border-accent'
            }`}
          >
            <Users size={20} />
            Soft Skills
          </button>
        </motion.div>

        <motion.div layout className="flex flex-wrap justify-center gap-3">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="bg-card border border-border rounded-lg px-4 py-2.5 hover:border-primary transition-colors duration-300 flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{skill.name}</span>
                <LevelBadge level={skill.level} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 mt-16 text-center"
        >
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="text-3xl font-bold text-emerald-400 mb-2">
              {skills.filter((s) => s.level === 'expert').length}
            </div>
            <div className="text-sm text-muted-foreground">Expert</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {skills.filter((s) => s.level === 'experienced').length}
            </div>
            <div className="text-sm text-muted-foreground">Experienced</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="text-3xl font-bold text-amber-400 mb-2">
              {skills.filter((s) => s.level === 'experimented').length}
            </div>
            <div className="text-sm text-muted-foreground">Experimented</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
