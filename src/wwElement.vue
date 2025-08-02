<template>
  <div 
    :class="containerClasses"
    :style="containerStyle"
    @click="handleClick"
  >
    <slot />
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'ShadcnAspectRatio',
  props: {
    content: {
      type: Object,
      required: true,
      default: () => ({
        ratio: 1.777, // 16:9 default
        customRatio: ''
      })
    },
    wwEditorState: { type: Object, required: true }
  },
  emits: ['trigger-event'],
  setup(props, { emit }) {
    const aspectRatio = computed(() => {
      // If custom ratio is selected
      if (props.content.ratio === 'custom' && props.content.customRatio) {
        // Parse custom ratio like "16:9" or "4:3"
        const customValue = props.content.customRatio.toString().trim()
        
        if (customValue.includes(':')) {
          const parts = customValue.split(':')
          if (parts.length === 2) {
            const width = parseFloat(parts[0])
            const height = parseFloat(parts[1])
            if (!isNaN(width) && !isNaN(height) && height !== 0) {
              return width / height
            }
          }
        } else {
          // Try to parse as decimal like "1.777"
          const decimal = parseFloat(customValue)
          if (!isNaN(decimal) && decimal > 0) {
            return decimal
          }
        }
      }
      
      // Use predefined ratio
      return parseFloat(props.content.ratio) || 1.777
    })

    const containerClasses = computed(() => {
      return 'aspect-ratio-container'
    })

    const containerStyle = computed(() => ({
      aspectRatio: aspectRatio.value.toString()
    }))

    const handleClick = (event) => {
      emit('trigger-event', {
        domEvent: event,
        value: {
          ratio: aspectRatio.value,
          content: props.content
        }
      })
    }

    return {
      containerClasses,
      containerStyle,
      handleClick
    }
  }
}
</script>

<style scoped>
.aspect-ratio-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

/* Fallback for browsers that don't support aspect-ratio */
@supports not (aspect-ratio: 1) {
  .aspect-ratio-container::before {
    content: '';
    display: block;
    padding-bottom: calc(100% / var(--aspect-ratio, 1.777));
  }
  
  .aspect-ratio-container > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>