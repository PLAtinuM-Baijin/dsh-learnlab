// 由 src/ 构建生成，不要直接编辑这个文件。
window.__ModuleLoader__.load({
  id: "dsh-learnlab",
  factory(require) {
    var module = { exports: {} };
    var exports = module.exports;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client.jsx
var client_exports = {};
__export(client_exports, {
  default: () => client_default
});
module.exports = __toCommonJS(client_exports);

// src/app.js
var import_react4 = __toESM(require("react"), 1);

// src/components/icons.jsx
var import_react3 = __toESM(require("react"), 1);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/createLucideIcon.js
var import_react2 = require("react");

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/shared/src/utils.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/Icon.js
var import_react = require("react");

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/defaultAttributes.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/Icon.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Icon = (0, import_react.forwardRef)(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => {
    return (0, import_react.createElement)(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/createLucideIcon.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var createLucideIcon = (iconName, iconNode) => {
  const Component = (0, import_react2.forwardRef)(
    ({ className, ...props }, ref) => (0, import_react2.createElement)(Icon, {
      ref,
      iconNode,
      className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
      ...props
    })
  );
  Component.displayName = `${iconName}`;
  return Component;
};

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/arrow-left.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var ArrowLeft = createLucideIcon("ArrowLeft", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/arrow-up.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var ArrowUp = createLucideIcon("ArrowUp", [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/book-open.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var BookOpen = createLucideIcon("BookOpen", [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/camera.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Camera = createLucideIcon("Camera", [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/chevron-down.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var ChevronDown = createLucideIcon("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/chevron-left.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var ChevronLeft = createLucideIcon("ChevronLeft", [
  ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/chevron-right.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var ChevronRight = createLucideIcon("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/columns-2.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Columns2 = createLucideIcon("Columns2", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M12 3v18", key: "108xh3" }]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/copy.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Copy = createLucideIcon("Copy", [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/eraser.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Eraser = createLucideIcon("Eraser", [
  [
    "path",
    {
      d: "m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21",
      key: "182aya"
    }
  ],
  ["path", { d: "M22 21H7", key: "t4ddhn" }],
  ["path", { d: "m5 11 9 9", key: "1mo9qw" }]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/image.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Image2 = createLucideIcon("Image", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/languages.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Languages = createLucideIcon("Languages", [
  ["path", { d: "m5 8 6 6", key: "1wu5hv" }],
  ["path", { d: "m4 14 6-6 2-3", key: "1k1g8d" }],
  ["path", { d: "M2 5h12", key: "or177f" }],
  ["path", { d: "M7 2h1", key: "1t2jsx" }],
  ["path", { d: "m22 22-5-10-5 10", key: "don7ne" }],
  ["path", { d: "M14 18h6", key: "1m8k6r" }]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/layout-grid.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var LayoutGrid = createLucideIcon("LayoutGrid", [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/message-square-text.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var MessageSquareText = createLucideIcon("MessageSquareText", [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }],
  ["path", { d: "M13 8H7", key: "14i4kc" }],
  ["path", { d: "M17 12H7", key: "16if0g" }]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/minus.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Minus = createLucideIcon("Minus", [["path", { d: "M5 12h14", key: "1ays0h" }]]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/pen-line.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var PenLine = createLucideIcon("PenLine", [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/pen.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Pen = createLucideIcon("Pen", [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/pencil.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Pencil = createLucideIcon("Pencil", [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/plus.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Plus = createLucideIcon("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var RotateCcw = createLucideIcon("RotateCcw", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/search.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Search = createLucideIcon("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/settings.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Settings = createLucideIcon("Settings", [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/sparkles.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Sparkles = createLucideIcon("Sparkles", [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/square.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Square = createLucideIcon("Square", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/sticky-note.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var StickyNote = createLucideIcon("StickyNote", [
  ["path", { d: "M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z", key: "qazsjp" }],
  ["path", { d: "M15 3v4a2 2 0 0 0 2 2h4", key: "40519r" }]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/trash-2.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Trash2 = createLucideIcon("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/undo-2.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Undo2 = createLucideIcon("Undo2", [
  ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
  ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/icons/x.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var X = createLucideIcon("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);

// build/node_modules/.pnpm/lucide-react@0.470.0_react@19.3.1/node_modules/lucide-react/dist/esm/lucide-react.js
/**
 * @license lucide-react v0.470.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

// src/components/icons.jsx
var MAP = {
  back: ArrowLeft,
  send: ArrowUp,
  book: BookOpen,
  camera: Camera,
  down: ChevronDown,
  prev: ChevronLeft,
  next: ChevronRight,
  copy: Copy,
  eraser: Eraser,
  translate: Languages,
  grid: LayoutGrid,
  chat: MessageSquareText,
  pen: Pen,
  draw: PenLine,
  image: Image2,
  compare: Columns2,
  edit: Pencil,
  plus: Plus,
  regen: RotateCcw,
  search: Search,
  settings: Settings,
  summary: Sparkles,
  stop: Square,
  note: StickyNote,
  clear: Trash2,
  undo: Undo2,
  minus: Minus,
  close: X
};
var Icon2 = import_react3.default.memo(function Icon3({ name, size = 16, strokeWidth = 1.75, style }) {
  const Glyph = MAP[name];
  if (!Glyph) return null;
  return /* @__PURE__ */ import_react3.default.createElement(
    Glyph,
    {
      size,
      strokeWidth,
      "aria-hidden": "true",
      style: { display: "block", flex: "none", ...style }
    }
  );
});
var icons_default = Icon2;

// src/app.js
var app_default = (function() {
  const h = import_react4.default.createElement;
  const { useState, useEffect, useRef, useCallback, useMemo } = import_react4.default;
  const API = "/api/learnlab";
  const MIN_RIGHT = 360;
  const MAX_RIGHT = 760;
  const INK_COLORS = ["#e5484d", "#2f6fed", "#f5c518"];
  const ACCENTS = ["#7e0c6e", "#2f6fed", "#0f8b8d", "#2e7d4f", "#b45309", "#b02a37"];
  const DECK_MIME = "text/x-learnlab-deck";
  const LAYOUT_KEY = "learnlab.layout";
  const CSS = `
.ll-root { display: flex; height: 100%; min-height: 0; width: 100%; overflow: hidden;
  background: var(--dsw-alias-bg-base); color: var(--dsw-alias-label-primary);
  font-size: 13px; line-height: 1.6; -webkit-font-smoothing: antialiased;
  --ll-accent: #7e0c6e;
  --ll-accent-ink: color-mix(in srgb, #7e0c6e 68%, var(--dsw-alias-label-primary));
  --ll-accent-soft: color-mix(in srgb, #7e0c6e 14%, transparent);
  --dsw-alias-brand-primary: #7e0c6e; }
.ll-root *, .ll-root *::before, .ll-root *::after { box-sizing: border-box; }
.ll-scroll { overscroll-behavior: contain; }

/* \u5DE6\u680F */
.ll-rail { width: 236px; flex: none; display: flex; flex-direction: column; min-height: 0;
  border-right: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-specific-sidebar-fill);
  position: relative; }
.ll-rail-head { height: 48px; flex: none; display: flex; align-items: center; gap: 6px; padding: 0 12px; }
.ll-rail-title { flex: 1; min-width: 0; font-size: 13px; font-weight: 600; letter-spacing: .02em;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ll-rail-list { flex: 1; min-height: 0; overflow: auto; padding: 2px 8px 10px; }
.ll-rail-foot { flex: none; padding: 10px 16px 12px; border-top: 1px solid var(--dsw-alias-border-l1);
  font-size: 11px; color: var(--dsw-alias-label-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.ll-deck { padding: 9px 11px; border-radius: 10px; cursor: grab; margin-bottom: 2px;
  display: flex; flex-direction: column; gap: 6px; border: 1px solid transparent; position: relative; }
.ll-deck:hover { background: var(--dsw-alias-bg-layer-2); }
.ll-deck.is-active { background: var(--dsw-alias-bg-layer-2); border-color: var(--dsw-alias-border-l2); }
.ll-deck:active { cursor: grabbing; }
.ll-deck-name { font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 18px; }
.ll-deck-del { position: absolute; top: 4px; right: 4px; width: 24px; height: 24px;
  opacity: 0; transition: opacity .12s ease; }
.ll-deck:hover .ll-deck-del, .ll-deck-del:focus-visible { opacity: 1; }
.ll-deck-del:hover { color: var(--dsw-alias-state-error-primary); background: var(--dsw-alias-bg-layer-2); }
.ll-deck-meta { display: flex; align-items: center; justify-content: space-between; gap: 8px;
  font-size: 11px; color: var(--dsw-alias-label-secondary); }
.ll-bar { height: 3px; border-radius: 2px; background: var(--dsw-alias-border-l1); overflow: hidden; }
.ll-bar > i { display: block; height: 100%; border-radius: 2px; background: var(--dsw-alias-brand-primary); transition: width .2s; }

.ll-thumb { display: flex; gap: 9px; padding: 6px; border-radius: 9px; cursor: pointer; border: 1px solid transparent; }
.ll-thumb:hover { background: var(--dsw-alias-bg-layer-2); }
.ll-thumb.is-active { background: var(--dsw-alias-bg-layer-2); border-color: var(--dsw-alias-brand-primary); }
.ll-thumb-img { width: 78px; height: 46px; flex: none; border-radius: 4px; object-fit: cover;
  background: var(--dsw-alias-bg-base); border: 1px solid var(--dsw-alias-border-l1); }
.ll-thumb-text { min-width: 0; display: flex; flex-direction: column; justify-content: center; gap: 2px; }
.ll-thumb-no { font-size: 11px; color: var(--dsw-alias-label-secondary); font-variant-numeric: tabular-nums; }
.ll-thumb-title { font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* \u4E2D\u680F */
.ll-main { flex: 1; min-width: 0; display: flex; flex-direction: column; min-height: 0; position: relative; }
.ll-head { height: 48px; flex: none; display: flex; align-items: center; gap: 10px;
  padding: 0 12px 0 18px; border-bottom: 1px solid var(--dsw-alias-border-l1); }
.ll-head-title { font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ll-head-meta { font-size: 11px; color: var(--dsw-alias-label-secondary); white-space: nowrap; }
.ll-search { position: relative; width: 200px; flex: none; }
.ll-search input { width: 100%; height: 28px; border-radius: 8px; border: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-base); color: inherit; font: inherit; font-size: 12px; padding: 0 9px; outline: none; }
.ll-search input:focus { border-color: var(--dsw-alias-brand-primary); }
.ll-results { position: absolute; top: 34px; right: 0; width: 340px; max-height: 320px; overflow: auto;
  background: var(--dsw-alias-bg-layer-1); border: 1px solid var(--dsw-alias-border-l2); border-radius: 10px;
  box-shadow: 0 18px 48px rgba(0,0,0,.48); z-index: 30; padding: 4px; }
.ll-result { padding: 7px 9px; border-radius: 7px; cursor: pointer; display: flex; flex-direction: column; gap: 2px; }
.ll-result:hover { background: var(--dsw-alias-bg-layer-2); }
.ll-result-head { font-size: 11px; color: var(--dsw-alias-label-secondary); }
.ll-result-body { font-size: 12px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }

/* \u7FFB\u8BD1 */
.ll-trans { position: absolute; top: 46px; right: 10px; width: 430px; max-height: 76%; display: flex;
  flex-direction: column; background: var(--dsw-alias-bg-layer-1); border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 12px; box-shadow: 0 18px 50px rgba(0,0,0,.44); z-index: 35; overflow: hidden; }
.ll-trans-head { height: 40px; flex: none; display: flex; align-items: center; gap: 8px; padding: 0 10px;
  border-bottom: 1px solid var(--dsw-alias-border-l1); }
.ll-trans-body { padding: 10px; display: flex; flex-direction: column; gap: 8px; overflow: auto; }
.ll-trans textarea { width: 100%; min-height: 137px; max-height: 324px; resize: none; border-radius: 8px;
  border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-base); color: inherit;
  font: inherit; font-size: 12px; padding: 8px; outline: none; }
.ll-trans textarea:focus { border-color: var(--dsw-alias-brand-primary); }
.ll-trans-out { border-radius: 8px; border: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-layer-2); padding: 8px; font-size: 12.5px; line-height: 1.7;
  white-space: pre-wrap; max-height: 220px; overflow: auto; }
.ll-trans-row { display: flex; align-items: center; gap: 8px; }

/* \u821E\u53F0\u4E0E\u53CC\u680F */
.ll-stage { flex: 1; min-height: 0; display: flex; flex-direction: column; padding: 10px 12px 8px; gap: 8px; position: relative; }
.ll-split { flex: 1; min-height: 0; display: flex; flex-direction: column; }
.ll-view { flex: 1; min-height: 0; display: flex; flex-direction: column; position: relative;
  border-radius: 10px; overflow: hidden; }
.ll-view.is-dual { border: 1px solid var(--dsw-alias-border-l1); }
.ll-view.is-focus { border-color: var(--dsw-alias-brand-primary); box-shadow: 0 0 0 1px var(--dsw-alias-brand-primary); }
.ll-view-head { height: 32px; flex: none; display: flex; align-items: center; gap: 8px; padding: 0 6px 0 10px;
  font-size: 11.5px; color: var(--dsw-alias-label-secondary); }
.ll-view-title { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ll-view-close { width: 22px; height: 22px; border: none; background: transparent; color: inherit;
  border-radius: 6px; cursor: pointer; font-size: 13px; line-height: 1; }
.ll-view-close:hover { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); }
.ll-media { flex: 1; min-height: 0; display: flex; align-items: safe center; justify-content: safe center;
  position: relative; padding: 2px; overflow: auto; scrollbar-gutter: stable both-edges; }
.ll-media.is-zoomed { cursor: grab; }
.ll-media.is-panning { cursor: grabbing; }
.ll-view-titleonly { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 6px 12px; font-size: 12px; color: var(--dsw-alias-label-secondary);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ll-divider { height: 8px; flex: none; cursor: row-resize; position: relative; }
.ll-divider::after { content: ''; position: absolute; left: 20%; right: 20%; top: 3px; height: 2px;
  border-radius: 2px; background: var(--dsw-alias-border-l2); }
.ll-divider:hover::after, .ll-divider.is-dragging::after { background: var(--dsw-alias-brand-primary); left: 4%; right: 4%; }
.ll-drop { position: absolute; left: 8px; right: 8px; height: calc(50% - 6px); border-radius: 10px;
  border: 1.5px dashed var(--dsw-alias-brand-primary); background: color-mix(in srgb, var(--dsw-alias-brand-primary) 10%, transparent);
  pointer-events: none; z-index: 6; display: flex; align-items: center; justify-content: center;
  font-size: 12px; color: var(--dsw-alias-brand-primary); }
.ll-drop.is-top { top: 4px; }
.ll-drop.is-bottom { bottom: 4px; }

.ll-slide { max-width: 100%; max-height: 100%; border-radius: 8px; background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,.18), 0 12px 32px rgba(0,0,0,.22); user-select: none;
  flex: none; margin: auto; }
.ll-ink { position: absolute; touch-action: none; cursor: crosshair; }
.ll-slide-ph { color: var(--dsw-alias-label-secondary); font-size: 12px; }
.ll-zone { position: absolute; top: 0; bottom: 0; width: 16%; cursor: pointer; opacity: 0; z-index: 3;
  transition: opacity .12s; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #fff; }
.ll-zone:hover { opacity: 1; background: linear-gradient(to right, rgba(0,0,0,.16), transparent); }
.ll-zone.is-next:hover { background: linear-gradient(to left, rgba(0,0,0,.16), transparent); }
.ll-zone.is-prev { left: 0; }
.ll-zone.is-next { right: 0; }

.ll-bottom { display: flex; align-items: center; gap: 10px; flex: none; }
.ll-nav { display: flex; align-items: center; gap: 2px; padding: 3px; border-radius: 999px;
  background: var(--dsw-alias-bg-layer-1); border: 1px solid var(--dsw-alias-border-l1);
  box-shadow: 0 2px 10px rgba(0,0,0,.10); }
.ll-nav button { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
  border: none; border-radius: 999px; background: transparent; color: var(--dsw-alias-label-primary);
  font: inherit; font-size: 15px; line-height: 1; cursor: pointer; padding: 0; }
.ll-nav button:hover:not(:disabled) { background: var(--dsw-alias-bg-layer-2); }
.ll-nav button:disabled { opacity: .3; cursor: default; }
.ll-pagebox { display: inline-flex; align-items: center; justify-content: center; gap: 5px;
  height: 28px; padding: 0 8px; min-width: 56px; }
.ll-pagebox input { width: auto; min-width: 12px; height: 28px; border: none; background: transparent;
  color: inherit; font: inherit; font-size: 12px; text-align: right; outline: none;
  font-variant-numeric: tabular-nums; padding: 0; }
.ll-page-sep { font-size: 12px; color: var(--dsw-alias-label-secondary); }
.ll-page-total { font-size: 12px; color: var(--dsw-alias-label-secondary);
  font-variant-numeric: tabular-nums; min-width: 2ch; text-align: left; }

.ll-inktools { display: flex; align-items: center; gap: 2px; padding: 3px; border-radius: 999px;
  background: var(--dsw-alias-bg-layer-1); border: 1px solid var(--dsw-alias-border-l1);
  box-shadow: 0 2px 10px rgba(0,0,0,.10); }
.ll-inktools button { height: 26px; min-width: 26px; border: none; border-radius: 999px; background: transparent;
  color: var(--dsw-alias-label-secondary); font: inherit; font-size: 11px; cursor: pointer; padding: 0 7px; }
.ll-inktools button:hover { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); }
.ll-inktools button.is-active { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); }
.ll-dot { width: 14px; height: 14px; border-radius: 50%; border: 1px solid rgba(0,0,0,.25); }
.ll-ink-sep { width: 1px; height: 16px; background: var(--dsw-alias-border-l1); margin: 0 2px; }

/* \u53F3\u680F */
.ll-right { flex: none; display: flex; flex-direction: column; min-height: 0;
  border-left: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-1); }
.ll-resizer { width: 5px; flex: none; cursor: col-resize; position: relative; background: transparent; }
.ll-resizer::after { content: ''; position: absolute; inset: 0 2px; border-radius: 2px; background: transparent; transition: background .12s; }
.ll-resizer:hover::after, .ll-resizer.is-dragging::after { background: var(--dsw-alias-brand-primary); }
.ll-tabs { height: 48px; flex: none; display: flex; align-items: center; gap: 4px; padding: 0 10px;
  border-bottom: 1px solid var(--dsw-alias-border-l1); }
.ll-tab { padding: 5px 12px; border-radius: 999px; font-size: 12px; cursor: pointer; user-select: none;
  color: var(--dsw-alias-label-secondary); }
.ll-tab:hover { color: var(--dsw-alias-label-primary); }
.ll-tab.is-active { background: var(--dsw-alias-bg-base); color: var(--dsw-alias-label-primary);
  box-shadow: inset 0 0 0 1px var(--dsw-alias-border-l1); }
.ll-pane { flex: 1; min-height: 0; display: flex; flex-direction: column; }
.ll-scroll { flex: 1; min-height: 0; overflow: auto; padding: 14px 16px; display: flex; flex-direction: column; gap: 14px; }

.ll-msg { display: flex; flex-direction: column; gap: 5px; }
.ll-msg-q { align-self: flex-end; max-width: 86%; padding: 8px 12px; border-radius: 12px 12px 4px 12px;
  background: var(--ll-accent); color: #fff;
  white-space: pre-wrap; word-break: break-word; }
.ll-msg-a { align-self: stretch; }
.ll-msg-meta { display: flex; align-items: center; gap: 10px; font-size: 10.5px;
  color: var(--dsw-alias-label-secondary); opacity: .9; flex-wrap: wrap; }
.ll-page-tag { align-self: center; font-size: 11px; color: var(--dsw-alias-label-secondary);
  padding: 2px 0 6px; letter-spacing: .04em; }
.ll-scope-tag { font-size: 10.5px; color: var(--dsw-alias-label-secondary);
  border: 1px solid var(--dsw-alias-border-l1); border-radius: 999px; padding: 1px 8px; }

.ll-thinking { display: flex; align-items: center; gap: 8px; color: var(--dsw-alias-label-secondary);
  font-size: 12px; padding: 2px 0; }
.ll-dots { display: inline-flex; gap: 3px; }
.ll-dots i { width: 4px; height: 4px; border-radius: 50%; background: currentColor;
  animation: ll-pulse 1.1s infinite ease-in-out; }
.ll-dots i:nth-child(2) { animation-delay: .16s; }
.ll-dots i:nth-child(3) { animation-delay: .32s; }
@keyframes ll-pulse { 0%, 70%, 100% { opacity: .25; transform: translateY(0); } 35% { opacity: 1; transform: translateY(-2px); } }

/* \u8F93\u5165\u533A */
.ll-composer { flex: none; padding: 10px 12px 14px; }
.ll-card { border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-base);
  border-radius: 12px; padding: 6px 6px 4px; transition: border-color .14s; }
.ll-card:focus-within { border-color: var(--dsw-alias-brand-primary); }
.ll-editor { display: block; width: 100%; min-height: 52px; max-height: 168px; resize: none;
  border: none; outline: none; background: transparent; color: inherit; font: inherit;
  padding: 6px 6px 2px; line-height: 1.55; }
.ll-editor::placeholder { color: var(--dsw-alias-label-secondary); }
.ll-tools { display: flex; align-items: center; gap: 8px; padding: 2px; flex-wrap: wrap; }
.ll-tools-line { display: flex; align-items: center; gap: 8px; padding: 4px 6px 0; flex-wrap: wrap; }
.ll-grow { flex: 1; min-width: 0; }

.ll-seg { display: inline-flex; padding: 2px; border-radius: 8px; background: var(--dsw-alias-bg-layer-2); }
.ll-seg button { border: none; background: transparent; color: var(--dsw-alias-label-secondary);
  font: inherit; font-size: 11px; line-height: 1; padding: 4px 8px; border-radius: 6px; cursor: pointer;
  white-space: nowrap; }
.ll-seg button.is-locked { opacity: .38; cursor: not-allowed; }
.ll-seg button.is-active { background: var(--dsw-alias-bg-base); color: var(--dsw-alias-label-primary);
  box-shadow: 0 0 0 1px var(--dsw-alias-border-l1); }

.ll-btn { font: inherit; font-size: 12px; line-height: 1; border-radius: 8px; height: 28px; padding: 0 11px;
  cursor: pointer; border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-primary); white-space: nowrap; display: inline-flex;
  align-items: center; justify-content: center; }
.ll-btn:hover:not(:disabled) { border-color: var(--dsw-alias-border-l2); }
.ll-btn:disabled { opacity: .4; cursor: default; }
.ll-send { border: none; background: var(--ll-accent); color: #fff; font-weight: 500; }
.ll-send:disabled { opacity: .38; }
.ll-stop { border: 1px solid var(--dsw-alias-state-error-primary); background: transparent;
  color: var(--dsw-alias-state-error-primary); }
.ll-btn-ghost { border: none; background: transparent; color: var(--dsw-alias-label-secondary);
  font: inherit; font-size: 11px; padding: 2px 0; cursor: pointer; }
.ll-btn-ghost:hover { color: var(--dsw-alias-label-primary); }
.ll-btn.ll-danger { background: var(--dsw-alias-state-error-primary); border-color: transparent; color: #fff; }
.ll-link { color: var(--ll-accent-ink); cursor: pointer; background: none; border: none; padding: 0; font: inherit; }
.ll-chip { display: inline-flex; align-items: center; gap: 5px; font-size: 11px;
  color: var(--dsw-alias-label-secondary); cursor: pointer; user-select: none; white-space: nowrap; }
.ll-chip input { margin: 0; accent-color: var(--dsw-alias-brand-primary); }

/* \u6587\u672C */
.ll-md { font-size: 13px; line-height: 1.75; word-break: break-word; }
.ll-md p { margin: 0 0 8px; }
.ll-md h1 { font-size: 16px; margin: 6px 0 10px; font-weight: 600; }
.ll-md h2 { font-size: 14px; margin: 18px 0 8px; font-weight: 600; }
.ll-md h3 { font-size: 13px; margin: 12px 0 6px; font-weight: 600; }
.ll-md ul, .ll-md ol { margin: 0 0 8px; padding-left: 20px; }
.ll-md li { margin: 3px 0; }
.ll-md blockquote { margin: 0 0 10px; padding-left: 10px; border-left: 2px solid var(--dsw-alias-border-l2);
  color: var(--dsw-alias-label-secondary); }
.ll-md hr { border: none; border-top: 1px solid var(--dsw-alias-border-l1); margin: 16px 0; }
.ll-md code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px;
  background: var(--dsw-alias-bg-layer-2); border-radius: 4px; padding: 1px 4px; }
.ll-md pre { margin: 0 0 10px; padding: 10px 12px; border-radius: 8px; overflow: auto; background: var(--dsw-alias-bg-layer-2); }
.ll-md pre code { background: none; padding: 0; }
.ll-md table { border-collapse: collapse; margin: 0 0 10px; font-size: 12px; width: 100%; }
.ll-md th, .ll-md td { border: 1px solid var(--dsw-alias-border-l1); padding: 5px 8px; text-align: left; }
.ll-md th { background: var(--dsw-alias-bg-layer-2); font-weight: 600; }
.ll-md .ll-answer { margin: 6px 0 10px; padding: 8px 10px; border-radius: 8px; background: var(--dsw-alias-bg-layer-2); }
.ll-md .ll-answer-label { font-size: 11px; color: var(--dsw-alias-label-secondary); margin-bottom: 4px; }
.ll-md .ll-math-block { text-align: center; margin: 8px 0 12px; font-size: 15px; }
.m-math { font-family: "Cambria Math", "Latin Modern Math", Georgia, serif; }
.m-frac { display: inline-flex; flex-direction: column; vertical-align: middle; text-align: center;
  margin: 0 .18em; font-size: .96em; line-height: 1.2; }
.m-num { border-bottom: 1px solid currentColor; padding: 0 .2em; }
.m-den { padding: 0 .2em; }
.m-sqrt-body { border-top: 1px solid currentColor; padding: 0 .18em; margin-left: .06em; }
.m-text { font-style: normal; }
.ll-figure { display: block; max-width: 100%; margin: 8px 0 10px; padding: 10px;
  background: #fff; border-radius: 8px; border: 1px solid var(--dsw-alias-border-l1); }
.ll-edit { display: flex; flex-direction: column; gap: 6px; align-self: flex-end; width: 100%; }
.ll-edit textarea { width: 100%; min-height: 60px; resize: vertical; border-radius: 10px; padding: 8px 10px;
  border: 1px solid var(--dsw-alias-brand-primary); background: var(--dsw-alias-bg-base);
  color: inherit; font: inherit; outline: none; }

.ll-empty { margin: auto; text-align: center; color: var(--dsw-alias-label-secondary);
  font-size: 12px; line-height: 1.8; padding: 28px 20px; display: flex; flex-direction: column;
  gap: 6px; align-items: center; }
.ll-empty-title { font-size: 13px; color: var(--dsw-alias-label-primary); }
.ll-hint { font-size: 11px; color: var(--dsw-alias-label-secondary); }
.ll-error { flex: none; color: var(--dsw-alias-state-error-primary); font-size: 12px;
  padding: 8px 20px; border-top: 1px solid var(--dsw-alias-border-l1); }

.ll-task { flex: none; padding: 8px 12px; border-radius: 10px; background: var(--dsw-alias-bg-layer-1);
  border: 1px solid var(--dsw-alias-border-l1); display: flex; align-items: center; gap: 10px; font-size: 12px; }
.ll-progress { height: 4px; border-radius: 2px; background: var(--dsw-alias-border-l1); overflow: hidden; }
.ll-progress > i { display: block; height: 100%; background: var(--dsw-alias-brand-primary); transition: width .2s; }

/* \u5F39\u5C42 */
.ll-overlay { position: absolute; inset: 0; background: rgba(0,0,0,.34); display: flex;
  align-items: center; justify-content: center; z-index: 40; }
.ll-modal { width: min(560px, 88%); max-height: 74%; display: flex; flex-direction: column;
  background: var(--dsw-alias-bg-layer-1); border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 14px; overflow: hidden; box-shadow: 0 24px 64px rgba(0,0,0,.5); }
.ll-modal-head { height: 50px; flex: none; padding: 0 8px 0 18px; display: flex; align-items: center;
  justify-content: space-between; border-bottom: 1px solid var(--dsw-alias-border-l1);
  font-size: 13px; font-weight: 600; }
.ll-modal-body { overflow: auto; padding: 16px; font-size: 12.5px; line-height: 1.7; }
.ll-modal-foot { padding: 12px 16px; border-top: 1px solid var(--dsw-alias-border-l1);
  display: flex; justify-content: flex-end; gap: 8px; }
.ll-file { padding: 9px 10px; border-radius: 8px; cursor: pointer; display: flex; align-items: center;
  justify-content: space-between; gap: 12px; font-size: 12.5px; }
.ll-file:hover { background: var(--dsw-alias-bg-layer-2); }
.ll-file.is-busy { cursor: default; opacity: .85; }
.ll-file-name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ll-notes-editor { width: 100%; flex: 1; min-height: 100%; resize: none; border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 10px; padding: 10px 12px; background: var(--dsw-alias-bg-base); color: inherit;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; line-height: 1.7; outline: none; }
.ll-notes-editor:focus { border-color: var(--dsw-alias-brand-primary); }

/* ===== \u7B2C\u4E8C\u7248\u89C6\u89C9\uFF1A\u56FE\u6807\u6309\u94AE\u3001\u5C42\u7EA7\u4E0E\u5BC6\u5EA6 ===== */

.ll-ibtn { width: 28px; height: 28px; flex: none; display: inline-flex; align-items: center;
  justify-content: center; border: none; border-radius: 8px; background: transparent;
  color: var(--dsw-alias-label-secondary); cursor: pointer; padding: 0;
  transition: background .12s ease, color .12s ease; }
.ll-ibtn:hover:not(:disabled) { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); }
.ll-ibtn.is-active { background: var(--ll-accent-soft); color: var(--ll-accent-ink);
  box-shadow: none; }
.ll-ibtn:disabled { opacity: .3; cursor: default; }

.ll-swatch { width: 24px; height: 24px; flex: none; display: inline-flex; align-items: center;
  justify-content: center; border: none; border-radius: 999px; background: transparent;
  cursor: pointer; padding: 0; transition: transform .12s ease; }
.ll-swatch:hover { transform: scale(1.12); }
.ll-swatch .ll-dot { width: 13px; height: 13px; border-radius: 50%; border: 1px solid rgba(0,0,0,.18); }
.ll-swatch.is-active { box-shadow: inset 0 0 0 2px var(--dsw-alias-brand-primary); }

.ll-act { display: inline-flex; align-items: center; gap: 4px; border: none; background: transparent;
  color: var(--dsw-alias-label-secondary); font: inherit; font-size: 11px; line-height: 1;
  padding: 4px 6px; margin-left: -6px; border-radius: 6px; cursor: pointer;
  transition: background .12s ease, color .12s ease; }
.ll-act:hover:not(:disabled) { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); }
.ll-act:disabled { opacity: .35; cursor: default; }

/* \u5C42\u7EA7\uFF1A\u9762\u677F\u7528\u5E95\u8272\u533A\u5206\uFF0C\u5C11\u753B\u8FB9\u6846 */
.ll-rail { border-right-color: color-mix(in srgb, var(--dsw-alias-border-l1) 70%, transparent); }
.ll-right { border-left-color: color-mix(in srgb, var(--dsw-alias-border-l1) 70%, transparent); }
.ll-head, .ll-tabs, .ll-rail-head { border-bottom-color: color-mix(in srgb, var(--dsw-alias-border-l1) 60%, transparent); }
.ll-deck { border-radius: 10px; padding: 10px 12px; gap: 7px; }
.ll-deck.is-active { box-shadow: inset 2px 0 0 var(--dsw-alias-brand-primary); }
.ll-thumb { border-radius: 10px; }
.ll-thumb-img { border-radius: 6px; }

/* \u5BC6\u5EA6\u4E0E\u5B57\u53F7 */
.ll-scroll { gap: 16px; padding: 16px; }
.ll-msg-q { padding: 9px 13px; border-radius: 14px 14px 4px 14px; }
.ll-msg-a { line-height: 1.72; }
.ll-msg-meta { gap: 8px; }
.ll-btn { height: 30px; border-radius: 9px; padding: 0 12px; }
.ll-pagebox { min-width: 60px; }
.ll-tabs { gap: 2px; }
.ll-tab { padding: 6px 13px; }
.ll-composer { padding: 12px 14px 16px; }
/* \u8F93\u5165\u5361\u7247\uFF1A\u805A\u7126\u53EA\u7528\u4E00\u5C42\u67D4\u548C\u7684\u63CF\u8FB9\uFF0C\u4E0D\u8981\u548C\u7126\u70B9\u73AF\u53E0\u52A0 */
.ll-card { border-radius: 14px; padding: 8px 8px 6px;
  border-color: color-mix(in srgb, var(--dsw-alias-border-l1) 85%, transparent); }
.ll-card:focus-within {
  border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 42%, var(--dsw-alias-border-l1));
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-brand-primary) 10%, transparent);
}
.ll-editor:focus, .ll-editor:focus-visible { outline: none; box-shadow: none; }
.ll-editor { padding: 6px 8px 4px; }
.ll-empty { gap: 8px; }
.ll-empty-title { font-weight: 500; }

/* \u7126\u70B9\u4E0E\u6EDA\u52A8\u6761 */
.ll-root :focus-visible { outline: none; }
.ll-root button:focus-visible, .ll-root .ll-tab:focus-visible, .ll-root .ll-thumb:focus-visible,
.ll-root .ll-deck:focus-visible, .ll-root .ll-swatch:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 65%, transparent);
  outline-offset: 1px;
}
.ll-root input, .ll-root textarea, .ll-root select { outline: none; }
.ll-root ::-webkit-scrollbar { width: 10px; height: 10px; }
.ll-root ::-webkit-scrollbar-thumb { background: color-mix(in srgb, var(--dsw-alias-label-secondary) 32%, transparent);
  border-radius: 999px; border: 3px solid transparent; background-clip: content-box; }
.ll-root ::-webkit-scrollbar-thumb:hover { background: color-mix(in srgb, var(--dsw-alias-label-secondary) 52%, transparent);
  background-clip: content-box; }
.ll-root ::-webkit-scrollbar-track { background: transparent; }

/* \u5E7B\u706F\u7247\u4E0E\u7A7A\u72B6\u6001 */
.ll-slide { border-radius: 10px; }
.ll-slide-ph { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;
  border-radius: 10px; background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 60%, transparent);
  animation: ll-breathe 1.6s ease-in-out infinite; }
@keyframes ll-breathe { 0%, 100% { opacity: .55; } 50% { opacity: 1; } }

/* \u5F00\u5173\u5F0F chip\uFF08\u66FF\u4EE3\u539F\u751F\u590D\u9009\u6846\uFF09 */
.ll-chip { display: inline-flex; align-items: center; gap: 5px; height: 26px; padding: 0 9px;
  border: 1px solid var(--dsw-alias-border-l1); border-radius: 999px; background: transparent;
  color: var(--dsw-alias-label-secondary); font: inherit; font-size: 11px; line-height: 1;
  cursor: pointer; white-space: nowrap; transition: background .12s ease, color .12s ease, border-color .12s ease; }
.ll-chip:hover { color: var(--dsw-alias-label-primary); border-color: var(--dsw-alias-border-l2); }
.ll-chip.is-on { color: var(--ll-accent-ink);
  border-color: color-mix(in srgb, var(--ll-accent) 55%, transparent);
  background: var(--ll-accent-soft); }

/* \u5BF9\u6BD4\u6807\u8BB0 */
.ll-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 11px;
  padding: 2px 8px; border-radius: 999px; color: var(--ll-accent-ink);
  background: var(--ll-accent-soft); white-space: nowrap; }

/* \u7126\u70B9\u533A\u5757\u66F4\u660E\u786E */
.ll-view.is-focus .ll-view-head { background: color-mix(in srgb, var(--dsw-alias-brand-primary) 10%, transparent);
  border-radius: 10px 10px 0 0; }
.ll-view.is-focus .ll-view-title { color: var(--dsw-alias-label-primary); }

/* \u6D88\u606F\u52A8\u4F5C\u884C\u4E0E\u6B63\u6587\u62C9\u5F00\u5C42\u6B21 */
.ll-msg-actions { margin-top: 2px; padding-top: 6px; border-top: 1px dashed
  color-mix(in srgb, var(--dsw-alias-border-l1) 80%, transparent); }
.ll-msg-meta > span { white-space: nowrap; }

/* \u5BF9\u8BDD\u91CC\u7684\u9875\u7801\u5206\u9694 */
.ll-page-tag { align-self: center; display: inline-flex; align-items: center; gap: 8px;
  padding: 3px 10px; border-radius: 999px; font-size: 10.5px; letter-spacing: .04em;
  color: var(--dsw-alias-label-secondary);
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 70%, transparent); }
.ll-empty > svg { opacity: .45; margin-bottom: 2px; }

/* \u7FFB\u8BD1\u5F39\u7A97\uFF1A\u4E0E\u6574\u4F53\u4E00\u81F4\u7684\u5206\u5C42\uFF0C\u522B\u8BA9\u9009\u4E2D\u6001\u6BD4\u8F68\u9053\u8FD8\u6DF1 */
.ll-trans { background: var(--dsw-alias-bg-layer-1); border-color: var(--dsw-alias-border-l2);
  box-shadow: 0 18px 52px rgba(0,0,0,.45); }
.ll-trans-head { border-bottom-color: var(--dsw-alias-border-l1); }
.ll-trans .ll-seg { background: transparent; padding: 0; gap: 2px; }
.ll-trans .ll-seg button { color: var(--dsw-alias-label-secondary); padding: 4px 9px; }
.ll-trans .ll-seg button.is-active {
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-primary);
  box-shadow: inset 0 0 0 1px var(--dsw-alias-border-l1);
}
.ll-trans textarea { background: var(--dsw-alias-bg-base);
  border-color: color-mix(in srgb, var(--dsw-alias-border-l1) 90%, transparent); }
.ll-trans textarea:focus { border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 45%, var(--dsw-alias-border-l1)); }
.ll-trans-out { background: var(--dsw-alias-bg-base);
  border-color: color-mix(in srgb, var(--dsw-alias-border-l1) 90%, transparent); }

/* \u5DE5\u5177\u6761\u4E0A\u7684\u56FE\u6807\u5F00\u5173\uFF1A\u53EA\u653E\u56FE\u6807\u65F6\u4E0D\u5360\u5BBD */
.ll-chip.is-icon { width: 28px; padding: 0; justify-content: center; }
.ll-tools { gap: 6px; flex-wrap: nowrap; }
.ll-tools > .ll-seg, .ll-tools > .ll-chip { flex: none; }

/* \u53D1\u9001\u6309\u94AE\u53EA\u7559\u56FE\u6807 */
.ll-send-icon { width: 32px; min-width: 32px; padding: 0; border-radius: 999px; }
.ll-send-icon svg { margin: 0; }

/* \u5DE6\u680F\u5E95\u90E8\uFF1A\u6A21\u578B + \u5916\u89C2\u8BBE\u7F6E */
.ll-rail-foot { display: flex; align-items: center; gap: 6px; }
.ll-model { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ll-skin { position: absolute; left: 10px; right: 10px; bottom: 46px; z-index: 25;
  padding: 12px; border-radius: 12px; background: var(--dsw-alias-bg-layer-1);
  border: 1px solid var(--dsw-alias-border-l2); box-shadow: 0 18px 48px rgba(0,0,0,.48); }
.ll-skin-title { font-size: 11px; color: var(--dsw-alias-label-secondary); margin-bottom: 6px; }
.ll-skin-text { font-size: 12px; color: var(--dsw-alias-label-primary); line-height: 1.6; }
.ll-skin-sub { font-size: 10.5px; color: var(--dsw-alias-label-secondary); margin-top: 2px; }
.ll-skin-hr { height: 1px; background: var(--dsw-alias-border-l1); margin: 12px 0; }

/* \u7F29\u653E */
.ll-zoom { position: absolute; right: 10px; bottom: 10px; z-index: 4; height: 24px; padding: 0 9px;
  border-radius: 999px; border: 1px solid var(--dsw-alias-border-l2);
  background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-secondary);
  font: inherit; font-size: 11px; font-variant-numeric: tabular-nums; cursor: pointer; }
.ll-zoom:hover { color: var(--dsw-alias-label-primary); }
.ll-zoom-badge { font-size: 11px; color: var(--dsw-alias-label-secondary);
  font-variant-numeric: tabular-nums; padding: 0 2px; }
.ll-zoomctl { display: flex; align-items: center; gap: 1px; padding: 3px; border-radius: 999px;
  background: var(--dsw-alias-bg-layer-1); border: 1px solid var(--dsw-alias-border-l1);
  box-shadow: 0 2px 10px rgba(0,0,0,.10); }
.ll-zoomval { border: none; background: transparent; color: var(--dsw-alias-label-secondary);
  font: inherit; font-size: 11px; font-variant-numeric: tabular-nums; min-width: 42px;
  padding: 0 4px; cursor: pointer; border-radius: 999px; height: 26px; }
.ll-zoomval:hover { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-layer-2); }
.ll-skin-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.ll-skin-row + .ll-skin-row { margin-top: 10px; }
.ll-skin-dot { width: 22px; height: 22px; border-radius: 50%; border: 2px solid transparent;
  cursor: pointer; padding: 0; transition: transform .12s ease; }
.ll-skin-dot:hover { transform: scale(1.1); }
.ll-skin-dot.is-active { border-color: var(--dsw-alias-label-primary);
  box-shadow: 0 0 0 2px var(--dsw-alias-bg-layer-1) inset; }
.ll-skin-custom { display: inline-flex; align-items: center; gap: 6px; font-size: 11px;
  color: var(--dsw-alias-label-secondary); cursor: pointer; }
.ll-skin-custom input[type='color'] { width: 24px; height: 22px; padding: 0; border: none;
  background: none; cursor: pointer; }
.ll-skin-input { width: 100%; margin-top: 8px; height: 30px; padding: 0 9px; border-radius: 8px;
  background: var(--dsw-alias-bg-base); color: var(--dsw-alias-label-primary);
  border: 1px solid var(--dsw-alias-border-l1); font: inherit; font-size: 11px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
.ll-skin-input:focus { outline: none; border-color: color-mix(in srgb, var(--ll-accent) 60%, transparent); }
.ll-path { margin-top: 4px; padding: 6px 8px; border-radius: 7px; background: var(--dsw-alias-bg-layer-2);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 11px;
  color: var(--dsw-alias-label-secondary); word-break: break-all; }
`;
  async function api(path, options) {
    const res = await fetch(`${API}${path}`, options);
    const text = await res.text();
    const data = text ? JSON.parse(text) : {};
    if (!res.ok) throw new Error(data.error || `\u8BF7\u6C42\u5931\u8D25\uFF08${res.status}\uFF09`);
    return data;
  }
  function post(path, body, signal) {
    return api(path, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body ?? {}),
      signal
    });
  }
  async function stream(path, body, onEvent, signal) {
    const res = await fetch(`${API}${path}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body ?? {}),
      signal
    });
    if (!res.body) throw new Error("\u8FDE\u63A5\u5931\u8D25");
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    for (; ; ) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let cut = buffer.indexOf("\n\n");
      while (cut >= 0) {
        const block = buffer.slice(0, cut);
        buffer = buffer.slice(cut + 2);
        const line = block.split("\n").find((item) => item.startsWith("data: "));
        if (line) {
          try {
            onEvent(JSON.parse(line.slice(6)));
          } catch {
          }
        }
        cut = buffer.indexOf("\n\n");
      }
    }
  }
  function fmtTokens(value) {
    const n = Number(value) || 0;
    if (n >= 1e4) return `${Math.round(n / 1e3)}k`;
    if (n >= 1e3) return `${(n / 1e3).toFixed(1)}k`;
    return String(n);
  }
  function fmtDuration(ms) {
    const value = Number(ms) || 0;
    if (value < 1e3) return `${Math.round(value)}ms`;
    if (value < 6e4) return `${(value / 1e3).toFixed(1)}s`;
    return `${Math.floor(value / 6e4)}m${Math.round(value % 6e4 / 1e3)}s`;
  }
  const TEX_SYMBOLS = {
    alpha: "\u03B1",
    beta: "\u03B2",
    gamma: "\u03B3",
    delta: "\u03B4",
    epsilon: "\u03B5",
    varepsilon: "\u03B5",
    zeta: "\u03B6",
    eta: "\u03B7",
    theta: "\u03B8",
    iota: "\u03B9",
    kappa: "\u03BA",
    lambda: "\u03BB",
    mu: "\u03BC",
    nu: "\u03BD",
    xi: "\u03BE",
    pi: "\u03C0",
    rho: "\u03C1",
    sigma: "\u03C3",
    tau: "\u03C4",
    upsilon: "\u03C5",
    phi: "\u03C6",
    varphi: "\u03C6",
    chi: "\u03C7",
    psi: "\u03C8",
    omega: "\u03C9",
    Gamma: "\u0393",
    Delta: "\u0394",
    Theta: "\u0398",
    Lambda: "\u039B",
    Xi: "\u039E",
    Pi: "\u03A0",
    Sigma: "\u03A3",
    Phi: "\u03A6",
    Psi: "\u03A8",
    Omega: "\u03A9",
    times: "\xD7",
    cdot: "\xB7",
    div: "\xF7",
    pm: "\xB1",
    mp: "\u2213",
    ast: "\u2217",
    star: "\u22C6",
    circ: "\u2218",
    le: "\u2264",
    leq: "\u2264",
    ge: "\u2265",
    geq: "\u2265",
    ne: "\u2260",
    neq: "\u2260",
    approx: "\u2248",
    equiv: "\u2261",
    sim: "\u223C",
    propto: "\u221D",
    ll: "\u226A",
    gg: "\u226B",
    to: "\u2192",
    rightarrow: "\u2192",
    leftarrow: "\u2190",
    leftrightarrow: "\u2194",
    Rightarrow: "\u21D2",
    Leftarrow: "\u21D0",
    Leftrightarrow: "\u21D4",
    mapsto: "\u21A6",
    uparrow: "\u2191",
    downarrow: "\u2193",
    sum: "\u2211",
    prod: "\u220F",
    int: "\u222B",
    oint: "\u222E",
    iint: "\u222C",
    infty: "\u221E",
    partial: "\u2202",
    nabla: "\u2207",
    forall: "\u2200",
    exists: "\u2203",
    nexists: "\u2204",
    in: "\u2208",
    notin: "\u2209",
    ni: "\u220B",
    subset: "\u2282",
    supset: "\u2283",
    subseteq: "\u2286",
    supseteq: "\u2287",
    cup: "\u222A",
    cap: "\u2229",
    emptyset: "\u2205",
    varnothing: "\u2205",
    setminus: "\u2216",
    land: "\u2227",
    lor: "\u2228",
    lnot: "\xAC",
    neg: "\xAC",
    top: "\u22A4",
    bot: "\u22A5",
    cdots: "\u22EF",
    ldots: "\u2026",
    dots: "\u2026",
    prime: "\u2032",
    degree: "\xB0",
    angle: "\u2220",
    therefore: "\u2234",
    because: "\u2235",
    lfloor: "\u230A",
    rfloor: "\u230B",
    lceil: "\u2308",
    rceil: "\u2309",
    langle: "\u27E8",
    rangle: "\u27E9",
    lbrace: "{",
    rbrace: "}",
    vert: "|",
    Vert: "\u2016"
  };
  function escapeHtml(value) {
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function texToHtml(source) {
    const src = String(source ?? "");
    let i = 0;
    function readArg() {
      if (src[i] === "{") {
        i += 1;
        const inner = parseUntil("}");
        i += 1;
        return inner;
      }
      if (src[i] === "\\") return command().html;
      const ch = src[i] || "";
      i += 1;
      return escapeHtml(ch);
    }
    function command() {
      i += 1;
      let name = "";
      while (i < src.length && /[a-zA-Z]/.test(src[i])) {
        name += src[i];
        i += 1;
      }
      if (name === "frac" || name === "dfrac" || name === "tfrac") {
        const numerator = readArg();
        const denominator = readArg();
        return { html: `<span class="m-frac"><span class="m-num">${numerator}</span><span class="m-den">${denominator}</span></span>` };
      }
      if (name === "sqrt") return { html: `<span>\u221A<span class="m-sqrt-body">${readArg()}</span></span>` };
      if (name === "text" || name === "mathrm" || name === "operatorname" || name === "mathbf" || name === "mathbb") {
        return { html: `<span class="m-text">${readArg()}</span>` };
      }
      if (name === "left" || name === "right") {
        const ch = src[i] || "";
        i += 1;
        return { html: ch === "." ? "" : escapeHtml(ch) };
      }
      if (TEX_SYMBOLS[name]) return { html: `<span>${TEX_SYMBOLS[name]}</span>` };
      if (!name) {
        const ch = src[i] || "";
        i += 1;
        return { html: escapeHtml(ch) };
      }
      return { html: `<span>${escapeHtml(name)}</span>` };
    }
    function parseUntil(stop) {
      let out = "";
      while (i < src.length) {
        const ch = src[i];
        if (stop && ch === stop) break;
        if (ch === "\\") {
          out += command().html;
          continue;
        }
        if (ch === "{") {
          i += 1;
          out += parseUntil("}");
          i += 1;
          continue;
        }
        if (ch === "^" || ch === "_") {
          i += 1;
          const arg = readArg();
          out += ch === "^" ? `<sup>${arg}</sup>` : `<sub>${arg}</sub>`;
          continue;
        }
        if (ch === "&" || ch === " ") {
          i += 1;
          out += " ";
          continue;
        }
        out += escapeHtml(ch);
        i += 1;
      }
      return out;
    }
    return parseUntil(void 0);
  }
  function inlineNodes(text, prefix) {
    const out = [];
    const parts = String(text).split(/(\$\$[^$]+\$\$|\$[^$\n]+\$|\*\*[^*]+\*\*|`[^`]+`)/);
    parts.forEach((part, index) => {
      if (!part) return;
      const key = `${prefix}-${index}`;
      if (part.startsWith("$$") && part.endsWith("$$") && part.length > 4) {
        out.push(h("span", { key, className: "m-math", dangerouslySetInnerHTML: { __html: texToHtml(part.slice(2, -2)) } }));
      } else if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
        out.push(h("span", { key, className: "m-math", dangerouslySetInnerHTML: { __html: texToHtml(part.slice(1, -1)) } }));
      } else if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
        out.push(h("strong", { key }, part.slice(2, -2)));
      } else if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
        out.push(h("code", { key }, part.slice(1, -1)));
      } else {
        out.push(part);
      }
    });
    return out;
  }
  function Markdown({ text }) {
    const lines = String(text ?? "").split("\n");
    const blocks = [];
    let bullets = null;
    let bulletTag = "ul";
    let answer = null;
    let code = null;
    let codeLang = "";
    let counter = 0;
    const flushBullets = () => {
      if (bullets) {
        blocks.push(h(bulletTag, { key: `l${counter += 1}` }, bullets));
        bullets = null;
        bulletTag = "ul";
      }
    };
    const flushAnswer = () => {
      if (!answer) return;
      blocks.push(h("div", { key: `ans${counter += 1}`, className: "ll-answer" }, [
        answer.label ? h("div", { key: "l", className: "ll-answer-label" }, answer.label) : null,
        h("div", { key: "b" }, answer.items.map((item, index) => h("p", { key: index }, inlineNodes(item, `a${index}`))))
      ]));
      answer = null;
    };
    const flushCode = () => {
      const body = code.join("\n");
      code = null;
      if (codeLang === "svg") {
        blocks.push(h("img", {
          key: `fig${counter += 1}`,
          className: "ll-figure",
          alt: "\u793A\u610F\u56FE",
          src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(body)}`
        }));
        return;
      }
      blocks.push(h("pre", { key: `c${counter += 1}` }, h("code", null, body)));
    };
    for (let i = 0; i < lines.length; i += 1) {
      const rawLine = lines[i];
      const trimmed = rawLine.trim();
      if (code) {
        if (trimmed.startsWith("```")) flushCode();
        else code.push(rawLine);
        continue;
      }
      if (trimmed.startsWith("```")) {
        flushBullets();
        code = [];
        codeLang = trimmed.slice(3).trim().toLowerCase();
        continue;
      }
      if (/^\$\$[\s\S]*\$\$$/.test(trimmed) && trimmed.length > 4) {
        flushBullets();
        blocks.push(h("div", {
          key: `math${counter += 1}`,
          className: "ll-md ll-math-block m-math",
          dangerouslySetInnerHTML: { __html: texToHtml(trimmed.slice(2, -2)) }
        }));
        continue;
      }
      if (trimmed.startsWith("<details")) {
        flushBullets();
        const labelMatch = /<summary>([\s\S]*?)<\/summary>/.exec(trimmed);
        answer = { label: labelMatch ? labelMatch[1] : "\u7B54\u6848", items: [] };
        continue;
      }
      if (trimmed.startsWith("</details>")) {
        flushAnswer();
        continue;
      }
      if (answer) {
        const cleaned = trimmed.replace(/<\/?summary[^>]*>/g, "").replace(/<\/?details[^>]*>/g, "");
        if (cleaned) answer.items.push(cleaned);
        continue;
      }
      if (!trimmed) {
        flushBullets();
        continue;
      }
      if (/^-{3,}$/.test(trimmed) || /^\*{3,}$/.test(trimmed)) {
        flushBullets();
        blocks.push(h("hr", { key: `hr${counter += 1}` }));
        continue;
      }
      if (trimmed.startsWith("|") && lines[i + 1] && /^\|[\s:|-]+\|$/.test(lines[i + 1].trim())) {
        flushBullets();
        const head = trimmed.split("|").slice(1, -1).map((cell) => cell.trim());
        const rows = [];
        i += 2;
        while (i < lines.length && lines[i].trim().startsWith("|")) {
          rows.push(lines[i].trim().split("|").slice(1, -1).map((cell) => cell.trim()));
          i += 1;
        }
        i -= 1;
        blocks.push(h("table", { key: `t${counter += 1}` }, [
          h("thead", { key: "h" }, h("tr", null, head.map((cell, index) => h("th", { key: index }, inlineNodes(cell, `th${index}`))))),
          h("tbody", { key: "b" }, rows.map((row, rowIndex) => h(
            "tr",
            { key: rowIndex },
            row.map((cell, cellIndex) => h("td", { key: cellIndex }, inlineNodes(cell, `td${rowIndex}-${cellIndex}`)))
          )))
        ]));
        continue;
      }
      const heading = /^(#{1,6})\s+(.*)$/.exec(trimmed);
      if (heading) {
        flushBullets();
        const level = Math.min(heading[1].length, 3);
        blocks.push(h(`h${level}`, { key: `h${counter += 1}` }, inlineNodes(heading[2], `h${counter}`)));
        continue;
      }
      if (/^>\s?/.test(trimmed)) {
        flushBullets();
        blocks.push(h("blockquote", { key: `q${counter += 1}` }, inlineNodes(trimmed.replace(/^>\s?/, ""), `q${counter}`)));
        continue;
      }
      const ordered = /^\s*(\d+)\.\s+(.*)$/.exec(rawLine);
      if (ordered) {
        if (bulletTag !== "ol") {
          flushBullets();
          bulletTag = "ol";
        }
        bullets = bullets ?? [];
        bullets.push(h("li", { key: `li${counter += 1}` }, inlineNodes(ordered[2], `li${counter}`)));
        continue;
      }
      const bullet = /^\s*[-*+]\s+(.*)$/.exec(rawLine);
      if (bullet) {
        if (bulletTag !== "ul") {
          flushBullets();
          bulletTag = "ul";
        }
        bullets = bullets ?? [];
        bullets.push(h("li", { key: `li${counter += 1}` }, inlineNodes(bullet[1], `li${counter}`)));
        continue;
      }
      flushBullets();
      blocks.push(h("p", { key: `p${counter += 1}` }, inlineNodes(trimmed, `p${counter}`)));
    }
    if (code) flushCode();
    flushBullets();
    flushAnswer();
    return h("div", { className: "ll-md" }, blocks);
  }
  function SlideImage({ id, page, total, alt, zoom = 1 }) {
    const [shown, setShown] = useState(null);
    const shownRef = useRef(null);
    const imgRef = useRef(null);
    const [fit, setFit] = useState(null);
    useEffect(() => {
      const url = `${API}/slide?id=${encodeURIComponent(id)}&page=${page}`;
      if (shownRef.current === url) return;
      let cancelled = false;
      const image = new Image();
      image.onload = () => {
        if (cancelled) return;
        shownRef.current = url;
        setShown(url);
      };
      image.src = url;
      for (const delta of [-2, -1, 1, 2]) {
        const n = page + delta;
        if (n < 1 || n > total) continue;
        const pre = new Image();
        pre.src = `${API}/slide?id=${encodeURIComponent(id)}&page=${n}`;
      }
      return () => {
        cancelled = true;
      };
    }, [id, page, total]);
    useEffect(() => {
      if (!shown) return void 0;
      const img = imgRef.current;
      const media = img?.parentElement;
      if (!img || !media) return void 0;
      const measure = () => {
        const rect = media.getBoundingClientRect();
        const boxW = rect.width - 4;
        const boxH = rect.height - 4;
        const ratio = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 16 / 9;
        if (boxW <= 0 || boxH <= 0) return;
        const width = Math.min(boxW, boxH * ratio);
        const height = width / ratio;
        setFit((prev) => prev && Math.abs(prev.width - width) < 0.6 && Math.abs(prev.height - height) < 0.6 ? prev : { width, height });
      };
      measure();
      const observer = new ResizeObserver(measure);
      observer.observe(media);
      return () => observer.disconnect();
    }, [shown]);
    if (!shown) return h("div", { className: "ll-slide-ph" }, "\u6B63\u5728\u51C6\u5907\u8FD9\u4E00\u9875\u2026");
    const style = fit ? {
      width: `${Math.round(fit.width * zoom)}px`,
      height: `${Math.round(fit.height * zoom)}px`,
      maxWidth: "none",
      maxHeight: "none"
    } : void 0;
    return h("img", {
      ref: imgRef,
      className: "ll-slide",
      src: shown,
      alt,
      draggable: false,
      style
    });
  }
  function paintStrokes(canvas, strokes, width, height) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const stroke of strokes) {
      ctx.globalCompositeOperation = stroke.tool === "eraser" ? "destination-out" : "source-over";
      ctx.strokeStyle = stroke.color;
      ctx.fillStyle = stroke.color;
      ctx.lineWidth = Math.max(1, stroke.size * width);
      if (stroke.points.length === 1) {
        ctx.beginPath();
        ctx.arc(stroke.points[0].x * width, stroke.points[0].y * height, Math.max(1, stroke.size * width / 2), 0, Math.PI * 2);
        ctx.fill();
        continue;
      }
      ctx.beginPath();
      stroke.points.forEach((point, index) => {
        const x = point.x * width;
        const y = point.y * height;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }
    ctx.globalCompositeOperation = "source-over";
  }
  function InkLayer({ strokes, setStrokes, tool, color, page }) {
    const canvasRef = useRef(null);
    const drawing = useRef(null);
    const [box, setBox] = useState(null);
    useEffect(() => {
      const canvas = canvasRef.current;
      const media = canvas?.parentElement;
      if (!media) return void 0;
      const measure = () => {
        const img = media.querySelector("img");
        if (!img || !img.offsetWidth || !img.offsetHeight) return;
        setBox((prev) => {
          const next = {
            left: img.offsetLeft,
            top: img.offsetTop,
            width: img.offsetWidth,
            height: img.offsetHeight
          };
          if (prev && prev.left === next.left && prev.top === next.top && prev.width === next.width && prev.height === next.height) return prev;
          return next;
        });
      };
      const observed = /* @__PURE__ */ new WeakSet();
      const observeImage = () => {
        const img = media.querySelector("img");
        if (img && !observed.has(img)) {
          observed.add(img);
          resizeObserver.observe(img);
        }
      };
      const resizeObserver = new ResizeObserver(measure);
      resizeObserver.observe(media);
      observeImage();
      measure();
      const mutation = new MutationObserver(() => {
        observeImage();
        measure();
      });
      mutation.observe(media, { childList: true, subtree: true });
      window.addEventListener("resize", measure);
      return () => {
        resizeObserver.disconnect();
        mutation.disconnect();
        window.removeEventListener("resize", measure);
      };
    }, [page]);
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || !box) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(box.width * dpr);
      canvas.height = Math.round(box.height * dpr);
      canvas.style.width = `${box.width}px`;
      canvas.style.height = `${box.height}px`;
      paintStrokes(canvas, strokes, canvas.width, canvas.height);
    }, [strokes, box]);
    const pointOf = (event) => {
      const rect = canvasRef.current.getBoundingClientRect();
      return {
        x: Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1),
        y: Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1)
      };
    };
    return h("canvas", {
      ref: canvasRef,
      className: "ll-ink",
      style: box ? { left: box.left, top: box.top } : { display: "none" },
      onPointerDown: (event) => {
        if (!box) return;
        if (event.ctrlKey) return;
        event.preventDefault();
        canvasRef.current.setPointerCapture?.(event.pointerId);
        drawing.current = { tool, color, size: tool === "eraser" ? 0.014 : 35e-4, points: [pointOf(event)] };
        setStrokes((prev) => [...prev, drawing.current]);
      },
      onPointerMove: (event) => {
        if (!drawing.current) return;
        drawing.current.points.push(pointOf(event));
        setStrokes((prev) => [...prev]);
      },
      onPointerUp: () => {
        drawing.current = null;
      },
      onPointerCancel: () => {
        drawing.current = null;
      }
    });
  }
  function Panel() {
    const [server, setServer] = useState(null);
    const [panes, setPanes] = useState([]);
    const [focus, setFocus] = useState(0);
    const [tab, setTab] = useState("coach");
    const [railMode, setRailMode] = useState("decks");
    const [draft, setDraft] = useState("");
    const [withImage, setWithImage] = useState(false);
    const [allowDraw, setAllowDraw] = useState(false);
    const [scope, setScope] = useState("auto");
    const [busy, setBusy] = useState("");
    const [error, setError] = useState("");
    const [snack, setSnack] = useState("");
    const [picker, setPicker] = useState(false);
    const [files, setFiles] = useState([]);
    const [importing, setImporting] = useState(null);
    const [progress, setProgress] = useState(null);
    const [confirmSummary, setConfirmSummary] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editDraft, setEditDraft] = useState("");
    const [search, setSearch] = useState("");
    const [tool, setTool] = useState("pen");
    const [color, setColor] = useState(INK_COLORS[0]);
    const [accent, setAccent] = useState(() => {
      try {
        return localStorage.getItem("learnlab.accent") || "#7e0c6e";
      } catch {
        return "#7e0c6e";
      }
    });
    const [showSkin, setShowSkin] = useState(false);
    const [sourceDraft, setSourceDraft] = useState("");
    const [savingDir, setSavingDir] = useState(false);
    const [rightWidth, setRightWidth] = useState(() => {
      try {
        const value = Number(localStorage.getItem("learnlab.rightWidth"));
        return value >= MIN_RIGHT && value <= MAX_RIGHT ? value : 420;
      } catch {
        return 400;
      }
    });
    const [splitRatio, setSplitRatio] = useState(0.5);
    const [panning, setPanning] = useState(null);
    const [paneHeights, setPaneHeights] = useState([]);
    const paneRefs = useRef([]);
    const splitRef = useRef(null);
    const panRef = useRef(null);
    const zoomHintRef = useRef(false);
    const activeThumbRef = useRef(null);
    const [dragRight, setDragRight] = useState(false);
    const [dragSplit, setDragSplit] = useState(false);
    const [dropHint, setDropHint] = useState(null);
    const [transOpen, setTransOpen] = useState(false);
    const [transMode, setTransMode] = useState("page");
    const [transText, setTransText] = useState("");
    const [transOut, setTransOut] = useState("");
    const [transInfo, setTransInfo] = useState(null);
    const [transBusy, setTransBusy] = useState(false);
    const [transError, setTransError] = useState("");
    const [transTarget, setTransTarget] = useState("auto");
    const [transCfg, setTransCfg] = useState(null);
    const [transSettings, setTransSettings] = useState(false);
    const seq = useRef(0);
    const scrollRef = useRef(null);
    const stickRef = useRef(true);
    const chatAbort = useRef(null);
    const stageRef = useRef(null);
    const pane = panes[focus] ?? null;
    const deck = pane?.data?.deck ?? null;
    const pages = pane?.data?.pages?.pages ?? [];
    const page = pane?.page ?? 1;
    const messages = pane?.messages ?? [];
    const strokes = pane?.strokes ?? [];
    const current = pages[page - 1];
    const dual = panes.length > 1;
    const patchPane = useCallback((index, patch) => {
      setPanes((prev) => prev.map((item, i) => i === index ? { ...item, ...patch } : item));
    }, []);
    const patchData = useCallback((index, patch) => {
      setPanes((prev) => prev.map((item, i) => i === index ? { ...item, data: { ...item.data, ...patch } } : item));
    }, []);
    const setPaneMessages = useCallback((index, updater) => {
      setPanes((prev) => prev.map((item, i) => i === index ? { ...item, messages: updater(item.messages) } : item));
    }, []);
    const setPaneStrokes = useCallback((updater) => {
      setPanes((prev) => prev.map((item, i) => i === focus ? { ...item, strokes: updater(item.strokes) } : item));
    }, [focus]);
    const setPaneZoom = useCallback((value) => {
      const next = Math.min(Math.max(value, 0.4), 4);
      setPanes((prev) => prev.map((item, i) => i === focus ? { ...item, zoom: next } : item));
      if (next > 1.001 && !zoomHintRef.current) {
        zoomHintRef.current = true;
        setSnack("\u653E\u5927\u540E\u53EF\u4EE5\u6309\u4F4F Ctrl \u62D6\u52A8\u753B\u9762");
        window.setTimeout(() => setSnack(""), 3e3);
      }
    }, [focus]);
    const refreshServer = useCallback(async () => {
      const data = await api("/state");
      setServer(data);
      return data;
    }, []);
    const loadPane = useCallback(async (id) => {
      const data = await api(`/deck?id=${encodeURIComponent(id)}`);
      let next = 1;
      for (const entry of data.chat ?? []) {
        next = Math.max(next, Number(entry.page) || 1);
      }
      const messagesLoaded = (data.chat ?? []).map((entry) => [
        { id: `q${++seq.current}`, role: "q", text: entry.q, p: entry.page },
        {
          id: `a${++seq.current}`,
          role: "a",
          text: entry.a,
          p: entry.page,
          usage: entry.usage,
          ms: entry.ms,
          stopped: Boolean(entry.stopped)
        }
      ]).flat();
      const total = Math.max(data.deck.pageCount || 1, 1);
      const startPage = Math.min(Math.max(data.deck.progress || 1, 1), total);
      return { id, data, page: startPage, messages: messagesLoaded, strokes: [] };
    }, []);
    const openDeck = useCallback(async (id, options = {}) => {
      const { mode = "replace", at = focus } = options;
      setBusy("open");
      setError("");
      try {
        const loaded = await loadPane(id);
        const index = Math.min(Math.max(at, 0), Math.max(panes.length - 1, 0));
        let nextPanes;
        let nextFocus;
        if (mode === "top" && panes.length < 2) {
          nextPanes = [loaded, ...panes];
          nextFocus = 0;
        } else if (mode === "bottom" && panes.length < 2) {
          nextPanes = [...panes, loaded];
          nextFocus = panes.length;
        } else {
          nextPanes = panes.length ? [...panes] : [loaded];
          nextPanes[index] = loaded;
          nextFocus = panes.length ? index : 0;
        }
        setPanes(nextPanes);
        setFocus(nextFocus);
        setRailMode("pages");
      } catch (err) {
        setError(err.message);
      } finally {
        setBusy("");
      }
    }, [loadPane, panes, focus]);
    const closePane = (index) => {
      setPanes((prev) => prev.filter((_, i) => i !== index));
      setFocus(0);
    };
    useEffect(() => {
      let alive = true;
      (async () => {
        try {
          const data = await refreshServer();
          if (!alive) return;
          let saved = null;
          try {
            saved = JSON.parse(localStorage.getItem(LAYOUT_KEY) || "null");
          } catch {
            saved = null;
          }
          const wanted = Array.isArray(saved?.panes) ? saved.panes : [];
          const valid = wanted.filter((entry) => entry?.id && (data.decks ?? []).some((item) => item.id === entry.id)).slice(0, 2);
          if (valid.length) {
            const restored = [];
            for (const entry of valid) {
              const loaded = await loadPane(entry.id);
              const total = Math.max(loaded.data.deck.pageCount || 1, 1);
              loaded.page = Math.min(Math.max(Number(entry.page) || 1, 1), total);
              restored.push(loaded);
            }
            if (!alive) return;
            setPanes(restored);
            setFocus(Math.min(Math.max(Number(saved.focus) || 0, 0), restored.length - 1));
            if (typeof saved.splitRatio === "number") {
              setSplitRatio(Math.min(Math.max(saved.splitRatio, 0.06), 0.94));
            }
            setRailMode("pages");
            return;
          }
          if (data.decks?.length) openDeck(data.decks[0].id);
        } catch (err) {
          if (alive) setError(err.message);
        }
      })();
      return () => {
        alive = false;
      };
    }, []);
    useEffect(() => {
      if (scrollRef.current && stickRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, page, tab]);
    const layoutKey = `${panes.map((item) => `${item.id}@${item.page}`).join("|")}#${focus}#${splitRatio.toFixed(2)}`;
    useEffect(() => {
      if (!panes.length) return;
      try {
        localStorage.setItem(LAYOUT_KEY, JSON.stringify({
          panes: panes.map((item) => ({ id: item.id, page: item.page })),
          focus,
          splitRatio
        }));
      } catch {
      }
    }, [layoutKey]);
    useEffect(() => {
      if (transOpen) {
        api("/translate/config").then(setTransCfg).catch(() => {
        });
        if (transMode === "page") setTransText(current?.text || "");
      }
    }, [transOpen, transMode, page, pane?.id]);
    useEffect(() => {
      if (!dragRight) return void 0;
      const onMove = (event) => setRightWidth(Math.min(Math.max(window.innerWidth - event.clientX, MIN_RIGHT), MAX_RIGHT));
      const onUp = () => {
        setDragRight(false);
        try {
          localStorage.setItem("learnlab.rightWidth", String(rightWidth));
        } catch {
        }
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp, { once: true });
      return () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
    }, [dragRight, rightWidth]);
    useEffect(() => {
      if (!dragSplit) return void 0;
      const onMove = (event) => {
        const rect = splitRef.current?.getBoundingClientRect() ?? stageRef.current?.getBoundingClientRect();
        if (!rect || !rect.height) return;
        const ratio = (event.clientY - rect.top) / rect.height;
        setSplitRatio(Math.min(Math.max(ratio, 0.06), 0.94));
      };
      const onUp = () => setDragSplit(false);
      const previous = document.body.style.userSelect;
      document.body.style.userSelect = "none";
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp, { once: true });
      return () => {
        document.body.style.userSelect = previous;
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
    }, [dragSplit]);
    useEffect(() => {
      const observers = [];
      paneRefs.current.slice(0, panes.length).forEach((node, index) => {
        if (!node) return;
        const observer = new ResizeObserver((entries) => {
          const height = entries[0]?.contentRect?.height ?? 0;
          setPaneHeights((prev) => {
            if (Math.abs((prev[index] ?? 0) - height) < 1) return prev;
            const next = [...prev];
            next[index] = height;
            return next;
          });
        });
        observer.observe(node);
        observers.push(observer);
      });
      return () => observers.forEach((observer) => observer.disconnect());
    }, [panes.length]);
    const flash = (text) => {
      setSnack(text);
      window.setTimeout(() => setSnack(""), 2200);
    };
    useEffect(() => {
      if (railMode !== "pages") return;
      activeThumbRef.current?.scrollIntoView({ block: "nearest" });
    }, [page, railMode, panes[focus]?.id]);
    useEffect(() => {
      if (showSkin) setSourceDraft(server?.sourceDir ?? "");
    }, [showSkin]);
    useEffect(() => {
      if (deck?.kind === "docx" && scope !== "deck") setScope("deck");
    }, [deck?.kind]);
    useEffect(() => {
      try {
        localStorage.setItem("learnlab.accent", accent);
      } catch {
      }
    }, [accent]);
    const goPage = useCallback((next) => {
      if (!pane) return;
      const total = Math.max(pages.length, 1);
      const value = Math.min(Math.max(next ?? page, 1), total);
      if (value === page) return;
      patchPane(focus, { page: value, strokes: [] });
      post("/progress", { id: pane.id, page: value }).catch(() => {
      });
    }, [pane, pages.length, page, focus, patchPane]);
    useEffect(() => {
      const onKey = (event) => {
        if (!pane) return;
        const tag = (event.target?.tagName || "").toLowerCase();
        if (tag === "input" || tag === "textarea" || tag === "select") return;
        if ((event.ctrlKey || event.metaKey) && String(event.key).toLowerCase() === "z") {
          event.preventDefault();
          setPaneStrokes((prev) => prev.slice(0, -1));
          return;
        }
        if (event.key === "ArrowLeft") goPage(page - 1);
        if (event.key === "ArrowRight") goPage(page + 1);
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [pane, page, goPage, setPaneStrokes]);
    useEffect(() => {
      const handler = (event) => {
        if (!event.ctrlKey) return;
        const view = event.target?.closest?.(".ll-view");
        if (!view) return;
        const index = Number(view.dataset.pane);
        if (Number.isNaN(index)) return;
        event.preventDefault();
        const step = event.deltaY > 0 ? -0.12 : 0.12;
        setPanes((prev) => prev.map((item, i) => i === index ? { ...item, zoom: Math.min(Math.max((item.zoom ?? 1) + step, 0.4), 4) } : item));
      };
      window.addEventListener("wheel", handler, { passive: false });
      return () => window.removeEventListener("wheel", handler);
    }, []);
    const openPicker = async () => {
      setPicker(true);
      setBusy("files");
      try {
        const data = await api("/files");
        setFiles(data.files ?? []);
      } catch (err) {
        setError(err.message);
      } finally {
        setBusy("");
      }
    };
    const doImport = async (filePath) => {
      if (importing) return;
      const phases = {
        parse: { label: "\u89E3\u6790\u6587\u5B57", from: 12, to: 26 },
        render: { label: "\u8F6C\u6362\u9875\u9762", from: 30, to: 86 },
        save: { label: "\u5199\u5165\u8BFE\u4EF6", from: 90, to: 96 },
        reused: { label: "\u5DF2\u5728\u8BFE\u4EF6\u5E93", from: 100, to: 100 }
      };
      setImporting({ path: filePath, label: "\u51C6\u5907\u4E2D", percent: 6 });
      setError("");
      let created = null;
      let ceiling = 26;
      const creep = window.setInterval(() => {
        setImporting((prev) => {
          if (!prev) return prev;
          const next = Math.min(prev.percent + 1, ceiling);
          return next === prev.percent ? prev : { ...prev, percent: next };
        });
      }, 420);
      try {
        await stream("/import", { path: filePath }, (event) => {
          if (event.type === "phase") {
            const phase = phases[event.phase];
            if (phase) {
              ceiling = phase.to;
              setImporting((prev) => prev ? { ...prev, label: phase.label, percent: Math.max(prev.percent, phase.from) } : prev);
            }
          } else if (event.type === "done") {
            created = event.deck;
            ceiling = 100;
            setImporting((prev) => prev ? { ...prev, label: "\u5B8C\u6210", percent: 100 } : prev);
          } else if (event.type === "error") {
            setError(event.message);
          }
        });
        if (created) {
          setPicker(false);
          await refreshServer();
          await openDeck(created.id);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        window.clearInterval(creep);
        setImporting(null);
      }
    };
    const saveSourceDir = async (value) => {
      setSavingDir(true);
      try {
        const data = await post("/settings", { sourceDir: value });
        await refreshServer();
        setSourceDraft(data.sourceDir);
        flash(value ? "\u8BFE\u4EF6\u6587\u4EF6\u5939\u5DF2\u66F4\u65B0" : "\u5DF2\u6062\u590D\u9ED8\u8BA4\u6587\u4EF6\u5939");
      } catch (err) {
        setError(err.message);
      } finally {
        setSavingDir(false);
      }
    };
    const removeDeck = async (item) => {
      setConfirmDelete(null);
      if (!item) return;
      try {
        await post("/deck/delete", { id: item.id });
        const data = await refreshServer();
        setPanes((prev) => prev.filter((paneItem) => paneItem.id !== item.id));
        setFocus(0);
        if (!(data.decks ?? []).length) setRailMode("decks");
        flash(`\u5DF2\u5220\u9664\u300A${item.title}\u300B`);
      } catch (err) {
        setError(err.message);
      }
    };
    const composeAnnotated = async (target) => {
      const url = `${API}/slide?id=${encodeURIComponent(target.id)}&page=${target.page}`;
      const image = new Image();
      image.src = url;
      await image.decode();
      const width = image.naturalWidth;
      const height = image.naturalHeight;
      const ink = document.createElement("canvas");
      ink.width = width;
      ink.height = height;
      paintStrokes(ink, target.strokes ?? [], width, height);
      const out = document.createElement("canvas");
      out.width = width;
      out.height = height;
      const ctx = out.getContext("2d");
      ctx.drawImage(image, 0, 0);
      ctx.drawImage(ink, 0, 0);
      return out.toDataURL("image/png");
    };
    const saveSnapshot = async () => {
      if (!pane) return;
      try {
        const data = await composeAnnotated(pane);
        const result = await post("/snapshot", { id: pane.id, page, data });
        flash(`\u5DF2\u5B58\u5230 snapshots \xB7 ${result.path.split(/[\\/]/).pop()}`);
      } catch (err) {
        setError(err.message);
      }
    };
    const ask = async (question, base, keepQuestion, replaceLast = false) => {
      if (!question || !pane) return;
      if (busy === "chat") return;
      const index = focus;
      const target = pane;
      setError("");
      const history = base.filter((item) => item.p === page).reduce((acc, item, i, all) => {
        if (item.role === "q" && all[i + 1]?.role === "a") acc.push({ q: item.text, a: all[i + 1].text });
        return acc;
      }, []).slice(-6);
      const qid = `q${++seq.current}`;
      const aid = `a${++seq.current}`;
      const annotated = target.strokes.length ? await composeAnnotated(target).catch(() => null) : null;
      const seeded = keepQuestion ? base : [...base, { id: qid, role: "q", text: question, p: page }];
      const startedAt = Date.now();
      setPaneMessages(index, () => [...seeded, { id: aid, role: "a", text: "", p: page, streaming: true }]);
      setEditingId(null);
      stickRef.current = true;
      setBusy("chat");
      const controller = new AbortController();
      chatAbort.current = controller;
      try {
        await stream("/chat", {
          id: target.id,
          page,
          question,
          withImage,
          scope,
          allowDraw,
          history,
          replaceLast,
          ...annotated ? { annotatedImage: annotated } : {}
        }, (event) => {
          if (event.type === "scope") {
            setPaneMessages(index, (list) => list.map((item) => item.id === aid ? { ...item, scope: event.label, hasImage: event.withImage } : item));
          } else if (event.type === "delta") {
            setPaneMessages(index, (list) => list.map((item) => item.id === aid ? { ...item, text: item.text + event.text } : item));
          } else if (event.type === "usage") {
            setPaneMessages(index, (list) => list.map((item) => item.id === aid ? { ...item, usage: event.usage } : item));
          } else if (event.type === "error") {
            setError(event.message);
            setPaneMessages(index, (list) => list.map((item) => item.id === aid ? { ...item, streaming: false, failed: true } : item));
          } else if (event.type === "done") {
            setPaneMessages(index, (list) => list.map((item) => item.id === aid ? { ...item, streaming: false, usage: event.usage ?? item.usage, ms: Date.now() - startedAt } : item));
          }
        }, controller.signal);
        if (annotated) setPaneStrokes(() => []);
      } catch (err) {
        if (err.name === "AbortError") {
          setPaneMessages(index, (list) => list.map((item) => item.id === aid ? { ...item, streaming: false, stopped: true, ms: Date.now() - startedAt } : item));
        } else {
          setError(err.message);
        }
      } finally {
        chatAbort.current = null;
        setBusy("");
        setPaneMessages(index, (list) => list.map((item) => item.streaming ? { ...item, streaming: false, ms: item.ms ?? Date.now() - startedAt } : item));
      }
    };
    const stopChat = () => {
      chatAbort.current?.abort();
    };
    const send = async () => {
      const question = draft.trim();
      if (!question || busy) return;
      setDraft("");
      await ask(question, messages, false);
    };
    const regenerate = async (answerId) => {
      if (busy) return;
      const index = messages.findIndex((item) => item.id === answerId);
      if (index < 0) return;
      await ask(messages[index - 1]?.text ?? "", messages.slice(0, index), true, true);
    };
    const editQuestion = async (questionId, text) => {
      const next = String(text ?? "").trim();
      if (!next || busy) return;
      const index = messages.findIndex((item) => item.id === questionId);
      if (index < 0) return;
      await ask(next, [...messages.slice(0, index), { ...messages[index], text: next }], true, true);
    };
    const saveNote = async (text, pageNo) => {
      if (!pane) return;
      try {
        const data = await post("/note", { id: pane.id, page: pageNo ?? page, title: current?.title ?? "", text });
        patchData(focus, { notes: data.notes ?? "" });
        return true;
      } catch (err) {
        setError(err.message);
        return false;
      }
    };
    const saveNotesFile = async (text) => {
      if (!pane) return;
      try {
        await post("/notes", { id: pane.id, text });
        patchData(focus, { notes: text });
      } catch (err) {
        setError(err.message);
      }
    };
    const appendSummary = (index, text) => {
      setPanes((prev) => prev.map((item, i) => i === index ? { ...item, data: { ...item.data, summary: `${item.data.summary ?? ""}${text}` } } : item));
    };
    const runSummary = async () => {
      if (!pane || busy) return;
      const index = focus;
      setConfirmSummary(false);
      setBusy("summary");
      setTab("summary");
      patchData(index, { summary: "" });
      setError("");
      try {
        await stream("/summary", { id: pane.id }, (event) => {
          if (event.type === "delta") appendSummary(index, event.text);
          else if (event.type === "error") setError(event.message);
          else if (event.type === "done") patchData(index, { summary: event.markdown });
        });
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setBusy("");
      }
    };
    const runTranscribe = async (onlyPage) => {
      if (!pane || busy) return;
      setBusy("transcribe");
      setError("");
      const total = onlyPage ? 1 : pages.length;
      let done = 0;
      setProgress({ done: 0, total });
      try {
        await stream("/transcribe", { id: pane.id, pages: onlyPage ? [onlyPage] : void 0 }, (event) => {
          if (event.type === "page-start") setProgress({ done, total, page: event.page });
          else if (event.type === "page-done") {
            done += 1;
            setProgress({ done, total, page: event.page });
          } else if (event.type === "error") setError(event.message);
        });
        const reloaded = await loadPane(pane.id);
        setPanes((prev) => prev.map((item, i) => i === focus ? { ...reloaded, strokes: [] } : item));
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setBusy("");
        setProgress(null);
      }
    };
    const stopTranscribe = () => {
      setBusy("");
      setProgress(null);
    };
    const runTranslate = async () => {
      const text = transText.trim();
      if (!text || transBusy) return;
      setTransBusy(true);
      setTransError("");
      setTransOut("");
      try {
        const result = await post("/translate", { text, to: transTarget === "auto" ? void 0 : transTarget });
        setTransOut(result.text);
        setTransInfo(result);
      } catch (err) {
        setTransError(err.message);
      } finally {
        setTransBusy(false);
      }
    };
    const saveTransConfig = async () => {
      try {
        const payload = {
          provider: transCfg?.provider ?? "auto",
          appid: transCfg?.appid ?? ""
        };
        if (transCfg?.key) payload.key = transCfg.key;
        const next = await post("/translate/config", payload);
        setTransCfg({ ...next, key: "" });
        flash("\u7FFB\u8BD1\u8BBE\u7F6E\u5DF2\u4FDD\u5B58");
      } catch (err) {
        setTransError(err.message);
      }
    };
    const pageMessages = messages.filter((item) => item.p === page);
    const lastQ = [...pageMessages].reverse().find((item) => item.role === "q");
    const lastA = [...pageMessages].reverse().find((item) => item.role === "a" && !item.streaming);
    const noPageText = pages.length > 0 && !pages.some((item) => (item.chars || 0) > 0);
    const pageHasText = Boolean(current?.text);
    const needsText = deck && !pageHasText && !deck.fullText;
    const thinking = busy === "chat";
    const isDoc = deck?.kind === "docx";
    const scopeHint = isDoc ? "\u8FD9\u662F Word \u6587\u6863\uFF1A\u6587\u5B57\u662F\u6574\u7BC7\u7684\uFF0C\u4F1A\u6574\u4EFD\u53D1\u7ED9\u6559\u7EC3\uFF0C\u9875\u7801\u53EA\u7528\u6765\u5B9A\u4F4D\u56FE\u7247\u3002" : scope === "page" ? "\u8FD9\u6B21\u53EA\u628A\u5F53\u524D\u8FD9\u4E00\u9875\u53D1\u7ED9\u6559\u7EC3\u3002" : scope === "deck" ? "\u8FD9\u6B21\u628A\u6574\u4EFD\u8BFE\u4EF6\u6B63\u6587\u53D1\u7ED9\u6559\u7EC3\uFF0C\u9002\u5408\u95EE\u8DE8\u9875\u7684\u95EE\u9898\u3002" : "\u81EA\u52A8\uFF1A\u5E26\u8FD9\u4E00\u9875\u548C\u524D\u540E 3 \u9875\u7684\u6B63\u6587\uFF0C\u5916\u52A0\u5168\u7BC7\u5927\u7EB2\u3002";
    const results = useMemo(() => {
      const query = search.trim().toLowerCase();
      if (!query || !pages.length) return [];
      return pages.map((item) => {
        const text = String(item.text || "");
        const at = text.toLowerCase().indexOf(query);
        if (at < 0 && !String(item.title || "").toLowerCase().includes(query)) return null;
        const from = Math.max(0, at - 30);
        return {
          page: item.page,
          title: item.title || `\u7B2C ${item.page} \u9875`,
          snippet: at < 0 ? text.slice(0, 60) : `${from > 0 ? "\u2026" : ""}${text.slice(from, at + query.length + 50)}\u2026`
        };
      }).filter(Boolean).slice(0, 24);
    }, [search, pages]);
    const renderMessage = (item) => {
      if (item.role === "q" && editingId === item.id) {
        return h("div", { key: item.id, className: "ll-msg ll-edit" }, [
          h("textarea", {
            key: "ta",
            value: editDraft,
            autoFocus: true,
            onChange: (event) => setEditDraft(event.target.value),
            onKeyDown: (event) => {
              if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                editQuestion(item.id, editDraft);
              }
              if (event.key === "Escape") setEditingId(null);
            }
          }),
          h("div", { key: "row", style: { display: "flex", gap: 8, justifyContent: "flex-end" } }, [
            h("button", { key: "c", className: "ll-btn", onClick: () => setEditingId(null) }, "\u53D6\u6D88"),
            h("button", {
              key: "s",
              className: "ll-btn ll-send",
              disabled: Boolean(busy) || !editDraft.trim(),
              onClick: () => editQuestion(item.id, editDraft)
            }, "\u4FDD\u5B58\u5E76\u91CD\u53D1")
          ])
        ]);
      }
      return h("div", { key: item.id, className: "ll-msg" }, [
        item.role === "q" ? h("div", { key: "q", className: "ll-msg-q" }, item.text) : h("div", { key: "a", className: "ll-msg-a" }, [
          item.scope || item.hasImage ? h("div", { key: "meta", className: "ll-msg-meta" }, [
            item.scope ? h("span", { key: "s", className: "ll-scope-tag" }, `\u4E0A\u4E0B\u6587\uFF1A${item.scope}`) : null,
            item.hasImage ? h("span", { key: "i" }, "\u542B\u9875\u9762\u56FE\u7247") : null
          ]) : null,
          item.streaming && !item.text ? h("div", { key: "think", className: "ll-thinking" }, [
            h("span", { key: "d", className: "ll-dots" }, [h("i", { key: 1 }), h("i", { key: 2 }), h("i", { key: 3 })]),
            h("span", { key: "t" }, `\u6B63\u5728\u8BFB\u7B2C ${item.p} \u9875\u2026`)
          ]) : item.text ? h("div", { key: "body" }, h(Markdown, { text: item.text })) : h(
            "div",
            { key: "body", className: "ll-hint" },
            item.stopped ? "\uFF08\u5DF2\u6682\u505C\uFF0C\u8FD9\u4E00\u95EE\u6CA1\u6709\u751F\u6210\u5185\u5BB9\u3002\u53EF\u4EE5\u300C\u6539\u95EE\u9898\u300D\u540E\u91CD\u53D1\u3002\uFF09" : item.failed ? "\uFF08\u8FD9\u4E00\u95EE\u51FA\u9519\u4E86\uFF0C\u53EF\u4EE5\u91CD\u65B0\u751F\u6210\u3002\uFF09" : ""
          ),
          item.role === "a" && !item.streaming && (item.text || item.stopped || item.failed) ? h("div", { key: "act", className: "ll-msg-meta ll-msg-actions" }, [
            item.text ? h("button", {
              key: "save",
              className: "ll-act",
              onClick: () => saveNote(item.text, item.p).then(() => setTab("notes"))
            }, [h(icons_default, { key: "i", name: "note", size: 13 }), h("span", { key: "t" }, "\u5B58\u4E3A\u7B14\u8BB0")]) : null,
            item.text ? h("button", {
              key: "copy",
              className: "ll-act",
              onClick: () => navigator.clipboard?.writeText(item.text)
            }, [h(icons_default, { key: "i", name: "copy", size: 13 }), h("span", { key: "t" }, "\u590D\u5236")]) : null,
            lastA && lastA.id === item.id ? h("button", {
              key: "regen",
              className: "ll-act",
              onClick: () => regenerate(item.id),
              disabled: Boolean(busy)
            }, [h(icons_default, { key: "i", name: "regen", size: 13 }), h("span", { key: "t" }, "\u91CD\u65B0\u751F\u6210")]) : null,
            lastQ && lastA && lastA.id === item.id ? h("button", {
              key: "edit",
              className: "ll-act",
              onClick: () => {
                setEditingId(lastQ.id);
                setEditDraft(lastQ.text);
              },
              disabled: Boolean(busy)
            }, [h(icons_default, { key: "i", name: "edit", size: 13 }), h("span", { key: "t" }, "\u6539\u95EE\u9898")]) : null,
            h("span", { key: "grow", style: { flex: 1 } }),
            item.stopped ? h("span", { key: "stop" }, "\u5DF2\u6682\u505C") : null,
            item.ms ? h("span", { key: "ms", title: "\u751F\u6210\u7528\u65F6" }, fmtDuration(item.ms)) : null,
            item.usage ? h(
              "span",
              { key: "u", title: "\u672C\u6B21\u8C03\u7528\u7684 token \u7528\u91CF" },
              `\u2191${fmtTokens(item.usage.inputTokens)} \u2193${fmtTokens(item.usage.outputTokens)}`
            ) : null
          ]) : null
        ])
      ]);
    };
    const coachBody = !deck ? h("div", { className: "ll-empty" }, [
      h(icons_default, { key: "i", name: "book", size: 22 }),
      h("div", { key: "t", className: "ll-empty-title" }, "\u5148\u9009\u4E00\u4EFD\u8BFE\u4EF6")
    ]) : pageMessages.length === 0 ? h("div", { className: "ll-empty" }, [
      h(icons_default, { key: "i", name: "chat", size: 22 }),
      h("div", { key: "x", className: "ll-empty-title" }, `\u7B2C ${page} \u9875\uFF0C\u6709\u4EC0\u4E48\u60F3\u5F04\u6E05\u695A\u7684\uFF1F`),
      h("div", { key: "y", className: "ll-hint" }, scopeHint)
    ]) : [h("div", { className: "ll-page-tag", key: "tag" }, `\u7B2C ${page} \u9875`)].concat(pageMessages.map(renderMessage));
    const railBody = railMode === "pages" && deck ? pages.map((item) => h("div", {
      key: item.page,
      ref: item.page === page ? activeThumbRef : void 0,
      className: `ll-thumb${item.page === page ? " is-active" : ""}`,
      onClick: () => goPage(item.page)
    }, [
      h("img", {
        key: "img",
        className: "ll-thumb-img",
        src: `${API}/slide?id=${encodeURIComponent(deck.id)}&page=${item.page}`,
        loading: "lazy",
        alt: "",
        draggable: false
      }),
      h("div", { key: "tx", className: "ll-thumb-text" }, [
        h("div", { key: "no", className: "ll-thumb-no" }, `\u7B2C ${item.page} \u9875`),
        h("div", { key: "ti", className: "ll-thumb-title" }, item.title || "")
      ])
    ])) : !server ? h("div", { className: "ll-hint", style: { padding: "10px 12px" } }, "\u6B63\u5728\u8F7D\u5165\u2026") : (server.decks ?? []).length === 0 ? h("div", { className: "ll-hint", style: { padding: "10px 12px" } }, "\u8FD8\u6CA1\u6709\u8BFE\u4EF6\u3002\u70B9\u53F3\u4E0A\u89D2\u300C\u5BFC\u5165\u300D\uFF0C\u6311\u4E00\u4E2A\u5DE5\u4F5C\u533A\u91CC\u7684 pptx \u6216 pdf\u3002") : server.decks.map((item) => {
      const percent = Math.round((item.progress || 1) / Math.max(item.pageCount || 1, 1) * 100);
      return h("div", {
        key: item.id,
        className: `ll-deck${deck?.id === item.id ? " is-active" : ""}`,
        draggable: true,
        onDragStart: (event) => {
          event.dataTransfer.setData(DECK_MIME, item.id);
          event.dataTransfer.effectAllowed = "copy";
        },
        onClick: () => openDeck(item.id)
      }, [
        h("div", { className: "ll-deck-name", key: "n" }, item.title),
        h("button", {
          key: "del",
          className: "ll-ibtn ll-deck-del",
          title: "\u4ECE\u8BFE\u4EF6\u5E93\u5220\u9664",
          "aria-label": `\u5220\u9664 ${item.title}`,
          onClick: (event) => {
            event.stopPropagation();
            setConfirmDelete(item);
          }
        }, h(icons_default, { name: "clear", size: 13 })),
        h("div", { className: "ll-deck-meta", key: "m" }, [
          h("span", { key: "p" }, `\u7B2C ${item.progress || 1} / ${item.pageCount || 0} \u9875`),
          h("span", { key: "k" }, item.kind === "pdf" ? "PDF" : item.kind === "docx" ? "DOC" : "PPT")
        ]),
        h("div", { className: "ll-bar", key: "bar" }, h("i", { style: { width: `${Math.min(percent, 100)}%` } }))
      ]);
    });
    const renderPane = (index) => {
      const item = panes[index];
      if (!item) return null;
      const isFocus = index === focus;
      const total = item.data?.pages?.pages?.length ?? 0;
      const title = item.data?.deck?.title ?? "";
      const pageNo = item.page;
      const showChrome = panes.length > 1;
      const height = paneHeights[index] ?? 0;
      const tiny = height > 0 && height < 150;
      return h("div", {
        key: `${item.id}-${index}`,
        ref: (node) => {
          paneRefs.current[index] = node;
        },
        "data-pane": index,
        className: `ll-view${showChrome ? " is-dual" : ""}${isFocus && showChrome ? " is-focus" : ""}`,
        onPointerDown: () => {
          if (focus !== index) setFocus(index);
        }
      }, [
        showChrome ? h("div", { key: "head", className: "ll-view-head" }, [
          h("div", { key: "t", className: "ll-view-title" }, `${title} \xB7 \u7B2C ${pageNo} / ${total} \u9875`),
          (item.zoom ?? 1) !== 1 ? h("span", { key: "z", className: "ll-zoom-badge" }, `${Math.round((item.zoom ?? 1) * 100)}%`) : null,
          h("button", {
            key: "x",
            className: "ll-ibtn ll-view-close",
            title: "\u5173\u95ED\u8FD9\u4E00\u4EFD",
            "aria-label": "\u5173\u95ED\u8FD9\u4E00\u4EFD",
            onClick: (event) => {
              event.stopPropagation();
              closePane(index);
            }
          }, h(icons_default, { name: "close", size: 14 }))
        ]) : null,
        tiny ? h(
          "div",
          { key: "tiny", className: "ll-view-titleonly" },
          `${title} \xB7 \u7B2C ${pageNo} \u9875\uFF08\u533A\u5757\u592A\u77EE\uFF0C\u53EA\u663E\u793A\u6807\u9898\uFF09`
        ) : h("div", {
          key: "media",
          className: `ll-media${(item.zoom ?? 1) > 1 ? " is-zoomed" : ""}${panning === index ? " is-panning" : ""}`,
          title: (item.zoom ?? 1) > 1 ? "\u6309\u4F4F Ctrl \u62D6\u52A8\u53EF\u4EE5\u5E73\u79FB\u753B\u9762" : void 0,
          onPointerDown: (event) => {
            if (!event.ctrlKey || (item.zoom ?? 1) <= 1.001) return;
            event.preventDefault();
            const node = event.currentTarget;
            panRef.current = {
              x: event.clientX,
              y: event.clientY,
              left: node.scrollLeft,
              top: node.scrollTop,
              node
            };
            node.setPointerCapture?.(event.pointerId);
            setPanning(index);
          },
          onPointerMove: (event) => {
            const pan = panRef.current;
            if (!pan) return;
            pan.node.scrollLeft = pan.left - (event.clientX - pan.x);
            pan.node.scrollTop = pan.top - (event.clientY - pan.y);
          },
          onPointerUp: () => {
            panRef.current = null;
            setPanning(null);
          },
          onPointerCancel: () => {
            panRef.current = null;
            setPanning(null);
          }
        }, [
          h(SlideImage, { key: "img", id: item.id, page: pageNo, total, alt: title, zoom: item.zoom ?? 1 }),
          isFocus ? h(InkLayer, {
            key: "ink",
            strokes: item.strokes ?? [],
            setStrokes: setPaneStrokes,
            tool,
            color,
            page: pageNo
          }) : null,
          isFocus ? h("div", {
            key: "prev",
            className: "ll-zone is-prev",
            onClick: () => goPage(pageNo - 1),
            title: "\u4E0A\u4E00\u9875",
            style: pageNo <= 1 ? { display: "none" } : void 0
          }, h(icons_default, { name: "prev", size: 22 })) : null,
          isFocus ? h("div", {
            key: "next",
            className: "ll-zone is-next",
            onClick: () => goPage(pageNo + 1),
            title: "\u4E0B\u4E00\u9875",
            style: pageNo >= total ? { display: "none" } : void 0
          }, h(icons_default, { name: "next", size: 22 })) : null
        ])
      ]);
    };
    return h("div", {
      className: "ll-root",
      style: {
        position: "relative",
        "--ll-accent": accent,
        "--ll-accent-ink": `color-mix(in srgb, ${accent} 68%, var(--dsw-alias-label-primary))`,
        "--ll-accent-soft": `color-mix(in srgb, ${accent} 14%, transparent)`,
        "--dsw-alias-brand-primary": accent
      }
    }, [
      h("style", { key: "css" }, CSS),
      h("div", { className: "ll-rail", key: "rail" }, [
        h("div", { className: "ll-rail-head", key: "head" }, railMode === "pages" && deck ? [
          h("button", {
            key: "back",
            className: "ll-ibtn",
            onClick: () => setRailMode("decks"),
            title: "\u8FD4\u56DE\u8BFE\u4EF6\u5217\u8868",
            "aria-label": "\u8FD4\u56DE\u8BFE\u4EF6\u5217\u8868"
          }, h(icons_default, { name: "back" })),
          h("div", { key: "t", className: "ll-rail-title" }, deck.title),
          h("button", {
            key: "add",
            className: "ll-ibtn",
            onClick: openPicker,
            disabled: Boolean(importing),
            title: "\u5BFC\u5165\u8BFE\u4EF6",
            "aria-label": "\u5BFC\u5165\u8BFE\u4EF6"
          }, h(icons_default, { name: "plus" }))
        ] : [
          h("div", { key: "t", className: "ll-rail-title" }, "\u5B66\u4E60\u7A7A\u95F4"),
          h("button", {
            key: "add",
            className: "ll-btn",
            onClick: openPicker,
            disabled: Boolean(importing),
            style: { gap: 6 }
          }, [h(icons_default, { key: "i", name: "plus", size: 14 }), h("span", { key: "t" }, "\u5BFC\u5165")])
        ]),
        h("div", { className: "ll-rail-list", key: "list" }, railBody),
        h("div", { className: "ll-rail-foot", key: "foot" }, [
          h("button", {
            key: "skin",
            className: `ll-ibtn${showSkin ? " is-active" : ""}`,
            title: "\u8BBE\u7F6E",
            "aria-label": "\u8BBE\u7F6E",
            onClick: () => setShowSkin((prev) => !prev)
          }, h(icons_default, { name: "settings", size: 15 }))
        ]),
        showSkin ? h("div", { key: "skin-panel", className: "ll-skin" }, [
          h("div", { key: "mt", className: "ll-skin-title" }, "\u6A21\u578B"),
          h("div", { key: "mc", className: "ll-skin-text" }, "\u6559\u7EC3\u6A21\u578B\u8DDF\u968F DSH \u9ED8\u8BA4\u6A21\u578B"),
          h(
            "div",
            { key: "mv", className: "ll-skin-sub" },
            server?.model?.model ? `\u5F53\u524D\uFF1A${server.model.model}` : "\u5F53\u524D\uFF1A\u672A\u9009\u62E9\u6A21\u578B"
          ),
          h("div", { key: "hr", className: "ll-skin-hr" }),
          h("div", { key: "ct", className: "ll-skin-title" }, "\u4E3B\u9898\u8272"),
          h("div", { key: "sw", className: "ll-skin-row" }, ACCENTS.map((value) => h("button", {
            key: value,
            className: `ll-skin-dot${accent.toLowerCase() === value ? " is-active" : ""}`,
            style: { background: value },
            title: value,
            "aria-label": `\u4E3B\u9898\u8272 ${value}`,
            onClick: () => setAccent(value)
          }))),
          h("div", { key: "custom", className: "ll-skin-row" }, [
            h("label", { key: "l", className: "ll-skin-custom" }, [
              h("input", {
                key: "i",
                type: "color",
                value: accent,
                onChange: (event) => setAccent(event.target.value),
                "aria-label": "\u81EA\u5B9A\u4E49\u4E3B\u9898\u8272"
              }),
              h("span", { key: "t" }, "\u81EA\u5B9A\u4E49")
            ]),
            h("span", { key: "g", className: "ll-grow" }),
            h("button", {
              key: "reset",
              className: "ll-btn",
              onClick: () => setAccent("#7e0c6e")
            }, "\u6062\u590D\u9ED8\u8BA4")
          ]),
          h("div", { key: "hr2", className: "ll-skin-hr" }),
          h("div", { key: "ft", className: "ll-skin-title" }, "\u8BFE\u4EF6\u6587\u4EF6\u5939"),
          h("div", { key: "fc", className: "ll-skin-text" }, "\u300C\u5BFC\u5165\u300D\u4F1A\u4ECE\u8FD9\u4E2A\u6587\u4EF6\u5939\u91CC\u627E\u8BFE\u4EF6"),
          h("input", {
            key: "fi",
            className: "ll-skin-input",
            value: sourceDraft,
            spellCheck: false,
            placeholder: server?.defaultSourceDir ?? "\u8BFE\u4EF6\u6E90\u6587\u4EF6\u76EE\u5F55",
            onChange: (event) => setSourceDraft(event.target.value),
            onKeyDown: (event) => {
              if (event.key === "Enter") saveSourceDir(sourceDraft);
              if (event.key === "Escape") setSourceDraft(server?.sourceDir ?? "");
            }
          }),
          h("div", { key: "fr", className: "ll-skin-row", style: { marginTop: 8 } }, [
            h("button", {
              key: "save",
              className: "ll-btn",
              disabled: savingDir || !sourceDraft.trim() || sourceDraft.trim() === (server?.sourceDir ?? ""),
              onClick: () => saveSourceDir(sourceDraft)
            }, savingDir ? "\u4FDD\u5B58\u4E2D\u2026" : "\u4FDD\u5B58"),
            h("span", { key: "g", className: "ll-grow" }),
            h("button", {
              key: "def",
              className: "ll-btn-ghost",
              disabled: savingDir,
              onClick: () => saveSourceDir(""),
              title: server?.defaultSourceDir ?? ""
            }, "\u6062\u590D\u9ED8\u8BA4")
          ])
        ]) : null
      ]),
      h("div", { className: "ll-main", key: "main" }, [
        h("div", { className: "ll-head", key: "head" }, deck ? [
          h("div", { className: "ll-head-title", key: "t" }, deck.title),
          panes.length > 1 ? h("span", { key: "cmp", className: "ll-badge" }, [
            h(icons_default, { key: "i", name: "compare", size: 12 }),
            h("span", { key: "t" }, `${panes.length} \u4EFD\u5BF9\u6BD4`)
          ]) : null,
          h("span", { key: "g", style: { flex: 1 } }),
          h("div", { key: "search", className: "ll-search" }, [
            h("input", {
              key: "in",
              value: search,
              placeholder: "\u641C\u7D22\u8BFE\u4EF6\u91CC\u7684\u6587\u5B57\u2026",
              onChange: (event) => setSearch(event.target.value),
              onKeyDown: (event) => {
                if (event.key === "Escape") setSearch("");
              }
            }),
            search.trim() && results.length ? h("div", { key: "res", className: "ll-results" }, results.map((item) => h("div", {
              key: item.page,
              className: "ll-result",
              onClick: () => {
                goPage(item.page);
                setSearch("");
              }
            }, [
              h("div", { key: "h", className: "ll-result-head" }, `\u7B2C ${item.page} \u9875 \xB7 ${item.title}`),
              h("div", { key: "b", className: "ll-result-body" }, item.snippet)
            ]))) : null,
            search.trim() && !results.length ? h("div", { key: "none", className: "ll-results" }, h("div", { className: "ll-hint", style: { padding: 10 } }, "\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u9875\u9762")) : null
          ]),
          h("button", {
            key: "trans",
            className: `ll-btn${transOpen ? " ll-send" : ""}`,
            onClick: () => setTransOpen((prev) => !prev),
            title: "\u7FFB\u8BD1",
            style: { gap: 6 }
          }, [h(icons_default, { key: "i", name: "translate", size: 14 }), h("span", { key: "t" }, "\u7FFB\u8BD1")]),
          h("div", { className: "ll-head-meta", key: "m" }, `${pages.length} \u9875`)
        ] : h("div", { className: "ll-head-title", key: "t" }, "LearnLab")),
        deck ? h("div", {
          className: "ll-stage",
          key: "stage",
          ref: stageRef,
          onDragOver: (event) => {
            if (!event.dataTransfer.types.includes(DECK_MIME)) return;
            event.preventDefault();
            const rect = event.currentTarget.getBoundingClientRect();
            setDropHint((event.clientY - rect.top) / rect.height < 0.5 ? "top" : "bottom");
          },
          onDragLeave: () => setDropHint(null),
          onDrop: (event) => {
            const id = event.dataTransfer.getData(DECK_MIME);
            setDropHint(null);
            if (!id) return;
            event.preventDefault();
            const rect = event.currentTarget.getBoundingClientRect();
            const upper = (event.clientY - rect.top) / rect.height < 0.5;
            if (panes.length >= 2) openDeck(id, { mode: "replace", at: upper ? 0 : 1 });
            else openDeck(id, { mode: upper ? "top" : "bottom" });
          }
        }, [
          h("div", { className: "ll-split", key: "split" }, panes.length > 1 ? [
            h("div", { key: "p0", style: { flex: `0 0 ${Math.round(splitRatio * 100)}%`, minHeight: 0, display: "flex" } }, renderPane(0)),
            h("div", {
              key: "div",
              className: `ll-divider${dragSplit ? " is-dragging" : ""}`,
              onPointerDown: (event) => {
                event.preventDefault();
                setDragSplit(true);
              },
              title: "\u62D6\u52A8\u8C03\u6574\u4E0A\u4E0B\u6BD4\u4F8B"
            }),
            h("div", { key: "p1", style: { flex: 1, minHeight: 0, display: "flex" } }, renderPane(1))
          ] : renderPane(0)),
          dropHint ? h(
            "div",
            { key: "hint", className: `ll-drop is-${dropHint}` },
            dropHint === "top" ? "\u653E\u5230\u4E0A\u65B9\uFF0C\u4E0E\u5F53\u524D\u8BFE\u4EF6\u4E0A\u4E0B\u5BF9\u6BD4" : "\u653E\u5230\u4E0B\u65B9\uFF0C\u4E0E\u5F53\u524D\u8BFE\u4EF6\u4E0A\u4E0B\u5BF9\u6BD4"
          ) : null,
          h("div", { className: "ll-bottom", key: "bottom" }, [
            h("div", { className: "ll-inktools", key: "ink" }, [
              h("button", {
                key: "pen",
                className: `ll-ibtn${tool === "pen" ? " is-active" : ""}`,
                onClick: () => setTool("pen"),
                title: "\u753B\u7B14",
                "aria-label": "\u753B\u7B14"
              }, h(icons_default, { name: "pen" })),
              ...INK_COLORS.map((value) => h("button", {
                key: value,
                className: `ll-swatch${color === value && tool === "pen" ? " is-active" : ""}`,
                onClick: () => {
                  setColor(value);
                  setTool("pen");
                },
                title: "\u6362\u989C\u8272",
                "aria-label": "\u6362\u989C\u8272"
              }, h("span", { className: "ll-dot", style: { background: value } }))),
              h("span", { key: "sep1", className: "ll-ink-sep" }),
              h("button", {
                key: "eraser",
                className: `ll-ibtn${tool === "eraser" ? " is-active" : ""}`,
                onClick: () => setTool("eraser"),
                title: "\u6A61\u76AE",
                "aria-label": "\u6A61\u76AE"
              }, h(icons_default, { name: "eraser" })),
              h("button", {
                key: "undo",
                className: "ll-ibtn",
                onClick: () => setPaneStrokes((prev) => prev.slice(0, -1)),
                title: "\u64A4\u9500\u4E00\u7B14",
                "aria-label": "\u64A4\u9500\u4E00\u7B14"
              }, h(icons_default, { name: "undo" })),
              h("button", {
                key: "clear",
                className: "ll-ibtn",
                onClick: () => setPaneStrokes(() => []),
                title: "\u6E05\u7A7A\u7B14\u8FF9",
                "aria-label": "\u6E05\u7A7A\u7B14\u8FF9"
              }, h(icons_default, { name: "clear" })),
              h("span", { key: "sep2", className: "ll-ink-sep" }),
              h("button", {
                key: "shot",
                className: "ll-ibtn",
                onClick: saveSnapshot,
                title: "\u628A\u8FD9\u4E00\u9875\uFF08\u8FDE\u7B14\u8FF9\uFF09\u5B58\u6210\u56FE\u7247",
                "aria-label": "\u4FDD\u5B58\u8FD9\u4E00\u9875"
              }, h(icons_default, { name: "camera" }))
            ]),
            h("div", { className: "ll-nav", key: "nav" }, [
              h("button", {
                key: "prev",
                className: "ll-ibtn",
                onClick: () => goPage(page - 1),
                disabled: page <= 1,
                title: "\u4E0A\u4E00\u9875",
                "aria-label": "\u4E0A\u4E00\u9875"
              }, h(icons_default, { name: "prev" })),
              h("span", { key: "box", className: "ll-pagebox" }, [
                h("input", {
                  key: "input",
                  value: String(page),
                  style: { width: `${Math.max(1, String(page).length)}ch` },
                  "aria-label": "\u9875\u7801",
                  onChange: (event) => {
                    const value = Number(event.target.value.replace(/[^\d]/g, ""));
                    if (value) goPage(value);
                  }
                }),
                h("span", { key: "sep", className: "ll-page-sep" }, "/"),
                h("span", { key: "total", className: "ll-page-total" }, String(pages.length))
              ]),
              h("button", {
                key: "next",
                className: "ll-ibtn",
                onClick: () => goPage(page + 1),
                disabled: page >= pages.length,
                title: "\u4E0B\u4E00\u9875",
                "aria-label": "\u4E0B\u4E00\u9875"
              }, h(icons_default, { name: "next" }))
            ]),
            h("div", { className: "ll-zoomctl", key: "zoom" }, [
              h("button", {
                key: "out",
                className: "ll-ibtn",
                onClick: () => setPaneZoom((pane?.zoom ?? 1) - 0.15),
                disabled: (pane?.zoom ?? 1) <= 0.4,
                title: "\u7F29\u5C0F",
                "aria-label": "\u7F29\u5C0F"
              }, h(icons_default, { name: "minus", size: 14 })),
              h("button", {
                key: "val",
                className: "ll-zoomval",
                onClick: () => setPaneZoom(1),
                title: "\u8FD8\u539F 100%\uFF08\u4E5F\u53EF\u4EE5 Ctrl + \u6EDA\u8F6E\u7F29\u653E\uFF09"
              }, `${Math.round((pane?.zoom ?? 1) * 100)}%`),
              h("button", {
                key: "in",
                className: "ll-ibtn",
                onClick: () => setPaneZoom((pane?.zoom ?? 1) + 0.15),
                disabled: (pane?.zoom ?? 1) >= 4,
                title: "\u653E\u5927\uFF08Ctrl + \u6EDA\u8F6E\u540C\u6548\uFF09",
                "aria-label": "\u653E\u5927"
              }, h(icons_default, { name: "plus", size: 14 }))
            ])
          ]),
          needsText && busy !== "transcribe" ? h("div", { className: "ll-hint", key: "need" }, [
            "\u8FD9\u4E00\u9875\u6CA1\u6709\u53EF\u7528\u7684\u6587\u5B57\uFF0C\u6559\u7EC3\u53EA\u80FD\u770B\u56FE\u56DE\u7B54\u3002",
            h("button", {
              key: "go",
              className: "ll-link",
              onClick: () => runTranscribe(),
              title: "\u9010\u9875\u4EA4\u7ED9\u6A21\u578B\u8F6C\u5F55\uFF0C\u6BCF\u9875\u4E00\u6B21\u8C03\u7528"
            }, " \u8BC6\u522B\u5168\u90E8\u9875\u9762"),
            h("span", { key: "sep" }, " \xB7 \u53EA\u8BC6\u4E00\u9875\u53EF\u5728\u8F93\u5165\u6846\u4E0A\u65B9\u70B9\u300C\u8BC6\u522B\u7B2C N \u9875\u300D")
          ]) : null
        ]) : h("div", { className: "ll-empty", key: "empty" }, [
          h("div", { key: "a", className: "ll-empty-title" }, "\u9009\u4E00\u4EFD\u8BFE\u4EF6\u5F00\u59CB"),
          h("div", { key: "b" }, "\u6216\u8005\u70B9\u5DE6\u4E0A\u89D2\u300C\u5BFC\u5165\u300D\uFF0C\u4ECE\u5DE5\u4F5C\u533A\u6311\u4E00\u4E2A pptx / pdf\u3002"),
          h("div", { key: "c", className: "ll-hint" }, `\u8BFE\u4EF6\u4F1A\u653E\u5728 ${server?.learnLabDir ?? "LearnLab"}`)
        ]),
        busy === "transcribe" ? h("div", { className: "ll-task", key: "task" }, [
          h("span", { key: "l" }, `\u6B63\u5728\u8BC6\u522B\u7B2C ${progress?.page ?? "-"} \u9875\uFF08${progress?.done ?? 0}/${progress?.total ?? 0}\uFF09`),
          h("div", { key: "bar", className: "ll-progress ll-grow" }, h("i", { style: { width: `${Math.round((progress?.done ?? 0) / Math.max(progress?.total ?? 1, 1) * 100)}%` } })),
          h("button", { key: "stop", className: "ll-btn", onClick: () => stopTranscribe() }, "\u505C\u6B62")
        ]) : null,
        snack ? h("div", { className: "ll-task", key: "snack" }, h("span", null, snack)) : null,
        error ? h("div", { className: "ll-error", key: "err" }, error) : null,
        transOpen ? h("div", { className: "ll-trans", key: "trans" }, [
          h("div", { className: "ll-trans-head", key: "head" }, [
            h("div", { key: "seg", className: "ll-seg" }, [
              h("button", { key: "page", className: transMode === "page" ? "is-active" : "", onClick: () => setTransMode("page") }, "\u6574\u9875"),
              h("button", { key: "text", className: transMode === "text" ? "is-active" : "", onClick: () => setTransMode("text") }, "\u8F93\u5165")
            ]),
            h("span", { key: "g", className: "ll-grow" }),
            h("div", { key: "target", className: "ll-seg" }, [
              h("button", { key: "auto", className: transTarget === "auto" ? "is-active" : "", onClick: () => setTransTarget("auto") }, "\u81EA\u52A8"),
              h("button", { key: "zh", className: transTarget === "zh" ? "is-active" : "", onClick: () => setTransTarget("zh") }, "\u4E2D\u6587"),
              h("button", { key: "en", className: transTarget === "en" ? "is-active" : "", onClick: () => setTransTarget("en") }, "EN")
            ]),
            h("button", {
              key: "gear",
              className: "ll-ibtn",
              title: "\u7FFB\u8BD1\u670D\u52A1\u8BBE\u7F6E",
              "aria-label": "\u7FFB\u8BD1\u670D\u52A1\u8BBE\u7F6E",
              onClick: () => setTransSettings((prev) => !prev)
            }, h(icons_default, { name: "settings", size: 15 })),
            h("button", {
              key: "x",
              className: "ll-ibtn",
              title: "\u5173\u95ED\u7FFB\u8BD1",
              "aria-label": "\u5173\u95ED\u7FFB\u8BD1",
              onClick: () => setTransOpen(false)
            }, h(icons_default, { name: "close", size: 15 }))
          ]),
          transSettings ? h("div", { className: "ll-trans-body", key: "settings" }, [
            h("div", { key: "h", className: "ll-hint" }, [
              h("div", { key: "a" }, "\u767E\u5EA6\u7FFB\u8BD1 appid \u4E0E\u5BC6\u94A5\u83B7\u53D6\uFF1Afanyi-api.baidu.com"),
              h("div", { key: "b" }, "\u672A\u586B\u5199\u5219\u4F7F\u7528 MyMemory")
            ]),
            h("div", { key: "p", className: "ll-seg", style: { alignSelf: "flex-start" } }, [
              h("button", {
                key: "auto",
                className: (transCfg?.provider ?? "auto") === "auto" ? "is-active" : "",
                onClick: () => setTransCfg((prev) => ({ ...prev, provider: "auto" }))
              }, "\u81EA\u52A8"),
              h("button", {
                key: "baidu",
                className: transCfg?.provider === "baidu" ? "is-active" : "",
                onClick: () => setTransCfg((prev) => ({ ...prev, provider: "baidu" }))
              }, "\u53EA\u7528\u767E\u5EA6"),
              h("button", {
                key: "mymemory",
                className: transCfg?.provider === "mymemory" ? "is-active" : "",
                onClick: () => setTransCfg((prev) => ({ ...prev, provider: "mymemory" }))
              }, "\u53EA\u7528 MyMemory")
            ]),
            h("input", {
              key: "appid",
              className: "ll-editor",
              style: { border: "1px solid var(--dsw-alias-border-l1)", borderRadius: 8, padding: "6px 8px", minHeight: 32 },
              placeholder: "\u767E\u5EA6 appid",
              value: transCfg?.appid ?? "",
              onChange: (event) => setTransCfg((prev) => ({ ...prev, appid: event.target.value }))
            }),
            h("input", {
              key: "key",
              className: "ll-editor",
              style: { border: "1px solid var(--dsw-alias-border-l1)", borderRadius: 8, padding: "6px 8px", minHeight: 32 },
              placeholder: transCfg?.hasKey ? "\u5BC6\u94A5\u5DF2\u4FDD\u5B58\uFF0C\u7559\u7A7A\u5219\u4E0D\u4FEE\u6539" : "\u767E\u5EA6\u5BC6\u94A5",
              value: transCfg?.key ?? "",
              onChange: (event) => setTransCfg((prev) => ({ ...prev, key: event.target.value }))
            }),
            h("div", { key: "row", className: "ll-trans-row" }, [
              h("button", { key: "save", className: "ll-btn ll-send", onClick: saveTransConfig }, "\u4FDD\u5B58"),
              h("button", { key: "back", className: "ll-btn", onClick: () => setTransSettings(false) }, "\u8FD4\u56DE")
            ])
          ]) : h("div", { className: "ll-trans-body", key: "body" }, [
            h("textarea", {
              key: "ta",
              value: transText,
              placeholder: transMode === "page" ? "\u8FD9\u4E00\u9875\u6CA1\u6709\u53EF\u7FFB\u8BD1\u7684\u6587\u5B57" : "\u7C98\u8D34\u6216\u8F93\u5165\u8981\u7FFB\u8BD1\u7684\u5185\u5BB9",
              onChange: (event) => setTransText(event.target.value)
            }),
            h("div", { key: "row", className: "ll-trans-row" }, [
              h("button", { key: "go", className: "ll-btn ll-send", onClick: runTranslate, disabled: transBusy || !transText.trim() }, transBusy ? "\u7FFB\u8BD1\u4E2D\u2026" : "\u7FFB\u8BD1"),
              h("button", {
                key: "copy",
                className: "ll-btn",
                disabled: !transOut,
                onClick: () => navigator.clipboard?.writeText(transOut)
              }, "\u590D\u5236"),
              h("span", { key: "g", className: "ll-grow" }),
              transInfo ? h(
                "span",
                { key: "p", className: "ll-hint" },
                `${transInfo.provider}${transInfo.provider === "mymemory" ? "\uFF08\u514D\u8D39\uFF09" : ""} \xB7 ${transInfo.from}\u2192${transInfo.to}`
              ) : null
            ]),
            transError ? h("div", { key: "err", className: "ll-error", style: { padding: 0 } }, transError) : null,
            transOut ? h("div", { key: "out", className: "ll-trans-out" }, transOut) : null
          ])
        ]) : null
      ]),
      h("div", {
        key: "resizer",
        className: `ll-resizer${dragRight ? " is-dragging" : ""}`,
        onPointerDown: (event) => {
          event.preventDefault();
          setDragRight(true);
        },
        onDoubleClick: () => {
          setRightWidth(420);
          try {
            localStorage.setItem("learnlab.rightWidth", "420");
          } catch {
          }
        },
        title: "\u62D6\u52A8\u8C03\u6574\u5BBD\u5EA6\uFF0C\u53CC\u51FB\u590D\u4F4D"
      }),
      h("div", { className: "ll-right", key: "right", style: { width: rightWidth } }, [
        h("div", { className: "ll-tabs", key: "tabs" }, ["coach", "notes", "summary"].map((key) => h("div", {
          key,
          className: `ll-tab${tab === key ? " is-active" : ""}`,
          onClick: () => setTab(key)
        }, key === "coach" ? "\u6559\u7EC3" : key === "notes" ? "\u7B14\u8BB0" : "\u603B\u7ED3"))),
        tab === "coach" ? h("div", { className: "ll-pane", key: "coach" }, [
          h("div", {
            className: "ll-scroll",
            key: "scroll",
            ref: scrollRef,
            onScroll: (event) => {
              const el = event.currentTarget;
              stickRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
            }
          }, coachBody),
          h(
            "div",
            { className: "ll-composer", key: "composer" },
            h("div", { className: "ll-card" }, [
              h("textarea", {
                key: "ta",
                className: "ll-editor",
                placeholder: deck ? `\u5C31\u7B2C ${page} \u9875\u63D0\u95EE\u2026` : "\u5148\u9009\u4E00\u4EFD\u8BFE\u4EF6",
                value: draft,
                disabled: !deck,
                rows: 2,
                onChange: (event) => setDraft(event.target.value),
                onKeyDown: (event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    if (!thinking) send();
                  }
                }
              }),
              strokes.length > 0 || needsText ? h("div", { className: "ll-tools-line", key: "info" }, [
                strokes.length ? h("span", { key: "ink", className: "ll-hint" }, `\u7B14\u8FF9 ${strokes.length} \u7B14\u4F1A\u5E76\u5165\u56FE\u7247`) : null,
                needsText ? h("button", {
                  key: "ocr",
                  className: "ll-btn-ghost",
                  onClick: () => runTranscribe(page),
                  disabled: Boolean(busy),
                  title: "\u628A\u8FD9\u4E00\u9875\u4EA4\u7ED9\u6A21\u578B\u8BFB\u4E00\u904D\uFF0C\u8F6C\u6210\u53EF\u68C0\u7D22\u7684\u6587\u5B57"
                }, `\u8BC6\u522B\u7B2C ${page} \u9875`) : null
              ]) : null,
              h("div", { className: "ll-tools", key: "tools" }, [
                h(
                  "div",
                  {
                    key: "scope",
                    className: "ll-seg",
                    title: isDoc ? "Word \u6587\u6863\u53EA\u80FD\u6574\u7BC7\u53D1\u9001" : "\u8FD9\u6B21\u63D0\u95EE\u8981\u770B\u591A\u5C11\u5185\u5BB9"
                  },
                  [["auto", "\u81EA\u52A8"], ["page", "\u672C\u9875"], ["deck", "\u5168\u7BC7"]].map(([value, label]) => {
                    const locked = isDoc && value !== "deck";
                    return h("button", {
                      key: value,
                      className: `${scope === value ? "is-active" : ""}${locked ? " is-locked" : ""}`,
                      disabled: locked,
                      title: locked ? "Word \u6587\u6863\u6CA1\u6709\u9875\u5185\u6587\u5B57\uFF0C\u53EA\u80FD\u6574\u7BC7\u53D1\u9001" : void 0,
                      onClick: () => {
                        if (!locked) setScope(value);
                      }
                    }, label);
                  })
                ),
                h("button", {
                  key: "img",
                  className: `ll-chip${withImage ? " is-on" : ""}`,
                  onClick: () => setWithImage((prev) => !prev),
                  title: withImage ? "\u5E26\u56FE\uFF1A\u5DF2\u5F00\u542F\uFF0C\u63D0\u95EE\u4F1A\u9644\u4E0A\u672C\u9875\u56FE\u7247" : "\u5E26\u56FE\uFF1A\u8BA9\u6559\u7EC3\u770B\u5230\u8FD9\u4E00\u9875",
                  "aria-label": "\u5E26\u56FE",
                  "aria-pressed": withImage
                }, [h(icons_default, { key: "i", name: "image", size: 13 }), h("span", { key: "t" }, "\u5E26\u56FE")]),
                h("button", {
                  key: "draw",
                  className: `ll-chip${allowDraw ? " is-on" : ""}`,
                  onClick: () => setAllowDraw((prev) => !prev),
                  title: "\u5141\u8BB8\u6559\u7EC3\u5728\u56DE\u7B54\u91CC\u753B\u793A\u610F\u56FE",
                  "aria-pressed": allowDraw
                }, [h(icons_default, { key: "i", name: "draw", size: 13 }), h("span", { key: "t" }, "\u753B\u56FE")]),
                h("span", { key: "grow", className: "ll-grow" }),
                thinking ? h("button", {
                  key: "stop",
                  className: "ll-btn ll-stop ll-send-icon",
                  onClick: stopChat,
                  title: "\u6682\u505C\u751F\u6210",
                  "aria-label": "\u6682\u505C\u751F\u6210"
                }, h(icons_default, { key: "i", name: "stop", size: 12 })) : h("button", {
                  key: "send",
                  className: "ll-btn ll-send ll-send-icon",
                  onClick: send,
                  title: "\u53D1\u9001\uFF08Enter\uFF09",
                  "aria-label": "\u53D1\u9001",
                  disabled: !deck || Boolean(busy) || !draft.trim()
                }, h(icons_default, { key: "i", name: "send", size: 15 }))
              ])
            ])
          )
        ]) : null,
        tab === "notes" ? h("div", { className: "ll-pane", key: "notes" }, [
          h("div", { className: "ll-scroll", key: "scroll" }, [
            h("div", { className: "ll-hint", key: "h" }, "\u7EAF markdown\uFF0C\u76F4\u63A5\u6539\uFF0C\u5931\u7126\u5373\u4FDD\u5B58\u5230 notes.md\u3002"),
            h("textarea", {
              key: "ta",
              className: "ll-notes-editor",
              value: pane?.data?.notes ?? "",
              disabled: !deck,
              onChange: (event) => patchData(focus, { notes: event.target.value }),
              onBlur: (event) => deck && saveNotesFile(event.target.value)
            })
          ])
        ]) : null,
        tab === "summary" ? h("div", { className: "ll-pane", key: "summary" }, [
          h("div", { className: "ll-scroll", key: "scroll" }, deck ? pane?.data?.summary ? h(Markdown, { key: "md", text: pane.data.summary }) : h("div", { className: "ll-empty" }, [
            h(icons_default, { key: "i", name: "summary", size: 22 }),
            h("div", { key: "a", className: "ll-empty-title" }, "\u5B66\u5B8C\u4E86\uFF1F\u751F\u6210\u4E00\u4EFD\u53EF\u4EE5\u590D\u4E60\u7684\u603B\u7ED3"),
            h("div", { key: "b" }, "\u4F1A\u5199\u5230\u8FD9\u4EFD\u8BFE\u4EF6\u76EE\u5F55\u4E0B\u7684 summary.md\uFF0C\u5305\u542B\u77E5\u8BC6\u7ED3\u6784\u3001\u6613\u9519\u70B9\u548C\u81EA\u6D4B\u9898\u3002")
          ]) : h("div", { className: "ll-empty" }, "\u5148\u9009\u4E00\u4EFD\u8BFE\u4EF6")),
          h(
            "div",
            { className: "ll-composer", key: "composer" },
            h("div", { key: "row", style: { display: "flex", alignItems: "center", gap: 8 } }, [
              h("button", {
                key: "run",
                className: "ll-btn ll-send",
                onClick: () => setConfirmSummary(true),
                disabled: !deck || Boolean(busy)
              }, busy === "summary" ? "\u6B63\u5728\u5199\u2026" : pane?.data?.summary ? "\u91CD\u65B0\u751F\u6210" : "\u751F\u6210\u603B\u7ED3"),
              h("span", { key: "grow", className: "ll-grow" }),
              h("span", { key: "hint", className: "ll-hint" }, "\u5168\u6587 + \u4F60\u95EE\u8FC7\u7684\u95EE\u9898")
            ])
          )
        ]) : null
      ]),
      picker ? h(
        "div",
        { className: "ll-overlay", key: "overlay", onClick: (event) => {
          if (event.target === event.currentTarget && !importing) setPicker(false);
        } },
        h("div", { className: "ll-modal" }, [
          h("div", { className: "ll-modal-head", key: "head" }, [
            h("span", { key: "t" }, "\u4ECE\u5DE5\u4F5C\u533A\u9009\u4E00\u4EFD\u8BFE\u4EF6"),
            h("button", {
              key: "x",
              className: "ll-ibtn",
              onClick: () => setPicker(false),
              disabled: Boolean(importing),
              title: "\u5173\u95ED",
              "aria-label": "\u5173\u95ED"
            }, h(icons_default, { name: "close", size: 15 }))
          ]),
          h(
            "div",
            { className: "ll-modal-body", key: "body" },
            busy === "files" ? h("div", { className: "ll-hint", style: { padding: 12 } }, "\u6B63\u5728\u627E\u2026") : files.length === 0 ? h("div", { key: "empty", style: { padding: 12 } }, [
              h("div", { key: "a", className: "ll-hint" }, "\u8FD9\u4E2A\u6587\u4EF6\u5939\u91CC\u8FD8\u6CA1\u6709\u53EF\u5BFC\u5165\u7684\u8BFE\u4EF6\u3002"),
              h("div", { key: "b", className: "ll-hint", style: { marginTop: 6 } }, "\u628A pptx / ppt / pdf / docx \u653E\u8FDB\uFF1A"),
              h("div", { key: "c", className: "ll-path" }, server?.sourceDir ?? ""),
              h("button", {
                key: "d",
                className: "ll-btn-ghost",
                style: { marginTop: 8 },
                onClick: () => {
                  setPicker(false);
                  setShowSkin(true);
                }
              }, "\u66F4\u6539\u6587\u4EF6\u5939")
            ]) : files.map((file) => h("div", {
              key: file.path,
              className: `ll-file${importing?.path === file.path ? " is-busy" : ""}`,
              onClick: () => doImport(file.path)
            }, [
              h("span", { key: "n", className: "ll-file-name" }, file.relative),
              h("span", { key: "s", className: "ll-hint" }, importing?.path === file.path ? `${importing.label}\u2026` : "")
            ]))
          ),
          importing ? h("div", { key: "foot", style: { padding: "0 16px 14px", display: "flex", flexDirection: "column", gap: 6 } }, [
            h("div", { key: "l", className: "ll-hint" }, `${importing.label} \xB7 \u5927\u8BFE\u4EF6\u8F6C\u6362\u9700\u8981\u5341\u51E0\u79D2`),
            h("div", { key: "bar", className: "ll-progress" }, h("i", { style: { width: `${importing.percent}%` } }))
          ]) : null
        ])
      ) : null,
      confirmSummary ? h(
        "div",
        { className: "ll-overlay", key: "confirm", onClick: (event) => {
          if (event.target === event.currentTarget) setConfirmSummary(false);
        } },
        h("div", { className: "ll-modal", style: { width: "min(420px, 86%)" } }, [
          h("div", { className: "ll-modal-head", key: "h" }, "\u751F\u6210\u5B66\u4E60\u603B\u7ED3"),
          h("div", { className: "ll-modal-body", key: "b" }, [
            h("div", { key: "1" }, "\u4F1A\u628A\u6574\u4EFD\u8BFE\u4EF6\u6B63\u6587\u548C\u4F60\u95EE\u8FC7\u7684\u95EE\u9898\u4E00\u8D77\u53D1\u7ED9\u6A21\u578B\uFF0C\u751F\u6210\u4E00\u4EFD\u603B\u7ED3\u3002"),
            h(
              "div",
              { key: "2", className: "ll-hint", style: { marginTop: 8 } },
              pane?.data?.summary ? "\u73B0\u6709\u7684 summary.md \u4F1A\u88AB\u8986\u76D6\u3002" : "\u7ED3\u679C\u4F1A\u4FDD\u5B58\u4E3A summary.md\u3002"
            )
          ]),
          h("div", { className: "ll-modal-foot", key: "f" }, [
            h("button", { key: "c", className: "ll-btn", onClick: () => setConfirmSummary(false) }, "\u53D6\u6D88"),
            h("button", { key: "ok", className: "ll-btn ll-send", onClick: runSummary }, "\u751F\u6210")
          ])
        ])
      ) : null,
      confirmDelete ? h(
        "div",
        { className: "ll-overlay", key: "confirm-delete", onClick: (event) => {
          if (event.target === event.currentTarget) setConfirmDelete(null);
        } },
        h("div", { className: "ll-modal", style: { width: "min(420px, 86%)" } }, [
          h("div", { className: "ll-modal-head", key: "h" }, "\u5220\u9664\u8BFE\u4EF6"),
          h("div", { className: "ll-modal-body", key: "b" }, [
            h("div", { key: "1" }, `\u300A${confirmDelete.title}\u300B\u4F1A\u4ECE\u8BFE\u4EF6\u5E93\u79FB\u9664\uFF0C\u7B14\u8BB0\u3001\u603B\u7ED3\u3001\u5BF9\u8BDD\u548C\u622A\u56FE\u4E00\u8D77\u5220\u9664\u3002`),
            h(
              "div",
              { key: "2", className: "ll-hint", style: { marginTop: 8 } },
              `\u539F\u59CB\u6587\u4EF6\u4E0D\u4F1A\u52A8\uFF1A${confirmDelete.source || "\u6E90\u6587\u4EF6"}`
            )
          ]),
          h("div", { className: "ll-modal-foot", key: "f" }, [
            h("button", { key: "c", className: "ll-btn", onClick: () => setConfirmDelete(null) }, "\u53D6\u6D88"),
            h("button", {
              key: "ok",
              className: "ll-btn ll-danger",
              onClick: () => removeDeck(confirmDelete)
            }, "\u5220\u9664")
          ])
        ])
      ) : null
    ]);
  }
  function PanelIcon(props) {
    const size = props?.size ?? 20;
    return h("svg", {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.6,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": true,
      style: { display: "block", opacity: props?.active ? 1 : 0.82 }
    }, [
      h("path", { key: "b", d: "M3 5.5A2.5 2.5 0 0 1 5.5 3H11v16H5.5A2.5 2.5 0 0 0 3 21.5z" }),
      h("path", { key: "c", d: "M13 3h5.5A2.5 2.5 0 0 1 21 5.5v6" }),
      h("path", { key: "d", d: "M13 19h3" }),
      h("path", { key: "e", d: "M17.5 13.5c1.9 0 3.5 1.4 3.5 3.1 0 1.2-.8 2.2-2 2.7l.3 1.7-1.9-1.1h-.5c-1.7 0-3-1.1-3-2.6 0-2 1.7-3.8 3.6-3.8z" })
    ]);
  }
  return {
    inject: ["slots"],
    apply(ctx) {
      const disposers = [];
      try {
        disposers.push(ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({
          name: "sidebar.panellist",
          id: "learnlab",
          order: 20,
          label: () => "\u5B66\u4E60"
        }, PanelIcon)));
        disposers.push(ctx.slots.inject("main", () => ctx.slots.register({
          name: "main",
          key: "learnlab"
        }, Panel)));
      } catch (error) {
        console.error("[learnlab] \u6CE8\u518C\u9762\u677F\u5931\u8D25", error);
      }
      ctx.effect?.(() => () => {
        for (const dispose of disposers.splice(0)) {
          try {
            dispose?.();
          } catch {
          }
        }
      });
    }
  };
})();

// src/client.jsx
var client_default = app_default;

    if (module.exports && module.exports.default) return module.exports.default;
    return module.exports;
  },
});
