# vue2.x 双向绑定原理

## 1.实现一个 Observer 监听器

> 注意：library.book1.name = 'vue 权威指南'; 这里会先因为 library.book1 访问了 library 的 book1 属性而触发 get 方法，然后继续.name='vue 权威指南'触发了 set 方法（get 方法和 set 方法不会同时触发）

```javascript
function defineReactive(data, key, val) {
  observe(val); // 递归遍历所有子属性
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      return val;
    },
    set: function (newVal) {
      val = newVal;
      console.log(
        "属性" + key + "已经被监听了，现在值为：“" + newVal.toString() + "”"
      );
    },
  });
}

function observe(data) {
  if (!data || typeof data !== "object") {
    return;
  }
  Object.keys(data).forEach(function (key) {
    defineReactive(data, key, data[key]);
  });
}

var library = {
  book1: {
    name: "",
  },
  book2: "",
};
observe(library);
library.book1.name = "vue权威指南"; // 属性name已经被监听了，现在值为：“vue权威指南”
library.book2 = "没有此书籍"; // 属性book2已经被监听了，现在值为：“没有此书籍”
```

## 2.实现一个 Dep 订阅器

> 注意： 订阅器的主要作用是收集订阅者 Watcher，只要有数据发生变化，就触发订阅器中所有的订阅者的更新视图方法

```javascript
function defineReactive(data, key, val) {
  observe(val);
  var dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      if ("是否需要添加订阅者") {
        dep.addSub(watcher); // 在这里添加一个订阅者
      }
      return val;
    },
    set: function (newVal) {
      if (val === newVal) {
        return;
      }
      val = newVal;
      console.log(
        "属性" + key + "已经被监听了，现在值为：“" + newVal.toString() + "”"
      );
      dep.notify(); // 如果数据变化，通知所有订阅者
    },
  });
}
function observe(data) {
  if (!data || typeof data !== "object") {
    return;
  }
  Object.keys(data).forEach(function (key) {
    defineReactive(data, key, data[key]);
  });
}
function Dep() {
  this.subs = [];
}
Dep.prototype = {
  constructor: Dep,
  addSub: function (sub) {
    this.subs.push(sub);
  },
  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update();
    });
  },
};
```

## 3.实现一个 Watcher 订阅者

> 注意：
>
> 1.
>
> Watcher 作用 1：用于更新视图，因为他有个回调方法，是专门用于更新视图的
>
> Watcher 作用 2：用于一开始把自己添加到订阅器 Dep 中，因为一开始 Dep 里面的 subs 是空的，无论我们怎么改数据都不会发生视图修改，只有把每个属性对应的 Watcher 放进 subs 中，我们在修改数据时，才会马上更新视图（也就是说每一个 Watcher 对应一个属性，每个 Watcher 都有自己独有的修改视图方法）
>
> 2.
>
> 如何在一开始的时候，就把每个属性对应的 Watcher 放进 Dep 订阅器的 subs 中，有三步：①.在实力这个 Watcher 的时候，缓存自己; ②.在实力这个 Watcher 的时候，强制执行监听器里的 get 函数； ③.在实力这个 Watcher 的时候，释放自己。

```javascript
function Watcher(vm, exp, cb) {
  this.cb = cb;
  this.vm = vm;
  this.exp = exp;
  this.value = this.get(); // 将自己添加到订阅器的操作
}

Watcher.prototype = {
  constructor: Watcher,
  update: function () {
    this.run();
  },
  run: function () {
    var value = this.vm.data[this.exp];
    var oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  },
  get: function () {
    Dep.target = this; // 缓存自己
    var value = this.vm.data[this.exp]; // 强制执行监听器里的get函数
    Dep.target = null; // 释放自己
    return value;
  },
};

function observe(data) {
  if (!data || typeof data !== "object") {
    return;
  }
  Object.keys(data).forEach(function (key) {
    defineReactive(data, key, data[key]);
  });
}

function Dep() {
  this.subs = [];
}
Dep.prototype = {
  constructor: Dep,
  addSub: function (sub) {
    this.subs.push(sub);
  },
  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update();
    });
  },
};

function defineReactive(data, key, val) {
  observe(val);
  var dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      if (Dep.target) {
        // 判断是否需要添加订阅者
        dep.addSub(Dep.target); // 在这里添加一个订阅者
      }
      return val;
    },
    set: function (newVal) {
      if (val === newVal) {
        return;
      }
      val = newVal;
      console.log(
        "属性" + key + "已经被监听了，现在值为：“" + newVal.toString() + "”"
      );
      dep.notify();
    },
  });
}
Dep.target = null;
```

