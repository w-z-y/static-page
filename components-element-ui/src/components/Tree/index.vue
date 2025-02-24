<template>
  <el-tree v-bind="$attrs" v-on="$listeners">
    <template slot="default" slot-scope="{data}">
      <!-- {{ node }} -->
      <div class="flex flex-1 flex-align-center flex-justify-between">
        <span class="flex flex-align-center">
          <img :src="require('@/assets/file/folder.png')" width="20" style="margin-right: 10px">
          {{ data.label }}
        </span>
        <span>option</span>
      </div>
    </template>
  </el-tree>
</template>

<script>
export default {
  name: "MyTree"
}
</script>

<style lang="scss" scoped></style>