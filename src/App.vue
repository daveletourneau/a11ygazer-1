<script lang="ts" setup>
import { watch, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { useProjectStore } from './stores/ProjectStore';
import MainMenu from './components/MainMenu.vue'

const route = useRoute()
const projectStore = useProjectStore()

watch(
  () => route.params.project_id,
  (newProjectId) => {
    if (route.params.project_id) {
      projectStore.currentProjectId = `${newProjectId}`
    } else {
      projectStore.currentProjectId = null
    }
  },
  { immediate: true }
)

onMounted(() => {
  projectStore.fetchProjects().then()
})
</script>

<template>
  <!-- MENU -->
  <div class="mb-4">
    <MainMenu />
  </div>

  <!-- MAIN -->
  <main>
    <router-view />
  </main>
</template>
