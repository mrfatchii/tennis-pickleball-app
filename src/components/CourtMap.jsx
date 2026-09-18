import { useEffect, useRef } from 'react'

export const CourtMap = ({ lat, lng, name }) => {
  const containerRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || !window.L) return
    if (mapRef.current) {
      mapRef.current.remove()
      mapRef.current = null
    }

    const map = window.L.map(containerRef.current, {
      zoomControl: true,
      attributionControl: true,
      scrollWheelZoom: false
    }).setView([lat, lng], 15)

    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(map)

    const icon = window.L.divIcon({
      html: `<div style="
        background: var(--forest, #3f6d4e);
        width: 32px; height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex; align-items: center; justify-content: center;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-size: 14px;
          line-height: 1;
        ">🎾</div>
      </div>`,
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -36]
    })

    const marker = window.L.marker([lat, lng], { icon }).addTo(map)
    if (name) {
      marker.bindPopup(`<strong>${name}</strong>`)
    }

    mapRef.current = map

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [lat, lng, name])

  return (
    <div
      ref={containerRef}
      className="court-leaflet-map"
      style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}
    />
  )
}
