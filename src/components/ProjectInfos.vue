<script setup lang="ts">
import { computed, ref } from 'vue'
import { useProjectStore } from '@/stores/ProjectStore'
import ProjectModal from '@/components/ProjectModal.vue'

const store = useProjectStore()
const project = computed(() => store.currentProject)
const projectModalVisible = ref<boolean>(false)

const showProjectModal = () => {
  projectModalVisible.value = true
}

const openReport = () => {
  window.open('/mcn.html', '', 'width=850,height=1100')
}

</script>

<template>
  <div v-if="project">

    <div class="d-flex">
      <h2
        id="lbl-pages"
        class="flex-grow-1"
      >Détails</h2>
      <div>
        <button
          role="tab"
          class="btn btn-outline-primary"
          :class="{ 'active': projectModalVisible }"
          @click="showProjectModal"
          aria-label="Modifier le projet"
          title="Modifier"
        >
          <span class="visually-hidden">Modifier</span>
          <i
            class="bi bi-pencil"
            aria-hidden="true"
          ></i>
        </button>
      </div>
    </div>

    <dl>
      <div v-if="project.client">
        <dt>Client</dt>
        <dd>{{ project.client }}</dd>
      </div>
      <div v-if="project.conformity">
        <dt>Standard de référence</dt>
        <dd>{{ project.conformity }}</dd>
      </div>
      <div v-if="project.created">
        <dt>Date de création</dt>
        <dd>{{ new Date(project.created).toDateString() }}</dd>
      </div>
    </dl>

    <div class="d-grid mt-3">
      <button
        @click="openReport"
        class="btn btn-primary"
      >
        <span>Imprimer le rapport</span>
        <i class="bi bi-printer ms-2"></i>
      </button>
    </div>

    <ProjectModal
      v-if="project"
      v-model="projectModalVisible"
      mode="edit"
    />
  </div>
</template>