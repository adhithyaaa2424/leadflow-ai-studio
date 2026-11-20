import { describe, expect, it, vi } from "vitest";
import { sendBookingToMake, type SavedConsultation } from "./make-webhook.server";

const booking: SavedConsultation = {
  id: "11111111-1111-1111-1111-111111111111",
  full_name: "Jane Cooper",
  email: "jane@company.com",
  company: "Acme Inc.",
  phone: null,
  service: "AI Automation",
  budget: "$5,000 – $10,000",
  preferred_date: "2026-12-01",
  message: "We get 50+ inquiries a week.",
  created_at: "2026-11-20T14:53:00.000Z",
};
const URL_ = "https://hook.eu1.make.com/example-hook";

describe("sendBookingToMake", () => {
  it("POSTs exactly the ten booking fields as JSON", async () => {
    const fetchImpl = vi.fn(async () => new Response("Accepted", { status: 200 }));
    const result = await sendBookingToMake(booking, { webhookUrl: URL_, fetchImpl });
    expect(result).toEqual({ status: "sent" });
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe(URL_);
    expect(init.method).toBe("POST");
    expect(Object.keys(JSON.parse(init.body as string)).sort()).toEqual(
      ["budget", "company", "created_at", "email", "full_name", "id", "message", "phone", "preferred_date", "service"],
    );
    expect(JSON.parse(init.body as string).id).toBe(booking.id);
  });

  it("does not call Make.com when MAKE_WEBHOOK_URL is missing", async () => {
    const fetchImpl = vi.fn();
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const result = await sendBookingToMake(booking, { webhookUrl: undefined, fetchImpl });
    expect(result).toEqual({ status: "skipped", reason: "not_configured" });
    expect(fetchImpl).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it("returns failed instead of throwing when Make.com responds with an error", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const fetchImpl = vi.fn(async () => new Response("Bad", { status: 500 }));
    await expect(sendBookingToMake(booking, { webhookUrl: URL_, fetchImpl })).resolves.toMatchObject({ status: "failed" });
    error.mockRestore();
  });

  it("returns failed instead of throwing when Make.com is unreachable, and never logs the URL", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const fetchImpl = vi.fn(async () => { throw new TypeError("network down"); });
    await expect(sendBookingToMake(booking, { webhookUrl: URL_, fetchImpl })).resolves.toMatchObject({ status: "failed" });
    expect(error.mock.calls.flat().join(" ")).not.toContain("make.com/example-hook");
    error.mockRestore();
  });
});
