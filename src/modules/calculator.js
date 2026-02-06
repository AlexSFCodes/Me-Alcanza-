/**
 * Calcula el total de ingresos
 * @param {number} sueldo - Sueldo mensual
 * @param {number} otrosIngresos - Otros ingresos adicionales
 * @returns {number} Total de ingresos
 */
export function calcularTotalIngresos(sueldo, otrosIngresos = 0) {
  return Number(sueldo || 0) + Number(otrosIngresos || 0);
}

/**
 * Calcula el total de gastos
 * @param {Object} gastos - Objeto con todos los gastos
 * @returns {number} Total de gastos
 */
export function calcularTotalGastos(gastos) {
  return (
    Number(gastos.arriendo || 0) +
    Number(gastos.alimentacion || 0) +
    Number(gastos.transporte || 0) +
    Number(gastos.servicios || 0) +
    Number(gastos.entretenimiento || 0) +
    Number(gastos.otrosGastos || 0)
  );
}

/**
 * Calcula el saldo final (ingresos - gastos)
 * @param {number} ingresos - Total de ingresos
 * @param {number} gastos - Total de gastos
 * @returns {number} Saldo final
 */
export function calcularSaldo(ingresos, gastos) {
  return ingresos - gastos;
}

/**
 * Calcula el porcentaje de un gasto sobre el total de gastos
 * @param {number} valor - Valor del gasto individual
 * @param {number} totalGastos - Total de gastos
 * @returns {string} Porcentaje formateado con 1 decimal
 */
export function calcularPorcentaje(valor, totalGastos) {
  if (totalGastos === 0) return '0.0';
  return ((valor / totalGastos) * 100).toFixed(1);
}

/**
 * Determina el color de la barra de progreso según el porcentaje
 * EXACTAMENTE como en tu código original
 * @param {number} porcentaje - Porcentaje del gasto
 * @returns {string} Clase CSS de Bootstrap
 */
export function obtenerColorBarra(porcentaje) {
  if (porcentaje < 15) return 'bg-success';
  if (porcentaje < 25) return 'bg-info';
  if (porcentaje < 40) return 'bg-warning';
  return 'bg-danger';
}

/**
 * Calcula el desglose detallado de gastos con porcentajes
 * @param {Object} gastos - Objeto con todos los gastos
 * @param {number} totalGastos - Total de gastos
 * @returns {Array} Array de objetos con detalles de cada categoría
 */
export function calcularDetalleGastos(gastos, totalGastos) {
  const categorias = [
    {
      key: 'arriendo',
      nombre: 'Arriendo',
      icono: 'bi-house-door',
      valor: gastos.arriendo
    },
    {
      key: 'alimentacion',
      nombre: 'Alimentación',
      icono: 'bi-cart',
      valor: gastos.alimentacion
    },
    {
      key: 'transporte',
      nombre: 'Transporte',
      icono: 'bi-bus-front',
      valor: gastos.transporte
    },
    {
      key: 'servicios',
      nombre: 'Servicios',
      icono: 'bi-lightning',
      valor: gastos.servicios
    },
    {
      key: 'entretenimiento',
      nombre: 'Entretenimiento',
      icono: 'bi-controller',
      valor: gastos.entretenimiento
    },
    {
      key: 'otrosGastos',
      nombre: 'Otros Gastos',
      icono: 'bi-three-dots',
      valor: gastos.otrosGastos
    }
  ];

  return categorias.map(categoria => {
    const valor = Number(categoria.valor || 0);
    const porcentaje = calcularPorcentaje(valor, totalGastos);
    
    return {
      nombre: categoria.nombre,
      icono: categoria.icono,
      valor: valor,
      porcentaje: porcentaje,
      porcentajeNumerico: parseFloat(porcentaje),
      color: obtenerColorBarra(parseFloat(porcentaje))
    };
  });
}

/**
 * Verifica si hay déficit (gastas más de lo que ganas)
 * @param {number} totalGastos - Total de gastos
 * @param {number} totalIngresos - Total de ingresos
 * @returns {boolean} True si hay déficit
 */
export function hayDeficit(totalGastos, totalIngresos) {
  return totalGastos > totalIngresos;
}

/**
 * Calcula cuánto falta o sobra
 * @param {number} totalGastos - Total de gastos
 * @param {number} totalIngresos - Total de ingresos
 * @returns {number} Valor absoluto de la diferencia
 */
export function calcularDiferencia(totalGastos, totalIngresos) {
  return Math.abs(totalGastos - totalIngresos);
}

/**
 * Formatea un número como moneda en dólares
 * @param {number} valor - Valor numérico
 * @returns {string} Valor formateado como $X.XX
 */
export function formatearMoneda(valor) {
  return `$${Number(valor).toFixed(2)}`;
}
