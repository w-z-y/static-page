import DropdownExample from '../examples/DropdownExample.vue';
import TooltipExample from '../examples/TooltipExample.vue';
import ResizableTableExample from '../examples/ResizableTableExample.vue';

export default [
    {
        path: '/dropdown',
        name: 'Dropdown',
        component: DropdownExample,
        meta: {
            title: "Dropdown"
        }
    },
    {
        path: '/tooltip',
        name: 'Tooltip',
        component: TooltipExample,
        meta: {
            title: "Tooltip"
        }
    },
    {
        path: '/resizable-table',
        name: 'ResizableTable',
        component: ResizableTableExample,
        meta: {
            title: "ResizableTable"
        }
    },
    {
        path: '*',
        redirect: '/dropdown', // 默认重定向到 Dropdown 示例
    }
]