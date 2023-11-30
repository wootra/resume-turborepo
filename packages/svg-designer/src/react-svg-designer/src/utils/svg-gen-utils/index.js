import * as txtUtils from './txtUtils';
import * as renderUtils from './renderUtils';
import * as maskUtils from './maskUtils';
import * as etcUtils from './etcUtils';
import { pathsFromAbsPts, PathTools } from './pathUtils/pathFromAbsPts';
import { pathUtils } from './pathUtils/pathUtils';

export default {
    pt: etcUtils.pt,
    text: txtUtils,
    path: {
        default: pathUtils,
        pathUtils,
        pathsFromAbsPts,
        PathTools,
    },
    etc: etcUtils,
    mask: maskUtils,
    renderer: renderUtils,
};
