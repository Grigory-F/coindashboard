<template>
  <div class="home-page">
    <BitcoinRateComponent
      :assetsListData="assetsList"
      :parentDataLoading="localLoading"
    />
  </div>
</template>


<script lang="ts" setup>
import { BitcoinRateComponent } from "@/components/bitcoin-rate-component";
import { onBeforeMount, onMounted, ref } from "vue";
import { AssetsModel } from "@/components/bitcoin-rate-component/models/AssetsModel";
import { AdapterService } from "@/components/bitcoin-rate-component/adapter";

const adapterService = new AdapterService();
const assetsList = ref<Array<AssetsModel>>([]);
const localLoading = ref(false);

const getAllAssets = async () => {
  localLoading.value = true;
  let { Value, IsSuccess } = await adapterService.getAll();
  if (!IsSuccess) {
    // ...
  }
  assetsList.value = Value;
  localLoading.value = false;
};

const pricesWs = new WebSocket(
  "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin"
);

pricesWs.onmessage = function (msg) {
  console.log(msg.data);
};

onBeforeMount(() => {
  getAllAssets();
});
</script>


<style lang="scss">
@import "./style.scss";
</style>



