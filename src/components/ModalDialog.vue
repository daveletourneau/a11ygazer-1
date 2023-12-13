<script setup lang="ts">

import { ref, onMounted, watch } from 'vue'
import { Modal } from 'bootstrap'

const props = defineProps<{
  modelValue: boolean
  title: string
  size?: 'modal-sm' | 'modal-lg' | 'modal-xl' | 'modal-fullscreen'

}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()

const modalRef = ref<HTMLElement | null>(null)
let modal: Modal

onMounted(() => {
  if (modalRef.value) {
    modal = new Modal(modalRef.value)
  }
})

watch(() => props.modelValue, (modelValue) => {
  if (modelValue) {
    modal.show()
  } else {
    modal.hide()
  }
})

</script>

<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    tabindex="-1"
    aria-hidden="true"
    ref="modalRef"
  >
    <div
      class="modal-dialog"
      :class="$props.size"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ title }}</h4>
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>
