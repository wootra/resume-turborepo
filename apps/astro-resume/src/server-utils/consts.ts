import * as url from 'url';
// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const robotoRegular =
    __dirname +
    '../../public/assets/fonts/Roboto_Condensed/RobotoCondensed-Regular.ttf';
const robotoBold =
    __dirname +
    '../../public/assets/fonts/Roboto_Condensed/RobotoCondensed-Bold.ttf';
const robotoItalic =
    __dirname +
    '../../public/assets/fonts/Roboto_Condensed/RobotoCondensed-Italic.ttf';
const robotoBoldItalic =
    __dirname +
    '../../public/assets/fonts/Roboto_Condensed/RobotoCondensed-BoldItalic.ttf';
const openSansEmoji =
    __dirname + '../../public/assets/fonts/OpenSansEmoji/OpenSansEmoji.ttf';

export const FONT_DESCRIPTOR = {
    RobotoCondensed: {
        normal: robotoRegular,
        bold: robotoBold,
        italics: robotoItalic,
        bolditalics: robotoBoldItalic,
    },
    Roboto: {
        normal: robotoRegular,
        bold: robotoBold,
        italics: robotoItalic,
        bolditalics: robotoBoldItalic,
    },

    Emoji: {
        // https://en.wikipedia.org/w/index.php?title=Emoji&oldid=557685103#ref_U1F680_as_of_Unicode_version
        normal: openSansEmoji,
        bold: openSansEmoji,
        italics: openSansEmoji,
        bolditalics: openSansEmoji,
    },
};
