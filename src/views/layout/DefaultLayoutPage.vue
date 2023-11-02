<template>
    <a-layout class="layout">
        <a-layout-sider collapsible>
            <div class="logo"></div>
            <MenuTree />
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="layout-header">
                <div class="header-logo">logo</div>
                <div class="search">
                    <a-input-search :style="{width:'320px'}" placeholder="Please enter something" search-button>
                        <template #button-icon>
                            <!-- <icon-search/> -->
                        </template>
                        <template #button-default>
                            Search
                        </template>
                    </a-input-search>
                </div>
            </a-layout-header>
            <a-layout style="padding: 0 24px;">
                <a-layout-content class="layout-content">
                    <RouterView/>
                </a-layout-content>
                <a-layout-footer style="height: 40px;">Footer</a-layout-footer>
            </a-layout>
        </a-layout>
    </a-layout>
</template>
<script setup>
import MenuTree from '@/components/MenuTree/MenuTree.vue';
import { RouterView } from 'vue-router';
</script>
<!-- <script>
import { defineComponent, ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import {
  IconCaretRight,
  IconCaretLeft,
  IconHome,
  IconCalendar
} from '@arco-design/web-vue/es/icon';
import { RouterView } from 'vue-router';

export default defineComponent({
  components: {
    IconCaretRight,
    IconCaretLeft,
    IconHome,
    IconCalendar,
    RouterView
  },
  setup () {
    const collapsed = ref(false);
    const onCollapse = () => {
      collapsed.value = !collapsed.value;
    };
    return {
      collapsed,
      onCollapse,
      onClickMenuItem (key) {
        Message.info({ content: `You select ${key}`, showIcon: true });
      }
    };
  }
});
</script> -->
<style scoped lang="less">
@nav-size-height: 60px;
@layout-max-width: 1100px;

.layout {
  width: 100%;
  height: 100%;
  background: #ecf0f3;
}

.layout-navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: @nav-size-height;
}

.layout-header{
  display: flex;
  padding-left: 20px;
  height: 66px;
  line-height: 66px;
  background: #e1e5e9;
}

.layout-sider {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  height: 100%;
  transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);

  &::after {
    position: absolute;
    top: 0;
    right: -1px;
    display: block;
    width: 1px;
    height: 100%;
    background-color: var(--color-border);
    content: '';
  }

  > :deep(.arco-layout-sider-children) {
    overflow-y: hidden;
  }
}

.menu-wrapper {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;

  :deep(.arco-menu) {
    ::-webkit-scrollbar {
      width: 12px;
      height: 4px;
    }

    ::-webkit-scrollbar-thumb {
      border: 4px solid transparent;
      background-clip: padding-box;
      border-radius: 7px;
      background-color: var(--color-text-4);
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-text-3);
    }
  }
}

.layout-content {
    display: flex;
  }
</style>
