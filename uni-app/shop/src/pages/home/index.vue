<template>
  <view>
    <uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
      <swiper class="swiper-box" @change="change" :autoplay="3000">
        <swiper-item v-for="(item, index) in bannerList" :key="index">
          <img :src="item.picUrl" alt="" style="width: 100%; height: 100%" />
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
  </view>
</template>

<script setup lang="ts">
import uniSwiperDot from '@/components/uni-ui/uni-swiper-dot/uni-swiper-dot.vue'
import { onMounted, ref } from 'vue'
import API_BANNER from '@/apis/banner'

const bannerList = ref<any[]>([])

onMounted(() => {
  getBannerList()
})

const info = [
  {
    content: '内容 A',
  },
  {
    content: '内容 B',
  },
  {
    content: '内容 C',
  },
]
const current = ref(0)
const mode = ref('round')

const change = (e: any) => {
  current.value = e.detail.current
}

function getBannerList() {
  API_BANNER.bannerList({ type: 'indexBanner' }).then((res: any) => {
    bannerList.value = res?.data || []
  })
}
</script>

<style></style>
