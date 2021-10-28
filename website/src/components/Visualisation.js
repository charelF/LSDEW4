import { useEffect } from "react";

import useStore, { trafficTypeOptions, accessTypeOptions, domainOptions } from "../lib/store"

import MonthlyChart from './charts/MonthlyChart';
import HourlyChart from "./charts/HourlyChart";
import FormGroup from "../components/FormGroup";
import Picker from "./Picker";
import Slider from "./Slider";


export default function Visualisation() {
  const state = useStore()
  const { hour, setHour } = useStore(state => ({ setHour: state.setHour, hour: state.hour }))
  const { hourlyData, setHourlyData } = useStore(state => ({ hourlyData: state.hourlyData, setHourlyData: state.setHourlyData }))
  const { monthlyData, setMonthlyData } = useStore(state => ({ monthlyData: state.monthlyData, setMonthlyData: state.setMonthlyData }))

  const fetchHourly = (hour) => {
    fetch("/LSDE_2021_W4/data/hourly/user/desktop/en.wikipedia/2019-09-01.json")
      .then((response) => response.json())
      .then(data => {
        console.log("got data", data)
        setHourlyData(data)
      })
  }

  useEffect(() => {
    fetchMonthly()
  }, [state.trafficType, state.accessType, state.domains])

  const selectedTypes = (checkboxType) => Object.entries(state[checkboxType]).filter((kv) => kv[1]).map((kv) => kv[0])

  const fetchMonthly = (month) => {
    const selectedTrafficTypes = selectedTypes("trafficType")
    const selectedAccessTypes = selectedTypes("accessType")
    const selectedDomain = selectedTypes("domains")
    //console.log("Selected traffic types: ", selectedTrafficTypes)
    //console.log("Selected access types: ", selectedAccessTypes)
    //console.log("Selected domains: ", selectedDomain)

    var promises = []
    for (const trafficType of selectedTrafficTypes) {
      for (const accessType of selectedAccessTypes) {
        const checkedDomains = selectedDomain.includes("All") ? domainOptions : selectedDomain
        for (const domain of checkedDomains) {
          const url = "/LSDE_2021_W4/data/monthly/" + trafficType + "/" + accessType + "/" + domain + "/2019-09.json"
          console.log("Fetching", url)
          promises.push(fetch(url).then((response) => response.json()))
        }
      }
    }

    Promise.all(promises).then(responses => {
      var result = {}
      for (const resp in responses) {
        const response = responses[resp]
        for (const point in response) {
          const p = response[point];
          if (!(p.x in result)) {
            result[p.x] = p.y
          } else {
            result[p.x] += p.y
          }
        }
      }
      //console.log("total result: ", Object.keys(result).length)
      const newMonthlyData = Object.entries(result).map((kv) => ({ x: kv[0], y: kv[1] })).sort((x, y) => {
        if (x.x < y.x) {
          return -1;
        } else if (x.x > y.x) {
          return 1;
        } else {
          return 0;
        }
      })

      console.log("new monthly ", newMonthlyData.length)

      setMonthlyData(newMonthlyData)
    })

    //fetch("/LSDE_2021_W4/data/monthly/spider/desktop/en.wikipedia/2019-09.json")
    //  .then((response) => response.json())
    //  .then(data => {
    //    const monthlyData = data.map((values) => ({
    //      x: moment(values.x, "YYYY-MM-DD-HH").unix(),
    //      y: values.y
    //      //xs: values.xs
    //      //xs: new Date(values.xs - 2 * 3600 * 1000)
    //      //xs: moment.unix(values.xs / 1000).format("YYYY-MM-DD-HH")
    //    }))
    //    setMonthlyData(monthlyData)
    //  })
  }

  useEffect(() => {
    fetchHourly(hour)
    fetchMonthly()
  }, [])

  const availableMonths = [
    "-",
    "September 2019",
  ]

  const availableDays = [
    "-",
    "1 September 2019",
    "2 September 2019",
    "3 September 2019",
  ]


  //console.log("hourly data:", hourlyData)

  return (
    <>
      <div className="flex">
        <div className="flex flex-col w-4/5">
          <div className="flex-1">
            <div style={{ width: '100%', height: 400 }}>
              <MonthlyChart data={monthlyData} />
            </div>
          </div>

          <div className="flex-1 mt-4">
            <div style={{ width: '100%', height: 400 }}>
              <HourlyChart data={hourlyData[hour]} />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-1/5">
          <div className="mb-4">
            <span className="text-gray-700">Year &amp; month</span>

            <Picker options={availableMonths} />
          </div>

          <div className="mb-4">
            <span className="text-gray-700">Days</span>

            <Picker options={availableDays} />
          </div>

          <div className="my-4">
            <span className="text-gray-700">Hour ({String(hour).padStart(2, '0')}:00 - {String(hour).padStart(2, '0')}:59)</span>

            <div className="mx-2 my-2">
              <Slider defaultValue={hour} min={0} max={23} step={1} onChange={(value) => setHour(value)} />
            </div>
          </div>

          <div>
            <FormGroup groupName="trafficType" prettyName="Traffic type" options={trafficTypeOptions} />
          </div>
          <div>
            <FormGroup groupName="accessType" prettyName="Access type" options={accessTypeOptions} />
          </div>
          <div>
            <FormGroup groupName="domains" prettyName="Domain" options={domainOptions} />
          </div>
        </div>
      </div>
    </>
  )
}