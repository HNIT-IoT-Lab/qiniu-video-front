<script setup>
import avatar from '@/assets/img/avatar.jpg';

const changeContent = () => {

};

</script>

<template>
    <div class="mine-page">
        <a-row class="header">
            <a-col :span="6">
                <a-image width="150" height="150" :src="avatar" style="border-radius: 50%;">
                    <template #loader>
                        <img width="150" :src="avatar" style="filter: blur(5px);border-radius: 50%;" />
                    </template>
                </a-image>
            </a-col>
            <a-col :span="18" class="user-info">
                <div class="nickname">理香</div>
                <div class="userid">用户id: &nbsp;9976543</div>
                <div class="descript">个人简介</div>
                <div class="sex">女</div>
                <cp-icon name="appreciate_fill_light"/>
                <div class="behavior-data-all">
                    <div class="behavior-data"><span>45</span>关注 </div>
                    <div class="behavior-data"><span>15</span> 粉丝<span></span></div>
                    <div class="behavior-data"><span>158</span>获赞</div>
                </div>
            </a-col>
        </a-row>
        <div class="content">
            <a-tabs @tab-click="changeContent" type="rounded" size="large"  :animation="true">
                <a-tab-pane key="1" title="发布">
                    发布的内容
                </a-tab-pane>
                <a-tab-pane key="2" title="点赞">
                    点赞的内容
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<style lang="less" scoped>
.mine-page {
    --color-tertiary-label: rgba(51, 51, 51, 0.6);
    --color-primary-label: #333;
    --margin-top: 16px;
    width: 100%;

    // min-width: 750px;
    .header {
        width: 70%;
        margin: 0 auto;
        // background: pink;

        .user-info {
            .nickname {
                font-size: 20px;
                font-weight: 700;
            }

            .userid {
                width: 100%;
                font-size: 12px;
                line-height: 120%;
                color: var(--color-tertiary-label);
                display: flex;
                margin-top: 8px;
            }

            .descript {
                width: 100%;
                font-size: 14px;
                line-height: 140%;
                color: var(--color-primary-label);
                margin-top: var(--margin-top);
                white-space: pre-line;
            }

            .sex {
                height: 24px;
                margin-top: var(--margin-top);
                display: flex;
                align-items: center;
                font-size: 12px;
                color: var(--color-primary-label);
                text-align: center;
                font-weight: 400;
                line-height: 120%;
            }

            .behavior-data-all {
                display: flex;

                .behavior-data {
                    margin-top: var(--margin-top);
                    margin-right: 10px;
                    color: var(--color-tertiary-label);
                    font-size: 14px;
                    line-height: 120%;
                    span {
                        color: var(--color-primary-label);
                        font-weight: 500;
                        font-size: 14px;
                        margin-right: 4px;
                    }
                }
            }

        }
    }
    .content{
        margin-top: 30px;
    }
}
</style>
