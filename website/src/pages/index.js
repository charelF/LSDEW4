import Visualisation from "../components/Visualisation"

import Authors from "../components/Authors"

export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-medium">LSDE 2021: DDoS Detection (M4)</h1>

      <Authors />

      <Visualisation />
    </>
  )
}
