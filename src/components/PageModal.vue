<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { useProjectStore } from '@/stores/ProjectStore'
import type { IPage } from '@/shared/interfaces'
import PageForm from './PageForm.vue';
import ModalDialog from '@/components/ModalDialog.vue'
import { Modal } from 'bootstrap'

const props = defineProps<{
  modelValue: boolean
  mode: 'create' | 'edit' | 'display'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'saved'): void
  (e: 'created'): void
}>()

const projectStore = useProjectStore()
const currentProject = computed(() => projectStore.currentProject)
const tempPage = ref<Partial<IPage> | null>(null)
const formValid = ref(false)
const dialogVisible = ref(false)
const modalTitle = ref<string | null>()
const modalRef = ref<HTMLElement | null>(null)
let modal: Modal

onMounted(() => {
  if (modalRef.value) {
    modal = new Modal(modalRef.value)
  }
  initDialog()
  validateForm()
  modalTitle.value = props.mode === 'create'
    ? 'Nouvelle page'
    : currentProject.value!.title
})

watch(() => props.modelValue, (modelValue) => {
  if (modelValue) show()
  else hide()
})

/* -------------------------------------------------------------------------- */
/*                                  Méthodes                                  */
/* -------------------------------------------------------------------------- */
function show() {
  initDialog()
  dialogVisible.value = true
}

function hide() {
  emit('update:modelValue', false)
  dialogVisible.value = false
}

function validateForm() {
  if (tempPage.value) {
    if (!tempPage.value?.title || !tempPage.value.url)
      formValid.value = false
    else
      formValid.value = true
  }
}

function initDialog() {
  if (props.mode === 'create') {
    tempPage.value = {
      title: '',
      description: '',
    }
  }
  else {
    tempPage.value = {
      title: "currentProject.value?.title",
      description: "currentProject.value?.description",
    }
  }
}

function createPage() {}

function updatePage() {}


</script>

<template>
  <ModalDialog v-if="tempPage" v-model="dialogVisible" :title="modalTitle || '🤔'">

    <!-- PROJECT form -->
    <PageForm v-model="tempPage" @input="validateForm" mode="create" />

    <!-- FOOTER buttons -->
    <template #footer>

      <!-- Cancel -->
      <button type="button" class="btn btn-link text-dark" @click="hide">Annuler</button>

      <!-- Create or... -->
      <button v-if="props.mode === 'create'"
        type="button"
        class="btn btn-primary"
        @click="createPage"
        :disabled="!formValid">
        Créer
      </button>

      <!-- ...update -->
      <button v-else
        type="button"
        class="btn btn-primary"
        @click="updatePage"
        :disabled="!formValid">
        Mettre à jour
      </button>
    </template>
  </ModalDialog>
</template>