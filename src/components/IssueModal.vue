<script setup lang="ts">

import { onMounted, ref, watch } from 'vue'
import { useProjectStore } from '@/stores/ProjectStore'
import type { IIssue } from '../shared/interfaces'
import IssueForm from '@/components/IssueForm.vue'
import ModalDialog from '@/components/ModalDialog.vue'
import { Modal } from 'bootstrap'

const props = defineProps<{
  modelValue: boolean
  mode?: 'create' | 'edit' | 'display'
  issue?: IIssue
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()

const projectStore = useProjectStore()
const tempIssue = ref<Partial<IIssue> | null>(null)
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
    ? 'Nouveau problème'
    : tempIssue.value?.title
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
  validateForm()
  dialogVisible.value = true
}

function hide() {
  emit('update:modelValue', false)
  dialogVisible.value = false
}

function validateForm() {
  formValid.value = true
  if (tempIssue.value) {
    if (!tempIssue.value.title || !tempIssue.value.severity || !tempIssue.value.type)
      formValid.value = false
  }
}

function initDialog() {
  if (props.mode === 'create') {
    tempIssue.value = {
      title: '',
      description: '',
      severity: undefined,
      resolved: false,
      wcagCritera: [],
    }
  } else {
    if (props.issue)
      tempIssue.value = props.issue
  }
}

function createIssue() {
  if (tempIssue.value) {
    projectStore.createIssue({
      title: tempIssue.value.title,
      description: tempIssue.value.description,
      type: tempIssue.value.type,
      severity: tempIssue.value.severity,
      resolved: tempIssue.value.resolved,
      wcagCritera: tempIssue.value.wcagCritera,
    })
    emit('update:modelValue', false)
  }
}

function updateIssue() {
  projectStore.updateIssue({ ...tempIssue.value })
  emit('update:modelValue', false)
}

</script>

<template>
  <ModalDialog
    v-if="tempIssue"
    v-model="dialogVisible"
    :title="modalTitle || '🤔'"
  >

    <!-- PROJECT form -->
    <IssueForm
      v-model="tempIssue"
      @input="validateForm"
      @change="validateForm"
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
        @click="createIssue"
        :disabled="!formValid"
      >
        Créer
      </button>

      <!-- ...update -->
      <button
        v-else
        type="button"
        class="btn btn-primary"
        @click="updateIssue"
        :disabled="!formValid"
      >
        Mettre à jour
      </button>
    </template>

  </ModalDialog>
  <div v-else>IssueModal -> Pouet pouet pouet</div>
</template>