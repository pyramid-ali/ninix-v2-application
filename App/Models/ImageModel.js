export const ImageInput = (uri, type, name) => {
  const data = new FormData()
  data.append('avatar', {
    uri, type, name
  })
  return data
}
