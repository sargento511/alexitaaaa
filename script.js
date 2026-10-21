// Banco de más de 50 preguntas de Administración de Empresas
const questionBank = [
    { q: "¿Como se llama Leo?", options: ["Leonardo", "Leopoldo", "Manolito", "No tiene nombre"], correct: 1 },
    { q: "¿Cuáles son las cuatro funciones administrativas básicas según Henri Fayol?", options: ["Planear, Organizar, Dirigir, Controlar", "Producir, Vender, Financiar, Contabilizar", "Diseñar, Probar, Lanzar, Medir", "Analizar, Sintetizar, Evaluar, Controlar"], correct: 0 },
    { q: "¿Qué herramienta se utiliza para analizar fortalezas, oportunidades, debilidades y amenazas?", options: ["Matriz BCG", "Análisis PESTEL", "Matriz FODA (SWOT)", "Diagrama de Ishikawa"], correct: 2 },
    { q: "¿Qué mide la rentabilidad (ROI)?", options: ["La liquidez inmediata de la empresa", "El rendimiento financiero sobre la inversión", "El nivel de satisfacción del cliente", "La rotación de inventarios"], correct: 1 },
    { q: "¿A qué se refiere el término 'Empowerment' en la administración moderna?", options: ["Reducir costos operativos", "Delegan poder y autonomía a los empleados", "Centralizar todas las decisiones en el CEO", "Contratar personal temporal"], correct: 1 },
    { q: "¿Qué tipo de estructura organizacional agrupa a las personas por funciones similares (Marketing, Finanzas, etc.)?", options: ["Estructura Matricial", "Estructura Funcional", "Estructura Divisional", "Estructura Plana"], correct: 1 },
    { q: "¿Qué evalúa el punto de equilibrio (Break-even point)?", options: ["El momento en que los ingresos cubren exactamente los costos totales", "La máxima ganancia posible", "El saldo mínimo en bancos", "El valor de las acciones"], correct: 0 },
    { q: "¿Cuál es el objetivo principal del marketing mix o las 4 P's?", options: ["Optimizar procesos de producción interna", "Definir Producto, Precio, Plaza y Promoción", "Reducir la rotación de personal", "Gestionar impuestos corporativos"], correct: 1 },
    { q: "¿Qué significa la 'C' en el ciclo PHVA (Planear, Hacer, Verificar, Actuar)?", options: ["Controlar", "Calcular", "Comprar", "Coordinar"], correct: 0 },
    { q: "¿Qué autor desarrolló la teoría de la jerarquía de las necesidades humanas?", options: ["Douglas McGregor", "Abraham Maslow", "David McClelland", "Frederick Herzberg"], correct: 1 },
    { q: "¿Qué estilo de liderazgo se basa en dar total libertad a los subordinados con mínima intervención del líder?", options: ["Autocrático", "Democrático", "Liberal (Laissez-faire)", "Transaccional"], correct: 2 },
    { q: "¿Qué significa JIT (Just in Time) en la gestión de operaciones?", options: ["Producir solo lo necesario, en el momento necesario y en las cantidades requeridas", "Entregar pedidos a medianoche", "Reclutar personal de forma inmediata", "Pagar deudas al vencimiento exacto"], correct: 0 },
    { q: "¿Cuál es el propósito principal de un organigrama?", options: ["Mostrar los flujos de efectivo diarios", "Representar gráficamente la estructura formal y jerarquía de la empresa", "Describir las políticas de ventas", "Evaluar el desempeño individual"], correct: 1 },
    { q: "¿Qué indicador mide la capacidad de una empresa para pagar sus deudas a corto plazo?", options: ["Prueba ácida o liquidez corriente", "Margen neto de utilidad", "Rotación de activos", "Apalancamiento financiero"], correct: 0 },
    { q: "¿Qué es el Benchmarking?", options: ["Copiar ilegalmente a la competencia", "Comparar los procesos y prácticas de una empresa con los mejores del mercado para mejorar", "Calcular salarios por horas", "Crear una nueva marca subsidiaria"], correct: 1 },
    { q: "¿Qué significa la teoría X y la teoría Y de la administración?", options: ["Modelos de comportamiento humano ante el trabajo y la autoridad", "Fórmulas financieras para calcular costos fijos", "Estrategias de expansión internacional", "Sistemas operativos de software empresarial"], correct: 0 },
    { q: "¿Qué es el 'Capital de Trabajo'?", options: ["Los recursos financieros con los que cuenta la empresa para operar a corto plazo", "El sueldo total de los empleados operativos", "El valor total de la maquinaria pesada", "Las utilidades retenidas de años anteriores"], correct: 0 },
    { q: "¿Qué analiza el modelo de las 5 Fuerzas de Porter?", options: ["El clima laboral interno", "La competitividad y atractivo de un sector o industria", "El rendimiento bursátil de la empresa", "La eficiencia de la cadena de suministro"], correct: 1 },
    { q: "¿Qué define a la cultura organizacional?", options: ["Los estatutos legales registrados ante notario", "El conjunto de valores, creencias y normas compartidas por los miembros de la empresa", "El uniforme obligatorio de los trabajadores", "El logotipo y la paleta de colores corporativos"], correct: 1 },
    { q: "¿Qué es la Responsabilidad Social Corporativa (RSC)?", options: ["Obligación de pagar impuestos puntualmente", "Compromiso voluntario de la empresa con el impacto social, ético y ambiental", "Organizar fiestas de fin de año para el personal", "Patrocinar equipos deportivos profesionales"], correct: 1 },
    { q: "¿Qué mide la rotación de inventarios?", options: ["Las veces que el inventario se vende y se reemplaza en un período", "El tiempo que tardan los proveedores en entregar mercancía", "El costo de almacenamiento mensual", "La cantidad de productos dañados"], correct: 0 },
    { q: "¿Qué es una empresa 'Holding'?", options: ["Una empresa que produce bienes perecederos", "Una sociedad financiera que posee participaciones en otras empresas", "Una microempresa familiar", "Una empresa sin fines de lucro"], correct: 1 },
    { q: "¿Qué significa el término 'Outsourcing'?", options: ["Subcontratación de procesos o servicios a terceros", "Vender acciones en la bolsa de valores", "Exportar productos al extranjero", "Abrir sucursales en otros estados"], correct: 0 },
    { q: "¿Cuál es la función del departamento de Recursos Humanos?", options: ["Gestionar la contabilidad y pagos de impuestos", "Reclutar, seleccionar, capacitar y retener al talento humano", "Controlar la bodega de materia prima", "Diseñar las campañas publicitarias"], correct: 1 },
    { q: "¿Qué es la planeación estratégica?", options: ["El registro diario de las ventas", "El proceso de definir la visión, misión y objetivos a largo plazo de la organización", "La programación de turnos de los empleados", "El mantenimiento preventivo de equipos"], correct: 1 },
    { q: "¿Qué evalúa la Matriz BCG (Boston Consulting Group)?", options: ["La estabilidad laboral de los gerentes", "La cartera de productos de una empresa según su tasa de crecimiento y participación de mercado", "El nivel de satisfacción del consumidor final", "Los costos de producción por unidad"], correct: 1 },
    { q: "¿Qué es el 'Lead Time' (Tiempo de ciclo)?", options: ["El tiempo total que toma desde que se inicia un proceso o pedido hasta su entrega final", "El horario de entrada de los directivos", "La vida útil de un producto en el mercado", "El plazo máximo de un crédito bancario"], correct: 0 },
    { q: "¿Qué es un costo fijo?", options: ["Un gasto que varía según el volumen de producción", "Un costo que no cambia ante variaciones en el nivel de producción (ej. renta)", "El pago de comisiones por ventas", "El costo de la materia prima directa"], correct: 1 },
    { q: "¿Qué es la reingeniería de procesos?", options: ["Hacer pequeños ajustes en la contabilidad", "La revisión fundamental y el rediseño radical de procesos para mejoras drásticas", "Cambiar de oficina a los empleados", "Actualizar el software antivirus"], correct: 1 },
    { q: "¿Cuál es la diferencia principal entre líder y jefe?", options: ["El jefe manda por autoridad formal; el líder inspira y guía al equipo", "El jefe gana menos que el líder", "No existe ninguna diferencia conceptual", "El líder solo trabaja por comisión"], correct: 0 },
    { q: "¿Qué es el flujo de caja (Cash Flow)?", options: ["El inventario disponible en efectivo", "El informe de entradas y salidas de dinero en efectivo durante un período", "La cantidad de cajas registradoras abiertas", "El presupuesto anual de marketing"], correct: 1 },
    { q: "¿Qué significa la sigla KPI?", options: ["Key Performance Indicator (Indicador Clave de Rendimiento)", "Knowledge Process Integration", "Kraft Product Index", "Key Project Investment"], correct: 0 },
    { q: "¿Qué es la descentralización administrativa?", options: ["Concentrar todo el poder en una sola persona", "Delegar autoridad para la toma de decisiones en los niveles inferiores de la estructura", "Cerrar sucursales regionales", "Eliminar los departamentos de apoyo"], correct: 1 },
    { q: "¿Qué es el salario emocional?", options: ["Bonos económicos extraordinarios por rendimiento", "Beneficios no monetarios que recibe el colaborador (clima flexible, bienestar, desarrollo)", "El sueldo mínimo fijado por ley", "Descuentos en productos de la empresa"], correct: 1 },
    { q: "¿Qué evalúa el análisis PESTEL?", options: ["Políticos, Económicos, Sociales, Tecnológicos, Ecológicos y Legales del entorno", "Producción, Embalaje, Stock, Transporte, Envío y Logística", "Proveedores, Empleados, Socios, Clientes, Inversionistas", "Publicidad, Economía, Sistemas, Tarifas, Estilos, Liderazgo"], correct: 0 },
    { q: "¿Qué es un organigrama matricial?", options: ["Un diagrama lineal muy simple", "Una estructura donde los empleados reportan a dos o más jefes (ej. por función y por proyecto)", "Una lista numérica de puestos de trabajo", "Un gráfico circular de costos"], correct: 1 },
    { q: "¿Qué significa la ley de la oferta y la demanda en economía de empresas?", options: ["Los precios se fijan por decreto gubernamental", "El precio de mercado se ajusta según la cantidad ofrecida y la demanda de los consumidores", "La producción siempre es igual a las ventas", "Los costos fijos determinan el valor final"], correct: 1 },
    { q: "¿Qué es el 'Brainstorming' o lluvia de ideas?", options: ["Una tormenta en la planta de producción", "Una técnica de grupo para generar ideas originales en un ambiente libre de críticas", "Un método de evaluación de desempeño estricto", "Un análisis financiero de riesgos"], correct: 1 },
    { q: "¿Qué es la ventaja competitiva?", options: ["Tener el precio más caro del mercado", "Cualquier característica que diferencia a una empresa de sus competidores, otorgándole superioridad", "Tener empleados con más de 10 años de antigüedad", "Contar con oficinas lujosas"], correct: 1 },
    { q: "¿Qué es la rotación de personal (Turnover)?", options: ["El cambio de turno de los trabajadores nocturnos", "La tasa de entrada y salida de empleados en una empresa durante un período", "El movimiento de la mercancía en el almacén", "La rotación de los equipos de cómputo"], correct: 1 },
    { q: "¿Qué es un plan de negocios?", options: ["Un contrato legal de sociedad", "Un documento formal donde se detalla un negocio, sus objetivos y estrategias para realizarlos", "Una factura global de gastos operativos", "Un reporte fiscal anual"], correct: 1 },
    { q: "¿Qué significa 'Lean Management'?", options: ["Gestión enfocada en maximizar el valor para el cliente minimizando el desperdicio", "Administración estricta con reducción de sueldos", "Dirección corporativa ligera sin oficinas físicas", "Control de dietas para empleados"], correct: 0 },
    { q: "¿Qué es el apalancamiento financiero?", options: ["Uso de deuda externa para financiar operaciones y aumentar la rentabilidad potencial", "Ahorrar dinero en cuentas bancarias seguras", "Vender acciones propias en la bolsa", "Reducir la plantilla laboral"], correct: 0 },
    { q: "¿Qué función cumple el control en el proceso administrativo?", options: ["Medir y corregir el desempeño para asegurar que los objetivos se cumplan conforme a lo planeado", "Diseñar los logotipos oficiales de la marca", "Calcular los salarios brutos", "Contratar al personal de vigilancia"], correct: 0 },
    { q: "¿Qué es la segmentación de mercado?", options: ["Dividir un mercado en grupos más pequeños con características y necesidades homogéneas", "Repartir la mercancía entre diferentes sucursales", "Vender productos únicamente a mayoristas", "Cortar presupuestos por departamentos"], correct: 0 },
    { q: "¿Qué es un costo variable?", options: ["Un gasto que nunca cambia", "Un costo que varía directamente con el volumen de producción (ej. materia prima)", "El sueldo fijo del gerente general", "El costo de alquiler del local"], correct: 1 },
    { q: "¿Qué es la retroalimentación (Feedback) en la comunicación directiva?", options: ["La respuesta del receptor que permite verificar si el mensaje fue comprendido", "Una queja formal de los clientes", "El reporte financiero trimestral", "La auditoría externa de la empresa"], correct: 0 },
    { q: "¿Qué es la misión de una empresa?", options: ["El sueño o meta utópica a 50 años", "La razón de ser actual de la empresa, qué hace, para quién y cuál es su propuesta de valor", "La lista de proveedores autorizados", "El código de vestimenta corporativo"], correct: 1 },
    { q: "¿Qué es la visión de una empresa?", options: ["El balance general de activos", "A dónde aspira llegar la organización a largo plazo, su imagen futura", "El organigrama detallado", "El manual de procedimientos"], correct: 1 },
    { q: "¿Qué es la gestión de calidad total (TQM)?", options: ["Un enfoque organizacional centrado en la mejora continua de la calidad en todos los procesos", "Inspeccionar solo el 10% de la producción final", "Comprar materias primas de marca costosa", "Certificar únicamente las oficinas administrativas"], correct: 0 }
];

