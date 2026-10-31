import React from 'react'
import Icon from './components/icons.jsx'

/* 由 build/client.legacy.txt 自动转换而来；逻辑未改动。 */
export default (function () {
    const h = React.createElement
    const { useState, useEffect, useRef, useCallback, useMemo } = React

    const API = '/api/learnlab'
    const MIN_RIGHT = 360
    const MAX_RIGHT = 760
    const INK_COLORS = ['#e5484d', '#2f6fed', '#f5c518']
    const ACCENTS = ['#7e0c6e', '#2f6fed', '#0f8b8d', '#2e7d4f', '#b45309', '#b02a37']
    const DECK_MIME = 'text/x-learnlab-deck'
    const LAYOUT_KEY = 'learnlab.layout'

    /* ------------------------------------------------------------ 样式 */

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

/* 左栏 */
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

/* 中栏 */
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

/* 翻译 */
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

/* 舞台与双栏 */
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

/* 右栏 */
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

/* 输入区 */
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

/* 文本 */
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

/* 弹层 */
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

/* ===== 第二版视觉：图标按钮、层级与密度 ===== */

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

/* 层级：面板用底色区分，少画边框 */
.ll-rail { border-right-color: color-mix(in srgb, var(--dsw-alias-border-l1) 70%, transparent); }
.ll-right { border-left-color: color-mix(in srgb, var(--dsw-alias-border-l1) 70%, transparent); }
.ll-head, .ll-tabs, .ll-rail-head { border-bottom-color: color-mix(in srgb, var(--dsw-alias-border-l1) 60%, transparent); }
.ll-deck { border-radius: 10px; padding: 10px 12px; gap: 7px; }
.ll-deck.is-active { box-shadow: inset 2px 0 0 var(--dsw-alias-brand-primary); }
.ll-thumb { border-radius: 10px; }
.ll-thumb-img { border-radius: 6px; }

/* 密度与字号 */
.ll-scroll { gap: 16px; padding: 16px; }
.ll-msg-q { padding: 9px 13px; border-radius: 14px 14px 4px 14px; }
.ll-msg-a { line-height: 1.72; }
.ll-msg-meta { gap: 8px; }
.ll-btn { height: 30px; border-radius: 9px; padding: 0 12px; }
.ll-pagebox { min-width: 60px; }
.ll-tabs { gap: 2px; }
.ll-tab { padding: 6px 13px; }
.ll-composer { padding: 12px 14px 16px; }
/* 输入卡片：聚焦只用一层柔和的描边，不要和焦点环叠加 */
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

/* 焦点与滚动条 */
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

/* 幻灯片与空状态 */
.ll-slide { border-radius: 10px; }
.ll-slide-ph { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;
  border-radius: 10px; background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 60%, transparent);
  animation: ll-breathe 1.6s ease-in-out infinite; }
@keyframes ll-breathe { 0%, 100% { opacity: .55; } 50% { opacity: 1; } }

/* 开关式 chip（替代原生复选框） */
.ll-chip { display: inline-flex; align-items: center; gap: 5px; height: 26px; padding: 0 9px;
  border: 1px solid var(--dsw-alias-border-l1); border-radius: 999px; background: transparent;
  color: var(--dsw-alias-label-secondary); font: inherit; font-size: 11px; line-height: 1;
  cursor: pointer; white-space: nowrap; transition: background .12s ease, color .12s ease, border-color .12s ease; }
.ll-chip:hover { color: var(--dsw-alias-label-primary); border-color: var(--dsw-alias-border-l2); }
.ll-chip.is-on { color: var(--ll-accent-ink);
  border-color: color-mix(in srgb, var(--ll-accent) 55%, transparent);
  background: var(--ll-accent-soft); }

/* 对比标记 */
.ll-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 11px;
  padding: 2px 8px; border-radius: 999px; color: var(--ll-accent-ink);
  background: var(--ll-accent-soft); white-space: nowrap; }

/* 焦点区块更明确 */
.ll-view.is-focus .ll-view-head { background: color-mix(in srgb, var(--dsw-alias-brand-primary) 10%, transparent);
  border-radius: 10px 10px 0 0; }
.ll-view.is-focus .ll-view-title { color: var(--dsw-alias-label-primary); }

/* 消息动作行与正文拉开层次 */
.ll-msg-actions { margin-top: 2px; padding-top: 6px; border-top: 1px dashed
  color-mix(in srgb, var(--dsw-alias-border-l1) 80%, transparent); }
.ll-msg-meta > span { white-space: nowrap; }

/* 对话里的页码分隔 */
.ll-page-tag { align-self: center; display: inline-flex; align-items: center; gap: 8px;
  padding: 3px 10px; border-radius: 999px; font-size: 10.5px; letter-spacing: .04em;
  color: var(--dsw-alias-label-secondary);
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 70%, transparent); }
.ll-empty > svg { opacity: .45; margin-bottom: 2px; }

/* 翻译弹窗：与整体一致的分层，别让选中态比轨道还深 */
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

/* 工具条上的图标开关：只放图标时不占宽 */
.ll-chip.is-icon { width: 28px; padding: 0; justify-content: center; }
.ll-tools { gap: 6px; flex-wrap: nowrap; }
.ll-tools > .ll-seg, .ll-tools > .ll-chip { flex: none; }

/* 发送按钮只留图标 */
.ll-send-icon { width: 32px; min-width: 32px; padding: 0; border-radius: 999px; }
.ll-send-icon svg { margin: 0; }

