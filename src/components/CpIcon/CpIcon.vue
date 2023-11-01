<script setup>
import { computed } from 'vue';

const props = withDefaults(defineProps({
  // eslint-disable-next-line no-undef
  prefix: icon
}));
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<template>
    <div class="icon-page">
        <svg aria-hidden="true" class="cp-icon">
            <use :href="symbolId" :fill="color" />
        </svg>
    </div>
</template>

<style lang="less" scoped>
.cp-icon {
  width: 1em;
  height: 1em;
}
</style>
