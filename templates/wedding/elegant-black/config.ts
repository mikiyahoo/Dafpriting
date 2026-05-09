import { WeddingTemplateConfig } from "../types";

export const elegantBlackTemplate: WeddingTemplateConfig = {
  id: "ELEGANT_BLACK",
  label: "Elegant Black",
  description: "Black-tie contrast, champagne highlights, and cinematic pacing.",
  palette: {
    background: "#161412",
    surface: "#211f1b",
    text: "#f7f1e8",
    muted: "#c8bba8",
    primary: "#d8b66b",
    secondary: "#332c22",
    accent: "#f0d99b",
  },
  typography: {
    heading: "'Kostic Serif', Georgia, serif",
    body: "'Montserrat', system-ui, sans-serif",
  },
  ornament: {
    frameStyle: "dark",
    divider: "spark",
  },
};
