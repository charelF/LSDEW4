import create from 'zustand'

export const trafficTypeOptions = ["spider", "user"]
export const accessTypeOptions = ["web", "mobile-app", "mobile-dev"]
export const domainOptions = ["All", "en.wikipedia", "de.wikipedia"]

const makeOptions = (ops) => ops.reduce(
    (options, option) => ({
        ...options,
        [option]: false
    }),
    {}
)

const useStore = create(set => ({
    trafficType: makeOptions(trafficTypeOptions),
    accessType: makeOptions(accessTypeOptions),
    domains: makeOptions(domainOptions),
    toggleCheckbox: (groupName, option, newValue) => set(state => ({
        ...state, 
        [groupName]: { 
            ...state[groupName], 
            [option]: newValue
        }
    })),
    hour: 11,
    setHour: (newValue) => set(state => ({
        ...state,
        hour: newValue
    })),

    hourlyData: {},
    setHourlyData: (newData) => set(state => ({
        ...state,
        hourlyData: newData,
    })),

    monthlyData: {},
    setMonthlyData: (newData) => set(state => ({
        ...state,
        monthlyData: newData,
    })),
}))

export default useStore