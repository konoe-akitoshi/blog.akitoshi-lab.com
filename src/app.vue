<template>
  <div class="main-container">
    <Header />
    <NuxtPage class="content-wrapper" />
    <Footer />
  </div>
</template>

<style>
.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrapper {
  flex: 1 0 auto;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
