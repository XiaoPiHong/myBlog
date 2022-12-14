import { defineConfig } from "vitepress";
import markdownItMathjax3 from "markdown-it-mathjax3";

export default defineConfig({
  title: "XiaoPiHong 的博客",
  description: "一个博客网站",
  lang: "zh-CN",
  base: "/myBlog",
  themeConfig: {
    logo: "/logo.svg",
    outline: "deep",
    nav: [],
    sidebar: [
      {
        text: "模块化",
        collapsible: true,
        items: [
          { text: "理解模块化", link: "/module/modular-specification" },
          { text: "模块化与组件化", link: "/module/modular-componentization" },
        ],
      },
      {
        text: "原型",
        collapsible: true,
        items: [
          { text: "原型与原型链", link: "/prototype/prototype-prototypeChain" },
        ],
      },
      {
        text: "文件",
        collapsible: true,
        items: [
          { text: "文件操作", link: "/file/file-operation" },
          { text: "文件下载", link: "/file/file-download" },
        ],
      },
      {
        text: "Vue",
        collapsible: true,
        items: [
          { text: "vue2.x双向绑定原理", link: "/vue/vue-vue2-principle" },
          { text: "vue3.x双向绑定原理", link: "/vue/vue-vue3-principle" },
          { text: "样式穿透", link: "/vue/vue-deep" },
        ],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/XiaoPiHong" }],
    editLink: {
      pattern: "https://github.com/XiaoPiHong/myBlog/edit/master/docs/:path",
      text: "在 GitHub 编辑此页",
    },
  },
  markdown: {
    config: (md) => {
      md.use(markdownItMathjax3);
    },
  },
});
