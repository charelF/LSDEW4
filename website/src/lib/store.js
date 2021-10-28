import create from 'zustand'

export const trafficTypeOptions = ["spider", "user"]
export const accessTypeOptions = ["desktop", "mobile-app", "mobile-web"]
export const domainOptions = ["en.wikipedia", "de.wikipedia", "fr.wikipedia", "es.wikipedia", "ru.wikipedia", "zh.wikipedia"]

const makeOptions = (ops) => ops.reduce(
    (options, option) => ({
        ...options,
        [option]: false
    }),
    {}
)

const useStore = create(set => ({
    trafficType: {
        ...makeOptions(trafficTypeOptions),
        user: true
    },
    accessType: {
        ...makeOptions(accessTypeOptions),
        desktop: true,
    },
    domains: {
        ...makeOptions(domainOptions),
        "en.wikipedia": true,
    },

    setCheckbox: (groupName, option, value) => set(state => ({
        ...state,
        [groupName]: {
            ...state[groupName],
            [option]: value
        }
    })),

    currentHour: 11,
    setCurrentHour: (newValue) => set(state => ({
        ...state,
        currentHour: newValue
    })),

    hourlyData: {},
    setHourlyData: (hour, newData) => set((state) => ({
        ...state,
        hourlyData: {
            ...state.hourlyData,
            [hour]: newData
        }
    })),

    //removeHourlyData: (hour) => set((state) => ({
    //    ...state,
    //    hourlyData: 
    //}))

    //setHourlyData: (newData) => set((state) => ({
    //    ...state,
    //    hourlyData: newData,
    //})),

    monthlyData: {},
    setMonthlyData: (monthYear, newData) => set((state) => ({
        ...state,
        monthlyData: {
            ...state.monthlyData,
            [monthYear]: newData
        }
    })),
}))

export default useStore