<template>
    <a-menu v-for="(value, key) in menuList" :key="key" :selected-keys="currentSelectKeys" :style="{ width: '100%' }"
            @menuItemClick="onClickMenuItem">
        <template v-for="(item, index) in value" :key="item.name">
            <a-menu-item>
                <!-- <IconHome /> -->
                {{ item.meta.title }}
            </a-menu-item>
        </template>
    </a-menu>
</template>
<script setup>
import { routes } from '@/router';
import {
//   IconCaretRight,
//   IconCaretLeft,
//   IconHome,
//   IconCalendar
} from '@arco-design/web-vue/es/icon';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const menuList = computed(() => {
  const menuListTemp = {};
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].children.length !== 0) {
      menuListTemp[routes[i].meta.order] = [];
      for (let j = 0; j < routes[i].children.length; j++) {
        menuListTemp[routes[i].meta.order].push(routes[i].children[j]);
      }
    }
  }
  return menuListTemp;
});

function updateMenuSelected () {
  currentSelectKeys.value = [router.currentRoute.value.name];
}
async function onClickMenuItem (key) {
  await router.push({ name: key });
  updateMenuSelected();
}

const currentSelectKeys = ref(['homePage']);

onMounted(() => {
  updateMenuSelected();
});
</script>
<style lang="less"></style>
