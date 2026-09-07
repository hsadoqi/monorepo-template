export * from "./load-google-font"

export const fontSizeMap: Record<string, number> = {
  xs: 0.75,
  sm: 0.875,
  base: 1.0,
  lg: 1.125,
  xl: 1.25,
  "2xl": 1.4,
  "3xl": 1.6,
  "4xl": 1.875,
  "5xl": 2.25,
  "6xl": 3,
  "7xl": 3.75,
  "8xl": 4.5,
  "9xl": 6,
}

export const GOOGLE_FONTS = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Raleway",
  "Nunito",
  "Ubuntu",
  "Work Sans",
  "Space Grotesk",
  "Space Mono",
  "Fira Code",
  "Lora",
  "Playfair Display",
  "IBM Plex Sans",
  "JetBrains Mono",
  "Merriweather",
  "Rubik",
  "DM Sans",
  "Comic Neue",
  "Noto Serif",
  "Source Code Pro",
  "Crimson Text",
  "Libre Baskerville",
  "Inconsolata",
  "Source Sans Pro",
  "PT Sans",
  "Oswald",
  "Quicksand",
  "Karla",
  "Cabin",
  "Archivo",
  "Manrope",
  "Bitter",
  "system-ui",
]

export const searchGoogleFonts = async (query: string): Promise<string[]> => {
  // For now, filter from local list for performance
  // Could be replaced with actual Google Fonts API call
  const filtered = GOOGLE_FONTS.filter((font) =>
    font.toLowerCase().includes(query.toLowerCase())
  )
  return filtered.slice(0, 20) // Limit results
}
