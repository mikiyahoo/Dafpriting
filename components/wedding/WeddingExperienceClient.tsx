"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import {
  CalendarDays,
  Check,
  Gift,
  MapPin,
  MessageCircle,
  Send,
  Share2,
  Sparkles,
} from "lucide-react";
import { getWeddingTemplate } from "@/templates/wedding";
import { RSVP_STATUS, RSVPStatus, WeddingInvitationRecord } from "@/types";
import { cn } from "@/lib/utils";

interface WeddingExperienceClientProps {
  invitation: WeddingInvitationRecord;
}

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdown(date: string): Countdown {
  const diff = Math.max(new Date(date).getTime() - Date.now(), 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function WeddingExperienceClient({
  invitation,
}: WeddingExperienceClientProps) {
  const template = getWeddingTemplate(invitation.templateKey ?? invitation.theme);
  const [countdown, setCountdown] = useState(() =>
    getCountdown(invitation.weddingDate)
  );
  const [rsvpAttendance, setRsvpAttendance] = useState<RSVPStatus>(
    RSVP_STATUS.ATTENDING
  );
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [message, setMessage] = useState("");
  const [rsvpStatus, setRsvpStatus] = useState("");
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [gifts, setGifts] = useState(invitation.gifts);
  const [reservationName, setReservationName] = useState("");
  const [reservationMessage, setReservationMessage] = useState("");
  const [reservingGiftId, setReservingGiftId] = useState<string | null>(null);
  const [giftStatus, setGiftStatus] = useState("");

  const palette = useMemo(
    () => ({
      ...template.palette,
      primary: invitation.primaryColor || template.palette.primary,
      secondary: invitation.secondaryColor || template.palette.secondary,
    }),
    [invitation.primaryColor, invitation.secondaryColor, template.palette]
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCountdown(getCountdown(invitation.weddingDate));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [invitation.weddingDate]);

  const shareText = `${invitation.brideName} & ${invitation.groomName} wedding invitation`;
  const weddingUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/wedding/${invitation.slug}`;
  const encodedUrl = encodeURIComponent(weddingUrl);
  const encodedText = encodeURIComponent(shareText);

  const submitRsvp = async (event: React.FormEvent) => {
    event.preventDefault();
    setRsvpLoading(true);
    setRsvpStatus("");

    try {
      const response = await fetch(`/api/wedding/${invitation.slug}/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName,
          guestPhone,
          attendance: rsvpAttendance,
          message,
        }),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Could not submit RSVP");

      setRsvpStatus("Thank you. Your RSVP has been received.");
      setGuestName("");
      setGuestPhone("");
      setMessage("");
    } catch (error) {
      setRsvpStatus(error instanceof Error ? error.message : "Could not submit RSVP");
    } finally {
      setRsvpLoading(false);
    }
  };

  const reserveGift = async (giftId: string) => {
    if (!reservationName.trim()) {
      setGiftStatus("Please enter your name before reserving a gift.");
      return;
    }

    setReservingGiftId(giftId);
    setGiftStatus("");

    try {
      const response = await fetch(`/api/wedding/${invitation.slug}/gift-reserve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          giftId,
          reservedBy: reservationName,
          reservedMessage: reservationMessage,
        }),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Could not reserve gift");

      setGifts((current) =>
        current.map((gift) => (gift.id === giftId ? result.data : gift))
      );
      setGiftStatus("Gift reserved. The couple will see your name.");
      setReservationName("");
      setReservationMessage("");
    } catch (error) {
      setGiftStatus(error instanceof Error ? error.message : "Could not reserve gift");
    } finally {
      setReservingGiftId(null);
    }
  };

  return (
    <main
      className="min-h-screen overflow-hidden"
      style={{
        background: palette.background,
        color: palette.text,
        fontFamily: template.typography.body,
      }}
    >
      <section className="relative min-h-[92vh] px-5 py-10 flex items-center justify-center">
        {(invitation.heroImageUrl || invitation.coverImage) && (
          <Image
            src={invitation.heroImageUrl || invitation.coverImage || ""}
            alt={`${invitation.brideName} and ${invitation.groomName}`}
            fill
            priority
            className="object-cover"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background: invitation.heroImageUrl || invitation.coverImage
              ? "linear-gradient(180deg, rgba(20,16,14,.42), rgba(20,16,14,.62))"
              : `radial-gradient(circle at top left, ${palette.secondary}, transparent 34%), ${palette.background}`,
          }}
        />
        {template.ornament.cornerAsset && (
          <>
            <Image
              src={template.ornament.cornerAsset}
              alt=""
              width={224}
              height={224}
              className="absolute left-0 top-0 w-36 opacity-80 animate-[float_8s_ease-in-out_infinite] sm:w-56"
            />
            <Image
              src={template.ornament.cornerAsset}
              alt=""
              width={224}
              height={224}
              className="absolute bottom-0 right-0 w-36 rotate-180 opacity-80 animate-[float_9s_ease-in-out_infinite] sm:w-56"
            />
          </>
        )}
        <div className="relative z-10 w-full max-w-3xl text-center">
          <p className="text-xs sm:text-sm uppercase text-white/85">
            {invitation.welcomeMessage || "Together with their families"}
          </p>
          <h1
            className="mt-6 text-5xl sm:text-7xl md:text-8xl leading-none text-white"
            style={{ fontFamily: template.typography.heading }}
          >
            {invitation.brideName}
            <span className="block text-3xl sm:text-5xl my-3" style={{ color: palette.accent }}>
              &
            </span>
            {invitation.groomName}
          </h1>
          <p className="mt-8 text-sm sm:text-base uppercase text-white/90">
            invite you to celebrate their wedding
          </p>
          <p className="mt-5 text-white/85">
            {new Date(invitation.weddingDate).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            {" at "}
            {invitation.weddingTime}
          </p>
        </div>
      </section>

      <section className="px-5 py-12" style={{ background: palette.surface }}>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4">
          {Object.entries(countdown).map(([label, value]) => (
            <div
              key={label}
              className="rounded-lg border px-4 py-6 text-center"
              style={{ borderColor: palette.secondary, background: palette.background }}
            >
              <div className="text-3xl font-semibold" style={{ color: palette.primary }}>
                {value}
              </div>
              <div className="mt-1 text-xs uppercase" style={{ color: palette.muted }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {(invitation.customMessage || invitation.story) && (
        <section className="px-5 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <Sparkles className="mx-auto mb-5 h-6 w-6" style={{ color: palette.primary }} />
            {invitation.customMessage && (
              <p className="text-lg leading-8" style={{ color: palette.text }}>
                {invitation.customMessage}
              </p>
            )}
            {invitation.story && (
              <p className="mt-7 whitespace-pre-wrap text-sm leading-7" style={{ color: palette.muted }}>
                {invitation.story}
              </p>
            )}
          </div>
        </section>
      )}

      <section className="px-5 py-16" style={{ background: palette.surface }}>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          <InfoBlock
            icon={<CalendarDays className="h-5 w-5" />}
            label="Date & Time"
            value={`${new Date(invitation.weddingDate).toLocaleDateString()} · ${invitation.weddingTime}`}
            color={palette.primary}
          />
          <InfoBlock
            icon={<MapPin className="h-5 w-5" />}
            label={invitation.venueName}
            value={invitation.venueAddress}
            color={palette.primary}
          />
          <InfoBlock
            icon={<Sparkles className="h-5 w-5" />}
            label="Dress Code"
            value={invitation.dressCode || "Celebrate beautifully"}
            color={palette.primary}
          />
        </div>
        {invitation.mapUrl && (
          <div className="mt-8 text-center">
            <a
              href={invitation.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
              style={{ background: palette.primary }}
            >
              <MapPin className="h-4 w-4" />
              Open Map
            </a>
          </div>
        )}
      </section>

      {(invitation.allowRSVP ?? true) && (
      <section className="px-5 py-16">
        <div className="mx-auto max-w-3xl">
          <SectionTitle title="RSVP" subtitle="Let the couple know if you can celebrate with them." />
          <form onSubmit={submitRsvp} className="mt-8 space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                [RSVP_STATUS.ACCEPTED, "Accept With Pleasure"],
                [RSVP_STATUS.DECLINED, "Sorry, Can't Attend"],
                ["MAYBE", "Maybe"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRsvpAttendance(value as RSVPStatus)}
                  className={cn(
                    "rounded-lg border px-4 py-3 text-sm font-semibold transition",
                    rsvpAttendance === value ? "text-white" : ""
                  )}
                  style={{
                    borderColor: palette.primary,
                    background: rsvpAttendance === value ? palette.primary : "transparent",
                    color: rsvpAttendance === value ? "#fff" : palette.primary,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <input
              value={guestName}
              onChange={(event) => setGuestName(event.target.value)}
              placeholder="Your name"
              className="w-full rounded-lg border bg-white/80 px-4 py-3 text-sm outline-none"
              required
            />
            <input
              value={guestPhone}
              onChange={(event) => setGuestPhone(event.target.value)}
              placeholder="Phone number"
              className="w-full rounded-lg border bg-white/80 px-4 py-3 text-sm outline-none"
            />
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Message for the couple"
              rows={4}
              className="w-full rounded-lg border bg-white/80 px-4 py-3 text-sm outline-none"
            />
            <button
              type="submit"
              disabled={rsvpLoading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white sm:w-auto"
              style={{ background: palette.primary }}
            >
              <Send className="h-4 w-4" />
              {rsvpLoading ? "Sending..." : "Submit RSVP"}
            </button>
            {rsvpStatus && <p className="text-sm" style={{ color: palette.primary }}>{rsvpStatus}</p>}
          </form>
        </div>
      </section>
      )}

      {(invitation.allowGiftRegistry ?? true) && gifts.length > 0 && (
        <section className="px-5 py-16" style={{ background: palette.surface }}>
          <div className="mx-auto max-w-5xl">
            <SectionTitle title="Gift Registry" subtitle="Reserve a gift so every gesture stays beautifully coordinated." />
            <div className="mt-8 max-w-md">
              <input
                value={reservationName}
                onChange={(event) => setReservationName(event.target.value)}
                placeholder="Your name for gift reservation"
                className="w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none"
              />
              <textarea
                value={reservationMessage}
                onChange={(event) => setReservationMessage(event.target.value)}
                placeholder="Optional message for the couple"
                rows={3}
                className="mt-3 w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none"
              />
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {gifts.map((gift) => (
                <div
                  key={gift.id}
                  className="flex gap-4 rounded-lg border p-4"
                  style={{ borderColor: palette.secondary, background: palette.background }}
                >
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: palette.secondary, color: palette.primary }}
                  >
                    {gift.imageUrl ? (
                      <div
                        aria-hidden="true"
                        className="h-full w-full rounded-lg bg-cover bg-center"
                        style={{ backgroundImage: `url(${gift.imageUrl})` }}
                      />
                    ) : (
                      <Gift className="h-6 w-6" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold">{gift.title || gift.giftName}</h3>
                      <span
                        className="inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs"
                        style={{
                          background: gift.isReserved && !gift.allowDuplicates ? palette.secondary : "transparent",
                          color: gift.isReserved && !gift.allowDuplicates ? palette.text : palette.primary,
                          border: `1px solid ${palette.secondary}`,
                        }}
                      >
                        {gift.isReserved && !gift.allowDuplicates ? <Check className="h-3 w-3" /> : null}
                        {gift.isReserved && !gift.allowDuplicates ? "Reserved" : "Available"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em]" style={{ color: palette.primary }}>
                      Priority: {gift.priorityLabel || (gift.priority >= 3 ? "HIGH" : gift.priority === 2 ? "MEDIUM" : "LOW")}
                    </p>
                    {gift.description && (
                      <p className="mt-2 text-sm" style={{ color: palette.muted }}>
                        {gift.description}
                      </p>
                    )}
                    {gift.isReserved && !gift.allowDuplicates ? (
                      <p className="mt-3 text-xs" style={{ color: palette.muted }}>
                        Reserved by {gift.reservedBy || "a guest"}
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => reserveGift(gift.id)}
                        disabled={reservingGiftId === gift.id}
                        className="mt-4 rounded-full px-4 py-2 text-xs font-semibold text-white"
                        style={{ background: palette.primary }}
                      >
                        {reservingGiftId === gift.id ? "Reserving..." : "Reserve Gift"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {giftStatus && <p className="mt-5 text-sm" style={{ color: palette.primary }}>{giftStatus}</p>}
          </div>
        </section>
      )}

      {invitation.galleryImages.length > 0 && (
        <section className="px-5 py-16">
          <div className="mx-auto max-w-5xl">
            <SectionTitle title="Gallery" subtitle="A few moments before the day." />
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {invitation.galleryImages.map((imageUrl, index) => (
                <div key={imageUrl} className="relative aspect-[4/5] overflow-hidden rounded-lg">
                  <Image
                    src={imageUrl}
                    alt={`Wedding gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-5 py-16 text-center" style={{ background: palette.surface }}>
        <Share2 className="mx-auto mb-4 h-5 w-5" style={{ color: palette.primary }} />
        <SectionTitle title="Share" subtitle="Send the invitation to family and friends." />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ShareButton href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`} label="WhatsApp" icon={<MessageCircle className="h-4 w-4" />} color={palette.primary} />
          <ShareButton href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`} label="Telegram" icon={<Send className="h-4 w-4" />} color={palette.primary} />
          <ShareButton href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} label="Facebook" icon={<Share2 className="h-4 w-4" />} color={palette.primary} />
        </div>
      </section>
    </main>
  );
}

function InfoBlock({
  icon,
  label,
  value,
  color,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-lg border border-black/10 p-6">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/5" style={{ color }}>
        {icon}
      </div>
      <h2 className="font-semibold">{label}</h2>
      <p className="mt-2 text-sm leading-6 opacity-75">{value}</p>
    </div>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl sm:text-4xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 opacity-70">{subtitle}</p>
    </div>
  );
}

function ShareButton({
  href,
  label,
  icon,
  color,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  color: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
      style={{ background: color }}
    >
      {icon}
      {label}
    </a>
  );
}
