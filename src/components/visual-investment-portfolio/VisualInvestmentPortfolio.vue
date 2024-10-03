<template>
  <section class="visual-investment">
    <h2 class="visual-investment__title">Инвестиции</h2>
    <div class="visual-investment__content">
      <div class="visual-investment__inner-total">
        <div class="visual-investment__inner-total-sign">
          Всего вложено: 1000$
        </div>
        <div class="visual-investment__input">
          <BaseInput
            v-model="investmentModelInput"
            placeholder="$"
            label="Новое пополнение"
            type="number"
            :isWithHint="false"
          />
          <div class="visual-investment__button">Ввести</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { BaseInput } from "@/ui/base-input";
import { ref } from "vue";

const investmentModelInput = ref();
</script>

<style lang="scss">
@import "./style.scss";
</style>