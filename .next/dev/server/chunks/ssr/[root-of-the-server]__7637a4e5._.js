module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/components/AppShell.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "active": "AppShell-module__JCX2KW__active",
  "content": "AppShell-module__JCX2KW__content",
  "header": "AppShell-module__JCX2KW__header",
  "page": "AppShell-module__JCX2KW__page",
  "sidebar": "AppShell-module__JCX2KW__sidebar",
});
}),
"[project]/components/AppShell.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppShell",
    ()=>AppShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AppShell$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/AppShell.module.css [app-ssr] (css module)");
'use client';
;
;
;
;
const navItems = [
    [
        'Dashboard',
        '/dashboard'
    ],
    [
        'Customers',
        '/customers'
    ],
    [
        'Invoices',
        '/invoices'
    ],
    [
        'Payments',
        '/payments'
    ],
    [
        'Automations',
        '/automations'
    ],
    [
        'Templates',
        '/templates'
    ],
    [
        'Reports',
        '/reports'
    ],
    [
        'Settings',
        '/settings'
    ]
];
function AppShell({ title, children }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AppShell$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].page,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AppShell$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sidebar,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: "Get Paid Faster"
                    }, void 0, false, {
                        fileName: "[project]/components/AppShell.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Collections automation"
                    }, void 0, false, {
                        fileName: "[project]/components/AppShell.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        children: navItems.map(([label, href])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: href,
                                className: pathname === href ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AppShell$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].active : '',
                                children: label
                            }, href, false, {
                                fileName: "[project]/components/AppShell.tsx",
                                lineNumber: 28,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/AppShell.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AppShell.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AppShell$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].content,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AppShell$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].header,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/AppShell.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                children: "+ Create invoice"
                            }, void 0, false, {
                                fileName: "[project]/components/AppShell.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AppShell.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    children
                ]
            }, void 0, true, {
                fileName: "[project]/components/AppShell.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AppShell.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/invoices/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InvoicesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AppShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AppShell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function parseNum(v) {
    const n = Number(String(v ?? "").replace(",", "."));
    return Number.isFinite(n) ? n : 0;
}
function round2(n) {
    return Math.round(n * 100) / 100;
}
function money(n) {
    const val = Number.isFinite(n) ? n : 0;
    return `R ${val.toLocaleString("en-ZA", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}
function nowIso() {
    return new Date().toISOString();
}
function ymdToday() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}
function formatDate(isoLike) {
    if (!isoLike) return "—";
    const d = new Date(isoLike);
    if (Number.isNaN(d.getTime())) return String(isoLike);
    return d.toLocaleDateString("en-ZA", {
        year: "numeric",
        month: "short",
        day: "2-digit"
    });
}
function daysFromToday(dateStr) {
    if (!dateStr) return null;
    const today = new Date();
    const due = new Date(dateStr);
    if (Number.isNaN(due.getTime())) return null;
    const t0 = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const d0 = new Date(due.getFullYear(), due.getMonth(), due.getDate()).getTime();
    return Math.round((d0 - t0) / (1000 * 60 * 60 * 24));
}
function makeUuid() {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return crypto.randomUUID();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c)=>{
        const r = Math.random() * 16 | 0;
        const v = c === "x" ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
}
function makeInvoiceNumber(seedId) {
    // Fallback/local number to satisfy NOT NULL if trigger logic is conditional.
    // DB trigger may override this value.
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    const suffix = seedId.replace(/-/g, "").slice(0, 6).toUpperCase();
    return `INV-${yyyy}${mm}${dd}-${hh}${mi}${ss}-${suffix}`;
}
async function sha256Hex(input) {
    try {
        if (typeof crypto === "undefined" || !("subtle" in crypto) || !crypto.subtle) {
            return input;
        }
        const enc = new TextEncoder();
        const buf = await crypto.subtle.digest("SHA-256", enc.encode(input));
        return Array.from(new Uint8Array(buf)).map((b)=>b.toString(16).padStart(2, "0")).join("");
    } catch  {
        return input;
    }
}
function eMsg(e, fallback = "Something went wrong") {
    return e?.message || e?.error_description || e?.details || e?.hint || fallback;
}
function friendlyInvoiceItemsInsertError(err) {
    const raw = eMsg(err, "Invoice items insert failed.");
    const m = raw.toLowerCase();
    // This is the common trap with your current trigger setup:
    // invoice_items insert fires trigger -> trigger updates invoices -> invoices UPDATE blocked by RLS
    if (m.includes("row-level security") && m.includes("invoices")) {
        return "Invoice items insert failed because the invoice_items trigger recalculates the parent invoice totals, but your current RLS likely blocks UPDATE on invoices for this user/org. Check invoices UPDATE policy (trigger side-effect).";
    }
    return raw;
}
function analyzeDraft(opts) {
    const { items, customerId, dueDate, vatEnabled, vatRate, selectedCustomer } = opts;
    const lineErrors = [];
    const cleanItems = [];
    items.forEach((it, idx)=>{
        const description = it.description.trim();
        const quantity = parseNum(it.quantity);
        const unitPrice = round2(parseNum(it.unitPrice));
        const amount = round2(quantity * unitPrice);
        const lineNum = idx + 1;
        // Treat a row as untouched only if literally blank.
        const rowUntouched = !description && String(it.quantity ?? "").trim() === "" && String(it.unitPrice ?? "").trim() === "";
        if (rowUntouched) return;
        if (!description) lineErrors.push(`Item ${lineNum}: description is required.`);
        if (!(quantity > 0)) lineErrors.push(`Item ${lineNum}: quantity must be greater than 0.`);
        if (unitPrice < 0) lineErrors.push(`Item ${lineNum}: unit price cannot be negative.`);
        if (description && quantity > 0 && unitPrice >= 0) {
            cleanItems.push({
                description,
                quantity,
                unitPrice,
                amount
            });
        }
    });
    const formErrors = [];
    if (!customerId) formErrors.push("Customer is required.");
    if (!dueDate) formErrors.push("Due date is required.");
    const vatRateNum = parseNum(vatRate);
    if (vatEnabled && !(vatRateNum >= 0)) {
        formErrors.push("VAT rate must be 0 or greater.");
    }
    if (cleanItems.length === 0) {
        formErrors.push("At least one valid line item is required.");
    }
    const subtotal = round2(cleanItems.reduce((acc, it)=>acc + it.amount, 0));
    const vatAmount = vatEnabled ? round2(subtotal * (Math.max(0, vatRateNum) / 100)) : 0;
    const total = round2(subtotal + vatAmount);
    const canSaveDraft = formErrors.length === 0 && lineErrors.length === 0 && Number.isFinite(total) && total >= 0;
    // Save & send assumes SMS queue path (requires phone)
    const canSaveSend = canSaveDraft && !!selectedCustomer?.phone;
    const sendBlockedReasons = [
        ...formErrors,
        ...lineErrors
    ];
    if (canSaveDraft && !selectedCustomer?.phone) {
        sendBlockedReasons.push("Selected customer needs a phone number to send via SMS.");
    }
    return {
        cleanItems,
        subtotal,
        vatAmount,
        total,
        formErrors,
        lineErrors,
        allErrors: [
            ...formErrors,
            ...lineErrors
        ],
        canSaveDraft,
        canSaveSend,
        sendBlockedReasons
    };
}
function pageCard(extra) {
    return {
        borderRadius: 22,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%), rgba(8,10,14,0.72)",
        boxShadow: "0 18px 40px rgba(0,0,0,0.24)",
        backdropFilter: "blur(10px)",
        ...extra
    };
}
function sectionCard(extra) {
    return {
        padding: "1rem",
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)",
        ...extra
    };
}
function fieldWrapStyle(hasError = false) {
    return {
        display: "grid",
        gap: 6,
        padding: "0.65rem",
        borderRadius: 12,
        border: hasError ? "1px solid rgba(239,68,68,0.45)" : "1px solid rgba(255,255,255,0.08)",
        background: hasError ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.02)"
    };
}
function statusBadgeStyle(status) {
    const s = String(status || "").toUpperCase();
    const base = {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "0.28rem 0.65rem",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.04)",
        color: "rgba(255,255,255,0.95)",
        whiteSpace: "nowrap",
        letterSpacing: "0.02em"
    };
    if (s === "PAID") {
        return {
            ...base,
            background: "rgba(34,197,94,0.16)",
            border: "1px solid rgba(34,197,94,0.38)"
        };
    }
    if (s === "OVERDUE") {
        return {
            ...base,
            background: "rgba(239,68,68,0.15)",
            border: "1px solid rgba(239,68,68,0.38)"
        };
    }
    if (s === "SENT" || s === "PARTIALLY_PAID") {
        return {
            ...base,
            background: "rgba(245,158,11,0.16)",
            border: "1px solid rgba(245,158,11,0.38)"
        };
    }
    if (s === "DRAFT") {
        return {
            ...base,
            background: "rgba(148,163,184,0.14)",
            border: "1px solid rgba(148,163,184,0.32)"
        };
    }
    if (s === "DISPUTED") {
        return {
            ...base,
            background: "rgba(244,63,94,0.16)",
            border: "1px solid rgba(244,63,94,0.34)"
        };
    }
    return base;
}
function InvoicesPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const url = ("TURBOPACK compile-time value", "https://xbsodggojfimbqqvgtve.supabase.co");
        const key = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhic29kZ2dvamZpbWJxcXZndHZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNzEwMDMsImV4cCI6MjA4Njc0NzAwM30.CKSrbL-ZyAXWAvZwa4gNTKVjI-3IaMNptXZvhkVppQE");
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(url, key);
    }, []);
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [info, setInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadingPage, setLoadingPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [customers, setCustomers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [recent, setRecent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showBuilder, setShowBuilder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [customerSearch, setCustomerSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [customerId, setCustomerId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [dueDate, setDueDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [vatEnabled, setVatEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [vatRate, setVatRate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("15");
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        {
            description: "",
            quantity: "1",
            unitPrice: "0"
        }
    ]);
    const currency = "ZAR";
    const requireSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (!data.session) {
            router.push("/auth/signin");
            throw new Error("No active session.");
        }
        return data.session;
    }, [
        router,
        supabase
    ]);
    const resolveActiveOrgIdStrict = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        const stored = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
        const memRes = await supabase.from("org_memberships").select("org_id").limit(200);
        if (memRes.error) throw memRes.error;
        const memberships = memRes.data ?? [];
        if (memberships.length === 0) {
            throw new Error("No organization membership found for this user.");
        }
        const validSet = new Set(memberships.map((m)=>String(m.org_id)));
        const resolved = stored && validSet.has(stored) ? "TURBOPACK unreachable" : String(memberships[0].org_id);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return resolved;
    }, [
        supabase
    ]);
    const filteredCustomers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const s = customerSearch.trim().toLowerCase();
        if (!s) return customers;
        return customers.filter((c)=>{
            return c.name.toLowerCase().includes(s) || (c.phone ?? "").toLowerCase().includes(s) || (c.email ?? "").toLowerCase().includes(s);
        });
    }, [
        customerSearch,
        customers
    ]);
    const selectedCustomer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>customers.find((c)=>c.id === customerId) ?? null, [
        customers,
        customerId
    ]);
    const draftAnalysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>analyzeDraft({
            items,
            customerId,
            dueDate,
            vatEnabled,
            vatRate,
            selectedCustomer
        }), [
        items,
        customerId,
        dueDate,
        vatEnabled,
        vatRate,
        selectedCustomer
    ]);
    const metrics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return {
            customers: customers.length,
            drafts: recent.filter((r)=>String(r.status).toUpperCase() === "DRAFT").length,
            sentActive: recent.filter((r)=>[
                    "SENT",
                    "PARTIALLY_PAID",
                    "OVERDUE"
                ].includes(String(r.status).toUpperCase())).length,
            outstandingValue: recent.reduce((acc, r)=>acc + Number(r.balance ?? 0), 0),
            disputes: recent.reduce((acc, r)=>acc + Number(r.disputeCount ?? 0), 0)
        };
    }, [
        customers.length,
        recent
    ]);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        setErr(null);
        setInfo(null);
        setLoadingPage(true);
        try {
            await requireSession();
            const orgId = await resolveActiveOrgIdStrict();
            const [cRes, iRes] = await Promise.all([
                supabase.from("customers").select("id,name,phone,email,preferred_channel").eq("org_id", orgId).order("created_at", {
                    ascending: false
                }).limit(500),
                supabase.from("invoices").select("id,invoice_number,status,due_date,total,balance,created_at").eq("org_id", orgId).order("created_at", {
                    ascending: false
                }).limit(50)
            ]);
            if (cRes.error) throw cRes.error;
            if (iRes.error) throw iRes.error;
            const safeCustomers = (cRes.data ?? []).map((r)=>({
                    id: String(r.id),
                    name: String(r.name ?? ""),
                    phone: r.phone ?? null,
                    email: r.email ?? null,
                    preferred_channel: r.preferred_channel ?? null
                }));
            let safeInvoices = (iRes.data ?? []).map((r)=>({
                    id: String(r.id),
                    invoice_number: String(r.invoice_number ?? ""),
                    status: String(r.status ?? "DRAFT"),
                    due_date: r.due_date ?? null,
                    total: r.total == null ? null : Number(r.total),
                    balance: r.balance == null ? null : Number(r.balance),
                    created_at: String(r.created_at ?? nowIso()),
                    disputeCount: 0
                }));
            // Optional enrichment only. Never block page.
            try {
                if (safeInvoices.length > 0) {
                    const dRes = await supabase.from("invoice_disputes").select("invoice_id").in("invoice_id", safeInvoices.map((i)=>i.id));
                    if (!dRes.error && dRes.data) {
                        const counts = new Map();
                        for (const row of dRes.data){
                            const id = String(row.invoice_id);
                            counts.set(id, (counts.get(id) ?? 0) + 1);
                        }
                        safeInvoices = safeInvoices.map((inv)=>({
                                ...inv,
                                disputeCount: counts.get(inv.id) ?? 0
                            }));
                    }
                }
            } catch  {
            // ignore optional dispute enrichment
            }
            setCustomers(safeCustomers);
            setRecent(safeInvoices);
        } catch (e) {
            setErr(eMsg(e, "Failed to load invoices page."));
        } finally{
            setLoadingPage(false);
        }
    }, [
        requireSession,
        resolveActiveOrgIdStrict,
        supabase
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        load();
    }, [
        load
    ]);
    function openBuilder() {
        setErr(null);
        setInfo(null);
        setShowBuilder(true);
        if (!dueDate) setDueDate(ymdToday());
    }
    function closeBuilder() {
        setShowBuilder(false);
    }
    function resetBuilder() {
        setCustomerSearch("");
        setCustomerId("");
        setDueDate("");
        setVatEnabled(false);
        setVatRate("15");
        setItems([
            {
                description: "",
                quantity: "1",
                unitPrice: "0"
            }
        ]);
        setShowBuilder(false);
        setErr(null);
    }
    function addItemRow() {
        setItems((prev)=>[
                ...prev,
                {
                    description: "",
                    quantity: "1",
                    unitPrice: "0"
                }
            ]);
    }
    function removeItemRow(idx) {
        setItems((prev)=>{
            const next = prev.filter((_, i)=>i !== idx);
            return next.length > 0 ? next : [
                {
                    description: "",
                    quantity: "1",
                    unitPrice: "0"
                }
            ];
        });
    }
    function updateItem(idx, patch) {
        setItems((prev)=>prev.map((it, i)=>i === idx ? {
                    ...it,
                    ...patch
                } : it));
    }
    async function queueInvoiceSentSms(opts) {
        const { orgId, invoiceId, customerId, invoiceNumber, actorUserId = null } = opts;
        const custRes = await supabase.from("customers").select("phone,opted_out,do_not_contact,consent").eq("org_id", orgId).eq("id", customerId).single();
        if (custRes.error) throw custRes.error;
        const c = custRes.data;
        if (!c?.phone) throw new Error("Customer has no phone number (required for SMS).");
        if (c.opted_out || c.do_not_contact || c.consent === false) {
            throw new Error("Customer is not contactable (opted-out / do-not-contact / no consent).");
        }
        const smsTplRes = await supabase.from("message_templates").select("id").eq("org_id", orgId).eq("channel", "SMS").eq("name", "Invoice Sent").limit(1).maybeSingle();
        if (smsTplRes.error) throw smsTplRes.error;
        let templateId = smsTplRes.data?.id;
        if (!templateId) {
            const waTplRes = await supabase.from("message_templates").select("id").eq("org_id", orgId).eq("channel", "WHATSAPP").eq("name", "Invoice Sent").limit(1).maybeSingle();
            if (waTplRes.error) throw waTplRes.error;
            templateId = waTplRes.data?.id;
        }
        if (!templateId) {
            throw new Error("No 'Invoice Sent' template found. Run seed_org_defaults().");
        }
        const messageKey = await sha256Hex(`${orgId}:${invoiceId}:INVOICE_SENT`);
        const ins = await supabase.from("message_log").insert({
            org_id: orgId,
            customer_id: customerId,
            invoice_id: invoiceId,
            rule_id: null,
            template_id: templateId,
            channel: "SMS",
            status: "QUEUED",
            message_key: messageKey,
            scheduled_for: nowIso()
        });
        if (ins.error && ins.error.code !== "23505") throw ins.error;
        // Optional event - ignore failures
        try {
            await supabase.from("events").insert({
                org_id: orgId,
                actor_user_id: actorUserId,
                event_type: "invoice_sms_queued",
                entity_type: "invoice",
                entity_id: invoiceId,
                meta: {
                    invoice_number: invoiceNumber,
                    channel: "SMS"
                }
            });
        } catch  {
        // ignore
        }
    }
    // IMPORTANT: invoice_items schema does NOT include org_id
    async function insertInvoiceItemsSafe(params) {
        const { invoiceId, items } = params;
        const rows = items.map((it, idx)=>({
                invoice_id: invoiceId,
                description: it.description,
                quantity: it.quantity,
                unit_price: it.unitPrice,
                amount: it.amount,
                sort_order: idx
            }));
        const res = await supabase.from("invoice_items").insert(rows);
        if (res.error) throw res.error;
    }
    async function saveInvoice(mode) {
        setErr(null);
        setInfo(null);
        if (mode === "DRAFT" && !draftAnalysis.canSaveDraft) {
            setErr(draftAnalysis.allErrors[0] ?? "Please complete the required fields.");
            return;
        }
        if (mode === "SENT" && !draftAnalysis.canSaveSend) {
            setErr(draftAnalysis.sendBlockedReasons[0] ?? "Please complete required fields before sending.");
            return;
        }
        setSaving(true);
        try {
            const session = await requireSession();
            const orgId = await resolveActiveOrgIdStrict();
            const invoiceId = makeUuid();
            const localInvoiceNumber = makeInvoiceNumber(invoiceId);
            // Keep explicit values aligned with your schema.
            const invoicePayload = {
                id: invoiceId,
                org_id: orgId,
                customer_id: customerId,
                invoice_number: localInvoiceNumber,
                status: mode,
                issue_date: ymdToday(),
                due_date: dueDate || null,
                sent_at: mode === "SENT" ? nowIso() : null,
                currency,
                subtotal: draftAnalysis.subtotal,
                vat: draftAnalysis.vatAmount,
                total: draftAnalysis.total,
                balance: draftAnalysis.total,
                created_by: session.user.id
            };
            const invInsert = await supabase.from("invoices").insert(invoicePayload);
            if (invInsert.error) {
                throw new Error(`Invoice insert failed: ${invInsert.error.message}`);
            }
            // Insert children (invoice_items) - no org_id column in your schema
            try {
                await insertInvoiceItemsSafe({
                    invoiceId,
                    items: draftAnalysis.cleanItems
                });
            } catch (itemErr) {
                // Best-effort rollback to avoid orphan parent rows
                await supabase.from("invoices").delete().eq("org_id", orgId).eq("id", invoiceId);
                throw new Error(`Invoice items insert failed: ${friendlyInvoiceItemsInsertError(itemErr)}`);
            }
            // Read final invoice_number (trigger may have replaced it)
            let finalInvoiceNumber = localInvoiceNumber;
            try {
                const invRead = await supabase.from("invoices").select("invoice_number").eq("org_id", orgId).eq("id", invoiceId).maybeSingle();
                if (!invRead.error && invRead.data?.invoice_number) {
                    finalInvoiceNumber = String(invRead.data.invoice_number);
                }
            } catch  {
            // non-fatal
            }
            // Optional event
            try {
                await supabase.from("events").insert({
                    org_id: orgId,
                    actor_user_id: session.user.id,
                    event_type: mode === "SENT" ? "invoice_sent" : "invoice_draft_created",
                    entity_type: "invoice",
                    entity_id: invoiceId,
                    meta: {
                        invoice_number: finalInvoiceNumber,
                        customer_id: customerId,
                        subtotal: draftAnalysis.subtotal,
                        vat: draftAnalysis.vatAmount,
                        total: draftAnalysis.total,
                        source: "invoices_page_rewrite_v3"
                    }
                });
            } catch (eventErr) {
                console.warn("[InvoicesPage] event insert failed", eventErr);
            }
            if (mode === "SENT") {
                try {
                    await queueInvoiceSentSms({
                        orgId,
                        invoiceId,
                        customerId,
                        invoiceNumber: finalInvoiceNumber,
                        actorUserId: session.user.id
                    });
                    setInfo(`Invoice sent successfully: ${finalInvoiceNumber} (SMS queued).`);
                } catch (smsErr) {
                    setInfo(`Invoice ${finalInvoiceNumber} saved, but SMS queue failed: ${eMsg(smsErr)}`);
                }
            } else {
                setInfo(`Draft saved successfully: ${finalInvoiceNumber}`);
            }
            await load();
            resetBuilder();
        } catch (e) {
            console.error("[InvoicesPage.saveInvoice] FAILED", e);
            setErr(eMsg(e, "Failed to save invoice."));
        } finally{
            setSaving(false);
        }
    }
    function onBuilderSubmit(e) {
        // Prevent accidental Enter-key submit from bypassing explicit buttons.
        e.preventDefault();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AppShell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AppShell"], {
        title: "Invoices",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: pageCard({
                    padding: "1rem",
                    borderRadius: 22,
                    overflow: "hidden"
                }),
                className: "jsx-41c1b1b68a453676" + " " + "panel",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: sectionCard({
                            background: "radial-gradient(circle at top right, rgba(59,130,246,0.15), transparent 45%), radial-gradient(circle at top left, rgba(168,85,247,0.12), transparent 45%), rgba(255,255,255,0.02)"
                        }),
                        className: "jsx-41c1b1b68a453676",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                gap: "1rem",
                                flexWrap: "wrap"
                            },
                            className: "jsx-41c1b1b68a453676",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        minWidth: 260
                                    },
                                    className: "jsx-41c1b1b68a453676",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: {
                                                margin: 0,
                                                fontSize: 22,
                                                lineHeight: 1.1
                                            },
                                            className: "jsx-41c1b1b68a453676",
                                            children: "Invoices"
                                        }, void 0, false, {
                                            fileName: "[project]/app/invoices/page.tsx",
                                            lineNumber: 855,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                margin: "0.45rem 0 0",
                                                opacity: 0.82,
                                                maxWidth: 760
                                            },
                                            className: "jsx-41c1b1b68a453676",
                                            children: [
                                                "Create and send invoices with tenant-safe writes to ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                    className: "jsx-41c1b1b68a453676",
                                                    children: "invoices"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/invoices/page.tsx",
                                                    lineNumber: 857,
                                                    columnNumber: 69
                                                }, this),
                                                " and",
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                    className: "jsx-41c1b1b68a453676",
                                                    children: "invoice_items"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/invoices/page.tsx",
                                                    lineNumber: 858,
                                                    columnNumber: 17
                                                }, this),
                                                ". This page does ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                    className: "jsx-41c1b1b68a453676",
                                                    children: "not"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/invoices/page.tsx",
                                                    lineNumber: 858,
                                                    columnNumber: 60
                                                }, this),
                                                " create",
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                    className: "jsx-41c1b1b68a453676",
                                                    children: "invoice_disputes"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/invoices/page.tsx",
                                                    lineNumber: 859,
                                                    columnNumber: 17
                                                }, this),
                                                " during invoice creation."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/invoices/page.tsx",
                                            lineNumber: 856,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/invoices/page.tsx",
                                    lineNumber: 854,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        gap: "0.55rem",
                                        flexWrap: "wrap"
                                    },
                                    className: "jsx-41c1b1b68a453676",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: load,
                                            disabled: loadingPage || saving,
                                            className: "jsx-41c1b1b68a453676" + " " + "btn",
                                            children: loadingPage ? "Refreshing..." : "Refresh"
                                        }, void 0, false, {
                                            fileName: "[project]/app/invoices/page.tsx",
                                            lineNumber: 864,
                                            columnNumber: 15
                                        }, this),
                                        !showBuilder ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: openBuilder,
                                            disabled: loadingPage,
                                            className: "jsx-41c1b1b68a453676" + " " + "btn primary",
                                            children: "Create invoice"
                                        }, void 0, false, {
                                            fileName: "[project]/app/invoices/page.tsx",
                                            lineNumber: 869,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: closeBuilder,
                                            disabled: saving,
                                            className: "jsx-41c1b1b68a453676" + " " + "btn",
                                            children: "Close builder"
                                        }, void 0, false, {
                                            fileName: "[project]/app/invoices/page.tsx",
                                            lineNumber: 873,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/invoices/page.tsx",
                                    lineNumber: 863,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/invoices/page.tsx",
                            lineNumber: 845,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/invoices/page.tsx",
                        lineNumber: 839,
                        columnNumber: 9
                    }, this),
                    err ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: sectionCard({
                            marginTop: "0.9rem",
                            border: "1px solid rgba(239,68,68,0.34)",
                            background: "rgba(239,68,68,0.08)"
                        }),
                        className: "jsx-41c1b1b68a453676",
                        children: err
                    }, void 0, false, {
                        fileName: "[project]/app/invoices/page.tsx",
                        lineNumber: 883,
                        columnNumber: 11
                    }, this) : null,
                    info ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: sectionCard({
                            marginTop: "0.9rem",
                            border: "1px solid rgba(59,130,246,0.28)",
                            background: "rgba(59,130,246,0.07)"
                        }),
                        className: "jsx-41c1b1b68a453676",
                        children: info
                    }, void 0, false, {
                        fileName: "[project]/app/invoices/page.tsx",
                        lineNumber: 895,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: "1rem",
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                            gap: "0.75rem"
                        },
                        className: "jsx-41c1b1b68a453676",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: sectionCard(),
                                className: "jsx-41c1b1b68a453676",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 12,
                                            opacity: 0.74
                                        },
                                        className: "jsx-41c1b1b68a453676",
                                        children: "Clients"
                                    }, void 0, false, {
                                        fileName: "[project]/app/invoices/page.tsx",
                                        lineNumber: 916,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 24,
                                            fontWeight: 800,
                                            marginTop: 4
                                        },
                                        className: "jsx-41c1b1b68a453676",
                                        children: metrics.customers
                                    }, void 0, false, {
                                        fileName: "[project]/app/invoices/page.tsx",
                                        lineNumber: 917,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/invoices/page.tsx",
                                lineNumber: 915,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: sectionCard(),
                                className: "jsx-41c1b1b68a453676",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 12,
                                            opacity: 0.74
                                        },
                                        className: "jsx-41c1b1b68a453676",
                                        children: "Draft invoices"
                                    }, void 0, false, {
                                        fileName: "[project]/app/invoices/page.tsx",
                                        lineNumber: 921,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 24,
                                            fontWeight: 800,
                                            marginTop: 4
                                        },
                                        className: "jsx-41c1b1b68a453676",
                                        children: metrics.drafts
                                    }, void 0, false, {
                                        fileName: "[project]/app/invoices/page.tsx",
                                        lineNumber: 922,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/invoices/page.tsx",
                                lineNumber: 920,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: sectionCard(),
                                className: "jsx-41c1b1b68a453676",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 12,
                                            opacity: 0.74
                                        },
                                        className: "jsx-41c1b1b68a453676",
                                        children: "Sent / active"
                                    }, void 0, false, {
                                        fileName: "[project]/app/invoices/page.tsx",
                                        lineNumber: 926,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 24,
                                            fontWeight: 800,
                                            marginTop: 4
                                        },
                                        className: "jsx-41c1b1b68a453676",
                                        children: metrics.sentActive
                                    }, void 0, false, {
                                        fileName: "[project]/app/invoices/page.tsx",
                                        lineNumber: 927,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/invoices/page.tsx",
                                lineNumber: 925,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: sectionCard(),
                                className: "jsx-41c1b1b68a453676",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 12,
                                            opacity: 0.74
                                        },
                                        className: "jsx-41c1b1b68a453676",
                                        children: "Outstanding (recent)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/invoices/page.tsx",
                                        lineNumber: 931,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 18,
                                            fontWeight: 800,
                                            marginTop: 4
                                        },
                                        className: "jsx-41c1b1b68a453676",
                                        children: money(metrics.outstandingValue)
                                    }, void 0, false, {
                                        fileName: "[project]/app/invoices/page.tsx",
                                        lineNumber: 932,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/invoices/page.tsx",
                                lineNumber: 930,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: sectionCard(),
                                className: "jsx-41c1b1b68a453676",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 12,
                                            opacity: 0.74
                                        },
                                        className: "jsx-41c1b1b68a453676",
                                        children: "Disputes (recent)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/invoices/page.tsx",
                                        lineNumber: 938,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 24,
                                            fontWeight: 800,
                                            marginTop: 4
                                        },
                                        className: "jsx-41c1b1b68a453676",
                                        children: metrics.disputes
                                    }, void 0, false, {
                                        fileName: "[project]/app/invoices/page.tsx",
                                        lineNumber: 939,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/invoices/page.tsx",
                                lineNumber: 937,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/invoices/page.tsx",
                        lineNumber: 907,
                        columnNumber: 9
                    }, this),
                    showBuilder && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: onBuilderSubmit,
                        style: {
                            marginTop: "1rem",
                            display: "grid",
                            gap: "0.9rem"
                        },
                        className: "jsx-41c1b1b68a453676",
                        children: [
                            draftAnalysis.allErrors.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: sectionCard({
                                    border: "1px solid rgba(245,158,11,0.34)",
                                    background: "rgba(245,158,11,0.07)"
                                }),
                                className: "jsx-41c1b1b68a453676",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontWeight: 700,
                                            marginBottom: 8
                                        },
                                        className: "jsx-41c1b1b68a453676",
                                        children: "Complete required fields before saving"
                                    }, void 0, false, {
                                        fileName: "[project]/app/invoices/page.tsx",
                                        lineNumber: 953,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        style: {
                                            margin: 0,
                                            paddingLeft: "1rem",
                                            opacity: 0.92,
                                            display: "grid",
                                            gap: 4
                                        },
                                        className: "jsx-41c1b1b68a453676",
                                        children: draftAnalysis.allErrors.slice(0, 8).map((msg, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                style: {
                                                    fontSize: 13
                                                },
                                                className: "jsx-41c1b1b68a453676",
                                                children: msg
                                            }, idx, false, {
                                                fileName: "[project]/app/invoices/page.tsx",
                                                lineNumber: 966,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/invoices/page.tsx",
                                        lineNumber: 956,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/invoices/page.tsx",
                                lineNumber: 947,
                                columnNumber: 15
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-builder-grid": "true",
                                style: {
                                    display: "grid",
                                    gap: "0.9rem",
                                    gridTemplateColumns: "minmax(0, 1.55fr) minmax(0, 1fr)",
                                    alignItems: "start"
                                },
                                className: "jsx-41c1b1b68a453676",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "grid",
                                            gap: "0.9rem",
                                            minWidth: 0
                                        },
                                        className: "jsx-41c1b1b68a453676",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: sectionCard(),
                                                className: "jsx-41c1b1b68a453676",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            gap: 8,
                                                            flexWrap: "wrap"
                                                        },
                                                        className: "jsx-41c1b1b68a453676",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-41c1b1b68a453676",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        style: {
                                                                            margin: 0
                                                                        },
                                                                        className: "jsx-41c1b1b68a453676",
                                                                        children: "Invoice setup"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                        lineNumber: 997,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            opacity: 0.7,
                                                                            fontSize: 12,
                                                                            marginTop: 4
                                                                        },
                                                                        className: "jsx-41c1b1b68a453676",
                                                                        children: "Select a client, due date, and VAT settings"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                        lineNumber: 998,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                lineNumber: 996,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    opacity: 0.6,
                                                                    fontSize: 12
                                                                },
                                                                className: "jsx-41c1b1b68a453676",
                                                                children: "Step 1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                lineNumber: 1002,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/invoices/page.tsx",
                                                        lineNumber: 987,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            marginTop: "0.85rem",
                                                            display: "grid",
                                                            gap: "0.75rem"
                                                        },
                                                        className: "jsx-41c1b1b68a453676",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: fieldWrapStyle(false),
                                                                className: "jsx-41c1b1b68a453676",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        style: {
                                                                            fontSize: 12,
                                                                            opacity: 0.78
                                                                        },
                                                                        className: "jsx-41c1b1b68a453676",
                                                                        children: "Search clients"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                        lineNumber: 1007,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        value: customerSearch,
                                                                        onChange: (e)=>setCustomerSearch(e.target.value),
                                                                        placeholder: "Search by name / phone / email...",
                                                                        style: {
                                                                            width: "100%"
                                                                        },
                                                                        className: "jsx-41c1b1b68a453676"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                        lineNumber: 1008,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                lineNumber: 1006,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: fieldWrapStyle(!customerId),
                                                                className: "jsx-41c1b1b68a453676",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        style: {
                                                                            fontSize: 12,
                                                                            opacity: 0.78
                                                                        },
                                                                        className: "jsx-41c1b1b68a453676",
                                                                        children: [
                                                                            "Client * (",
                                                                            filteredCustomers.length,
                                                                            " shown / ",
                                                                            customers.length,
                                                                            " total)"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                        lineNumber: 1017,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        value: customerId,
                                                                        onChange: (e)=>setCustomerId(e.target.value),
                                                                        style: {
                                                                            width: "100%"
                                                                        },
                                                                        className: "jsx-41c1b1b68a453676",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "",
                                                                                className: "jsx-41c1b1b68a453676",
                                                                                children: "Select client..."
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                lineNumber: 1025,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            filteredCustomers.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: c.id,
                                                                                    className: "jsx-41c1b1b68a453676",
                                                                                    children: [
                                                                                        c.name,
                                                                                        c.phone ? ` • ${c.phone}` : "",
                                                                                        c.email ? ` • ${c.email}` : ""
                                                                                    ]
                                                                                }, c.id, true, {
                                                                                    fileName: "[project]/app/invoices/page.tsx",
                                                                                    lineNumber: 1027,
                                                                                    columnNumber: 27
                                                                                }, this))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                        lineNumber: 1020,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    !customerId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontSize: 12,
                                                                            color: "rgba(248,113,113,0.95)"
                                                                        },
                                                                        className: "jsx-41c1b1b68a453676",
                                                                        children: "Required"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                        lineNumber: 1035,
                                                                        columnNumber: 25
                                                                    }, this) : null
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                lineNumber: 1016,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: "grid",
                                                                    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                                                                    gap: "0.7rem"
                                                                },
                                                                className: "jsx-41c1b1b68a453676",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: fieldWrapStyle(!dueDate),
                                                                        className: "jsx-41c1b1b68a453676",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                style: {
                                                                                    fontSize: 12,
                                                                                    opacity: 0.78
                                                                                },
                                                                                className: "jsx-41c1b1b68a453676",
                                                                                children: "Due date *"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                lineNumber: 1047,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "date",
                                                                                value: dueDate,
                                                                                onChange: (e)=>setDueDate(e.target.value),
                                                                                style: {
                                                                                    width: "100%"
                                                                                },
                                                                                className: "jsx-41c1b1b68a453676"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                lineNumber: 1048,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            !dueDate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    fontSize: 12,
                                                                                    color: "rgba(248,113,113,0.95)"
                                                                                },
                                                                                className: "jsx-41c1b1b68a453676",
                                                                                children: "Required"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                lineNumber: 1055,
                                                                                columnNumber: 27
                                                                            }, this) : null
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                        lineNumber: 1046,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: fieldWrapStyle(false),
                                                                        className: "jsx-41c1b1b68a453676",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                style: {
                                                                                    fontSize: 12,
                                                                                    opacity: 0.78
                                                                                },
                                                                                className: "jsx-41c1b1b68a453676",
                                                                                children: "Currency"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                lineNumber: 1060,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                value: currency,
                                                                                readOnly: true,
                                                                                style: {
                                                                                    width: "100%"
                                                                                },
                                                                                className: "jsx-41c1b1b68a453676"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                lineNumber: 1061,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    fontSize: 12,
                                                                                    opacity: 0.62
                                                                                },
                                                                                className: "jsx-41c1b1b68a453676",
                                                                                children: "Fixed for now"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                lineNumber: 1062,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                        lineNumber: 1059,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: fieldWrapStyle(vatEnabled && parseNum(vatRate) < 0),
                                                                        className: "jsx-41c1b1b68a453676",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                style: {
                                                                                    fontSize: 12,
                                                                                    opacity: 0.78
                                                                                },
                                                                                className: "jsx-41c1b1b68a453676",
                                                                                children: "VAT rate (%)"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                lineNumber: 1066,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                value: vatRate,
                                                                                onChange: (e)=>setVatRate(e.target.value),
                                                                                disabled: !vatEnabled,
                                                                                placeholder: "15",
                                                                                style: {
                                                                                    width: "100%"
                                                                                },
                                                                                className: "jsx-41c1b1b68a453676"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                lineNumber: 1067,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    fontSize: 12,
                                                                                    opacity: vatEnabled ? 0.7 : 0.45
                                                                                },
                                                                                className: "jsx-41c1b1b68a453676",
                                                                                children: vatEnabled ? "Applied to subtotal" : "Disabled"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                lineNumber: 1074,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                        lineNumber: 1065,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                lineNumber: 1039,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: sectionCard({
                                                                    padding: "0.8rem",
                                                                    background: "rgba(255,255,255,0.02)"
                                                                }),
                                                                className: "jsx-41c1b1b68a453676",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        display: "flex",
                                                                        justifyContent: "space-between",
                                                                        alignItems: "center",
                                                                        gap: 8,
                                                                        flexWrap: "wrap"
                                                                    },
                                                                    className: "jsx-41c1b1b68a453676",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "jsx-41c1b1b68a453676",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    style: {
                                                                                        fontWeight: 700,
                                                                                        fontSize: 14
                                                                                    },
                                                                                    className: "jsx-41c1b1b68a453676",
                                                                                    children: "VAT"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/invoices/page.tsx",
                                                                                    lineNumber: 1096,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    style: {
                                                                                        opacity: 0.72,
                                                                                        fontSize: 12
                                                                                    },
                                                                                    className: "jsx-41c1b1b68a453676",
                                                                                    children: "Enable VAT on this invoice"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/invoices/page.tsx",
                                                                                    lineNumber: 1097,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/invoices/page.tsx",
                                                                            lineNumber: 1095,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            style: {
                                                                                display: "inline-flex",
                                                                                alignItems: "center",
                                                                                gap: 8,
                                                                                cursor: "pointer"
                                                                            },
                                                                            className: "jsx-41c1b1b68a453676",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "checkbox",
                                                                                    checked: vatEnabled,
                                                                                    onChange: (e)=>setVatEnabled(e.target.checked),
                                                                                    className: "jsx-41c1b1b68a453676"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/invoices/page.tsx",
                                                                                    lineNumber: 1108,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "jsx-41c1b1b68a453676",
                                                                                    children: vatEnabled ? "Enabled" : "Disabled"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/invoices/page.tsx",
                                                                                    lineNumber: 1113,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/invoices/page.tsx",
                                                                            lineNumber: 1100,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/invoices/page.tsx",
                                                                    lineNumber: 1086,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                lineNumber: 1080,
                                                                columnNumber: 21
                                                            }, this),
                                                            selectedCustomer ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: sectionCard({
                                                                    padding: "0.85rem",
                                                                    background: "radial-gradient(circle at top right, rgba(59,130,246,0.10), transparent 60%), rgba(255,255,255,0.02)"
                                                                }),
                                                                className: "jsx-41c1b1b68a453676",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontWeight: 700,
                                                                            marginBottom: 4
                                                                        },
                                                                        className: "jsx-41c1b1b68a453676",
                                                                        children: "Selected client"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                        lineNumber: 1126,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontSize: 13,
                                                                            fontWeight: 600
                                                                        },
                                                                        className: "jsx-41c1b1b68a453676",
                                                                        children: selectedCustomer.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                        lineNumber: 1127,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            opacity: 0.72,
                                                                            fontSize: 12,
                                                                            marginTop: 2
                                                                        },
                                                                        className: "jsx-41c1b1b68a453676",
                                                                        children: [
                                                                            selectedCustomer.phone || "No phone",
                                                                            " • ",
                                                                            selectedCustomer.email || "No email"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                        lineNumber: 1128,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            opacity: 0.72,
                                                                            fontSize: 12,
                                                                            marginTop: 2
                                                                        },
                                                                        className: "jsx-41c1b1b68a453676",
                                                                        children: [
                                                                            "Preferred channel: ",
                                                                            selectedCustomer.preferred_channel || "Not set"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                        lineNumber: 1131,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    !selectedCustomer.phone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            marginTop: 6,
                                                                            fontSize: 12,
                                                                            color: "rgba(251,191,36,0.95)"
                                                                        },
                                                                        className: "jsx-41c1b1b68a453676",
                                                                        children: "Save draft is allowed. “Save & send” is disabled until this client has a phone number."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                        lineNumber: 1135,
                                                                        columnNumber: 27
                                                                    }, this) : null
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                lineNumber: 1119,
                                                                columnNumber: 23
                                                            }, this) : null
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/invoices/page.tsx",
                                                        lineNumber: 1005,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/invoices/page.tsx",
                                                lineNumber: 986,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: sectionCard(),
                                                className: "jsx-41c1b1b68a453676",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            gap: 8,
                                                            flexWrap: "wrap"
                                                        },
                                                        className: "jsx-41c1b1b68a453676",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-41c1b1b68a453676",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        style: {
                                                                            margin: 0
                                                                        },
                                                                        className: "jsx-41c1b1b68a453676",
                                                                        children: "Line items"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                        lineNumber: 1162,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            opacity: 0.7,
                                                                            fontSize: 12,
                                                                            marginTop: 4
                                                                        },
                                                                        className: "jsx-41c1b1b68a453676",
                                                                        children: "Add services / products and pricing"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                        lineNumber: 1163,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                lineNumber: 1161,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: addItemRow,
                                                                className: "jsx-41c1b1b68a453676" + " " + "btn",
                                                                children: "+ Add item"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                lineNumber: 1168,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/invoices/page.tsx",
                                                        lineNumber: 1152,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            marginTop: "0.9rem",
                                                            display: "grid",
                                                            gap: "0.75rem"
                                                        },
                                                        className: "jsx-41c1b1b68a453676",
                                                        children: items.map((it, idx)=>{
                                                            const qty = parseNum(it.quantity);
                                                            const price = round2(parseNum(it.unitPrice));
                                                            const lineTotal = round2(qty * price);
                                                            const descMissing = it.description.trim().length === 0;
                                                            const qtyInvalid = !(qty > 0);
                                                            const priceInvalid = price < 0;
                                                            const hasUserInput = it.description.trim().length > 0 || String(it.quantity).trim() !== "" || String(it.unitPrice).trim() !== "";
                                                            const showErrors = hasUserInput || items.length === 1;
                                                            const hasErrors = showErrors && (descMissing || qtyInvalid || priceInvalid);
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: sectionCard({
                                                                    padding: "0.9rem",
                                                                    borderRadius: 14,
                                                                    border: hasErrors ? "1px solid rgba(239,68,68,0.28)" : "1px solid rgba(255,255,255,0.08)",
                                                                    background: hasErrors ? "rgba(239,68,68,0.04)" : "rgba(255,255,255,0.02)"
                                                                }),
                                                                className: "jsx-41c1b1b68a453676",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: "flex",
                                                                            justifyContent: "space-between",
                                                                            alignItems: "center",
                                                                            gap: "0.75rem",
                                                                            marginBottom: "0.7rem",
                                                                            flexWrap: "wrap"
                                                                        },
                                                                        className: "jsx-41c1b1b68a453676",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    fontWeight: 700
                                                                                },
                                                                                className: "jsx-41c1b1b68a453676",
                                                                                children: [
                                                                                    "Item #",
                                                                                    idx + 1
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                lineNumber: 1215,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            items.length > 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                onClick: ()=>removeItemRow(idx),
                                                                                className: "jsx-41c1b1b68a453676" + " " + "btn",
                                                                                children: "Remove"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                lineNumber: 1218,
                                                                                columnNumber: 31
                                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                style: {
                                                                                    opacity: 0.6,
                                                                                    fontSize: 12
                                                                                },
                                                                                className: "jsx-41c1b1b68a453676",
                                                                                children: "At least one item required"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                lineNumber: 1226,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                        lineNumber: 1205,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: "grid",
                                                                            gap: "0.65rem"
                                                                        },
                                                                        className: "jsx-41c1b1b68a453676",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: fieldWrapStyle(showErrors && descMissing),
                                                                                className: "jsx-41c1b1b68a453676",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                        style: {
                                                                                            fontSize: 12,
                                                                                            opacity: 0.78
                                                                                        },
                                                                                        className: "jsx-41c1b1b68a453676",
                                                                                        children: "Description *"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                                        lineNumber: 1234,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                        value: it.description,
                                                                                        onChange: (e)=>updateItem(idx, {
                                                                                                description: e.target.value
                                                                                            }),
                                                                                        placeholder: "e.g., Monthly cleaning — Feb 2026",
                                                                                        style: {
                                                                                            width: "100%"
                                                                                        },
                                                                                        className: "jsx-41c1b1b68a453676"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                                        lineNumber: 1235,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    showErrors && descMissing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        style: {
                                                                                            fontSize: 12,
                                                                                            color: "rgba(248,113,113,0.95)"
                                                                                        },
                                                                                        className: "jsx-41c1b1b68a453676",
                                                                                        children: "Required"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                                        lineNumber: 1242,
                                                                                        columnNumber: 33
                                                                                    }, this) : null
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                lineNumber: 1233,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    display: "grid",
                                                                                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                                                                                    gap: "0.6rem"
                                                                                },
                                                                                className: "jsx-41c1b1b68a453676",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        style: fieldWrapStyle(showErrors && qtyInvalid),
                                                                                        className: "jsx-41c1b1b68a453676",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                                style: {
                                                                                                    fontSize: 12,
                                                                                                    opacity: 0.78
                                                                                                },
                                                                                                className: "jsx-41c1b1b68a453676",
                                                                                                children: "Qty *"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                                lineNumber: 1256,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                                value: it.quantity,
                                                                                                onChange: (e)=>updateItem(idx, {
                                                                                                        quantity: e.target.value
                                                                                                    }),
                                                                                                placeholder: "1",
                                                                                                style: {
                                                                                                    width: "100%"
                                                                                                },
                                                                                                className: "jsx-41c1b1b68a453676"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                                lineNumber: 1257,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            showErrors && qtyInvalid ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                style: {
                                                                                                    fontSize: 12,
                                                                                                    color: "rgba(248,113,113,0.95)"
                                                                                                },
                                                                                                className: "jsx-41c1b1b68a453676",
                                                                                                children: "Must be > 0"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                                lineNumber: 1264,
                                                                                                columnNumber: 35
                                                                                            }, this) : null
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                                        lineNumber: 1255,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        style: fieldWrapStyle(showErrors && priceInvalid),
                                                                                        className: "jsx-41c1b1b68a453676",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                                style: {
                                                                                                    fontSize: 12,
                                                                                                    opacity: 0.78
                                                                                                },
                                                                                                className: "jsx-41c1b1b68a453676",
                                                                                                children: "Unit price *"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                                lineNumber: 1271,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                                value: it.unitPrice,
                                                                                                onChange: (e)=>updateItem(idx, {
                                                                                                        unitPrice: e.target.value
                                                                                                    }),
                                                                                                placeholder: "0",
                                                                                                style: {
                                                                                                    width: "100%"
                                                                                                },
                                                                                                className: "jsx-41c1b1b68a453676"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                                lineNumber: 1272,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            showErrors && priceInvalid ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                style: {
                                                                                                    fontSize: 12,
                                                                                                    color: "rgba(248,113,113,0.95)"
                                                                                                },
                                                                                                className: "jsx-41c1b1b68a453676",
                                                                                                children: "Cannot be negative"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                                lineNumber: 1279,
                                                                                                columnNumber: 35
                                                                                            }, this) : null
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                                        lineNumber: 1270,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        style: fieldWrapStyle(false),
                                                                                        className: "jsx-41c1b1b68a453676",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                                style: {
                                                                                                    fontSize: 12,
                                                                                                    opacity: 0.78
                                                                                                },
                                                                                                className: "jsx-41c1b1b68a453676",
                                                                                                children: "Line total"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                                lineNumber: 1286,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                                value: money(lineTotal),
                                                                                                readOnly: true,
                                                                                                style: {
                                                                                                    width: "100%"
                                                                                                },
                                                                                                className: "jsx-41c1b1b68a453676"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                                lineNumber: 1287,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                style: {
                                                                                                    fontSize: 12,
                                                                                                    opacity: 0.62
                                                                                                },
                                                                                                className: "jsx-41c1b1b68a453676",
                                                                                                children: "Auto-calculated"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                                lineNumber: 1288,
                                                                                                columnNumber: 33
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                                        lineNumber: 1285,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                lineNumber: 1248,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                        lineNumber: 1232,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, idx, true, {
                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                lineNumber: 1192,
                                                                columnNumber: 25
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/invoices/page.tsx",
                                                        lineNumber: 1173,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            marginTop: "0.75rem",
                                                            fontSize: 12,
                                                            opacity: 0.68
                                                        },
                                                        className: "jsx-41c1b1b68a453676",
                                                        children: [
                                                            "This page writes to ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                className: "jsx-41c1b1b68a453676",
                                                                children: "invoices"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                lineNumber: 1298,
                                                                columnNumber: 41
                                                            }, this),
                                                            " + ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                className: "jsx-41c1b1b68a453676",
                                                                children: "invoice_items"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                lineNumber: 1298,
                                                                columnNumber: 59
                                                            }, this),
                                                            ". It does ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                className: "jsx-41c1b1b68a453676",
                                                                children: "not"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                lineNumber: 1298,
                                                                columnNumber: 89
                                                            }, this),
                                                            " ",
                                                            "create ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                className: "jsx-41c1b1b68a453676",
                                                                children: "invoice_disputes"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                lineNumber: 1299,
                                                                columnNumber: 28
                                                            }, this),
                                                            " during invoice creation."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/invoices/page.tsx",
                                                        lineNumber: 1297,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/invoices/page.tsx",
                                                lineNumber: 1151,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/invoices/page.tsx",
                                        lineNumber: 984,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "grid",
                                            gap: "0.9rem",
                                            minWidth: 0
                                        },
                                        className: "jsx-41c1b1b68a453676",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            "data-summary-card": "true",
                                            style: sectionCard({
                                                position: "static",
                                                top: 12,
                                                background: "radial-gradient(circle at top right, rgba(16,185,129,0.10), transparent 55%), rgba(255,255,255,0.025)"
                                            }),
                                            className: "jsx-41c1b1b68a453676",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        gap: 8,
                                                        flexWrap: "wrap"
                                                    },
                                                    className: "jsx-41c1b1b68a453676",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-41c1b1b68a453676",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    style: {
                                                                        margin: 0
                                                                    },
                                                                    className: "jsx-41c1b1b68a453676",
                                                                    children: "Totals & actions"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/invoices/page.tsx",
                                                                    lineNumber: 1325,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        opacity: 0.7,
                                                                        fontSize: 12,
                                                                        marginTop: 4
                                                                    },
                                                                    className: "jsx-41c1b1b68a453676",
                                                                    children: "Review then save or send"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/invoices/page.tsx",
                                                                    lineNumber: 1326,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/invoices/page.tsx",
                                                            lineNumber: 1324,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                opacity: 0.6,
                                                                fontSize: 12
                                                            },
                                                            className: "jsx-41c1b1b68a453676",
                                                            children: "Step 2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/invoices/page.tsx",
                                                            lineNumber: 1330,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/invoices/page.tsx",
                                                    lineNumber: 1315,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        marginTop: "0.85rem",
                                                        display: "grid",
                                                        gap: "0.7rem"
                                                    },
                                                    className: "jsx-41c1b1b68a453676",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: sectionCard({
                                                                padding: "0.85rem"
                                                            }),
                                                            className: "jsx-41c1b1b68a453676",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: "grid",
                                                                    gap: "0.55rem"
                                                                },
                                                                className: "jsx-41c1b1b68a453676",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: "flex",
                                                                            justifyContent: "space-between",
                                                                            gap: 12
                                                                        },
                                                                        className: "jsx-41c1b1b68a453676",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                style: {
                                                                                    opacity: 0.82
                                                                                },
                                                                                className: "jsx-41c1b1b68a453676",
                                                                                children: "Subtotal"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                lineNumber: 1337,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                                className: "jsx-41c1b1b68a453676",
                                                                                children: money(draftAnalysis.subtotal)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                lineNumber: 1338,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                        lineNumber: 1336,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: "flex",
                                                                            justifyContent: "space-between",
                                                                            gap: 12
                                                                        },
                                                                        className: "jsx-41c1b1b68a453676",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                style: {
                                                                                    opacity: 0.82
                                                                                },
                                                                                className: "jsx-41c1b1b68a453676",
                                                                                children: [
                                                                                    "VAT ",
                                                                                    vatEnabled ? `(${Math.max(0, parseNum(vatRate))}%)` : ""
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                lineNumber: 1342,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                                className: "jsx-41c1b1b68a453676",
                                                                                children: money(draftAnalysis.vatAmount)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                lineNumber: 1345,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                        lineNumber: 1341,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: "flex",
                                                                            justifyContent: "space-between",
                                                                            gap: 12,
                                                                            marginTop: 4,
                                                                            paddingTop: 8,
                                                                            borderTop: "1px solid rgba(255,255,255,0.08)",
                                                                            fontSize: 16
                                                                        },
                                                                        className: "jsx-41c1b1b68a453676",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                style: {
                                                                                    fontWeight: 800
                                                                                },
                                                                                className: "jsx-41c1b1b68a453676",
                                                                                children: "Total"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                lineNumber: 1359,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                style: {
                                                                                    fontWeight: 800
                                                                                },
                                                                                className: "jsx-41c1b1b68a453676",
                                                                                children: money(draftAnalysis.total)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                                lineNumber: 1360,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/invoices/page.tsx",
                                                                        lineNumber: 1348,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                lineNumber: 1335,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/invoices/page.tsx",
                                                            lineNumber: 1334,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: sectionCard({
                                                                padding: "0.85rem"
                                                            }),
                                                            className: "jsx-41c1b1b68a453676",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontWeight: 700,
                                                                        marginBottom: 6
                                                                    },
                                                                    className: "jsx-41c1b1b68a453676",
                                                                    children: "Validation status"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/invoices/page.tsx",
                                                                    lineNumber: 1366,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        display: "grid",
                                                                        gap: 6,
                                                                        fontSize: 12
                                                                    },
                                                                    className: "jsx-41c1b1b68a453676",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "jsx-41c1b1b68a453676",
                                                                            children: [
                                                                                "Draft save:",
                                                                                " ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                                    style: {
                                                                                        color: draftAnalysis.canSaveDraft ? "rgba(74,222,128,0.95)" : "rgba(248,113,113,0.95)"
                                                                                    },
                                                                                    className: "jsx-41c1b1b68a453676",
                                                                                    children: draftAnalysis.canSaveDraft ? "Ready" : "Blocked"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/invoices/page.tsx",
                                                                                    lineNumber: 1371,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/invoices/page.tsx",
                                                                            lineNumber: 1369,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "jsx-41c1b1b68a453676",
                                                                            children: [
                                                                                "Send (SMS):",
                                                                                " ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                                    style: {
                                                                                        color: draftAnalysis.canSaveSend ? "rgba(74,222,128,0.95)" : "rgba(248,113,113,0.95)"
                                                                                    },
                                                                                    className: "jsx-41c1b1b68a453676",
                                                                                    children: draftAnalysis.canSaveSend ? "Ready" : "Blocked"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/invoices/page.tsx",
                                                                                    lineNumber: 1384,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/invoices/page.tsx",
                                                                            lineNumber: 1382,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        !draftAnalysis.canSaveSend && draftAnalysis.sendBlockedReasons.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                marginTop: 2,
                                                                                opacity: 0.78
                                                                            },
                                                                            className: "jsx-41c1b1b68a453676",
                                                                            children: draftAnalysis.sendBlockedReasons[0]
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/invoices/page.tsx",
                                                                            lineNumber: 1396,
                                                                            columnNumber: 27
                                                                        }, this) : null
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/invoices/page.tsx",
                                                                    lineNumber: 1368,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/invoices/page.tsx",
                                                            lineNumber: 1365,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: "grid",
                                                                gap: "0.65rem",
                                                                marginTop: 2
                                                            },
                                                            className: "jsx-41c1b1b68a453676",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>saveInvoice("SENT"),
                                                                    disabled: saving || !draftAnalysis.canSaveSend,
                                                                    title: !draftAnalysis.canSaveSend ? draftAnalysis.sendBlockedReasons[0] ?? "Complete required fields" : "",
                                                                    className: "jsx-41c1b1b68a453676" + " " + "btn primary",
                                                                    children: saving ? "Processing..." : "Save & send (SMS queued)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/invoices/page.tsx",
                                                                    lineNumber: 1404,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>saveInvoice("DRAFT"),
                                                                    disabled: saving || !draftAnalysis.canSaveDraft,
                                                                    title: !draftAnalysis.canSaveDraft ? draftAnalysis.allErrors[0] ?? "Complete required fields" : "",
                                                                    className: "jsx-41c1b1b68a453676" + " " + "btn",
                                                                    children: saving ? "Saving..." : "Save draft"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/invoices/page.tsx",
                                                                    lineNumber: 1418,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: resetBuilder,
                                                                    disabled: saving,
                                                                    className: "jsx-41c1b1b68a453676" + " " + "btn",
                                                                    children: "Cancel"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/invoices/page.tsx",
                                                                    lineNumber: 1432,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/invoices/page.tsx",
                                                            lineNumber: 1403,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: sectionCard({
                                                                padding: "0.85rem",
                                                                background: "rgba(255,255,255,0.02)"
                                                            }),
                                                            className: "jsx-41c1b1b68a453676",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontWeight: 700,
                                                                        marginBottom: 6,
                                                                        fontSize: 13
                                                                    },
                                                                    className: "jsx-41c1b1b68a453676",
                                                                    children: "DB write path"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/invoices/page.tsx",
                                                                    lineNumber: 1443,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        opacity: 0.76,
                                                                        fontSize: 12,
                                                                        lineHeight: 1.45
                                                                    },
                                                                    className: "jsx-41c1b1b68a453676",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                                            className: "jsx-41c1b1b68a453676",
                                                                            children: "invoices"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/invoices/page.tsx",
                                                                            lineNumber: 1447,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        " → ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                                            className: "jsx-41c1b1b68a453676",
                                                                            children: "invoice_items"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/invoices/page.tsx",
                                                                            lineNumber: 1447,
                                                                            columnNumber: 49
                                                                        }, this),
                                                                        " → optional ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                                            className: "jsx-41c1b1b68a453676",
                                                                            children: "events"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/invoices/page.tsx",
                                                                            lineNumber: 1447,
                                                                            columnNumber: 87
                                                                        }, this),
                                                                        " /",
                                                                        " ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                                            className: "jsx-41c1b1b68a453676",
                                                                            children: "message_log"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/invoices/page.tsx",
                                                                            lineNumber: 1448,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        ". If item insert fails with an RLS error mentioning",
                                                                        " ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                                            className: "jsx-41c1b1b68a453676",
                                                                            children: "invoices"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/invoices/page.tsx",
                                                                            lineNumber: 1449,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        ", the trigger that recalculates totals is likely blocked by missing ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                                            className: "jsx-41c1b1b68a453676",
                                                                            children: "UPDATE"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/invoices/page.tsx",
                                                                            lineNumber: 1450,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        " policy on ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                                            className: "jsx-41c1b1b68a453676",
                                                                            children: "invoices"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/invoices/page.tsx",
                                                                            lineNumber: 1450,
                                                                            columnNumber: 63
                                                                        }, this),
                                                                        "."
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/invoices/page.tsx",
                                                                    lineNumber: 1446,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/invoices/page.tsx",
                                                            lineNumber: 1437,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/invoices/page.tsx",
                                                    lineNumber: 1333,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/invoices/page.tsx",
                                            lineNumber: 1306,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/invoices/page.tsx",
                                        lineNumber: 1305,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/invoices/page.tsx",
                                lineNumber: 974,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/invoices/page.tsx",
                        lineNumber: 945,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: "1rem"
                        },
                        className: "jsx-41c1b1b68a453676",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: sectionCard({
                                    padding: "0.9rem 1rem",
                                    marginBottom: "0.8rem",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "0.75rem",
                                    flexWrap: "wrap"
                                }),
                                className: "jsx-41c1b1b68a453676",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-41c1b1b68a453676",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                style: {
                                                    margin: 0
                                                },
                                                className: "jsx-41c1b1b68a453676",
                                                children: "Recent invoices"
                                            }, void 0, false, {
                                                fileName: "[project]/app/invoices/page.tsx",
                                                lineNumber: 1474,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    opacity: 0.72,
                                                    fontSize: 12,
                                                    marginTop: 4
                                                },
                                                className: "jsx-41c1b1b68a453676",
                                                children: "Latest invoices for the active organization"
                                            }, void 0, false, {
                                                fileName: "[project]/app/invoices/page.tsx",
                                                lineNumber: 1475,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/invoices/page.tsx",
                                        lineNumber: 1473,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            opacity: 0.75,
                                            fontSize: 12
                                        },
                                        className: "jsx-41c1b1b68a453676",
                                        children: [
                                            "Showing ",
                                            recent.length,
                                            " invoice",
                                            recent.length === 1 ? "" : "s"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/invoices/page.tsx",
                                        lineNumber: 1480,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/invoices/page.tsx",
                                lineNumber: 1462,
                                columnNumber: 11
                            }, this),
                            loadingPage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: sectionCard({
                                    padding: "1rem"
                                }),
                                className: "jsx-41c1b1b68a453676",
                                children: "Loading invoices..."
                            }, void 0, false, {
                                fileName: "[project]/app/invoices/page.tsx",
                                lineNumber: 1486,
                                columnNumber: 13
                            }, this) : recent.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: sectionCard({
                                    padding: "1rem"
                                }),
                                className: "jsx-41c1b1b68a453676",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontWeight: 700
                                        },
                                        className: "jsx-41c1b1b68a453676",
                                        children: "No invoices yet"
                                    }, void 0, false, {
                                        fileName: "[project]/app/invoices/page.tsx",
                                        lineNumber: 1489,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            opacity: 0.75,
                                            marginTop: 4,
                                            fontSize: 13
                                        },
                                        className: "jsx-41c1b1b68a453676",
                                        children: "Create your first invoice to test tenant-safe inserts and line item writes."
                                    }, void 0, false, {
                                        fileName: "[project]/app/invoices/page.tsx",
                                        lineNumber: 1490,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/invoices/page.tsx",
                                lineNumber: 1488,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "grid",
                                    gap: "0.8rem",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"
                                },
                                className: "jsx-41c1b1b68a453676",
                                children: recent.map((i)=>{
                                    const diff = daysFromToday(i.due_date);
                                    const dueMeta = diff === null ? "No due date" : diff === 0 ? "Due today" : diff > 0 ? `Due in ${diff} day${diff === 1 ? "" : "s"}` : `${Math.abs(diff)} day${Math.abs(diff) === 1 ? "" : "s"} overdue`;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: sectionCard({
                                            padding: "0.95rem",
                                            background: "radial-gradient(circle at top right, rgba(99,102,241,0.08), transparent 60%), rgba(255,255,255,0.02)"
                                        }),
                                        className: "jsx-41c1b1b68a453676",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    gap: 8,
                                                    alignItems: "flex-start",
                                                    flexWrap: "wrap"
                                                },
                                                className: "jsx-41c1b1b68a453676",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-41c1b1b68a453676",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontWeight: 800,
                                                                    fontSize: 15
                                                                },
                                                                className: "jsx-41c1b1b68a453676",
                                                                children: i.invoice_number || "Invoice"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                lineNumber: 1532,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    opacity: 0.68,
                                                                    fontSize: 12,
                                                                    marginTop: 2
                                                                },
                                                                className: "jsx-41c1b1b68a453676",
                                                                children: [
                                                                    "Created ",
                                                                    formatDate(i.created_at)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                lineNumber: 1535,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/invoices/page.tsx",
                                                        lineNumber: 1531,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            gap: "0.45rem",
                                                            alignItems: "center",
                                                            flexWrap: "wrap"
                                                        },
                                                        className: "jsx-41c1b1b68a453676",
                                                        children: [
                                                            (i.disputeCount ?? 0) > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: statusBadgeStyle("DISPUTED"),
                                                                className: "jsx-41c1b1b68a453676",
                                                                children: [
                                                                    i.disputeCount,
                                                                    " dispute",
                                                                    i.disputeCount === 1 ? "" : "s"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                lineNumber: 1549,
                                                                columnNumber: 27
                                                            }, this) : null,
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: statusBadgeStyle(i.status),
                                                                className: "jsx-41c1b1b68a453676",
                                                                children: i.status
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/invoices/page.tsx",
                                                                lineNumber: 1553,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/invoices/page.tsx",
                                                        lineNumber: 1540,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/invoices/page.tsx",
                                                lineNumber: 1522,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: sectionCard({
                                                    marginTop: "0.75rem",
                                                    padding: "0.8rem",
                                                    borderRadius: 14
                                                }),
                                                className: "jsx-41c1b1b68a453676",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "grid",
                                                        gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
                                                        gap: "0.55rem"
                                                    },
                                                    className: "jsx-41c1b1b68a453676",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-41c1b1b68a453676",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        opacity: 0.68,
                                                                        fontSize: 12
                                                                    },
                                                                    className: "jsx-41c1b1b68a453676",
                                                                    children: "Total"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/invoices/page.tsx",
                                                                    lineNumber: 1572,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontWeight: 800
                                                                    },
                                                                    className: "jsx-41c1b1b68a453676",
                                                                    children: money(Number(i.total ?? 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/invoices/page.tsx",
                                                                    lineNumber: 1573,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/invoices/page.tsx",
                                                            lineNumber: 1571,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-41c1b1b68a453676",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        opacity: 0.68,
                                                                        fontSize: 12
                                                                    },
                                                                    className: "jsx-41c1b1b68a453676",
                                                                    children: "Balance"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/invoices/page.tsx",
                                                                    lineNumber: 1576,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontWeight: 800
                                                                    },
                                                                    className: "jsx-41c1b1b68a453676",
                                                                    children: money(Number(i.balance ?? 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/invoices/page.tsx",
                                                                    lineNumber: 1577,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/invoices/page.tsx",
                                                            lineNumber: 1575,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-41c1b1b68a453676",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        opacity: 0.68,
                                                                        fontSize: 12
                                                                    },
                                                                    className: "jsx-41c1b1b68a453676",
                                                                    children: "Due date"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/invoices/page.tsx",
                                                                    lineNumber: 1580,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontWeight: 700
                                                                    },
                                                                    className: "jsx-41c1b1b68a453676",
                                                                    children: formatDate(i.due_date)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/invoices/page.tsx",
                                                                    lineNumber: 1581,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/invoices/page.tsx",
                                                            lineNumber: 1579,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/invoices/page.tsx",
                                                    lineNumber: 1564,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/invoices/page.tsx",
                                                lineNumber: 1557,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    opacity: 0.72,
                                                    fontSize: 12,
                                                    marginTop: "0.65rem"
                                                },
                                                className: "jsx-41c1b1b68a453676",
                                                children: dueMeta
                                            }, void 0, false, {
                                                fileName: "[project]/app/invoices/page.tsx",
                                                lineNumber: 1586,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    gap: "0.5rem",
                                                    flexWrap: "wrap",
                                                    marginTop: "0.7rem"
                                                },
                                                className: "jsx-41c1b1b68a453676",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        disabled: true,
                                                        className: "jsx-41c1b1b68a453676" + " " + "btn",
                                                        children: "View"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/invoices/page.tsx",
                                                        lineNumber: 1598,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        disabled: true,
                                                        className: "jsx-41c1b1b68a453676" + " " + "btn",
                                                        children: "Edit"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/invoices/page.tsx",
                                                        lineNumber: 1601,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        disabled: true,
                                                        className: "jsx-41c1b1b68a453676" + " " + "btn",
                                                        children: "Resend"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/invoices/page.tsx",
                                                        lineNumber: 1604,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/invoices/page.tsx",
                                                lineNumber: 1590,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, i.id, true, {
                                        fileName: "[project]/app/invoices/page.tsx",
                                        lineNumber: 1514,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/invoices/page.tsx",
                                lineNumber: 1495,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/invoices/page.tsx",
                        lineNumber: 1461,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/invoices/page.tsx",
                lineNumber: 830,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "41c1b1b68a453676",
                children: "[data-builder-grid=true].jsx-41c1b1b68a453676,[data-builder-grid=true].jsx-41c1b1b68a453676>.jsx-41c1b1b68a453676{min-width:0}@media (width>=981px){[data-summary-card=true].jsx-41c1b1b68a453676{top:12px;position:sticky!important}}@media (width<=980px){[data-builder-grid=true].jsx-41c1b1b68a453676{grid-template-columns:1fr!important}}@media (width<=640px){.panel.jsx-41c1b1b68a453676{padding:.8rem!important}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/invoices/page.tsx",
        lineNumber: 829,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7637a4e5._.js.map