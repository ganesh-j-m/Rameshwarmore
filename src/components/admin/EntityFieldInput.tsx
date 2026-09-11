"use client";

import type { EntityField } from "@/lib/admin/entities";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

function toDateInputValue(value: unknown) {
  if (!value) return "";
  const d = new Date(value as string);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

export function EntityFieldInput({
  field,
  defaultValue,
}: {
  field: EntityField;
  defaultValue?: unknown;
}) {
  const name = field.name;

  if (field.type === "boolean") {
    return (
      <label className="flex items-center gap-2 py-2 text-sm text-ink">
        <input
          type="checkbox"
          name={name}
          defaultChecked={Boolean(defaultValue)}
          className="h-4 w-4 rounded border-line accent-maroon"
        />
        {field.label}
      </label>
    );
  }

  return (
    <div>
      <Label htmlFor={name}>
        {field.label}
        {field.required && <span className="text-maroon"> *</span>}
      </Label>
      {field.type === "textarea" ? (
        <Textarea
          id={name}
          name={name}
          required={field.required}
          defaultValue={(defaultValue as string) ?? ""}
        />
      ) : field.type === "select" ? (
        <Select id={name} name={name} required={field.required} defaultValue={(defaultValue as string) ?? ""}>
          <option value="" disabled>
            Select…
          </option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          id={name}
          name={name}
          type={field.type === "date" ? "date" : field.type === "number" ? "number" : field.type === "url" ? "url" : "text"}
          step={field.type === "number" ? "any" : undefined}
          required={field.required}
          defaultValue={field.type === "date" ? toDateInputValue(defaultValue) : ((defaultValue as string) ?? "")}
        />
      )}
      {field.helpText && <p className="mt-1 text-xs text-inkSoft">{field.helpText}</p>}
    </div>
  );
}
