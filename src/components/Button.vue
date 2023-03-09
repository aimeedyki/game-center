<template>
  <button class="button" @click="onClick">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  onClick: () => void;
}>();
</script>

<style>
.button {
  height: 52px;
  width: 100%;
  background: transparent;
  border: 0.1rem solid #758e4f;
  border-radius: 30px;
  outline: none;
  color: #758e4f;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
}
.button:hover {
  background: #758e4f;
  color: #fff;
}
</style>
