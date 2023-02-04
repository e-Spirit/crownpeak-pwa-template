<template>
  <div class="flex min-h-screen flex-col">
    <Navbar />
    <div class="container mx-auto flex-grow">
      <div>
        <slot name="header"> Default header content </slot>
      </div>
      <div>
        <slot />
      </div>
    </div>
    <AppLayoutFooter />
  </div>
</template>
