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
    search: {
      provider: "local",
    },
    sidebar: [
      {
        text: "模块化",
        collapsed: false,
        items: [
          { text: "理解模块化", link: "/module/modular-specification" },
          { text: "模块化与组件化", link: "/module/modular-componentization" },
        ],
      },
      {
        text: "前端工程化",
        collapsed: false,
        items: [
          // { text: "vite", link: "/engineering/engineering-vite" },
          {
            text: "vuecli5+vue2+ts",
            link: "/engineering/engineering-vuecli5-vue2-ts",
          },
          {
            text: "vite+vue3+ts",
            link: "/engineering/engineering-vite-vue3-ts",
          },
          {
            text: "vite+react18+ts",
            link: "/engineering/engineering-vite-react18-ts",
          },
        ],
      },
      {
        text: "Vue",
        collapsed: false,
        items: [
          { text: "vue2.x双向绑定原理", link: "/vue/vue-vue2-principle" },
          { text: "vue3.x双向绑定原理", link: "/vue/vue-vue3-principle" },
          { text: "样式穿透 & scoped", link: "/vue/vue-deep" },
        ],
      },
      {
        text: "TypeScript",
        collapsed: false,
        items: [
          { text: "interface", link: "/typescript/typescript-interface" },
          { text: "type", link: "/typescript/typescript-type" },
        ],
      },
      {
        text: "Http",
        collapsed: false,
        items: [
          { text: "jsonp", link: "/http/http-jsonp" },
          // { text: "Http缓存", link: "/http/http-cache" },
        ],
      },
      {
        text: "文件",
        collapsed: false,
        items: [
          { text: "文件操作", link: "/file/file-operation" },
          { text: "文件下载", link: "/file/file-download" },
        ],
      },
      {
        text: "JavaScript",
        collapsed: false,
        items: [
          {
            text: "ECMAScript",
            collapsed: false,
            items: [
              { text: "迭代器", link: "/js/es/es-iterator" },
              { text: "生成器", link: "/js/es/es-generator" },
              {
                text: "原型与原型链",
                link: "/js/es/es-prototypeChain",
              },
              { text: "继承", link: "/js/es/es-extend" },
            ],
          },
          {
            text: "Document Object Model",
            collapsed: false,
            items: [{ text: "script标签", link: "/js/dom/dom-script" }],
          },
        ],
      },
      {
        text: "服务器",
        collapsed: false,
        items: [{ text: "部署生产环境", link: "/server/server-install" }],
      },
      {
        text: "其他",
        collapsed: false,
        items: [{ text: "git使用", link: "/other/other-git" }],
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
