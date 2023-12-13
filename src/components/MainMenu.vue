<script setup lang="ts">

import ProjectList from './ProjectList.vue'
import { ref, onMounted } from 'vue'
import { Offcanvas } from 'bootstrap'
import ProjectModal from '@/components/ProjectModal.vue'

const menuPanel = ref<Offcanvas | null>(null)
const projectModalVisible = ref<boolean>(false)

onMounted(() => {
  const offcanvas_el = document.getElementById('offcanvasMenu')
  if (offcanvas_el)
    menuPanel.value = new Offcanvas(offcanvas_el)
})

/* -------------------------------------------------------------------------- */
/*                                   METHODS                                  */
/* -------------------------------------------------------------------------- */
function hideMenu() {
  menuPanel.value?.hide()
}

function showCreateProjectModal() {
  projectModalVisible.value = true
}

</script>

<template>
  <!-- Bouton toggle du menu -->
  <button
    class="btn btn-lg btn-primary rounded-0"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasMenu"
    aria-controls="offcanvasMenu"
    aria-label="Menu"
  ><i class="bi-list"></i>
  </button>

  <!-- Menu principal offcanvas -->
  <div
    id="offcanvasMenu"
    class="offcanvas offcanvas-start"
    tabindex="-1"
    aria-labelledby="offcanvasMenuLabel"
  >

    <div class="d-flex flex-column justify-content-between" style="height:100%;">
      <div class="offcanvas-header">
        <h2
          class="offcanvas-title noafter"
          id="offcanvasMenuLabel"
        >
          <small><i class="bi bi-archive"></i></small>
          Projets
        </h2>
        <button
          type="button"
          class="btn btn-default"
          data-bs-dismiss="offcanvas"
          aria-label="Fermer"
        >
          <i
            class="bi bi-x-lg"
            aria-hidden="true"
          ></i>
        </button>
      </div>

      <hr
        class="border-light opacity-100 my-1"
        aria-hidden="true"
      >

      <div class="d-flex flex-column flex-grow-1 align-content-">

        <!-- Liste des projets -->
        <div class="flex-grow-1 mt-3">
          <ProjectList @projectSelected="hideMenu" />
        </div>

        <!-- Bouton nouveau projet -->
        <div class="d-grid mt-3">
          <button
            type="button"
            class="btn btn-light m-3"
            @click="showCreateProjectModal"
          >
            <span>
              Créer un projet
              <i
                class="bi bi-plus"
                aria-hidden="true"
              ></i>
            </span>
          </button>
        </div>

      </div>
    </div>
  </div>

  <ProjectModal
    v-model="projectModalVisible"
    mode="create"
  />
</template>