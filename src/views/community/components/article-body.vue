<script setup>
import { ref } from "vue";
import api from "@api";
import articleItem from "./article-item.vue";

const type = ref("NEW");
const comment = ref([]);
const loadComment = () => {
  api.header
    .loadAllComment({
      type: type.value,
    })
    .then((res) => {
      comment.value = res.data;
    })
    .catch((e) => console.log(e));
};
const newHandle = () => {
  type.value = "NEW";
  loadComment();
};
const hotHandle = () => {
  type.value = "HOT";
  loadComment();
};
loadComment();
defineExpose({ loadComment }); // 将该方法暴露给父组件

</script>

<template>
  <n-tabs type="line">
    <n-tab-pane name="hot" tab="最新" @click="newHandle">
      <article-item v-for="it in comment" :key="it.id" :it="it"/>
    </n-tab-pane>
    <n-tab-pane name="new" tab="最热" @click="hotHandle">
    <article-item v-for="it in comment" :key="it.id" :it="it"/>
      <!-- <n-card
        :segmented="{ footer: 'soft' }"
        class="mb10"
        v-for="it in comment"
        :key="it.id"
      >
        {{ it.content }}
        <template #footer>
          <div class="f jc-sb">
            <Icon size="large" class="cp">
              <ShareIcon />
            </Icon>
            <div class="cp" @click="showModal = true">
              <Icon size="large">
                <CommentIcon />
              </Icon>
              <span style="margin-left: 3px">{{
                it.subComments.length === 0 ? "" : it.subComments.length
              }}</span>
            </div>
            <div :class="{ isActive: flag }" @click="HandleSortByFire">
              <Icon size="large" class="cp">
                <ThumbIcon />
              </Icon>
              <span style="margin-left: 3px">{{ it.praiseQuantity }}</span>
            </div>
          </div>
          <div class="sub-comment" v-if="showModal">
            <div v-for="item in it.subComments" :key="item.id">
              {{ item.content }}
            </div>
            <n-input-group>
              <n-input maxlength="200" v-model:value="subComment" />
              <n-button type="primary" ghost @click="subCommentHandle(it.id)">
                评论
              </n-button>
            </n-input-group>
          </div>
        </template>
      </n-card> -->
    </n-tab-pane>
  </n-tabs>
</template>

<style lang="scss">

</style>
