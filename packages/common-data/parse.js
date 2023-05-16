import jsonc from 'jsonc-parser';
import fs from 'fs';

fs.readdirSync('./source').forEach(file => {
    const content = fs.readFileSync(`./source/${file}`, 'utf8');
    let parsed;
    if (file.endsWith('.jsonc')) {
        parsed = jsonc.parse(content);
        fs.writeFileSync(
            `./parsed/${file.replace('.jsonc', '.json')}`,
            JSON.stringify(parsed, null, 4)
        );
    } else {
        parsed = content;
        fs.writeFileSync(`./parsed/${file}`, parsed);
    }
});
