import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../api";

export default function CreateJob() {
  const [taskName, setTaskName] = useState("");
  const [payload, setPayload] = useState("{}");
  const [payloadValid, setPayloadValid] = useState(true);
  const [priority, setPriority] = useState("Low");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      let parsedPayload;
      try {
        parsedPayload = JSON.parse(payload);
      } catch (err) {
        alert("Payload must be valid JSON");
        setLoading(false);
        return;
      }

      const res = await createJob({
        taskName,
        payload: parsedPayload,
        priority,
      });
      alert("Job created: " + res.data.jobId);
      navigate("/");
    } catch (err) {
      alert("Create failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  }

  function handlePayloadChange(e) {
    const v = e.target.value;
    setPayload(v);
    try {
      JSON.parse(v);
      setPayloadValid(true);
    } catch (err) {
      setPayloadValid(false);
    }
  }

  function formatPayload() {
    try {
      const parsed = JSON.parse(payload);
      const pretty = JSON.stringify(parsed, null, 2);
      setPayload(pretty);
      setPayloadValid(true);
    } catch (err) {
      alert("Cannot format: invalid JSON");
    }
  }

  const priorityPill =
    priority === "High"
      ? "bg-red-100 text-red-800"
      : priority === "Medium"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-green-100 text-green-800";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Create Job</h2>
          <p className="text-sm text-gray-500 mt-1">
            Define the task, set priority and pass a JSON payload.
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Tip: Use the <span className="font-medium">Format JSON</span> button
          for prettified payloads.
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md ring-1 ring-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Task Name <span className="text-red-500">*</span>
            </label>
            <input
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full border border-gray-200 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-shadow"
              placeholder="Send daily report"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <div className="flex items-center gap-2">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border border-gray-200 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-100 transition"
                aria-label="Priority"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${priorityPill}`}
              >
                {priority}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Payload (JSON)</label>
            <div className="flex items-center gap-2">
              {payloadValid ? (
                <div className="flex items-center text-green-600 text-sm">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Valid
                </div>
              ) : (
                <div className="flex items-center text-red-600 text-sm">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Invalid
                </div>
              )}
              <button
                type="button"
                onClick={formatPayload}
                className="text-sm px-2 py-1 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100"
              >
                Format JSON
              </button>
              <button
                type="button"
                onClick={() => setShowPreview((s) => !s)}
                className="text-sm px-2 py-1 bg-gray-50 border border-gray-200 rounded hover:bg-gray-100"
              >
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
            </div>
          </div>

          <textarea
            value={payload}
            onChange={handlePayloadChange}
            rows={8}
            className={`w-full border ${
              payloadValid ? "border-gray-200" : "border-red-300 bg-red-50"
            } p-3 rounded-md font-mono text-sm transition-colors`}
          />
          <p className="mt-2 text-xs text-gray-400">
            Provide a JSON object. Example:{" "}
            <span className="font-mono">{'{"key": "value"}'}</span>
          </p>
        </div>

        {showPreview && (
          <div className="mb-4 bg-gray-50 border border-gray-100 p-4 rounded">
            <div className="text-sm font-medium mb-2">JSON Preview</div>
            <pre className="text-xs overflow-auto max-h-60 p-2 bg-white border rounded text-gray-800 font-mono">
              {payload}
            </pre>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-indigo-600 to-indigo-500 text-white rounded-md shadow-sm hover:from-indigo-700 hover:to-indigo-600 disabled:opacity-60 transition"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Creating...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Job
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setTaskName("");
              setPayload("{}");
              setPriority("Low");
              setPayloadValid(true);
              setShowPreview(false);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard
                ?.writeText(payload)
                .then(() => alert("Payload copied"));
            }}
            className="ml-auto text-sm text-gray-500 px-3 py-2 rounded hover:bg-gray-50"
          >
            Copy Payload
          </button>
        </div>
      </form>
    </div>
  );
}
