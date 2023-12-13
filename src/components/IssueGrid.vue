<script setup lang="ts">
import { computed } from 'vue'
import { useProjectStore } from '@/stores/ProjectStore'
import type { IIssue } from '@/shared/interfaces'
import Issue from '@/components/IssueItem.vue'

const projectStore = useProjectStore()
const project = computed(() => projectStore.currentProject)

const emit = defineEmits<{
  (e: 'select', issue: IIssue): void
}>()

</script>

<template>
  <section>
    <div
      role="list"
      class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3"
    >
      <div
        role="listitem"
        v-for="(issue, index) in project?.issues"
        :key="issue._id"
        class="col"
        @click="emit('select', issue)"
      >
        <Issue
          mode="griditem"
          :issue="issue"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>