### 3.1 例子 1

这时候我们需要将 Observer 和 Watcher 关联起来，就可以进行数据的双向绑定

```html
<p id="p"></p>
<input type="text" id="input" />
```

```javascript
function SelfVue(data, el, exp) {
  this.data = data;
  observe(data);
  el.innerHTML = this.data[exp]; // 初始化模板数据的值
  new Watcher(this, exp, function (value) {
    el.innerHTML = value;
  });
  return this;
}
var el = document.querySelector("#p");
var selfVue = new SelfVue(
  {
    content: "初始的内容",
  },
  el,
  "content"
);

document.querySelector("#input").value = "初始的内容";
document.querySelector("#input").addEventListener(
  "input",
  function (e) {
    selfVue.data.content = e.target.value;
  },
  false
);
```

### 3.2 例子 2

例子 1 中修改 selfVue 中的属性时需要 selfVue.data.xxx,但是 Vue 中只需要 selfVue.xxx 就行，下面就实现这个操作，原理是在 new SelfVue 的时候做一个代理处理，让访问 selfVue 的属性代理为访问 selfVue.data 的属性，实现原理还是使用 Object.defineProperty( )对属性值再包一层

```html
<p id="p2"></p>
<input type="text" id="input2" />
```

```javascript
function SelfVue2(data, el, exp) {
  var self = this;
  this.data = data;

  Object.keys(data).forEach(function (key) {
    self.proxyKeys(key); // 绑定代理属性
  });

  observe(data);
  el.innerHTML = this.data[exp];
  new Watcher(this, exp, function (value) {
    el.innerHTML = value;
  });
  return this;
}
SelfVue2.prototype = {
  constructor: SelfVue2,
  proxyKeys: function (key) {
    var self = this;
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get: function proxyGetter() {
        return self.data[key];
      },
      set: function proxySetter(newVal) {
        self.data[key] = newVal;
      },
    });
  },
};

var el = document.querySelector("#p2");
var selfVue2 = new SelfVue2(
  {
    content: "初始的内容2",
  },
  el,
  "content"
);

document.querySelector("#input2").value = "初始的内容2";
document.querySelector("#input2").addEventListener(
  "input",
  function (e) {
    selfVue2.content = e.target.value;
  },
  false
);
```

## 4.实现解析器 Compile

> 注意：
>
> 1.虽然上面已经实现了一个双向数据绑定的例子，但是整个过程都没有去解析 dom 节点，而是直接固定某个节点进行替换数据的，所以接下来需要实现一个解析器 Compile 来做解析和绑定工作
>
> 2.步骤：
>
> ①：解析模板指令，并替换模板数据，初始化视图
>
> ②：将模板指令对应的节点绑定对应的更新函数，初始化相应的订阅器
>
> 3.为了解析模板，首先需要获取到 dom 元素，然后对含有 dom 元素上含有指令的节点进行处理，因此这个环节需要对 dom 操作比较频繁，所有可以先建一个 fragment 片段，将需要解析的 dom 节点存入 fragment 片段里再进行处理

