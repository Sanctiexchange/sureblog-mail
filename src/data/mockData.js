export const subscribers = [
  { id: 1, name: "Chidi Okafor", email: "chidi@example.com", status: "active", tags: ["culture"] },
  { id: 2, name: "Amara Nwosu", email: "amara@example.com", status: "active", tags: ["business"] },
  { id: 3, name: "Tunde Bello", email: "tunde@example.com", status: "unsubscribed", tags: ["ideas"] },
];

export const campaigns = [
  { id: 1, subject: "This Week in Ideas & Culture", status: "sent", sentAt: "2026-09-10", recipients: 1240, openRate: 42 },
  { id: 2, subject: "New Vendor Spotlight: Handmade Textiles", status: "sent", sentAt: "2026-09-03", recipients: 1198, openRate: 38 },
  { id: 3, subject: "October Editorial Preview", status: "draft", sentAt: null, recipients: 0, openRate: 0 },
];

export const statsHistory = [
  { date: "Aug 20", opens: 320 }, { date: "Aug 27", opens: 410 },
  { date: "Sep 3", opens: 455 }, { date: "Sep 10", opens: 520 },
];