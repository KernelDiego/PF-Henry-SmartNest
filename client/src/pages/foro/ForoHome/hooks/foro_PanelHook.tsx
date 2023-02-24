import React, { useState } from 'react'

export const foro_PanelHook = () => {

    const [life, setLife] = useState<boolean>(false)
    const [connect, setConnect] = useState<boolean>(false)
    const [home, setHome] = useState<boolean>(false)
    const [energy, setEnergy] = useState<boolean>(false)
    const [safety, setSafety] = useState<boolean>(false)
    const [comfort, setComfort] = useState<boolean>(false)

    const [FiltersOpen, setFiltersOpen] = useState<boolean>(false)

    const allFunction= [setLife, setConnect, setHome, setEnergy, setSafety, setComfort]
    const allState = [life, connect, home, energy, safety, comfort]

    const selectedHandler = (num: number)=> {
        for (let f=0; f<allFunction.length; f++) {
            if (f==num) {
                allFunction[f](true)
            } else {
                allFunction[f](false)
            }
        }
    }  

  return [
    {
        allState,
        FiltersOpen,
        selectedHandler,
        setFiltersOpen
    }
  ]
}
