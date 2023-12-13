<script setup lang="ts">

const props = defineProps(['pages'])
</script>

<template>
  <ul v-if="props.pages.length" class="list-group">
    <li
      v-for="(url, index) in props.pages"
      :key="index"
      type="button"
      class="list-group-item list-group-item-action">
      <a :href="url.url" :title="url.description"><i class="bi-filetype-html"></i>{{ url.title }}</a>
    </li>
  </ul>
  <div v-else>
    Aucune page n'a été saisie pour l'instant.
  </div>
</template>