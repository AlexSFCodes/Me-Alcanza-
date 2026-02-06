import { 
  formatearMoneda, 
  calcularDetalleGastos,
  hayDeficit,
  calcularDiferencia 
} from './calculator.js';
/**
 * Obtiene los valores del formulario
 * Igual que en tu código original pero más organizado
 * @returns {Object} Objeto con ingresos y gastos
 */
export function obtenerDatosFormulario() {
  return {
    ingresos: {
      sueldo: parseFloat(document.getElementById('sueldo').value) || 0,
      otrosIngresos: parseFloat(document.getElementById('otrosIngresos').value) || 0
    },
    gastos: {
      arriendo: parseFloat(document.getElementById('arriendo').value) || 0,
      alimentacion: parseFloat(document.getElementById('alimentacion').value) || 0,
      transporte: parseFloat(document.getElementById('transporte').value) || 0,
      servicios: parseFloat(document.getElementById('servicios').value) || 0,
      entretenimiento: parseFloat(document.getElementById('entretenimiento').value) || 0,
      otrosGastos: parseFloat(document.getElementById('otrosGastos').value) || 0
    }
  };
}

/**
 * Muestra los totales en la interfaz
 * @param {number} totalIngresos - Total de ingresos
 * @param {number} totalGastos - Total de gastos
 * @param {number} saldo - Saldo final
 */
export function mostrarTotales(totalIngresos, totalGastos, saldo) {
  document.getElementById('totalIngresos').textContent = formatearMoneda(totalIngresos);
  document.getElementById('totalGastos').textContent = formatearMoneda(totalGastos);
  document.getElementById('saldoFinal').textContent = formatearMoneda(saldo);
  
  console.log('Total Ingresos:', totalIngresos);
  console.log('Total Gastos:', totalGastos);
  console.log('Saldo Final:', saldo);
}

/**
 * Oculta la alerta inicial del resultado
 */
export function ocultarAlertaInicial() {
  document.getElementById('alertResultado').style.display = 'none';
}

/**
 * Muestra el desglose de gastos con barras de progreso
 * EXACTAMENTE como en tu código original pero modularizado
 * @param {Object} gastos - Objeto con gastos originales
 * @param {number} totalGastos - Total de gastos
 * @param {number} totalIngresos - Total de ingresos
 */
export function mostrarDetalleGastos(gastos, totalGastos, totalIngresos) {
  const contenedor = document.getElementById('detalleGastos');
  
  if (totalGastos > 0) {
    const detalles = calcularDetalleGastos(gastos, totalGastos);
    const deficit = hayDeficit(totalGastos, totalIngresos);
    const diferencia = calcularDiferencia(totalGastos, totalIngresos);
    
    // Generar HTML de alerta si hay déficit
    const alertaDeficit = deficit ? `
      <div class="alert alert-danger mb-3">
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        <strong>¡Déficit!</strong> Estás gastando 
        <strong>${formatearMoneda(diferencia)}</strong> más de lo que ganas.
      </div>
    ` : '';
    
    // Generar HTML de cada barra de progreso
    const barrasHTML = detalles.map(detalle => `
      <div class="mb-3">
        <div class="d-flex justify-content-between mb-2">
          <span class="fw-semibold">
            <i class="bi ${detalle.icono} me-1"></i>${detalle.nombre}
          </span>
          <span>${formatearMoneda(detalle.valor)}</span>
        </div>
        <div class="progress" style="height: 30px;">
          <div class="progress-bar ${detalle.color}" 
               style="width: ${detalle.porcentaje}%">
            ${detalle.porcentaje}%
          </div>
        </div>
      </div>
    `).join('');
    
    contenedor.innerHTML = alertaDeficit + barrasHTML;
    
  } else {
    contenedor.innerHTML = `
      <div class="alert alert-info text-center">
        <i class="bi bi-info-circle me-2"></i>
        No hay gastos registrados para mostrar
      </div>
    `;
  }
}

/**
 * Muestra la sección de resultados
 */
export function mostrarResultados() {
  const resultadoCard = document.getElementById('resultadoCard');
  resultadoCard.style.display = 'block';
  
  // Scroll suave hacia los resultados (mejora UX)
  resultadoCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Configurar el botón de mostrar/ocultar distribución
 * Funcionalidad EXACTA de tu código original
 */
export function configurarBotonDistribucion() {
  const botonDistribucion = document.getElementById('ocultarResultadoBtn');
  const contenedor = document.getElementById('detalleGastos');
  
  botonDistribucion.addEventListener('click', () => {
    // Alternar visibilidad
    if (contenedor.style.display === 'none') {
      // Mostrar
      contenedor.style.display = 'block';
      botonDistribucion.innerHTML = '<i class="bi bi-eye-slash me-2"></i>Ocultar resultados';
      botonDistribucion.className = 'btn btn-outline-primary';
    } else {
      // Ocultar
      contenedor.style.display = 'none';
      botonDistribucion.innerHTML = '<i class="bi bi-eye me-2"></i>Mostrar resultados';
      botonDistribucion.className = 'btn btn-outline-primary';
    }
  });
}

/**
 * Limpia el formulario (funcionalidad nueva, útil)
 */
export function limpiarFormulario() {
  const form = document.getElementById('gastosForm');
  form.reset();
  
  // Ocultar resultados
  document.getElementById('resultadoCard').style.display = 'none';
  
  // Restaurar alerta inicial
  document.getElementById('alertResultado').style.display = 'block';
  
  // Enfocar primer campo
  document.getElementById('sueldo').focus();
}