```javascript
function observe(data) {
  if (!data || typeof data !== "object") {
    return;
  }
  Object.keys(data).forEach(function (key) {
    defineReactive(data, key, data[key]);
  });
}

function Dep() {
  this.subs = [];
}
Dep.prototype = {
  constructor: Dep,
  addSub: function (sub) {
    this.subs.push(sub);
  },
  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update();
    });
  },
};

function defineReactive(data, key, val) {
  observe(val);
  var dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return val;
    },
    set: function (newVal) {
      if (val === newVal) {
        return;
      }
      val = newVal;
      dep.notify();
    },
  });
}
Dep.target = null;

function Watcher(vm, exp, cb) {
  this.cb = cb;
  this.vm = vm;
  this.exp = exp;
  this.value = this.get();
}

Watcher.prototype = {
  constructor: Watcher,
  update: function () {
    this.run();
  },
  run: function () {
    var value = this.vm.data[this.exp];
    var oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  },
  get: function () {
    Dep.target = this;
    var value = this.vm.data[this.exp];
    Dep.target = null;
    return value;
  },
};

function Compile(el, vm) {
  this.vm = vm;
  this.el = document.querySelector(el);
  this.fragment = null;
  this.init();
}
Compile.prototype = {
  constructor: Compile,
  init: function () {
    if (this.el) {
      this.fragment = this.nodeToFragment(this.el);
      this.compileElement(this.fragment);
      this.el.appendChild(this.fragment);
    } else {
      console.log("Dom元素不存在");
    }
  },
  nodeToFragment: function (el) {
    var fragment = document.createDocumentFragment();
    var child = el.firstChild;
    while (child) {
      // 将Dom元素移入fragment中
      fragment.appendChild(child);
      child = el.firstChild;
    }
    return fragment;
  },
  compileElement: function (el) {
    var childNodes = el.childNodes;
    var self = this;
    [].slice.call(childNodes).forEach(function (node) {
      var reg = /\{\{(.*)\}\}/;
      var text = node.textContent;

      if (self.isElementNode(node)) {
        self.compile(node);
      } else if (self.isTextNode(node) && reg.test(text)) {
        self.compileText(node, reg.exec(text)[1]);
      }

      if (node.childNodes && node.childNodes.length) {
        self.compileElement(node);
      }
    });
  },
  compile: function (node) {
    var nodeAttrs = node.attributes;
    var self = this;
    Array.prototype.forEach.call(nodeAttrs, function (attr) {
      var attrName = attr.name;
      if (self.isDirective(attrName)) {
        var exp = attr.value;
        var dir = attrName.substring(2);
        if (self.isEventDirective(dir)) {
          // 事件指令
          self.compileEvent(node, self.vm, exp, dir);
        } else {
          // v-model 指令
          self.compileModel(node, self.vm, exp, dir);
        }
        node.removeAttribute(attrName);
      }
    });
  },
  compileText: function (node, exp) {
    var self = this;
    var initText = this.vm[exp];
    this.updateText(node, initText);
    new Watcher(this.vm, exp, function (value) {
      self.updateText(node, value);
    });
  },
  compileEvent: function (node, vm, exp, dir) {
    var eventType = dir.split(":")[1];
    var cb = vm.methods && vm.methods[exp];

    if (eventType && cb) {
      node.addEventListener(eventType, cb.bind(vm), false);
    }
  },
  compileModel: function (node, vm, exp, dir) {
    var self = this;
    var val = this.vm[exp];
    this.modelUpdater(node, val);
    new Watcher(this.vm, exp, function (value) {
      self.modelUpdater(node, value);
    });

    node.addEventListener("input", function (e) {
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }
      self.vm[exp] = newValue;
      val = newValue;
    });
  },
  updateText: function (node, value) {
    node.textContent = typeof value == "undefined" ? "" : value;
  },
  modelUpdater: function (node, value, oldValue) {
    node.value = typeof value == "undefined" ? "" : value;
  },
  isDirective: function (attr) {
    return attr.indexOf("v-") == 0;
  },
  isEventDirective: function (dir) {
    return dir.indexOf("on:") === 0;
  },
  isElementNode: function (node) {
    return node.nodeType == 1;
  },
  isTextNode: function (node) {
    return node.nodeType == 3;
  },
};

function SelfVue(options) {
  var self = this;
  this.data = options.data;
  this.methods = options.methods;

  Object.keys(this.data).forEach(function (key) {
    self.proxyKeys(key);
  });

  observe(this.data);
  new Compile(options.el, this);
  options.mounted.call(this); // 所有事情处理好后执行mounted函数
}

SelfVue.prototype = {
  constructor: SelfVue,
  proxyKeys: function (key) {
    var self = this;
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get: function getter() {
        return self.data[key];
      },
      set: function setter(newVal) {
        self.data[key] = newVal;
      },
    });
  },
};
```

### 4.1 例子（最终版本）

```html
<div id="app">
  <p>{{content}}</p>
  <input v-model="content" type="text" v-on:input="changeInput" />
</div>
```

```javascript
var selfVue = new SelfVue({
  el: "#app",
  data: {
    content: "初始的内容3",
  },
  mounted() {
    console.log("执行了mounted函数");
  },
  methods: {
    changeInput: function (e) {
      this.content = e.target.value;
    },
  },
});
```
