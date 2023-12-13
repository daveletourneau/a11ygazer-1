<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import type { IIssue } from '@/shared/interfaces'
import type { TIssueSeverity } from '@/shared/types';
import Multiselect from '@vueform/multiselect'
import { wcagCritera } from '@/shared/constants';

const tempIssue = ref<IIssue | null>({})
const numericImpact = ref<number>(1)
const impactClass = ref<string>()
const impacts: TIssueSeverity[] = ['minor', 'moderate', 'important', 'critical']
const impactLabels: string[] = ['mineur', 'modéré', 'important', 'critique']
const impactLabel = ref<string>()
const msOptions = ref<{ value: string, label: string }[]>([])

const props = defineProps<{
  modelValue: Partial<IIssue>
}>()

onMounted(() => {
  tempIssue.value = props.modelValue
  msOptions.value = wcagCritera.map((critera) => ({ value: critera.value, label: critera.label }))
})

watch(
  () => props.modelValue,
  (newIssue) => {
    tempIssue.value = newIssue

    let severity = tempIssue.value.severity
    numericImpact.value = impacts.findIndex((impact) => impact === severity) + 1
    impactClass.value = `impact-${severity}`
    impactLabel.value = impactLabels[numericImpact.value - 1]
  },
  { deep: true }, // pour une comparaison profonde
)

watch(numericImpact, () => {
  if (tempIssue.value) {
    tempIssue.value.severity = impacts[numericImpact.value - 1]
    impactClass.value = `impact-${tempIssue.value.severity}`
  }
})

</script>

