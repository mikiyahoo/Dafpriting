import { floralLuxuryTemplate } from "./floral-luxury/config";
import { modernMinimalTemplate } from "./modern-minimal/config";
import { royalGoldTemplate } from "./royal-gold/config";
import { traditionalEthiopianTemplate } from "./traditional-ethiopian/config";
import { elegantBlackTemplate } from "./elegant-black/config";
import { WeddingTemplateConfig } from "./types";

export const weddingTemplates: Record<string, WeddingTemplateConfig> = {
  FLORAL_LUXURY: floralLuxuryTemplate,
  MODERN_MINIMAL: modernMinimalTemplate,
  ROYAL_GOLD: royalGoldTemplate,
  TRADITIONAL_ETHIOPIAN: traditionalEthiopianTemplate,
  ELEGANT_BLACK: elegantBlackTemplate,
  GARDEN_WEDDING: floralLuxuryTemplate,
  LUXURY_WHITE: modernMinimalTemplate,
  CLASSIC_SERIF: royalGoldTemplate,
};

export const weddingTemplateOptions = Object.values(weddingTemplates);

export function getWeddingTemplate(theme?: string | null): WeddingTemplateConfig {
  return weddingTemplates[theme ?? ""] ?? floralLuxuryTemplate;
}
