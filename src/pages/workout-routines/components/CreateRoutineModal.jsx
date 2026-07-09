import { useState } from "react";
import Button from "../../../components/ui/Button";

export default function CreateRoutineModal({
  open,
  onClose,
  onSave,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!open) return null;

  async function handleSave() {
    if (!name.trim()) {
      alert("Routine name is required.");
      return;
    }

    await onSave(name, description);

    setName("");
    setDescription("");

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-card w-full max-w-md rounded-2xl p-6 border border-border">

        <h2 className="text-2xl font-bold mb-6">
          Create Routine
        </h2>

        <div className="space-y-4">

          <input
            className="w-full p-3 rounded-lg bg-background border border-border"
            placeholder="Routine Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            rows={4}
            className="w-full p-3 rounded-lg bg-background border border-border"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
          >
            Save
          </Button>

        </div>

      </div>

    </div>
  );
}