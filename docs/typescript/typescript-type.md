# type 使用的常见场景

## 根据对象元素的属性值，自动识别对象的类型，对其属性进行不同的约束

```typescript
type BaseShape = {
  type: string;
  commonProperty: number;
};

type Circle = BaseShape & {
  type: "circle";
  radius: number;
};

type Rectangle = BaseShape & {
  type: "rectangle";
  width: number;
  height: number;
};

type Shape = Circle | Rectangle;

const shapes: Shape[] = [
  { type: "circle", commonProperty: 1, radius: 5 },
  { type: "rectangle", commonProperty: 2, width: 10, height: 20 },
];
```

## 给对象数组定义一个类型，可以存储不同类型的对象元素

```typescript
// 这里把type改成interface也可以实现
type Circle = {
  type: "circle";
  radius: number;
};

type Rectangle = {
  type: "rectangle";
  width: number;
  height: number;
};

type Shape = Circle | Rectangle; // 这样是一个联合类型

const circle: Circle = { type: "circle", radius: 5 };
const rectangle: Rectangle = { type: "rectangle", width: 10, height: 20 };

const shapes: Shape[] = [circle, rectangle];
```
