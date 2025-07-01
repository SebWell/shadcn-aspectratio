<template>
  <div 
    :class="containerClasses"
    :style="containerStyle"
  >
    <slot />
  </div>
</template>

<script>
import { computed } from 'vue'
import { cn } from './cn.js'

export default {
  name: 'WewebAspectRatio',
  props: {
    content: {
      type: Object,
      required: true,
      default: () => ({
        ratio: 16/9,
        customRatio: '',
        customClasses: ''
      })
    }
  },
  setup(props) {
    const aspectRatio = computed(() => {
      if (props.content.customRatio) {
        // Parse custom ratio like "16:9" or "4:3"
        const parts = props.content.customRatio.split(':')
        if (parts.length === 2) {
          const width = parseFloat(parts[0])
          const height = parseFloat(parts[1])
          if (!isNaN(width) && !isNaN(height) && height !== 0) {
            return width / height
          }
        }
        // Try to parse as decimal like "1.777"
        const decimal = parseFloat(props.content.customRatio)
        if (!isNaN(decimal) && decimal > 0) {
          return decimal
        }
      }
      return props.content.ratio || 16/9
    })

    const containerClasses = computed(() => cn(
      "relative w-full",
      props.content.customClasses
    ))

    const containerStyle = computed(() => ({
      aspectRatio: aspectRatio.value.toString()
    }))

    return {
      containerClasses,
      containerStyle
    }
  }
}
</script>

<style>
/* Import global shadcn/ui styles */
@import './globals.css';
</style> 