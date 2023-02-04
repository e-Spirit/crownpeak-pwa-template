<template>
  <div class="flex min-h-screen flex-col">
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
