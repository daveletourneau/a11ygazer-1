<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import type { IProject } from '@/shared/interfaces'
import Multiselect from '@vueform/multiselect'

const tempProject = ref<IProject | null>(null)

const props = defineProps<{
  modelValue: Partial<IProject>
}>()

onMounted(() => {
  tempProject.value = props.modelValue
})

watch(
  () => props.modelValue,
  (newProject) => {
    tempProject.value = newProject
  },
  { deep: true } // pour une comparaison profonde
)
</script>

<template>
  <form
    v-if="tempProject"
    class="needs-validation"
    autocomplete="off"
  >

    <!-- TITLE  -->
    <div class="mb-3">
      <label
        for="project-title"
        class="form-label"
      >Nom <span class="visually-hidden">du projet</span> <span
          class="text-danger"
          aria-hidden="true"
        >*</span></label>
      <input
        type="text"
        class="form-control"
        id="project-title"
        v-model="tempProject.title"
        autofocus
        required
      >
    </div>

    <!-- CONFORMITY -->
    <div class="mb-3">
      <label
        for="project-conformity"
        class="form-label"
      >Niveau de conformité visé <span
          class="text-danger"
          aria-hidden="true"
        >*</span></label>
      <select
        id="project-conformity"
        class="form-select"
        v-model="tempProject.conformity"
        required
      >
        <option
          value="SGQRI00820"
          aria-label="essgékuèri zéro zéro huit, 2.0"
        >SGQRI-008 2.0</option>
        <option
          value="WCAG20A"
          aria-label="WÉCAG 2.0 niveau A"
        >WCAG 2.0 niveau A</option>
        <option
          value="WCAG20AA"
          aria-label="WÉCAG 2.0 niveau double A"
          selected
        >WCAG 2.0 niveau AA</option>
        <option
          value="WCAG20AAA"
          aria-label="WÉCAG 2.0 niveau triple A"
        >WCAG 2.0 niveau AAA</option>
        <option
          value="WCAG21A"
          aria-label="WÉCAG 2.1 niveau A"
        >WCAG 2.1 niveau A</option>
        <option
          value="WCAG21AA"
          aria-label="WÉCAG 2.1 niveau double A"
        >WCAG 2.1 niveau AA</option>
        <option
          value="WCAG21AAA"
          aria-label="WÉCAG 2.1 niveau triple A"
        >WCAG 2.1 niveau AAA</option>
      </select>
    </div>

    <!-- DESCRIPTION -->
    <div class="mb-3">
      <label
        for="project-description"
        class="form-label"
      >Description</label>
      <textarea
        class="form-control"
        id="project-description"
        rows="4"
        v-model="tempProject.description"
      >
      </textarea>
    </div>

    <!-- CLIENT -->
    <div class="mb-3">
      <label
        for="project-client"
        class="form-label"
      >Client</label>
      <input
        type="text"
        class="form-control"
        id="project-client"
        v-model="tempProject.client"
      >
    </div>

    <!-- TAGS -->
    <div class="mb-3">
      <label
        class="form-label"
        for="ms-tags"
      >Étiquettes</label>
      <div>
        <Multiselect
          id="ms-tags"
          mode="tags"
          v-model="tempProject.tags"
          :options="[
            { value: 'awaiting_validation', label: 'En cours', icon: '', color: '#ff3300' },
            { value: 'paused', label: 'En attente', icon: '', color: '#ff8800' },
            { value: 'verified', label: 'Terminé', icon: '', color: '#ffcc00' },
          ]"
          :searchable="true"
          :create-option="true"
        />
      </div>
    </div>

  </form>
  <div v-else>Chargement...</div>
</template>