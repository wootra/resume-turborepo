import fs from 'node:fs/promises';
import {
    LeftContents,
    TopContents,
    RightContents,
} from 'common-data/data/resume-data.js';

fs.writeFile(
    'result.json',
    JSON.stringify({
        ...LeftContents,
        ...TopContents,
        ...RightContents,
    })
);
