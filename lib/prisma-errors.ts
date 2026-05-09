export function isMissingWeddingExperienceTable(error: unknown) {
  if (!error || typeof error !== "object") return false;

  const maybeError = error as {
    code?: string;
    meta?: { table?: string; modelName?: string };
    message?: string;
  };

  const message = maybeError.message ?? "";
  const table = maybeError.meta?.table ?? "";

  return (
    maybeError.code === "P2021" &&
    (table.includes("WeddingInvitation") ||
      table.includes("GiftRegistry") ||
      table.includes("RSVP") ||
      message.includes("WeddingInvitation") ||
      message.includes("GiftRegistry") ||
      message.includes("RSVP"))
  );
}
