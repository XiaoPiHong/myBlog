# 迭代器

## 什么是迭代器

首先理解什么是迭代：迭代意思是按照顺序反复多次执行一段程序（通常会有明确的终止条件）。迭代器：就是让你能按顺序反复执行一段程序的一个工具。

## 为什么会出现迭代器

for 循环也可以反复多次执行一段程序，为什么还要用迭代器？其实 for 循环是以一种简洁的方式进行迭代操作而已，它还存在以下的一些问题：

#### 官方术语

用 for 循环来执行例程其实并不理想，主要有以下两个原因：1、迭代之前需要事先知道如何使用数据结构（数组中的每一项都只能先通过引用取得数组对象，然后再通过[]操作符取得特定索引位置上的项。这种情况并不适用于所有数据结构）；2、遍历顺序并不是数据结构固有的（通过递增索引来访问数据是特定于数组类型的方式，并不适用于其他具有隐式顺序的数据结构）

#### 个人理解术语

以上两点简单来讲就是：1、你用 for 循环是建立在你已经知道这个数据类型的数据结构的前提下的，当你不知道数据类型的数据结构的时候你就不能用了，就比如别人自己增加的一个类实例出来的数据，人家有着自己特定的数据结构，并不是像你理解的数组或者数字那样有长度、索引等。2、访问的数据也可能不像数组那样内部元素是有着排列好的顺序的，其可能是你看不着的顺序（隐式顺序）。

## 何处使用迭代器

当你定义了一个类，类实例出来的对象，如果你想这个对象可以迭代那就可以使用迭代器了（该类使用迭代器的前提条件是其需要符合**可迭代协议**）

## 可迭代协议

类需要符合可迭代协议，也就是其需要实现 **Iterable 接口（其实就是一套规范）**

实现**Iterable 接口的要求**：

1、支持迭代的自我识别能力（就是实现[Symbol.iterator]迭代器工厂函数，让类的实例对象具备判断自身是否可迭代的能力）

2、创建实现 Iterator 接口的对象的能力（就是迭代器工厂函数要返回一个迭代器对象，该对象要实现 next 方法，用来按顺序访问对象内元素）

例子：

```javascript
class Counter {
  constructor(limit) {
    this.limit = limit;
  }
  // 为了让一个可迭代对象能够创建多个迭代器，必须每创建一个迭代器就对应一个新计数器。为此，可以把计数器变量放到闭包里，然后通过闭包返回迭代器：
  [Symbol.iterator]() {
    let count = 1,
      limit = this.limit;
    return {
      next() {
        if (count <= limit) {
          return { done: false, value: count++ };
        } else {
          return { done: true, value: undefined };
        }
      },
    };
  }
}
// 可迭代对象
let counter = new Counter(3);

// 迭代器工厂函数
console.log(counter[Symbol.iterator]);

// 迭代器
let iter = counter[Symbol.iterator]();
console.log(iter);

// 执行迭代
for (let i of counter) {
  console.log(i);
}
// 1
// 2
// 3

// 每个迭代器都表示对可迭代对象的一次性有序遍历。不同迭代器的实例相互之间没有联系，只会独立地遍历可迭代对象
for (let i of counter) {
  console.log(i);
}
// 1
// 2
// 3
```

#### 迭代器协议

创建迭代器工厂函数也有一套协议/规范需要遵守：

迭代器是一种一次性使用的对象，用于迭代与其关联的可迭代对象。迭代器 API 使用 next()方法 在可迭代对象中遍历数据。每次成功调用 next()，都会返回一个 IteratorResult 对象，其中包含迭 代器返回的下一个值。若不调用 next()，则无法知道迭代器的当前位置。

next()方法返回的迭代器对象 IteratorResult 包含两个属性：done 和 value。done 是一个布 尔值，表示是否还可以再次调用 next()取得下一个值；value 包含可迭代对象的下一个值（done 为 false），或者 undefined（done 为 true）。done: true 状态称为“耗尽”。可以通过以下简单的数组来演示：

```javascript
// 可迭代对象
let arr = ["foo", "bar"];
// 迭代器工厂函数
console.log(arr[Symbol.iterator]); // f values() { [native code] }
// 迭代器
let iter = arr[Symbol.iterator]();
console.log(iter); // ArrayIterator {}
// 执行迭代
console.log(iter.next()); // { done: false, value: 'foo' }
console.log(iter.next()); // { done: false, value: 'bar' }
console.log(iter.next()); // { done: true, value: undefined }

//===============================================================================

//这里通过创建迭代器并调用 next()方法按顺序迭代了数组，直至不再产生新值。迭代器并不知道 怎么从可迭代对象中取得下一个值，也不知道可迭代对象有多大。只要迭代器到达 done: true 状态， 后续调用 next()就一直返回同样的值了：
let arr = ["foo"];
let iter = arr[Symbol.iterator]();
console.log(iter.next()); // { done: false, value: 'foo' }
console.log(iter.next()); // { done: true, value: undefined }
console.log(iter.next()); // { done: true, value: undefined }
console.log(iter.next()); // { done: true, value: undefined }

// =================================================================================

//迭代器并不与可迭代对象某个时刻的快照绑定，而仅仅是使用游标来记录遍历可迭代对象的历程。 如果可迭代对象在迭代期间被修改了，那么迭代器也会反映相应的变化：
let arr = ["foo", "baz"];
let iter = arr[Symbol.iterator]();
console.log(iter.next()); // { done: false, value: 'foo' }
// 在数组中间插入值
arr.splice(1, 0, "bar");
console.log(iter.next()); // { done: false, value: 'bar' }
console.log(iter.next()); // { done: false, value: 'baz' }
console.log(iter.next()); // { done: true, value: undefined }
```

## 可迭代对象能使用的原生特性

实际写代码过程中，不需要显式调用这个工厂函数来生成迭代器。实现可迭代协议的所有类型都会 自动兼容接收可迭代对象的任何语言特性。接收可迭代对象的原生语言特性包括：

for-of 循环

数组解构

扩展操作符

Array.from()

创建集合

创建映射

Promise.all()接收由期约组成的可迭代对象

Promise.race()接收由期约组成的可迭代对象

yield\*操作符，在生成器中使用
