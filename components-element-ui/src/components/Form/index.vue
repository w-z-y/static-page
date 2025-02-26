<template>
    <div class="flex flex-wrap">
        <el-form :model="internalValue">
            <el-form-item :label="internalValue[defaultProps.label]" v-for="option in options"
                :key="option[defaultProps.value]">
                <MySelect v-model="model[defaultProps.value]" :options="option.options">
                </MySelect>
            </el-form-item>

            <el-form-item>
                <!-- <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
                <el-button icon="el-icon-refresh-right" @click="reset()">重置</el-button> -->
                <!-- <el-button type="text" icon="el-icon-arrow-down" @click="showAll = true" v-if="!showAll">
                    展开
                </el-button>
                <el-button type="text" icon="el-icon-arrow-up" @click="showAll = false" v-else>
                    收起
                </el-button> -->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import MySelect from '../Select'
import propsMixin from '@/mixins/props'
import modelMixin from '@/mixins/model'
export default {
    name: 'MyForm',
    mixins: [propsMixin, modelMixin],
    props: {
        options: {
            type: Array,
            required: true
        },
    },
    components: {
        MySelect
    }
}
</script>

<style lang="scss" scoped></style>