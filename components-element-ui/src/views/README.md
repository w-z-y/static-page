### Step1

```js
// 由于demo使用的是element-ui，这里的`obj`是el-table的默认参数{ row, rowIndex, column }, 我们要关注的是第二个参数`mergeRule`
:span-method="obj => spanMethod(obj, mergeRule)"
```

### Step2

> 声明`mergeRule`和`spanMethod`

```js
export default {
  data() {
    return {
      mergeRule: {
        name: {
          deps: [], // 无依赖,直接合并
          merge: true,
        },
        age: {
          deps: ['name'], // 依赖name列
          merge: true,
        },
        address: {
          deps: ['name', 'age'], // 依赖name和age列
          merge: true,
        },
        phone: {
          merge: false, // 不参与合并
        },
      },
    };
  },
  methods: {
    spanMethod({ row, rowIndex, column }, mergeRule) {
      const property = column.property;

      // 如果列不需要合并,返回默认值
      if (!mergeRule[property]?.merge) {
        return { rowspan: 1, colspan: 1 };
      }

      const { deps = [] } = mergeRule[property];
      const prevRow = this.tableData[rowIndex - 1];

      // 检查是否需要与上一行合并
      const shouldMergeWithPrev =
        prevRow &&
        prevRow[property] === row[property] && // 当前列值相同
        deps.every((dep) => prevRow[dep] === row[dep]); // 所有依赖列的值都相同

      if (shouldMergeWithPrev) {
        return { rowspan: 0, colspan: 0 };
      }

      // 计算向下合并的行数
      let mergeCount = 1;
      for (let i = rowIndex + 1; i < this.tableData.length; i++) {
        const nextRow = this.tableData[i];
        const canMerge = nextRow[property] === row[property] && deps.every((dep) => nextRow[dep] === row[dep]);

        if (!canMerge) break;
        mergeCount++;
      }

      return {
        rowspan: mergeCount,
        colspan: 1,
      };
    },
  },
};
```

### Api

#### mergeRule

| 属性  | 类型                          | 说明                                    |
| ----- | ----------------------------- | --------------------------------------- |
| key   | string                        | table 列属性                            |
| value | {deps: array, merge: boolean} | deps 为基准字段列表，merge 为是否要合并 |
