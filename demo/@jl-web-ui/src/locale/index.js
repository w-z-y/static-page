import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { getLanguage } from '../util/index';

import zh from './lang/zh';
import zhtw from './lang/zhtw';
import indo from './lang/indo';
import en from './lang/en';

Vue.use(VueI18n);

let lang = getLanguage();

const i18n = new VueI18n({
  locale: lang,
  silentTranslationWarn: true,
  messages: { zh, en, zhtw, indo },
});

export default i18n;
