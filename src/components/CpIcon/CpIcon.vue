<script setup>
import { computed } from 'vue';

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#333'
  }
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<template>
    <svg aria-hidden="true" class="cp-icon">
        <use :href="symbolId" :fill="props.color" />
    </svg>
</template>

<style lang="less" scoped>
.cp-icon {
  width: 2em;
  height: 2em;
}
</style>
