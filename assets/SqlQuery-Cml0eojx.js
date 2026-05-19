import{i as e}from"./chunk-DseTPa7n.js";import{n as t,t as n}from"./jsx-runtime-C6D02mtk.js";import{d as r,g as i}from"./db-BlXCa8V5.js";import{n as a,t as o}from"./ui-SR6OMZzQ.js";import{t as s}from"./TabulatorTable-BACifRIi.js";var c=e(t(),1),l=n(),u=`metik-sql-history`,d=20,f=[{label:`Top 10 TikTok campaigns by spend`,sql:`SELECT "Campaign name", SUM(TRY_CAST(NULLIF("Cost", '') AS DOUBLE)) AS spend
FROM "tt_campaign"
GROUP BY "Campaign name"
ORDER BY spend DESC NULLS LAST
LIMIT 10;`},{label:`Top 10 Meta campaigns by spend`,sql:`SELECT "Campaign name", SUM(TRY_CAST(NULLIF("Amount spent (SGD)", '') AS DOUBLE)) AS spend
FROM "meta_campaign"
GROUP BY "Campaign name"
ORDER BY spend DESC NULLS LAST
LIMIT 10;`},{label:`Monthly spend comparison (TikTok vs Meta)`,sql:`SELECT "Report Period" AS month,
  SUM(TRY_CAST(NULLIF("Cost", '') AS DOUBLE)) AS tt_spend,
  NULL AS meta_spend
FROM "tt_campaign"
GROUP BY "Report Period"
UNION ALL
SELECT "Report Period", NULL,
  SUM(TRY_CAST(NULLIF("Amount spent (SGD)", '') AS DOUBLE))
FROM "meta_campaign"
GROUP BY "Report Period"
ORDER BY month;`},{label:`Impressions by platform by month`,sql:`SELECT "Report Period" AS month, 'TikTok' AS platform,
  SUM(TRY_CAST(NULLIF("Impressions", '') AS DOUBLE)) AS impressions
FROM "tt_campaign" GROUP BY "Report Period"
UNION ALL
SELECT "Report Period", 'Meta',
  SUM(TRY_CAST(NULLIF("Impressions", '') AS DOUBLE))
FROM "meta_campaign" GROUP BY "Report Period"
ORDER BY month, platform;`},{label:`List all tables + row counts`,sql:`SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'main'
ORDER BY table_name;`}];function p(){try{let e=localStorage.getItem(u);return e?JSON.parse(e):[]}catch{return[]}}function m(e){try{localStorage.setItem(u,JSON.stringify(e.slice(0,d)))}catch{}}function h(){let[e,t]=(0,c.useState)(``),[n,u]=(0,c.useState)(null),[h,g]=(0,c.useState)(``),[_,v]=(0,c.useState)(!1),[y,b]=(0,c.useState)(0),[x,S]=(0,c.useState)(()=>p()),[C,w]=(0,c.useState)(!1),[T,E]=(0,c.useState)(!1);async function D(){if(!e.trim())return;v(!0),g(``),u(null);let t=performance.now();try{u(await i(e,{skipCache:!0})),b(performance.now()-t);let n=e.trim(),r=x[0]===n?x:[n,...x.filter(e=>e!==n)].slice(0,d);S(r),m(r)}catch(e){b(performance.now()-t),g(e instanceof Error?e.message:`Query failed`)}v(!1)}async function O(){let e=await r();t(`-- Available tables: ${e.join(`, `)}\nSELECT * FROM "${e[0]||`table_name`}" LIMIT 100`)}function k(){confirm(`Clear SQL query history?`)&&(S([]),m([]),w(!1))}return(0,l.jsxs)(`div`,{className:`sql-page`,children:[(0,l.jsx)(`h1`,{children:`SQL Query`}),(0,l.jsxs)(`div`,{className:`sql-editor`,children:[(0,l.jsx)(`textarea`,{value:e,onChange:e=>t(e.target.value),placeholder:`SELECT * FROM your_table LIMIT 100`,rows:6,spellCheck:!1,onKeyDown:e=>{(e.ctrlKey||e.metaKey)&&e.key===`Enter`&&D()}}),(0,l.jsxs)(`div`,{className:`sql-actions`,children:[(0,l.jsx)(a,{variant:`primary`,onClick:D,disabled:_,children:_?`Running…`:`Run (${navigator.platform.includes(`Mac`)?`⌘`:`Ctrl`}+Enter)`}),(0,l.jsx)(a,{variant:`secondary`,onClick:O,children:`Show Tables`}),(0,l.jsxs)(`div`,{className:`sql-dropdown`,children:[(0,l.jsx)(a,{variant:`secondary`,onClick:()=>{E(e=>!e),w(!1)},children:`Examples ▾`}),T&&(0,l.jsx)(`div`,{className:`sql-dropdown-menu`,children:f.map((e,n)=>(0,l.jsxs)(`button`,{className:`sql-dropdown-item`,onClick:()=>{t(e.sql),E(!1)},children:[(0,l.jsx)(`div`,{className:`sql-dropdown-title`,children:e.label}),(0,l.jsxs)(`pre`,{className:`sql-dropdown-preview`,children:[e.sql.split(`
`)[0],`…`]})]},n))})]}),x.length>0&&(0,l.jsxs)(`div`,{className:`sql-dropdown`,children:[(0,l.jsxs)(a,{variant:`secondary`,onClick:()=>{w(e=>!e),E(!1)},children:[`History (`,x.length,`) ▾`]}),C&&(0,l.jsxs)(`div`,{className:`sql-dropdown-menu`,children:[x.map((e,n)=>(0,l.jsx)(`button`,{className:`sql-dropdown-item`,onClick:()=>{t(e),w(!1)},children:(0,l.jsxs)(`pre`,{className:`sql-dropdown-preview`,children:[e.slice(0,120),e.length>120?`…`:``]})},n)),(0,l.jsx)(`button`,{className:`sql-dropdown-item sql-dropdown-clear`,onClick:k,children:`Clear history`})]})]})]})]}),h&&(0,l.jsx)(o,{variant:`error`,mono:!0,children:h}),n&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(`div`,{className:`sql-meta`,children:[n.length,` row(s) in `,y.toFixed(1),`ms`]}),(0,l.jsx)(s,{data:n,autoColumns:!0,height:`calc(100vh - 380px)`,paginationSize:100})]})]})}export{h as default};