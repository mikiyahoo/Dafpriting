import { WeddingTemplateConfig } from "../types";

export const modernMinimalTemplate: WeddingTemplateConfig = {
  id: "MODERN_MINIMAL",
  label: "Modern Minimal",
  description: "Editorial spacing, crisp typography, and restrained botanical detail.",
  palette: {
    background: "#f7f7f2",
    surface: "#ffffff",
    text: "#202020",
    muted: "#6d6d66",
    primary: "#4a5a4f",
    secondary: "#dfe4dc",
    accent: "#9b8f6a",
  },
  typography: {
    heading: "'Kostic Serif', Georgia, serif",
    body: "'Montserrat', system-ui, sans-serif",
  },
  ornament: {
    frameStyle: "minimal",
    divider: "line",
  },
};
