<script setup>
import { ShareAltOutlined as ShareIcon } from "@vicons/antd";
import { ThumbsUpRegular as ThumbIcon } from "@vicons/fa";
import { CommentOutlined as CommentIcon } from "@vicons/antd";
import { Icon } from "@vicons/utils";
import { ref } from "vue";

const flag = ref(false); // 只能点赞一次的标志位
const HandleSortByFire = (e) => {
  e.stopPropagation(); // 阻止冒泡
  if (flag.value) {
    return;
  }
  flag.value = true;
};
</script>

<template>
  <n-tabs type="line">
    <n-tab-pane name="hot" tab="最热">
      <n-card :segmented="{ footer: 'soft' }" class="mb10">
        content
        <template #footer>
          <div class="f jc-sb">
            <Icon size="large" class="cp">
              <ShareIcon />
            </Icon>
            <div class="division-line"></div>
            <Icon size="large" class="cp">
              <CommentIcon />
            </Icon>
            <div class="division-line"></div>
            <div :class="{ isActive: flag }" @click="HandleSortByFire">
              <Icon size="large" class="cp">
                <ThumbIcon />
              </Icon>
              <span style="margin-left: 3px" ></span>
            </div>
          </div>
        </template>
      </n-card>
    </n-tab-pane>
    <n-tab-pane name="new" tab="最新">最新</n-tab-pane>
  </n-tabs>
</template>

<style lang="scss">
.isActive {
  color: rgb(24, 160, 88);

  .division-line {
    width: 10px;
    height: 10px;
    background-color: black;
    
    // border: black 1px solid;
  }
}
</style>
