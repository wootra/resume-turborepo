import {
    pathsFromAbsPts as pathsFromAbsPtsOrg,
    PathTools as PathToolsOrg,
} from './pathFromAbsPts';
import { pathUtils as pathUtilsOrg } from './pathUtils';
import { parse as parseOrg } from './pathParser';

export const pathUtils = pathUtilsOrg;
export const pathsFromAbsPts = pathsFromAbsPtsOrg;
export const PathTools = PathToolsOrg;
export const parse = parseOrg;

export default pathUtils;
