(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();function S(){const s=document.querySelector(".menu-wrapper"),n=document.querySelector(".menu-button"),r=document.querySelectorAll(".menu-button img");if(!n||!s){console.error("menuButton or menuWrapper not found!");return}n.addEventListener("click",o);function o(){r.forEach(e=>{e.classList.toggle("hidden")}),s.classList.toggle("menu-show")}}const q={get:()=>{const s=document.querySelectorAll("tr.quest"),n=[];return s.forEach(r=>{const o=r.dataset.id;if(typeof o!="string"){console.error("id must be string!");return}let t=localStorage.getItem(o)==="true";n.push({id:o||"",isCompleted:t});const c=r.querySelector(".quest-completed input");c&&(c.checked=t)}),n},save:()=>{document.querySelectorAll("tr.quest").forEach(n=>{if(typeof n.dataset.id!="string"){console.error("id must be string!");return}const e=n.querySelector(".quest-completed input").checked,t=n.dataset.id;if(!t||typeof t!="string"){console.error("Quest storage key is of incorrect type or not found!");return}localStorage.setItem(t,e.toString())})}};async function L(){const s="data/quests.json";try{const n=await fetch(s);if(!n.ok)throw new Error(`Response status: ${n.status}`);return await n.json()}catch(n){console.error(n.message)}}const w=L();function b(){const n=q.get().map(o=>o.id),r=[];for(const o of n)r.push(document.querySelectorAll(`[data-id="${o}"]`));return r}async function C(){const s=document.querySelector("main table tbody");if(!s){console.error("Tbody not found!");return}const n=await w;for(let o=0;o<n.length;o++){const e=n[o],t=document.createElement("tr");t.setAttribute("data-id",o.toString());const c=e.questInfo.type.split(" ")[0].toLowerCase();t.setAttribute("data-type",c),t.classList.add("quest"),(e.extraDetails.length<2||!e.extraDetails)&&t.classList.add("last-quest-row");const l=document.createElement("td");l.textContent=e.location,l.rowSpan=e.extraDetails.length||1,t.append(l);const a=document.createElement("td");if(a.classList.add("quest-name"),!e.questInfo.orderMatters){const p=document.createElement("img");p.src="imgs/kekw.jpg",a.appendChild(p)}const u=document.createElement("a");u.classList.add("quest-link"),u.textContent=e.questInfo.name,u.setAttribute("href",e.questInfo.hyperlink),a.append(u),a.rowSpan=e.extraDetails.length||1,t.append(a);const d=document.createElement("td");d.classList.add("quest-completed");const i=document.createElement("input");i.type="checkbox",d.append(i),d.rowSpan=e.extraDetails.length||1,t.append(d);const f=r(e.extraDetails,!0);if(t.append(f),s.append(t),e.extraDetails.length>1)for(let p=1;p<e.extraDetails.length;p++){const h=p===e.extraDetails.length-1,m=document.createElement("tr");m.setAttribute("data-id",o.toString());const y=r(e.extraDetails,!1,p);h&&m.classList.add("last-quest-row"),m.append(y),s.append(m)}}function r(o,e=!1,t=0){var l,a,u;const c=document.createElement("td");if(c.classList.add("extra-detail"),(l=o[e?0:t])!=null&&l.hyperlink&&o[e?0:t].description){const d=document.createElement("a");d.classList.add("extra-detail-link"),d.textContent=o[e?0:t].description,d.setAttribute("href",o[e?0:t].hyperlink),c.append(d)}else if((a=o[e?0:t])!=null&&a.hyperlink&&!o[e?0:t].description){const d=document.createElement("a");d.classList.add("extra-detail-link"),d.textContent=o[e?0:t].hyperlink,d.setAttribute("href",o[e?0:t].hyperlink),c.append(d)}else c.textContent=(u=o[e?0:t])==null?void 0:u.description;return c}}function v(){const s=document.querySelector("main"),n=document.querySelector(".theme-switch .switch-btn input"),r="preferred-theme";if(!s||!n){console.error("Main or toggleThemeButton not found!");return}const o=localStorage.getItem(r),e=window.matchMedia("(prefers-color-scheme: dark)").matches;o?(o==="dark"?s.classList.add("dark-theme"):s.classList.remove("dark-theme"),n.checked=o==="dark"):(e&&s.classList.add("dark-theme"),n.checked=e),n.addEventListener("click",t);function t(){if(!s||!n){console.error("Body or toggleThemeButton not found!");return}n.checked?(s.classList.add("dark-theme"),localStorage.setItem(r,"dark")):(s.classList.remove("dark-theme"),localStorage.setItem(r,"light"))}}function E(){const s=document.querySelector(".quest-count"),n=document.querySelector(".completed-percentage");if(!n||!s){console.error("completedHeaderEl or questCountEl not found!");return}const r=q.get(),o=r.length,e=r.filter(c=>c.isCompleted===!0).length,t=(e/o*100).toFixed(1);n.textContent=t,s.innerHTML=`${e}/${o}`}function T(){const s=document.querySelector(".hide-completed .switch-btn input");if(!s){console.error("hideQuestsBtn not found!");return}const n="hide-quests";let o=localStorage.getItem(n)==="true";s.checked=o,e(o),s.addEventListener("click",()=>{const t=s.checked;localStorage.setItem(n,`${t?"true":"false"}`),e(t)});function e(t){document.querySelectorAll("tbody .quest").forEach(l=>{const a=l.querySelector(".quest-completed input");if(!a){console.error("isCompletedEl not found!");return}const u=a.checked,d=l.dataset.id;document.querySelectorAll(`[data-id="${d}"]`).forEach(f=>{u&&f.classList.toggle("hidden-completed",t)})})}}function I(s){const n=document.querySelector(".hide-completed .switch-btn input");if(!n){console.error("hideQuestsBtn not found!");return}if(!n.checked)return;const r=s,o=s.parentElement.parentElement;if(!o){console.log("questEl not found!");return}const e=o.dataset.id,t=r.checked;document.querySelectorAll(`[data-id="${e}"]`).forEach(l=>{t&&l.classList.toggle("hidden-completed")})}function x(){const s=document.querySelector("table");if(!s){console.error("Table element not found!");return}E(),s.addEventListener("click",n=>{const r=n.target;if(!r){console.error("Click event not working properly");return}r.matches(".quest-completed input")&&(q.save(),E(),I(r))})}function Q(){const s=document.querySelector(".quest-search input");if(!s){console.error("searchInput not found!");return}let n=[];s.addEventListener("focus",()=>{n=b()}),s.addEventListener("input",r=>{const e=r.target.value.toLowerCase();for(const t of n){const l=t[0].querySelector(".quest-name a").innerHTML.toLowerCase().includes(e);t.forEach(a=>{a.classList.toggle("hidden",!l)})}})}function A(){const s=document.querySelector(".filters button"),n=document.querySelector(".filter-options"),r=document.querySelectorAll(".filter-options li input");if(!s||!n||!r){console.error("filterBtn or filterOptionsEl or filterOptionsEls not found!");return}const o={main:!1,side:!1,contract:!1,treasure:!1,scavenger:!1,gwent:!1,chance:!1};let e=!1;s.addEventListener("click",()=>{n.classList.toggle("hidden")}),r.forEach(t=>{t.addEventListener("click",l=>{const a=l.target;c(a)});function c(l){const a=l.checked,u=t.name;u!=="completed"?o[u]=a:u==="completed"&&(e=!e);const d=b();for(const i of d){const f=i[0],p=f.dataset.type,h=f.querySelector(".quest-completed input");if(!h){console.log("isQuestCompleted element not found!");return}const m=h.checked,y=o[p],k=Object.values(o).includes(!0);if(!Object.values(o).includes(!0)&&!e){i.forEach(g=>{g.classList.remove("hidden-filtered","hidden-filtered-completed")});continue}for(const g of i)g.classList.toggle("hidden-filtered-completed",!m&&e),g.classList.toggle("hidden-filtered",!y&&k)}}})}(async function(){S(),await C(),v(),x(),T(),Q(),A()})();(()=>{const s=document.querySelector(".export-data-btn");if(!s){console.error("Export button not found!");return}s.addEventListener("click",()=>{if(window.confirm("Export quest data?")){const o=r();n(o,"quest-data.json")}});function n(o,e="file.txt"){const t=URL.createObjectURL(o),c=document.createElement("a");c.href=t,c.download=e,document.body.appendChild(c),c.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window})),document.body.removeChild(c)}function r(){const o=document.querySelectorAll(".quest"),e=[];o.forEach(l=>{const a=l.dataset.id;let u=l.querySelector(".quest-name");const d=l.querySelector(".quest-completed input"),i={id:a||"",name:u!=null&&u.textContent?u.textContent:"",isCompleted:d?d.checked:!1};e.push(i)});const t=JSON.stringify(e,null,2);return new Blob([t],{type:"application/json"})}})();(()=>{const s=document.querySelector(".import-quest-data");if(!s){console.error("File input not found!");return}s.addEventListener("change",()=>{if(s.files&&s.files.length>0){const n=new FileReader;n.readAsText(s.files[0]),n.addEventListener("load",()=>{if(window.confirm("Import quest data?")){try{const r=n.result;if(typeof r!="string")throw new Error("Invalid file content");const o=JSON.parse(r),e=document.querySelectorAll("tbody tr.quest");o.forEach(t=>{for(const c of e){const l=c.dataset.id;let a=c.querySelector(".quest-completed input");if(!a){console.error("Checkbox not found!");return}t.id===l&&(a.checked=!!t.isCompleted)}})}catch{alert("Please import correct data")}q.save(),E()}else s.value=""})}})})();