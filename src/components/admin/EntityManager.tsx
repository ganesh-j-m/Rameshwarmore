"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import type { EntityConfig } from "@/lib/admin/entities";
import { createEntity, updateEntity, deleteEntity, type CrudActionState } from "@/app/admin/actions/generic-crud";
import { Button } from "@/components/ui/button";
import { EntityFieldInput } from "@/components/admin/EntityFieldInput";
import { formatDate } from "@/lib/utils";

const initialState: CrudActionState = { status: "idle", message: "" };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="sm">
      {pending ? "Saving…" : label}
    </Button>
  );
}

function CreateForm({ config, onDone }: { config: EntityConfig; onDone: () => void }) {
  const boundAction = createEntity.bind(null, config.key);
  const [state, formAction] = useFormState(boundAction, initialState);

  if (state.status === "success") {
    // Auto-close and reset once the item is created.
    setTimeout(onDone, 400);
  }

  return (
    <form action={formAction} className="grid grid-cols-1 gap-4 rounded-md border border-line bg-paperDim p-5 sm:grid-cols-2">
      {config.fields.map((field) => (
        <div key={field.name} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
          <EntityFieldInput field={field} />
        </div>
      ))}
      <div className="flex items-center gap-3 sm:col-span-2">
        <SubmitButton label={`Add ${config.singularLabel}`} />
        <Button type="button" variant="ghost" size="sm" onClick={onDone}>
          Cancel
        </Button>
        {state.status === "error" && <p className="text-sm text-red-700">{state.message}</p>}
        {state.status === "success" && <p className="text-sm text-teal">{state.message}</p>}
      </div>
    </form>
  );
}

function EditRow({
  config,
  item,
}: {
  config: EntityConfig;
  item: Record<string, unknown>;
}) {
  const [editing, setEditing] = useState(false);
  const boundAction = updateEntity.bind(null, config.key, item.id as string);
  const [state, formAction] = useFormState(boundAction, initialState);

  return (
    <div className="border-b border-line py-4 last:border-0">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
          {config.listColumns.map((col) => {
            const value = item[col];
            const isDate = value instanceof Date;
            return (
              <span key={col} className="text-inkSoft">
                <span className="text-ink">{isDate ? formatDate(value as Date) : String(value ?? "—")}</span>
              </span>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditing((v) => !v)}
            className="rounded-sm p-1.5 text-inkSoft hover:bg-paperDim hover:text-maroon"
            aria-label="Edit"
          >
            {editing ? <X size={16} /> : <Pencil size={16} />}
          </button>
          <form
            action={async () => {
              if (confirm(`Delete this ${config.singularLabel.toLowerCase()}? This cannot be undone.`)) {
                await deleteEntity(config.key, item.id as string);
              }
            }}
          >
            <button className="rounded-sm p-1.5 text-inkSoft hover:bg-red-50 hover:text-red-700" aria-label="Delete">
              <Trash2 size={16} />
            </button>
          </form>
        </div>
      </div>

      {editing && (
        <form action={formAction} className="mt-4 grid grid-cols-1 gap-4 rounded-md border border-line bg-paperDim p-5 sm:grid-cols-2">
          {config.fields.map((field) => (
            <div key={field.name} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
              <EntityFieldInput field={field} defaultValue={item[field.name]} />
            </div>
          ))}
          <div className="flex items-center gap-3 sm:col-span-2">
            <SubmitButton label="Save Changes" />
            {state.status === "error" && <p className="text-sm text-red-700">{state.message}</p>}
            {state.status === "success" && <p className="text-sm text-teal">{state.message}</p>}
          </div>
        </form>
      )}
    </div>
  );
}

export function EntityManager({
  config,
  items,
}: {
  config: EntityConfig;
  items: Record<string, unknown>[];
}) {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-inkSoft">{items.length} total</p>
        {!showCreate && (
          <Button size="sm" onClick={() => setShowCreate(true)}>
            <Plus size={16} /> Add {config.singularLabel}
          </Button>
        )}
      </div>

      {showCreate && (
        <div className="mt-4">
          <CreateForm config={config} onDone={() => setShowCreate(false)} />
        </div>
      )}

      <div className="mt-6 rounded-md border border-line bg-white px-5">
        {items.length === 0 ? (
          <p className="py-8 text-center text-sm text-inkSoft">
            Nothing here yet. Add the first {config.singularLabel.toLowerCase()} above.
          </p>
        ) : (
          items.map((item) => <EditRow key={item.id as string} config={config} item={item} />)
        )}
      </div>
    </div>
  );
}
