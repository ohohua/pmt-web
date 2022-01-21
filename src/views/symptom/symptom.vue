<script setup>
import symptomHeader from "./components/symptom-header.vue";
import symptomDoctor from "./components/symptom-doctor.vue";
import symptomMessage from "./components/symptom-message.vue";
</script>

<template>
  <div class="pd10 f fd-col h100p">
    <symptom-header />

    <div class="f1 h0 mt10 f">
      <symptom-doctor  />
      <symptom-message class="ml10 f1"/>
    </div>
  </div>
</template>
<style lang="scss"></style>
