"use client";

import { useState, type FormEvent } from "react";
import { REACTIONS, type Circle, type Post } from "@/data/circles";
import { addPost, toggleReaction, useCircleState } from "@/lib/circleStore";
import { mentionsCrisis } from "@/lib/crisisLanguage";
import { SupportCallout } from "./SupportCallout";

const MAX = 500;

export function CircleFeed({ circle }: { circle: Circle }) {
  const state = useCircleState();
  const mine = state?.posts[circle.id] ?? [];

  return (
    <>
      <Composer circleId={circle.id} />
      <ol className="feed" aria-label="Posts">
        {[...mine, ...circle.posts].map((post) => (
          <PostItem key={post.id} post={post} reacted={state?.reactions[post.id] ?? []} />
        ))}
      </ol>
    </>
  );
}

function Composer({ circleId }: { circleId: string }) {
  const [text, setText] = useState("");
  const [held, setHeld] = useState(false);
  const trimmed = text.trim();

  function share(event?: FormEvent) {
    event?.preventDefault();
    if (!trimmed) return;
    // Crisis language pauses the post to put help first. Sharing anyway is always allowed.
    if (!held && mentionsCrisis(trimmed)) {
      setHeld(true);
      return;
    }
    addPost(circleId, trimmed);
    setText("");
    setHeld(false);
  }

  return (
    <form className="composer" onSubmit={share}>
      <label htmlFor="composer-text" className="question-title">
        Share how you&apos;re doing
      </label>
      <textarea
        id="composer-text"
        className="composer-input"
        rows={3}
        maxLength={MAX}
        value={text}
        placeholder="One sentence is enough."
        onChange={(event) => {
          setText(event.target.value);
          setHeld(false);
        }}
      />
      {held ? (
        <div className="composer-held">
          <SupportCallout lead="Before this goes to the circle: what you wrote matters, and you deserve support right now." />
          <button type="button" className="btn btn-quiet btn-block" onClick={() => share()}>
            Share with the circle anyway
          </button>
        </div>
      ) : (
        <div className="composer-foot">
          <span className="composer-count" aria-live="polite">
            {text.length > MAX - 100 ? `${MAX - text.length} characters left` : ""}
          </span>
          <button type="submit" className="btn" disabled={!trimmed}>
            Share with the circle
          </button>
        </div>
      )}
    </form>
  );
}

function PostItem({ post, reacted }: { post: Post; reacted: string[] }) {
  const isMine = post.author === "You";
  return (
    <li className="post">
      <p className="post-meta">
        <span className="post-author">{post.author}</span>
        <span aria-hidden="true"> · </span>
        <span>{post.ago === "now" ? "just now" : `${post.ago} ago`}</span>
      </p>
      <p className="post-body">{post.body}</p>
      {isMine ? (
        <p className="post-note">Demo: only visible on this phone.</p>
      ) : (
        <div className="reactions" role="group" aria-label={`Respond to ${post.author}`}>
          {REACTIONS.map((reaction) => {
            const on = reacted.includes(reaction.id);
            return (
              <button
                key={reaction.id}
                type="button"
                className="reaction"
                aria-pressed={on}
                onClick={() => toggleReaction(post.id, reaction.id)}
              >
                {reaction.label}
              </button>
            );
          })}
        </div>
      )}
    </li>
  );
}
