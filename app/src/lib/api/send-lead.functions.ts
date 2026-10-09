import process from "node:process";
import { connect, type TLSSocket } from "node:tls";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  purpose: z.string().trim().min(1).max(150),
  length: z.string().trim().max(30),
  width: z.string().trim().max(30),
  phone: z.string().trim().min(5).max(50),
  load: z.string().trim().max(50),
  region: z.string().trim().max(150),
  source: z.string().trim().min(1).max(60),
  website: z.string().max(200).optional(),
});

type SmtpReply = { code: number; lines: string[] };
type ReplyWaiter = {
  resolve: (reply: SmtpReply) => void;
  reject: (error: Error) => void;
};

async function sendSmtpMessage(
  host: string,
  port: number,
  username: string,
  password: string,
  recipient: string,
  subject: string,
  body: string,
): Promise<void> {
  const socket: TLSSocket = connect({ host, port, servername: host });
  socket.setTimeout(15000, () => socket.destroy(new Error("SMTP socket timeout")));

  let buffer = "";
  let currentLines: string[] = [];
  const replies: SmtpReply[] = [];
  const waiters: ReplyWaiter[] = [];
  let socketError: Error | undefined;

  const deliverReply = (reply: SmtpReply) => {
    const waiter = waiters.shift();
    if (waiter) waiter.resolve(reply);
    else replies.push(reply);
  };

  socket.on("data", (chunk: Buffer) => {
    buffer += chunk.toString("utf8");
    while (true) {
      const end = buffer.indexOf("\r\n");
      if (end < 0) break;
      const line = buffer.slice(0, end);
      buffer = buffer.slice(end + 2);
      currentLines.push(line);
      const match = /^(\d{3})([ -])/.exec(line);
      if (match && match[2] === " ") {
        deliverReply({ code: Number(match[1]), lines: currentLines });
        currentLines = [];
      }
    }
  });
  socket.on("error", (error: Error) => {
    socketError = error;
    while (waiters.length) waiters.shift()!.reject(error);
  });

  const readReply = (timeoutMs = 10000): Promise<SmtpReply> => {
    if (replies.length) return Promise.resolve(replies.shift()!);
    if (socketError) return Promise.reject(socketError);
    return new Promise((resolve, reject) => {
      let waiter: ReplyWaiter;
      const timer = setTimeout(() => {
        const index = waiters.indexOf(waiter);
        if (index >= 0) waiters.splice(index, 1);
        reject(new Error("SMTP response timeout"));
      }, timeoutMs);
      waiter = {
        resolve: (reply) => { clearTimeout(timer); resolve(reply); },
        reject: (error) => { clearTimeout(timer); reject(error); },
      };
      waiters.push(waiter);
    });
  };

  const expect = async (codes: number[], command?: string) => {
    if (command) socket.write(command + "\r\n");
    const reply = await readReply();
    if (!codes.includes(reply.code)) {
      throw new Error("SMTP command failed with code " + reply.code);
    }
    return reply;
  };

  try {
    await new Promise<void>((resolve, reject) => {
      socket.once("secureConnect", resolve);
      socket.once("error", reject);
    });
    await expect([220]);
    await expect([250], "EHLO ponton-piers.ru");
    const auth = Buffer.from("\0" + username + "\0" + password, "utf8").toString("base64");
    await expect([235], "AUTH PLAIN " + auth);
    await expect([250], "MAIL FROM:<" + username + ">");
    await expect([250, 251], "RCPT TO:<" + recipient + ">");
    await expect([354], "DATA");

    const encodedSubject = "=?UTF-8?B?" + Buffer.from(subject, "utf8").toString("base64") + "?=";
    const encodedFromName = "=?UTF-8?B?" + Buffer.from("Понтон Пирс", "utf8").toString("base64") + "?=";
    const encodedBody = Buffer.from(body, "utf8").toString("base64").match(/.{1,76}/g)?.join("\r\n") ?? "";
    const message = [
      "From: " + encodedFromName + " <" + username + ">",
      "To: <" + recipient + ">",
      "Subject: " + encodedSubject,
      "Date: " + new Date().toUTCString(),
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: base64",
      "",
      encodedBody,
      ".",
      "",
    ].join("\r\n");
    socket.write(message);
    await expect([250]);
    await expect([221], "QUIT");
  } finally {
    socket.destroy();
  }
}

export const sendLead = createServerFn({ method: "POST" })
  .validator(leadSchema)
  .handler(async ({ data }) => {
    if (data.website?.trim()) return { ok: true };

    const host = process.env.SMTP_HOST || "smtp.mail.ru";
    const port = Number(process.env.SMTP_PORT || "465");
    const username = process.env.SMTP_USER;
    const password = process.env.SMTP_PASS;
    const recipient = process.env.LEAD_TO || "info@ponton-piers.ru";

    if (!username || !password || !Number.isInteger(port) || port !== 465) {
      console.error("Lead email configuration is incomplete or unsupported");
      throw new Error("Отправка временно недоступна. Попробуйте позже.");
    }
    if ([host, username, recipient].some((value) => /[\r\n<>]/.test(value))) {
      console.error("Lead email configuration contains invalid header characters");
      throw new Error("Отправка временно недоступна. Попробуйте позже.");
    }

    const body = [
      "Новая заявка с сайта ponton-piers.ru",
      "",
      "Источник: " + data.source,
      "Назначение: " + data.purpose,
      "Длина, м: " + (data.length || "не указана"),
      "Ширина, м: " + (data.width || "не указана"),
      "Нагрузка, кг: " + (data.load || "не указана"),
      "Регион: " + (data.region || "не указан"),
      "Телефон: " + data.phone,
    ].join("\n");

    try {
      await sendSmtpMessage(
        host,
        port,
        username,
        password,
        recipient,
        "Новая заявка с сайта ponton-piers.ru",
        body,
      );
      return { ok: true };
    } catch (error) {
      console.error("Lead email delivery failed:", error instanceof Error ? error.message : "unknown error");
      throw new Error("Не удалось отправить заявку. Попробуйте позже.");
    }
  });