/* 左栏底部：模型 + 外观设置 */
.ll-rail-foot { display: flex; align-items: center; gap: 6px; }
.ll-model { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ll-skin { position: absolute; left: 10px; right: 10px; bottom: 46px; z-index: 25;
  padding: 12px; border-radius: 12px; background: var(--dsw-alias-bg-layer-1);
  border: 1px solid var(--dsw-alias-border-l2); box-shadow: 0 18px 48px rgba(0,0,0,.48); }
.ll-skin-title { font-size: 11px; color: var(--dsw-alias-label-secondary); margin-bottom: 6px; }
.ll-skin-text { font-size: 12px; color: var(--dsw-alias-label-primary); line-height: 1.6; }
.ll-skin-sub { font-size: 10.5px; color: var(--dsw-alias-label-secondary); margin-top: 2px; }
.ll-skin-hr { height: 1px; background: var(--dsw-alias-border-l1); margin: 12px 0; }

/* 缩放 */
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
`

    /* ------------------------------------------------------------ 请求 */

    async function api(path, options) {
      const res = await fetch(`${API}${path}`, options)
      const text = await res.text()
      const data = text ? JSON.parse(text) : {}
      if (!res.ok) throw new Error(data.error || `请求失败（${res.status}）`)
      return data
    }

    function post(path, body, signal) {
      return api(path, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body ?? {}),
        signal,
      })
    }

    async function stream(path, body, onEvent, signal) {
      const res = await fetch(`${API}${path}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body ?? {}),
        signal,
      })
      if (!res.body) throw new Error('连接失败')
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      for (;;) {
        const { value, done } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        let cut = buffer.indexOf('\n\n')
        while (cut >= 0) {
          const block = buffer.slice(0, cut)
          buffer = buffer.slice(cut + 2)
          const line = block.split('\n').find((item) => item.startsWith('data: '))
          if (line) {
            try {
              onEvent(JSON.parse(line.slice(6)))
            } catch {
              /* 半包，忽略 */
            }
          }
          cut = buffer.indexOf('\n\n')
        }
      }
    }

    function fmtTokens(value) {
      const n = Number(value) || 0
      if (n >= 10000) return `${Math.round(n / 1000)}k`
      if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
      return String(n)
    }

    function fmtDuration(ms) {
      const value = Number(ms) || 0
      if (value < 1000) return `${Math.round(value)}ms`
      if (value < 60000) return `${(value / 1000).toFixed(1)}s`
      return `${Math.floor(value / 60000)}m${Math.round((value % 60000) / 1000)}s`
    }

    /* ------------------------------------------------------------ 公式 */

    const TEX_SYMBOLS = {
      alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ε', varepsilon: 'ε', zeta: 'ζ',
      eta: 'η', theta: 'θ', iota: 'ι', kappa: 'κ', lambda: 'λ', mu: 'μ', nu: 'ν', xi: 'ξ',
      pi: 'π', rho: 'ρ', sigma: 'σ', tau: 'τ', upsilon: 'υ', phi: 'φ', varphi: 'φ', chi: 'χ',
      psi: 'ψ', omega: 'ω', Gamma: 'Γ', Delta: 'Δ', Theta: 'Θ', Lambda: 'Λ', Xi: 'Ξ', Pi: 'Π',
      Sigma: 'Σ', Phi: 'Φ', Psi: 'Ψ', Omega: 'Ω',
      times: '×', cdot: '·', div: '÷', pm: '±', mp: '∓', ast: '∗', star: '⋆', circ: '∘',
      le: '≤', leq: '≤', ge: '≥', geq: '≥', ne: '≠', neq: '≠', approx: '≈', equiv: '≡',
      sim: '∼', propto: '∝', ll: '≪', gg: '≫',
      to: '→', rightarrow: '→', leftarrow: '←', leftrightarrow: '↔', Rightarrow: '⇒',
      Leftarrow: '⇐', Leftrightarrow: '⇔', mapsto: '↦', uparrow: '↑', downarrow: '↓',
      sum: '∑', prod: '∏', int: '∫', oint: '∮', iint: '∬',
      infty: '∞', partial: '∂', nabla: '∇', forall: '∀', exists: '∃', nexists: '∄',
      in: '∈', notin: '∉', ni: '∋', subset: '⊂', supset: '⊃', subseteq: '⊆', supseteq: '⊇',
      cup: '∪', cap: '∩', emptyset: '∅', varnothing: '∅', setminus: '∖',
      land: '∧', lor: '∨', lnot: '¬', neg: '¬', top: '⊤', bot: '⊥',
      cdots: '⋯', ldots: '…', dots: '…', prime: '′', degree: '°', angle: '∠',
      therefore: '∴', because: '∵', lfloor: '⌊', rfloor: '⌋', lceil: '⌈', rceil: '⌉',
      langle: '⟨', rangle: '⟩', lbrace: '{', rbrace: '}', vert: '|', Vert: '‖',
    }

    function escapeHtml(value) {
      return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    }

    function texToHtml(source) {
      const src = String(source ?? '')
      let i = 0

      function readArg() {
        if (src[i] === '{') {
          i += 1
          const inner = parseUntil('}')
          i += 1
          return inner
        }
        if (src[i] === '\\') return command().html
        const ch = src[i] || ''
        i += 1
        return escapeHtml(ch)
      }

      function command() {
        i += 1
        let name = ''
        while (i < src.length && /[a-zA-Z]/.test(src[i])) {
          name += src[i]
          i += 1
        }
        if (name === 'frac' || name === 'dfrac' || name === 'tfrac') {
          const numerator = readArg()
          const denominator = readArg()
          return { html: `<span class="m-frac"><span class="m-num">${numerator}</span><span class="m-den">${denominator}</span></span>` }
        }
        if (name === 'sqrt') return { html: `<span>√<span class="m-sqrt-body">${readArg()}</span></span>` }
        if (name === 'text' || name === 'mathrm' || name === 'operatorname' || name === 'mathbf' || name === 'mathbb') {
          return { html: `<span class="m-text">${readArg()}</span>` }
        }
        if (name === 'left' || name === 'right') {
          const ch = src[i] || ''
          i += 1
          return { html: ch === '.' ? '' : escapeHtml(ch) }
        }
        if (TEX_SYMBOLS[name]) return { html: `<span>${TEX_SYMBOLS[name]}</span>` }
        if (!name) {
          const ch = src[i] || ''
          i += 1
          return { html: escapeHtml(ch) }
        }
        return { html: `<span>${escapeHtml(name)}</span>` }
      }

      function parseUntil(stop) {
        let out = ''
        while (i < src.length) {
          const ch = src[i]
          if (stop && ch === stop) break
          if (ch === '\\') {
            out += command().html
            continue
          }
          if (ch === '{') {
            i += 1
            out += parseUntil('}')
            i += 1
            continue
          }
          if (ch === '^' || ch === '_') {
            i += 1
            const arg = readArg()
            out += ch === '^' ? `<sup>${arg}</sup>` : `<sub>${arg}</sub>`
            continue
          }
          if (ch === '&' || ch === ' ') {
            i += 1
            out += ' '
            continue
          }
          out += escapeHtml(ch)
          i += 1
        }
        return out
      }

      return parseUntil(undefined)
    }

    /* ------------------------------------------------------------ Markdown */

    function inlineNodes(text, prefix) {
      const out = []
      const parts = String(text).split(/(\$\$[^$]+\$\$|\$[^$\n]+\$|\*\*[^*]+\*\*|`[^`]+`)/)
      parts.forEach((part, index) => {
        if (!part) return
        const key = `${prefix}-${index}`
        if (part.startsWith('$$') && part.endsWith('$$') && part.length > 4) {
          out.push(h('span', { key, className: 'm-math', dangerouslySetInnerHTML: { __html: texToHtml(part.slice(2, -2)) } }))
        } else if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
          out.push(h('span', { key, className: 'm-math', dangerouslySetInnerHTML: { __html: texToHtml(part.slice(1, -1)) } }))
        } else if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
          out.push(h('strong', { key }, part.slice(2, -2)))
        } else if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
          out.push(h('code', { key }, part.slice(1, -1)))
        } else {
          out.push(part)
        }
      })
      return out
    }

    function Markdown({ text }) {
      const lines = String(text ?? '').split('\n')
      const blocks = []
      let bullets = null
      let bulletTag = 'ul'
      let answer = null
      let code = null
      let codeLang = ''
      let counter = 0

      const flushBullets = () => {
        if (bullets) {
          blocks.push(h(bulletTag, { key: `l${counter += 1}` }, bullets))
          bullets = null
          bulletTag = 'ul'
        }
      }
      const flushAnswer = () => {
        if (!answer) return
        blocks.push(h('div', { key: `ans${counter += 1}`, className: 'll-answer' }, [
          answer.label ? h('div', { key: 'l', className: 'll-answer-label' }, answer.label) : null,
          h('div', { key: 'b' }, answer.items.map((item, index) => h('p', { key: index }, inlineNodes(item, `a${index}`)))),
        ]))
        answer = null
      }
      const flushCode = () => {
        const body = code.join('\n')
        code = null
        if (codeLang === 'svg') {
          blocks.push(h('img', {
            key: `fig${counter += 1}`,
            className: 'll-figure',
            alt: '示意图',
            src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(body)}`,
          }))
          return
        }
        blocks.push(h('pre', { key: `c${counter += 1}` }, h('code', null, body)))
      }

      for (let i = 0; i < lines.length; i += 1) {
        const rawLine = lines[i]
        const trimmed = rawLine.trim()

        if (code) {
          if (trimmed.startsWith('```')) flushCode()
          else code.push(rawLine)
          continue
        }
        if (trimmed.startsWith('```')) {
          flushBullets()
          code = []
          codeLang = trimmed.slice(3).trim().toLowerCase()
          continue
        }
        if (/^\$\$[\s\S]*\$\$$/.test(trimmed) && trimmed.length > 4) {
          flushBullets()
          blocks.push(h('div', {
            key: `math${counter += 1}`,
            className: 'll-md ll-math-block m-math',
            dangerouslySetInnerHTML: { __html: texToHtml(trimmed.slice(2, -2)) },
          }))
          continue
        }
        if (trimmed.startsWith('<details')) {
          flushBullets()
          const labelMatch = /<summary>([\s\S]*?)<\/summary>/.exec(trimmed)
          answer = { label: labelMatch ? labelMatch[1] : '答案', items: [] }
          continue
        }
        if (trimmed.startsWith('</details>')) {
          flushAnswer()
          continue
        }
        if (answer) {
          const cleaned = trimmed.replace(/<\/?summary[^>]*>/g, '').replace(/<\/?details[^>]*>/g, '')
          if (cleaned) answer.items.push(cleaned)
          continue
        }
        if (!trimmed) {
          flushBullets()
          continue
        }
        if (/^-{3,}$/.test(trimmed) || /^\*{3,}$/.test(trimmed)) {
          flushBullets()
          blocks.push(h('hr', { key: `hr${counter += 1}` }))
          continue
        }
        if (trimmed.startsWith('|') && lines[i + 1] && /^\|[\s:|-]+\|$/.test(lines[i + 1].trim())) {
          flushBullets()
          const head = trimmed.split('|').slice(1, -1).map((cell) => cell.trim())
          const rows = []
          i += 2
          while (i < lines.length && lines[i].trim().startsWith('|')) {
            rows.push(lines[i].trim().split('|').slice(1, -1).map((cell) => cell.trim()))
            i += 1
          }
          i -= 1
          blocks.push(h('table', { key: `t${counter += 1}` }, [
            h('thead', { key: 'h' }, h('tr', null, head.map((cell, index) => h('th', { key: index }, inlineNodes(cell, `th${index}`))))),
            h('tbody', { key: 'b' }, rows.map((row, rowIndex) => h('tr', { key: rowIndex },
              row.map((cell, cellIndex) => h('td', { key: cellIndex }, inlineNodes(cell, `td${rowIndex}-${cellIndex}`)))))),
          ]))
          continue
        }
        const heading = /^(#{1,6})\s+(.*)$/.exec(trimmed)
        if (heading) {
          flushBullets()
          const level = Math.min(heading[1].length, 3)
          blocks.push(h(`h${level}`, { key: `h${counter += 1}` }, inlineNodes(heading[2], `h${counter}`)))
          continue
        }
        if (/^>\s?/.test(trimmed)) {
          flushBullets()
          blocks.push(h('blockquote', { key: `q${counter += 1}` }, inlineNodes(trimmed.replace(/^>\s?/, ''), `q${counter}`)))
          continue
        }
        const ordered = /^\s*(\d+)\.\s+(.*)$/.exec(rawLine)
        if (ordered) {
          if (bulletTag !== 'ol') {
            flushBullets()
            bulletTag = 'ol'
          }
          bullets = bullets ?? []
          bullets.push(h('li', { key: `li${counter += 1}` }, inlineNodes(ordered[2], `li${counter}`)))
          continue
        }
        const bullet = /^\s*[-*+]\s+(.*)$/.exec(rawLine)
        if (bullet) {
          if (bulletTag !== 'ul') {
            flushBullets()
            bulletTag = 'ul'
          }
          bullets = bullets ?? []
          bullets.push(h('li', { key: `li${counter += 1}` }, inlineNodes(bullet[1], `li${counter}`)))
          continue
        }
        flushBullets()
        blocks.push(h('p', { key: `p${counter += 1}` }, inlineNodes(trimmed, `p${counter}`)))
      }
      if (code) flushCode()
      flushBullets()
      flushAnswer()
      return h('div', { className: 'll-md' }, blocks)
    }

    /* ------------------------------------------------------------ 幻灯片 */

    function SlideImage({ id, page, total, alt, zoom = 1 }) {
      const [shown, setShown] = useState(null)
      const shownRef = useRef(null)
      const imgRef = useRef(null)
      const [fit, setFit] = useState(null)

      useEffect(() => {
        const url = `${API}/slide?id=${encodeURIComponent(id)}&page=${page}`
        if (shownRef.current === url) return
        let cancelled = false
        const image = new Image()
        image.onload = () => {
          if (cancelled) return
          shownRef.current = url
          setShown(url)
        }
        image.src = url
        for (const delta of [-2, -1, 1, 2]) {
          const n = page + delta
          if (n < 1 || n > total) continue
          const pre = new Image()
          pre.src = `${API}/slide?id=${encodeURIComponent(id)}&page=${n}`
        }
        return () => { cancelled = true }
      }, [id, page, total])

      // 先量出「适应容器」的尺寸，作为一个真实的基准：100% 就是它
      useEffect(() => {
        if (!shown) return undefined
        const img = imgRef.current
        const media = img?.parentElement
        if (!img || !media) return undefined
        const measure = () => {
          // 用 getBoundingClientRect 而不是 clientWidth/clientHeight：
          // 后者会被滚动条厚度影响，放大到出现横向滚动条时高度骤减，
          // 于是「基准变小 → 横向滚动条消失 → 高度恢复」来回震荡。
          const rect = media.getBoundingClientRect()
          const boxW = rect.width - 4
          const boxH = rect.height - 4
          const ratio = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 16 / 9
          if (boxW <= 0 || boxH <= 0) return
          const width = Math.min(boxW, boxH * ratio)
          const height = width / ratio
          // 亚像素级变化不触发重算
          setFit((prev) => (
            prev && Math.abs(prev.width - width) < 0.6 && Math.abs(prev.height - height) < 0.6
              ? prev
              : { width, height }
          ))
        }
        measure()
        const observer = new ResizeObserver(measure)
        observer.observe(media)
        return () => observer.disconnect()
      }, [shown])

      if (!shown) return h('div', { className: 'll-slide-ph' }, '正在准备这一页…')

      const style = fit
        ? {
          width: `${Math.round(fit.width * zoom)}px`,
          height: `${Math.round(fit.height * zoom)}px`,
          maxWidth: 'none',
          maxHeight: 'none',
        }
        : undefined

      return h('img', {
        ref: imgRef,
        className: 'll-slide',
        src: shown,
        alt,
        draggable: false,
        style,
      })
    }

    function paintStrokes(canvas, strokes, width, height) {
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      for (const stroke of strokes) {
        ctx.globalCompositeOperation = stroke.tool === 'eraser' ? 'destination-out' : 'source-over'
        ctx.strokeStyle = stroke.color
        ctx.fillStyle = stroke.color
        ctx.lineWidth = Math.max(1, stroke.size * width)
        if (stroke.points.length === 1) {
          ctx.beginPath()
          ctx.arc(stroke.points[0].x * width, stroke.points[0].y * height, Math.max(1, (stroke.size * width) / 2), 0, Math.PI * 2)
          ctx.fill()
          continue
        }
        ctx.beginPath()
        stroke.points.forEach((point, index) => {
          const x = point.x * width
          const y = point.y * height
          if (index === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        })
        ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'
    }

    function InkLayer({ strokes, setStrokes, tool, color, page }) {
      const canvasRef = useRef(null)
      const drawing = useRef(null)
      const [box, setBox] = useState(null)

      useEffect(() => {
        const canvas = canvasRef.current
        const media = canvas?.parentElement
        if (!media) return undefined

        const measure = () => {
          const img = media.querySelector('img')
          if (!img || !img.offsetWidth || !img.offsetHeight) return
          // 用 offset* 而不是 getBoundingClientRect：画布是容器的绝对定位子元素，
          // 滚动时本来就跟着内容走，再叠加滚动量会导致笔迹和图片不同步
          setBox((prev) => {
            const next = {
              left: img.offsetLeft,
              top: img.offsetTop,
              width: img.offsetWidth,
              height: img.offsetHeight,
            }
            if (prev && prev.left === next.left && prev.top === next.top
              && prev.width === next.width && prev.height === next.height) return prev
            return next
          })
        }

        const observed = new WeakSet()
        const observeImage = () => {
          const img = media.querySelector('img')
          if (img && !observed.has(img)) {
            observed.add(img)
            resizeObserver.observe(img)
          }
        }

        const resizeObserver = new ResizeObserver(measure)
        resizeObserver.observe(media)
        observeImage()
        measure()

        // 图片是异步插入的（加载完成才渲染 img），插入时补一次观察与测量；
        // 缩放改变图片尺寸时 ResizeObserver 会兜住
        const mutation = new MutationObserver(() => {
          observeImage()
          measure()
        })
        mutation.observe(media, { childList: true, subtree: true })

        window.addEventListener('resize', measure)
        return () => {
          resizeObserver.disconnect()
          mutation.disconnect()
          window.removeEventListener('resize', measure)
        }
      }, [page])

      useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || !box) return
        const dpr = window.devicePixelRatio || 1
        canvas.width = Math.round(box.width * dpr)
        canvas.height = Math.round(box.height * dpr)
        canvas.style.width = `${box.width}px`
        canvas.style.height = `${box.height}px`
        paintStrokes(canvas, strokes, canvas.width, canvas.height)
      }, [strokes, box])

      const pointOf = (event) => {
        const rect = canvasRef.current.getBoundingClientRect()
        return {
          x: Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1),
          y: Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1),
        }
      }

      return h('canvas', {
        ref: canvasRef,
        className: 'll-ink',
        style: box ? { left: box.left, top: box.top } : { display: 'none' },
        onPointerDown: (event) => {
          if (!box) return
          // 按住 Ctrl 是「平移画布」，不画
          if (event.ctrlKey) return
          event.preventDefault()
          canvasRef.current.setPointerCapture?.(event.pointerId)
          drawing.current = { tool, color, size: tool === 'eraser' ? 0.014 : 0.0035, points: [pointOf(event)] }
          setStrokes((prev) => [...prev, drawing.current])
        },
        onPointerMove: (event) => {
          if (!drawing.current) return
          drawing.current.points.push(pointOf(event))
          setStrokes((prev) => [...prev])
        },
        onPointerUp: () => { drawing.current = null },
        onPointerCancel: () => { drawing.current = null },
      })
    }

    /* ------------------------------------------------------------ 面板 */

    function Panel() {
      const [server, setServer] = useState(null)
      const [panes, setPanes] = useState([])
      const [focus, setFocus] = useState(0)
      const [tab, setTab] = useState('coach')
      const [railMode, setRailMode] = useState('decks')
      const [draft, setDraft] = useState('')
      const [withImage, setWithImage] = useState(false)
      const [allowDraw, setAllowDraw] = useState(false)
      const [scope, setScope] = useState('auto')
      const [busy, setBusy] = useState('')
      const [error, setError] = useState('')
      const [snack, setSnack] = useState('')
      const [picker, setPicker] = useState(false)
      const [files, setFiles] = useState([])
      const [importing, setImporting] = useState(null)
      const [progress, setProgress] = useState(null)
      const [confirmSummary, setConfirmSummary] = useState(false)
      const [confirmDelete, setConfirmDelete] = useState(null)
      const [editingId, setEditingId] = useState(null)
      const [editDraft, setEditDraft] = useState('')
      const [search, setSearch] = useState('')
      const [tool, setTool] = useState('pen')
      const [color, setColor] = useState(INK_COLORS[0])
      const [accent, setAccent] = useState(() => {
        try {
          return localStorage.getItem('learnlab.accent') || '#7e0c6e'
        } catch {
          return '#7e0c6e'
        }
      })
      const [showSkin, setShowSkin] = useState(false)
      const [sourceDraft, setSourceDraft] = useState('')
      const [savingDir, setSavingDir] = useState(false)
      const [rightWidth, setRightWidth] = useState(() => {
        try {
          const value = Number(localStorage.getItem('learnlab.rightWidth'))
          return value >= MIN_RIGHT && value <= MAX_RIGHT ? value : 420
        } catch {
          return 400
        }
      })
      const [splitRatio, setSplitRatio] = useState(0.5)
      const [panning, setPanning] = useState(null)
      const [paneHeights, setPaneHeights] = useState([])
      const paneRefs = useRef([])
      const splitRef = useRef(null)
      const panRef = useRef(null)
      const zoomHintRef = useRef(false)
      const activeThumbRef = useRef(null)
      const [dragRight, setDragRight] = useState(false)
      const [dragSplit, setDragSplit] = useState(false)
      const [dropHint, setDropHint] = useState(null)

      const [transOpen, setTransOpen] = useState(false)
      const [transMode, setTransMode] = useState('page')
      const [transText, setTransText] = useState('')
      const [transOut, setTransOut] = useState('')
      const [transInfo, setTransInfo] = useState(null)
      const [transBusy, setTransBusy] = useState(false)
      const [transError, setTransError] = useState('')
      const [transTarget, setTransTarget] = useState('auto')
      const [transCfg, setTransCfg] = useState(null)
      const [transSettings, setTransSettings] = useState(false)

      const seq = useRef(0)
      const scrollRef = useRef(null)
      const stickRef = useRef(true)
      const chatAbort = useRef(null)
      const stageRef = useRef(null)

      const pane = panes[focus] ?? null
      const deck = pane?.data?.deck ?? null
      const pages = pane?.data?.pages?.pages ?? []
      const page = pane?.page ?? 1
      const messages = pane?.messages ?? []
      const strokes = pane?.strokes ?? []
      const current = pages[page - 1]
      const dual = panes.length > 1

      const patchPane = useCallback((index, patch) => {
        setPanes((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)))
      }, [])

      const patchData = useCallback((index, patch) => {
        setPanes((prev) => prev.map((item, i) => (i === index ? { ...item, data: { ...item.data, ...patch } } : item)))
      }, [])

      const setPaneMessages = useCallback((index, updater) => {
        setPanes((prev) => prev.map((item, i) => (i === index ? { ...item, messages: updater(item.messages) } : item)))
      }, [])

      const setPaneStrokes = useCallback((updater) => {
        setPanes((prev) => prev.map((item, i) => (i === focus ? { ...item, strokes: updater(item.strokes) } : item)))
      }, [focus])

      const setPaneZoom = useCallback((value) => {
        const next = Math.min(Math.max(value, 0.4), 4)
        setPanes((prev) => prev.map((item, i) => (i === focus ? { ...item, zoom: next } : item)))
        if (next > 1.001 && !zoomHintRef.current) {
          zoomHintRef.current = true
          setSnack('放大后可以按住 Ctrl 拖动画面')
          window.setTimeout(() => setSnack(''), 3000)
        }
      }, [focus])

      const refreshServer = useCallback(async () => {
        const data = await api('/state')
        setServer(data)
        return data
      }, [])

      const loadPane = useCallback(async (id) => {
        const data = await api(`/deck?id=${encodeURIComponent(id)}`)
        let next = 1
        for (const entry of data.chat ?? []) {
          next = Math.max(next, Number(entry.page) || 1)
        }
        const messagesLoaded = (data.chat ?? []).map((entry) => ([
          { id: `q${++seq.current}`, role: 'q', text: entry.q, p: entry.page },
          {
            id: `a${++seq.current}`,
            role: 'a',
            text: entry.a,
            p: entry.page,
            usage: entry.usage,
            ms: entry.ms,
            stopped: Boolean(entry.stopped),
          },
        ])).flat()
        const total = Math.max(data.deck.pageCount || 1, 1)
        const startPage = Math.min(Math.max(data.deck.progress || 1, 1), total)
        return { id, data, page: startPage, messages: messagesLoaded, strokes: [] }
      }, [])

      const openDeck = useCallback(async (id, options = {}) => {
        const { mode = 'replace', at = focus } = options
        setBusy('open')
        setError('')
        try {
          const loaded = await loadPane(id)
          const index = Math.min(Math.max(at, 0), Math.max(panes.length - 1, 0))
          let nextPanes
          let nextFocus
          if (mode === 'top' && panes.length < 2) {
            nextPanes = [loaded, ...panes]
            nextFocus = 0
          } else if (mode === 'bottom' && panes.length < 2) {
            nextPanes = [...panes, loaded]
            nextFocus = panes.length
          } else {
            nextPanes = panes.length ? [...panes] : [loaded]
            nextPanes[index] = loaded
            nextFocus = panes.length ? index : 0
          }
          setPanes(nextPanes)
          setFocus(nextFocus)
          setRailMode('pages')
        } catch (err) {
          setError(err.message)
        } finally {
          setBusy('')
        }
      }, [loadPane, panes, focus])

      const closePane = (index) => {
        setPanes((prev) => prev.filter((_, i) => i !== index))
        setFocus(0)
      }

      useEffect(() => {
        let alive = true
        ;(async () => {
          try {
            const data = await refreshServer()
            if (!alive) return
            let saved = null
            try {
              saved = JSON.parse(localStorage.getItem(LAYOUT_KEY) || 'null')
            } catch {
              saved = null
            }
            const wanted = Array.isArray(saved?.panes) ? saved.panes : []
            const valid = wanted
              .filter((entry) => entry?.id && (data.decks ?? []).some((item) => item.id === entry.id))
              .slice(0, 2)
            if (valid.length) {
              const restored = []
              for (const entry of valid) {
                const loaded = await loadPane(entry.id)
                const total = Math.max(loaded.data.deck.pageCount || 1, 1)
                loaded.page = Math.min(Math.max(Number(entry.page) || 1, 1), total)
                restored.push(loaded)
              }
              if (!alive) return
              setPanes(restored)
              setFocus(Math.min(Math.max(Number(saved.focus) || 0, 0), restored.length - 1))
              if (typeof saved.splitRatio === 'number') {
                setSplitRatio(Math.min(Math.max(saved.splitRatio, 0.06), 0.94))
              }
              setRailMode('pages')
              return
            }
            if (data.decks?.length) openDeck(data.decks[0].id)
          } catch (err) {
            if (alive) setError(err.message)
          }
        })()
        return () => { alive = false }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      useEffect(() => {
        if (scrollRef.current && stickRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }, [messages, page, tab])

      // 记住布局：哪两份、各自第几页、谁在前台、分割比例
      const layoutKey = `${panes.map((item) => `${item.id}@${item.page}`).join('|')}#${focus}#${splitRatio.toFixed(2)}`
      useEffect(() => {
        if (!panes.length) return
        try {
          localStorage.setItem(LAYOUT_KEY, JSON.stringify({
            panes: panes.map((item) => ({ id: item.id, page: item.page })),
            focus,
            splitRatio,
          }))
        } catch {
          /* 忽略 */
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [layoutKey])

      useEffect(() => {
        if (transOpen) {
          api('/translate/config').then(setTransCfg).catch(() => {})
          if (transMode === 'page') setTransText(current?.text || '')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [transOpen, transMode, page, pane?.id])

      useEffect(() => {
        if (!dragRight) return undefined
        const onMove = (event) => setRightWidth(Math.min(Math.max(window.innerWidth - event.clientX, MIN_RIGHT), MAX_RIGHT))
        const onUp = () => {
          setDragRight(false)
          try {
            localStorage.setItem('learnlab.rightWidth', String(rightWidth))
          } catch {
            /* 忽略 */
          }
        }
        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerup', onUp, { once: true })
        return () => {
          window.removeEventListener('pointermove', onMove)
          window.removeEventListener('pointerup', onUp)
        }
      }, [dragRight, rightWidth])

      useEffect(() => {
        if (!dragSplit) return undefined
        const onMove = (event) => {
          const rect = splitRef.current?.getBoundingClientRect() ?? stageRef.current?.getBoundingClientRect()
          if (!rect || !rect.height) return
          const ratio = (event.clientY - rect.top) / rect.height
          setSplitRatio(Math.min(Math.max(ratio, 0.06), 0.94))
        }
        const onUp = () => setDragSplit(false)
        const previous = document.body.style.userSelect
        document.body.style.userSelect = 'none'
        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerup', onUp, { once: true })
        return () => {
          document.body.style.userSelect = previous
          window.removeEventListener('pointermove', onMove)
          window.removeEventListener('pointerup', onUp)
        }
      }, [dragSplit])

      // 实测每个区块的高度：太矮就只显示一行标题
      useEffect(() => {
        const observers = []
        paneRefs.current.slice(0, panes.length).forEach((node, index) => {
          if (!node) return
          const observer = new ResizeObserver((entries) => {
            const height = entries[0]?.contentRect?.height ?? 0
            setPaneHeights((prev) => {
              if (Math.abs((prev[index] ?? 0) - height) < 1) return prev
              const next = [...prev]
              next[index] = height
              return next
            })
          })
          observer.observe(node)
          observers.push(observer)
        })
        return () => observers.forEach((observer) => observer.disconnect())
      }, [panes.length])

      const flash = (text) => {
        setSnack(text)
        window.setTimeout(() => setSnack(''), 2200)
      }

      // 缩略图列表跟随当前页，翻页后自动把当前页滚进视野
      useEffect(() => {
        if (railMode !== 'pages') return
        activeThumbRef.current?.scrollIntoView({ block: 'nearest' })
      }, [page, railMode, panes[focus]?.id])

      // 打开设置时把当前文件夹填进输入框
      useEffect(() => {
        if (showSkin) setSourceDraft(server?.sourceDir ?? '')
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [showSkin])

      // Word 文档没有页内文字，只能整篇发送
      useEffect(() => {
        if (deck?.kind === 'docx' && scope !== 'deck') setScope('deck')
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [deck?.kind])

      // 强调色记在本机
      useEffect(() => {
        try {
          localStorage.setItem('learnlab.accent', accent)
        } catch {
          /* 忽略 */
        }
      }, [accent])

      const goPage = useCallback((next) => {
        if (!pane) return
        const total = Math.max(pages.length, 1)
        const value = Math.min(Math.max(next ?? page, 1), total)
        if (value === page) return
        patchPane(focus, { page: value, strokes: [] })
        post('/progress', { id: pane.id, page: value }).catch(() => {})
      }, [pane, pages.length, page, focus, patchPane])

      useEffect(() => {
        const onKey = (event) => {
          if (!pane) return
          const tag = (event.target?.tagName || '').toLowerCase()
          if (tag === 'input' || tag === 'textarea' || tag === 'select') return
          if ((event.ctrlKey || event.metaKey) && String(event.key).toLowerCase() === 'z') {
            event.preventDefault()
            setPaneStrokes((prev) => prev.slice(0, -1))
            return
          }
          if (event.key === 'ArrowLeft') goPage(page - 1)
          if (event.key === 'ArrowRight') goPage(page + 1)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
      }, [pane, page, goPage, setPaneStrokes])

      // Ctrl + 滚轮缩放当前区块；用原生监听才能阻止浏览器自身缩放
      useEffect(() => {
        const handler = (event) => {
          if (!event.ctrlKey) return
          const view = event.target?.closest?.('.ll-view')
          if (!view) return
          const index = Number(view.dataset.pane)
          if (Number.isNaN(index)) return
          event.preventDefault()
          const step = event.deltaY > 0 ? -0.12 : 0.12
          setPanes((prev) => prev.map((item, i) => (i === index
            ? { ...item, zoom: Math.min(Math.max((item.zoom ?? 1) + step, 0.4), 4) }
            : item)))
        }
        window.addEventListener('wheel', handler, { passive: false })
        return () => window.removeEventListener('wheel', handler)
      }, [])


      const openPicker = async () => {
        setPicker(true)
        setBusy('files')
        try {
          const data = await api('/files')
          setFiles(data.files ?? [])
        } catch (err) {
          setError(err.message)
        } finally {
          setBusy('')
        }
      }

      const doImport = async (filePath) => {
        if (importing) return
        const phases = {
          parse: { label: '解析文字', from: 12, to: 26 },
          render: { label: '转换页面', from: 30, to: 86 },
          save: { label: '写入课件', from: 90, to: 96 },
          reused: { label: '已在课件库', from: 100, to: 100 },
        }
        setImporting({ path: filePath, label: '准备中', percent: 6 })
        setError('')
        let created = null
        let ceiling = 26
        // 转换页面这一步服务端没有中间进度，用缓慢爬升表示"还在跑"
        const creep = window.setInterval(() => {
          setImporting((prev) => {
            if (!prev) return prev
            const next = Math.min(prev.percent + 1, ceiling)
            return next === prev.percent ? prev : { ...prev, percent: next }
          })
        }, 420)
        try {
          await stream('/import', { path: filePath }, (event) => {
            if (event.type === 'phase') {
              const phase = phases[event.phase]
              if (phase) {
                ceiling = phase.to
                setImporting((prev) => (prev ? { ...prev, label: phase.label, percent: Math.max(prev.percent, phase.from) } : prev))
              }
            } else if (event.type === 'done') {
              created = event.deck
              ceiling = 100
              setImporting((prev) => (prev ? { ...prev, label: '完成', percent: 100 } : prev))
            } else if (event.type === 'error') {
              setError(event.message)
            }
          })
          if (created) {
            setPicker(false)
            await refreshServer()
            await openDeck(created.id)
          }
        } catch (err) {
          setError(err.message)
        } finally {
          window.clearInterval(creep)
          setImporting(null)
        }
      }

      const saveSourceDir = async (value) => {
        setSavingDir(true)
        try {
          const data = await post('/settings', { sourceDir: value })
          await refreshServer()
          setSourceDraft(data.sourceDir)
          flash(value ? '课件文件夹已更新' : '已恢复默认文件夹')
        } catch (err) {
          setError(err.message)
        } finally {
          setSavingDir(false)
        }
      }

      const removeDeck = async (item) => {
        setConfirmDelete(null)
        if (!item) return
        try {
          await post('/deck/delete', { id: item.id })
          const data = await refreshServer()
          setPanes((prev) => prev.filter((paneItem) => paneItem.id !== item.id))
          setFocus(0)
          if (!(data.decks ?? []).length) setRailMode('decks')
          flash(`已删除《${item.title}》`)
        } catch (err) {
          setError(err.message)
        }
      }

      const composeAnnotated = async (target) => {
        const url = `${API}/slide?id=${encodeURIComponent(target.id)}&page=${target.page}`
        const image = new Image()
        image.src = url
        await image.decode()
        const width = image.naturalWidth
        const height = image.naturalHeight
        const ink = document.createElement('canvas')
        ink.width = width
        ink.height = height
        paintStrokes(ink, target.strokes ?? [], width, height)
        const out = document.createElement('canvas')
        out.width = width
        out.height = height
        const ctx = out.getContext('2d')
        ctx.drawImage(image, 0, 0)
        ctx.drawImage(ink, 0, 0)
        return out.toDataURL('image/png')
      }

      const saveSnapshot = async () => {
        if (!pane) return
        try {
          const data = await composeAnnotated(pane)
          const result = await post('/snapshot', { id: pane.id, page, data })
          flash(`已存到 snapshots · ${result.path.split(/[\\/]/).pop()}`)
        } catch (err) {
          setError(err.message)
        }
      }

      const ask = async (question, base, keepQuestion, replaceLast = false) => {
        if (!question || !pane) return
        if (busy === 'chat') return
        const index = focus
        const target = pane
        setError('')
        const history = base
          .filter((item) => item.p === page)
          .reduce((acc, item, i, all) => {
            if (item.role === 'q' && all[i + 1]?.role === 'a') acc.push({ q: item.text, a: all[i + 1].text })
            return acc
          }, [])
          .slice(-6)
        const qid = `q${++seq.current}`
        const aid = `a${++seq.current}`
        const annotated = target.strokes.length ? await composeAnnotated(target).catch(() => null) : null
        const seeded = keepQuestion ? base : [...base, { id: qid, role: 'q', text: question, p: page }]
        const startedAt = Date.now()
        setPaneMessages(index, () => [...seeded, { id: aid, role: 'a', text: '', p: page, streaming: true }])
        setEditingId(null)
        stickRef.current = true
        setBusy('chat')
        const controller = new AbortController()
        chatAbort.current = controller
        try {
          await stream('/chat', {
            id: target.id, page, question, withImage, scope, allowDraw, history, replaceLast,
            ...(annotated ? { annotatedImage: annotated } : {}),
          }, (event) => {
            if (event.type === 'scope') {
              setPaneMessages(index, (list) => list.map((item) => (item.id === aid ? { ...item, scope: event.label, hasImage: event.withImage } : item)))
            } else if (event.type === 'delta') {
              setPaneMessages(index, (list) => list.map((item) => (item.id === aid ? { ...item, text: item.text + event.text } : item)))
            } else if (event.type === 'usage') {
              setPaneMessages(index, (list) => list.map((item) => (item.id === aid ? { ...item, usage: event.usage } : item)))
            } else if (event.type === 'error') {
              setError(event.message)
              setPaneMessages(index, (list) => list.map((item) => (item.id === aid ? { ...item, streaming: false, failed: true } : item)))
            } else if (event.type === 'done') {
              setPaneMessages(index, (list) => list.map((item) => (item.id === aid
                ? { ...item, streaming: false, usage: event.usage ?? item.usage, ms: Date.now() - startedAt }
                : item)))
            }
          }, controller.signal)
          if (annotated) setPaneStrokes(() => [])
        } catch (err) {
          if (err.name === 'AbortError') {
            setPaneMessages(index, (list) => list.map((item) => (item.id === aid
              ? { ...item, streaming: false, stopped: true, ms: Date.now() - startedAt }
              : item)))
          } else {
            setError(err.message)
          }
        } finally {
          chatAbort.current = null
          setBusy('')
          setPaneMessages(index, (list) => list.map((item) => (item.streaming
            ? { ...item, streaming: false, ms: item.ms ?? Date.now() - startedAt }
            : item)))
        }
      }

      const stopChat = () => {
        chatAbort.current?.abort()
      }

      const send = async () => {
        const question = draft.trim()
        if (!question || busy) return
        setDraft('')
        await ask(question, messages, false)
      }

      const regenerate = async (answerId) => {
        if (busy) return
        const index = messages.findIndex((item) => item.id === answerId)
        if (index < 0) return
        await ask(messages[index - 1]?.text ?? '', messages.slice(0, index), true, true)
      }

      const editQuestion = async (questionId, text) => {
        const next = String(text ?? '').trim()
        if (!next || busy) return
        const index = messages.findIndex((item) => item.id === questionId)
        if (index < 0) return
        await ask(next, [...messages.slice(0, index), { ...messages[index], text: next }], true, true)
      }

      const saveNote = async (text, pageNo) => {
        if (!pane) return
        try {
          const data = await post('/note', { id: pane.id, page: pageNo ?? page, title: current?.title ?? '', text })
          patchData(focus, { notes: data.notes ?? '' })
          return true
        } catch (err) {
          setError(err.message)
          return false
        }
      }

      const saveNotesFile = async (text) => {
        if (!pane) return
        try {
          await post('/notes', { id: pane.id, text })
          patchData(focus, { notes: text })
        } catch (err) {
          setError(err.message)
        }
      }

      const appendSummary = (index, text) => {
        setPanes((prev) => prev.map((item, i) => (i === index
          ? { ...item, data: { ...item.data, summary: `${item.data.summary ?? ''}${text}` } }
          : item)))
      }

      const runSummary = async () => {
        if (!pane || busy) return
        const index = focus
        setConfirmSummary(false)
        setBusy('summary')
        setTab('summary')
        patchData(index, { summary: '' })
        setError('')
        try {
          await stream('/summary', { id: pane.id }, (event) => {
            if (event.type === 'delta') appendSummary(index, event.text)
            else if (event.type === 'error') setError(event.message)
            else if (event.type === 'done') patchData(index, { summary: event.markdown })
          })
        } catch (err) {
          if (err.name !== 'AbortError') setError(err.message)
        } finally {
          setBusy('')
        }
      }

      const runTranscribe = async (onlyPage) => {
        if (!pane || busy) return
        setBusy('transcribe')
        setError('')
        const total = onlyPage ? 1 : pages.length
        let done = 0
        setProgress({ done: 0, total })
        try {
          await stream('/transcribe', { id: pane.id, pages: onlyPage ? [onlyPage] : undefined }, (event) => {
            if (event.type === 'page-start') setProgress({ done, total, page: event.page })
            else if (event.type === 'page-done') {
              done += 1
              setProgress({ done, total, page: event.page })
            } else if (event.type === 'error') setError(event.message)
          })
          const reloaded = await loadPane(pane.id)
          setPanes((prev) => prev.map((item, i) => (i === focus ? { ...reloaded, strokes: [] } : item)))
        } catch (err) {
          if (err.name !== 'AbortError') setError(err.message)
        } finally {
          setBusy('')
          setProgress(null)
        }
      }

      const stopTranscribe = () => {
        setBusy('')
        setProgress(null)
      }

      const runTranslate = async () => {
        const text = transText.trim()
        if (!text || transBusy) return
        setTransBusy(true)
        setTransError('')
        setTransOut('')
        try {
          const result = await post('/translate', { text, to: transTarget === 'auto' ? undefined : transTarget })
          setTransOut(result.text)
          setTransInfo(result)
        } catch (err) {
          setTransError(err.message)
        } finally {
          setTransBusy(false)
        }
      }

      const saveTransConfig = async () => {
        try {
          const payload = {
            provider: transCfg?.provider ?? 'auto',
            appid: transCfg?.appid ?? '',
          }
          if (transCfg?.key) payload.key = transCfg.key
          const next = await post('/translate/config', payload)
          setTransCfg({ ...next, key: '' })
          flash('翻译设置已保存')
        } catch (err) {
          setTransError(err.message)
        }
      }

      const pageMessages = messages.filter((item) => item.p === page)
      const lastQ = [...pageMessages].reverse().find((item) => item.role === 'q')
      const lastA = [...pageMessages].reverse().find((item) => item.role === 'a' && !item.streaming)
      const noPageText = pages.length > 0 && !pages.some((item) => (item.chars || 0) > 0)
      const pageHasText = Boolean(current?.text)
      const needsText = deck && !pageHasText && !deck.fullText
      const thinking = busy === 'chat'
      const isDoc = deck?.kind === 'docx'
      const scopeHint = isDoc
        ? '这是 Word 文档：文字是整篇的，会整份发给教练，页码只用来定位图片。'
        : scope === 'page'
          ? '这次只把当前这一页发给教练。'
          : scope === 'deck'
            ? '这次把整份课件正文发给教练，适合问跨页的问题。'
            : '自动：带这一页和前后 3 页的正文，外加全篇大纲。'

      const results = useMemo(() => {
        const query = search.trim().toLowerCase()
        if (!query || !pages.length) return []
        return pages
          .map((item) => {
            const text = String(item.text || '')
            const at = text.toLowerCase().indexOf(query)
            if (at < 0 && !String(item.title || '').toLowerCase().includes(query)) return null
            const from = Math.max(0, at - 30)
            return {
              page: item.page,
              title: item.title || `第 ${item.page} 页`,
              snippet: at < 0 ? text.slice(0, 60) : `${from > 0 ? '…' : ''}${text.slice(from, at + query.length + 50)}…`,
            }
          })
          .filter(Boolean)
          .slice(0, 24)
      }, [search, pages])

      const renderMessage = (item) => {
        if (item.role === 'q' && editingId === item.id) {
          return h('div', { key: item.id, className: 'll-msg ll-edit' }, [
            h('textarea', {
              key: 'ta',
              value: editDraft,
              autoFocus: true,
              onChange: (event) => setEditDraft(event.target.value),
              onKeyDown: (event) => {
                if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
                  event.preventDefault()
                  editQuestion(item.id, editDraft)
                }
                if (event.key === 'Escape') setEditingId(null)
              },
            }),
            h('div', { key: 'row', style: { display: 'flex', gap: 8, justifyContent: 'flex-end' } }, [
              h('button', { key: 'c', className: 'll-btn', onClick: () => setEditingId(null) }, '取消'),
              h('button', {
                key: 's',
                className: 'll-btn ll-send',
                disabled: Boolean(busy) || !editDraft.trim(),
                onClick: () => editQuestion(item.id, editDraft),
              }, '保存并重发'),
            ]),
          ])
        }
        return h('div', { key: item.id, className: 'll-msg' }, [
          item.role === 'q'
            ? h('div', { key: 'q', className: 'll-msg-q' }, item.text)
            : h('div', { key: 'a', className: 'll-msg-a' }, [
              item.scope || item.hasImage
                ? h('div', { key: 'meta', className: 'll-msg-meta' }, [
                  item.scope ? h('span', { key: 's', className: 'll-scope-tag' }, `上下文：${item.scope}`) : null,
                  item.hasImage ? h('span', { key: 'i' }, '含页面图片') : null,
                ])
                : null,
              item.streaming && !item.text
                ? h('div', { key: 'think', className: 'll-thinking' }, [
                  h('span', { key: 'd', className: 'll-dots' }, [h('i', { key: 1 }), h('i', { key: 2 }), h('i', { key: 3 })]),
                  h('span', { key: 't' }, `正在读第 ${item.p} 页…`),
                ])
                : item.text
                  ? h('div', { key: 'body' }, h(Markdown, { text: item.text }))
                  : h('div', { key: 'body', className: 'll-hint' },
                    item.stopped ? '（已暂停，这一问没有生成内容。可以「改问题」后重发。）' : item.failed ? '（这一问出错了，可以重新生成。）' : ''),
              item.role === 'a' && !item.streaming && (item.text || item.stopped || item.failed)
                ? h('div', { key: 'act', className: 'll-msg-meta ll-msg-actions' }, [
                  item.text
                    ? h('button', {
                      key: 'save',
                      className: 'll-act',
                      onClick: () => saveNote(item.text, item.p).then(() => setTab('notes')),
                    }, [h(Icon, { key: 'i', name: 'note', size: 13 }), h('span', { key: 't' }, '存为笔记')])
                    : null,
                  item.text
                    ? h('button', {
                      key: 'copy',
                      className: 'll-act',
                      onClick: () => navigator.clipboard?.writeText(item.text),
                    }, [h(Icon, { key: 'i', name: 'copy', size: 13 }), h('span', { key: 't' }, '复制')])
                    : null,
                  lastA && lastA.id === item.id
                    ? h('button', {
                      key: 'regen',
                      className: 'll-act',
                      onClick: () => regenerate(item.id),
                      disabled: Boolean(busy),
                    }, [h(Icon, { key: 'i', name: 'regen', size: 13 }), h('span', { key: 't' }, '重新生成')])
                    : null,
                  lastQ && lastA && lastA.id === item.id
                    ? h('button', {
                      key: 'edit',
                      className: 'll-act',
                      onClick: () => { setEditingId(lastQ.id); setEditDraft(lastQ.text) },
                      disabled: Boolean(busy),
                    }, [h(Icon, { key: 'i', name: 'edit', size: 13 }), h('span', { key: 't' }, '改问题')])
                    : null,
                  h('span', { key: 'grow', style: { flex: 1 } }),
                  item.stopped ? h('span', { key: 'stop' }, '已暂停') : null,
                  item.ms ? h('span', { key: 'ms', title: '生成用时' }, fmtDuration(item.ms)) : null,
                  item.usage
                    ? h('span', { key: 'u', title: '本次调用的 token 用量' },
                      `↑${fmtTokens(item.usage.inputTokens)} ↓${fmtTokens(item.usage.outputTokens)}`)
                    : null,
                ])
                : null,
            ]),
        ])
      }

      const coachBody = !deck
        ? h('div', { className: 'll-empty' }, [
          h(Icon, { key: 'i', name: 'book', size: 22 }),
          h('div', { key: 't', className: 'll-empty-title' }, '先选一份课件'),
        ])
        : pageMessages.length === 0
          ? h('div', { className: 'll-empty' }, [
            h(Icon, { key: 'i', name: 'chat', size: 22 }),
            h('div', { key: 'x', className: 'll-empty-title' }, `第 ${page} 页，有什么想弄清楚的？`),
            h('div', { key: 'y', className: 'll-hint' }, scopeHint),
          ])
          : [h('div', { className: 'll-page-tag', key: 'tag' }, `第 ${page} 页`)].concat(pageMessages.map(renderMessage))

      const railBody = railMode === 'pages' && deck
        ? pages.map((item) => h('div', {
          key: item.page,
          ref: item.page === page ? activeThumbRef : undefined,
          className: `ll-thumb${item.page === page ? ' is-active' : ''}`,
          onClick: () => goPage(item.page),
        }, [
          h('img', {
            key: 'img',
            className: 'll-thumb-img',
            src: `${API}/slide?id=${encodeURIComponent(deck.id)}&page=${item.page}`,
            loading: 'lazy',
            alt: '',
            draggable: false,
          }),
          h('div', { key: 'tx', className: 'll-thumb-text' }, [
            h('div', { key: 'no', className: 'll-thumb-no' }, `第 ${item.page} 页`),
            h('div', { key: 'ti', className: 'll-thumb-title' }, item.title || ''),
          ]),
        ]))
        : !server
          ? h('div', { className: 'll-hint', style: { padding: '10px 12px' } }, '正在载入…')
          : (server.decks ?? []).length === 0
            ? h('div', { className: 'll-hint', style: { padding: '10px 12px' } }, '还没有课件。点右上角「导入」，挑一个工作区里的 pptx 或 pdf。')
            : server.decks.map((item) => {
              const percent = Math.round(((item.progress || 1) / Math.max(item.pageCount || 1, 1)) * 100)
              return h('div', {
                key: item.id,
                className: `ll-deck${deck?.id === item.id ? ' is-active' : ''}`,
                draggable: true,
                onDragStart: (event) => {
                  event.dataTransfer.setData(DECK_MIME, item.id)
                  event.dataTransfer.effectAllowed = 'copy'
                },
                onClick: () => openDeck(item.id),
              }, [
                h('div', { className: 'll-deck-name', key: 'n' }, item.title),
                h('button', {
                  key: 'del',
                  className: 'll-ibtn ll-deck-del',
                  title: '从课件库删除',
                  'aria-label': `删除 ${item.title}`,
                  onClick: (event) => {
                    event.stopPropagation()
                    setConfirmDelete(item)
                  },
                }, h(Icon, { name: 'clear', size: 13 })),
                h('div', { className: 'll-deck-meta', key: 'm' }, [
                  h('span', { key: 'p' }, `第 ${item.progress || 1} / ${item.pageCount || 0} 页`),
                  h('span', { key: 'k' }, item.kind === 'pdf' ? 'PDF' : item.kind === 'docx' ? 'DOC' : 'PPT'),
                ]),
                h('div', { className: 'll-bar', key: 'bar' }, h('i', { style: { width: `${Math.min(percent, 100)}%` } })),
              ])
            })

      const renderPane = (index) => {
        const item = panes[index]
        if (!item) return null
        const isFocus = index === focus
        const total = item.data?.pages?.pages?.length ?? 0
        const title = item.data?.deck?.title ?? ''
        const pageNo = item.page
        const showChrome = panes.length > 1
        const height = paneHeights[index] ?? 0
        const tiny = height > 0 && height < 150
        return h('div', {
          key: `${item.id}-${index}`,
          ref: (node) => { paneRefs.current[index] = node },
          'data-pane': index,
          className: `ll-view${showChrome ? ' is-dual' : ''}${isFocus && showChrome ? ' is-focus' : ''}`,
          onPointerDown: () => { if (focus !== index) setFocus(index) },
        }, [
          showChrome
            ? h('div', { key: 'head', className: 'll-view-head' }, [
              h('div', { key: 't', className: 'll-view-title' }, `${title} · 第 ${pageNo} / ${total} 页`),
              (item.zoom ?? 1) !== 1
                ? h('span', { key: 'z', className: 'll-zoom-badge' }, `${Math.round((item.zoom ?? 1) * 100)}%`)
                : null,
              h('button', {
                key: 'x',
                className: 'll-ibtn ll-view-close',
                title: '关闭这一份',
                'aria-label': '关闭这一份',
                onClick: (event) => { event.stopPropagation(); closePane(index) },
              }, h(Icon, { name: 'close', size: 14 })),
            ])
            : null,
          tiny
            ? h('div', { key: 'tiny', className: 'll-view-titleonly' },
              `${title} · 第 ${pageNo} 页（区块太矮，只显示标题）`)
            : h('div', {
              key: 'media',
              className: `ll-media${(item.zoom ?? 1) > 1 ? ' is-zoomed' : ''}${panning === index ? ' is-panning' : ''}`,
              title: (item.zoom ?? 1) > 1 ? '按住 Ctrl 拖动可以平移画面' : undefined,
              onPointerDown: (event) => {
                if (!event.ctrlKey || (item.zoom ?? 1) <= 1.001) return
                event.preventDefault()
                const node = event.currentTarget
                panRef.current = {
                  x: event.clientX,
                  y: event.clientY,
                  left: node.scrollLeft,
                  top: node.scrollTop,
                  node,
                }
                node.setPointerCapture?.(event.pointerId)
                setPanning(index)
              },
              onPointerMove: (event) => {
                const pan = panRef.current
                if (!pan) return
                pan.node.scrollLeft = pan.left - (event.clientX - pan.x)
                pan.node.scrollTop = pan.top - (event.clientY - pan.y)
              },
              onPointerUp: () => {
                panRef.current = null
                setPanning(null)
              },
              onPointerCancel: () => {
                panRef.current = null
                setPanning(null)
              },
            }, [
              h(SlideImage, { key: 'img', id: item.id, page: pageNo, total, alt: title, zoom: item.zoom ?? 1 }),
              isFocus
                ? h(InkLayer, {
                  key: 'ink',
                  strokes: item.strokes ?? [],
                  setStrokes: setPaneStrokes,
                  tool,
                  color,
                  page: pageNo,
                })
                : null,
              isFocus
                ? h('div', {
                  key: 'prev',
                  className: 'll-zone is-prev',
                  onClick: () => goPage(pageNo - 1),
                  title: '上一页',
                  style: pageNo <= 1 ? { display: 'none' } : undefined,
                }, h(Icon, { name: 'prev', size: 22 }))
                : null,
              isFocus
                ? h('div', {
                  key: 'next',
                  className: 'll-zone is-next',
                  onClick: () => goPage(pageNo + 1),
                  title: '下一页',
                  style: pageNo >= total ? { display: 'none' } : undefined,
                }, h(Icon, { name: 'next', size: 22 }))
                : null,
          ]),
        ])
      }

      return h('div', {
        className: 'll-root',
        style: {
          position: 'relative',
          '--ll-accent': accent,
          '--ll-accent-ink': `color-mix(in srgb, ${accent} 68%, var(--dsw-alias-label-primary))`,
          '--ll-accent-soft': `color-mix(in srgb, ${accent} 14%, transparent)`,
          '--dsw-alias-brand-primary': accent,
        },
      }, [
        h('style', { key: 'css' }, CSS),

        h('div', { className: 'll-rail', key: 'rail' }, [
          h('div', { className: 'll-rail-head', key: 'head' }, railMode === 'pages' && deck
            ? [
              h('button', {
                key: 'back',
                className: 'll-ibtn',
                onClick: () => setRailMode('decks'),
                title: '返回课件列表',
                'aria-label': '返回课件列表',
              }, h(Icon, { name: 'back' })),
              h('div', { key: 't', className: 'll-rail-title' }, deck.title),
              h('button', {
                key: 'add',
                className: 'll-ibtn',
                onClick: openPicker,
                disabled: Boolean(importing),
                title: '导入课件',
                'aria-label': '导入课件',
              }, h(Icon, { name: 'plus' })),
            ]
            : [
              h('div', { key: 't', className: 'll-rail-title' }, '学习空间'),
              h('button', {
                key: 'add',
                className: 'll-btn',
                onClick: openPicker,
                disabled: Boolean(importing),
                style: { gap: 6 },
              }, [h(Icon, { key: 'i', name: 'plus', size: 14 }), h('span', { key: 't' }, '导入')]),
            ]),
          h('div', { className: 'll-rail-list', key: 'list' }, railBody),
          h('div', { className: 'll-rail-foot', key: 'foot' }, [
            h('button', {
              key: 'skin',
              className: `ll-ibtn${showSkin ? ' is-active' : ''}`,
              title: '设置',
              'aria-label': '设置',
              onClick: () => setShowSkin((prev) => !prev),
            }, h(Icon, { name: 'settings', size: 15 })),
          ]),
          showSkin
            ? h('div', { key: 'skin-panel', className: 'll-skin' }, [
              h('div', { key: 'mt', className: 'll-skin-title' }, '模型'),
              h('div', { key: 'mc', className: 'll-skin-text' }, '教练模型跟随 DSH 默认模型'),
              h('div', { key: 'mv', className: 'll-skin-sub' },
                server?.model?.model ? `当前：${server.model.model}` : '当前：未选择模型'),
              h('div', { key: 'hr', className: 'll-skin-hr' }),
              h('div', { key: 'ct', className: 'll-skin-title' }, '主题色'),
              h('div', { key: 'sw', className: 'll-skin-row' }, ACCENTS.map((value) => h('button', {
                key: value,
                className: `ll-skin-dot${accent.toLowerCase() === value ? ' is-active' : ''}`,
                style: { background: value },
                title: value,
                'aria-label': `主题色 ${value}`,
                onClick: () => setAccent(value),
              }))),
              h('div', { key: 'custom', className: 'll-skin-row' }, [
                h('label', { key: 'l', className: 'll-skin-custom' }, [
                  h('input', {
                    key: 'i',
                    type: 'color',
                    value: accent,
                    onChange: (event) => setAccent(event.target.value),
                    'aria-label': '自定义主题色',
                  }),
                  h('span', { key: 't' }, '自定义'),
                ]),
                h('span', { key: 'g', className: 'll-grow' }),
                h('button', {
                  key: 'reset',
                  className: 'll-btn',
                  onClick: () => setAccent('#7e0c6e'),
                }, '恢复默认'),
              ]),
              h('div', { key: 'hr2', className: 'll-skin-hr' }),
              h('div', { key: 'ft', className: 'll-skin-title' }, '课件文件夹'),
              h('div', { key: 'fc', className: 'll-skin-text' }, '「导入」会从这个文件夹里找课件'),
              h('input', {
                key: 'fi',
                className: 'll-skin-input',
                value: sourceDraft,
                spellCheck: false,
                placeholder: server?.defaultSourceDir ?? '课件源文件目录',
                onChange: (event) => setSourceDraft(event.target.value),
                onKeyDown: (event) => {
                  if (event.key === 'Enter') saveSourceDir(sourceDraft)
                  if (event.key === 'Escape') setSourceDraft(server?.sourceDir ?? '')
                },
              }),
              h('div', { key: 'fr', className: 'll-skin-row', style: { marginTop: 8 } }, [
                h('button', {
                  key: 'save',
                  className: 'll-btn',
                  disabled: savingDir || !sourceDraft.trim() || sourceDraft.trim() === (server?.sourceDir ?? ''),
                  onClick: () => saveSourceDir(sourceDraft),
                }, savingDir ? '保存中…' : '保存'),
                h('span', { key: 'g', className: 'll-grow' }),
                h('button', {
                  key: 'def',
                  className: 'll-btn-ghost',
                  disabled: savingDir,
                  onClick: () => saveSourceDir(''),
                  title: server?.defaultSourceDir ?? '',
                }, '恢复默认'),
              ]),
            ])
            : null,
        ]),

        h('div', { className: 'll-main', key: 'main' }, [
          h('div', { className: 'll-head', key: 'head' }, deck
            ? [
              h('div', { className: 'll-head-title', key: 't' }, deck.title),
              panes.length > 1
                ? h('span', { key: 'cmp', className: 'll-badge' }, [
                  h(Icon, { key: 'i', name: 'compare', size: 12 }),
                  h('span', { key: 't' }, `${panes.length} 份对比`),
                ])
                : null,
              h('span', { key: 'g', style: { flex: 1 } }),
              h('div', { key: 'search', className: 'll-search' }, [
                h('input', {
                  key: 'in',
                  value: search,
                  placeholder: '搜索课件里的文字…',
                  onChange: (event) => setSearch(event.target.value),
                  onKeyDown: (event) => { if (event.key === 'Escape') setSearch('') },
                }),
                search.trim() && results.length
                  ? h('div', { key: 'res', className: 'll-results' }, results.map((item) => h('div', {
                    key: item.page,
                    className: 'll-result',
                    onClick: () => { goPage(item.page); setSearch('') },
                  }, [
                    h('div', { key: 'h', className: 'll-result-head' }, `第 ${item.page} 页 · ${item.title}`),
                    h('div', { key: 'b', className: 'll-result-body' }, item.snippet),
                  ])))
                  : null,
                search.trim() && !results.length
                  ? h('div', { key: 'none', className: 'll-results' }, h('div', { className: 'll-hint', style: { padding: 10 } }, '没有找到匹配的页面'))
                  : null,
              ]),
              h('button', {
                key: 'trans',
                className: `ll-btn${transOpen ? ' ll-send' : ''}`,
                onClick: () => setTransOpen((prev) => !prev),
                title: '翻译',
                style: { gap: 6 },
              }, [h(Icon, { key: 'i', name: 'translate', size: 14 }), h('span', { key: 't' }, '翻译')]),
              h('div', { className: 'll-head-meta', key: 'm' }, `${pages.length} 页`),
            ]
            : h('div', { className: 'll-head-title', key: 't' }, 'LearnLab')),

          deck
            ? h('div', {
              className: 'll-stage',
              key: 'stage',
              ref: stageRef,
              onDragOver: (event) => {
                if (!event.dataTransfer.types.includes(DECK_MIME)) return
                event.preventDefault()
                const rect = event.currentTarget.getBoundingClientRect()
                setDropHint((event.clientY - rect.top) / rect.height < 0.5 ? 'top' : 'bottom')
              },
              onDragLeave: () => setDropHint(null),
              onDrop: (event) => {
                const id = event.dataTransfer.getData(DECK_MIME)
                setDropHint(null)
                if (!id) return
                event.preventDefault()
                const rect = event.currentTarget.getBoundingClientRect()
                const upper = (event.clientY - rect.top) / rect.height < 0.5
                if (panes.length >= 2) openDeck(id, { mode: 'replace', at: upper ? 0 : 1 })
                else openDeck(id, { mode: upper ? 'top' : 'bottom' })
              },
            }, [
              h('div', { className: 'll-split', key: 'split' }, panes.length > 1
                ? [
                  h('div', { key: 'p0', style: { flex: `0 0 ${Math.round(splitRatio * 100)}%`, minHeight: 0, display: 'flex' } }, renderPane(0)),
                  h('div', {
                    key: 'div',
                    className: `ll-divider${dragSplit ? ' is-dragging' : ''}`,
                    onPointerDown: (event) => { event.preventDefault(); setDragSplit(true) },
                    title: '拖动调整上下比例',
                  }),
                  h('div', { key: 'p1', style: { flex: 1, minHeight: 0, display: 'flex' } }, renderPane(1)),
                ]
                : renderPane(0)),
              dropHint
                ? h('div', { key: 'hint', className: `ll-drop is-${dropHint}` },
                  dropHint === 'top' ? '放到上方，与当前课件上下对比' : '放到下方，与当前课件上下对比')
                : null,
              h('div', { className: 'll-bottom', key: 'bottom' }, [
                h('div', { className: 'll-inktools', key: 'ink' }, [
                  h('button', {
                    key: 'pen',
                    className: `ll-ibtn${tool === 'pen' ? ' is-active' : ''}`,
                    onClick: () => setTool('pen'),
                    title: '画笔',
                    'aria-label': '画笔',
                  }, h(Icon, { name: 'pen' })),
                  ...INK_COLORS.map((value) => h('button', {
                    key: value,
                    className: `ll-swatch${color === value && tool === 'pen' ? ' is-active' : ''}`,
                    onClick: () => { setColor(value); setTool('pen') },
                    title: '换颜色',
                    'aria-label': '换颜色',
                  }, h('span', { className: 'll-dot', style: { background: value } }))),
                  h('span', { key: 'sep1', className: 'll-ink-sep' }),
                  h('button', {
                    key: 'eraser',
                    className: `ll-ibtn${tool === 'eraser' ? ' is-active' : ''}`,
                    onClick: () => setTool('eraser'),
                    title: '橡皮',
                    'aria-label': '橡皮',
                  }, h(Icon, { name: 'eraser' })),
                  h('button', {
                    key: 'undo',
                    className: 'll-ibtn',
                    onClick: () => setPaneStrokes((prev) => prev.slice(0, -1)),
                    title: '撤销一笔',
                    'aria-label': '撤销一笔',
                  }, h(Icon, { name: 'undo' })),
                  h('button', {
                    key: 'clear',
                    className: 'll-ibtn',
                    onClick: () => setPaneStrokes(() => []),
                    title: '清空笔迹',
                    'aria-label': '清空笔迹',
                  }, h(Icon, { name: 'clear' })),
                  h('span', { key: 'sep2', className: 'll-ink-sep' }),
                  h('button', {
                    key: 'shot',
                    className: 'll-ibtn',
                    onClick: saveSnapshot,
                    title: '把这一页（连笔迹）存成图片',
                    'aria-label': '保存这一页',
                  }, h(Icon, { name: 'camera' })),
                ]),
                h('div', { className: 'll-nav', key: 'nav' }, [
                  h('button', {
                    key: 'prev',
                    className: 'll-ibtn',
                    onClick: () => goPage(page - 1),
                    disabled: page <= 1,
                    title: '上一页',
                    'aria-label': '上一页',
                  }, h(Icon, { name: 'prev' })),
                  h('span', { key: 'box', className: 'll-pagebox' }, [
                    h('input', {
                      key: 'input',
                      value: String(page),
                      style: { width: `${Math.max(1, String(page).length)}ch` },
                      'aria-label': '页码',
                      onChange: (event) => {
                        const value = Number(event.target.value.replace(/[^\d]/g, ''))
                        if (value) goPage(value)
                      },
                    }),
                    h('span', { key: 'sep', className: 'll-page-sep' }, '/'),
                    h('span', { key: 'total', className: 'll-page-total' }, String(pages.length)),
                  ]),
                  h('button', {
                    key: 'next',
                    className: 'll-ibtn',
                    onClick: () => goPage(page + 1),
                    disabled: page >= pages.length,
                    title: '下一页',
                    'aria-label': '下一页',
                  }, h(Icon, { name: 'next' })),
                ]),
                h('div', { className: 'll-zoomctl', key: 'zoom' }, [
                  h('button', {
                    key: 'out',
                    className: 'll-ibtn',
                    onClick: () => setPaneZoom((pane?.zoom ?? 1) - 0.15),
                    disabled: (pane?.zoom ?? 1) <= 0.4,
                    title: '缩小',
                    'aria-label': '缩小',
                  }, h(Icon, { name: 'minus', size: 14 })),
                  h('button', {
                    key: 'val',
                    className: 'll-zoomval',
                    onClick: () => setPaneZoom(1),
                    title: '还原 100%（也可以 Ctrl + 滚轮缩放）',
                  }, `${Math.round((pane?.zoom ?? 1) * 100)}%`),
                  h('button', {
                    key: 'in',
                    className: 'll-ibtn',
                    onClick: () => setPaneZoom((pane?.zoom ?? 1) + 0.15),
                    disabled: (pane?.zoom ?? 1) >= 4,
                    title: '放大（Ctrl + 滚轮同效）',
                    'aria-label': '放大',
                  }, h(Icon, { name: 'plus', size: 14 })),
                ]),
              ]),
              needsText && busy !== 'transcribe'
                ? h('div', { className: 'll-hint', key: 'need' }, [
                  '这是 PDF 课件，还没有可用的文字。',
                  h('button', { key: 'go', className: 'll-link', onClick: () => runTranscribe() }, ' 开始逐页识别'),
                ])
                : null,
            ])
            : h('div', { className: 'll-empty', key: 'empty' }, [
              h('div', { key: 'a', className: 'll-empty-title' }, '选一份课件开始'),
              h('div', { key: 'b' }, '或者点左上角「导入」，从工作区挑一个 pptx / pdf。'),
              h('div', { key: 'c', className: 'll-hint' }, `课件会放在 ${server?.learnLabDir ?? 'LearnLab'}`),
            ]),

          busy === 'transcribe'
            ? h('div', { className: 'll-task', key: 'task' }, [
              h('span', { key: 'l' }, `正在识别第 ${progress?.page ?? '-'} 页（${progress?.done ?? 0}/${progress?.total ?? 0}）`),
              h('div', { key: 'bar', className: 'll-progress ll-grow' }, h('i', { style: { width: `${Math.round(((progress?.done ?? 0) / Math.max(progress?.total ?? 1, 1)) * 100)}%` } })),
              h('button', { key: 'stop', className: 'll-btn', onClick: () => stopTranscribe() }, '停止'),
            ])
            : null,

          snack ? h('div', { className: 'll-task', key: 'snack' }, h('span', null, snack)) : null,
          error ? h('div', { className: 'll-error', key: 'err' }, error) : null,

          transOpen
            ? h('div', { className: 'll-trans', key: 'trans' }, [
              h('div', { className: 'll-trans-head', key: 'head' }, [
                h('div', { key: 'seg', className: 'll-seg' }, [
                  h('button', { key: 'page', className: transMode === 'page' ? 'is-active' : '', onClick: () => setTransMode('page') }, '整页'),
                  h('button', { key: 'text', className: transMode === 'text' ? 'is-active' : '', onClick: () => setTransMode('text') }, '输入'),
                ]),
                h('span', { key: 'g', className: 'll-grow' }),
                h('div', { key: 'target', className: 'll-seg' }, [
                  h('button', { key: 'auto', className: transTarget === 'auto' ? 'is-active' : '', onClick: () => setTransTarget('auto') }, '自动'),
                  h('button', { key: 'zh', className: transTarget === 'zh' ? 'is-active' : '', onClick: () => setTransTarget('zh') }, '中文'),
                  h('button', { key: 'en', className: transTarget === 'en' ? 'is-active' : '', onClick: () => setTransTarget('en') }, 'EN'),
                ]),
                h('button', {
                  key: 'gear',
                  className: 'll-ibtn',
                  title: '翻译服务设置',
                  'aria-label': '翻译服务设置',
                  onClick: () => setTransSettings((prev) => !prev),
                }, h(Icon, { name: 'settings', size: 15 })),
                h('button', {
                  key: 'x',
                  className: 'll-ibtn',
                  title: '关闭翻译',
                  'aria-label': '关闭翻译',
                  onClick: () => setTransOpen(false),
                }, h(Icon, { name: 'close', size: 15 })),
              ]),
              transSettings
                ? h('div', { className: 'll-trans-body', key: 'settings' }, [
                  h('div', { key: 'h', className: 'll-hint' }, [
                    h('div', { key: 'a' }, '百度翻译 appid 与密钥获取：fanyi-api.baidu.com'),
                    h('div', { key: 'b' }, '未填写则使用 MyMemory'),
                  ]),
                  h('div', { key: 'p', className: 'll-seg', style: { alignSelf: 'flex-start' } }, [
                    h('button', {
                      key: 'auto', className: (transCfg?.provider ?? 'auto') === 'auto' ? 'is-active' : '',
                      onClick: () => setTransCfg((prev) => ({ ...prev, provider: 'auto' })),
                    }, '自动'),
                    h('button', {
                      key: 'baidu', className: transCfg?.provider === 'baidu' ? 'is-active' : '',
                      onClick: () => setTransCfg((prev) => ({ ...prev, provider: 'baidu' })),
                    }, '只用百度'),
                    h('button', {
                      key: 'mymemory', className: transCfg?.provider === 'mymemory' ? 'is-active' : '',
                      onClick: () => setTransCfg((prev) => ({ ...prev, provider: 'mymemory' })),
                    }, '只用 MyMemory'),
                  ]),
                  h('input', {
                    key: 'appid',
                    className: 'll-editor',
                    style: { border: '1px solid var(--dsw-alias-border-l1)', borderRadius: 8, padding: '6px 8px', minHeight: 32 },
                    placeholder: '百度 appid',
                    value: transCfg?.appid ?? '',
                    onChange: (event) => setTransCfg((prev) => ({ ...prev, appid: event.target.value })),
                  }),
                  h('input', {
                    key: 'key',
                    className: 'll-editor',
                    style: { border: '1px solid var(--dsw-alias-border-l1)', borderRadius: 8, padding: '6px 8px', minHeight: 32 },
                    placeholder: transCfg?.hasKey ? '密钥已保存，留空则不修改' : '百度密钥',
                    value: transCfg?.key ?? '',
                    onChange: (event) => setTransCfg((prev) => ({ ...prev, key: event.target.value })),
                  }),
                  h('div', { key: 'row', className: 'll-trans-row' }, [
                    h('button', { key: 'save', className: 'll-btn ll-send', onClick: saveTransConfig }, '保存'),
                    h('button', { key: 'back', className: 'll-btn', onClick: () => setTransSettings(false) }, '返回'),
                  ]),
                ])
                : h('div', { className: 'll-trans-body', key: 'body' }, [
                  h('textarea', {
                    key: 'ta',
                    value: transText,
                    placeholder: transMode === 'page' ? '这一页没有可翻译的文字' : '粘贴或输入要翻译的内容',
                    onChange: (event) => setTransText(event.target.value),
                  }),
                  h('div', { key: 'row', className: 'll-trans-row' }, [
                    h('button', { key: 'go', className: 'll-btn ll-send', onClick: runTranslate, disabled: transBusy || !transText.trim() }, transBusy ? '翻译中…' : '翻译'),
                    h('button', {
                      key: 'copy',
                      className: 'll-btn',
                      disabled: !transOut,
                      onClick: () => navigator.clipboard?.writeText(transOut),
                    }, '复制'),
                    h('span', { key: 'g', className: 'll-grow' }),
                    transInfo
                      ? h('span', { key: 'p', className: 'll-hint' },
                        `${transInfo.provider}${transInfo.provider === 'mymemory' ? '（免费）' : ''} · ${transInfo.from}→${transInfo.to}`)
                      : null,
                  ]),
                  transError ? h('div', { key: 'err', className: 'll-error', style: { padding: 0 } }, transError) : null,
                  transOut ? h('div', { key: 'out', className: 'll-trans-out' }, transOut) : null,
                ]),
            ])
            : null,
        ]),

        h('div', {
          key: 'resizer',
          className: `ll-resizer${dragRight ? ' is-dragging' : ''}`,
          onPointerDown: (event) => { event.preventDefault(); setDragRight(true) },
          onDoubleClick: () => {
            setRightWidth(420)
            try {
              localStorage.setItem('learnlab.rightWidth', '420')
            } catch {
              /* 忽略 */
            }
          },
          title: '拖动调整宽度，双击复位',
        }),

        h('div', { className: 'll-right', key: 'right', style: { width: rightWidth } }, [
          h('div', { className: 'll-tabs', key: 'tabs' }, ['coach', 'notes', 'summary'].map((key) => h('div', {
            key,
            className: `ll-tab${tab === key ? ' is-active' : ''}`,
            onClick: () => setTab(key),
          }, key === 'coach' ? '教练' : key === 'notes' ? '笔记' : '总结'))),

          tab === 'coach'
            ? h('div', { className: 'll-pane', key: 'coach' }, [
              h('div', {
                className: 'll-scroll',
                key: 'scroll',
                ref: scrollRef,
                onScroll: (event) => {
                  const el = event.currentTarget
                  stickRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 48
                },
              }, coachBody),
              h('div', { className: 'll-composer', key: 'composer' },
                h('div', { className: 'll-card' }, [
                  h('textarea', {
                    key: 'ta',
                    className: 'll-editor',
                    placeholder: deck ? `就第 ${page} 页提问…` : '先选一份课件',
                    value: draft,
                    disabled: !deck,
                    rows: 2,
                    onChange: (event) => setDraft(event.target.value),
                    onKeyDown: (event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault()
                        if (!thinking) send()
                      }
                    },
                  }),
                  (strokes.length > 0 || needsText)
                    ? h('div', { className: 'll-tools-line', key: 'info' }, [
                      strokes.length
                        ? h('span', { key: 'ink', className: 'll-hint' }, `笔迹 ${strokes.length} 笔会并入图片`)
                        : null,
                      needsText
                        ? h('button', {
                          key: 'ocr',
                          className: 'll-btn-ghost',
                          onClick: () => runTranscribe(page),
                          disabled: Boolean(busy),
                          title: '把这一页交给模型读一遍，转成可检索的文字',
                        }, `识别第 ${page} 页`)
                        : null,
                    ])
                    : null,
                  h('div', { className: 'll-tools', key: 'tools' }, [
                    h('div', {
                      key: 'scope',
                      className: 'll-seg',
                      title: isDoc ? 'Word 文档只能整篇发送' : '这次提问要看多少内容',
                    },
                      [['auto', '自动'], ['page', '本页'], ['deck', '全篇']].map(([value, label]) => {
                        const locked = isDoc && value !== 'deck'
                        return h('button', {
                          key: value,
                          className: `${scope === value ? 'is-active' : ''}${locked ? ' is-locked' : ''}`,
                          disabled: locked,
                          title: locked ? 'Word 文档没有页内文字，只能整篇发送' : undefined,
                          onClick: () => { if (!locked) setScope(value) },
                        }, label)
                      })),
                    h('button', {
                      key: 'img',
                      className: `ll-chip${withImage ? ' is-on' : ''}`,
                      onClick: () => setWithImage((prev) => !prev),
                      title: withImage ? '带图：已开启，提问会附上本页图片' : '带图：让教练看到这一页',
                      'aria-label': '带图',
                      'aria-pressed': withImage,
                    }, [h(Icon, { key: 'i', name: 'image', size: 13 }), h('span', { key: 't' }, '带图')]),
                    h('button', {
                      key: 'draw',
                      className: `ll-chip${allowDraw ? ' is-on' : ''}`,
                      onClick: () => setAllowDraw((prev) => !prev),
                      title: '允许教练在回答里画示意图',
                      'aria-pressed': allowDraw,
                    }, [h(Icon, { key: 'i', name: 'draw', size: 13 }), h('span', { key: 't' }, '画图')]),
                    h('span', { key: 'grow', className: 'll-grow' }),
                    thinking
                      ? h('button', {
                        key: 'stop',
                        className: 'll-btn ll-stop ll-send-icon',
                        onClick: stopChat,
                        title: '暂停生成',
                        'aria-label': '暂停生成',
                      }, h(Icon, { key: 'i', name: 'stop', size: 12 }))
                      : h('button', {
                        key: 'send',
                        className: 'll-btn ll-send ll-send-icon',
                        onClick: send,
                        title: '发送（Enter）',
                        'aria-label': '发送',
                        disabled: !deck || Boolean(busy) || !draft.trim(),
                      }, h(Icon, { key: 'i', name: 'send', size: 15 })),
                  ]),
                ])),
            ])
            : null,

          tab === 'notes'
            ? h('div', { className: 'll-pane', key: 'notes' }, [
              h('div', { className: 'll-scroll', key: 'scroll' }, [
                h('div', { className: 'll-hint', key: 'h' }, '纯 markdown，直接改，失焦即保存到 notes.md。'),
                h('textarea', {
                  key: 'ta',
                  className: 'll-notes-editor',
                  value: pane?.data?.notes ?? '',
                  disabled: !deck,
                  onChange: (event) => patchData(focus, { notes: event.target.value }),
                  onBlur: (event) => deck && saveNotesFile(event.target.value),
                }),
              ]),
            ])
            : null,

          tab === 'summary'
            ? h('div', { className: 'll-pane', key: 'summary' }, [
              h('div', { className: 'll-scroll', key: 'scroll' }, deck
                ? (pane?.data?.summary
                  ? h(Markdown, { key: 'md', text: pane.data.summary })
                  : h('div', { className: 'll-empty' }, [
                    h(Icon, { key: 'i', name: 'summary', size: 22 }),
                    h('div', { key: 'a', className: 'll-empty-title' }, '学完了？生成一份可以复习的总结'),
                    h('div', { key: 'b' }, '会写到这份课件目录下的 summary.md，包含知识结构、易错点和自测题。'),
                  ]))
                : h('div', { className: 'll-empty' }, '先选一份课件')),
              h('div', { className: 'll-composer', key: 'composer' },
                h('div', { key: 'row', style: { display: 'flex', alignItems: 'center', gap: 8 } }, [
                  h('button', {
                    key: 'run',
                    className: 'll-btn ll-send',
                    onClick: () => setConfirmSummary(true),
                    disabled: !deck || Boolean(busy),
                  }, busy === 'summary' ? '正在写…' : pane?.data?.summary ? '重新生成' : '生成总结'),
                  h('span', { key: 'grow', className: 'll-grow' }),
                  h('span', { key: 'hint', className: 'll-hint' }, '全文 + 你问过的问题'),
                ])),
            ])
            : null,
        ]),

        picker
          ? h('div', { className: 'll-overlay', key: 'overlay', onClick: (event) => { if (event.target === event.currentTarget && !importing) setPicker(false) } },
            h('div', { className: 'll-modal' }, [
              h('div', { className: 'll-modal-head', key: 'head' }, [
                h('span', { key: 't' }, '从工作区选一份课件'),
                h('button', {
                  key: 'x',
                  className: 'll-ibtn',
                  onClick: () => setPicker(false),
                  disabled: Boolean(importing),
                  title: '关闭',
                  'aria-label': '关闭',
                }, h(Icon, { name: 'close', size: 15 })),
              ]),
              h('div', { className: 'll-modal-body', key: 'body' },
                busy === 'files'
                  ? h('div', { className: 'll-hint', style: { padding: 12 } }, '正在找…')
                  : files.length === 0
                    ? h('div', { key: 'empty', style: { padding: 12 } }, [
                      h('div', { key: 'a', className: 'll-hint' }, '这个文件夹里还没有可导入的课件。'),
                      h('div', { key: 'b', className: 'll-hint', style: { marginTop: 6 } }, '把 pptx / ppt / pdf / docx 放进：'),
                      h('div', { key: 'c', className: 'll-path' }, server?.sourceDir ?? ''),
                      h('button', {
                        key: 'd',
                        className: 'll-btn-ghost',
                        style: { marginTop: 8 },
                        onClick: () => { setPicker(false); setShowSkin(true) },
                      }, '更改文件夹'),
                    ])
                    : files.map((file) => h('div', {
                      key: file.path,
                      className: `ll-file${importing?.path === file.path ? ' is-busy' : ''}`,
                      onClick: () => doImport(file.path),
                    }, [
                      h('span', { key: 'n', className: 'll-file-name' }, file.relative),
                      h('span', { key: 's', className: 'll-hint' }, importing?.path === file.path ? `${importing.label}…` : ''),
                    ]))),
              importing
                ? h('div', { key: 'foot', style: { padding: '0 16px 14px', display: 'flex', flexDirection: 'column', gap: 6 } }, [
                  h('div', { key: 'l', className: 'll-hint' }, `${importing.label} · 大课件转换需要十几秒`),
                  h('div', { key: 'bar', className: 'll-progress' }, h('i', { style: { width: `${importing.percent}%` } })),
                ])
                : null,
            ]))
          : null,

        confirmSummary
          ? h('div', { className: 'll-overlay', key: 'confirm', onClick: (event) => { if (event.target === event.currentTarget) setConfirmSummary(false) } },
            h('div', { className: 'll-modal', style: { width: 'min(420px, 86%)' } }, [
              h('div', { className: 'll-modal-head', key: 'h' }, '生成学习总结'),
              h('div', { className: 'll-modal-body', key: 'b' }, [
                h('div', { key: '1' }, '会把整份课件正文和你问过的问题一起发给模型，生成一份总结。'),
                h('div', { key: '2', className: 'll-hint', style: { marginTop: 8 } },
                  pane?.data?.summary ? '现有的 summary.md 会被覆盖。' : '结果会保存为 summary.md。'),
              ]),
              h('div', { className: 'll-modal-foot', key: 'f' }, [
                h('button', { key: 'c', className: 'll-btn', onClick: () => setConfirmSummary(false) }, '取消'),
                h('button', { key: 'ok', className: 'll-btn ll-send', onClick: runSummary }, '生成'),
              ]),
            ]))
          : null,

        confirmDelete
          ? h('div', { className: 'll-overlay', key: 'confirm-delete', onClick: (event) => { if (event.target === event.currentTarget) setConfirmDelete(null) } },
            h('div', { className: 'll-modal', style: { width: 'min(420px, 86%)' } }, [
              h('div', { className: 'll-modal-head', key: 'h' }, '删除课件'),
              h('div', { className: 'll-modal-body', key: 'b' }, [
                h('div', { key: '1' }, `《${confirmDelete.title}》会从课件库移除，笔记、总结、对话和截图一起删除。`),
                h('div', { key: '2', className: 'll-hint', style: { marginTop: 8 } },
                  `原始文件不会动：${confirmDelete.source || '源文件'}`),
              ]),
              h('div', { className: 'll-modal-foot', key: 'f' }, [
                h('button', { key: 'c', className: 'll-btn', onClick: () => setConfirmDelete(null) }, '取消'),
                h('button', {
                  key: 'ok',
                  className: 'll-btn ll-danger',
                  onClick: () => removeDeck(confirmDelete),
                }, '删除'),
              ]),
            ]))
          : null,
      ])
    }

    function PanelIcon(props) {
      const size = props?.size ?? 20
      return h('svg', {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.6,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': true,
        style: { display: 'block', opacity: props?.active ? 1 : 0.82 },
      }, [
        h('path', { key: 'b', d: 'M3 5.5A2.5 2.5 0 0 1 5.5 3H11v16H5.5A2.5 2.5 0 0 0 3 21.5z' }),
        h('path', { key: 'c', d: 'M13 3h5.5A2.5 2.5 0 0 1 21 5.5v6' }),
        h('path', { key: 'd', d: 'M13 19h3' }),
        h('path', { key: 'e', d: 'M17.5 13.5c1.9 0 3.5 1.4 3.5 3.1 0 1.2-.8 2.2-2 2.7l.3 1.7-1.9-1.1h-.5c-1.7 0-3-1.1-3-2.6 0-2 1.7-3.8 3.6-3.8z' }),
      ])
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        const disposers = []
        try {
          disposers.push(ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
            name: 'sidebar.panellist',
            id: 'learnlab',
            order: 20,
            label: () => '学习',
          }, PanelIcon)))

          disposers.push(ctx.slots.inject('main', () => ctx.slots.register({
            name: 'main',
            key: 'learnlab',
          }, Panel)))
        } catch (error) {
          console.error('[learnlab] 注册面板失败', error)
        }

        ctx.effect?.(() => () => {
          for (const dispose of disposers.splice(0)) {
            try {
              dispose?.()
            } catch {
              /* 清理失败不影响卸载 */
            }
          }
        })
      },
    }
})()
