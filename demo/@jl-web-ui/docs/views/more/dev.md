### `createVue`方法
用更便捷的方式创建符合组件库规范的vue实例

使用方式
```js
import createVue from '@jl/web-ui/src/createVue'
export default createVue({
    name: '', // 组件名(首字母会自动转大写, 前缀自动拼接`Jl`)
    model: true, // 是否需要支持双向绑定, 为true时, 组件内部可以使用`this.internalValue`进行修改, 直接更新外部`v-model`传入的值
    defaultProps: true, // 是否使用props映射，使用组件时，可以通过:props="{label:'name', value:'id'}"来进行属性映射
})
```