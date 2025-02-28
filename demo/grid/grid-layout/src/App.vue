<template>
  <div id="app">
    <div class="container">
      <div class="left">
        <el-form :model="formData" label-width="100px">
          <el-form-item label="左右边距">
            <el-input v-model="formData.paddingX"></el-input>
          </el-form-item>
          <el-form-item label="上下边距">
            <el-input v-model="formData.paddingY"></el-input>
          </el-form-item>
          <el-form-item label="添加节点-宽">
            <el-input v-model="formData.w"></el-input>
          </el-form-item>
          <el-form-item label="添加节点-高">
            <el-input v-model="formData.h"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleAddNode" type="primary">添加节点</el-button>
            <el-button @click="printPDF" type="success">打印PDF</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        A3
        <div class="a3-paper" ref="a3Paper" :style="{
          padding: `${formData.paddingX}px ${formData.paddingY}px`
        }">
          <MyGridLayout :col-num="24" style="flex:1" v-model="layout" ref="myGridLayoutRef"
            @item-click="handleItemClick">
          </MyGridLayout>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyGridLayout from './components/GridLayout.vue'
import html2pdf from 'html2pdf.js'

export default {
  name: 'App',
  components: {
    MyGridLayout
  },
  data() {
    return {
      formData: {
        paddingX: 94,
        paddingY: 75,
        w: 12,
        h: 4
      },
      layout: [
        { x: 0, y: 0, w: 12, h: 4, i: '0', data: {} },
        { x: 0, y: 4, w: 12, h: 4, i: '1', data: {} },
        { x: 0, y: 8, w: 12, h: 4, i: '2', data: {} },
      ],
    }
  },
  methods: {
    handleAddNode() {
      this.$refs.myGridLayoutRef.addItem({ ...this.formData })
    },
    handleItemClick(data) {
      console.log(data)
    },
    printPDF() {
      const element = this.$refs.a3Paper;
      const opt = {
        margin: 0,
        filename: 'grid-layout.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a3', orientation: 'landscape' }
      };
      html2pdf().from(element).set(opt).save();
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

html,
body,
#app {
  height: 100%;
}

.container {
  display: flex;
  overflow: hidden;
  height: 100%;
}

.left {
  flex-shrink: 0;
  width: 340px;
  padding-right: 20px;
}

.right {
  flex: 1;
  overflow: auto;
  padding: 20px;
}

.a3-paper {
  /* transform: scale(0.5); */
  transform-origin: top left;
  flex-shrink: 0;
  /* height: 297mm;
  width: 420mm; */
  /* width: 1587.39px;
  height: 1122.52px; */
  width: 1587px;
  height: 1122px;
  padding: 20mm 25mm;
  display: flex;
  box-sizing: border-box;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

  /* 包含padding和border */
  overflow: hidden;
  /* 防止内容溢出 */
}
</style>
