<template>
    <a-menu v-for="(value, key) in menuList" :key="key"
            :selected-keys="currentSelectKeys" :style="{ width: '100%' }"
            @menuItemClick="onClickMenuItem">
        <template v-for="item in value" :key="item">
            <a-menu-item>
                <CpIcon v-if="currentSelectKeys[0] === item.name" :name="item.meta.iconfill" />
                <CpIcon v-else :name="item.meta.icon"/>
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
import CpIcon from '../CpIcon/CpIcon.vue';
const currentSelectKeys = ref(['homePage']);
const router = useRouter();
const menuList = computed(() => {
  const menuListTemp = {};
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].children) {
      if (routes[i].children.length !== 0) {
        menuListTemp[routes[i].meta.order] = [];
        for (let j = 0; j < routes[i].children.length; j++) {
          menuListTemp[routes[i].meta.order].push(routes[i].children[j]);
        }
      }
    }
  }
  return menuListTemp;
});

function updateMenuSelected () {
  currentSelectKeys.value = [router.currentRoute.value.name];
}
async function onClickMenuItem (key) {
  console.log('key', key);
  const url = key.name;
  await router.push({ name: url });
  updateMenuSelected();
}

onMounted(() => {
  updateMenuSelected();
});
</script>
<style lang="less">
.arco-menu-item{
  display: flex;
  align-items: center;
  justify-content: center;
  .cp-icon{
    margin-right: 14px;
  }
}

</style>
