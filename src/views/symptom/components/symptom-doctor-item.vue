<script setup>
import { ThumbsUpRegular as ThumbIcon } from "@vicons/fa";
import { NumberSymbol16Filled as NumberIcon } from "@vicons/fluent";
import { FiberNewFilled as NewIcon } from "@vicons/material";
import { Icon } from "@vicons/utils";
const src = "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg";
const HandleSortByNumber = () => {};
const HandleSortByFire = () => {};
const HandleSortByNewest = () => {};
</script>

<template>
  <n-card
    size="small"
    hoverable
    :segmented="{ footer: true }"
    class="doctor-item cp"
  >
    <div class="f ai-c">
      <n-avatar size="small" round :src="src" />
      <span class="ml12">华佗</span>
    </div>
    <template #footer>
      <div class="f jc-sb">
        <n-tooltip trigger="hover" placement="bottom">
          <template #trigger>
            <div>
              <Icon @click="HandleSortByNumber">
                <NumberIcon />
              </Icon>
              <span>32</span>
            </div>
          </template>
          救死扶伤的人数
        </n-tooltip>
        <n-tooltip trigger="hover" placement="bottom">
          <template #trigger>
            <div>
              <Icon @click="HandleSortByFire">
                <ThumbIcon />
              </Icon>
              <span style="margin-left: 3px;">2</span>
            </div>
          </template>
          人民群众的爱戴
        </n-tooltip>
        <n-tooltip trigger="hover" placement="bottom">
          <template #trigger>
            <Icon @click="HandleSortByNewest">
              <new-icon />
            </Icon>
          </template>
          没错！我是新鲜血液
        </n-tooltip>
      </div>
    </template>
  </n-card>
</template>

<style lang="scss">
.doctor-item {
  width: 195px;
  .n-card__content {
    display: flex;
    justify-content: center;
  }
}
</style>
