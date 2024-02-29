import './StartButton.scss'

const StartButton = (): JSX.Element => {
  return (
    <button className="start-button" onClick={() => window.api.launcher.startMinecraft()}>
      Играть
    </button>
  )
}

export default StartButton
