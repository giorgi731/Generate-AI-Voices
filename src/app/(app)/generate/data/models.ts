export const types = ["Female", "Male"] as const

export type ModelType = (typeof types)[number]

export interface Model {
  id: string;
  name: string;
  age: string;
  created_at:string;
  created_by: string;
  description: string;
  enabled: boolean;
  gender: ModelType;
  genre: string;
  public: boolean;
  traits: string[];
  vocal_range: any;
  voice_type: string;
}

// export const models: Model[] = [
//   {
//     id: "andra",
//     name: "Andra (beta)",
//     description: "Popular Romanian pop singer with a powerful and dynamic vocal range. Her voice is characterized by its soulful quality, agility, and emotive expressiveness.",
//     type: "Female",
//     strengths:
//       "Powerful, Dynamic, Soulful, Agile, Emotive",
//   },
//   {
//     id: "bianca",
//     name: "Bianca Moga",
//     description: "Up & coming Romanian pop singer with a powerful and dynamic vocal range. Her voice is characterized by its soulful quality, agility, and emotive expressiveness.",
//     type: "Female",
//     strengths: "Powerful, Dynamic, Soulful, Agile, Emotive",
//   },
//   {
//     id: "ria",
//     name: "Ria",
//     description: "Young Romanian singer with a childlike and emotive vocal style.",
//     type: "Female",
//     strengths: "Smooth and versatile vocals, Emotional delivery, Powerful and dynamic range, Expressive emotional range",
//   },
//   {
//     id: "basshunter",
//     name: "Basshunter",
//     description: "Swedish musician and producer known for his energetic and catchy electronic dance music. His songs often feature uplifting melodies, infectious beats, and memorable hooks. Basshunter is also recognized for his unique singing style, characterized by his energetic delivery and distinctive vocal tone.",
//     type: "Male",
//     strengths: "Energetic and catchy music, Uplifting melodies, Infectious beats, Memorable hooks, Energetic singing style, Distinctive vocal tone"
//   },
//   {
//     id: "basshunter_overdrive",
//     name: "Basshunter (overdrive)",
//     description: "Swedish musician and producer known for his energetic and catchy electronic dance music. His songs often feature uplifting melodies, infectious beats, and memorable hooks. Basshunter is also recognized for his unique singing style, characterized by his energetic delivery and distinctive vocal tone.",
//     type: "Male",
//     strengths: "Energetic and catchy music, Uplifting melodies, Infectious beats, Memorable hooks, Energetic singing style, Distinctive vocal tone"
//   },
//   {
//     id: "marius_moga",
//     name: "Marius Moga",
//     description: "Romanian musician and producer known for his smooth and versatile vocal style, which ranges from tender and emotive to powerful and dynamic. His voice is characterized by its ability to convey a wide range of emotions and connect with listeners on a deep level.",
//     type: "Male",
//     strengths: "Smooth and versatile vocals, Emotional delivery, Powerful and dynamic range, Expressive emotional range",
//   },
//   {
//     id: "carmen_tanase",
//     name: "Carmen Tanase (supermodel)",
//     description: "Romanian actrees with a smooth and versatile vocal style, which ranges from tender and emotive to powerful and dynamic. Her voice is characterized by its ability to convey a wide range of emotions and connect with listeners on a deep level.",
//     type: "Female",
//     strengths: "Smooth and versatile vocals, Emotional delivery, Powerful and dynamic range, Expressive emotional range",
//   },
//   {
//     id: "carmen_tanase_neutral",
//     name: "Carmen Tanase (neutral)",
//     description: "Romanian actrees with a smooth and versatile vocal style, which ranges from tender and emotive to powerful and dynamic. Her voice is characterized by its ability to convey a wide range of emotions and connect with listeners on a deep level.",
//     type: "Female",
//     strengths: "Smooth and versatile vocals, Emotional delivery, Powerful and dynamic range, Expressive emotional range",
//   },
//   {
//     id: "carmen_tanase_curbing",
//     name: "Carmen Tanase (curbing)",
//     description: "Romanian actrees with a smooth and versatile vocal style, which ranges from tender and emotive to powerful and dynamic. Her voice is characterized by its ability to convey a wide range of emotions and connect with listeners on a deep level.",
//     type: "Female",
//     strengths: "Smooth and versatile vocals, Emotional delivery, Powerful and dynamic range, Expressive emotional range",
//   },
//   {
//     id: "carmen_tanase_overdrive",
//     name: "Carmen Tanase (overdrive)",
//     description: "Romanian actrees with a smooth and versatile vocal style, which ranges from tender and emotive to powerful and dynamic. Her voice is characterized by its ability to convey a wide range of emotions and connect with listeners on a deep level.",
//     type: "Female",
//     strengths: "Smooth and versatile vocals, Emotional delivery, Powerful and dynamic range, Expressive emotional range",
//   },
//   {
//     id: "carmen_tanase_edge",
//     name: "Carmen Tanase (edge)",
//     description: "Romanian actrees with a smooth and versatile vocal style, which ranges from tender and emotive to powerful and dynamic. Her voice is characterized by its ability to convey a wide range of emotions and connect with listeners on a deep level.",
//     type: "Female",
//     strengths: "Smooth and versatile vocals, Emotional delivery, Powerful and dynamic range, Expressive emotional range",
//   },
//   {
//     id: "nosfe",
//     name: "Nosfe",
//     description: "Romanian rapper with a smooth and versatile vocal style, which ranges from tender and emotive to powerful and dynamic. His voice is characterized by its ability to convey a wide range of emotions and connect with listeners on a deep level.",
//     type: "Male",
//     strengths: "Smooth and versatile vocals, Emotional delivery, Powerful and dynamic range, Expressive emotional range",
//   },
//   {
//     id: "smiley",
//     name: "Smiley",
//     description: "Romanian musician and producer known for his smooth and versatile vocal style, which ranges from tender and emotive to powerful and dynamic. His voice is characterized by its ability to convey a wide range of emotions and connect with listeners on a deep level.",
//     type: "Male",
//     strengths: "Smooth and versatile vocals, Emotional delivery, Powerful and dynamic range, Expressive emotional range",
//   },
//   {
//     id: "seby",
//     name: "Sebastian Dobrincu",
//     description: "Romanian pop singer with a melodic and emotive vocal style.",
//     type: "Male",
//     strengths: "Smooth and versatile vocals, Emotional delivery, Powerful and dynamic range, Expressive emotional range",
//   },

//   // {
//   //   id: "ariana_grande",
//   //   name: "G. A.",
//   //   description: "American pop singer with a stunning vocal range, known for her signature high notes and impressive agility. Her voice is characterized by its powerful and emotive quality, as well as its ability to effortlessly transition between styles and genres.",
//   //   type: "Female",
//   //   strengths: "Stunning vocal range, Signature high notes, Impressive agility, Powerful, Emotive"
//   // },
//   // {
//   //   id: "the_weeknd",
//   //   name: "WKD",
//   //   description: "Canadian singer with a distinctive and recognizable vocal style, characterized by his falsetto range and smooth, sensual delivery. His voice is often described as hauntingly beautiful and emotionally expressive.",
//   //   type: "Male",
//   //   strengths: "Distinctive and recognizable style, Falsetto range, Smooth and sensual delivery, Hauntingly beautiful quality, Emotionally expressive" 
//   // }
// ]
