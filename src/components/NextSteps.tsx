"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, NotebookPen, UserRound } from "lucide-react";
import { useState, type FormEvent } from "react";
import { saveNote } from "@/lib/noteStore";

const DRAFT = "Rough day at work. Got a few minutes to talk later?";
const MAX = 500;

/*
  Step three of the flow: the person chooses what comes next. Each action does exactly what it says.
  Nothing is sent, booked, or shared without the person doing it themselves.
*/
export function NextSteps({ heading = "What would help next?" }: { heading?: string }) {
  return (
    <section className="next-steps" aria-labelledby="next-steps-title">
      <h2 id="next-steps-title" className="next-steps-title">
        {heading}
      </h2>
      <p className="next-steps-lede">Pick one, or none. It&apos;s your call.</p>
      <ul className="next-list">
        <li className="next-item">
          <NoteAction />
        </li>
        <li className="next-item">
          <ReachOutAction />
        </li>
        <li className="next-item">
          <div className="next-head">
            <UserRound size={20} strokeWidth={1.75} aria-hidden="true" />
            <h3 className="next-name">Talk to a professional</h3>
          </div>
          <p className="next-detail">
            Directories of Black and culturally responsive therapists. You browse; Harbor doesn&apos;t book anything.
          </p>
          <Link href="/support" className="btn btn-quiet btn-block">
            See therapist directories
            <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </li>
      </ul>
    </section>
  );
}

function NoteAction() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const trimmed = text.trim();

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!trimmed) return;
    saveNote(trimmed);
    setText("");
    setSaved(true);
    setOpen(false);
  }

  return (
    <>
      <div className="next-head">
        <NotebookPen size={20} strokeWidth={1.75} aria-hidden="true" />
        <h3 className="next-name">Write a private note</h3>
      </div>
      <p className="next-detail">What happened, in your words. It stays on this phone, for you.</p>
      {open ? (
        <form className="note-form" onSubmit={submit}>
          <label htmlFor="note-text" className="sr-only">
            Your private note
          </label>
          <textarea
            id="note-text"
            className="composer-input"
            rows={3}
            maxLength={MAX}
            value={text}
            autoFocus
            placeholder="What happened, and how it landed."
            onChange={(event) => setText(event.target.value)}
          />
          <button type="submit" className="btn btn-block" disabled={!trimmed}>
            Save note on this phone
          </button>
        </form>
      ) : (
        <button
          type="button"
          className="btn btn-quiet btn-block"
          onClick={() => {
            setSaved(false);
            setOpen(true);
          }}
        >
          {saved ? "Write another note" : "Write a note"}
        </button>
      )}
      <p className="next-status" aria-live="polite">
        {saved ? "Saved on this phone only." : ""}
      </p>
    </>
  );
}

function ReachOutAction() {
  const [shared, setShared] = useState(false);
  const smsHref = `sms:?&body=${encodeURIComponent(DRAFT)}`;

  async function share() {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ text: DRAFT });
        setShared(true);
      } catch {
        // Closing the share sheet isn't an error worth showing.
      }
      return;
    }
    window.location.href = smsHref;
  }

  return (
    <>
      <div className="next-head">
        <MessageCircle size={20} strokeWidth={1.75} aria-hidden="true" />
        <h3 className="next-name">Reach out to someone you trust</h3>
      </div>
      <p className="next-detail">We&apos;ll start a message. You choose who, and nothing sends on its own.</p>
      <blockquote className="draft">{DRAFT}</blockquote>
      <button type="button" className="btn btn-quiet btn-block" onClick={share} data-sms-href={smsHref}>
        Open a message
      </button>
      <p className="next-status" aria-live="polite">
        {shared ? "Good call. Reaching out is part of the reset." : ""}
      </p>
    </>
  );
}
