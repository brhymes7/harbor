"use client";

import { Download, Trash2 } from "lucide-react";
import { useState } from "react";
import { exportCheckIns, useCheckIns } from "@/lib/checkinStore";
import { clearAll } from "@/lib/localStore";

export function DataControls() {
  const checkIns = useCheckIns();
  const [confirming, setConfirming] = useState(false);
  const [cleared, setCleared] = useState(false);
  const count = checkIns?.length ?? 0;

  function download() {
    const blob = new Blob([exportCheckIns()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `harbor-check-ins-${new Date().toISOString().slice(0, 10)}.json`;
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
          : count === 0
            ? "No check-ins saved."
            : `${count} ${count === 1 ? "check-in" : "check-ins"}, plus any circle posts and reactions you made.`}
      </p>

      <div className="data-actions">
        <button type="button" className="btn btn-quiet btn-block" onClick={download} disabled={count === 0}>
          <Download size={18} strokeWidth={1.75} aria-hidden="true" />
          Download my check-ins
        </button>

        {confirming ? (
          <div className="confirm" role="group" aria-label="Confirm delete">
            <p className="confirm-text">This erases every check-in, streak day, and circle post on this phone. It can&apos;t be undone.</p>
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
