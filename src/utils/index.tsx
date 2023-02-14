export const rem = (px: number | string) => {
  return typeof px === 'number'
    ? `${px / 16}rem`
    : `${parseInt(px.split('px')[0]) / 16}rem`
}

export function formatNumberSuffix(amount: number) {
  if (amount === 0) return 0
  const abbreviations = ['', 'K', 'M', 'B', 'T']
  const abbreviationIndex = Math.floor(Math.log10(amount) / 3)
  return (
    (amount / Math.pow(10, abbreviationIndex * 3)).toFixed(1) +
    abbreviations[abbreviationIndex]
  )
}
