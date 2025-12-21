INSERT INTO
  skill_users (
    user_id,
    skill_id,
    level,
    sort_order
  )
SELECT
  1 as user_id,
  skill_id,
  CASE
  -- Expert level - tecnologías principales
    WHEN name IN (
      'TypeScript',
      'JavaScript',
      'NestJS',
      'Next.js',
      'React',
      'Node.js',
      'PostgreSQL',
      'Prisma',
      'GraphQL'
    ) THEN 'EXPERT'
    -- Advanced level - tecnologías que usas frecuentemente
    WHEN name IN (
      'Docker',
      'Git',
      'GitHub',
      'REST API',
      'HTML',
      'CSS',
      'Tailwind CSS',
      'Express.js',
      'Redis',
      'VS Code',
      'Linux',
      'Bash'
    ) THEN 'ADVANCED'
    -- Intermediate level - tecnologías complementarias
    WHEN name IN (
      'MongoDB',
      'DigitalOcean',
      'Nginx',
      'CI/CD',
      'Jest',
      'ESLint',
      'Prettier',
      'Python',
      'Socket.io',
      'Kubernetes'
    ) THEN 'INTERMEDIATE'
    -- Beginner level - tecnologías explorando
    WHEN name IN (
      'AWS',
      'TensorFlow',
      'Go',
      'Rust'
    ) THEN 'BEGINNER'
  END as level,
  ROW_NUMBER() OVER (
    ORDER BY
      CASE
        WHEN name IN (
          'TypeScript',
          'JavaScript',
          'NestJS',
          'Next.js',
          'React',
          'Node.js',
          'PostgreSQL',
          'Prisma',
          'GraphQL'
        ) THEN 1
        WHEN name IN (
          'Docker',
          'Git',
          'GitHub',
          'REST API',
          'HTML',
          'CSS',
          'Tailwind CSS',
          'Express.js',
          'Redis',
          'VS Code',
          'Linux',
          'Bash'
        ) THEN 2
        WHEN name IN (
          'MongoDB',
          'DigitalOcean',
          'Nginx',
          'CI/CD',
          'Jest',
          'ESLint',
          'Prettier',
          'Python',
          'Socket.io',
          'Kubernetes'
        ) THEN 3
        WHEN name IN (
          'AWS',
          'TensorFlow',
          'Go',
          'Rust'
        ) THEN 4
      END,
      name
  ) - 1 as sort_order
FROM
  skills
WHERE
  name IN (
    -- Core Stack (EXPERT)
    'TypeScript',
    'JavaScript',
    'NestJS',
    'Next.js',
    'React',
    'Node.js',
    'PostgreSQL',
    'Prisma',
    'GraphQL',
    -- Tools & Infrastructure (ADVANCED)
    'Docker',
    'Git',
    'GitHub',
    'REST API',
    'HTML',
    'CSS',
    'Tailwind CSS',
    'Express.js',
    'Redis',
    'VS Code',
    'Linux',
    'Bash',
    -- Complementary (INTERMEDIATE)
    'MongoDB',
    'DigitalOcean',
    'Nginx',
    'CI/CD',
    'Jest',
    'ESLint',
    'Prettier',
    'Python',
    'Socket.io',
    'Kubernetes',
    -- Learning (BEGINNER)
    'AWS',
    'TensorFlow',
    'Go',
    'Rust'
  );