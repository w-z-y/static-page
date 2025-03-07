<template>
  <MySpace wrap>
    <MyCard class="w-100">
      <h3>一行</h3>
      <MyTooltip>
        <span>未超出</span>
      </MyTooltip>
      <div style="width: 200px; overflow: hidden">
        <MyButton style="width: 100px">
          <MyTooltip class="w-100"> 按钮->超出：鼠标悬停在这里查看提示鼠标悬停在这里查看提示 </MyTooltip>
        </MyButton>
        <MyTooltip class="w-100">
          <span>超出：鼠标悬停在这里查看提示鼠标悬停在这里查看提示</span>
        </MyTooltip>
      </div>
    </MyCard>

    <MyCard>
      <h3>多行</h3>
      <MyTooltip :lines="2">
        <span>鼠标悬停在这里查看提示鼠标悬停在这里查看提示</span>
      </MyTooltip>
    </MyCard>

    <MyCard>
      <h3>content</h3>
      <MyTooltip content="xxx">
        <span>鼠标悬停在这里查看提示鼠标悬停在这里查看提示</span>
      </MyTooltip>
    </MyCard>

    <MyCard>
      <h3>悬浮提示</h3>
      <MyTooltip alwaysShow content="xxx">
        <span>alwaysShow</span>
      </MyTooltip>
    </MyCard>

    <MyCard>
      <h3>placement</h3>
      <div>
        <MyTooltip alwaysShow content="xxx">
          <MyButton>alwaysShow</MyButton>
        </MyTooltip>
      </div>
    </MyCard>
  </MySpace>
</template>

<script>
export default {
  data() {
    return {
      placementList: {
        top: [
          {
            label: '上左',
            placement: 'top-start',
          },
          {
            label: '上',
            topRight: 'top',
          },
          {
            label: '上右',
            topRight: 'top-end',
          },
        ],
      },
    };
  },
};
</script>
