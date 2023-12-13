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
      class="card w-100 shadow-sm"
      style="width: 18rem;"
    >
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item list-group-item-action"
          v-for="issue in project?.issues"
          :key="issue._id"
          @click="emit('select', issue)"
        >
          <Issue
            :issue="issue"
            mode="listitem"
          />
        </li>
      </ul>
    </div>
  </section>
</template>