let selectedQuestions = [];
let currentIndex = 0;
let score = 0;

// Elementos del DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionCounter = document.getElementById('question-counter');
const scoreTracker = document.getElementById('score-tracker');
const progressBar = document.getElementById('progress-bar');
const finalScore = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);

function startQuiz() {
    selectedQuestions = [...questionBank].sort(() => 0.5 - Math.random()).slice(0, 12);
    currentIndex = 0;
    score = 0;
    
    startScreen.classList.remove('active');
    resultsScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    loadQuestion();
}

function loadQuestion() {
    resetState();
    if (currentIndex >= selectedQuestions.length) {
        showResults();
        return;
    }

    const currentQ = selectedQuestions[currentIndex];
    questionCounter.textContent = `Pregunta ${currentIndex + 1} de ${selectedQuestions.length}`;
    scoreTracker.textContent = `Puntos: ${score}`;
    progressBar.style.width = `${((currentIndex) / selectedQuestions.length) * 100}%`;
    questionText.textContent = currentQ.q;

    let optionsWithIndices = currentQ.options.map((opt, idx) => ({ text: opt, originalIndex: idx }));
    optionsWithIndices.sort(() => 0.5 - Math.random());

    optionsWithIndices.forEach(optObj => {
        const button = document.createElement('button');
        button.textContent = optObj.text;
        button.classList.add('option-btn');
        button.dataset.correct = (optObj.originalIndex === currentQ.correct);
        button.addEventListener('click', selectOption);
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectOption(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';

    Array.from(optionsContainer.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        } else if (button === selectedBtn) {
            button.classList.add('incorrect');
        }
    });

    if (isCorrect) {
        score += 1;
        scoreTracker.textContent = `Puntos: ${score}`;
    }

    setTimeout(() => {
        currentIndex++;
        loadQuestion();
    }, 1100);
}

function showResults() {
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    finalScore.textContent = `${score} / ${selectedQuestions.length}`;

    let percentage = (score / selectedQuestions.length) * 100;
    let msg = "";
    if (percentage === 100) {
        msg = "¡Perfecto! Eres una verdadera eminencia en la Administración de Empresas. Leopoldo te aprueba. 🌟";
    } else if (percentage >= 75) {
        msg = "¡Excelente trabajo! leopoldo . ¡Mucho talento por aquí! 💼✨";
    } else if (percentage >= 50) {
        msg = "¡Muy bien! Tienes buen tino, con un poco menos de nervios y saber improvisar mas no repites carrera. 📈";
    } else {
        msg = "Y Asi dices que sabes, na leopoldo no aprueba. 😉💕";
    }
    resultMessage.textContent = msg;
}
