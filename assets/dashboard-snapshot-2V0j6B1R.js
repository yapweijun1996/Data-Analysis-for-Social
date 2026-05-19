import{g as e,s as t}from"./db-BlXCa8V5.js";import{c as n,i as r,r as i}from"./engagement-Bibhb-OS.js";import{n as a,r as o}from"./platform-data-CYZcRf0H.js";import{t as s}from"./clients-DdObG0q5.js";function c(e,n){return!n.startMonth&&!n.endMonth?``:n.startMonth&&n.endMonth?`"${e}" >= '${t(n.startMonth)}' AND "${e}" <= '${t(n.endMonth)}'`:n.startMonth?`"${e}" >= '${t(n.startMonth)}'`:`"${e}" <= '${t(n.endMonth)}'`}function l(e){let t=e.filter(Boolean).join(` AND `);return t?`WHERE ${t}`:``}async function u(t,r,i){let u=o(t),d=a(t),f=[c(`Report Period`,r),s(r.clientCode)].filter(Boolean),p=u?l(f):``,m=d?l(f):``,h={ttSpend:0,metaSpend:0,ttReach:0,metaReach:0,ttImpressions:0,metaImpressions:0,ttClicks:0,metaClicks:0,ttCampaigns:0,metaCampaigns:0,ttCPM:0,metaCPM:0,ttCPC:0,metaCPC:0,ttCTR:0,metaCTR:0,ttEngagement:0,metaEngagement:0};if(u){let t=await e(`
      SELECT
        COALESCE(CAST(SUM(TRY_CAST(NULLIF("Cost",'') AS DOUBLE)) AS VARCHAR),'0') as spend,
        COALESCE(CAST(SUM(TRY_CAST(NULLIF("Reach",'') AS DOUBLE)) AS VARCHAR),'0') as reach,
        COALESCE(CAST(SUM(TRY_CAST(NULLIF("Impressions",'') AS DOUBLE)) AS VARCHAR),'0') as impr,
        COALESCE(CAST(SUM(TRY_CAST(NULLIF("Clicks (destination)",'') AS DOUBLE)) AS VARCHAR),'0') as clicks,
        COALESCE(CAST(AVG(TRY_CAST(NULLIF("CPM",'') AS DOUBLE)) AS VARCHAR),'0') as cpm,
        COALESCE(CAST(AVG(TRY_CAST(NULLIF("CPC (destination)",'') AS DOUBLE)) AS VARCHAR),'0') as cpc,
        ${n(`tiktok`,i)} as engagement
      FROM "${u}" ${p}
    `);h.ttSpend=Number(t[0].spend),h.ttReach=Number(t[0].reach),h.ttImpressions=Number(t[0].impr),h.ttClicks=Number(t[0].clicks),h.ttCPM=Number(t[0].cpm),h.ttCPC=Number(t[0].cpc),h.ttEngagement=Number(t[0].engagement);let r=await e(`SELECT COUNT(DISTINCT "Campaign ID") as cnt FROM "${u}" ${p}`);h.ttCampaigns=Number(r[0].cnt)}if(d){let t=await e(`
      SELECT
        COALESCE(CAST(SUM(TRY_CAST(NULLIF("Amount spent (SGD)",'') AS DOUBLE)) AS VARCHAR),'0') as spend,
        COALESCE(CAST(SUM(TRY_CAST(NULLIF("Reach",'') AS DOUBLE)) AS VARCHAR),'0') as reach,
        COALESCE(CAST(SUM(TRY_CAST(NULLIF("Impressions",'') AS DOUBLE)) AS VARCHAR),'0') as impr,
        COALESCE(CAST(SUM(TRY_CAST(NULLIF("Link clicks",'') AS DOUBLE)) AS VARCHAR),'0') as clicks,
        COALESCE(CAST(AVG(TRY_CAST(NULLIF("CPM (cost per 1,000 impressions) (SGD)",'') AS DOUBLE)) AS VARCHAR),'0') as cpm,
        COALESCE(CAST(AVG(TRY_CAST(NULLIF("CPC (cost per link click) (SGD)",'') AS DOUBLE)) AS VARCHAR),'0') as cpc,
        ${n(`meta`,i)} as engagement
      FROM "${d}" ${m}
    `);h.metaSpend=Number(t[0].spend),h.metaReach=Number(t[0].reach),h.metaImpressions=Number(t[0].impr),h.metaClicks=Number(t[0].clicks),h.metaCPM=Number(t[0].cpm),h.metaCPC=Number(t[0].cpc),h.metaEngagement=Number(t[0].engagement);let r=await e(`SELECT COUNT(DISTINCT "Campaign name") as cnt FROM "${d}" ${m}`);h.metaCampaigns=Number(r[0].cnt)}h.ttCTR=h.ttImpressions>0?h.ttClicks/h.ttImpressions*100:0,h.metaCTR=h.metaImpressions>0?h.metaClicks/h.metaImpressions*100:0;let g=[];if(u){let t=await e(`
      SELECT "Campaign name" as name,
        COALESCE(CAST(SUM(TRY_CAST(NULLIF("Reach",'') AS DOUBLE)) AS VARCHAR),'0') as reach,
        COALESCE(CAST(AVG(TRY_CAST(NULLIF("Cost per result",'') AS DOUBLE)) AS VARCHAR),'0') as cpr,
        COALESCE(CAST(AVG(TRY_CAST(NULLIF("CPM",'') AS DOUBLE)) AS VARCHAR),'0') as cpm
      FROM "${u}" ${l([...f,`"Advertising objective" = 'Reach'`])}
      GROUP BY "Campaign name"
      ORDER BY SUM(TRY_CAST(NULLIF("Reach",'') AS DOUBLE)) DESC NULLS LAST LIMIT 10
    `);for(let e of t)g.push({name:e.name,platform:`TikTok`,reach:Number(e.reach),cpr:Number(e.cpr),cpm:Number(e.cpm)})}if(d){let t=await e(`
      SELECT "Campaign name" as name,
        COALESCE(CAST(SUM(TRY_CAST(NULLIF("Reach",'') AS DOUBLE)) AS VARCHAR),'0') as reach,
        COALESCE(CAST(AVG(TRY_CAST(NULLIF("Cost per results",'') AS DOUBLE)) AS VARCHAR),'0') as cpr,
        COALESCE(CAST(AVG(TRY_CAST(NULLIF("CPM (cost per 1,000 impressions) (SGD)",'') AS DOUBLE)) AS VARCHAR),'0') as cpm
      FROM "${d}" ${l([...f,`(REGEXP_MATCHES("Campaign name", '(?i)(^|\\W)reach(\\W|$)') OR REGEXP_MATCHES("Campaign name", '(?i)(^|\\W)awareness(\\W|$)'))`])}
      GROUP BY "Campaign name"
      ORDER BY SUM(TRY_CAST(NULLIF("Reach",'') AS DOUBLE)) DESC NULLS LAST LIMIT 10
    `);for(let e of t)g.push({name:e.name,platform:`Meta`,reach:Number(e.reach),cpr:Number(e.cpr),cpm:Number(e.cpm)})}g.sort((e,t)=>Number(t.reach)-Number(e.reach));let _=[];if(u){let t=await e(`
      SELECT "Campaign name" as name,
        COALESCE(CAST(SUM(TRY_CAST(NULLIF("Clicks (destination)",'') AS DOUBLE)) AS VARCHAR),'0') as clicks,
        COALESCE(CAST(AVG(TRY_CAST(NULLIF("CPC (destination)",'') AS DOUBLE)) AS VARCHAR),'0') as cpc,
        COALESCE(CAST(AVG(TRY_CAST(NULLIF("CTR (destination)",'') AS DOUBLE)) AS VARCHAR),'0') as ctr
      FROM "${u}" ${l([...f,`"Advertising objective" = 'Traffic'`])}
      GROUP BY "Campaign name"
      ORDER BY SUM(TRY_CAST(NULLIF("Clicks (destination)",'') AS DOUBLE)) DESC NULLS LAST LIMIT 10
    `);for(let e of t)_.push({name:e.name,platform:`TikTok`,clicks:Number(e.clicks),cpc:Number(e.cpc),ctr:Number(e.ctr)})}if(d){let t=await e(`
      SELECT "Campaign name" as name,
        COALESCE(CAST(SUM(TRY_CAST(NULLIF("Link clicks",'') AS DOUBLE)) AS VARCHAR),'0') as clicks,
        COALESCE(CAST(AVG(TRY_CAST(NULLIF("CPC (cost per link click) (SGD)",'') AS DOUBLE)) AS VARCHAR),'0') as cpc,
        COALESCE(CAST(AVG(TRY_CAST(NULLIF("CTR (link click-through rate)",'') AS DOUBLE)) AS VARCHAR),'0') as ctr
      FROM "${d}" ${l([...f,`REGEXP_MATCHES("Campaign name", '(?i)(^|\\W)traffic(\\W|$)')`])}
      GROUP BY "Campaign name"
      ORDER BY SUM(TRY_CAST(NULLIF("Link clicks",'') AS DOUBLE)) DESC NULLS LAST LIMIT 10
    `);for(let e of t)_.push({name:e.name,platform:`Meta`,clicks:Number(e.clicks),cpc:Number(e.cpc),ctr:Number(e.ctr)})}return _.sort((e,t)=>Number(t.clicks)-Number(e.clicks)),{totals:h,awarenessTop:g,trafficTop:_}}function d(e){let t=e.ttSpend+e.metaSpend,n=e.ttReach+e.metaReach,a=e.ttImpressions+e.metaImpressions,o=e.ttClicks+e.metaClicks,s=e.ttEngagement+e.metaEngagement;return{totalSpend:t,totalReach:n,totalImpressions:a,totalClicks:o,totalEngagement:s,avgCPM:a>0?t/a*1e3:0,avgCPC:o>0?t/o:0,avgCTR:a>0?o/a*100:0,avgER:r(s,a),avgCPE:i(t,s)}}export{d as derive,u as fetchDashboardSnapshot};