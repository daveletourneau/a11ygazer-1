<script lang="ts" setup>
import { onMounted, computed, ref, inject } from 'vue'
import type { Ref } from 'vue'
import type { VueCookies } from 'vue-cookies'
import { useProjectStore } from '@/stores/ProjectStore'
import type { IIssue } from '@/shared/interfaces'
import type { TIssueSeverityLabel, TIssueWeight } from '@/shared/types'
import IssueGrid from '@/components/IssueGrid.vue'
import IssueList from '@/components/IssueList.vue'
import IssueModal from '@/components/IssueModal.vue'

/* --------------------------------- AG Grid -------------------------------- */
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { AgGridVue } from 'ag-grid-vue3'
import type {
  GridOptions,
  GridApi,
  GridReadyEvent,
  ICellRendererParams
} from 'ag-grid-community'
import 'ag-grid-enterprise'

const $cookies = inject<VueCookies>('$cookies')
const projectStore = useProjectStore()
const currentProject = computed(() => projectStore.currentProject)
const displayMode = ref<'grid' | 'list' | 'spreadsheet'>('grid')

const issueModalVisible = ref<boolean>(false)
const issueModalMode = ref<'create' | 'edit'>('create')
const tempIssue = ref<Partial<IIssue> | null>(null)

const gridApi = ref<GridApi>()
const gridColumnApi = ref()
const impactLabels: TIssueSeverityLabel = {
  critical: 'critique',
  important: 'sérieux',
  moderate: 'modéré',
  minor: 'mineur',
}
const impactWeights: TIssueWeight = {
  critical: 4,
  important: 3,
  moderate: 2,
  minor: 1
}

const gridOptions: GridOptions<IIssue> = {
  preventDefaultOnContextMenu: true,
  enableCellTextSelection: true,
  defaultColDef: {
    resizable: true,
  },
  alwaysShowHorizontalScroll: true,
  rowGroupPanelShow: 'onlyWhenGrouping',
  columnDefs: [
    {
      headerName: "Impact",
      field: "severity",
      sortable: true,
      enableRowGroup: true,
      filter: true,
      comparator: (valueA: keyof TIssueWeight, valueB: keyof TIssueWeight) => {
        const weightA = valueA && impactWeights[valueA] ? impactWeights[valueA] : 0
        const weightB = valueB && impactWeights[valueB] ? impactWeights[valueB] : 0
        if (weightA === weightB) return 0
        else if (weightA > weightB) return 1
        return -1
      },
      cellRenderer: (params: ICellRendererParams): string => {
        const label = impactLabels[params.value as keyof TIssueSeverityLabel]
        return `<span class="impact impact-${params.value}">${label}</span>`
      }
    },
    { headerName: "Type", field: "type", enableRowGroup: true },
    { headerName: "Titre", field: "title", sortable: true },
    { headerName: "Description du problème", field: "description" },
    { headerName: "Solution", field: "solution" },
    {
      headerName: "Page(s)",
      field: "pages",
      cellRenderer: (params: ICellRendererParams): string => {
        const pagesString = params.node.data?.pages?.reduce(
          (acc: string, cur: Ref<string>) => acc && cur.value
            ? `${acc}, ${cur.value}`
            : cur.value
          , '')
        return pagesString
      }
    },
  ],
  rowData: projectStore.currentProject?.issues,
  onGridReady: function (event: GridReadyEvent) {
    gridApi.value = event.api
    gridColumnApi.value = event.columnApi
  }
}

function showNewIssueModal(): void {
  issueModalMode.value = 'create'
  issueModalVisible.value = true
}

function showEditIssueModal(issue?: IIssue): void {
  tempIssue.value = issue || {}
  issueModalMode.value = 'edit'
  issueModalVisible.value = true
}

onMounted(() => {
  const sdm = $cookies?.get('displayMode')

  if (sdm) displayMode.value = sdm
  else displayMode.value = 'list'

  $cookies?.set('displayMode', displayMode.value)
})
</script>

<template>
  <div v-if="projectStore.currentProject?.issues?.length">

    <div class="my-3 d-flex flex-column flex-md-row justify-content-between btn-toolbar">
      <button
        type="button"
        class="btn btn-sm btn-primary"
        @click="showNewIssueModal"
      >
        <span>Ajouter un problème</span>
        <i
          class="bi-plus"
          aria-hidden="true"
        ></i>
      </button>

      <fieldset>
        <legend
          id="display-mode"
          class="d-none"
        >
          <span class="visually-hidden">Type d'</span>Affichage
        </legend>

        <div
          class="btn-group"
          role="toolbar"
          aria-labelledby="display-mode"
        >

          <!-- Display grid -->
          <input
            type="radio"
            name="display-mode"
            id="displaygrid"
            class="btn-check"
            :checked="displayMode === 'grid' ? true : false"
            @click="displayMode = 'grid'"
          >
          <label
            class="btn btn-light"
            for="displaygrid"
          >
            <i
              class="bi-grid"
              aria-hidden="true"
            ></i>Grille
          </label>

          <!-- Display list -->
          <input
            type="radio"
            name="display-mode"
            id="displaylist"
            class="btn-check"
            :checked="displayMode === 'list' ? true : false"
            @click="displayMode = 'list'"
          >
          <label
            class="btn btn-light"
            for="displaylist"
          >
            <i
              class="bi-list"
              aria-hidden="true"
            ></i>Liste
          </label>

          <!-- Display spreadsheet -->
          <input
            type="radio"
            id="displayspreadsheet"
            name="display-mode"
            class="btn-check"
            :checked="displayMode == 'spreadsheet' ? true : false"
            @click="displayMode = 'spreadsheet'"
          >
          <label
            class="btn btn-light"
            for="displayspreadsheet"
          >
            <i
              class="bi-table"
              aria-hidden="true"
            ></i>Tableur
          </label>

        </div>
      </fieldset>

    </div>

    <!-- Display grid -->
    <IssueGrid
      v-if="displayMode === 'grid'"
      :issues="currentProject?.issues"
      @select="showEditIssueModal"
    />

    <!-- Display list -->
    <IssueList
      v-if="displayMode === 'list'"
      :issues="currentProject?.issues"
      @select="showEditIssueModal"
    />

    <!-- Display spreadsheet -->
    <section>
      <ag-grid-vue
        v-if="displayMode === 'spreadsheet'"
        :grid-options="gridOptions"
        style="min-height: 70vh; height: 70vh;"
        class="ag-theme-alpine w-100"
      >
      </ag-grid-vue>
    </section>
  </div>

  <div v-else class="d-grid">
    <div class="fs-1">
      🤔
    </div>
  </div>

  <IssueModal
    v-model="issueModalVisible"
    :mode="issueModalMode"
    :issue="tempIssue || {}"
    size="modal-lg"
  />
</template>

<styles lang="scss">
.ag-theme-alpine {
  --ag-header-column-separator-display: block;
  --ag-header-column-separator-height: 100%;
  --ag-header-column-separator-width: 2px;
  --ag-header-column-separator-color: purple;

  --ag-header-column-resize-handle-display: block;
  --ag-header-column-resize-handle-height: 25%;
  --ag-header-column-resize-handle-width: 5px;
  --ag-header-column-resize-handle-color: orange;
}

.ag-theme-alpine .ag-header {
  background-color: #4b79c3;
}

.ag-theme-alpine .ag-header-group-cell {
  font-weight: normal;
  font-size: 22px;
}</styles>