import { useState, useEffect } from 'react'
import "../styles/Login.css"
import MainForm from "../components/MainForm"
import TopBar from "../components/TopBar"
import Pikosen from "../assets/Group 29 (3).png" 

function getRandomKapePositions(count) {
  const positions = []
  const safeZone = {
    xMin: 20,
    xMax: 80,
    yMin: 10,
    yMax: 90,
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
        delay: Math.random() * 8,
        id: Math.random()
      })
    }
  }
  return positions
}

function LoginPage() {
  const [kapePositions, setKapePositions] = useState([])

  useEffect(() => {
    setKapePositions(getRandomKapePositions(30))

    const spawnNewKape = () => {
      const newKape = getRandomKapePositions(1)[0]
      if (newKape) {
        setKapePositions(prev => [...prev, newKape])
        
        setTimeout(() => {
          setKapePositions(prev => prev.filter(pos => pos.id !== newKape.id))
        }, 6000) 
      }
    }

    const spawnInterval = setInterval(() => {
      spawnNewKape()
    }, 2000 + Math.random() * 3000) // Random interval between 2-5 seconds

    return () => clearInterval(spawnInterval)
  }, [])

  return (
    <div className="login-page">
      <TopBar />
      <div className="main">
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