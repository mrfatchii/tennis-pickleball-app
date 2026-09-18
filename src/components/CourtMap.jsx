import { useEffect, useRef, useState } from 'react'

export const CourtMap = ({ lat, lng, name }) => {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!containerRef.current || !window.L) return
    if (mapRef.current) {
      mapRef.current.remove()
      mapRef.current = null
    }
    setIsLoading(true)
    setHasError(false)

    const map = window.L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      loadingControl: false
    }).setView([lat, lng], 15)

    const osmLayer = window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '',
      maxZoom: 19
    })

    osmLayer.on('load', () => setIsLoading(false))
    osmLayer.on('error', () => {
      setIsLoading(false)
      setHasError(true)
    })
    osmLayer.addTo(map)

    const customIcon = window.L.divIcon({
      html: `
        <div class="tennis-marker">
          <div class="tennis-marker-inner">
            <span class="tennis-marker-icon">🎾</span>
          </div>
          <div class="tennis-marker-pulse"></div>
        </div>
      `,
      className: 'court-marker-wrapper',
      iconSize: [48, 48],
      iconAnchor: [24, 48],
      popupAnchor: [0, -52]
    })

    const marker = window.L.marker([lat, lng], {
      icon: customIcon,
      riseOnHover: true
    }).addTo(map)

    if (name) {
      marker.bindPopup(`
        <div class="court-popup">
          <strong>${name}</strong>
        </div>
      `, {
        className: 'court-popup-container',
        closeButton: true,
        autoPan: true
      })
    }

    const zoomControl = window.L.control.zoom({ position: 'topright' })
    zoomControl.addTo(map)

    const attributionControl = window.L.control.attribution({
      position: 'bottomright',
      prefix: '© <a href="https://www.openstreetmap.org/copyright">OSM</a>'
    })
    attributionControl.addTo(map)

    mapRef.current = map

    setTimeout(() => setIsLoading(false), 1500)

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [lat, lng, name])

  return (
    <div className="court-map-wrapper">
      <div
        ref={containerRef}
        className="court-leaflet-map"
      />
      {isLoading && (
        <div className="court-map-loading">
          <div className="court-map-spinner"></div>
        </div>
      )}
      {hasError && (
        <div className="court-map-error">
          <span>⚠️ 地圖載入失敗</span>
        </div>
      )}
    </div>
  )
}
