# interface 使用的常见场景

## 约束对象传入的属性不能为接口的某个属性

```typescript
interface Person {
  name: string;
  age: number;
  email: string;
  // ...其他属性
}

// 使用 Omit 工具类型来排除属性（Omit 是一个内置的工具类型）
type PersonWithoutAgeAndEmail = Omit<Person, "age" | "email">;

// 现在 PersonWithoutAgeAndEmail 将不包含 age 和 email 属性
```

## 约束值只能是接口中的键值

```typescript
interface IActionItemProps {
  name: string;
  label: string;
}

interface ITableAction {
  type: keyof IActionItemProps;
}

const tableActionA: ITableAction = {
  type: "name", // 正确
};

const tableActionB: ITableAction = {
  type: "options", // 不能将类型“"options"”分配给类型“keyof IActionItemProps”
};
```

## 函数根据传入的值自动识别返回值的类型

```typescript
import {
  ActionItem,
  IActionItemProps,
  ACTION_ITEM_TYPE_ENUM,
} from "./ActionItem";

export interface ITableActionProps {
  options: IActionItemProps[];
}
export class TableAction {
  readonly options: ActionItem[];
  constructor(prop: ITableActionProps) {
    this.options = prop.options.map((item) => new ActionItem(item));
  }
  // K参数是TableAction的属性，getField返回值会根据K从TableAction匹配，虽然这里TableAction是个类，但接口是同理的
  getField<K extends keyof TableAction>(name: K): TableAction[K] {
    return this[name];
  }
}
const tableAction = new TableAction({
  options: [
    {
      name: "edit",
      label: "编辑",
      actionType: ACTION_ITEM_TYPE_ENUM.DROPDOWN,
    },
  ],
});
const options = tableAction.getField("options"); // const options: ActionItem[]
```

## 约束一个对象传入的属性只能是接口中的属性

```typescript
interface Person {
  name: string;
  age: number;
}

function printPartialPerson(person: Partial<Person>) {
  console.log(`Name: ${person.name}, Age: ${person.age}`);
}

const validPartialPerson: Partial<Person> = { name: "Alice", age: 25 };
const invalidPartialPerson = { name: "Bob", gender: "male" }; // 包含额外的属性

printPartialPerson(validPartialPerson); // 输出: Name: Alice, Age: 25
printPartialPerson(invalidPartialPerson); // TypeScript 编译时会报错，因为包含了额外的属性
```

## 给对象数组定义一个类型，可以存储不同类型的对象元素

```typescript
// 这里把interface改成type也可以实现
interface Circle {
  type: "circle";
  radius: number;
}

interface Rectangle {
  type: "rectangle";
  width: number;
  height: number;
}

type Shape = Circle | Rectangle; // 这样是一个联合类型

const circle: Circle = { type: "circle", radius: 5 };
const rectangle: Rectangle = { type: "rectangle", width: 10, height: 20 };

const shapes: Shape[] = [circle, rectangle];
```
