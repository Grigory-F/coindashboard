<template>
  <div
    class="input"
    :class="{
      'input--focused': isFocus,
      'input--disabled': props.isDisabled
    }"
    @click="clickFocusOutside"
  >
    <div
      class="input-container"
      :class="{
        'input-container--focused': isFocus,
        'input-container--with-value': value,
        'input-container--error': props.isWithError,
        'input-container--small': props.isSmallSize,
        'input-container--disabled': props.isDisabled
      }"
    >
      <div class="input-container__left-slot" v-if="isLeftInputAddons">
        <slot name="leftInputAddons"></slot>
      </div>
      <div class="input-container__input-wrapper">
        <span class="input-container__input-label">{{ props.label }}</span>
        <input
          class="input-container__input"
          :type="props.type"
          :maxlength="props.maxLength"
          :placeholder="props.placeholder"
          @focus="onFocus"
          @blur="onBlur"
          @keyup.enter="onEnter"
          :disabled="props.isDisabled"
          ref="currentInput"
          tabindex="0"
          :value="value"
          @input="onInput"
          :autocomplete="computedIsAutocomplete"
        />
      </div>
      <div class="input-container__right-slot" v-if="isRightInputAddons">
        <slot name="rightInputAddons"></slot>
      </div>
    </div>

    <div
      class="input__hint-message"
      v-if="props.isWithHint"
      :class="{
        'input__hint-message--error': props.isWithError,
        'input__hint-message--show': props.isShowHint
      }"
    >
      <slot name="hintMessage"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed, onMounted, ref, useSlots, defineEmits } from 'vue'

const props = defineProps({
  /**
   * Показывать ли линейку range значений
   */
  isShowRangeLine: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Значение
   */
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: null
  },
  /**
   * Максимальное значение для слайдера
   */
  maxSliderValue: {
    type: Number as PropType<number>,
    default: 120
  },
  /**
   * Минимальное значение для слайдера
   */
  minSliderValue: {
    type: Number as PropType<number>,
    default: 0
  },
  /**
   * Разбег значений для подписей к слайдеру
   */
  rangeSignsSliderValue: {
    type: Number as PropType<number>,
    default: 10
  },
  /**
   * Лэйбл
   */
  label: {
    type: String as PropType<string>,
    default: ''
  },
  /**
   * Заголовок
   */
  title: {
    type: String as PropType<string>,
    default: ''
  },
  /**
   * Нужно ли автозаполнение
   */
  isAutocomplete: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Плейсхолдер
   */
  placeholder: {
    type: String as PropType<string>,
    default: ''
  },
  /**
   * Показывать ли подсказку всегда
   */
  isShowHintDefault: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Показывать ли подсказку в данный момент
   */
  isShowHint: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Показывать ли подсказку вообще, есть ли она, делать ли зарезервированное снизу свободное пространство
   */
  isWithHint: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  /**
   * Ошибка
   */
  isWithError: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Дизейбл
   */
  isDisabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Только для чтения
   */
  isReadonly: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Тип
   */
  type: {
    type: String as PropType<string>,
    default: 'text'
  },
  /**
   * Макс длина
   */
  maxLength: {
    type: String as PropType<string>,
    default: undefined
  },
  /**
   * Размер
   */
  isSmallSize: {
    type: Boolean as PropType<boolean>,
    default: false
  }
})

/**
 * Вычисляет, нужно ли автозаполнение
 */
const computedIsAutocomplete = computed(() =>
  props.isAutocomplete ? 'on' : 'off'
)

/**
 * Внутреннее значение
 */
const innerValue = ref<string | number>('')
/**
 * Значение
 */
const value = computed({
  get: () => {
    return props.modelValue == null ? innerValue.value : props.modelValue
  },
  set: (value) => {
    emit('update:modelValue', value)
    innerValue.value = value
  }
})
/**
 * Элемент салйдера
 */
const inputSlider = ref<HTMLInputElement>()


const onInput = (e: Event) => {
  emit('input', (e.target as HTMLInputElement).value)
  value.value = (e.target as HTMLInputElement).value
}


/**
 * События
 */

const emit = defineEmits<{
  (eventName: 'update:modelValue', value: string | number): void
  (eventName: 'focus', value: boolean): void
  (eventName: 'blur', value: boolean): void
  (eventName: 'enter', value: boolean): void
  (eventName: 'input', value: string | number): void
}>()
/**
 * Инпут
 */
const currentInput = ref<HTMLInputElement>()
/**
 * Фокус
 */
const isFocus = ref(false)
/**
 * При кике вне элемента инпута
 */
const clickFocusOutside = () => {
  if (props.isDisabled && isFocus.value) return
  if (currentInput.value) {
    currentInput.value.focus()
  }
}
/**
 * При фокусе
 */
const onFocus = () => {
  if (props.isDisabled) return
  isFocus.value = true
  emit('focus', isFocus.value)
}
/**
 * При блюре
 */
const onBlur = () => {
  if (props.isDisabled) return
  isFocus.value = false
  emit('blur', isFocus.value)
}

/**
 * При нажатии на клавишу энтер
 */
const onEnter = () => {
  if (props.isDisabled) return
  isFocus.value = false
  emit('enter', isFocus.value)
}

/**
 * Столы
 */
const slots = useSlots()
/**
 * Если ли кастомный контент слева
 */
const isLeftInputAddons = computed(
  () => slots && slots.leftInputAddons && slots.leftInputAddons()
)
/**
 * Если ли кастомный контент справа
 */
const isRightInputAddons = computed(
  () => slots && slots.rightInputAddons && slots.rightInputAddons()
)
</script>

<style lang="scss">
@import './style.scss';
</style>
