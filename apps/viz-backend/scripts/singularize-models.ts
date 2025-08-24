import * as fs from 'fs';

const schemaPath = 'prisma/schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf8');

// Regex: encuentra los modelos "model Algo {"
schema = schema.replace(/model (\w+) {/g, (_: string, name: string) => {
  if (name.endsWith('s')) {
    const singular = name.slice(0, -1); // quita la última "s"
    return `model ${singular} {`;
  }
  return `model ${name} {`;
});

fs.writeFileSync(schemaPath, schema, 'utf8');
console.log('✅ Modelos singularizados (Users -> User)');
