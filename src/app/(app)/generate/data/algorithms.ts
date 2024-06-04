export interface KeyAlgorithm {
  id: string
  name: string
  description?: string
}

export const presets: KeyAlgorithm[] = [
  {
    id: "parselmouth",
    name: "Parselmouth",
    description: "More natural tone of voice, but matches the input pitch less."
  },
  {
    id: "dio",
    name: "Dio",
    description: "Balanced pitch tracking and pronunciation."
  },
  {
    id: "crepe",
    name: "Crepe",
    description: "Notes are more stable, but has more mispronunciations."
  },
  {
    id: "harvest",
    name: "Harvest",
    description: "More natural tone of voice, but matches the input pitch less."
  },
]



