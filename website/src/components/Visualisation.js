import moment from "moment"

import MonthlyChart from './charts/MonthlyChart';
import HourlyChart from "./charts/HourlyChart";
import FormGroup from "../components/FormGroup";
import Picker from "./Picker";

import useStore, { trafficTypeOptions, accessTypeOptions, domainOptions } from "../lib/store"

import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
} from "@chakra-ui/react"

import { useEffect } from "react";

export default function Visualisation() {
  const { hour, setHour } = useStore(state => ({ setHour: state.setHour, hour: state.hour }))
  const { hourlyData, setHourlyData } = useStore(state => ({ hourlyData: state.hourlyData, setHourlyData: state.setHourlyData }))
  const { monthlyData, setMonthlyData } = useStore(state => ({ monthlyData: state.monthlyData, setMonthlyData: state.setMonthlyData }))

  const fetchHourly = (hour) => {
    fetch("/LSDE_2021_W4/data/hourly/spider/web/en.wikipedia/hourlyData-" + hour + ".json")
      .then((response) => response.json())
      .then(data => setHourlyData(data.result))
  }

  const fetchMonthly = (month) => {
    fetch("/LSDE_2021_W4/data/monthly/spider/web/en.wikipedia/201909.json")
      .then((response) => response.json())
      .then(data => {
        const monthlyData = data.map((values) => ({
          ...values,
          xs: moment.unix(values.xs / 1000).format("YYYY-MM-DD")
        }))
        setMonthlyData(monthlyData)
      })
  }

  useEffect(() => {
    fetchHourly(hour)
    fetchMonthly()
  }, [])

  const availableMonths = [
    "-",
    "September 2019",
    "October 2019",
    "November 2019",
  ]

  const availableDays = [
    "-",
    "1 September 2019",
    "2 September 2019",
    "3 September 2019",
  ]


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
              <HourlyChart data={hourlyData} />
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
              <Slider defaultValue={hour} min={0} max={23} step={1} onChange={(value) => { fetchHourly(value); setHour(value) }}>
                <SliderTrack bg="blue.100">
                  <Box position="relative" right={10} />
                  <SliderFilledTrack bg="blue" />
                </SliderTrack>
                <SliderThumb boxSize={4} />
              </Slider>
            </div>
          </div>

          <FormGroup key={0} groupName="trafficType" prettyName="Traffic type" options={trafficTypeOptions} />
          <FormGroup key={1} groupName="accessType" prettyName="Access type" options={accessTypeOptions} />
          <FormGroup key={2} groupName="domains" prettyName="Domain" options={domainOptions} />
        </div>
      </div>
    </>
  )
}