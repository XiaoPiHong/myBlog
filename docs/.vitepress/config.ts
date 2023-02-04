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
        text: "前端工程化",
        collapsible: true,
        items: [
          { text: "vite", link: "/engineering/engineering-vite" },
          {
            text: "vuecli5+vue2+ts",
            link: "/engineering/engineering-vuecli5-vue2-ts",
          },
          {
            text: "vite-vue3-ts",
            link: "/engineering/engineering-vite-vue3-ts",
          },
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
      {
        text: "Http",
        collapsible: true,
        items: [
          { text: "jsonp", link: "/http/http-jsonp" },
          { text: "Http缓存", link: "/http/http-cache" },
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
        text: "原型",
        collapsible: true,
        items: [
          { text: "原型与原型链", link: "/prototype/prototype-prototypeChain" },
          { text: "继承", link: "/prototype/prototype-extend" },
        ],
      },
      {
        text: "服务器",
        collapsible: true,
        items: [{ text: "部署生产环境", link: "/server/server-install" }],
      },
      {
        text: "其他",
        collapsible: true,
        items: [
          { text: "script标签执行顺序", link: "/other/other-script" },
          { text: "git使用", link: "/other/other-git" },
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
