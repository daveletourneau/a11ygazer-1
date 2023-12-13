<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import type { IPage } from '@/shared/interfaces'

const tempPage = ref<IPage | null>(null)

const props = defineProps<{
  modelValue: Partial<IPage>
}>()

onMounted(() => {
  tempPage.value = props.modelValue
})

watch(
  () => props.modelValue,
  (newPage) => {
    tempPage.value = newPage
  },
  { deep: true }
)

</script>

<template>
  <form
    v-if="tempPage"
    class="needs-validation"
    autocomplete="off"
  >

    <!-- TITLE  -->
    <div class="mb-3">
      <label
        for="page-title"
        class="form-label"
      >Titre <span class="visually-hidden">de la page</span>
        <span
          class="text-danger"
          aria-hidden="true"
        >*</span>
      </label>
      <input
        type="text"
        class="form-control"
        id="page-title"
        v-model="tempPage.title"
        autofocus
        required
      >
    </div>

    <!-- URL  -->
    <div class="mb-3">
      <label
        for="page-url"
        class="form-label"
      >URL <span class="visually-hidden">de la page</span>
        <span
          class="text-danger"
          aria-hidden="true"
        >*</span>
      </label>
      <input
        type="text"
        class="form-control"
        id="page-url"
        v-model="tempPage.url"
        required
      >
    </div>

    <!-- DESCRIPTION  -->
    <div class="mb-3">
      <label
        for="page-description"
        class="form-label"
      >Description</label>
      <textarea
        class="form-control"
        id="page-description"
        rows="4"
        v-model="tempPage.description"
      >
      </textarea>
    </div>

    <!-- tags -->

    <!-- images -->

  </form>
</template>