/* Pacific Command - Mission Builder */

const { useState, useMemo, useEffect, useRef } = React;

const uid = () => Math.random().toString(36).slice(2, 9);
const ScifiCtx = React.createContext(false);
const useScifi = () => React.useContext(ScifiCtx);
const LiteralNamesCtx = React.createContext(false);
const useLiteralNames = () => React.useContext(LiteralNamesCtx);

// Terminology map
const T = (scifi) => ({
  aircraft:         scifi ? 'Aerospace Craft'      : 'Aircraft',
  aircraftCapacity: scifi ? 'Capacity'             : 'Air Capacity',
  submarine:        scifi ? 'Stealth Frigate'       : 'Submarine',
  depthCharges:     scifi ? 'De-Stealth Charges'   : 'Depth Charges',
  seaplaneTender:   scifi ? 'Scout Ship Tender'    : 'Seaplane Tender',
  air:              scifi ? 'Aero'                 : 'Air',
});

// Display unit name with scifi swaps
function scifiUnitName(id, name, terms) {
  if (id === 'submarine')      return terms.submarine;
  if (id === 'seaplane-tender') return terms.seaplaneTender;
  return name;
}
const STORE_KEY = 'pacific-command:v6';
const classMap = () => Object.fromEntries(window.SHIP_CLASSES.map(c => [c.id, c]));
const modMap   = () => Object.fromEntries(window.MODIFICATIONS.map(m => [m.id, m]));

// ─── Icons ─────────────────────────────────────────────
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };

const Icon = {
  Add: (p) => <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" {...p}><path d="M10 4.5v11M4.5 10h11" {...S}/></svg>,
  Subtract: (p) => <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" {...p}><path d="M4.5 10h11" {...S}/></svg>,
  Check: (p) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <polyline points="2.5,8.5 6.5,12.5 13.5,3.5"/>
  </svg>,
  Close: (p) => <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true" {...p}><path d="M5 5l10 10M15 5L5 15" {...S}/></svg>,
  Print: (p) => <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" {...p}>
    <path d="M6 5V3.5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1V5M5 14H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-1M6 11h8v6H6z" {...S}/>
  </svg>,
  Delete: (p) => <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" {...p}>
    <path d="M4 6h12M8 6V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2m-7 0v9a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6" {...S}/>
  </svg>,
  Warning: (p) => <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" {...p}>
    <path d="M10 3l8 14H2l8-14zM10 8v4" {...S}/><circle cx="10" cy="15" r="0.7" fill="currentColor" stroke="none"/>
  </svg>,
  Restart: (p) => <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" {...p}>
    <path d="M4 10a6 6 0 1 1 1.76 4.24M4 10V6m0 4h4" {...S}/>
  </svg>,
  Document: (p) => <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" {...p}>
    <path d="M5 3h7l3 3v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM12 3v3h3" {...S}/>
  </svg>,

  ShipCarrier:    (p) => <svg width="24" height="24" viewBox="0 0 512 512" aria-hidden="true" fill="currentColor" stroke="none" {...p}>
    <path d="M247 26v17h-39v18h39v20h-32v42h-14.027l-4.364 12H151l-.604 71.986 30.502 122.934c-48.878 3.346-97.752 8.937-145.013 16.414l2.812 17.777a1639.075 1639.075 0 0 1 121.096-14.529l-.078.31c112.547 28.156 190.551 43.088 306.816-8.958l-7.355-16.43a485.085 485.085 0 0 1-26.844 11.092c-32.19-4.323-65.92-7.053-100.55-8.356l16.316-64.314L464 176H324.275l-13.248-53H297V81h-32V61h39V43h-39V26h-18zm89.91 0 30.045 35 18.54 15.557L350.331 96h58.334l27.809 23.334 39.474 23.334-16.14-23.334L432 96h58.334l-81.506-19.443L390.288 61 336.91 26zM233 99h46v24h-46V99zm-17.973 42h81.946l8.75 35h-8.928L256 153.748l-59.133 27.89L215.027 141zM169 153h21.063l-14.678 40.357L169 196.84V153zm87 21.252v152.346c-5.41.103-10.833.238-16.262.402h-40.46l-29.071-110.316L256 174.252zM241.25 345h82.404c22.502.709 44.618 2.01 66.149 3.96-58.924 14.561-109.381 9.793-169.532-3.194 7.006-.306 13.999-.558 20.979-.766zm-132.865 29.363c-7.943-.023-15.667.234-23.084.842l1.469 17.941c54.39-4.455 133.014 12.49 189.199 17.202 55.64 4.665 109.966-1.684 168.654-13.512l-3.557-17.645c-57.8 11.65-110.279 17.692-163.591 13.221-47.153-3.954-113.49-17.885-169.09-18.049zm20.22 35.285c-12.198-.079-25.387.615-38.517 1.873-26.26 2.518-51.6 7.157-67.865 14.26l7.203 16.496c12.302-5.372 37.244-10.427 62.38-12.838 25.138-2.41 51.157-2.311 65.846.625 32.956 6.589 91.409 16.938 138.62 15.444l-.569-17.99c-44.053 1.394-102.073-8.619-134.523-15.106-9.17-1.833-20.376-2.684-32.575-2.764z"/>
  </svg>,
  ShipBattleship: (p) => <svg width="24" height="24" viewBox="0 0 512 512" aria-hidden="true" fill="currentColor" stroke="none" {...p}>
    <path d="M247 32v23h-23v18h23v22h-39v18h39v22h-46.027l-2.54 10.154-18.408-9.205-8.05 16.102 21.988 10.994-10.578 42.312-25.592 13.96 23.691 110.564c-49.074 3.341-98.15 8.946-145.6 16.453l2.813 17.777a1639.075 1639.075 0 0 1 121.096-14.529l-.078.31c112.547 28.156 190.551 43.088 306.816-8.958l-7.355-16.43a485.085 485.085 0 0 1-26.844 11.092c-32.405-4.352-66.372-7.09-101.246-8.381l23.121-107.899-25.592-13.959-10.578-42.312 21.988-10.994-8.05-16.102-18.409 9.205L311.027 135H265v-22h39V95h-39V73h23V55h-23V32h-18zm-31.973 121h81.946l10.16 40.639L256 165.748l-51.133 27.89L215.027 153zM256 186.252v140.346c-5.41.103-10.833.238-16.262.402h-40.46l-21.071-98.316L256 186.252zM224 208a16 16 0 0 0-16 16 16 16 0 0 0 16 16 16 16 0 0 0 16-16 16 16 0 0 0-16-16zm68.17 0a16 16 0 0 1 16 16 16 16 0 0 1-16 16 16 16 0 0 1-16-16 16 16 0 0 1 16-16zm-50.92 137h82.404c22.502.709 44.618 2.01 66.149 3.96-58.924 14.561-109.381 9.793-169.532-3.194A1523.33 1523.33 0 0 1 241.25 345zm-132.865 29.363c-7.943-.023-15.667.234-23.084.842l1.469 17.941c54.39-4.455 133.014 12.49 189.199 17.202 55.64 4.665 109.966-1.684 168.654-13.512l-3.557-17.645c-57.8 11.65-110.279 17.692-163.591 13.221-47.153-3.954-113.49-17.885-169.09-18.049zm20.22 35.285c-12.198-.079-25.387.615-38.517 1.873-26.26 2.518-51.6 7.157-67.865 14.26l7.203 16.496c12.302-5.372 37.244-10.427 62.38-12.838 25.138-2.41 51.157-2.311 65.846.625 32.956 6.589 91.409 16.938 138.62 15.444l-.569-17.99c-44.053 1.394-102.073-8.619-134.523-15.106-9.17-1.833-20.376-2.684-32.575-2.764z"/>
  </svg>,
  ShipCruiser:    (p) => <svg width="24" height="24" viewBox="0 0 512 512" aria-hidden="true" fill="currentColor" stroke="none" {...p}>
    <path d="M247 80v53h-26v48h-34.027l-2.54 18.154-38.408-3.205-2.05 18.102 37.988 2.994-4.578 34.312-25.592 13.96 22.006 65.107a1658.637 1658.637 0 0 0-137.914 15.91l2.812 17.777a1639.075 1639.075 0 0 1 121.096-14.529l-.078.31c112.547 28.156 190.551 43.088 306.816-8.958l-7.355-16.43a485.085 485.085 0 0 1-26.844 11.092c-29.894-4.015-61.118-6.653-93.156-8.053l21.031-62.227-25.592-13.959L325.027 181H291v-48h-26V80h-18zm-8 71h34v30h-34v-30zm-35.973 48h103.946l6.16 40.639L256 211.748l-57.133 27.89 4.16-40.638zM256 232.252v94.346c-5.41.103-10.833.238-16.262.402h-46.46l-21.071-52.316L256 232.252zM298.17 254c8.836 0 16 7.163 16 16s-7.164 16-16 16c-8.837 0-16-7.163-16-16s7.163-16 16-16zm-56.92 91h82.404c22.502.709 44.618 2.01 66.149 3.96-58.924 14.561-109.381 9.793-169.532-3.194A1523.33 1523.33 0 0 1 241.25 345zm-132.865 29.363c-7.943-.023-15.667.234-23.084.842l1.469 17.941c54.39-4.455 133.014 12.49 189.199 17.202 55.64 4.665 109.966-1.684 168.654-13.512l-3.557-17.645c-57.8 11.65-110.279 17.692-163.591 13.221-47.153-3.954-113.49-17.885-169.09-18.049zm20.22 35.285c-12.198-.079-25.387.615-38.517 1.873-26.26 2.518-51.6 7.157-67.865 14.26l7.203 16.496c12.302-5.372 37.244-10.427 62.38-12.838 25.138-2.41 51.157-2.311 65.846.625 32.956 6.589 91.409 16.938 138.62 15.444l-.569-17.99c-44.053 1.394-102.073-8.619-134.523-15.106-9.17-1.833-20.376-2.684-32.575-2.764z"/>
  </svg>,
  ShipSub:        (p) => <svg width="24" height="24" viewBox="0 0 512 512" aria-hidden="true" fill="currentColor" stroke="none" {...p}>
    <path d="M315 144v21.75L292 160l-16 80H164c-49.154 16.385-81.254 27.1-102.578 34.846L52 256l-16-16v44.918C20.047 292.31 20 296.316 20 304c0 7.712.05 11.717 16 19.162V368l16-16 9.352-18.703c21.094 7.734 52.752 18.418 101.072 34.703H372c160-16 160-128 0-128h-16v-64l-23-5.75V144h-18zM148 263h256v18H148v-18z"/>
  </svg>,
  Aerospace: (p) => <svg width="22" height="22" viewBox="0 0 512 512" aria-hidden="true" fill="currentColor" stroke="none" {...p}>
    <path d="M176.627 28.995C148.28 58.81 115.299 96.145 87.199 133.61c-32.774 43.7-57.814 88.07-61.609 115.721l105.706 26.426c2.423-83.416 27.743-164.682 45.332-246.762zm158.746 0c19.444 82.462 39.362 163.183 45.332 246.762L486.41 249.33c-3.795-27.652-28.835-72.022-61.61-115.72-28.099-37.466-61.08-74.8-89.427-104.616zM55 80.21v67.19a858.533 858.533 0 0 1 17.8-24.59l.2-.262V80.21zm384 0v42.338l.2.262A858.535 858.535 0 0 1 457 147.4V80.21zm-192 32v52.648c5.93-4.323 12.122-3.717 18 0V112.21zm9 68.65c-9.092 6.936-16.603 16.958-22.553 25.674-4.776 7.036-9.08 14.404-12.068 20.695-2.887 6.078-4.215 11.405-4.307 12.674l14.553 87.307h48.75l14.553-87.307c-.092-1.27-1.42-6.596-4.307-12.674-2.989-6.291-7.292-13.66-12.068-20.695-7.091-9.554-13.257-18.898-22.553-25.674zm-10 31.35h20l14 36h-48zm-94.043 26.912-13.855 193.973L180.09 412.1l-14.213-63.96 45.889-30.591-8.15-48.91zm208.086 0-51.656 29.518-8.153 48.91 45.89 30.592-14.214 63.959 41.988 20.994zM39.057 271.251c19.713 24.978 40.743 50.236 58.359 75.86 9.945 14.464 18.821 29.098 25.643 43.954l6.935-97.08zm433.886 0-90.937 22.734 6.935 97.08c6.822-14.856 15.698-29.49 25.643-43.955 17.616-25.623 38.646-50.88 58.36-75.859zm-257.933 65.77-28.887 19.257 18.43 82.932H231v-48h16v-46h-30.625zm81.98 0-1.365 8.189H265v46h16v48h26.447l18.43-82.932zM208.553 457.21l5.732 25.795L231 474.647V457.21zm72.447 0v17.437l16.715 8.358 5.732-25.795z"/>
  </svg>,
  Sparkle: (p) => <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" {...p}>
    <path d="M10 3v4M10 13v4M3 10h4M13 10h4M5 5l2 2M13 13l2 2M5 15l2-2M13 7l2-2" {...S}/>
  </svg>,
  Flag: (p) => <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" {...p}>
    <path d="M5 17V3M5 4h10l-2 3 2 3H5" {...S}/>
  </svg>,
  History: (p) => <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" {...p}>
    <path d="M3 10a7 7 0 1 0 2.05-4.95M3 5v3.5h3.5M10 6v4l3 2" {...S}/>
  </svg>,

  Remove: (p) => <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path fill="currentColor" d="M4.808 16q-.348 0-.578-.23T4 15.192V8.808q0-.348.23-.578T4.808 8h14.384q.349 0 .578.23t.23.578v.665q0 .252-.193.424t-.451.16h-.087q-2.16 0-3.685 1.524q-1.526 1.523-1.526 3.688v.087q.011.257-.161.45q-.172.194-.424.194zm14.461-.017l-1.765 1.76q-.14.14-.342.152t-.366-.153q-.16-.16-.16-.354t.16-.354l1.766-1.765l-1.766-1.765q-.14-.14-.15-.345q-.01-.203.15-.363t.354-.16t.354.16l1.765 1.765l1.766-1.765q.14-.14.341-.153t.366.153q.16.16.16.354t-.16.354l-1.76 1.765l1.76 1.765q.14.141.153.342t-.153.366q-.16.16-.353.16t-.354-.16z"/>
  </svg>,

  Sliders: (p) => <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" {...p}>
    <path d="M3 5h2m10 0H9M3 10h6m4 0h2M3 15h2m10 0H9M5 3v4M9 8v4M5 13v4" {...S}/>
  </svg>,

  Reroll: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M18 4l3 3l-3 3"/>
    <path d="M18 20l3 -3l-3 -3"/>
    <path d="M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h2"/>
    <path d="M3 17h3a5 5 0 0 0 5 -5a5 5 0 0 1 5 -5h2"/>
  </svg>,

  Dice: (p) => <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" {...p}>
    <rect x="3" y="3" width="14" height="14" rx="3" {...S}/>
    <circle cx="7" cy="7" r="1.1" fill="currentColor" stroke="none"/>
    <circle cx="13" cy="7" r="1.1" fill="currentColor" stroke="none"/>
    <circle cx="10" cy="10" r="1.1" fill="currentColor" stroke="none"/>
    <circle cx="7" cy="13" r="1.1" fill="currentColor" stroke="none"/>
    <circle cx="13" cy="13" r="1.1" fill="currentColor" stroke="none"/>
  </svg>,

  Cost: (p) => <svg width="22" height="22" viewBox="0 0 20 20" aria-hidden="true" {...p}>
    <circle cx="10" cy="10" r="7" {...S}/>
    <path d="M10 5.5v9M7.5 8h5M7.5 12h5" {...S}/>
  </svg>,
  Aircraft: (p) => <svg width="22" height="22" viewBox="0 0 8 8" aria-hidden="true" fill="currentColor" stroke="none" {...p}>
    <path d="m2 1l4-1v1L2 0m6 2q0 2-2 2H2Q0 4 0 2m2 5h4L5 8H3m0-4V1h2v3L4 8"/>
  </svg>,
  Guns: (p) => <svg width="22" height="22" viewBox="0 0 512 512" aria-hidden="true" fill="currentColor" stroke="none" {...p}>
    <path d="M376 76c30 60-120 30-210 75c150 0 270 15 270 105S316 361 166 361c90 45 240 15 210 75c90-15 120-120 120-180S466 91 376 76m-95.625 105.938C216.005 182.577 127.562 203.5 16 256c255 120 390 75 390 0c0-42.188-42.865-74.886-125.625-74.063z"/>
  </svg>,
  Strike: (p) => <svg width="22" height="22" viewBox="0 0 20 20" aria-hidden="true" fill="currentColor" stroke="none" {...p}>
    <path d="M9.998 11.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-5-1.5a5 5 0 1 1 10 0a5 5 0 0 1-10 0m5-3.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7M1.996 9.997a7.999 7.999 0 1 1 15.998 0a7.999 7.999 0 0 1-15.998 0m8-6.499a6.5 6.5 0 1 0 0 12.998a6.5 6.5 0 0 0 0-12.998"/>
  </svg>,
  AA: (p) => <svg width="22" height="22" viewBox="0 0 512 512" aria-hidden="true" fill="currentColor" stroke="none" {...p}>
    <path d="m472.7 22.8-38.5 44.91L448 84.24l48-34.65zm-50.4 55.05L312.2 178.7l-25.3 8.1-66.3 69.6 22.8 24.7 69.3-65.4 12.9-21.5L435.7 93.27zm-8.7 72.65-19.9 25.6 10.3 13.4 26.6-19.6zm-32.4 37.1-68.5 62.3-16 3.6-42.1 39.2 20.7 22.3 43.6-39.5 6.4-13.8 65.2-62.4zm-245.8 67.3c-26.6.3-52.06 25.8-52.33 52.4-.33 17.8 9.08 34.4 24.53 43.3l23.6-7.6c-18-2.1-31.59-17.5-31.39-35.7 0-19.7 15.89-35.7 35.59-35.7 10-.2 19.5 3.8 26.4 11v-17c-8-4.7-17.1-11-26.4-10.7zm44.5 8.2v78.5L120.5 365v23.5h145v-55.2l-65.4-70.2zM87.51 407.2l-43.29 43h13.47l11.54 8 35.57-27.3h107.6l11.5 19.3H245l6.1-19.3h23.4l97.3 28.2 9.6-8.9h16l-106.5-43zm-50.68 59.9-20.85 22.1h62.55l-20.84-22.1zm187.07 0L203 489.2h62.9L245 467.1zm160.7 0-19.3 22.1h61L407 467.1z"/>
  </svg>,
  CAP: (p) => <svg width="22" height="22" viewBox="0 0 26 26" aria-hidden="true" fill="currentColor" stroke="none" {...p}>
    <path d="M23.6 5c-.2-.2-.5-.4-.8-.4c-2.3-.1-5.2-2.5-7.1-3.5c-1.2-.6-2-1-2.6-1.1h-.4c-.6.1-1.4.5-2.6 1.1c-1.9 1-4.8 3.4-7.1 3.5c-.2.1-.4.2-.6.4q-.3.45-.3.9c.5 10 4.1 16.2 10.4 19.8c.2.1.3.1.5.1s.4 0 .5-.1c6.3-3.6 9.9-9.8 10.4-19.8q0-.45-.3-.9M19 15.5l-5-2.7V16l2 1.5v.5l-3-.5l-3 .5v-.5l2-1.5v-3.2l-5 2.7v-1.1l5-4.3V6c0-.6.4-1 1-1s1 .4 1 1v4.1l5 4.3z"/>
  </svg>,
};

