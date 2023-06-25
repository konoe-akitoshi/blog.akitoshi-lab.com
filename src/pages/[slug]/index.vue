<!-- src/pages/[slug]/index.vue -->
<script setup lang="ts">

const route = useRoute();
const slug = String(route.params.slug);

</script>
    
<template>
    <PostDetail :slug="slug" />
</template>