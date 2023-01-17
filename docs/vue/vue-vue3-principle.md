# vue3.x 双向绑定原理

## vue2.x 实现响应式不足之处

vue2 监听不到 delete 和动态添加的属性，而且每个属性都要用 defineProperty 处理

```javascript
//源数据
let person = {
  name: "张三",
  age: 18,
};

let p = {};
Object.defineProperty(p, "name", {
  configurable: true, //可配置的，设置为true才能删除
  get() {
    //有人读取name属性
    return person.name;
  },
  set(value) {
    //有人修改name属性
    console.log("有人修改了name属性，更新界面操作");
    person.name = value;
  },
});
Object.defineProperty(p, "age", {
  configurable: true,
  get() {
    //有人读取age属性
    return person.age;
  },
  set(value) {
    //有人修改age属性
    console.log("有人修改了age属性，更新界面操作");
    person.age = value;
  },
});
```

## 简易实现 vue3.x 响应式 （无 Reflect）

```javascript
//源数据
let person = {
  name: "张三",
  age: 18,
};

//参数1：被代理的对象，参数2：配置项
const p = new Proxy(person, {
  //读取
  get(target, propName) {
    console.log(`有人读取了p身上的${propName}属性`);
    return target[propName];
  },
  //修改/追加
  set(target, propName, value) {
    console.log(
      `有人修改了p身上的${propName}属性的值为${value},我要去更新界面了！`
    );
    target[propName] = value;
  },
  //删除
  deleteProperty(target, propName) {
    console.log(target); //target就是被代理的对象
    console.log(`有人修改了p身上的${propName}属性，我要去更新界面了！`);
    return delete target[propName];
  },
});
p.name = "李四"; //可以修改person的name
delete p.age; //可以删除person的age
p.job = "前端程序员";
console.log(person);
```

## vue3.x 实现响应式推导（Reflect）

```javascript
//源数据
let person = {
  name: "张三",
  age: 18,
};

//下面是推导过程
//（1.）首先要理解es6中的Reflect（反射），vue3的响应式也使用了这个内置对象，为什么要使用Reflect，下面推导
//（2.）先看看Reflect（反射）的作用
let obj = { a: 1, b: 2, c: 3 };
console.log(Reflect.get(obj, "a")); //1,这样可以读取obj的a属性

Reflect.set(obj, "b", 666);
console.log(obj); //{a:1,b:666},这样可以修改obj的b属性

Reflect.deleteProperty(obj, "c");
console.log(obj); //{a:1,b:666},这样可以删除obj的c属性
//（3.）ecma正尝试把许多Object内置对象的方法移植到Reflect上，所以Reflect也有defineProperty,Object和Reflect的defineProperty区别就是，前者出错会直接报错（如重复声明一个属性），终止下面代码执行，而后者不会报错，而且可以返回一个是否成功的标识

// 用Object.defineProperty声明
// Object.defineProperty(obj, 'd', {
//   get() {
//     return 3
//   }
// })
// Object.defineProperty(obj, 'd', {//报错，下面的代码执行，不能重复定义
//   get() {
//     return 4
//   }
// })

// try catch捕获Object.defineProperty的错误
try {
  //如果使用Object.defineProperty，要用try catch捕获错误才行，不然直接报错停止运行
  Object.defineProperty(obj, "e", {
    get() {
      return 3;
    },
  });
  Object.defineProperty(obj, "e", {
    get() {
      return 4;
    },
  });
} catch (error) {
  console.log(error);
}

// 用Reflect.defineProperty声明
const res1 = Reflect.defineProperty(obj, "d", {
  get() {
    return 3;
  },
});
const res2 = Reflect.defineProperty(obj, "d", {
  //不报错，下面的代码可继续执行
  get() {
    return 4;
  },
});
console.log(obj.d); //3,访问d属性的时候，拿到的是第一次defineProperty定义返回的值
console.log(res1, res2); //true,false，表明第一次是成功的，第二次是不成功的
//（4.）所以总结了Reflect.defineProperty好处就是出错了也不会抛出错误，是以返回值的形式提醒

//（5.）最终演变成下面的代码才是vue3精简的响应式处理数据
//==============================================最终start
const p = new Proxy(person, {
  //读取
  get(target, propName) {
    console.log(`有人读取了p身上的${propName}属性`);
    return Reflect.get(target, propName);
  },
  //修改/追加
  set(target, propName, value) {
    console.log(
      `有人修改了p身上的${propName}属性的值为${value},我要去更新界面了！`
    );
    return Reflect.set(target, propName, value);
  },
  //删除
  deleteProperty(target, propName) {
    console.log(target); //target就是被代理的对象
    console.log(`有人修改了p身上的${propName}属性，我要去更新界面了！`);
    return Reflect.deleteProperty(target, propName);
  },
});
p.name = "李四"; //可以修改person的name
delete p.age; //可以删除person的age
p.job = "前端程序员";
console.log(person);
//==============================================最终end
```
