"use client";

import type { Post, ReactionId } from "@/data/circles";
import { parseJson, readKey, useStoredJson, writeKey } from "./localStore";

// Demo mode: posts and reactions only ever live in this browser. Nobody else sees them.
const KEY = "harbor-circles-v1";

export type CircleState = {
  posts: Record<string, Post[]>;
  reactions: Record<string, ReactionId[]>;
};

const EMPTY: CircleState = { posts: {}, reactions: {} };

function load(): CircleState {
  return { ...EMPTY, ...parseJson<Partial<CircleState>>(readKey(KEY), {}) };
}

export function useCircleState(): CircleState | null {
  const state = useStoredJson<Partial<CircleState>>(KEY, {});
  return state === null ? null : { ...EMPTY, ...state };
}

export function addPost(circleId: string, body: string): Post {
  const state = load();
  const post: Post = { id: crypto.randomUUID(), author: "You", ago: "now", body };
  state.posts[circleId] = [post, ...(state.posts[circleId] ?? [])];
  writeKey(KEY, JSON.stringify(state));
  return post;
}

export function toggleReaction(postId: string, reaction: ReactionId) {
  const state = load();
  const current = state.reactions[postId] ?? [];
  state.reactions[postId] = current.includes(reaction)
    ? current.filter((id) => id !== reaction)
    : [...current, reaction];
  writeKey(KEY, JSON.stringify(state));
}
