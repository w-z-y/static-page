import Sortable from 'sortablejs';
import { sleep } from '../../../../../src/util/index';

const animation = 180;

export default {
  watch: {
    async columns() {
      // 手动更新table绑定的key
      this.sortableMixin_tableKey++;
      await sleep(0);
      this.sortableMixin_columnDropSort();
      this.sortableMixin_rowDropSort();
    },
  },
  data() {
    return {
      // 自增key
      sortableMixin_tableKey: 0,
    };
  },
  methods: {
    // sortableMixin_dragLevel(index) {
    //   if (typeof this.sortableColumn === 'number') {
    //     return this.sortableColumn === index + 1;
    //   } else if (Array.isArray(this.sortableColumn)) {
    //     return this.sortableColumn.includes(index + 1);
    //   } else {
    //     return this.sortableColumn;
    //   }
    // },
    //表格列拖拽
    async sortableMixin_columnDropSort() {
      if (!this.sortableColumn) return;
      const wrapperTrs = this.$refs.myTableRef.$el.querySelectorAll('.el-table__header-wrapper tr');
      Array.from(wrapperTrs).forEach((wrapperTr, index) => {
        if (index !== 0) return;
        // if (this.sortableMixin_dragLevel(index)) {
        // 解决多级表头拖拽时，拖拽到溢出tr的区域的td上时，会导致移动到最后了
        const gutterEl = wrapperTr.querySelector('.gutter');
        gutterEl.remove();

        this.sortable = Sortable.create(wrapperTr, {
          handle: '.allow-drag',
          animation,
          onEnd: (evt) => {
            const targetRow = this.columns.splice(evt.oldIndex, 1)[0];
            this.columns.splice(evt.newIndex, 0, targetRow);

            // 先 push 一个空对象，再 pop 掉，实现响应式更新(解决勾选状态消失的问题)
            this.data.push({});
            this.data.pop();
          },
        });
        // }
      });
    },
    //表格行拖拽
    async sortableMixin_rowDropSort() {
      if (!this.sortableRow) return;
      // 虚拟列表不支持行拖拽
      if (this.isVirtual) {
        console.warn('jl-table: 虚拟列表无法支持行拖拽');
        return;
      }

      const wrapperTr = this.$refs.myTableRef.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
      this.sortable = Sortable.create(wrapperTr, {
        handle: '.option-drag',
        animation,
        onEnd: (evt) => {
          const targetRow = this.data.splice(evt.oldIndex, 1)[0];
          this.data.splice(evt.newIndex, 0, targetRow);
        },
      });
    },
  },
  async mounted() {
    await sleep(0);
    this.sortableMixin_columnDropSort();
    this.sortableMixin_rowDropSort();
  },
};
