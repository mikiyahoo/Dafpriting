import { WeddingTemplateConfig } from "../types";

export const royalGoldTemplate: WeddingTemplateConfig = {
  id: "ROYAL_GOLD",
  label: "Royal Gold",
  description: "Formal gold ornamentation with a polished celebration-room feel.",
  palette: {
    background: "#fbf7ef",
    surface: "#fffdf8",
    text: "#2c2418",
    muted: "#74634b",
    primary: "#9d742c",
    secondary: "#ead6a4",
    accent: "#d7a634",
  },
  typography: {
    heading: "'Kostic Serif', Georgia, serif",
    body: "'Montserrat', system-ui, sans-serif",
  },
  ornament: {
    frameStyle: "royal",
    divider: "crest",
  },
};
