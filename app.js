const { reactive, computed, createApp } = Vue // eslint-disable-line

const inputs = {
  start: [
    {
      key: 'start-year',
      label: 'Year',
      min: 2016,
      max: new Date().getFullYear()
    },
    {
      key: 'start-month',
      label: 'Month',
      min: 1,
      max: 12
    }
  ],
  public: [
    {
      key: 'responsibility',
      label: 'Responsibility Level',
      min: 1,
      max: 4,
      step: 0.5,
      color: 'deep-orange'
    },
    {
      key: 'exec',
      label: 'Exec percentage',
      min: 0,
      max: 100,
      step: 5,
      color: 'deep-orange'
    },
    {
      key: 'hours',
      label: 'Hours per week',
      min: 0,
      max: 40,
      color: 'deep-orange'
    }
  ],
  private: [
    {
      key: 'disability',
      label: 'Disability',
      min: 0,
      max: 10,
      color: 'purple'
    },
    {
      key: 'debt',
      label: 'Debt',
      min: 0,
      max: 10,
      color: 'purple'
    },
    {
      key: 'disadvantage',
      label: 'Disadvantage',
      min: 0,
      max: 10,
      color: 'purple'
    }
  ]
}

function buildInitialFormState (inputs) {
  const initialFormState = {
    classification: 'employee',
    hours: 40,
    dependants: []
  }

  return [
    ...inputs.start,
    ...inputs.public,
    ...inputs.private
  ].reduce(
    (acc, input) => {
      if (!acc[input.key]) { acc[input.key] = input.min }
      return acc
    },
    initialFormState
  )
}

function setup () {
  const form = reactive(buildInitialFormState(inputs))

  const total = computed(() => {
    const baseSalary = (
      50000 +
            form.responsibility * 10000 +
            form.exec / 100 * 15000
    )

    // WIP
    return baseSalary
  })

  return {
    inputs,
    form,
    total,

    // helper methods
    markerLabels: (input) => (val) => {
      const largeStep = Math.ceil((input.max - input.min) / 5)
      return {
        label: (val - input.min) % largeStep === 0 ? val : ' '
      }
    },
    inputRules: (input) => [
      val => ('min' in input) && val >= input.min,
      val => ('max' in input) && val <= input.max,
      val => {
        const step = input.step || 1
        return Math.floor(val / step) * step === val
      }
    ]
  }
}

const app = createApp({ setup })
app.use(Quasar) // eslint-disable-line
app.mount('#app')
