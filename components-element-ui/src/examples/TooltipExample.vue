<template>
    <div style="width:100px;">
        <h3>一行</h3>
        <MyTooltip>
            <span>未超出</span>
        </MyTooltip>
        <MyTooltip>
            <span>超出：鼠标悬停在这里查看提示鼠标悬停在这里查看提示</span>
        </MyTooltip>
        <h3>多行</h3>
        <MyTooltip :lines="2">
            <span>鼠标悬停在这里查看提示鼠标悬停在这里查看提示</span>
        </MyTooltip>
        <h3>content</h3>
        <MyTooltip content="xxx">
            <span>鼠标悬停在这里查看提示鼠标悬停在这里查看提示</span>
        </MyTooltip>
        <h3>悬浮提示</h3>
        <MyTooltip alwaysShow content="xxx">
            <span>alwaysShow</span>
        </MyTooltip>
    </div>
</template>

<script>
import MyTooltip from '../components/Tooltip/index.vue';

export default {
    components: { MyTooltip }
}
</script>