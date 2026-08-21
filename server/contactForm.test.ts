import { beforeEach, describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const { sendContactMessage } = vi.hoisted(() => ({ sendContactMessage: vi.fn().mockResolvedValue(undefined) }));
vi.mock("./email", () => ({ sendContactMessage }));

describe("contact.send", () => {
  beforeEach(() => sendContactMessage.mockClear());

  it("validates and forwards a project enquiry to the server mailer", async () => {
    const ctx = {
      user: undefined,
      req: {} as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    } satisfies TrpcContext;

    const caller = appRouter.createCaller(ctx);
    const result = await caller.contact.send({
      name: "Rintu Chowdory",
      email: "visitor@example.com",
      project: "I would like to discuss a new platform project.",
    });

    expect(result).toEqual({ success: true });
    expect(sendContactMessage).toHaveBeenCalledWith({
      name: "Rintu Chowdory",
      email: "visitor@example.com",
      project: "I would like to discuss a new platform project.",
    });
  });

  it("rejects malformed submissions before dispatch", async () => {
    const ctx = {
      user: undefined,
      req: {} as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    } satisfies TrpcContext;

    const caller = appRouter.createCaller(ctx);
    await expect(caller.contact.send({ name: "A", email: "bad", project: "short" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(sendContactMessage).not.toHaveBeenCalled();
  });
});
