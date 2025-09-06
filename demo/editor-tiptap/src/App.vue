<template>
  <div id="app">
    <MyEditor v-model="defaultContent" />
    <!-- {{ defaultContent }} -->
  </div>
</template>

<script>
import MyEditor from './components/Editor'

export default {
  name: 'App',
  components: {
    MyEditor
  },
  data() {
    return {
      defaultContent: `<p>I'm running Tiptap with Vue.js. 🎉</p><img src="https://placehold.co/200x100"><h3>Have you seen our tables? They are amazing! <span class="is-self mention" data-type="mention" data-id="wzy" data-mention-suggestion-char="@">wzy</span> <span class="mention" data-type="mention" data-id="zyy" data-mention-suggestion-char="@">zyy</span> </h3><ul><li><p>Tables with rows, cells and headers (optional)</p></li><li><p>Support for <code>colgroup</code> and <code>rowspan</code></p></li><li><p>And even resizable columns (optional)</p><pre><code class="language-js">const a = 1</code></pre></li></ul><p>Here is an example:</p><table style="min-width: 100px;"><colgroup><col style="min-width: 25px;"><col style="min-width: 25px;"><col style="min-width: 25px;"><col style="min-width: 25px;"></colgroup><tbody><tr><th colspan="1" rowspan="1"><p>Name</p></th><th colspan="3" rowspan="1"><p>Description</p></th></tr><tr><td colspan="1" rowspan="1" style=""><p>Cyndi Lauper</p></td><td colspan="1" rowspan="1" style=""><p>Singer</p></td><td colspan="1" rowspan="1" style=""><p>Songwriter</p></td><td colspan="1" rowspan="1" style=""><p>Actress</p></td></tr><tr><td colspan="1" rowspan="1" style=""><p>Marie Curie</p></td><td colspan="1" rowspan="1" style=""><p>Scientist</p></td><td colspan="1" rowspan="1" style=""><p>Chemist</p></td><td colspan="1" rowspan="1" style=""><p>Physicist</p></td></tr><tr><td colspan="1" rowspan="1" style=""><p>Indira Gandhi</p></td><td colspan="1" rowspan="1" style=""><p>Prime minister</p></td><td colspan="2" rowspan="1" style=""><p>Politician</p></td></tr></tbody></table>`
    }
  }
}
</script>

<style>
:root {
  --white: #FFF;
  --black: #2E2B29;
  --black-contrast: #110F0E;
  --gray-1: #3d25140d;
  --gray-2: rgba(61, 37, 20, .08);
  --gray-3: rgba(61, 37, 20, .12);
  --gray-4: rgba(53, 38, 28, .3);
  --gray-5: rgba(28, 25, 23, .6);
  --green: #22C55E;
  --purple: #6A00F5;
  --purple-contrast: #5800CC;
  --purple-light: rgba(88, 5, 255, .05);
  --yellow-contrast: #FACC15;
  --yellow: rgba(250, 204, 21, .4);
  --yellow-light: #FFFAE5;
  --red: #FF5C33;
  --red-light: #FFEBE5;
  --shadow: 0px 12px 33px 0px rgba(0, 0, 0, .06), 0px 3.618px 9.949px 0px rgba(0, 0, 0, .04)
}

table,
tr,
th,
td {
  border: 1px solid
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
</style>