const STAT_META = (scifi) => {
  const terms = T(scifi);
  return [
    { key: 'cost',     label: 'Cost',     icon: Icon.Cost,     accent: true,
      tip: 'Sum of the points cost of every unit in this task force.' },
    { key: 'aircraft', label: terms.aircraftCapacity, icon: Icon.Aircraft, iconScifi: Icon.Aerospace,
      tip: `${terms.aircraft} capacity. Total embarked squadrons may not exceed this value.` },
    { key: 'guns',     label: 'Guns',     icon: Icon.Guns,
      tip: 'Total Guns dice the task force rolls in a Gun Battle.' },
    { key: 'strike',   label: 'Strike',   icon: Icon.Strike,
      tip: `Strike dice this task force can amass on an ${terms.air} Group card during a Strike.` },
    { key: 'aa',       label: 'AA',       icon: Icon.AA,
      tip: `Anti-${scifi ? 'Aerospace' : 'Aircraft'} dice rolled during the AA Step of an ${terms.air} Action targeting this task force.` },
    { key: 'cap',      label: 'CAP',      icon: Icon.CAP,
      tip: `Combat ${terms.air} Patrol. Dice rolled during the Interception Step to discard incoming Strike dice.` },
  ];
};

// ─── Effects engine ────────────────────────────────────
function applyModEffects(activeMods, baseTotals, units, cm) {
  let { cost, guns, aircraft, aa, strike, cap } = baseTotals;
  let aircraftDelta = 0;
  for (const m of activeMods) {
    const e = m.effect;
    if (!e) continue;
    if (e.kind === 'aircraftCarrierBonus') {
      let carriers = 0;
      for (const u of units) { const c = cm[u.classId]; if (c && c.isCarrier) carriers += u.qty; }
      aircraftDelta += e.amount * carriers;
    }
  }
  let aircraftAfter = aircraft + aircraftDelta;
  if (activeMods.some(m => m.effect?.kind === 'aircraftHalveCeil')) {
    aircraftAfter = Math.ceil(aircraftAfter / 2);
  }
  return {
    cost, guns, aircraft: aircraftAfter, aa, strike, cap,
    aircraftBase: aircraft, aircraftDelta: aircraftAfter - aircraft,
  };
}

