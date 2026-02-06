import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import {
  calcularTotalIngresos,
  calcularTotalGastos,
  calcularSaldo
} from './modules/calculator.js';

import {
  obtenerDatosFormulario,
  mostrarTotales,
  ocultarAlertaInicial,
  mostrarDetalleGastos,
  mostrarResultados,
  configurarBotonDistribucion,
  limpiarFormulario
} from './modules/ui.js';

function procesarPresupuesto(evento) {
  evento.preventDefault();
  
  const datos = obtenerDatosFormulario();
  
  const totalIngresos = calcularTotalIngresos(
    datos.ingresos.sueldo,
    datos.ingresos.otrosIngresos
  );
  
  const totalGastos = calcularTotalGastos(datos.gastos);
  const saldo = calcularSaldo(totalIngresos, totalGastos);
  
  ocultarAlertaInicial();
  mostrarTotales(totalIngresos, totalGastos, saldo);
  mostrarDetalleGastos(datos.gastos, totalGastos, totalIngresos);
  mostrarResultados();
}

function inicializarApp() {
  console.log('Hola mundo :V'); 
  const form = document.querySelector('#gastosForm');
  if (form) {
    form.addEventListener('submit', procesarPresupuesto);
  }
  configurarBotonDistribucion();
  const btnLimpiar = document.getElementById('limpiarBtn');
  if (btnLimpiar) {
    btnLimpiar.addEventListener('click', limpiarFormulario);
  }
}


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarApp);
} else {
  inicializarApp();
}

// Export para usar en otros módulos si es necesario
export { procesarPresupuesto, inicializarApp };
