export const encrypt = (text: string) => {
  return btoa(text)
}

export const decrypt = (cipherText: any) => {
  return atob(cipherText)
}
