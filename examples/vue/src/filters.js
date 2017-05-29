export const date = d => {
  if (d && d instanceof Date)
    return d.toISOString().substring(0, 10);
}
export const currency = num => {
  const lastIdx = (i, len) => i  === len

  return Array.from(num.toString())
    .reverse()
    .reduce((result, char, idx, arr) => {
      if (idx > 0 && ((idx % 3) === 0) && !lastIdx(idx, arr.length))
        result.push(',')
      result.push(char)
      return result
    }, [])
    .reverse()
    .join('')
}
