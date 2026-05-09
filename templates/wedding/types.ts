export interface WeddingTemplateConfig {
  id: string;
  label: string;
  description: string;
  palette: {
    background: string;
    surface: string;
    text: string;
    muted: string;
    primary: string;
    secondary: string;
    accent: string;
  };
  typography: {
    heading: string;
    body: string;
    letterSpacing?: string;
  };
  ornament: {
    frameStyle: "floral" | "minimal" | "royal" | "cultural" | "dark";
    cornerAsset?: string;
    divider: string;
  };
}
