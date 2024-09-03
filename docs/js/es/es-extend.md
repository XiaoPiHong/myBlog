# 继承

## es5 的类

```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.eat = function () {
  console.log("吃");
};
var per = new Person("老六");
```

## es6 的类

```javascript
class Father {
  constructor(age) {
    this.age = age;
    this.xiao = function () {
      console.log("哈哈哈");
    };
  }
  money() {
    console.log("花钱");
  }
}
var fa = new Father(11);
console.dir(fa); //在实例对象fa的原型__proto__中有money方法
console.dir(Father); //在类Father的prototype中也有money()方法
//总结：
//1.这里说明class类中添加方法，会添加到class类中的原型prototype中的,所以实例对象原型__proto__也会有，但是实例对象没有
//2.在constructor里面添加的属性和方法就如同es5中用this.添加的属性和方法一样，是创建实例对象的时候添加到实例对象中的，其他地方都没有
```

## es5 的继承

1.es5 的继承原理是改变了构造函数原型对象（prototype）的指向

2.es5 完美的实现继承的方式是组合继承：借用构造函数 + 改变原型指向

3.所有用 this.声明的属性，原型对象 proto 和原型对象 prototype 中都是没有的

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.eat = function () {
    console.log(this.name + "吃饭了");
  };
}
function Student(name, age, grade) {
  //1.借用Person的构造函数（这里借用构造函数，是借用Person构造函数来为stu实例添加Person中存在的属性name、age、eat...,借用的时候也可以不传递参数:如Person.call(this)，这样在借用Person构造函数的时候，stu对象中就会声明name和age属性，但是未赋值，也就是值为undefined,eat方法打印出来也是undefined在学习）
  Person.call(this, name, age);
  this.grade = grade;
  this.study = function () {
    console.log(this.name + "在学习");
  };
}
//2.改变原型指向
Student.prototype = new Person();
var stu = new Student("xiaopihong", 18, "三年级");
console.dir(stu);
```

## es6 的继承

1.es6 的继承是使用 class 声明类，extend 实现继承

2.es6 的继承原理也是和 es5 一样，都是改变了原型指向

```javascript
class Person {
  //a = 1   //这样声明的属性就类似于是初始化的时候添加到stu的属性，因为Student继承了Person，所以无论是Person的实例对象或者是Student的实例对象中都会有a=1的属性
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.eat = function () {
      console.log(this.name + "吃饭了");
    };
  }
  laugth() {
    //这是Person的原型对象prototype中的方法
    console.log("笑了");
  }
}
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age); //调用父类的 constructor(name,age),如果不传参数，stu对象中就会声明name和age属性，但是未赋值，也就是值为undefined，eat方法打印出来也是undefined在学习
    this.grade = grade;
    this.study = function () {
      console.log(this.name + "在学习");
    };
  }
}
var stu = new Student("xiaopihong", 18, "三年级");
console.dir(stu);
```

## es6 继承注意

```javascript
class Father {}
class Son extends Father {
  constructor() {
    super(); //必须先super()
  }
}
var son = new Son();
//1. 子类调用自己构造函数前，必须先调用父类的构造函数
//2. 子类中写constructor()构造方法，就必须先super()一下,不然报错(因为子类中写constructor()构造方法就会调用一次自己这个构造方法)
```
