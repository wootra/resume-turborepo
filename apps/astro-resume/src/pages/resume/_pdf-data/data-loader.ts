import data from './after-change.json';

import { RightContents, LeftContents, TopContents } from 'common-data';

const combined = {
    ...LeftContents,
    ...TopContents,
    ...RightContents,
};

const loadedData = data.Careers ? data : combined;

export default loadedData;
