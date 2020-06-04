<template>
  <div class="silder">
    <swiper :options="swiperOption">
      <swiper-slide>
        <img src="../assets/banner/b1.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/banner/b2.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/banner/b3.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/banner/b4.jpg" alt />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <!-- <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div> -->
    </swiper>
  </div>
</template>

<script>
export default {
  name: "silder",
  data() {
    return {
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        pagination: {
          el: ".swiper-pagination"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        loop: true
      }
    };
  }
};
</script>

<style scoped>
.silder .swiper-pagination-bullet-active{
    background: red !important;
}
</style>