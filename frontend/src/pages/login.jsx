import "../styles/Login.css"
import MainForm from "../components/MainForm"
import TopBar from "../components/TopBar"
import Pikosen from "../assets/Group 29 (3).png" 

function getRandomKapePositions(count) {
  const positions = []
  const safeZone = {
    xMin: 25,
    xMax: 75,
    yMin: 20,
    yMax: 80,
  }

  for (let i = 0; i < count; i++) {
    let top, left, rotation
    let attempts = 0
    do {
      top = Math.floor(Math.random() * 100)
      left = Math.floor(Math.random() * 100)
      rotation = Math.floor(Math.random() * 60 - 30)
      attempts++
      if (attempts > 1000) {
        break
      }
    } while (top > safeZone.yMin && top < safeZone.yMax && left > safeZone.xMin && left < safeZone.xMax)

    if (attempts <= 1000) {
      positions.push({
        top,
        left,
        rotation,
        delay: Math.random() * 4,
        id: Math.random()
      })
    }
  }
  return positions
}

const kapePositions = getRandomKapePositions(30) 

function LoginPage() {
  return (
    <div className="login-page">
      <TopBar />
      <div className="main">
        {/* Replaced old logo and title with the new combined logo */}
        <div className="combined-logo-wrapper">
          <img src={Pikosen || "/placeholder.svg"} alt="PikoSen Logo" className="combined-logo-img" />
        </div>
        <h3 className="slogan">Brew a better day!</h3>
        <MainForm route="api/token/" method="login" />
      </div>

      <div className="kape-bg">
        {kapePositions.map((pos) => (
          <span
            key={pos.id}
            className="kape-text"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              transform: `rotate(${pos.rotation}deg)`,
              position: "absolute",
              animationDelay: `${pos.delay}s`,
            }}
          >
            kape?
          </span>
        ))}
      </div>
    </div>
  )
}

export default LoginPage
