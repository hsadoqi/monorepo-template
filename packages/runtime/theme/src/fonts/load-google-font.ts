export function loadGoogleFont(fontName: string) {
  const formatted = fontName.replace(/ /g, "+")
  const href = `https://fonts.googleapis.com/css2?family=${formatted}&display=swap`
  if (document.querySelector(`link[href="${href}"]`)) return
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = href
  document.head.appendChild(link)
}
