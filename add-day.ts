import { writeFileSync, existsSync, mkdirSync, readdirSync, readFileSync } from 'fs';

const year = process.env.YEAR || process.argv[2];
const day = process.env.DAY || process.argv[3];
const dirPath = `src/${year}/${day.padStart(2, '0')}`;
const templatesDir = 'templates/day';

if (existsSync(dirPath)) {
  console.error(`❌ ${dirPath} already exists.`);
} else if (!day || !year) {
  !year && console.error('😩 No year provided.');
  !day && console.error('😩 No day provided.');
} else {
  mkdirSync(dirPath, { recursive: true });
  readdirSync(templatesDir).forEach((fileName) => {
    const content = readFileSync(`${templatesDir}/${fileName}`, 'utf8')
      .replace('${YEAR}', year)
      .replace('${DAY}', day.padStart(2, '0'));
    writeFileSync(`${dirPath}/${fileName.replace('.template', '')}`, content);
  });

  console.log(
    `✅ Done!\n\n${readdirSync(dirPath)
      .map((fileName) => `${dirPath}/${fileName}`)
      .join('\n')}`
  );
}
