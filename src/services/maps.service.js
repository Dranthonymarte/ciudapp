const GEO_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 30000,
}

export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalización no disponible en este dispositivo'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
      err => reject(mapGeoError(err)),
      GEO_OPTIONS,
    )
  })
}

export function watchPosition(onUpdate, onError) {
  if (!navigator.geolocation) {
    onError?.(new Error('Geolocalización no disponible en este dispositivo'))
    return () => {}
  }
  const id = navigator.geolocation.watchPosition(
    pos => onUpdate({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
    err => onError?.(mapGeoError(err)),
    GEO_OPTIONS,
  )
  return () => navigator.geolocation.clearWatch(id)
}

function mapGeoError(err) {
  const messages = {
    1: 'Permiso de ubicación denegado. Actívalo en ajustes del navegador.',
    2: 'No se pudo determinar tu ubicación. Verifica tu conexión GPS.',
    3: 'Tiempo de espera agotado al obtener ubicación.',
  }
  return new Error(messages[err.code] ?? 'Error de geolocalización desconocido')
}
