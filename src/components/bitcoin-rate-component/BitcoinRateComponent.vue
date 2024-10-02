<template>
  <section class="bitcoin-rate">
    <div class="bitcoin-rate__top">
      <div class="bitcoin-rate__name-sign">Валюты</div>
    </div>
    <div class="bitcoin-rate__main" v-if="assetsList?.length">
      <div
        class="bitcoin-rate__line-info"
        v-for="asset in assetsList"
        :key="asset.rank"
      >
        <div class="bitcoin-rate__info-name">{{ asset.name }}</div>
        <div
          class="bitcoin-rate__current-price"
          :class="{'bitcoin-rate__current-price--process': asset.isUpdateProcess}"
          :title="String(asset.priceUsd)"
        >
          {{ asset.priceUsd }}
        </div>
      </div>
    </div>
    <div
      class="bitcoin-rate__no-options"
      v-if="!localLoading && !assetsList?.length"
    >
      Ничего нет :(
    </div>
    <div
      class="bitcoin-rate__loading"
      v-if="localLoading || !assetsList?.length"
    >
      Загрузка
    </div>
    <div class="bitcoin-rate__controls"></div>
  </section>
</template>

  
<script lang="ts" setup>
import { onBeforeMount, onMounted, reactive, ref, watch } from "vue";
import { AssetsModel } from "@/components/bitcoin-rate-component/models/AssetsModel";
import { AdapterService } from "@/components/bitcoin-rate-component/adapter";
import { gsap } from "gsap";



/**
 * Объединенный тип
 */
interface IUnionAdapterType extends AssetsModel {
  isUpdateProcess?: boolean;
}

/**
 * Адаптер АПИ
 */
const adapterService = new AdapterService();
/**
 * Данные
 */
const assetsList = ref<Array<IUnionAdapterType>>([]);
/**
 * Индикатор загрузки адаптера
 */
const localLoading = ref(false);

/**
 * Получение всех ассетов валют
 */
const getAllAssets = async () => {
  localLoading.value = true;
  let { Value, IsSuccess } = await adapterService.getAll();
  if (!IsSuccess) {
    // ...
  }
  assetsList.value = Value;
  assetsList.value.map((elem) => {
    elem.isUpdateProcess = false
  })
  localLoading.value = false;
};

/**
 * Подключение
 */
// TODO Перенести подключение в адаптер
const pricesWs = new WebSocket(
  "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin"
);

/**
 * Слушатель событий
 * @param msg Данные
 */

pricesWs.onmessage = function (msg) {
  /**
   * Парсинг данных
   */
  const keysRawData = Object.keys(JSON.parse(msg.data));
  const valuesForKeys = JSON.parse(msg.data);
  if (assetsList.value.length) {
    keysRawData.forEach((keyRawData, index) => {
      const indexedUpdate = assetsList.value.findIndex(
        (x: AssetsModel) => x.id === keyRawData
      );

      /**
       * Анимация курса
       */
      gsap.to(assetsList.value[indexedUpdate], {
        duration: 1,
        priceUsd: valuesForKeys[keyRawData],
        onStart: (e) => {
          assetsList.value[indexedUpdate].isUpdateProcess = true;
        },
        onComplete: (e) => {
          assetsList.value[indexedUpdate].isUpdateProcess = false;
        },
      });
    });
  }
};

onBeforeMount(() => {
  getAllAssets();
});
</script>


<style lang="scss">
@import "./style.scss";
</style>
