<template>
    <MySpace>
        <MyCard style="width: 100%; height: 100px">
            {{ formData }}
        </MyCard>
        <MyCard style="width: 100%">
            <h2>default</h2>
            <MyForm label-width="100px" v-model="formData" :options="options">
                <template #default="option">
                    <div v-if="option.value === 'slot'">slot</div>
                </template>
            </MyForm>
        </MyCard>
        <MyCard style="width: 100%">
            <h2>footer foldLength</h2>
            <MyForm
                footer
                :fold-length="3"
                label-width="100px"
                v-model="formData"
                :options="options"
            >
            </MyForm>
        </MyCard>
        <MyCard style="width: 100%">
            <h2>footer inline</h2>
            <MyForm
                footer
                :fold-length="3"
                inline
                label-width="100px"
                v-model="formData"
                :options="options"
            >
                <template #default="option">
                    <div v-if="option.value === 'slot'">slot</div>
                </template>
            </MyForm>
        </MyCard>
        <MyCard>
            <el-button @click="flag = !flag">修改状态</el-button>
        </MyCard>
    </MySpace>
</template>

<script>
export default {
    data() {
        return {
            flag: false,
            formData: {
                name: "1",
                age: "2",
                sex: "1",
                radioradio: "1",
                checkbox: ["1", "2", "3"],
                hobby: "1",
                address1: "1",
                address2: "11",
            },
        };
    },
    computed: {
        options() {
            return [
                {
                    label: "输入框",
                    value: "name",
                    // type对应的组件的属性
                    type: "input",
                    span: 6,
                    attrs: {
                        placeholder: "请输入姓名",
                    },
                },
                {
                    label: "文本域",
                    value: "age",
                    type: "input",
                    required: true,
                    visible: !this.flag,
                    attrs: {
                        resize: "none",
                        type: "textarea",
                        placeholder: "请输入年龄",
                        autosize: { minRows: 2, maxRows: 4 },
                    },
                },
                {
                    label: "单选",
                    value: "radioradio",
                    type: "radio",
                    required: true,
                    attrs: {
                        options: [
                            { label: "当前页面数据", value: "0" },
                            { label: "全部页面数据", value: "1" },
                        ],
                    },
                },
                {
                    label: "多选",
                    value: "checkbox",
                    type: "checkbox",
                    required: true,
                    attrs: {
                        showCheckAll: true,
                        options: [
                            { label: "篮球", value: "1" },
                            { label: "足球", value: "2" },
                            { label: "乒乓球", value: "3" },
                        ],
                    },
                    listeners: {
                        change(value) {
                            console.log("checkbox-change", value);
                        },
                    },
                },
                {
                    label: "开关",
                    value: "sex",
                    type: "switch",
                    required: true,
                    attrs: {
                        placeholder: "请选择性别",
                    },
                    span: 6,
                },
                {
                    label: "下拉",
                    value: "hobby",
                    type: "select",
                    required: true,
                    attrs: {
                        placeholder: "请选择爱好",
                        options: [
                            { label: "篮球", value: "1" },
                            { label: "足球", value: "2" },
                            { label: "乒乓球", value: "3" },
                        ],
                    },
                    span: 6,
                },
                {
                    label: "日期",
                    value: "hobby2",
                    type: "date-picker",
                    required: true,
                    attrs: {
                        type: "daterange",
                        placeholder: "请选择日期",
                        format: "yyyy-MM-dd",
                    },
                    span: 12,
                },
                {
                    label: "树下拉",
                    value: "address2",
                    type: "select",
                    required: true,
                    span: 12,
                    attrs: {
                        type: "tree",
                        placeholder: "请选择地址",
                        options: [
                            {
                                label: "北京",
                                value: "1",
                                children: [
                                    { label: "朝阳区朝阳区朝阳区朝阳区朝阳区朝阳区", value: "11" },
                                    { label: "海淀区", value: "12", disabled: true },
                                    { label: "昌平区", value: "13" },
                                ],
                            },
                            {
                                label: "上海",
                                value: "2",
                                children: [
                                    { label: "浦东新区", value: "21" },
                                    { label: "徐汇区", value: "22" },
                                    { label: "静安区", value: "23" },
                                ],
                            },
                        ],
                    },
                },
                {
                    label: "插槽",
                    value: "slot",
                    type: "11",
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped></style>
