<template>
    <div>
        <h2>Dropdown 示例</h2>
        <MySpace>

            <MyCard>
                <h4>普通</h4>
                <MySpace>
                    <MyDropdown :options="dropdownOptions" @change="handleDropdownChange">
                        <MyButton hover type="text">点击</MyButton>
                    </MyDropdown>
                    <MyDropdown :options="dropdownOptions" trigger="hover" placement="bottom-end">
                        <MyButton type="text">悬浮 bottom-end</MyButton>
                    </MyDropdown>
                </MySpace>
            </MyCard>

            <MyCard>
                <h4>v-model (支持勾选回显，选中打勾)</h4>
                <MyDropdown v-model="selectedOption.value" :options="dropdownOptions" @change="handleDropdownChange">
                </MyDropdown>
            </MyCard>

            <MyCard>
                <h4>Contextmenu</h4>
                <MyDropdown :options="dropdownOptions" trigger="contextmenu" @change="handleDropdownChange">
                    <div class="container flex flex-center">
                        Right Click on here
                    </div>
                </MyDropdown>
            </MyCard>
        </MySpace>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedOption: {
                value: 'option3'
            },
            dropdownOptions: [
                { label: 'Op1', value: 'option1' },
                { label: 'Op2', value: 'option2', showLabel: 'showLabel显示' },
                { label: 'Op3', value: 'option3' }
            ]
        };
    },
    methods: {
        handleDropdownChange(value) {
            console.log('选择的值:', value);
        }
    }
}
</script>

<style lang="scss">
.container {
    width: 200px;
    height: 100px;
    background-color: #f6f6f6;
    color: #777;
    border-radius: 4px;
}
</style>