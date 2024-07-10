<template>
    
    <Transition name="modal-outer">
      <div
        v-show="modalActive"
        class="fixed w-full bg-black bg-opacity-30 h-full top-0 left-0 flex justify-center px-8"
      >
        <Transition name="modal-inner">
          <div
            v-if="modalActive"
            class="p-4 bg-white self-start mt-32 w-1/4"
          >
            <slot />
            
          </div>
        </Transition>
      </div>
    </Transition>
</template>

<script setup>
    defineProps({
        modalActive: {
            type: Boolean,
            default: false,
        },
    });
</script>