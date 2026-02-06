(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();function m(e,t=0){return Number(e||0)+Number(t||0)}function f(e){return Number(e.arriendo||0)+Number(e.alimentacion||0)+Number(e.transporte||0)+Number(e.servicios||0)+Number(e.entretenimiento||0)+Number(e.otrosGastos||0)}function b(e,t){return e-t}function y(e,t){return t===0?"0.0":(e/t*100).toFixed(1)}function p(e){return e<15?"bg-success":e<25?"bg-info":e<40?"bg-warning":"bg-danger"}function g(e,t){return[{key:"arriendo",nombre:"Arriendo",icono:"bi-house-door",valor:e.arriendo},{key:"alimentacion",nombre:"Alimentación",icono:"bi-cart",valor:e.alimentacion},{key:"transporte",nombre:"Transporte",icono:"bi-bus-front",valor:e.transporte},{key:"servicios",nombre:"Servicios",icono:"bi-lightning",valor:e.servicios},{key:"entretenimiento",nombre:"Entretenimiento",icono:"bi-controller",valor:e.entretenimiento},{key:"otrosGastos",nombre:"Otros Gastos",icono:"bi-three-dots",valor:e.otrosGastos}].map(r=>{const o=Number(r.valor||0),n=y(o,t);return{nombre:r.nombre,icono:r.icono,valor:o,porcentaje:n,porcentajeNumerico:parseFloat(n),color:p(parseFloat(n))}})}function v(e,t){return e>t}function I(e,t){return Math.abs(e-t)}function l(e){return`$${Number(e).toFixed(2)}`}function E(){return{ingresos:{sueldo:parseFloat(document.getElementById("sueldo").value)||0,otrosIngresos:parseFloat(document.getElementById("otrosIngresos").value)||0},gastos:{arriendo:parseFloat(document.getElementById("arriendo").value)||0,alimentacion:parseFloat(document.getElementById("alimentacion").value)||0,transporte:parseFloat(document.getElementById("transporte").value)||0,servicios:parseFloat(document.getElementById("servicios").value)||0,entretenimiento:parseFloat(document.getElementById("entretenimiento").value)||0,otrosGastos:parseFloat(document.getElementById("otrosGastos").value)||0}}}function B(e,t,s){document.getElementById("totalIngresos").textContent=l(e),document.getElementById("totalGastos").textContent=l(t),document.getElementById("saldoFinal").textContent=l(s),console.log("Total Ingresos:",e),console.log("Total Gastos:",t),console.log("Saldo Final:",s)}function h(){document.getElementById("alertResultado").style.display="none"}function F(e,t,s){const r=document.getElementById("detalleGastos");if(t>0){const o=g(e,t),n=v(t,s),a=I(t,s),u=n?`
      <div class="alert alert-danger mb-3">
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        <strong>¡Déficit!</strong> Estás gastando 
        <strong>${l(a)}</strong> más de lo que ganas.
      </div>
    `:"",d=o.map(i=>`
      <div class="mb-3">
        <div class="d-flex justify-content-between mb-2">
          <span class="fw-semibold">
            <i class="bi ${i.icono} me-1"></i>${i.nombre}
          </span>
          <span>${l(i.valor)}</span>
        </div>
        <div class="progress" style="height: 30px;">
          <div class="progress-bar ${i.color}" 
               style="width: ${i.porcentaje}%">
            ${i.porcentaje}%
          </div>
        </div>
      </div>
    `).join("");r.innerHTML=u+d}else r.innerHTML=`
      <div class="alert alert-info text-center">
        <i class="bi bi-info-circle me-2"></i>
        No hay gastos registrados para mostrar
      </div>
    `}function N(){const e=document.getElementById("resultadoCard");e.style.display="block",e.scrollIntoView({behavior:"smooth",block:"nearest"})}function L(){const e=document.getElementById("ocultarResultadoBtn"),t=document.getElementById("detalleGastos");e.addEventListener("click",()=>{t.style.display==="none"?(t.style.display="block",e.innerHTML='<i class="bi bi-eye-slash me-2"></i>Ocultar resultados',e.className="btn btn-outline-primary"):(t.style.display="none",e.innerHTML='<i class="bi bi-eye me-2"></i>Mostrar resultados',e.className="btn btn-outline-primary")})}function D(){document.getElementById("gastosForm").reset(),document.getElementById("resultadoCard").style.display="none",document.getElementById("alertResultado").style.display="block",document.getElementById("sueldo").focus()}function T(e){e.preventDefault();const t=E(),s=m(t.ingresos.sueldo,t.ingresos.otrosIngresos),r=f(t.gastos),o=b(s,r);h(),B(s,r,o),F(t.gastos,r,s),N()}function c(){console.log("Hola mundo :V");const e=document.querySelector("#gastosForm");e&&e.addEventListener("submit",T),L();const t=document.getElementById("limpiarBtn");t&&t.addEventListener("click",D)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",c):c();
