<template>
  <view class="content" style="margin-top: 120px">
    <span> 首页 </span>
    <div>
      <uni-rate :readonly="true" :value="2" />
    </div>
    <uni-badge text="1"></uni-badge>
  </view>
</template>

<script setup lang="ts">
import uniIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue'
import uniRate from '@/uni_modules/uni-rate/components/uni-rate/uni-rate.vue'
import uniBadge from '@/uni_modules/uni-badge/components/uni-badge/uni-badge.vue'
</script>

<style></style>
