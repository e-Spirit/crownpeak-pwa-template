<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <div class="container mx-auto flex-grow">
      <slot />
    </div>

    <Footer />
  </div>
</template>
