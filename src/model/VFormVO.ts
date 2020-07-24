export type VForm = Vue & { 
    validate: () => boolean
    resetValidation: () => boolean
    reset: () => void
    setRules: (any) => void
}