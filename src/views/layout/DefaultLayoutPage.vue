<template>
    <a-layout class="layout">
        <a-layout-sider collapsible>
            <div class="logo" ></div>
            <MenuTree/>
        </a-layout-sider>
        <a-layout>
            <a-affix :offsetTop="10">
                <a-layout-header style="padding-left: 20px;height: 80px;">
                    Header
                </a-layout-header>
            </a-affix>
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
    // overflow-y: hidden;
}

.layout-navbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: @nav-size-height;
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
    flex-direction: column;
  }
</style>
