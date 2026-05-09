import { WeddingTemplateConfig } from "../types";

export const floralLuxuryTemplate: WeddingTemplateConfig = {
  id: "FLORAL_LUXURY",
  label: "Floral Luxury",
  description: "Soft romantic florals, ivory surfaces, and warm rose-gold accents.",
  palette: {
    background: "#fff8f5",
    surface: "#ffffff",
    text: "#3a2a2f",
    muted: "#8a6f76",
    primary: "#b76e79",
    secondary: "#f2d8d5",
    accent: "#c49a4a",
  },
  typography: {
    heading: "'Kostic Serif', Georgia, serif",
    body: "'Montserrat', system-ui, sans-serif",
  },
  ornament: {
    frameStyle: "floral",
    cornerAsset: "/florals/floral-corner.svg",
    divider: "petal",
  },
};
