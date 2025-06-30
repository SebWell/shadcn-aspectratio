export default {
  editor: {
    label: {
      en: "shadcn Aspect Ratio",
      fr: "Ratio d'aspect shadcn"
    },
    icon: 'fas fa-expand-arrows-alt',
    bubble: {
      icon: 'fas fa-expand-arrows-alt'
    },
    deprecated: false
  },
  properties: {
    ratio: {
      label: {
        en: "Aspect ratio",
        fr: "Ratio d'aspect"
      },
      type: "Number",
      defaultValue: 16/9,
      bindable: true,
      section: "dimensions"
    },
    customRatio: {
      label: {
        en: "Custom ratio (e.g. '16:9' or '1.777')",
        fr: "Ratio personnalisé (ex: '16:9' ou '1.777')"
      },
      type: "Text",
      defaultValue: "",
      bindable: true,
      section: "dimensions"
    },
    customClasses: {
      label: {
        en: "Custom CSS classes",
        fr: "Classes CSS personnalisées"
      },
      type: "Text",
      bindable: true,
      section: "style"
    }
  },
  childDropzone: {
    message: {
      en: "Drop content here",
      fr: "Déposez du contenu ici"
    }
  },
  sections: {
    dimensions: {
      label: { en: "Dimensions", fr: "Dimensions" },
      expand: true
    },
    style: {
      label: { en: "Style", fr: "Style" },
      expand: false
    }
  }
}; 