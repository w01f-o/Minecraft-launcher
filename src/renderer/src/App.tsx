import { useEffect, useState } from 'react'
import BackGroundEffects from './components/BackgroundEffects/BackgroundEffects'
import StartButton from './components/StartButton/StartButton'
import './style.scss'

const App = (): JSX.Element => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/modpacks')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err))
  }, [])

  interface IModpack {
    name: string
    id: number
    version: number
  }

  return (
    <>
      <div className="mods">
        {data
          ? data.map(
              (modpack: IModpack): JSX.Element => (
                <div key={modpack.id} className="mods__item">
                  {modpack.name} {modpack.version}
                </div>
              )
            )
          : 'Loading'}
      </div>
      <BackGroundEffects />
      <StartButton />
    </>
  )
}

export default App
