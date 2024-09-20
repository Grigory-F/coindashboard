<template>
  <section class="bitcoin-rate">
    <div class="bitcoin-rate__top">
      <div class="bitcoin-rate__name-sign">Валюты</div>
    </div>
    <div class="bitcoin-rate__main" v-if="props.assetsListData?.length">
      <div
        class="bitcoin-rate__line-info"
        v-for="asset in props.assetsListData"
        :key="asset.rank"
      >
        <div class="bitcoin-rate__info-name">{{ asset.name }}</div>
        <div class="bitcoin-rate__current-price">
          {{ asset.priceUsd }}
        </div>
      </div>
    </div>
    <div class="bitcoin-rate__no-options" v-else>Ничего нет :(</div>
    <div class="bitcoin-rate__loading" v-if="props.parentDataLoading">
      Ничего нет :(
    </div>

    <div class="bitcoin-rate__controls"></div>
  </section>
</template>
  
  <script lang="ts" setup>
import { AssetsModel } from "./models/AssetsModel";

const props = defineProps<{
  /**
   * Данные из родителя
   */
  assetsListData?: Array<AssetsModel>;
  /**
   * Загрузка внутри родителя
   */
  parentDataLoading?: boolean;
}>();
</script>
  
<style lang="scss">
@import "./style.scss";
</style>
  