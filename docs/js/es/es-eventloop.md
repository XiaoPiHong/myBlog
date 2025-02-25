# 事件循环机制（Event Loop）

## event loop

js是一门单线程的语言，它的异步和多线程是通过Event Loop事件循环机制来实现的。大体由但部分组成：
- 调用栈（call stack）
- 消息队列（Message Queue）
- 微任务队列（Microtask Queue）

![](es-eventloop.assets/es-eventloop-1.png)

## event loop的执行

eventloop开始时会从全局的代码一行一行往下执行，遇到函数调用，会把函数压入到调用栈中，被压入的函数叫做帧（Frame），当被压入的函数 return 返回后会从调用栈中弹出。

![](es-eventloop.assets/es-eventloop-2.png)

## 案例1（不涉及队列）

![](es-eventloop.assets/es-eventloop-3.png)


