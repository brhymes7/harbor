"use client";

import { Download, Trash2 } from "lucide-react";
import { useState } from "react";
import { exportMyData, useCheckIns } from "@/lib/checkinStore";
import { useNotes } from "@/lib/noteStore";
import { clearAll } from "@/lib/localStore";

export function DataControls() {
  const checkIns = useCheckIns();
  const notes = useNotes();
  const [confirming, setConfirming] = useState(false);
  const [cleared, setCleared] = useState(false);
  const count = checkIns?.length ?? 0;
  const noteCount = notes?.length ?? 0;
  const nothing = count === 0 && noteCount === 0;

  function download() {
    const blob = new Blob([exportMyData()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `harbor-my-data-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function erase() {
    clearAll();
    setConfirming(false);
    setCleared(true);
  }

  return (
    <section className="card data-controls" aria-labelledby="data-title">
      <h2 id="data-title" className="card-title">
        On this phone right now
      </h2>
      <p className="card-body">
        {checkIns === null
          ? " "
          : nothing
            ? "Nothing saved yet."
            : `${count} ${count === 1 ? "check-in" : "check-ins"} and ${noteCount} private ${noteCount === 1 ? "note" : "notes"}, plus any circle posts you made.`}
      </p>

      <div className="data-actions">
        <button type="button" className="btn btn-quiet btn-block" onClick={download} disabled={nothing}>
          <Download size={18} strokeWidth={1.75} aria-hidden="true" />
          Download my check-ins and notes
        </button>

        {confirming ? (
          <div className="confirm" role="group" aria-label="Confirm delete">
            <p className="confirm-text">This erases every check-in, private note, and circle post on this phone. It can&apos;t be undone.</p>
            <div className="confirm-actions">
              <button type="button" className="btn btn-danger" onClick={erase}>
                Delete everything
              </button>
              <button type="button" className="btn btn-quiet" onClick={() => setConfirming(false)}>
                Keep my data
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-quiet btn-block btn-danger-text"
            onClick={() => {
              setCleared(false);
              setConfirming(true);
            }}
          >
            <Trash2 size={18} strokeWidth={1.75} aria-hidden="true" />
            Delete everything
          </button>
        )}
      </div>
      <p className="data-status" aria-live="polite">
        {cleared ? "Done. Everything Harbor saved on this phone is gone." : ""}
      </p>
    </section>
  );
}
