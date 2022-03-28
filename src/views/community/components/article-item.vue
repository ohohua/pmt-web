<script setup>
import { ShareAltOutlined as ShareIcon } from "@vicons/antd";
import { ThumbsUpRegular as ThumbIcon } from "@vicons/fa";
import { CommentOutlined as CommentIcon } from "@vicons/antd";
import { Icon } from "@vicons/utils";
import { ref } from "vue";
import api from "@api";
import { pinia } from "@store/index.js";
import { useMessage } from "naive-ui";
import dayjs from "dayjs";

const message = useMessage();
const store = pinia.useUserStore();
const props = defineProps({
  it: {
    type: Object,
    default: () => ({}),
  },
});

const flag = ref(false); // 只能点赞一次的标志位
const HandleSortByFire = (e) => {
  e.stopPropagation(); // 阻止冒泡
  if (flag.value) {
    return;
  }
  props.it.praiseQuantity += 1;
  flag.value = true;
  updateMessage();
};
const updateMessage = () => {
  const data = {
    id: props.it.id,
    praiseQuantity: props.it.praiseQuantity,
  };
  api.header.updatePraise(data).catch((e) => console.log(e));
};

const showModal = ref(false); // 是否显示子评论
const subComment = ref(null); // 子评论
const subCommentHandle = (id) => {
  const data = {
    content: subComment.value,
    community: id,
    nickname: store.nickname,
    avatar: store.avatar,
  };
  api.header
    .subSave(data)
    .then((res) => {
      if (res.code === 0) {
        message.success("评论成功！");
        loadComment();
      }
    })
    .catch((e) => console.log(e))
    .finally(() => {
      subComment.value = null;
    });
};

// 复制评论
const copyHandle = () => {
  const text = `${props.it.content} #心理医疗系统# ${location.href}`;
  if (navigator.clipboard) {
    // clipboard api 复制
    navigator.clipboard.writeText(text);
    message.success("复制成功！");
  } else {
    message.info("复制失败！");
  }
};
</script>

<template>
  <n-card :segmented="{ footer: 'soft' }" class="mb10">
    <div class="f ai-c cp">
      <n-avatar size="small" round :src="props.it.avatar" />
      <span class="ml12">{{ props.it.nickname }}</span>
      <span class="ml12" style="color: #8b8b8b">{{
        `${
          dayjs().diff(dayjs(props.it.createTime), "hour") > 24
            ? dayjs().diff(dayjs(props.it.createTime), "day") + "天前"
            : dayjs().diff(dayjs(props.it.createTime), "hour") + "小时前"
        }`
      }}</span>
    </div>
    <div class="ml40 mt20">{{ props.it.content }}</div>
    <template #footer>
      <div class="f jc-sb">
        <n-popover trigger="click" placement="bottom">
          <template #trigger>
            <Icon size="large" class="cp">
              <ShareIcon />
            </Icon>
          </template>
          <n-button @click="copyHandle">复制链接</n-button>
        </n-popover>

        <div class="cp" @click="showModal = true">
          <Icon size="large">
            <CommentIcon />
          </Icon>
          <span style="margin-left: 3px">{{
            props.it.subComments.length === 0 ? "" : props.it.subComments.length
          }}</span>
        </div>
        <div :class="{ isActive: flag }" class="cp" @click="HandleSortByFire">
          <Icon size="large">
            <ThumbIcon />
          </Icon>
          <span style="margin-left: 3px">{{ props.it.praiseQuantity }}</span>
        </div>
      </div>
      <div class="sub-comment" v-if="showModal">
        <div
          v-for="item in props.it.subComments"
          :key="item.id"
          class="mt20 sub-comment-content"
        >
          <div class="f ai-c cp">
            <n-avatar size="small" round :src="item.avatar" />
            <span class="ml12">{{ item.nickname }}</span>
          </div>
          <div class="ml40 mt20" style="color: #8b8b8b">{{ item.content }}</div>
        </div>
        <div class="f jc-sb" style="margin-top: 20px">
          <n-input-group class="ml20" style=" ;">
            <n-input maxlength="200" v-model:value="subComment" />
            <n-button
              type="primary"
              ghost
              @click="subCommentHandle(props.it.id)"
            >
              评论
            </n-button>
          </n-input-group>
        </div>
      </div>
    </template>
  </n-card>
</template>

<style lang="scss">
.isActive {
  color: rgb(24, 160, 88);
}
.sub-comment {
  border-top: 1px dashed #efeff5;
  margin-top: 10px;
  color: #8b8b8b;

  &-content {
    border-bottom: 1px solid #efeff5;
    // background-color: rgba($color: #bcf1b1, $alpha: .2) ;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(111, 206, 158, 0.3) 0px 18px 36px -18px inset;
    margin-left: 50px;
  }
}
</style>
