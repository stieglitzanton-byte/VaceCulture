import { loadFont as loadCormorant } from '@remotion/google-fonts/CormorantGaramond';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';

const { fontFamily: cormorant } = loadCormorant('normal', {
  subsets: ['latin'],
  weights: ['300', '400'],
});

const { fontFamily: inter } = loadInter('normal', {
  subsets: ['latin'],
  weights: ['100', '200', '300', '700', '800', '900'],
});

export { cormorant, inter };
