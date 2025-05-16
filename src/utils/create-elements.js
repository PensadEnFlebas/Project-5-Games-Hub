export function createElement(tag, attributes = {}) {
  const element = document.createElement(tag)

  const { dataset, ...rest } = attributes
  Object.assign(element, rest)

  if (dataset && typeof dataset === 'object') {
    for (const [dataKey, dataValue] of Object.entries(dataset)) {
      element.dataset[dataKey] = dataValue
    }
  }

  for (const [key, value] of Object.entries(rest)) {
    if (!(key in element)) {
      element.setAttribute(key, value)
    }
  }

  return element
}
