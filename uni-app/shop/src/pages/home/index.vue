<template>
  <view>
    <uni-swiper-dot :info="bannerList" :current="current" field="content" :mode="mode" :dots-styles="dotsStyles">
      <swiper class="swiper-box" @change="change" :autoplay="3000">
        <swiper-item v-for="(item, index) in bannerList" :key="index">
          <view class="swiper-item" :class="'swiper-item' + index">
            <img :src="item.picUrl" alt="" style="width: 100%; height: 100%" />
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
  </view>
  <view class="main">
    <plate class="section-header" title="商品列表" />
  </view>
</template>

<script setup lang="ts">
import uniSwiperDot from '@/components/uni-ui/uni-swiper-dot/uni-swiper-dot.vue'
import { onMounted, reactive, ref } from 'vue'
import API_BANNER from '@/apis/banner'

const current = ref(0)
const mode = ref('dot')
const bannerList = ref<Recordable[]>([])
const dotsStyles = reactive({
  backgroundColor: '#ebedf0',
  border: '1px #ebedf0 solid',
  color: '#fff',
  selectedBackgroundColor: '#1ba784',
  selectedBorder: '1px #1ba784 solid',
})

onMounted(() => {
  getBannerList()
})

const change = (e: any) => {
  current.value = e.detail.current
}

function getBannerList() {
  API_BANNER.bannerList({ type: 'indexBanner' }).then((res: any) => {
    bannerList.value = res?.data || []
  })
}
</script>

<style lang="scss" scoped>
.swiper-box {
  height: 200px;
}

.swiper-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #fff;
}
</style>
