export const getRandomCords = () => {
  const lat = (Math.random() * (-90 - 90) + 90).toFixed(6)
  const long = (Math.random() * (-180 - 80) + 80).toFixed(6)

  return { lat, long }
}
