<script setup lang="ts">

import { useProjectStore } from '@/stores/ProjectStore'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'

const store = useProjectStore()
const router = useRouter()
const currentProject = computed(() => store.currentProject)
const currentRouteName = computed(() => router.currentRoute.value.name)
const projectModalVisible = ref<boolean>(false)

const showProjectModal = () => {
  projectModalVisible.value = true
}
</script>

<template>
  <div class="container d-grid gap-3 fade show">

    <div
      class="d-flex flex-column flex-md-row flex-lg-column  flex-xl-row"
      v-if="currentProject"
    >
      <h1
        id="page-title"
        class="flex-grow-1"
      >{{ currentProject?.title }}
        <small
          v-if="currentProject?.closed"
          class="text-muted"
        >(fermé)</small>
      </h1>

      <!-- Tabbed navigation -->
      <nav
        class="nav nav-pills"
        aria-labelledby="page-title"
      >

        <!-- SUMMARY tab -->
        <router-link
          :to="{ name: 'projectsummary' }"
          custom
          v-slot="{ navigate }"
        >
          <button
            role="tab"
            class="nav-link"
            :class="{ 'active': currentRouteName === 'projectsummary' }"
            @click="navigate"
            :aria-current="currentRouteName === 'projectsummary' ? 'page' : false"
            aria-label="Sommaire"
            Title="Sommaire"
          >
            <i
              class="bi bi-easel d-inline-block"
              style="width:1em !important;height:1em !important;"
            ></i>
            <span
              class="d-none d-lg-inline"
              aria-hidden="true"
            >Sommaire</span>
          </button>
        </router-link>

        <!-- ISSUES tab -->
        <router-link
          :to="{ name: 'projectissues' }"
          custom
          v-slot="{ navigate }"
        >
          <button
            role="tab"
            class="nav-link"
            :class="{ 'active': currentRouteName === 'projectissues' }"
            @click="navigate"
            :aria-current="currentRouteName === 'projectissues' ? 'page' : false"
            aria-label="Problèmes"
            title="Problèmes"
          >
            <i
              class="bi bi-crosshair d-inline-block"
              style="width:1em !important;height:1em !important;"
            ></i>
            <span
              class="d-none d-lg-inline"
              d-md-inline
            >Problèmes</span>
          </button>
        </router-link>

        <!-- REPORT tab -->
        <router-link
          :to="{ name: 'projectreport' }"
          custom
          v-slot="{ navigate }"
        >
          <button
            role="tab"
            class="nav-link"
            :class="{ 'active': currentRouteName === 'projectreport' }"
            @click="navigate"
            :aria-current="currentRouteName === 'projectreport' ? 'page' : false"
            aria-label="Rapport"
            title="Rapport"
          >
            <i
              class="bi bi-journal-richtext d-inline-block"
              style="width:1em !important;height:1em !important;"
            ></i>
            <span
              class="d-none d-lg-inline"
              aria-hidden="true"
            >Rapport</span>
          </button>
        </router-link>

        <!-- CHECKLIST tab -->
        <router-link
          :to="{ name: 'projectchecklist' }"
          custom
          v-slot="{ navigate }"
        >
          <button
            role="tab"
            class="nav-link"
            :class="{ 'active': currentRouteName === 'projectchecklist' }"
            @click="navigate"
            :aria-current="currentRouteName === 'projectchecklist' ? 'page' : false"
            aria-label="Checklist"
            title="Checklist"
          >
            <i
              class="bi bi-clipboard-check d-inline-block"
              style="width:1em !important;height:1em !important;"
            ></i>
            <span
              class="d-none d-lg-inline"
              aria-hidden="true"
            >Checklist</span>
          </button>
        </router-link>

      </nav>

    </div>

    <div role="tabpanel">
      <router-view />
    </div>

  </div>

</template>

