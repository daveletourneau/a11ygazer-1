<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProjectStore } from '@/stores/ProjectStore'
import Multiselect from '@vueform/multiselect'
import type { IIssue } from '../../../shared/src/interfaces'

const projectStore = useProjectStore()
const project = computed(() => projectStore.currentProject)
const formValid = ref<boolean>(false)

function addIssueToCurrentProject() {
  const baseIssue: IIssue = {
    _id: "string",
    title: "Titre",
    description: "string",
    resolved: false,
  }
  project.value?.addIssue(baseIssue)
}

const issueDescription = ref<string>('')
const currentTags = ref<string[] | undefined>()
const currentWSCs = ref<string[] | undefined>()
// const currentImpactLevel = ref<'minor' | 'moderate' | 'important' | 'critical' | undefined>()

</script>

<template>
  <div
    class="modal fade"
    id="newIssueModal"
    data-bs-backdrop="static"
    tabindex="-1"
    aria-labelledby="newIssueModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <!-- Modal header -->
        <div class="modal-header">
          <h1
            class="modal-title fs-3"
            id="newIssueModalLabel"
          >Nouvelle problématique</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Fermer"
          ></button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <form
            class="needs-validation"
            action=""
          >
            <div class="d-flex flex-column">

              <div class="mb-3">
                <label for="current-target">Composants ou éléments concernés</label>
                <input
                  type="text"
                  class="form-control"
                  name="currentTarget"
                  id="current-target"
                >
              </div>

              <!-- Project description -->
              <div class="mb-3">
                <label
                  for="issue-description"
                  class="form-label"
                >Description</label>
                <textarea
                  class="form-control"
                  id="issue-description"
                  rows="3"
                  v-model="issueDescription"
                >
              </textarea>
              </div>

              <div class="mb-3">

                <fieldset aria-labelledby="lbl-impact-level">
                  <legend>Impact <span
                      class="text-danger"
                      aria-hidden="true"
                    >*</span></legend>
                  <input
                    type="radio"
                    name="impactLevel"
                    id="minor"
                    required
                  >
                  <label class="impact impact-minor">mineur</label>
                  <input
                    type="radio"
                    name="impactLevel"
                    id="moderate"
                    required
                  >
                  <label class="impact impact-moderate">modéré</label>
                  <input
                    type="radio"
                    name="impactLevel"
                    id="important"
                    required
                  >
                  <label class="impact impact-important">important</label>
                <input
                  type="radio"
                  name="impactLevel"
                  id="critical"
                  required
                >
                <label class="impact impact-critical">critique</label>
              </fieldset>

              <!-- <select v-model="currentImpactLevel" class="form-select" aria-label="Sélectionner le niveau d'impact">
                  <option value=""></option>
                  <option value="minor">⚪️ Mineur</option>
                  <option value="moderate">🟡 Modéré</option>
                  <option value="important">🟠 Important</option>
                  <option value="critical">🔴 Critique</option>
                </select> -->
            </div>

            <div class="mb-3">
              <label for="current-wsc">Critère(s) non respectés</label>
              <Multiselect
                id="current-wsc"
                v-model="currentWSCs"
                mode="tags"
                placeholder=""
                :close-on-select="false"
                :searchable="true"
                :create-option="false"
              />
            </div>

            <div class="mb-3">
              <label for="current-tags">Tags</label>
              <Multiselect
                id="current-tags"
                v-model="currentTags"
                mode="tags"
                :close-on-select="false"
                :searchable="true"
                :create-option="true"
                :options="{}"
              />
            </div>

            <div class="mb-3">
              <label
                for="formFile"
                class="form-label"
              >Capture(s) d'écran</label>
              <input
                class="form-control"
                type="file"
                id="formFileMultiple"
                multiple
              >
            </div>

          </div>
        </form>
      </div>

      <!-- Modal footer -->
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-light"
          data-bs-dismiss="modal"
        >Annuler
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="addIssueToCurrentProject()"
          :disabled="!formValid"
        >Créer
        </button>
      </div>

    </div>
  </div>
</div></template>
