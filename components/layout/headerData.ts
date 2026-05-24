export interface SubItem {
  label: string;
  href: string;
  description: string;
  icon: string;
  image: string;
}

export interface Category {
  id: string;
  label: string;
  href: string;
  image: string;
  heroDescription: string;
  icon: string;
  subItems: SubItem[];
}

export const mostWanted = {
  id: "most-wanted",
  label: "Most Wanted",
  href: "/most-wanted",
  image: "/assets/Works/Business Card.jpg",
  heroDescription: "Our most popular print products, curated for you.",
  subItems: [
    { label: "Business Cards", href: "/business-cards", description: "Premium quality", icon: "id-card", image: "/assets/Works/Business Card.jpg" },
    { label: "Brochures", href: "/brochures", description: "Tri-fold & bi-fold", icon: "file-text", image: "/assets/Works/Flyer.jpg" },
    { label: "Roll Up Banners", href: "/roll-up-banners", description: "Portable displays", icon: "flag", image: "/assets/Works/Rollup Banner.jpg" },
    { label: "Flyers", href: "/flyers", description: "High-impact", icon: "file-spreadsheet", image: "/assets/Works/Flyer.jpg" },
  ],
};

export const megaMenuCategories: Category[] = [
  {
    id: "promo",
    label: "Promotional Material",
    href: "/promotional",
    image: "/assets/Works/Flyer.jpg",
    heroDescription: "Brochures, flyers, posters & more",
    icon: "FileText",
    subItems: [
      { label: "Brochures", href: "/brochures", description: "Tri-fold & bi-fold", icon: "file-text", image: "/assets/Works/Flyer.jpg" },
      { label: "Catalogues", href: "/catalogues", description: "Product listings", icon: "book-open", image: "/assets/Works/Sticker.jpg" },
      { label: "Magazines", href: "/magazines", description: "Full-colour", icon: "newspaper", image: "/assets/Works/Trophy.jpg" },
      { label: "Newsletters", href: "/newsletters", description: "Communications", icon: "mail", image: "/assets/Works/Flyer.jpg" },
      { label: "Flyers", href: "/flyers", description: "High-impact", icon: "file-spreadsheet", image: "/assets/Works/Flyer.jpg" },
      { label: "Leaflets", href: "/leaflets", description: "Compact", icon: "file-check", image: "/assets/Works/Packaging.jpg" },
      { label: "Posters", href: "/posters", description: "Large-format", icon: "image", image: "/assets/Works/Banner.jpg" },
      { label: "Paper Handbags", href: "/paper-handbags", description: "Branded bags", icon: "shopping-bag", image: "/assets/Works/Mug.jpg" },
      { label: "Menu Cards", href: "/menu-cards", description: "Restaurant", icon: "utensils-crossed", image: "/assets/Works/Menu.jpg" },
      { label: "Greeting Cards", href: "/greeting-cards", description: "Occasion cards", icon: "heart", image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=80&h=80&fit=crop" },
    ],
  },
  {
    id: "corp",
    label: "Corporate Stationery",
    href: "/corporate-stationery",
    image: "/assets/Works/Business Card.jpg",
    heroDescription: "Cards, letterheads, envelopes & more",
    icon: "Building2",
    subItems: [
      { label: "Business Cards", href: "/business-cards", description: "Premium cardstock", icon: "id-card", image: "/assets/Works/Business Card.jpg" },
      { label: "Letterhead", href: "/letterhead", description: "Branded paper", icon: "file-text", image: "/assets/Works/Certificate.jpg" },
      { label: "Envelopes", href: "/envelopes", description: "Custom printed", icon: "envelope", image: "/assets/Works/Envelope.jpg" },
      { label: "Personal Stationery", href: "/personal-stationery", description: "Elegant sets", icon: "pen", image: "/assets/Works/ID Card.jpg" },
      { label: "File Folders", href: "/file-folders", description: "Presentation", icon: "folder", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=80&h=80&fit=crop" },
      { label: "Memo Pads", href: "/memo-pads", description: "Desk pads", icon: "sticky-note", image: "https://images.unsplash.com/photo-1594617077334-3c0b1e0c189e?w=80&h=80&fit=crop" },
      { label: "Notepads", href: "/notepads", description: "Any size", icon: "notebook", image: "/assets/Works/Agenda & Cap.jpg" },
      { label: "Rubber Stamps", href: "/rubber-stamps", description: "Self-inking", icon: "stamp", image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=80&h=80&fit=crop" },
    ],
  },
  {
    id: "forms",
    label: "Business Forms",
    href: "/business-forms",
    image: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=200&h=200&fit=crop",
    heroDescription: "Invoices, slips & tickets",
    icon: "FileSpreadsheet",
    subItems: [
      { label: "Business Forms", href: "/business-forms", description: "Custom multi-part", icon: "file-alt", image: "https://images.unsplash.com/photo-1589136793252-f1aec91b4ea8?w=80&h=80&fit=crop" },
      { label: "Carbonless Invoices", href: "/carbonless-invoices", description: "NCR duplicate", icon: "file-invoice-dollar", image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=80&h=80&fit=crop" },
      { label: "Bank Slips", href: "/bank-slips", description: "Deposit slips", icon: "landmark", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=80&h=80&fit=crop" },
      { label: "Raffle Tickets", href: "/raffle-tickets", description: "Numbered", icon: "ticket", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80&h=80&fit=crop" },
    ],
  },
  {
    id: "books",
    label: "Books & Documents",
    href: "/books-documents",
    image: "/assets/Works/Agenda & Cap.jpg",
    heroDescription: "Booklets, manuals & reports",
    icon: "Book",
    subItems: [
      { label: "Booklets", href: "/booklets", description: "Saddle-stitched", icon: "book", image: "/assets/Works/Agenda & Cap.jpg" },
      { label: "Manuals", href: "/manuals", description: "Training guides", icon: "book-open", image: "https://images.unsplash.com/photo-1594617077334-3c0b1e0c189e?w=80&h=80&fit=crop" },
      { label: "Report Covers", href: "/report-covers", description: "Presentation", icon: "folder-open", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=80&h=80&fit=crop" },
    ],
  },
  {
    id: "signs",
    label: "Signage & Displays",
    href: "/signage",
    image: "/assets/Works/Rollup Banner.jpg",
    heroDescription: "Banners, labels & displays",
    icon: "Image",
    subItems: [
      { label: "Roll Up Banners", href: "/roll-up-banners", description: "Portable displays", icon: "flag", image: "/assets/Works/Rollup Banner.jpg" },
      { label: "Shelf Talkers", href: "/shelf-talkers", description: "Point-of-sale", icon: "tag", image: "/assets/Works/Mica Sign.jpg" },
      { label: "Shelf Strips", href: "/shelf-strips", description: "Edge markers", icon: "ruler", image: "/assets/Works/Mica Sign_2.jpg" },
      { label: "Labels", href: "/labels", description: "Custom stickers", icon: "bookmark", image: "/assets/Works/Sticker.jpg" },
    ],
  },
  {
    id: "events",
    label: "Events & Seasonal",
    href: "/events-seasonal",
    image: "/assets/Works/T-shirt.jpg",
    heroDescription: "Invitations, calendars & apparel",
    icon: "Calendar",
    subItems: [
      { label: "Invitations", href: "/invitations", description: "Weddings & parties", icon: "envelope-open", image: "/assets/Works/Weeding Card.jpg" },
      { label: "Calendars", href: "/calendars", description: "Wall & desk", icon: "calendar", image: "https://images.unsplash.com/photo-1589136793252-f1aec91b4ea8?w=80&h=80&fit=crop" },
      { label: "Branded Clothing", href: "/branded-clothing", description: "Screen print", icon: "shirt", image: "/assets/Works/T-shirt.jpg" },
    ],
  },
  {
    id: "creative",
    label: "Creative & Finishing",
    href: "/creative-finishing",
    image: "/assets/Works/Engrave.jpg",
    heroDescription: "Design, binding & lamination",
    icon: "Palette",
    subItems: [
      { label: "Graphic Design", href: "/graphic-design", description: "Professional service", icon: "palette", image: "/assets/Works/Engrave.jpg" },
      { label: "Bindings", href: "/bindings", description: "Spiral & hard cover", icon: "binder-clip", image: "https://images.unsplash.com/photo-1594736797933-8f4a5e9e0f8b?w=80&h=80&fit=crop" },
      { label: "Laminating", href: "/laminating", description: "Gloss & matte", icon: "layer-group", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=80&h=80&fit=crop" },
    ],
  },
];

export const exploreMore = [
  { label: "Graphic Design", href: "/graphic-design", icon: "Palette", },
  { label: "Bindings", href: "/bindings", icon: "BookOpen", },
  { label: "Laminating", href: "/laminating", icon: "Layers", },
  { label: "Custom Packaging", href: "/custom-packaging", icon: "Package", },
  { label: "Large Format", href: "/large-format", icon: "Expand", },
  { label: "Promotional Items", href: "/promotional-items", icon: "Gift", },
];

export const popularSearches = [
  { label: "Business Cards", href: "/business-cards" },
  { label: "Brochures & Flyers", href: "/brochures" },
  { label: "Posters & Banners", href: "/posters" },
  { label: "Custom Notepads", href: "/custom-notepads" },
  { label: "Carbonless Invoices", href: "/carbonless-invoices" },
];

export interface RightBlockItem {
  badge?: string;
  badgeLabel?: string;
  links: { label: string; href: string }[];
}

export const rightColumnBlocks: RightBlockItem[] = [
  {
    badge: "Explore More",
    badgeLabel: "Stocks",
    links: [
      { label: "Recycled", href: "/recycled" },
      { label: "Kraft", href: "/kraft" },
      { label: "Cotton", href: "/cotton" },
      { label: "Duplex", href: "/duplex" },
      { label: "Sandy Matte", href: "/sandy-matte" },
    ],
  },
  {
    links: [
      { label: "Business Card Maker", href: "/business-card-maker" },
      { label: "Design Trends 2026", href: "/design-trends" },
      { label: "Typography Cards", href: "/typography-cards" },
      { label: "Download Templates", href: "/download-templates" },
    ],
    badgeLabel: "Get Inspired",
  },
  {
    links: [
      { label: "Order Sample Pack", href: "/order-sample-pack" },
    ],
    badgeLabel: "Feel the Quality",
  },
];
