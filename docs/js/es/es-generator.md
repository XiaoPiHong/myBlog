# 生成器

## 什么是生成器

生成器拥有在一个函数块内暂停和恢复代码执行的能力。函数名称前面加一个星号（\*）表示它是一个生成器函数，生成器函数用来生成生成器，也叫生成器对象。（简单来说就是：生成器能够使生成器函数内部的代码暂停执行或者恢复执行）

```javascript
// 生成器函数声明
function* generatorFn() {}
// 生成器函数表达式
let generatorFn = function* () {};
// 作为对象字面量方法的生成器函数
let foo = {
  *generatorFn() {},
};
// 作为类实例方法的生成器函数
class Foo {
  *generatorFn() {}
}
// 作为类静态方法的生成器函数
class Bar {
  static *generatorFn() {}
}

//注意：箭头函数不能用来定义生成器函数。标识生成器函数的星号不受两侧空格的影响。
```

## 为什么会出现生成器 & 何处使用生成器

Generator 函数是为了提供一种更灵活、更强大的函数形式，以满足某些特定的编程需求，以下是一些使用生成器的原因：

1、异步编程：Generator 函数提供了一种更简洁、易读的方式来处理异步操作。通过使用 yield 表达式，可以在函数中暂停执行，并在异步操作完成后继续执行。这样可以避免回调地狱（callback hell）和复杂的 Promise 链式调用，使异步代码更易于理解和编写。

2、迭代器：Generator 函数可用于创建迭代器。通过使用 yield 语句生成序列的值，可以轻松地创建可以迭代的对象，并使用 for...of 循环或手动调用 next()方法进行遍历。这种迭代器的创建方式比传统的迭代器模式更简洁，使代码更易于编写和维护。

3、惰性计算：Generator 函数支持惰性计算，即只在需要时计算和生成值。这对于处理大量数据或无限序列非常有用，可以避免一次性计算所有值而导致的性能问题。

4、状态管理：Generator 函数可以在函数执行的不同阶段之间保存和管理状态。通过在函数内部使用变量，可以在每次调用 next()时保留函数的上下文和局部变量的值，实现了函数的暂停和恢复。

## 生成器和迭代器的关系

#### 生成器也是迭代器

调用生成器函数会产生一个生成器对象。生成器对象一开始处于暂停执行（suspended）的状态。与 迭代器相似，生成器对象也实现了 Iterator 接口，因此具有 next()方法。调用这个方法会让生成器 开始或恢复执行。

```javascript
// next()方法的返回值类似于迭代器，有一个 done 属性和一个 value 属性。函数体为空的生成器 函数中间不会停留，调用一次 next()就会让生成器到达 done: true 状态。
function* generatorFn() {}
let generatorObject = generatorFn();
console.log(generatorObject); // generatorFn {<suspended>}
console.log(generatorObject.next()); // { done: true, value: undefined }

// value 属性是生成器函数的返回值，默认值为 undefined，可以通过生成器函数的返回值指定：
function* generatorFn() {
  return "foo";
}
let generatorObject = generatorFn();
console.log(generatorObject); // generatorFn {<suspended>}
console.log(generatorObject.next()); // { done: true, value: 'foo' }
```

#### 生成器对象默认的迭代器是自引用

```javascript
function* generatorFn() {}
const g = generatorFn();
console.log(g === g[Symbol.iterator]());
// true
```

#### 生成器对象默认也是可迭代对象

```javascript
// 在生成器对象上显式调用 next()方法的用处并不大。其实，如果把生成器对象当成可迭代对象， 那么使用起来会更方便：
function* generatorFn() {
  yield 1;
  yield 2;
  yield 3;
}
for (const x of generatorFn()) {
  console.log(x);
}
// 1
// 2
// 3
```

## 通过 yield 中断执行生成器函数内部代码块

yield 关键字可以让生成器停止和开始执行，也是生成器最有用的地方。生成器函数在遇到 yield 关键字之前会正常执行。遇到这个关键字后，执行会停止，函数作用域的状态会被保留。停止执行的生 成器函数只能通过在生成器对象上调用 next()方法来恢复执行：

```javascript
function* generatorFn() {
  yield;
}
let generatorObject = generatorFn();
console.log(generatorObject.next()); // { done: false, value: undefined }
console.log(generatorObject.next()); // { done: true, value: undefined }

// 此时的yield 关键字有点像函数的中间返回语句，它生成的值会出现在 next()方法返回的对象里。 通过 yield 关键字退出的生成器函数会处在 done: false 状态；通过 return 关键字退出的生成器函 数会处于 done: true 状态。
function* generatorFn() {
  yield "foo";
  yield "bar";
  return "baz";
}
let generatorObject = generatorFn();
console.log(generatorObject.next()); // { done: false, value: 'foo' }
console.log(generatorObject.next()); // { done: false, value: 'bar' }
console.log(generatorObject.next()); // { done: true, value: 'baz' }
```

#### yield 关键字只能在生成器函数内部使用，用在其他地方会抛出错误。

类似函数的 return 关键字， yield 关键字必须直接位于生成器函数定义中，出现在嵌套的非生成器函数中会抛出语法错误：

