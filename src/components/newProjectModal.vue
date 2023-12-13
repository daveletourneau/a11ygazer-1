<script setup lang="ts">
import { ref } from 'vue'
import { useProjectStore } from '@/stores/ProjectStore'

const projectStore = useProjectStore()

const newProjectTitle = ref<string>('')
const newProjectClient = ref<string>('')
const newProjectDescription = ref<string>('')
const newProjectConformity = ref<string>('WCAG20AA')
const formValid = ref(false)

// function resetForm() {
//   newProjectTitle.value = ''
//   newProjectConformity.value = 'WCAG20AA'
//   newProjectClient.value = ''
//   newProjectDescription.value = ''
// }

function validateForm() {
  formValid.value = true
  if (!newProjectTitle.value || !newProjectConformity.value)
    formValid.value = false
}

function createProject() {
  projectStore.createProject({
    title: newProjectTitle.value,
    description: newProjectDescription.value,
    conformity: newProjectConformity.value,
    client: newProjectClient.value,
  })
}
</script>

<template>
  <div
    class="modal fade"
    id="newProjectModal"
    data-bs-backdrop="static"
    tabindex="-1"
    aria-labelledby="newProjectModalLabel"
    aria-hidden="true">

    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-3" id="newProjectModalLabel">Nouveau projet</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <form class="needs-validation" action="">

            <!-- Project title  -->
            <div class="mb-3">
              <label for="new-project-name" class="form-label">Nom <span class="visually-hidden">du projet</span> <span
                  class="text-danger" aria-hidden="true">*</span></label>
              <input
                type="text"
                class="form-control"
                id="new-project-name"
                v-model="newProjectTitle"
                @input="validateForm"
                autofocus
                required>
            </div>

            <!-- Project target accessibility standard -->
            <div class="mb-3">
              <label for="new-project-conformity" class="form-label">Niveau de conformité visé <span class="text-danger"
                  aria-hidden="true">*</span></label>
              <select id="new-project-conformity" class="form-select" v-model="newProjectConformity" @input="validateForm"
                required>
                <option value="SGQRI00820" aria-label="essgékuèri zéro zéro huit, 2.0">SGQRI-008 2.0</option>
                <option value="WCAG20A" aria-label="WÉCAG 2.0 niveau A">WCAG 2.0 niveau A</option>
                <option value="WCAG20AA" aria-label="WÉCAG 2.0 niveau double A" selected>WCAG 2.0 niveau AA</option>
                <option value="WCAG20AAA" aria-label="WÉCAG 2.0 niveau triple A">WCAG 2.0 niveau AAA</option>
                <option value="WCAG21A" aria-label="WÉCAG 2.1 niveau A">WCAG 2.1 niveau A</option>
                <option value="WCAG21AA" aria-label="WÉCAG 2.1 niveau double A">WCAG 2.1 niveau AA</option>
                <option value="WCAG21AAA" aria-label="WÉCAG 2.1 niveau triple A">WCAG 2.1 niveau AAA</option>
              </select>
            </div>

            <!-- Project customer -->
            <div class="mb-3">
              <label for="new-project-client" class="form-label">Client</label>
              <input
                type="text"
                class="form-control"
                id="new-project-client"
                v-model="newProjectClient"
                @input="validateForm">
            </div>

            <!-- Project description -->
            <div class="mb-3">
              <label for="new-project-description" class="form-label">Description</label>
              <textarea
                class="form-control"
                id="new-project-description"
                rows="3"
                v-model="newProjectDescription"
                @input="validateForm">
              </textarea>
            </div>

          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-link text-dark" data-bs-dismiss="modal">Annuler</button>
          <button type="button" class="btn btn-primary" @click="createProject" :disabled="!formValid">Créer le
            projet</button>
        </div>
      </div>
    </div>
  </div>
</template>