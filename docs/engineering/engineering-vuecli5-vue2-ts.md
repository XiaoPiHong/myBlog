# vuecli5+vue2+ts 项目搭建

> 此处使用了脚手架来搭建 vue 项目，可节省许多时间。因为官方的 vuecli 脚手架已经集成了很多我们开发时需要依赖，如：loader、插件等，不需要再手动引入，这样我们就可以把更多的时间花在项目的工程化上。你若觉得脚手架搭建的项目过于臃肿，也可以选择手动从 0 开始搭建一个项目。

## 1.全局安装 Vue CLI 脚手架（此处使用的是 cli5.0）

```bash
npm install -g @vue/cli
```

## 2.使用脚手架创建项目，自主选择依赖，创建时选择依赖 vue2.0 scss eslint+prettier ts

注意：代码校验有两种方案： 1.Lint on save：保存即检查 2.Lint and fix on commit： fix 和 commit 的时候才检查

```bash
vue create hello-world
```

## 3.vscode 插件准备

插件：Stylelint、ESLint、Prettier - Code formatter

注意：项目中使用的 eslint、prettier 等依赖可以让开发者在开发的过程中在页面或者终端实时显示代码格式、语法是否有误，但是要想做到保存时自动格式化就要使用到 vscode 的插件了（虽然项目依赖 eslint 的 npm run lint 命令也可以对错误的语法进行修复，但是是针对整个项目的，所以不适用）

工作区插件配置：

```json
{
  "editor.formatOnSave": true, // 保存自动格式化
  "editor.defaultFormatter": "esbenp.prettier-vscode", // 默认的格式化程序是Prettier - Code formatter
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true // 保存时使用stylelint自动格式化样式
  },
  "stylelint.validate": ["css", "scss", "less", "vue"] // 需要stylelint校验的文件
}
```

## 4.配置 prettier 的代码格式化规则（prettier 和 eslint 的规则会存在规则冲突，所以需解决冲突的规则）

项目根目录下创建.prettierrc.js 文件，并插入以下内容，插件和依赖会优先使用该文件的规则进行代码格式化或者代码校验

```javascript
module.exports = {
  semi: false, // 不要末尾分号
  singleQuote: true, // 单引号
  quoteProps: "as-needed", // 不允许围绕非严格要求的对象字面值属性名称进行引号
  trailingComma: "none", // 不要末尾逗号
  endOfLine: "auto", // 维护现有的行结尾
};
```

## 5.规范 git 提交信息

1.安装 commitizen 规范 Git 提交说明
该依赖是一套规则，能够让开发者对代码提交信息统一格式

```bash
npm install -D commitizen -S
```

2.安装 cz-customizable
该依赖能在代码提交前进行信息选择，不用手动填写

```bash
npm install -D cz-customizable -S
```

3.配置 commitizen 使用 cz-customizable 作为插件，在 package.json 中添加下面节点

```json
"config": {
  "commitizen": {
    "path": "node_modules/cz-customizable"
  }
}
此时可以执行 git cz 来进行 commit 看到效果
```

4.项目根目录下创建.cz-config.js 文件（其实就是对 cz-customizable 中默认的模板内容进行中译）
cz-customizable 插件会优先在根目录中查找名为.cz-config.js 或者.config/cz-config.js 的文件作为规范的模板

```javascript
module.exports = {
  // type 类型（定义之后，可通过上下键选择）
  types: [
    { value: "feat", name: "feat: 新增功能" },
    { value: "fix", name: "fix: 修复 bug" },
    { value: "docs", name: "docs: 文档变更" },
    {
      value: "style",
      name: "style: 代码格式（不影响功能，例如空格、分号等格式修正）",
    },
    {
      value: "refactor",
      name: "refactor: 代码重构（不包括 bug 修复、功能新增）",
    },
    { value: "perf", name: "perf: 性能优化" },
    { value: "test", name: "test: 添加、修改测试用例" },
    {
      value: "build",
      name: "build: 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）",
    },
    { value: "ci", name: "ci: 修改 CI 配置、脚本" },
    {
      value: "chore",
      name: "chore: 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）",
    },
    { value: "revert", name: "revert: 回滚 commit" },
  ],

  // scope 类型（定义之后，可通过上下键选择）
  scopes: [
    ["components", "组件相关"],
    ["hooks", "hook 相关"],
    ["utils", "utils 相关"],
    ["element-ui", "对 element-ui 的调整"],
    ["styles", "样式相关"],
    ["deps", "项目依赖"],
    ["auth", "对 auth 修改"],
    ["other", "其他修改"],
    // 如果选择 custom，后面会让你再输入一个自定义的 scope。也可以不设置此项，把后面的 allowCustomScopes 设置为 true
    ["custom", "以上都不是？我要自定义"],
  ].map(([value, description]) => {
    return {
      value,
      name: `${value.padEnd(30)} (${description})`,
    };
  }),

  // 是否允许自定义填写 scope，在 scope 选择的时候，会有 empty 和 custom 可以选择。
  // allowCustomScopes: true,
  // allowTicketNumber: false,
  // isTicketNumberRequired: false,
  // ticketNumberPrefix: 'TICKET-',
  // ticketNumberRegExp: '\\d{1,5}',

  // 针对每一个 type 去定义对应的 scopes，例如 fix
  /*
  scopeOverrides: {
    fix: [
      { name: 'merge' },
      { name: 'style' },
      { name: 'e2eTest' },
      { name: 'unitTest' }
    ]
  },
  */

  // 交互提示信息
  messages: {
    type: "确保本次提交遵循 Angular 规范！\n选择你要提交的类型：",
    scope: "\n选择一个 scope（可选）：",
    // 选择 scope: custom 时会出下面的提示
    customScope: "请输入自定义的 scope：",
    subject: "填写简短精炼的变更描述：\n",
    body: '填写更加详细的变更描述（可选）。使用 "|" 换行：\n',
    breaking: "列举非兼容性重大的变更（可选）：\n",
    footer: "列举出所有变更的 ISSUES CLOSED（可选）。 例如: #31, #34：\n",
    confirmCommit: "确认提交？",
  },

  // 设置只有 type 选择了 feat 或 fix，才询问 breaking message
  allowBreakingChanges: ["feat", "fix"],

  // 跳过要询问的步骤
  // skipQuestions: ['body', 'footer'],

  // subject 限制长度
  subjectLimit: 100,
  breaklineChar: "|", // 支持 body 和 footer
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true,
};
```

此时可以执行 git cz 来进行 commit 看到之前的英文选项已经中译

5.安装 commitlint 检查提交消息是否符合常规提交格式

```bash
npm install -D -S @commitlint/cli @commitlint/config-conventional
```

6.项目根目录下创建 commitlint.config.js 文件，标明 commitlint 校验时使用的规范是@commitlint/config-conventional

注意：该处用的提交格式规范是 Conventional Commits，预先配置 commitizen 创建的.cz-config.js 要按照前者的规范来配置

```javascript
module.exports = { extends: ["@commitlint/config-conventional"] };
```
