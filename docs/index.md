---
layout: home
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.location.href = '/en/'
  }
})
</script>