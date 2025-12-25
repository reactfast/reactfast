import React from "react";
import { ReturnFieldsV2 } from "./returnFields";
import { evaluateCondition } from "./handlers/createFormHandler";

function getWidthClass(width, isMobileView) {
  if (isMobileView) return "w-full";
  switch (width) {
    case 25:
      return "w-full sm:w-1/4";
    case 50:
      return "w-full sm:w-1/2";
    case 75:
      return "w-full sm:w-3/4";
    case 100:
    default:
      return "w-full";
  }
}

function evalCondList(list, mode, formData) {
  const conds = Array.isArray(list) ? list : list ? [list] : [];
  if (conds.length === 0) return false;
  const match = (c) => evaluateCondition(formData?.[c.field], c.when, c.value);
  return mode === "all" ? conds.every(match) : conds.some(match);
}

function isHidden(field, formData) {
  const list = field?.conditions?.hiddenWhen;
  const mode = field?.conditions?.hiddenMode === "all" ? "all" : "any";
  return evalCondList(list, mode, formData);
}

function isReadOnly(field, formData) {
  const list =
    field?.conditions?.readOnlyWhen || field?.conditions?.disabledWhen;
  const mode = field?.conditions?.readOnlyMode === "all" ? "all" : "any";
  return evalCondList(list, mode, formData);
}

function buildAttributeOverrides(fields, rules, formData) {
  const nameToRule = Array.isArray(rules)
    ? rules.reduce((acc, r) => {
        if (r?.name) acc[r.name] = r;
        return acc;
      }, {})
    : {};

  const overrides = {};
  fields.forEach((f) => {
    const triggers = Array.isArray(f?.triggers) ? f.triggers : [];
    triggers.forEach((trg) => {
      const rule = nameToRule[trg?.rule];
      if (!rule) return;
      const conds = Array.isArray(trg.when)
        ? trg.when
        : trg.when
          ? [trg.when]
          : [];
      const mode = trg.mode === "all" ? "all" : "any";
      const active =
        conds.length === 0
          ? true
          : mode === "all"
            ? conds.every((c) =>
                evaluateCondition(formData?.[c.field], c.when, c.value)
              )
            : conds.some((c) =>
                evaluateCondition(formData?.[c.field], c.when, c.value)
              );
      if (!active) return;

      const effects = Array.isArray(rule.effects) ? rule.effects : [];
      effects.forEach((eff) => {
        const { targetField, prop = "value", value } = eff;
        if (!targetField || prop === "value") return; // values handled by createFormHandler
        overrides[targetField] = {
          ...(overrides[targetField] || {}),
          [prop]: value,
        };
      });
    });
  });
  return overrides;
}

export function Form({
  fields = [],
  onChange,
  theme,
  isMobileView = false,
  formData = {},
  rules = [],
}) {
  const attrOverrides = buildAttributeOverrides(fields, rules, formData);
  return (
    <div className="w-full">
      <div className="-mx-2 flex flex-wrap">
        {fields.map((field, index) => {
          const hidden =
            isHidden(field, formData) ||
            attrOverrides[field.name]?.hidden === true;
          const readOnly =
            field.readOnly ||
            isReadOnly(field, formData) ||
            attrOverrides[field.name]?.readOnly === true;
          const title =
            attrOverrides[field.name]?.title ??
            (field.label || field.title || field.name);
          return (
            <div
              key={field.name || index}
              className={`${getWidthClass(field.width || 100, isMobileView)} mb-4 px-2 ${hidden ? "hidden" : ""}`}
            >
              <ReturnFieldsV2
                onChange={onChange}
                value={formData[field.name] ?? field.default ?? ""}
                field={{
                  ...field,
                  title,
                  readOnly,
                }}
                theme={theme}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
