import{g as e,s as t}from"./db-H5H8cxcx.js";import{a as n,i as r,l as i,u as a}from"./constants-DWB3mOp4.js";var o={posts:0,views:0,reach:0,followers:0,engagement:0,er:0};function s(){return{...o}}function c(e){return`TRY_CAST(NULLIF(REGEXP_REPLACE(COALESCE(CAST("${e}" AS VARCHAR), ''), '[^0-9.-]', '', 'g'), '') AS DOUBLE)`}function l(e,n){let r=[];return n.startMonth&&r.push(`SUBSTR(CAST("${e}" AS VARCHAR), 1, 7) >= '${t(n.startMonth)}'`),n.endMonth&&r.push(`SUBSTR(CAST("${e}" AS VARCHAR), 1, 7) <= '${t(n.endMonth)}'`),r.length>0?`WHERE ${r.join(` AND `)}`:``}function u(e){return{...e,er:e.reach>0?e.engagement/e.reach*100:0}}async function d(t,o){let d=s(),f=s(),p=s();if(t.includes(`Meta_NM_Organic_Posts_Insights`)){let t=await e(`
      SELECT
        LOWER(COALESCE(CAST("Platform" AS VARCHAR), '')) as platform,
        COUNT(*) as posts
      FROM "${n}"
      ${l(`Publish Date`,o)}
      GROUP BY LOWER(COALESCE(CAST("Platform" AS VARCHAR), ''))
    `);for(let e of t){let t=String(e.platform??``);t.includes(`facebook`)?d.posts+=Number(e.posts??0):t.includes(`instagram`)&&(f.posts+=Number(e.posts??0))}}if(t.includes(`Meta_NM_Organic_Overview_Insigh`)){let t=l(`Post Date`,o),n=await e(`
      SELECT
        LOWER(COALESCE(CAST("Platform" AS VARCHAR), '')) as platform,
        COALESCE(SUM(${c(`Views`)}), 0) as views,
        COALESCE(SUM(${c(`Reach/ Viewers`)}), 0) as reach,
        COALESCE(SUM(${c(`Follows`)}), 0) as followers,
        COALESCE(SUM(${c(`Content Interactions`)}), 0) as engagement
      FROM "${r}"
      ${t}
      GROUP BY LOWER(COALESCE(CAST("Platform" AS VARCHAR), ''))
    `);for(let e of n){let t=String(e.platform??``).includes(`instagram`)?f:d;t.views+=Number(e.views??0),t.reach+=Number(e.reach??0),t.followers+=Number(e.followers??0),t.engagement+=Number(e.engagement??0)}}if(t.includes(`Tik_Tok_NM_Organic_Posts_Insigh`)){let t=await e(`SELECT COUNT(*) as posts FROM "${a}" ${l(`Post time`,o)}`);p.posts=Number(t[0]?.posts??0)}if(t.includes(`Tik_Tok_NM_Organic_Overview_Ins`)){let t=l(`Post Date`,o),n=await e(`
      SELECT
        COALESCE(SUM(${c(`Video Views `)}), 0) as views,
        COALESCE(SUM(${c(`Reached Audience`)}), 0) as reach,
        COALESCE(SUM(${c(`Net Growth`)}), 0) as followers,
        COALESCE(SUM(${c(`Engagement`)}), 0) as engagement
      FROM "${i}"
      ${t}
    `);p.views=Number(n[0]?.views??0),p.reach=Number(n[0]?.reach??0),p.followers=Number(n[0]?.followers??0),p.engagement=Number(n[0]?.engagement??0)}return{facebook:u(d),instagram:u(f),tiktok:u(p)}}export{d as fetchNewMoonOrganicSnapshot};