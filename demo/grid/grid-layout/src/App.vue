<template>
    <div id="app">
        <div class="container">
            <div class="left">
                <h1>页面配置</h1>
                <el-form :model="pageConfig" label-width="100px">
                    <el-form-item label="paddingX">
                        <el-input-number v-model="pageConfig.paddingX"></el-input-number>
                    </el-form-item>
                    <el-form-item label="paddingY">
                        <el-input-number v-model="pageConfig.paddingY"></el-input-number>
                    </el-form-item>
                </el-form>
                <h1>节点</h1>
                <el-form :model="formData" label-width="100px">
                    <el-form-item label="节点最大数量">
                        <el-input-number v-model="formData.maxNum"></el-input-number>
                    </el-form-item>
                    <el-form-item label="width">
                        <el-input-number v-model="formData.w"></el-input-number>
                    </el-form-item>
                    <el-form-item label="height">
                        <el-input-number v-model="formData.h"></el-input-number>
                    </el-form-item>
                    <el-form-item label="标题">
                        <el-input v-model="formData.title"></el-input>
                    </el-form-item>
                    <el-form-item label="内容">
                        <el-input v-model="formData.content" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleAddNode(formData)" type="primary">
                            添加节点1
                        </el-button>
                        <MyInsertTableSelect @select="handleInsertTableSelect">
                            <el-button type="primary">添加节点2</el-button>
                        </MyInsertTableSelect>
                        <el-button @click="printPDF" type="success">打印PDF</el-button>
                    </el-form-item>
                </el-form>
                <MyInsertTableSelect />
            </div>
            <div class="right">
                A3
                <div
                    class="a3-paper"
                    ref="a3Paper"
                    :style="{
                        padding: `${pageConfig.paddingX}px ${pageConfig.paddingY}px`,
                    }"
                >
                    <MyGridLayout
                        :col-num="24"
                        style="flex: 1"
                        v-model="layout"
                        ref="myGridLayoutRef"
                        @item-click="handleItemClick"
                    >
                        <template #default="{ data }">
                            <el-form :mode="data" label-width="60px">
                                <el-form-item label="标题">
                                    <el-input
                                        v-model="data.title"
                                        placeholder="请输入标题"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="内容">
                                    <el-input
                                        v-model="data.content"
                                        type="textarea"
                                        placeholder="请输入内容"
                                    ></el-input>
                                </el-form-item>
                            </el-form>
                        </template>
                    </MyGridLayout>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MyGridLayout from "./components/GridLayout";
import MyInsertTableSelect from "./components/InsertTableSelect";
import html2pdf from "html2pdf.js";

export default {
    name: "App",
    components: {
        MyGridLayout,
        MyInsertTableSelect,
    },
    data() {
        return {
            pageConfig: {
                paddingX: 94,
                paddingY: 75,
            },

            formData: {
                w: 12,
                h: 4,
                maxNum: 12,
                title: "这是一个标题",
                content: "这是一段文字内容...",
            },
            layout: [{ x: 0, y: 0, w: 12, h: 4, i: "0", data: {} }],
        };
    },
    methods: {
        handleInsertTableSelect(data) {
            const { w, h } = data;
            console.log(w, h);
            this.handleAddNode({ ...this.formData, w, h });
        },
        handleAddNode(data) {
            if (this.layout.length < this.formData.maxNum) {
                this.$refs.myGridLayoutRef.addItem(data);
            } else {
                this.$message.warning("已超出最大创建数量! 无法继续创建");
            }
        },
        handleItemClick(data) {
            console.log(data);
        },
        printPDF() {
            const element = this.$refs.a3Paper;
            const opt = {
                margin: 0,
                filename: "grid-layout.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "mm", format: "a3", orientation: "landscape" },
            };
            html2pdf().from(element).set(opt).save();
        },
    },
};
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
    z-index: 1;
    width: 340px;
    padding: 20px 20px 0 0;
    box-shadow: 0 0 10px #ccc;
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
    /* overflow: hidden; */
    /* 防止内容溢出 */
}
</style>
