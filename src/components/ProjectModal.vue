<script setup lang="ts">

import { onMounted, ref, computed, watch } from 'vue'
import { useProjectStore } from '@/stores/ProjectStore'
import type { IProject } from '../shared/interfaces'
import ProjectForm from '@/components/ProjectForm.vue'
import ModalDialog from '@/components/ModalDialog.vue'
import { Modal } from 'bootstrap'

const props = defineProps<{
  modelValue: boolean
  mode: 'create' | 'edit' | 'display' | 'default'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'saved'): void
  (e: 'created'): void
}>()

const projectStore = useProjectStore()
const currentProject = computed(() => projectStore.currentProject)
const tempProject = ref<Partial<IProject> | null>(null)
const formValid = ref(false)
const dialogVisible = ref(false)
const modalTitle = ref<string | null>()
const modalRef = ref<HTMLElement | null>(null)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let modal: Modal

onMounted(() => {
  if (modalRef.value) {
    modal = new Modal(modalRef.value)
  }
  initDialog()
  validateForm()
  modalTitle.value = props.mode === 'create'
    ? 'Nouveau projet'
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
  if (tempProject.value) {
    if (!tempProject.value?.title || !tempProject.value.conformity)
      formValid.value = false
    else
      formValid.value = true
  }
}

function initDialog() {
  if (props.mode === 'create') {
    tempProject.value = {
      title: '',
      description: '',
      client: '',
      conformity: 'WCAG21AA'
    }
  }
  else {
    tempProject.value = {
      title: currentProject.value?.title,
      description: currentProject.value?.description,
      client: currentProject.value?.client,
      conformity: currentProject.value?.conformity,
    }
  }
}

function createProject() {
  if (tempProject.value) {
    projectStore.createProject({
      title: tempProject.value.title,
      conformity: tempProject.value.conformity,
      description: tempProject.value.description,
      client: tempProject.value.client,
    })
    emit('update:modelValue', false)
  }
}

function updateProject() {
  projectStore.updateProject({
    _id: currentProject.value?._id,
    title: tempProject.value?.title,
    client: tempProject.value?.client,
    conformity: tempProject.value?.conformity,
    description: tempProject.value?.description,
  })
  emit('update:modelValue', false)
}
</script>

<template>
  <ModalDialog
    v-if="tempProject"
    v-model="dialogVisible"
    :title="modalTitle || '🤔'"
  >

    <!-- PROJECT form -->
    <ProjectForm
      v-model="tempProject"
      @input="validateForm"
      mode="create"
    />

    <!-- FOOTER buttons -->
    <template #footer>

      <!-- Cancel -->
      <button
        type="button"
        class="btn btn-link text-dark"
        @click="hide"
      >Annuler</button>

      <!-- Create or... -->
      <button
        v-if="props.mode === 'create'"
        type="button"
        class="btn btn-primary"
        @click="createProject"
        :disabled="!formValid"
      >
        Créer
      </button>

      <!-- ...update -->
      <button
        v-else
        type="button"
        class="btn btn-primary"
        @click="updateProject"
        :disabled="!formValid"
      >
        Mettre à jour
      </button>
    </template>
  </ModalDialog>
</template>