function computeTotals(units, cm) {
  let cost=0, guns=0, aircraft=0, aa=0, strike=0, cap=0, squadronCount = 0;
  for (const u of units) {
    const c = cm[u.classId]; if (!c) continue;
    cost     += c.cost           * u.qty;
    guns     += c.stats.guns     * u.qty;
    aircraft += c.stats.aircraft * u.qty;
    aa       += c.stats.aa       * u.qty;
    strike   += c.stats.strike   * u.qty;
    cap      += c.stats.cap      * u.qty;
    if (c.kind === 'squadron') squadronCount += u.qty;
  }
  return { cost, guns, aircraft, aa, strike, cap, squadronCount };
}

// ─── Tooltip helpers ───────────────────────────────────
// Build the full rule-text tooltip for a special rules string like "High Value, Armoured (2)"
function specialTip(special) {
  if (!special) return null;
  const parts = special.split(',').map(s => s.trim()).filter(Boolean);
  return parts.map(p => {
    const key = window.ruleKey(p);
    const rule = window.SPECIAL_RULES[key];
    return rule ? `${p}\n${rule.text}` : p;
  }).join('\n\n');
}

function shipClassTip(cls) {
  const lines = [];
  lines.push(`${cls.name}, ${cls.cost} pts`);
  if (cls.role) lines.push(cls.role);
  const special = specialTip(cls.special);
  if (special) { lines.push(''); lines.push(special); }
  return lines.join('\n');
}

// ─── Historical names ──────────────────────────────────
function namePool(faction, era, classId) {
  return window.HISTORICAL_NAMES?.[faction]?.[era]?.[classId] || [];
}
function suggestPennantFor(classId, faction, era, takenSet) {
  const pool = namePool(faction, era, classId);
  if (pool.length === 0) return '';
  for (const n of pool) if (!takenSet.has(n)) return n;
  return pool[0];
}
function autoFillEmpty(tf) {
  if (!tf.faction || !tf.era) return tf;
  const taken = new Set();
  for (const u of tf.units) if (u.pennant) taken.add(u.pennant);
  const units = tf.units.map(u => {
    if (u.pennant) return u;
    const nm = suggestPennantFor(u.classId, tf.faction, tf.era, taken);
    if (nm) taken.add(nm);
    return { ...u, pennant: nm || u.pennant };
  });
  return { ...tf, units };
}

// ─── Primitives ────────────────────────────────────────
function Btn({ children, variant = 'default', onClick, title, type = 'button', icon: IconC, disabled, dataTip }) {
  const cls = 'btn ' + (
    variant === 'primary' ? 'btn-primary' :
    variant === 'subtle'  ? 'btn-subtle' :
    variant === 'ghost'   ? 'btn-subtle' :
    variant === 'danger'  ? 'btn-danger' :
    variant === 'icon'    ? 'btn-icon btn-subtle' : ''
  );
  return (
    <button type={type} className={cls} onClick={onClick} title={title} disabled={disabled} data-tip={dataTip}>
      {IconC && <span className="ico"><IconC /></span>}
      {children}
    </button>
  );
}

function useClickOutside(ref, onOutside) {
  useEffect(() => {
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) onOutside(); };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [onOutside]);
}

function QtyStepper({ value, onChange, min = 1, max = 99, onDelete }) {
  return (
    <div className="qty-stepper">
      <button onClick={() => value <= min ? (onDelete && onDelete()) : onChange(value - 1)} disabled={value <= min && !onDelete} aria-label="decrease"><Icon.Subtract /></button>
      <span className="val">{value}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label="increase"><Icon.Add /></button>
    </div>
  );
}

// ─── Faction roundels ──────────────────────────────────
function FactionRoundel({ faction, size = 36 }) {
  const src = faction === 'IJN' ? 'assets/roundel-ijn.svg' :
              faction === 'USN' ? 'assets/roundel-usn.svg' : null;
  if (src) return <img src={src} width={size} height={size} alt={faction + ' roundel'} />;
  if (faction === 'KK') return (
    <span className="faction-badge-kk" style={{ width: size, height: size, fontSize: Math.round(size * 0.38) }}>KK</span>
  );
  return null;
}

