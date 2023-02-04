<template>
  <div class="flex min-h-screen flex-col">
    <Navbar />
    <div class="container mx-auto flex-grow">
      <slot />
    </div>

    <Footer />
  </div>
</template>