```javascript
// 有效
function* validGeneratorFn() {
  yield;
}
// 无效
function* invalidGeneratorFnA() {
  function a() {
    yield;
  }
}
// 无效
function* invalidGeneratorFnB() {
  const b = () => {
    yield;
  };
}
// 无效
function* invalidGeneratorFnC() {
  (() => {
    yield;
  })();
}
```

## yield\*迭代一个可迭代对象

可以使用星号增强 yield 的行为，让它能够迭代一个可迭代对象，从而一次产出一个值：

```javascript
function* generatorFn() {
  yield* [1, 2, 3];
  // 其实等价于下面：
  // for(const x of [1,2,3]){
  //   yield x
  // }
}
let generatorObject = generatorFn();
for (const x of generatorFn()) {
  console.log(x);
}
// 1
// 2
// 3
```

#### 使用 yield\*实现递归

yield\*最有用的地方是实现递归操作，此时生成器可以产生自身。看下面的例子：

```javascript
function* nTimes(n) {
  if (n > 0) {
    yield* nTimes(n - 1);
    yield n - 1;
  }
}
for (const x of nTimes(3)) {
  console.log(x);
}
// 0
// 1
// 2
```

## 生成器作为默认迭代器（上述 [生成器和迭代器的关系](/js/es/es-generator.html#生成器和迭代器的关系) 的实现思路）

这里，for-of 循环调用了默认迭代器（它恰好又是一个生成器函数）并产生了一个生成器对象。 这个生成器对象是可迭代的，所以完全可以在迭代中使用。

```javascript
class Foo {
  constructor() {
    this.values = [1, 2, 3];
  }
  *[Symbol.iterator]() {
    yield* this.values;
  }
}
const f = new Foo();
for (const x of f) {
  console.log(x);
}
// 1
// 2
// 3
```

## 提前终止生成器

与迭代器类似，生成器也支持“可关闭”的概念。一个实现 Iterator 接口的对象一定有 next() 方法，还有一个可选的 return()方法用于提前终止迭代器。生成器对象除了有这两个方法，还有第三 个方法：throw()。

#### 通过 return()方法“关闭”生成器

```javascript
function* generatorFn() {
  for (const x of [1, 2, 3]) {
    yield x;
  }
}
const g = generatorFn();
console.log(g); // generatorFn {<suspended>}
console.log(g.return(4)); // { done: true, value: 4 }
console.log(g); // generatorFn {<closed>}

// ===========================================================
// 与迭代器不同，所有生成器对象都有 return()方法，只要通过它进入关闭状态，就无法恢复了。 后续调用 next()会显示 done: true 状态，而提供的任何返回值都不会被存储或传播：
function* generatorFn() {
  for (const x of [1, 2, 3]) {
    yield x;
  }
}
const g = generatorFn();
console.log(g.next()); // { done: false, value: 1 }
console.log(g.return(4)); // { done: true, value: 4 }
console.log(g.next()); // { done: true, value: undefined }
console.log(g.next()); // { done: true, value: undefined }
console.log(g.next()); // { done: true, value: undefined }

// =============================================================
//for-of 循环等内置语言结构会忽略状态为 done: true 的 IteratorObject 内部返回的值。
function* generatorFn() {
  for (const x of [1, 2, 3]) {
    yield x;
  }
}
const g = generatorFn();
for (const x of g) {
  if (x > 1) {
    g.return(4);
  }
  console.log(x);
}
// 1
// 2
```

#### 通过 throw()方法“关闭”生成器

throw()方法会在暂停的时候将一个提供的错误注入到生成器对象中。如果错误未被处理，生成器就会关闭：

```javascript
function* generatorFn() {
  for (const x of [1, 2, 3]) {
    yield x;
  }
}
const g = generatorFn();
console.log(g); // generatorFn {<suspended>}
console.log(g.next()); // {value: 1, done: false}
try {
  g.throw("foo");
} catch (e) {
  console.log(e); // foo
}
console.log(g); // generatorFn {<closed>}
```

不过，假如生成器函数内部处理了这个错误，那么生成器就不会关闭，而且还可以恢复执行。错误 处理会跳过对应的 yield，因此在这个例子中会跳过一个值。比如：

```javascript
// 在这个例子中，生成器在 try/catch 块中的 yield 关键字处暂停执行。在暂停期间，throw()方 法向生成器对象内部注入了一个错误：字符串"foo"。这个错误会被 yield 关键字抛出。因为错误是在 生成器的 try/catch 块中抛出的，所以仍然在生成器内部被捕获。可是，由于 yield 抛出了那个错误， 生成器就不会再产出值 2。此时，生成器函数继续执行，在下一次迭代再次遇到 yield 关键字时产出了 值 3。
function* generatorFn() {
  for (const x of [1, 2, 3]) {
    try {
      yield x;
    } catch (e) {}
  }
}
const g = generatorFn();
console.log(g.next()); // { done: false, value: 1}
g.throw("foo");
console.log(g.next()); // { done: false, value: 3}

// 注意：如果生成器对象还没有开始执行，那么调用 throw()抛出的错误不会在函数内部被捕获，因为这相当于在函数块外部抛出了错误。
```