function FactionToggle({ faction, era, onChange }) {
  const scifi = useScifi();
  const opts = scifi ? [
    { f: 'KK', e: 'Standard', label: 'Kalium Kabal' },
  ] : [
    { f: 'IJN', e: 'Early War', label: 'IJN Early War' },
    { f: 'IJN', e: 'Late War',  label: 'IJN Late War'  },
    { f: 'USN', e: 'Early War', label: 'USN Early War' },
    { f: 'USN', e: 'Late War',  label: 'USN Late War'  },
  ];
  return (
    <div className="faction-toggle" role="group" aria-label="Faction and era">
      {opts.map(({ f, e, label }) => {
        const active = faction === f && era === e;
        return (
          <button key={f + e}
            className={'faction-pill' + (active ? ' active' : '')}
            data-faction={f}
            data-tip={label}
            onClick={() => onChange(active ? null : f, e)}
          >
            <FactionRoundel faction={f} size={16} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Unit picker ───────────────────────────────────────
function UnitPicker({ onPick, onClose }) {
  const ref = useRef(null);
  const scifi = useScifi();
  const terms = T(scifi);
  useClickOutside(ref, onClose);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  const byCat = useMemo(() => {
    const m = {};
    for (const c of window.CATEGORIES) m[c.id] = [];
    for (const u of window.SHIP_CLASSES) (m[u.category] || (m[u.category] = [])).push(u);
    return m;
  }, []);
  return (
    <div className="flyout" ref={ref} role="dialog" aria-label="Pick a unit">
      {window.CATEGORIES.map(cat => (
        <div className="flyout-group" key={cat.id}>
          <div className="flyout-group-label">{scifi && cat.id === 'squadron' ? cat.label.replace('Air', 'Aero') : cat.label}</div>
          {byCat[cat.id].map(u => (
            <button key={u.id} className="flyout-item" onClick={() => { onPick(u.id); onClose(); }} data-tip={shipClassTip(u)}>
              <div>
                <div className="nm"><span className="cls-tag" data-sprite={u.sprite}>{u.sprite}</span>{scifi ? scifiUnitName(u.id, u.name, terms) : u.name}</div>
                {u.role && <div className="desc">{u.role}{u.special ? ', ' + u.special : ''}</div>}
              </div>
              <div className="right">{u.cost} pts</div>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── Mod picker (all mods in one flat list, with full text) ─
function ModPicker({ activeIds, onToggle, onClose }) {
  const ref = useRef(null);
  useClickOutside(ref, onClose);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="flyout" ref={ref} role="dialog" aria-label="Pick fleet modifications" style={{ minWidth: 420, maxWidth: 560 }}>
      <div className="flyout-group">
        <div className="flyout-group-label">Fleet Modifications</div>
        {window.MODIFICATIONS.map(m => {
          const active = activeIds.includes(m.id);
          return (
            <button key={m.id} className="flyout-item" onClick={() => onToggle(m.id)} aria-pressed={active}
              style={active ? { background: 'var(--brand-bg-2)' } : null}>
              <div>
                <div className="nm">{m.name}{m.disadv && <span className="badge-warn">Disadvantageous</span>}</div>
                <div className="desc">{m.text}</div>
              </div>
              <div className="right">{active ? <span className="applied-pill">Applied</span> : <span className="add-pill">Add</span>}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Historical Modification sets (4 picks, full text) ─
function HistoricalModSets({ onApply, currentSetId, currentFaction, currentEra }) {
  return (
    <div className="doctrine-presets">
      {window.HISTORICAL_MOD_SETS.map(set => {
        const isCurrent = currentSetId === set.id;
        const isMatch   = !isCurrent && currentFaction === set.faction && currentEra === set.era;
        return (
          <button key={set.id}
            className={'preset-card ' + (isCurrent ? 'active' : '') + (isMatch ? ' match' : '')}
            onClick={() => onApply(set)}>
            <div className="preset-era">{set.faction}{isMatch && <span className="match-tag">matches fleet</span>}</div>
            <div className="preset-name">
              <FactionRoundel faction={set.faction} size={18} />
              {set.label}
            </div>
            <ul className="preset-mod-list">
              {set.mods.map(modId => {
                const m = window.MODIFICATIONS.find(x => x.id === modId);
                if (!m) return null;
                return (
                  <li key={modId} className={m.disadv ? 'disadv' : ''} data-tip={m.text}>
                    {m.name}
                  </li>
                );
              })}
            </ul>
          </button>
        );
      })}
    </div>
  );
}

// ─── Unit row ──────────────────────────────────────────
function UnitRow({ unit, cls, onUpdate, onDelete, overCapacity, suggestedName, faction }) {
  const literalNames = useLiteralNames();
  const scifi = useScifi();
  const terms = T(scifi);
  if (!cls) return null;
  return (
    <tr className={'unit-row ' + (overCapacity ? 'over-capacity' : '')}>
      <td className="col-qty">
        <QtyStepper value={unit.qty} onChange={(v) => onUpdate({ ...unit, qty: v })} />
      </td>
      <td className="col-class">
        <div className="cls-cell">
          <div className="cls-name">
            <span className="cls-tag" data-sprite={cls.sprite} data-tip={cls.name}>{cls.sprite}</span>
            <span data-tip={shipClassTip(cls)}>{scifi ? scifiUnitName(cls.id, cls.name, terms) : cls.name}</span>
          </div>
          <div className="nm-input-wrap" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              className="nm-input"
              placeholder="Click to name"
              value={literalNames && MEANINGS[unit.pennant] ? MEANINGS[unit.pennant] : (unit.pennant || '')}
              onChange={(e) => onUpdate({ ...unit, pennant: e.target.value })}
              onFocus={(e) => { if (!unit.pennant && cls) onUpdate({ ...unit, pennant: randomPennant(cls.id, faction) }); }}
              title={unit.pennant && MEANINGS[unit.pennant] ? (literalNames ? unit.pennant : MEANINGS[unit.pennant]) : undefined}
            />
            {unit.pennant && (
              <button className="reroll-btn" onClick={() => onUpdate({ ...unit, pennant: randomPennant(cls.id, faction) })} title="Random name" aria-label="Random name">
                <Icon.Reroll />
              </button>
            )}
          </div>
        </div>
      </td>
      <td className="col-role">
        <div className="role-cell">
          <span>{cls.role || ''}</span>
          {cls.special && <span className="special" data-tip={specialTip(cls.special)}>{cls.special}</span>}
        </div>
      </td>
      <td className="col-cost">
        <div className="cost-cell">
          <strong className="cost-num">{cls.cost * unit.qty}</strong>
          <span className="cost-sub">{unit.qty > 1 ? `(${cls.cost} ea)` : 'pts'}</span>
        </div>
      </td>
      <td>
        <span className="row-delete">
          <Btn variant="icon" onClick={onDelete} title="Remove unit" icon={Icon.Delete}></Btn>
        </span>
      </td>
    </tr>
  );
}

// ─── Task Force card ───────────────────────────────────
function TaskForceCard({ tf, idx, fleet, totals, faction, era, onUpdate, onDelete, freePlay }) {
  const cm = useMemo(classMap, []);
  const [pickerOpen, setPickerOpen] = useState(false);

  const squadronOver = totals.squadronCount > totals.aircraft;
  const tfV = useMemo(() => tfViolations(tf, freePlay), [tf, freePlay]);
  const scifi = useScifi();
  const literalNames = useLiteralNames();
  const terms = T(scifi);
  const statMeta = STAT_META(scifi);

  const updateUnit = (id, unit) => onUpdate({ ...tf, units: tf.units.map(u => u.id === id ? unit : u) });
  const deleteUnit = (id) => onUpdate({ ...tf, units: tf.units.filter(u => u.id !== id) });
  const addUnit = (classId) => {
    const existing = tf.units.find(u => u.classId === classId && !u.pennant);
    let next;
    if (existing) {
      next = { ...tf, units: tf.units.map(u => u === existing ? { ...u, qty: u.qty + 1 } : u) };
    } else {
      next = { ...tf, units: [...tf.units, { id: 'u-' + uid(), classId, qty: 1, pennant: '' }] };
    }
    onUpdate(next);
  };

  const totalHulls = tf.units.reduce((s, u) => s + u.qty, 0);
  const suggestions = useMemo(() => {
    if (!faction || !era) return {};
    const out = {};
    const taken = new Set();
    for (const u of tf.units) if (u.pennant) taken.add(u.pennant);
    for (const u of tf.units) {
      if (u.pennant) continue;
      out[u.id] = suggestPennantFor(u.classId, faction, era, taken);
      if (out[u.id]) taken.add(out[u.id]);
    }
    return out;
  }, [tf.units, faction, era]);

  return (
    <section className="tf" data-screen-label={`Task force ${idx + 1}`}>
      <header className="tf-head">
        <div className="tf-roundel-slot">
          {faction && <FactionRoundel faction={faction} size={36} />}
        </div>
        <div className="tf-id">
          <div className="callsign-row">
            <input
              className="callsign"
              value={literalNames && MEANINGS[tf.callSign] ? MEANINGS[tf.callSign] : tf.callSign}
              placeholder="Task force call sign"
              onChange={(e) => onUpdate({ ...tf, callSign: e.target.value })}
              title={tf.callSign && MEANINGS[tf.callSign] ? (literalNames ? tf.callSign : MEANINGS[tf.callSign]) : undefined}
            />
            <button className="callsign-random" onClick={() => onUpdate({ ...tf, callSign: randomCallSign(fleet?.faction) })} title="Random call sign" aria-label="Random call sign">
              <Icon.Dice />
            </button>
          </div>
          <input
            className="commander"
            value={tf.commander}
            placeholder="Commander (click to edit)"
            onChange={(e) => onUpdate({ ...tf, commander: e.target.value })}
            data-tip="Click to edit the commanding officer"
          />
        </div>
        <div className="pts" data-tip="Total points cost of this task force">{totals.cost}<span className="lbl">pts</span></div>
        <Btn variant="subtle" onClick={onDelete} title="Delete task force" icon={Icon.Delete} dataTip="Delete this task force">Delete</Btn>
      </header>

      <div className="tf-units-head">
        <h3>Units<span className="count">{tf.units.length} entries, {totalHulls} hulls</span></h3>
      </div>

      {squadronOver && (
        <div className="warn-banner">
          <span className="ico"><Icon.Warning /></span>
          <span>
            <strong>Squadron limit exceeded.</strong>{' '}
            {totals.squadronCount} squadrons embarked, {totals.aircraft} {terms.aircraftCapacity} available.
            Reduce squadrons or add carriers.
          </span>
        </div>
      )}
      {tfV.tooManyCV && (
        <div className="warn-banner warn-error">
          <span className="ico"><Icon.Warning /></span>
          <span>
            <strong>Carrier limit exceeded.</strong>{' '}
            {tfV.tooManyCV} Fleet Carriers assigned. Maximum 2 per task force.
          </span>
        </div>
      )}

      {tf.units.length > 0 ? (
        <table className="units-table">
          <thead>
            <tr>
              <th className="col-qty">Qty</th>
              <th className="col-class">Class and pennant</th>
              <th className="col-role">Role and special</th>
              <th className="col-cost">Cost</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortUnits(tf.units).map(u => {
              const c = cm[u.classId];
              const isSquadron = c && c.kind === 'squadron';
              return (
                <UnitRow key={u.id} unit={u} cls={c}
                  onUpdate={(unit) => updateUnit(u.id, unit)}
                  onDelete={() => deleteUnit(u.id)}
                  overCapacity={isSquadron && squadronOver}
                  suggestedName={suggestions[u.id]}
                  faction={fleet?.faction} />
              );
            })}
          </tbody>
        </table>
      ) : (
        <div style={{ padding: '24px', color: 'var(--neutral-fg-3)', fontSize: 14 }}>
          No units yet.
        </div>
      )}

      <div className="add-unit" style={{ position: 'relative' }}>
        {!pickerOpen ? (
          <button className="add-unit-btn" onClick={() => setPickerOpen(true)}>
            <Icon.Add /> Add unit
          </button>
        ) : (
          <UnitPicker onPick={addUnit} onClose={() => setPickerOpen(false)} />
        )}
      </div>

      <footer className="tf-totals">
        {statMeta.map(s => {
          const IconC = (scifi && s.iconScifi) ? s.iconScifi : s.icon;
          const statLabel = s.label;
          const v = totals[s.key];
          const delta = s.key === 'aircraft' ? totals.aircraftDelta : 0;
          return (
            <div className={'t ' + (s.accent ? 'accent' : '')} key={s.key} data-tip={s.tip} data-stat={s.key}>
              <div className="lbl"><span className="ico"><IconC /></span>{statLabel}</div>
              <div className="v">
                {v}
                {delta !== 0 && s.key === 'aircraft' && (
                  <span className={'mod-delta ' + (delta < 0 ? 'warn' : '')}>
                    {delta > 0 ? '+' : ''}{delta}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </footer>
    </section>
  );
}

function PrintArea({ fleet, totalsByTf, showPreview }) {
  const cm = useMemo(classMap, []);
  const mm = useMemo(modMap, []);
  const literalNames = useLiteralNames();
  const scifi = useScifi();
  const terms = T(scifi);
  const P_STATS = [
    { key: 'cost',     label: 'Cost',    unit: 'pts' },
    { key: 'guns',     label: 'Guns'    },
    { key: 'aircraft', label: scifi ? 'Capacity' : 'Aircraft' },
    { key: 'strike',   label: 'Strike'  },
    { key: 'aa',       label: 'AA'      },
    { key: 'cap',      label: 'CAP'     },
  ];
  const mods = (fleet.mods || []).map(id => mm[id]).filter(Boolean);

  return (
    <div className={'print-area ' + (showPreview ? 'preview' : '')}>
      <div className="p-head">
        {fleet.faction && <FactionRoundel faction={fleet.faction} size={32} />}
        <div className="p-head-text">
          <div className="p-fleet-name">{fleet.name}</div>
          <div className="p-fleet-meta">
            {fleet.faction && fleet.era && <span>{fleet.faction}, {fleet.era}. </span>}
            {fleet.taskForces.length} task force{fleet.taskForces.length === 1 ? '' : 's'},
            {fleet.taskForces.reduce((s, t) => s + (totalsByTf[t.id]?.cost || 0), 0)} pts total.
          </div>
        </div>
      </div>

      {mods.length > 0 && (
        <div className="p-fleet-mods">
          <strong>Fleet modifications:</strong>{' '}
          {mods.map((m, i) => (
            <span key={m.id}>{m.name}{m.disadv ? ' (Disadv.)' : ''}{i < mods.length - 1 ? ', ' : ''}</span>
          ))}
        </div>
      )}

      {mods.length > 0 && (
        <div className="p-fleet-mod-rules">
          <div className="p-rules-title">Fleet Modification Rules</div>
          {mods.map(m => (
            <div key={m.id} className="p-rule-entry">
              <strong>{m.name}:</strong> {m.text}
            </div>
          ))}
        </div>
      )}

      {fleet.taskForces.map((tf, idx) => {
        const totals = totalsByTf[tf.id] || {};
        const sorted = sortUnits(tf.units);

        // Collect all special rules used in this TF
        const usedRuleKeys = [];
        const seenKeys = new Set();
        for (const u of sorted) {
          const c = cm[u.classId]; if (!c || !c.special) continue;
          c.special.split(',').map(s => s.trim()).forEach(s => {
            const key = window.ruleKey(s);
            if (window.SPECIAL_RULES[key] && !seenKeys.has(key)) {
              seenKeys.add(key);
              usedRuleKeys.push(key);
            }
          });
        }

        return (
          <article className="p-tf" key={tf.id}>
            <header className="p-tf-head">
              <div className="p-tf-title">
                <span className="p-tf-num">Task Force {String(idx + 1).padStart(2, '0')}</span>
                {tf.callSign && <span className="p-tf-callsign">{literalNames && MEANINGS[tf.callSign] ? MEANINGS[tf.callSign] : tf.callSign}</span>}
              </div>
              {tf.commander && <div className="p-tf-cmdr">Cmdr: {tf.commander}</div>}
            </header>

            <div className="p-stats-row">
              {P_STATS.map(s => (
                <div key={s.key} className="p-stat-box">
                  <div className="p-stat-val">{totals[s.key] || 0}{s.unit ? <span className="p-stat-unit">{s.unit}</span> : null}</div>
                  <div className="p-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <table className="p-roster-table">
              <thead>
                <tr>
                  <th>Unit</th>
                  <th>Role</th>
                  <th>Special</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map(u => {
                  const c = cm[u.classId]; if (!c) return null;
                  const costStr = u.qty > 1
                    ? `(${u.qty}x) ${c.cost}pts = ${c.cost * u.qty}`
                    : `${c.cost}pts`;
                  return (
                    <tr key={u.id}>
                      <td className="p-r-name">
                        <span className="p-r-sprite">{c.sprite}</span>
                        {scifi ? scifiUnitName(c.id, c.name, terms) : c.name}{u.pennant ? <span className="p-r-pennant"> {literalNames && MEANINGS[u.pennant] ? MEANINGS[u.pennant] : u.pennant}</span> : null}
                      </td>
                      <td className="p-r-role">{c.role}</td>
                      <td className="p-r-special">{c.special || ''}</td>
                      <td className="p-r-cost">{costStr}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {usedRuleKeys.length > 0 && (
              <div className="p-rules">
                <div className="p-rules-title">Special Rules Reference</div>
                {usedRuleKeys.map(key => {
                  const rule = window.SPECIAL_RULES[key];
                  return (
                    <div key={key} className="p-rule-entry">
                      <strong>{rule.name}:</strong> {rule.text}
                    </div>
                  );
                })}

              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

// ─── Fleet Sidebar ────────────────────────────────────
function FleetSidebar({ fleet, totalsByTf, grandTotal, totalHulls, fleetBudget, fv, onBudgetChange, onScaleChange, onFreePlayChange, literalNames, setLiteralNames }) {
  const scale = fleet.scale || 3;
  const pct = fleetBudget ? Math.min(100, Math.round((grandTotal / fleetBudget) * 100)) : 0;
  const over = fleetBudget && grandTotal > fleetBudget;
  const commandChips = scale + 2 + ((fleet.mods || []).includes("enemy-codes") ? 1 : 0);

  return (
    <aside className="fleet-sidebar" aria-label="Fleet overview">

      <div className="sb-section">
        <div className="sb-label">Fleet</div>
        <div className="sb-fleet-name">{fleet.name}</div>
        <div className="sb-scale-summary">
          <span className="sb-scale-pts">{fleetBudget} pts</span>
          
          <span className="sb-scale-chips">{commandChips} cmd chips</span>
        </div>
        <div className="sb-freeplay" data-tip="Removes all fleet construction restrictions">
          <label className="sb-freeplay-label">
            <input type="checkbox" checked={fleet.freePlay || false}
              onChange={e => onFreePlayChange(e.target.checked)} />
            Free Play
          </label>
          {fleet.freePlay && <span className="sb-freeplay-tag">Restrictions off</span>}
        </div>
        <div className="sb-freeplay" style={{ marginTop: 4 }} data-tip="Show English translations of Japanese ship and task force names">
          <label className="sb-freeplay-label">
            <input type="checkbox" checked={literalNames}
              onChange={e => setLiteralNames(e.target.checked)} />
            Literal Names
          </label>
          {literalNames && <span className="sb-freeplay-tag">IJN translated</span>}
        </div>
      </div>

      <div className="sb-section sb-budget">
        <div className="sb-row">
          <span className={'sb-cost-now' + (over ? ' over' : '')}>{grandTotal}</span>
          <span className="sb-cost-sep">/</span>
          <span className="sb-budget-fixed">{fleetBudget}</span>
          <span className="sb-cost-unit">pts</span>
        </div>
        <div className={'sb-bar' + (over ? ' over' : '')}>
          <i style={{ width: `${pct}%` }} />
        </div>
        <div className="sb-bar-meta">
          <span>{pct}%</span>
          <span>{over ? `${grandTotal - fleetBudget} over` : `${fleetBudget - grandTotal} left`}</span>
        </div>
      </div>

      <div className="sb-section">
        <div className="sb-label">
          Task forces
          {!fleet.freePlay && <span className="sb-label-limit">{fleet.taskForces.length}/{scale}</span>}
        </div>
        {fleet.taskForces.length === 0 && <div className="sb-empty">None yet.</div>}
        {fleet.taskForces.map((tf, i) => {
          const cost = totalsByTf[tf.id]?.cost || 0;
          return (
            <div key={tf.id}>
              <div className="sb-tf-row">
                <span className="sb-tf-num">{String(i + 1).padStart(2, '02')}</span>
                <span className="sb-tf-name">{(literalNames && MEANINGS[tf.callSign]) ? MEANINGS[tf.callSign] : (tf.callSign || 'Untitled')}</span>
                <span className="sb-tf-cost">{cost}</span>
              </div>

            </div>
          );
        })}
        <div className="sb-tf-row sb-tf-total">
          <span className="sb-tf-num"></span>
          <span className="sb-tf-name">Total</span>
          <span className="sb-tf-cost">{grandTotal}</span>
        </div>
      </div>

      {!fleet.freePlay && (
        <div className="sb-section sb-hv-section">
          <div className="sb-label">High value ships <span className="sb-label-limit">max {scale} each</span></div>
          <div className="sb-hv-grid">
            {HIGH_VALUE_CLASSES.map(hvId => {
              const count = countHV(fleet, hvId);
              const over = count > scale;
              return (
                <div key={hvId} className={'sb-hv-item' + (over ? ' over' : '')}>
                  <span className="sb-hv-sprite">{HV_LABEL[hvId]}</span>
                  <span className="sb-hv-count">{count}<span className="sb-hv-limit">/{scale}</span></span>
                </div>
              );
            })}
          </div>
          {fv.tooManySubs && (
            <div className="sb-sub-warn">
              Subs: {fv.subCost}pts of {fv.subLimit}pts limit
            </div>
          )}
        </div>
      )}

      <div className="sb-section">
        <div className="sb-label">Hulls</div>
        <div className="sb-hulls">{totalHulls}</div>
      </div>

    </aside>
  );
}

// ─── Fleet Modifications section (top of main content) ─
function FleetMods({ fleet, onApplySet, onToggleMod, faction, era, onFactionChange }) {
  const [open, setOpen] = useState(false);
  const mm = useMemo(modMap, []);
  const activeIds = fleet.mods || [];
  const activeMods = activeIds.map(id => mm[id]).filter(Boolean);
  const allMods = window.MODIFICATIONS || [];
  const advMods = allMods.filter(m => !m.disadv);
  const disadvMods = allMods.filter(m => m.disadv);
  const sets = window.HISTORICAL_MOD_SETS || [];

  return (
    <section className="fleet-mods">
      <div className="fleet-mods-row">
        <div className="fm-label">Fleet Modifications</div>

        {activeMods.map(m => (
          <span key={m.id} className={'chip ' + (m.disadv ? 'warning' : '')} data-tip={m.text}>
            {m.name}
            <button type="button" className="chip-remove" onClick={() => onToggleMod(m.id)} aria-label={`Remove ${m.name}`}>
              <Icon.Close />
            </button>
          </span>
        ))}

        <button type="button" className={'configure-btn' + (open ? ' open' : '')}
          style={{ marginLeft: 'auto' }} onClick={() => setOpen(o => !o)}>
          <span className="configure-btn-ico">{open ? <Icon.Close /> : <Icon.Sliders />}</span>
          <span>{open ? 'Close' : 'Configure'}</span>
        </button>
      </div>

      {open && (
        <div className="mod-grid-panel">
          <div className="mgp-presets">
            <span className="mgp-preset-label">Fleet faction</span>
            <FactionToggle faction={faction} era={era} onChange={onFactionChange} />
          </div>

          <div className="mgp-section">
            <div className="mgp-section-head">Advantageous</div>
            <div className="mgp-grid">
              {advMods.map(m => {
                const active = activeIds.includes(m.id);
                return (
                  <button type="button" key={m.id}
                    className={'mod-card-g' + (active ? ' active' : '')}
                    onClick={() => onToggleMod(m.id)}>
                    <div className="mcg-header">
                      <span className={'mcg-check' + (active ? ' on' : '')} aria-hidden="true">
                        {active && <Icon.Check />}
                      </span>
                      <span className="mcg-name">{m.name}</span>
                    </div>
                    <div className="mcg-text">{m.text}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mgp-section">
            <div className="mgp-section-head mgp-disadv-head">Disadvantageous</div>
            <div className="mgp-grid">
              {disadvMods.map(m => {
                const active = activeIds.includes(m.id);
                return (
                  <button type="button" key={m.id}
                    className={'mod-card-g disadv' + (active ? ' active' : '')}
                    onClick={() => onToggleMod(m.id)}>
                    <div className="mcg-header">
                      <span className={'mcg-check' + (active ? ' on' : '')} aria-hidden="true">
                        {active && <Icon.Check />}
                      </span>
                      <span className="mcg-name">{m.name}</span>
                    </div>
                    <div className="mcg-text">{m.text}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}



// ─── Name pools & meanings ───────────────────────────
const MEANINGS = {
  'Kido Butai':'Mobile Strike Force','Rengo Kantai':'Combined Fleet',
  'Dai-ichi Kido Kantai':'First Mobile Fleet','Dai-ni Kantai':'Second Fleet',
  'Dai-roku Kantai':'Sixth Fleet (Submarine Force)','Koku Kantai':'Air Fleet',
  'Sentai':'Battle Squadron','Hikotai':'Air Group',
  'Suirai Sentai':'Torpedo Squadron','Zenei Butai':'Vanguard Force',
  'Shuryoku Butai':'Main Body',
  'Ozawa':'Small Marsh','Nagumo':'South Cloud','Mikawa':'Three Rivers',
  'Tanaka':'Middle of the Field','Goto':'Behind the Wisteria',
  'Kurita':'Chestnut Field','Nishimura':'West Village','Shima':'Island',
  'Ugaki':'Eave Wall','Hashimoto':'Base of the Bridge',
  'Akagi':'Red Castle','Kaga':'Old Province','Soryu':'Blue Dragon',
  'Hiryu':'Flying Dragon','Shokaku':'Soaring Crane','Zuikaku':'Auspicious Crane',
  'Taiho':'Great Phoenix','Shinano':'Ancient Province Name',
  'Unryu':'Cloud Dragon','Amagi':'Heavenly Castle','Kasagi':'Mount Kasagi',
  'Aso':'Mount Aso','Ikoma':'Living Horse Mountain',
  'Zuiho':'Lucky Phoenix','Shoho':'Felicitous Phoenix','Ryujo':'Prancing Dragon',
  'Chitose':'A Thousand Years','Chiyoda':'Thousand-Generation Field',
  'Junyo':'Falcon Hawk','Hiyo':'Flying Hawk','Ibuki':'Mount Ibuki',
  'Yamato':'Great Harmony / Ancient Japan',"Musashi":"Warrior's Domain",
  'Nagato':'Long Gate','Mutsu':'Deep Interior','Yamashiro':'Mountain Castle',
  'Fuso':'Land of the Mulberry','Kongo':'Diamond / Vajra',
  'Haruna':'Mount Haruna','Hiei':'Mount Hiei','Kirishima':'Misty Island',
  'Ise':'Old Province Name','Hyuga':'Ancient Eastern Province',
  'Atago':'Mount Atago','Maya':'Mount Maya','Takao':'High and Brave',
  'Chokai':'Bird Sea','Myoko':'Wonderfully High','Haguro':'Black Feathers',
  'Kumano':'Bear Field','Suzuya':'Bell Valley',
  'Tone':'Tone River','Chikuma':'Chikuma River',
  'Jintsu':'Divine Passage','Sendai':'Within the River','Naka':'Naka River',
  'Nagara':'Long and Good','Yura':'Yura River','Agano':'Agano River',
  'Noshiro':'Talented Generation','Oyodo':'Great Reed Bed',
  'Fubuki':'Blizzard','Ayanami':'Silken Waves','Kagero':'Heat Haze',
  'Nowaki':'Field Wind','Makigumo':'Rolling Clouds','Yukikaze':'Snow Wind',
  'Shigure':'Autumn Rain','Hamakaze':'Shore Breeze',
  'Isokaze':'Rocky Shore Wind','Urakaze':'Bay Wind',
  'Mizuho':'Fresh Rice Ears','Kamikawa Maru':'River of the Gods',
  'Sanuki Maru':'Sanuki Province',
  'Kamoi':'Divine Authority','Hayasui':'Fast Current',
  'Notoro':'Cape Notoro','Tsurugisaki':'Sword Cape','Toho Maru':'Eastern Nation',
  'Mutsuki-class':'Harmony Month','Fubuki-class':'Blizzard',
  'Hatsuharu-class':'Early Spring','Shiratsuyu-class':'White Dew',
  'Asashio-class':'Morning Tide','Kagero-class':'Heat Haze',
  'Yugumo-class':'Evening Clouds','Akizuki-class':'Autumn Moon','Matsu-class':'Pine Tree',
  'Takao-class':'High and Brave','Myoko-class':'Wonderfully High',
  'Tone-class':'Tone River','Mogami-class':'Mogami River',
  'Sendai-class':'Within the River','Nagara-class':'Long and Good',
  'Agano-class':'Agano River','Chitose-class':'A Thousand Years',
  'Kamikawa Maru-class':'River of the Gods','Hayasui-class':'Fast Current',
  'Sen Toku-class':'Special Submarine',
  'Akagi Hikotai':'Red Castle Air Group','Kaga Hikotai':'Old Province Air Group',
  'Soryu Hikotai':'Blue Dragon Air Group','Hiryu Hikotai':'Flying Dragon Air Group',
  'Shokaku Hikotai':'Soaring Crane Air Group','Zuikaku Hikotai':'Auspicious Crane Air Group',
  'Tainan Kokutai':'Tainan Air Corps','Kanbaku 1':'Dive Bomber Unit 1',
  'Kanbaku 2':'Dive Bomber Unit 2','Kanko 1':'Torpedo Bomber Unit 1',
  'Kanko 3':'Torpedo Bomber Unit 3',
};

const PENNANT_POOLS = {
  IJN: {
    'fleet-carrier':   ['Akagi','Kaga','Soryu','Hiryu','Shokaku','Zuikaku','Taiho','Shinano','Unryu','Amagi','Kasagi','Aso','Ikoma'],
    'light-carrier':   ['Zuiho','Shoho','Ryujo','Chitose','Chiyoda','Junyo','Hiyo','Ibuki','Zuiho-class','Shoho-class','Ryujo-class','Chitose-class','Junyo-class'],
    'seaplane-tender': ['Chitose','Chiyoda','Mizuho','Kamikawa Maru','Sanuki Maru','Chitose-class','Kamikawa Maru-class'],
    'battleship':      ['Yamato','Musashi','Nagato','Mutsu','Yamashiro','Fuso','Kongo','Haruna','Hiei','Kirishima','Ise','Hyuga'],
    'heavy-cruiser':   ['Atago','Maya','Takao','Chokai','Myoko','Haguro','Kumano','Suzuya','Tone','Chikuma','Takao-class','Myoko-class','Tone-class','Mogami-class'],
    'light-cruiser':   ['Jintsu','Sendai','Naka','Nagara','Yura','Agano','Noshiro','Oyodo','Sendai-class','Nagara-class','Agano-class'],
    'destroyer':       ['Fubuki','Ayanami','Kagero','Nowaki','Makigumo','Yukikaze','Shigure','Hamakaze','Isokaze','Urakaze','Mutsuki-class','Fubuki-class','Hatsuharu-class','Shiratsuyu-class','Asashio-class','Kagero-class','Yugumo-class','Akizuki-class','Matsu-class'],
    'submarine':       ['I-19','I-26','I-168','I-58','I-400','I-401','Ro-34','I-176','I-47','I-class','Ro-class','Sen Toku-class'],
    'auxiliary':       ['Kamoi','Hayasui','Notoro','Tsurugisaki','Toho Maru','Hayasui-class'],
    'fighter-sqn':     ['Akagi Hikotai','Kaga Hikotai','Soryu Hikotai','Hiryu Hikotai','Shokaku Hikotai','Zuikaku Hikotai','Tainan Kokutai','251 Kokutai','201 Kokutai','Daitai 1','Daitai 2','Daitai 3','Chutai 1','Chutai 2'],
    'bomber-sqn':      ['Kanbaku 1','Kanbaku 2','Kanko 1','Kanko 3','Akagi Kanbaku','Kaga Kanko','Soryu Kanbaku','Hiryu Kanko','1st Koku Kantai','2nd Koku Kantai'],
  },
  KK: {
    'fleet-carrier':   ['First Dominion','Inheritance Clause','Conquistador',"Kabal's Heart",'Magellan','Vespucci','Eminent Domain','Terra Nullius','Right of Discovery','Cortes','Requisition','Lebensraum','Inevitability','Manifest','Corrective','Absorption','Settlement','Protectorate','Charter of Conquest','Charter','Freehold','Annexation'],
    'light-carrier':   ['Collins','Wasp','Gemini','Eagle','Known Associates','Incident Report',"People's Beneficence","Kabal's Wisdom",'As One','Gladiator','Lord Regent','Junta','Common Cause','Mutual Benefit','Solidarity','Progress Report','Harmonious','Exemplary'],
    'seaplane-tender': ['Outrider','Early Warning','Vlad Carmichael',"Insurrection's End",'Sender of Will','Spear of Will','Lightbringer','Searcher','Seedling','Nostrum','Sulla','Pathbreaker','Far Hand','Precursor','Leading Edge','Advance Notice'],
    'battleship':      ['Final Argument','Absolute Majority','Loki','Proud Empress','Black Prince','Scharnhorst','Iowa','Great Founder','Nikola Tesla','Hyperion','Might of Kalium','Steel Fist','Killforge','Our Grace','Our Gaze','Illuminator','Hammer of Reason','Subjugator','Soul Reaver','Executioner','Volcanic','Your Fate','Spear of Onyx','Decapitator','Tirpitz','Terminus','Sovereign','Immovable','Warrant','Thunderous'],
    'heavy-cruiser':   ['Iron Prefect','Collective Punishment','Proudcore','Industry','Fist of Iron','Incinerator',"Hell's Fury",'Vengefire',"Kabal's Judgement",'Ultimate Certainty','Streetsweeper','Hammer of Might','Decimator','Overseer','Final Notice','Magistrate','Punitive','Adjudicator','Merciless'],
    'light-cruiser':   ['Interregnum','Dead Reckoning','Hardrada','Necromancer','Purgatory','Limbo','Penumbra','Styx','Charnel','Gallows','Cannae','Crassus','Pyrrhus','Teutoburg','Ney','Adrianople','Isandlwana','Vercingetorix','Jugurtha','Wallenstein','Foolhardy'],
    'destroyer':       ['Press Gang','Willing Volunteer','Switchblade','Noble Conscript','Guardsman','Pressed Man','Indentured','Impressment','Defaulter','Seconded','Sentinel','Stalwart','Vigilant','Resolute','Warden','Picket','Bulwark','Trenchant','Indefatigable','Intrepid'],
    'submarine':       ['Bloodwork','Due Diligence','Hellhunter','Poison Dagger',"Kabal's Knife",'First Message','Wrathful','Stiletto','Garotte','Wet Work','Cutthroat','Lancet','Untraceable'],
    'auxiliary':       ['All-Seeing','Lens of Truth','Nightpiercer','BVK-1','BVK-2','BVK-3','TZhS-4','TZhS-5','OVR-7','OVR-12','VB-19','VB-22','Transport No. 3','Transport No. 8','Tender 441','Tender 883','Project 112','Type II Base Ship','Welfare Check','Oversight','Point of Contact','Duly Noted','Under Review'],
    'fighter-sqn':     ['Alpha Wing','Beta Wing','Gamma Wing','Delta Wing','Intercept-1','Intercept-2','Intercept-3','Screen Flight','Patrol Wing','Forward Screen'],
    'bomber-sqn':      ['Strike Wing Alpha','Strike Wing Beta','Strike Wing Gamma','Strike Flight 1','Strike Flight 2','Attack Wing','Assault Wing','Bombard Flight'],
  },
  USN: {
    'fleet-carrier':   ['Enterprise','Hornet','Yorktown','Lexington','Wasp','Essex','Bunker Hill','Saratoga','Franklin','Intrepid','Reprisal'],
    'light-carrier':   ['Independence','Belleau Wood','Cowpens','Monterey','Cabot','San Jacinto','Princeton'],
    'seaplane-tender': ['Langley','Albemarle','Curtiss','Tangier','Wright','Curtiss-class','Barnegat-class'],
    'battleship':      ['Washington','North Carolina','South Dakota','Iowa','New Jersey','Missouri','Wisconsin','Indiana','West Virginia','Tennessee','California','Maryland','Mississippi','Hawaii','Philippines','Puerto Rico'],
    'heavy-cruiser':   ['Indianapolis','Houston','Pensacola','Salt Lake City','New Orleans','Quincy','Vincennes','Northampton','Pensacola-class','Northampton-class','New Orleans-class','Portland-class','Wichita-class'],
    'light-cruiser':   ['Helena','Boise','Atlanta','Juneau','San Diego','Cleveland','Columbia','Denver','Atlanta-class','Cleveland-class','Brooklyn-class'],
    'destroyer':       ['Fletcher',"O'Bannon",'Sims','Laffey','Sullivan','Kidd','Johnston','Hoel','Evans','Monssen','Farragut-class','Mahan-class','Sims-class','Benson-class','Fletcher-class','Sumner-class','Gearing-class','Buckley-class','Butler-class'],
    'submarine':       ['Wahoo','Tang','Harder','Flasher','Tautog','Gato','Albacore','Barb','Bowfin','Gato-class','Balao-class','Tench-class'],
    'auxiliary':       ['Cimarron','Neosho','Platte','Sabine','Guadalupe','Cimarron-class','Kennebec-class'],
    'fighter-sqn':     ['VF-2','VF-3','VF-5','VF-6','VF-8','VF-9','VF-15','VF-17','VF-18','VF-19','VF-20','VF-27','VF-31','VF-33','VF-80','VF-84'],
    'bomber-sqn':      ['VB-2','VB-3','VB-5','VB-6','VB-8','VB-10','VB-15','VT-3','VT-6','VT-8','VT-10','VS-2','VS-5','VS-6'],
  },
};
function randomPennant(classId, faction) {
  if (!faction) {
    const all = [...(PENNANT_POOLS.IJN[classId] || []), ...(PENNANT_POOLS.USN[classId] || [])];
    return all.length ? all[Math.floor(Math.random() * all.length)] : '';
  }
  const pool = (PENNANT_POOLS[faction] || {})[classId] || [];
  return pool.length ? pool[Math.floor(Math.random() * pool.length)] : '';
}

const TF_CALLSIGNS = {
  IJN: ['Kido Butai','Rengo Kantai','Dai-ichi Kido Kantai','Dai-ni Kantai','Dai-roku Kantai','Koku Kantai','Sentai','Hikotai','Suirai Sentai','Zenei Butai','Shuryoku Butai','Ozawa','Nagumo','Mikawa','Tanaka','Goto','Kurita','Nishimura','Shima','Ugaki','Hashimoto','CarDiv 1','CarDiv 2','DesRon 2','DesRon 4','CrusDiv 7','BatDiv 1'],
  USN: ['Halsey','Spruance','Kinkaid','Fletcher','McMorris','Merrill','Burke','Oldendorf','Mitscher','Bogan','Lee','Scott','Callaghan','TF 38','TF 58','TF 77','TF 34','TF 64','TG 77.4','TG 38.1','TG 38.3','CrusDiv 6','DesRon 21','DesRon 45','BatDiv 6','Striking','Screen','Covering','Support','Hunter'],
  KK: ["Kabal's Heart","Kabal's Judgement","Kabal's Knife","Kabal's Wisdom",'First Dominion','Iron Prefect','Final Argument','Steel Fist','Killforge','Collective Punishment','Might of Kalium','Terminus','Sovereign','Immovable','Spear Group','Hammer Group','Hammer of Reason','Conquest Fleet','Acquisition Fleet','Protectorate Force','Vanguard','Iron Fist'],
  neutral: ['Striking','Covering','Screen','Support','Sweeping','Bombardment','Hunter','Carrier','Surface','Coral Sea','Java Sea','Leyte','Midway','Alpha','Bravo','Delta','Foxtrot','Kilo','Zulu'],
};
function randomCallSign(faction) {
  let pool;
  if (!faction) {
    pool = [...TF_CALLSIGNS.IJN, ...TF_CALLSIGNS.USN, ...TF_CALLSIGNS.neutral];
  } else {
    pool = TF_CALLSIGNS[faction] || TF_CALLSIGNS.neutral;
  }
  return pool[Math.floor(Math.random() * pool.length)];
}


// ─── Sort helpers ──────────────────────────────────────
const CAT_ORDER = { capital: 0, surface: 1, screen: 2, squadron: 3 };
function sortUnits(units) {
  const cm = classMap();
  return [...units].sort((a, b) => {
    const ca = cm[a.classId], cb = cm[b.classId];
    return (CAT_ORDER[ca?.category] ?? 9) - (CAT_ORDER[cb?.category] ?? 9);
  });
}

// ─── Fleet validation ──────────────────────────────────
const HIGH_VALUE_CLASSES = ['fleet-carrier', 'light-carrier', 'battleship'];
const HV_LABEL = { 'fleet-carrier': 'CV', 'light-carrier': 'CVL', 'battleship': 'BB' };
const HV_NAME  = { 'fleet-carrier': 'Fleet Carriers', 'light-carrier': 'Light Carriers', 'battleship': 'Battleships' };

function fleetViolations(fleet, cm) {
  if (fleet.freePlay) return {};
  const scale = fleet.scale || 3;
  const v = {};
  if (fleet.taskForces.length > scale) v.tooManyTFs = fleet.taskForces.length;
  for (const hvId of HIGH_VALUE_CLASSES) {
    let count = 0;
    for (const tf of fleet.taskForces)
      for (const u of tf.units) if (u.classId === hvId) count += u.qty;
    if (count > scale) v[hvId] = { count, limit: scale };
  }
  let subCost = 0, totalCost = 0;
  for (const tf of fleet.taskForces)
    for (const u of tf.units) {
      const c = cm[u.classId]; if (!c) continue;
      const cost = c.cost * u.qty;
      totalCost += cost;
      if (u.classId === 'submarine') subCost += cost;
    }
  v.subCost = subCost;
  v.totalCost = totalCost;
  v.subLimit = totalCost > 0 ? Math.floor(totalCost / 3) : 0;
  if (subCost > 0 && subCost > v.subLimit) v.tooManySubs = true;
  return v;
}

function tfViolations(tf, freePlay) {
  if (freePlay) return {};
  const v = {};
  const cvCount = tf.units.filter(u => u.classId === 'fleet-carrier').reduce((s, u) => s + u.qty, 0);
  if (cvCount > 2) v.tooManyCV = cvCount;
  return v;
}

function countHV(fleet, hvId) {
  return fleet.taskForces.reduce((total, tf) =>
    total + tf.units.filter(u => u.classId === hvId).reduce((s, u) => s + u.qty, 0), 0);
}

// ─── Blank TF factory ──────────────────────────────────
function makeBlankTF(n) {
  return { id: 'tf-' + uid(), callSign: `TF${String(n).padStart(2, '0')}`, commander: '', units: [] };
}

// ─── Auto-fill pennants from historical name pool ───────
function autoFillForFleet(tf, faction, era) {
  if (!faction || !era) return tf;
  const taken = new Set();
  for (const u of tf.units) if (u.pennant) taken.add(u.pennant);
  const units = tf.units.map(u => {
    if (u.pennant) return u;
    const nm = suggestPennantFor(u.classId, faction, era, taken);
    if (nm) taken.add(nm);
    return { ...u, pennant: nm || u.pennant };
  });
  return { ...tf, units };
}

// ─── Starter fleet seed ────────────────────────────────
function seedFromExample() {
  return {
    name: 'Ⓢ3 Starter Fleet', mods: [], setId: null,
    faction: null, era: null, budget: 300, scale: 3, freePlay: false,
    taskForces: [
      { id: 'tf-' + uid(), callSign: 'TF01', commander: '', units: [
        { id: 'u-' + uid(), classId: 'fleet-carrier',  qty: 2,  pennant: '' },
        { id: 'u-' + uid(), classId: 'battleship',     qty: 1,  pennant: '' },
        { id: 'u-' + uid(), classId: 'heavy-cruiser',  qty: 3,  pennant: '' },
        { id: 'u-' + uid(), classId: 'destroyer',      qty: 9,  pennant: '' },
        { id: 'u-' + uid(), classId: 'fighter-sqn',    qty: 12, pennant: '' },
        { id: 'u-' + uid(), classId: 'bomber-sqn',     qty: 16, pennant: '' },
      ]},
      { id: 'tf-' + uid(), callSign: 'TF02', commander: '', units: [
        { id: 'u-' + uid(), classId: 'fleet-carrier',  qty: 1,  pennant: '' },
        { id: 'u-' + uid(), classId: 'light-carrier',  qty: 1,  pennant: '' },
        { id: 'u-' + uid(), classId: 'heavy-cruiser',  qty: 3,  pennant: '' },
        { id: 'u-' + uid(), classId: 'destroyer',      qty: 5,  pennant: '' },
        { id: 'u-' + uid(), classId: 'fighter-sqn',    qty: 10, pennant: '' },
        { id: 'u-' + uid(), classId: 'bomber-sqn',     qty: 10, pennant: '' },
      ]},
      { id: 'tf-' + uid(), callSign: 'TF03', commander: '', units: [
        { id: 'u-' + uid(), classId: 'battleship',     qty: 1,  pennant: '' },
        { id: 'u-' + uid(), classId: 'heavy-cruiser',  qty: 2,  pennant: '' },
        { id: 'u-' + uid(), classId: 'destroyer',      qty: 5,  pennant: '' },
      ]},
    ],
  };
}

// ─── Random TF generator ──────────────────────────────
function generateRandomTF(budget, fleet) {
  const all = window.SHIP_CLASSES;
  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

  let remaining = budget;
  const units = [];

  const ships = all.filter(c => c.category !== 'squadron' && c.cost <= budget);
  for (const cls of shuffle(ships)) {
    if (cls.cost <= remaining) {
      units.push({ id: 'u-' + uid(), classId: cls.id, qty: 1, pennant: '' });
      remaining -= cls.cost;
      break;
    }
  }

  for (let attempts = 0; attempts < 80 && remaining > 0; attempts++) {
    const affordable = all.filter(c => c.category !== 'squadron' && c.cost <= remaining);
    if (!affordable.length) break;
    const pick = affordable[Math.floor(Math.random() * affordable.length)];
    const ex = units.find(u => u.classId === pick.id);
    if (ex) { ex.qty++; } else { units.push({ id: 'u-' + uid(), classId: pick.id, qty: 1, pennant: '' }); }
    remaining -= pick.cost;
  }

  const aircraft = units.reduce((s, u) => {
    const c = all.find(x => x.id === u.classId);
    return s + (c ? (c.stats?.aircraft || 0) * u.qty : 0);
  }, 0);

  if (aircraft > 0) {
    const f = Math.ceil(aircraft * 0.5);
    const bm = Math.floor(aircraft * 0.5);
    if (f > 0) units.push({ id: 'u-' + uid(), classId: 'fighter-sqn', qty: f, pennant: '' });
    if (bm > 0) units.push({ id: 'u-' + uid(), classId: 'bomber-sqn', qty: bm, pennant: '' });
  }

  const faction = fleet?.faction || null;
  return { id: 'tf-' + uid(), callSign: randomCallSign(faction), commander: '', units };
}

function RandomTFPanel({ fleet, onAdd, onClose }) {
  const [budget, setBudget] = React.useState(150);
  const presets = [100, 150, 200, 300];
  return (
    <div className="random-panel">
      <div className="random-panel-head">
        <span>Random task force</span>
        <button type="button" className="random-panel-close" onClick={onClose} aria-label="Close"><Icon.Close /></button>
      </div>
      <div className="random-panel-body">
        <div className="random-presets">
          {presets.map(p => (
            <button type="button" key={p} className={'random-preset' + (budget === p ? ' active' : '')} onClick={() => setBudget(p)}>{p}</button>
          ))}
        </div>
        <div className="random-custom">
          <input type="number" min="10" max="999" step="5" value={budget}
            onChange={e => setBudget(Math.max(10, parseInt(e.target.value) || 10))}
            className="random-custom-input" />
          <span className="random-custom-label">pts</span>
        </div>
        <button type="button" className="btn btn-primary random-go"
          onClick={() => { onAdd(generateRandomTF(budget, fleet)); onClose(); }}>
          <span className="ico"><Icon.Dice /></span> Generate
        </button>
      </div>
    </div>
  );
}


// ─── App ───────────────────────────────────────────────
function App() {
  const [fleet, setFleet] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pc2-fleet')) || seedFromExample(); }
    catch { return seedFromExample(); }
  });
  const [showPreview, setShowPreview] = useState(false);
  const [scifi, setScifi] = useState(() => localStorage.getItem('pc2-scifi') === '1');
  const [literalNames, setLiteralNames] = useState(() => localStorage.getItem('pc2-literal') === '1');
  const [showRandom, setShowRandom] = useState(false);

  useEffect(() => { if (fleet) localStorage.setItem('pc2-fleet', JSON.stringify(fleet)); }, [fleet]);
  useEffect(() => { localStorage.setItem('pc2-scifi', scifi ? '1' : '0'); }, [scifi]);
  useEffect(() => { localStorage.setItem('pc-literal', literalNames ? '1' : '0'); }, [literalNames]);

  const cm = useMemo(classMap, []);

  const totalsByTf = useMemo(() => {
    if (!fleet) return {};
    const out = {};
    const mods = (fleet.mods || []).map(id => (modMap())[id]).filter(Boolean);
    for (const tf of fleet.taskForces) {
      const base = computeTotals(tf.units, cm);
      out[tf.id] = applyModEffects(mods, base, tf.units, cm);
    }
    return out;
  }, [fleet, cm]);

  const grandTotal = useMemo(() => {
    if (!fleet) return 0;
    return fleet.taskForces.reduce((s, tf) => s + (totalsByTf[tf.id]?.cost || 0), 0);
  }, [fleet, totalsByTf]);

  const fv = useMemo(() => fleetViolations(fleet, cm), [fleet, cm]);

  const scale = fleet.scale || 3;
  const fleetBudget = fleet.freePlay ? (fleet.budget || 0) : scale * 100;
  const totalHulls = fleet.taskForces.reduce((s, t) => s + t.units.reduce((x, u) => x + u.qty, 0), 0);

  const updateTF = (id, next) => setFleet(f => ({ ...f, taskForces: f.taskForces.map(t => t.id === id ? next : t) }));
  const deleteTF = (id) => setFleet(f => ({ ...f, taskForces: f.taskForces.filter(t => t.id !== id) }));
  const addTF = () => setFleet(f => ({ ...f, taskForces: [...f.taskForces, makeBlankTF(f.taskForces.length + 1)] }));
  const addRandomTF = (tf) => setFleet(f => ({ ...f, taskForces: [...f.taskForces, tf] }));

  const loadExample = () => {
    if (!confirm('Replace current fleet with the (S)3 Starter Fleet?')) return;
    setFleet(seedFromExample()); setShowPreview(false);
  };
  const newBlank = () => {
    if (!confirm('Start a new blank fleet?')) return;
    setFleet({ name: 'My Fleet', taskForces: [makeBlankTF(1)], mods: [], setId: null, faction: null, era: null, budget: 0, scale: 3, freePlay: false });
  };

  const onToggleMod = (id) => {
    setFleet(f => {
      const cur = f.mods || [];
      const next = cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id];
      const clearFaction = next.length === 0;
      return { ...f, mods: next, setId: null, ...(clearFaction ? { faction: null, era: null } : {}) };
    });
  };
  const onApplySet = (set) => {
    setFleet(f => {
      const taskForces = f.taskForces.map(tf => autoFillForFleet(tf, set.faction, set.era));
      return { ...f, mods: [...set.mods], setId: set.id, faction: set.faction, era: set.era, taskForces };
    });
  };
  const onBudgetChange = (n) => setFleet(f => ({ ...f, budget: n }));
  const onScaleChange = (n) => setFleet(f => ({ ...f, scale: Math.max(1, Math.min(10, n)) }));
  const onFreePlayChange = (v) => setFleet(f => ({ ...f, freePlay: v }));

  const toggleScifi = () => {
    setScifi(s => !s);
    setFleet(fl => ({ ...fl, faction: null, era: null, mods: [], setId: null }));
  };

  const faction = fleet.faction;
  const era = fleet.era;

  return (
    <ScifiCtx.Provider value={scifi}>
    <LiteralNamesCtx.Provider value={literalNames}>
    <div className={'app ' + (showPreview ? 'preview-mode ' : '') + (scifi ? 'scifi-mode' : '')}>

      <header className="cmdbar">
        <div className="brand">
          <span className="brand-icon"><Icon.Flag /></span>
          <span className="brand-name">{scifi ? 'Space Command' : 'Pacific Command'}</span>
        </div>

        <div className="scale-ctrl">
          <button type="button" className="scale-btn" onClick={() => onScaleChange(scale - 1)} aria-label="Decrease scale"><Icon.Subtract /></button>
          <span className="scale-display">
            <span className="scale-s">Ⓢ</span>
            <span className="scale-n">{scale}</span>
          </span>
          <button type="button" className="scale-btn" onClick={() => onScaleChange(scale + 1)} aria-label="Increase scale"><Icon.Add /></button>
        </div>

        <div className="cmdbar-actions">
          <Btn variant="ghost" onClick={loadExample} icon={Icon.Flag} dataTip="Load (S)3 Starter Fleet">Load (S)3 Starter Fleet</Btn>
          <Btn variant="ghost" onClick={newBlank} icon={Icon.Document} dataTip="New blank fleet">New fleet</Btn>
          <div style={{ position: 'relative' }}>
            <Btn variant="ghost" onClick={() => setShowRandom(r => !r)} icon={Icon.Dice}>Random TF</Btn>
            {showRandom && <RandomTFPanel fleet={fleet} onAdd={addRandomTF} onClose={() => setShowRandom(false)} />}
          </div>
          <Btn variant={showPreview ? 'primary' : 'ghost'} onClick={() => setShowPreview(p => !p)} icon={Icon.Print}>
            {showPreview ? 'Preview: ON' : 'Print fleet'}
          </Btn>
        </div>
      </header>

      <FleetSidebar
        fleet={fleet}
        totalsByTf={totalsByTf}
        grandTotal={grandTotal}
        totalHulls={totalHulls}
        fleetBudget={fleetBudget}
        fv={fv}
        onBudgetChange={onBudgetChange}
        onScaleChange={onScaleChange}
        onFreePlayChange={onFreePlayChange}
        literalNames={literalNames}
        setLiteralNames={setLiteralNames}
      />

      {!showPreview && (
        <main className="page">
          <div className="page-head">
            <div>
              <h1 className="fleet-name">
                <input
                  className="fleet-name-input"
                  value={fleet.name || ''}
                  onChange={e => setFleet(f => ({ ...f, name: e.target.value }))}
                  placeholder="Fleet name"
                />
              </h1>
              <div className="fleet-meta">
                {fleet.taskForces.length} task force{fleet.taskForces.length !== 1 ? 's' : ''}
                {' · '}
                {totalHulls} hulls in service
              </div>
            </div>
          </div>

          <FleetMods fleet={fleet} onApplySet={onApplySet} onToggleMod={onToggleMod}
            faction={faction} era={era}
            onFactionChange={(f, e) => {
              if (!f) {
                setFleet(fl => ({ ...fl, faction: null, era: null, mods: [], setId: null }));
              } else {
                const matchSet = (window.HISTORICAL_MOD_SETS || []).find(s => s.faction === f && s.era === e);
                setFleet(fl => {
                  const taskForces = fl.taskForces.map(tf => autoFillForFleet(tf, f, e));
                  return matchSet
                    ? { ...fl, faction: f, era: e, mods: [...matchSet.mods], setId: matchSet.id, taskForces }
                    : { ...fl, faction: f, era: e, taskForces };
                });
              }
            }}
          />

          {fleet.taskForces.map((tf, i) => (
            <TaskForceCard
              key={tf.id}
              tf={tf}
              idx={i}
              fleet={fleet}
              totals={totalsByTf[tf.id] || {}}
              faction={faction}
              era={era}
              onUpdate={(next) => updateTF(tf.id, next)}
              onDelete={() => deleteTF(tf.id)}
              freePlay={fleet.freePlay}
            />
          ))}

          <div className="add-tf">
            <Btn onClick={addTF} icon={Icon.Add}
              disabled={!fleet.freePlay && fleet.taskForces.length >= scale}
              dataTip={!fleet.freePlay && fleet.taskForces.length >= scale ? `(S)${scale} allows ${scale} task force${scale === 1 ? '' : 's'}` : null}
            >Add another task force</Btn>
          </div>
        </main>
      )}

      <PrintArea fleet={fleet} totalsByTf={totalsByTf} showPreview={showPreview} />


      <button className={'scifi-fab' + (scifi ? ' active' : '')} onClick={toggleScifi} title="Sci-fi mode">
        <span className="ico"><Icon.Sparkle /></span> Sci-fi
      </button>

      <footer className="game-info-footer">
        <div className="gif-inner">
          <span className="gif-title">Pacific Command</span>
          <span className="gif-sep">·</span>
          <span>Written by <a href="https://planetsmashergames.com/" target="_blank" rel="noopener">Mike Hutchinson</a></span>
          <span className="gif-sep">·</span>
          <span>Published by <a href="https://www.ospreypublishing.com/us/pacific-command-9781472859976/" target="_blank" rel="noopener">Osprey Games</a></span>
          <span className="gif-sep">·</span>
          <a href="https://planetsmashergames.com/pacific-command/" target="_blank" rel="noopener">Game page at Planet Smasher Games</a>
          <span className="gif-sep">·</span>
          <a href="https://www.amazon.com/Pacific-Command-Wargame-Osprey-Wargames/dp/1472859979" target="_blank" rel="noopener">Buy on Amazon</a>
          <span className="gif-sep">·</span>
          <span className="gif-builder">Fleet builder by <a href="https://jetwong.neocities.org" target="_blank" rel="noopener">WarLore</a></span>
        </div>
      </footer>

    </div>
    </LiteralNamesCtx.Provider>
    </ScifiCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
