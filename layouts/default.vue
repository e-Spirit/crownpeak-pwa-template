<template>
  <div class="flex flex-col min-h-screen">
    <AppLayoutHeader />
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
