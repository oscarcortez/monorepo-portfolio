// import { useSearchParams } from 'next/navigation';

// import { useUserPublicData } from '@/src/app/viz/hooks/useUserPublicData';
// import { Payment } from '@/src/app/graphql/generated/graphql';

import Image from 'next/image';

import VizSection from '../_components/viz-section';

// import HeroPayment from './components/HeroPayment';

interface Skill {
  technology: string;
  icon: string; // ruta al logo, e.g. '/icons/js.svg'
  url?: string; // sitio o doc oficial
  level: 'Expert' | 'Active' | 'Trained' | 'Familiar';
  area: 'Frontend' | 'Backend' | 'DevOps' | 'Data Engineering' | 'Data Analytics';
}
export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <a
      href={skill.url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-xl shadow p-4 flex items-center justify-between bg-slate-800 hover:bg-slate-700 transition group"
    >
      <div>
        <h3 className="font-semibold text-lg text-slate-100 group-hover:text-amber-400">{skill.technology}</h3>
        <p className="text-slate-400 text-sm">{skill.area}</p>
        <p className="text-xs text-slate-500">{skill.level}</p>
      </div>

      <div className="flex items-center justify-center w-12 h-12 bg-white/5 rounded">
        <Image src={skill.icon} alt={skill.technology} width={24} height={24} />
      </div>
    </a>
  );
}

const skills: Skill[] = [
  {
    technology: 'Postgres',
    icon: '/svg/tech-stack/postgresIcon.svg',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    level: 'Expert',
    area: 'Frontend',
  },
  {
    technology: 'React',
    icon: '/svg/tech-stack/reactIcon.svg',
    url: 'https://react.dev/',
    level: 'Active',
    area: 'Frontend',
  },
  {
    technology: 'Node.js',
    icon: '/svg/tech-stack/postgresIcon.svg',
    url: 'https://nodejs.org/',
    level: 'Trained',
    area: 'Backend',
  },
  {
    technology: 'Docker',
    icon: '/svg/tech-stack/postgresIcon.svg',
    url: 'https://www.docker.com/',
    level: 'Familiar',
    area: 'DevOps',
  },
];

export default function SkillsSection() {
  return (
    <VizSection title="SKILLS" description="Manage your skills and expertise.">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {skills.map((skill, i) => (
          <SkillCard key={i} skill={skill} />
        ))}
      </div>
    </VizSection>
  );
}
