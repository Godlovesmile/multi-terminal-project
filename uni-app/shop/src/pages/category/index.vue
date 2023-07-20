<template>
  <view class="content">
    分类
    <uni-steps
      :options="[{ title: '事件一' }, { title: '事件二' }, { title: '事件三' }, { title: '事件四' }]"
      :active="1"
    >
    </uni-steps>
  </view>
</template>

<script setup lang="ts"></script>

<style></style>
