import { WeddingTemplateConfig } from "../types";

export const traditionalEthiopianTemplate: WeddingTemplateConfig = {
  id: "TRADITIONAL_ETHIOPIAN",
  label: "Traditional Ethiopian",
  description: "Cultural color accents, ceremonial warmth, and woven-border energy.",
  palette: {
    background: "#fffaf0",
    surface: "#ffffff",
    text: "#2a241c",
    muted: "#766a58",
    primary: "#1f7a4d",
    secondary: "#f0d14a",
    accent: "#c73b2f",
  },
  typography: {
    heading: "'Kostic Serif', Georgia, serif",
    body: "'Montserrat', system-ui, sans-serif",
  },
  ornament: {
    frameStyle: "cultural",
    divider: "woven",
  },
};
