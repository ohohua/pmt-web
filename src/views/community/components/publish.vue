<script setup>
import { Emoji24Regular as EmojiIcon } from "@vicons/fluent";
import { PictureOutlined as Picture } from "@vicons/antd";
import { Icon } from "@vicons/utils";
import { ref, watch } from "vue";
import api from "@api";
import { pinia } from '@store/index.js';
import { useMessage } from 'naive-ui';

const message = useMessage()
const store = pinia.useUserStore();
const emit = defineEmits(['publishHandle'])
const isDisable = ref(true);
const content = ref(null);
const handleOutput = () => {
  const data = {
    content: content.value,
    praiseQuantity: 0,
    nickname: store.nickname,
    avatar: store.avatar
  }
  api.header
    .saveCommunity(data)
    .then((res) => {
      if(res.code === 0) {
        message.success('评论成功！')
      }
    })
    .catch((e) => {
      console.log(e);
    }).finally(() => {
      content.value = null;
      emit('publishHandle');
    });
};
const handleInput = () => {
  isDisable.value = false;
};
watch(
  () => content.value,
  () => {
    if (!!content.value) {
      return;
    }
    isDisable.value = true;
  }
);
</script>

<template>
  <n-card class="editor-dialog">
    <n-input
      type="textarea"
      maxlength="200"
      v-model:value="content"
      show-count
      @input="handleInput"
      placeholder="快和病友一起分享下新鲜事吧！"
    ></n-input>
    <!--  -->
    <div class="f jc-sb mt10 ai-c">
      <div class="w200 f jc-sb">
        <span class="cp f ai-c isHover">
          <Icon size="large">
            <EmojiIcon />
          </Icon>
          <span class="ml5">表情</span>
        </span>
        <span class="cp f ai-c isHover">
          <Icon size="large">
            <Picture />
          </Icon>
          <span class="ml5">图片</span>
        </span>
      </div>
      <n-button type="primary" @click="handleOutput" :disabled="isDisable"
        >发布</n-button
      >
    </div>
  </n-card>
</template>

<style lang="scss">
.editor-dialog {
  .isHover:hover {
    color: rgb(24, 160, 88);
  }
}
</style>
