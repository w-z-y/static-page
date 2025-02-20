<template>
  <div id="app">
    <EditorContent v-model="defaultContent" />
    <!-- <div>
      {{ defaultContent }}
    </div> -->
  </div>
</template>

<script>
import EditorContent from './components/EditorContent.vue'

export default {
  name: 'App',
  components: {
    EditorContent
  },
  data() {
    return {
      defaultContent: `
        <p>I'm running Tiptap with Vue.js. 🎉</p>
        <img src="https://placehold.co/200x100" />
        <h3>
          Have you seen our tables? They are amazing!
        </h3>
        <ul>
          <li>Tables with rows, cells and headers (optional)</li>
          <li>Support for <code>colgroup</code> and <code>rowspan</code></li>
          <li>And even resizable columns (optional)</li>
        </ul>
        <p>
          Here is an example:
        </p>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
            <tr>
              <td>Marie Curie</td>
              <td>Scientist</td>
              <td>Chemist</td>
              <td>Physicist</td>
            </tr>
            <tr>
              <td>Indira Gandhi</td>
              <td>Prime minister</td>
              <td colspan="2">Politician</td>
            </tr>
          </tbody>
        </table>
      `
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
</style>
