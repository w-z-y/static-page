# Ai.Markdown Ai 消息 Markdown 文本

表单用于收集用户输入的数据，支持多种表单控件类型、验证规则、布局配置等功能。可以快速构建复杂的表单页面。

## 基本用法

::: demo

````vue
<template>
  <jl-card style="height: 400px">
    <jl-ai.markdown :data="markdownData"> </jl-ai.markdown>
  </jl-card>

  <jl-form.input type="textarea" v-model="markdownData" :rows="10" style="margin-top: 10px"></jl-form.input>
</template>

<script>
const list = [];
export default {
  data() {
    return {
      markdownData:
        '# 代码块\n```js\nconst a = 1\n```\n# Mermaid语法 \n```mermaid\ngraph LR\n  A[Hard edge]-->|Link text|B(Round edge)\n  B-->C{Decision}\n  C-->|One|D[Result one]\n  C-->|Two|E[Result two]\n```\n# Details+Summary标签\n<details>\n<summary>Q: 如何安装 Python？</summary>\n\nA:  \n1. 访问 [Python 官网](https://www.python.org)  \n2. 下载对应版本  \n3. 运行安装程序\n</details>\n\n# 引用块\n> 以引用块形式呈现\n\n---\n# 公式\n简单分式：$\\frac{a}{b}$\n复杂分式：$\\dfrac{a}{1 + \\dfrac{1}{b}}$\n\n$$\na^2 + b^2 = c^2\n$$\n\n$$\n\\frac{a}{1 + \\frac{1}{b}}\n$$\n\n$\\frac{a}{1 + \\frac{1}{b}}$ → $\\frac{a}{1 + \\frac{1}{b}}$\n\n$\\dfrac{a}{1 + \\dfrac{1}{b}}$ → $\\dfrac{a}{1 + \\dfrac{1}{b}}$\n# 脚标\n[i:1][i:2][i:999]\n# 列表\n**Advertisement :)**\n\n- **[pica](https://nodeca.github.io/pica/demo/)** - high quality and fast image\n  resize in browser.\n- **[babelfish](https://github.com/nodeca/babelfish/)** - developer friendly\n  i18n with plurals support and easy syntax.\n# Echarts图表\n```echarts\n{\n  "title": {\n    "text": "示例图表",\n    "subtext": "ECharts 配置示例",\n    "left": "center"\n  },\n  "tooltip": {\n    "trigger": "item"\n  },\n  "legend": {\n    "orient": "vertical",\n    "left": "left"\n  },\n  "series": [\n    {\n      "name": "访问来源",\n      "type": "pie",\n      "radius": "50%",\n      "data": [\n        { "value": 1048, "name": "搜索引擎" },\n        { "value": 735, "name": "直接访问" },\n        { "value": 580, "name": "邮件营销" },\n        { "value": 484, "name": "联盟广告" },\n        { "value": 300, "name": "视频广告" }\n      ],\n      "emphasis": {\n        "itemStyle": {\n          "shadowBlur": 10,\n          "shadowOffsetX": 0,\n          "shadowColor": "rgba(0, 0, 0, 0.5)"\n        }\n      }\n    }\n  ]\n}\n```\n\n## You will like those projects!\n\n# h1 Heading 8-)\n\n## h2 Heading\n\n### h3 Heading\n\n#### h4 Heading\n\n##### h5 Heading\n\n###### h6 Heading\n\n[1]reference1\n[2]reference2\n[3]reference3\n\n## Horizontal Rules\n\n---\n\n---\n\n---\n\n## Typographic replacements\n\nEnable typographer option to see result.\n\n(c) (C) (r) (R) (tm) (TM) (p) (P) +-\n\ntest.. test... test..... test?..... test!....\n\n!!!!!! ???? ,, -- ---\n\n"Smartypants, double quotes" and \'single quotes\'\n\n## Emphasis\n\n**This is bold text**\n\n**This is bold text**\n\n_This is italic text_\n\n_This is italic text_\n\n~~Strikethrough~~\n\n## Blockquotes\n\n> Blockquotes can also be nested...\n>\n> > ...by using additional greater-than signs right next to each other...\n> >\n> > > ...or with spaces between arrows.\n\n## Lists\n\nUnordered\n\n- Create a list by starting a line with \`+\`, \`-\`, or \`*\`\n- Sub-lists are made by indenting 2 spaces:\n  - Marker character change forces new list start:\n    - Ac tristique libero volutpat at\n    * Facilisis in pretium nisl aliquet\n    - Nulla volutpat aliquam velit\n- Very easy!\n\nOrdered\n\n1. Lorem ipsum dolor sit amet\n2. Consectetur adipiscing elit\n3. Integer molestie lorem at massa\n\n1) You can use sequential numbers...\n1) ...or keep all the numbers as \`1.\`\n\nStart numbering with offset:\n\n57. foo\n1. bar\n\n## Code\n\nInline \`code\`\n\nIndented code\n\n    // Some comments\n    line 1 of code\n    line 2 of code\n    line 3 of code\n\nBlock code "fences"\n\n\\`\\`\\`\nSample text here...\n\\`\\`\\`\n\nSyntax highlighting\n\n\\`\\`\\`js\nvar foo = function(bar) {\n  return bar++;\n};\n\nconsole.log(foo(5));\n\\`\\`\\`\n\n## Tables\n\n| Option | Description |\n| ------ | ----------- |\n| data   | path to data files to supply the data that will be passed into templates. |\n| engine | engine to be used for processing templates. Handlebars is the default. |\n| ext    | extension to be used for dest files. |\n\nRight aligned columns\n\n| Option | Description |\n| -----: | -----------: |\n|   data | path to data files to supply the data that will be passed into templates. |\n| engine |    engine to be used for processing templates. Handlebars is the default. |\n|    ext |                                      extension to be used for dest files. |\n\n## Links\n\n[link text](http://dev.nodeca.com)\n\n[link with title](http://nodeca.github.io/pica/demo/ \'title text!\')\n\nAutoconverted link https://github.com/nodeca/pica (enable linkify to see)\n\n## Images\n\n![Minion](https://octodex.github.com/images/minion.png)\n![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg \'The Stormtroopocat\')\n\nLike links, Images also have a footnote style syntax\n\n![Alt text][id]\n\nWith a reference later in the document defining the URL location:\n\n[id]: https://octodex.github.com/images/dojocat.jpg \'The Dojocat\'\n\n## Plugins\n\nThe killer feature of \`markdown-it\` is very effective support of\n[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).\n\n### [Emojies](https://github.com/markdown-it/markdown-it-emoji)\n\n> Classic markup: :wink: :cry: :laughing: :yum:\n>\n> Shortcuts (emoticons): :-) :-( 8-) ;)\n\nsee [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.\n\n### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)\n\n- 19^th^\n- H~2~O\n\n### [\\<ins>](https://github.com/markdown-it/markdown-it-ins)\n\n++Inserted text++\n\n### [\\<mark>](https://github.com/markdown-it/markdown-it-mark)\n\n==Marked text==\n\n### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)\n\nFootnote 1 link[^first].\n\nFootnote 2 link[^second].\n\nInline footnote^[Text of inline footnote] definition.\n\nDuplicated footnote reference[^second].\n\n[^first]: Footnote **can have markup**\n\n  and multiple paragraphs.\n\n[^second]: Footnote text.\n\n### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)\n\nTerm 1\n\n: Definition 1\nwith lazy continuation.\n\nTerm 2 with _inline markup_\n\n: Definition 2\n\n        { some code, part of Definition 2 }\n\n    Third paragraph of definition 2.\n\n_Compact style:_\n\nTerm 1\n~ Definition 1\n\nTerm 2\n~ Definition 2a\n~ Definition 2b\n\n### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)\n\nThis is HTML abbreviation example.\n\nIt converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.\n\n\\*[HTML]: Hyper Text Markup Language\n\n### [Custom containers](https://github.com/markdown-it/markdown-it-container)\n\n::: warning\n_here be dragons_\n:::',
    };
  },
};
</script>
````

:::

## 文字加载

::: demo

````vue
<template>
  <jl-button primary @click="loadMarkdownData">重新加载</jl-button>

  <jl-card style="height: 400px">
    <jl-ai.markdown :data="markdownData"> </jl-ai.markdown>
  </jl-card>

  <jl-form.input type="textarea" v-model="markdownData" :rows="10" style="margin-top: 10px"></jl-form.input>
</template>

<script>
const list = [];
export default {
  data() {
    return {
      timer: null,
      template:
        '# Mermaid语法 \n```mermaid\n---\ntitle: Example Git diagram\n---\ngitGraph\n   commit\n   commit\n   branch develop\n   checkout develop\n   commit\n   commit\n   checkout main\n   merge develop\n   commit\n   commit\n```',
      markdownData: '',
    };
  },
  mounted() {
    this.loadMarkdownData();
  },
  methods: {
    async loadMarkdownData() {
      this.timer && clearTimeout(this.timer);
      this.markdownData = '';
      const text = this.template;
      for (let i = 0; i < text.length; i++) {
        this.markdownData += text[i];
        // 控制加载速度，可根据需要调整
        await new Promise((resolve) => {
          this.timer = setTimeout(resolve, 20);
        });
      }
    },
  },
};
</script>
````

:::
