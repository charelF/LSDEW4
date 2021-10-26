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
    //trafficType: makeOptions(trafficTypeOptions),
    //accessType: makeOptions(accessTypeOptions),
    //domains: makeOptions(domainOptions),

    trafficType: {
        spider: false,
        user: true
    },
    accessType: {
        web: true,
        'mobile-app': false,
        'mobile-dev': false,
    },
    domains: {
        "All": false,
        "en.wikipedia": true,
        "de.wikipedia": false,
    },

    toggleCheckbox: (groupName, option) => set(state => ({
        ...state, 
        [groupName]: { 
            ...state[groupName], 
            [option]: !state[groupName][option]
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