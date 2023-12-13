<script setup lang="ts">

import type { IIssue } from '../../../shared/src/interfaces'
import type { TIssueDisplayMode, TIssueSeverity, TIssueSeverityLabel } from '../../../shared/src/types'
import { Marked } from 'marked'

const marked = new Marked()

const props = defineProps<{
  issue: IIssue,
  mode?: TIssueDisplayMode,
  index?: number,
}>()

// TODO: Move that thing
const impactLabels: TIssueSeverityLabel = {
  critical: 'critique',
  important: 'sérieux',
  moderate: 'modéré',
  minor: 'mineur',
}

function getImpactClass(impact?: TIssueSeverity): string {
  const impactClass = {
    minor: 'impact impact-right impact-minor',
    moderate: 'impact impact-right impact-moderate',
    important: 'impact impact-right impact-important',
    critical: 'impact impact-right impact-critical'
  }
  return impact ? impactClass[impact] : ''
}

function getCoverImage(filename?: string): string {
  if (filename)
    return `/img/${filename}`
  else
    return `/img/dummy1.png`
}
</script>

<template>
  <!-- GRID (default mode)-->
  <div role="listitem" v-if="mode === 'griditem' || mode === 'default' || !mode">
    <a href="#" class="card shadow-sm text-decoration-none" tabindex="0">
      <img :src="getCoverImage(props.issue.images ? props.issue.images[0] : undefined)"
        class="img-fluid object-fit-cover card-image" alt="">
      <div class="card-body border-top">
        <div class="text-right">
          <h3 class="card-title">{{ props.issue.title }}</h3>
          <div class="d-flex flex-column">
            <p class="card-subtitle" :class="getImpactClass(props.issue.severity)">
              Impact {{ impactLabels[props?.issue.severity || 'moderate'] }}
            </p>
          </div>
        </div>
        <div class="card-text text-wrap text-truncate" v-html="marked.parse(props.issue.description || '')"></div>
      </div>
    </a>
  </div>

  <!-- LIST -->
  <div role="listitem" v-if="mode === 'listitem'">
    <a href="#" class="text-decoration-none text-black">
      <div class="d-flex flex-column ">

        <div class="d-flex align-items-center">
          <h3 class="card-title flex-grow-1">{{ props.issue.title }}</h3>
          <div class="card-subtitle" :class="getImpactClass(props.issue.severity)"><span class="d-none d-md-inline">
            Problème {{
              impactLabels[props?.issue.severity || 'moderate'] }}
          </span></div>
        </div>
        <p class="text-wrap text-truncate" v-html="marked.parse(props.issue.description || '')"></p>

      </div>
    </a>
  </div>
</template>

<style scoped>
.card {
  cursor: pointer;
  min-height: 25rem;
  max-height: 25rem;
  height: 25rem;
}

a.card:hover,
a.card:focus {
  outline: 3px #fe5000 solid;
}

.card-image {
  height: 8rem;
  max-height: 8rem;
  min-height: 8rem;
  filter: opacity(50%) saturate(5%);
  transition: filter 0.3s;
}

.card:hover .card-image {
  filter: opacity(100%) saturate(100%);
}

.card-text {
  margin-top: 1em;
}
</style>