<template>
  <form
    v-if="tempIssue"
    class="needs-validation"
    autocomplete="off"
  >

    <!-- TITLE  -->
    <div class="mb-3">
      <label
        for="issue-title"
        class="form-label"
      >Titre <span class="visually-hidden">du problème</span>
        <span
          class="text-danger"
          aria-hidden="true"
        >*</span>
      </label>
      <input
        type="text"
        class="form-control"
        id="issue-title"
        v-model="tempIssue.title"
        autofocus
        autocomplete="off"
        required
      >
    </div>

    <!-- TYPE-->
    <div class="mb-3">
      <label
        for="issue-type"
        class="form-label"
      >Type
        <span
          class="text-danger"
          aria-hidden="true"
        >*</span>
      </label>
      <select
        v-model="tempIssue.type"
        id="issue-type"
        class="form-select"
        list="issueTypes"
        aria-label="Type de problème"
      >
        <option value="keyboard">⌨️ Clavier</option>
        <option value="text_200">🔍️ Texte 200%</option>
        <option value="semantic">🧬 Sémantique</option>
        <option value="focus_visible">👁️ Visibilité focus</option>
        <option value="focus_path">👣 Parcours focus</option>
        <option value="language">👄 Langue</option>
        <option value="replacement_text">🪧 Texte de remplacement</option>
        <option value="label">🏷️ Libellé</option>
        <option value="code">⚙️ Code</option>
        <option value="feedback">🤝 Rétroaction</option>
        <option value="reading">🗣️ Lecture du contenu</option>
        <option value="navigation">🚏 Navigation</option>
        <option value="movement">🌪️ Contenu en mouvement continu</option>
        <option value="video">🎬️ Vidéo</option>
        <option value="hierarchy">🏗️ Ordre hiérarchique</option>
        <option value="read_order">👓️ Ordre de lecture</option>
        <option value="equivalency">🟰 Équivalence</option>
        <option value="behavior">🧫 Comportement</option>
        <option value="linked_informations">🔗 Informations non liées</option>
        <option value="color">🎨 Couleur seule</option>
        <option value="contrast">💡 Taux de contraste</option>
        <option value="error">🐞 Erreur</option>
      </select>
    </div>

    <!-- WCAG crit. -->
    <div class="mb-3">
      <label
        for="ms-critera"
        class="form-label"
      >Critère(s) WCAG apparenté(s)</label>
      <Multiselect
        id="ms-critera"
        mode="tags"
        v-model="tempIssue.wcagCritera"
        :options="msOptions"
        :searchable="true"
        :breakTags="true"
      ></Multiselect>
    </div>

    <!-- TAGS -->
    <!-- TODO: options en function -->
    <div class="mb-3">
      <label
        for="ms-tags"
        class="form-label"
      >Étiquettes</label>
      <Multiselect
        id="ms-tags"
        mode="tags"
        v-model="tempIssue.tags"
        :options="[
          { value: 'awaiting_validation', label: 'à vérifier', icon: '', color: '#ff3300' },
          { value: 'paused', label: 'en attente', icon: '', color: '#ff8800' },
          { value: 'verified', label: 'vérifié', icon: '', color: '#ffcc00' },
        ]"
        :searchable="true"
        :createOption="true"
      />
    </div>

    <!-- SEVERITY BUTTONS HORIZONTAL -->
    <div class="mb-3">
      <label
        for="issue-type"
        class="form-label"
      >Impact
        <span
          class="text-danger"
          aria-hidden="true"
        >*</span>
      </label>
      <div class="btn-group w-100">
        <input
          type="radio"
          v-model="tempIssue.severity"
          class="btn-check"
          value="minor"
          name="severity2"
          id="opt4"
          autocomplete="off"
        >
        <label
          class="btn btn-light btn-sm text-start"
          for="opt4"
        ><span class="impact impact-minor">Mineur</span></label>
        <input
          type="radio"
          v-model="tempIssue.severity"
          class="btn-check"
          value="moderate"
          name="severity2"
          id="opt3"
          autocomplete="off"
        >
        <label
          class="btn btn-light btn-sm text-start"
          for="opt3"
        ><span class="impact impact-moderate">Modéré</span></label>
        <input
          type="radio"
          v-model="tempIssue.severity"
          class="btn-check"
          value="important"
          name="severity2"
          id="opt2"
          autocomplete="off"
        >
        <label
          class="btn btn-light btn-sm text-start"
          for="opt2"
        ><span class="impact impact-important">Important</span></label>
        <input
          type="radio"
          v-model="tempIssue.severity"
          class="btn-check"
          value="critical"
          name="severity2"
          id="opt1"
          autocomplete="off"
        >
        <label
          class="btn btn-light btn-sm text-start"
          :class="{ btnDanger: true }"
          for="opt1"
        ><span class="impact impact-critical">Critique</span></label>
      </div>
    </div>

    <!-- SEVERITY RANGE -->
    <!-- <div class="mb-3">
      <label
        for="severity-range"
        class="form-label"
      ><span
          class="impact"
          :class="impactClass"
        ></span>Impact {{ impactLabel }}</label>
      <input
        v-model="numericImpact"
        type="range"
        class="form-range"
        min="1"
        max="4"
        step="1"
        id="severity-range"
      >
    </div> -->

    <!-- DESCRIPTION -->
    <div class="mb-3">
      <label
        for="issue-description"
        class="form-label"
      >Description du problème</label>
      <textarea
        class="form-control"
        id="issue-description"
        rows="4"
        v-model="tempIssue.description"
      >
      </textarea>
    </div>

    <!-- SOLUTION -->
    <div class="mb-3">
      <label
        for="issue-solution"
        class="form-label"
      >Solution proposée</label>
      <textarea
        class="form-control"
        id="issue-solution"
        rows="4"
        v-model="tempIssue.solution"
      >
      </textarea>
    </div>

    <!-- PAGES -->
    <!-- <div class="mb-3">
      <label
        for="select-pages"
        class="form-label" 
      >Pages présentant ce problème</label>
      <select
        class="form-select"
        multiple
        id="select-pages"
      >
        <option selected><span class="text-warning">Généralisé</span></option>
        <option value="1">Accueil</option>
        <option value="2">Comment nous joindre</option>
        <option value="3">Détails des activités</option>
      </select>
    </div> -->

    <!-- RESOLVED -->
    <div class="form-check mb-3">
      <input
        class="form-check-input"
        type="checkbox"
        id="issue-resolved"
        v-model="tempIssue.resolved"
        disabled
      />
      <label
        for="issue-resolved"
        class="form-label"
      >Résolu</label>
    </div>

    <!-- IMAGES -->
    <div class="mb-3">
      <label
        for="file-images"
        class="form-label"
      >Images</label>
      <input
        class="form-control"
        type="file"
        id="file-images"
        disabled
      >
    </div>


  </form>
  <div v-else>Chargement...</div>
</template>