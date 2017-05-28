export const date = d => {
  if (d && d instanceof Date)
    return d.toISOString().substring(0, 10);
}
export const currency = num => {
  return num
}
