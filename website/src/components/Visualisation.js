import moment from "moment"

import MonthlyChart from './charts/MonthlyChart';
import HourlyChart from "./charts/HourlyChart";
import FormGroup from "../components/FormGroup";

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

  useEffect(() => {
    fetch("/LSDE_2021_W4/data/hourlyData.json")
      .then((response) => response.json())
      .then(data => setHourlyData(data.result))

    fetch("/LSDE_2021_W4/data/monthlyData.json")
      .then((response) => response.json())
      .then(data => {
        const monthlyData = data.map((values) => ({
          ...values,
          xs: moment.unix(values.xs / 1000).format("YYYY-MM-DD")
        }))
        setMonthlyData(monthlyData)
      })

  }, [])

  return (
    <>
      <div className="flex flex-row">
        <FormGroup key={0} groupName="trafficType" prettyName="Traffic type" options={trafficTypeOptions} />
        <FormGroup key={1} groupName="accessType" prettyName="Access type" options={accessTypeOptions} />
        <FormGroup key={2} groupName="domains" prettyName="Domain" options={domainOptions} />

        <div className="flex-grow">
          <span className="text-gray-700">Hour ({hour})</span>

          <Slider defaultValue={hour} min={0} max={23} step={1} onChange={(value) => setHour(value)}>
            <SliderTrack bg="blue.100">
              <Box position="relative" right={10} />
              <SliderFilledTrack bg="blue" />
            </SliderTrack>
            <SliderThumb boxSize={4} />
          </Slider>
        </div>
      </div>

      <div className="flex flex-col mt-4">
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
    </>
  )
}