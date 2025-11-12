import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from '../../src/store';
import JlWebUiMessageBox from '../../packages/base/MessageBox';

import '../../src/style/shortcuts.scss';
import '../../src/style/variables.scss';
import '../../src/micro-app/ai';

import './styles/index.scss';
export default ({ Vue }) => {
  Vue.prototype.$store = store;
  Vue.prototype.$eventBus = new Vue();
  Vue.use(ElementUI);
  Vue.use(JlWebUiMessageBox);
};
