// function Component(id: number) {
//   console.log('init');

//   // eslint-disable-next-line @typescript-eslint/ban-types
//   return (target: Function) => {
//     console.log('run');
//     target.prototype.id = id;
//   };
// }

// function Logger() {
//   console.log('init logger');

//   // eslint-disable-next-line @typescript-eslint/ban-types
//   return (target: Function) => {
//     console.log('run logger');
//   };
// }

// // eslint-disable-next-line @typescript-eslint/ban-types
// function Method(target: Object, propertyKey: string, propertyDescriptor: PropertyDescriptor) {
//   console.log('property key', propertyKey);
//   const oldValue = propertyDescriptor.value;
//   propertyDescriptor.value = function (...args: any[]) {
//     return args[0] * 10;
//   };
// }

// // eslint-disable-next-line @typescript-eslint/ban-types
// function Prop(target: Object, propertyKey: string) {
//   let value: number;

//   const getter = () => {
//     console.log('get');
//     return value;
//   };

//   const setter = (newValue: number) => {
//     console.log('set');
//     value = newValue;
//   };

//   Object.defineProperty(target, propertyKey, {
//     get: getter,
//     set: setter,
//   });
// }

// // eslint-disable-next-line @typescript-eslint/ban-types
// function Param(target: Object, propertyKey: string, index: number) {
//   console.log(propertyKey, index);
// }

// @Logger()
// @Component(1)
// class User {
//   @Prop id: number;

//   @Method
//   updateID(@Param id: number) {
//     this.id = id;
//     return this.id;
//   }
// }

// console.log(new User().id);
// console.log(new User().updateID(10));

import 'reflect-metadata';

// eslint-disable-next-line @typescript-eslint/ban-types
function Test(target: Function) {
  Reflect.defineMetadata('a', 123, target);
  const meta = Reflect.getMetadata('a', target);
  console.log(meta);
}

@Test
class A {}
