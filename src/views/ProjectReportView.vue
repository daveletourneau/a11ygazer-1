<script lang="ts" setup>

</script>


<template>
  <section class="d-block mb-3 text-center opacity-50">
    <a
      href="/mock-report.html"
      target="_blank"
      class="btn btn-primary"
    >Ouvrir le rapport dans une nouvelle fenêtre</a>
  </section>

  <section class="d-block opacity-50">
    <iframe
      src="/mock-report.html"
      frameborder="1"
      aria-label="rapport"
    ></iframe>
  </section>
</template>

<style>
iframe {
  width: 100%;
  height: 65vh;
  border: 1px silver solid;
}
</style>