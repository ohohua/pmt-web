<script setup>
import symptomHeader from "./components/symptom-header.vue";
import symptomDoctor from "./components/symptom-doctor.vue";
import symptomMessage from "./components/symptom-message.vue";
import { ref } from 'vue';
const headerRef = ref(null);
const messageIsActive = ref(false);
const showRight = () => {
  if(!messageIsActive.value) {
    headerRef.value.handleStep();
  }
  messageIsActive.value = true;

}
</script>

<template>
  <div class="pd10 f fd-col h100p">
    <symptom-header ref="headerRef"/>

    <div class="f1 h0 mt10 f">
      <symptom-doctor  @showRight="showRight"/>
      <symptom-message class="ml10 f1" v-if="messageIsActive"/>
    </div>
  </div>
</template>
<style lang="scss"></style>
