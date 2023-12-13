<script setup lang="ts">
import { computed, ref } from 'vue'
import { useProjectStore } from '@/stores/ProjectStore'

const projectStore = useProjectStore()
const currentProject = computed(() => projectStore.currentProject)
const showClosedProjects = ref<boolean>(false)

const emit = defineEmits(['projectSelected'])

function toggleShowClosedProjects() {
  showClosedProjects.value = !showClosedProjects.value
}
</script>

<template>
  <div v-if="projectStore?.projects">
    <!-- PROJECT LIST -->
    <nav
      v-if="true"
      class="list-group"
    >
      <template
        v-for="project in projectStore.projects"
        :key="project.id"
      >
        <router-link
          v-if="showClosedProjects || !project.closed"
          :to="{ name: 'project', params: { project_id: project._id } }"
          class="list-group-item list-group-item-action fs-5"
          :class="{
            'active': project._id === currentProject?._id,
            'fw-light': project.closed
          }"
          :aria-current="project._id === currentProject?._id"
          @click="emit('projectSelected')"
        ><span>{{ project.title }}</span>
        </router-link>
      </template>
    </nav>

    <div v-else>else...</div>

    <!-- Show closed switch -->
    <div
      v-if="projectStore.projects.filter(project => project.closed).length"
      class="form-check form-switch"
    >
      <input
        class="form-check-input"
        type="checkbox"
        id="show-closed-projects"
        @input="toggleShowClosedProjects"
      >
      <label
        class="form-check-label"
        for="show-closed-projects"
      >Afficher les projets terminés</label>
    </div>

  </div>
  <div v-else>
    🤔 Aucun projet ici...
  </div>
</template>

<style scoped>
.list-group-item:hover:not(.active) {
  font-weight: bold;
}
</style>