export async function reverseGeocode(lat, lng) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=es`,
      { headers: { 'User-Agent': 'CiudApp/1.0 (ciudapp.com)' } }
    )
    if (!res.ok) throw new Error(`Nominatim ${res.status}`)
    const { address, display_name } = await res.json()
    const { road, suburb, neighbourhood, quarter, city_district } = address ?? {}
    return road || suburb || neighbourhood || quarter || city_district
      || display_name?.split(',')[0]
      || 'Ubicación actual'
  } catch {
    return 'Ubicación actual'
  }
}
