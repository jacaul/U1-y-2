# EólicaMaster: Planificación del Montaje de Parques Eólicos 🌬️⚡

**Web App Educativa Gamificada de 45 minutos** diseñada específicamente para el **Grado Superior en Energías Renovables y Agua** del **CIFP Aguas Nuevas** (Albacete, Castilla-La Mancha).

Esta aplicación interactiva gamifica los contenidos de la **Unidad 2 ("Planificación del montaje de parques eólicos")** e integra el repaso riguroso de la **Unidad 1 ("Componentes del aerogenerador")** del manual de referencia técnica:
- **Libro:** *Gestión del montaje de parques eólicos*
- **Editorial:** Ediciones Paraninfo
- **Autor:** Luis Romero Lozano
- **ISBN:** 978-84-283-9562-5

---

## 🎯 Estructura de los 4 Retos Gamificados

La misión tiene una duración máxima de **45 minutos** con cronómetro general visible, reloj parcial por reto, gestión de **Presupuesto (1.000.000 € iniciales)** y **3 Vidas de Seguridad Laboral (PRL)**:

1. **RETO 1 (8 min): Chequeo Técnico y Repaso U1**
   - Inspección interactiva de 8 componentes esenciales en corte esquemático vectorial: Góndola, buje con sistema Pitch, palas aerodinámicas, multiplicadora planetaria/helicoidal con brazos de reacción, freno de disco en eje rápido, generador eléctrico (DFIG vs síncrono multipolo de imanes permanentes), celdas de Media Tensión (20-30 kV) con aislamiento SF6 y zapata con virola embebida.
   - 10 preguntas técnicas rigurosas con cálculos: física atmosférica, efecto Coriolis, densidad del aire ($\rho$) corregida por cota barométrica en Albacete (~700 m), dependencia cúbica de la potencia eólica ($P \propto v^3$), deducción y límite de Betz ($C_p = 16/27 \approx 59,3\%$), velocidades características (arranque, nominal y corte), y pararrayos según IEC 61400-24.

2. **RETO 2 (12 min): Clasificación Documental del Proyecto (U2)**
   - Clasificación contractual de 16 documentos y anejos según la norma UNE 157001 y las especificaciones de Paraninfo:
     - **Doc nº 1: Memoria y Anejos** (Anejo 1 Cálculos eléctricos, Anejo 2 Estudio geotécnico, Anejo 3 Viales y plataformas, Anejo 4 Cimentación torres, Anejo 5 E.I.A., Anejo 6 Seguridad y Salud RD 1627/1997, Anejo 14 Control de calidad, Anejo 15 Plan de obras).
     - **Doc nº 2: Planos** (7 Grupos normalizados: Generales, Subestación, Edificio de Control, Electromecánicos, Estructuras, Aparellaje, Control y Unifilares).
     - **Doc nº 3: Pliego de Prescripciones Técnicas Particulares** (Áridos, zahorras al 95% Proctor modificado, hormigón $f_{ck}$, atribuciones facultativas, libro de órdenes).
     - **Doc nº 4: Presupuesto** (Mediciones, Cuadros de precios 1 y 2, PEM, Gastos Generales 13%, Beneficio Industrial 6% e IVA 21%).
   - **Fase 2 de Auditoría Presupuestaria:** Cálculo analítico en tiempo real del Presupuesto de Ejecución por Contrata (PEC) a partir del PEM con márgenes e impuestos reglamentarios.

3. **RETO 3 (12 min): Interpretación de Planos y Layout (U2)**
   - Visor vectorial interactivo CAD / SVG con 4 planos clave del texto y 8 hotspots técnicos:
     - **Plano 2.3:** Plataforma de montaje de aerogeneradores (grúa principal 50 m compactada a 5 kg/cm² = 500 kPa, corredor de montaje de brazo 70x8 m, vial de acceso de 5 m con $R=20\text{ m}$).
     - **Plano 2.5:** Secciones tipo de zanja de MT (0,64 m x 0,88 m, cama de arena de río de 10 cm + cobertura de 185 mm, placas de PVC/ladrillo, cinta amarilla de advertencia, cable de cobre desnudo de tierra en fondo).
     - **Plano 2.33:** Esquema unifilar de subestación 132/20 kV, aparamenta en gas SF6, interruptor 52-L, seccionador 89-TL con PAT y códigos de relés de protección ANSI (50/51 sobreintensidad, 87 diferencial, 64N neutro, 21 distancia).
     - **Detalle de Cimentación:** Virola cilíndrica de acero embebida con doble hilera de pernos pretensados de alta resistencia (calidad 10.9) y red equipotencial de puesta a tierra inferior a 10 $\Omega$.

4. **RETO 4 (13 min): Planificación del Montaje y Diagrama de Gantt (U2)**
   - Puzzle interactivo de secuenciación temporal y ruta crítica con 12 tareas a lo largo de 12 meses de obra.
   - El alumno debe ordenar las actividades respetando las precedencias físicas y reglamentarias (obra civil previa a electromecánica, curado de cimentación de 28 días previo a izado de torre, pruebas en blanco y 5 Reglas de Oro previas a energización).
   - **Fase 2: Resolución de Incidencias Críticas en Obra:** Toma de decisiones ante situaciones de riesgo real (rachas de viento superiores a 9 m/s en izado de palas, escariado normativo de pernos desalineados, y protocolo estricto de las 5 Reglas de Oro según RD 614/2001).

---

## 🧮 Calculadora Técnica Eólica / Workbench Integrado
Incluye un banco de trabajo interactivo con:
- **Simulador dinámico de potencia y Límite de Betz:** Ajuste de radio de pala ($R$), velocidad del viento ($v$), altitud/densidad ($\rho$) y coeficiente aerodinámico ($C_p$).
- **Estimador de altura de buje:** Cálculo de gradiente eólico por cizalladura según la ley potencial de Hellmann ($v_2 = v_1 \cdot (z_2/z_1)^\alpha$) en terrenos manchegos ($\alpha \approx 0,14$).
- **Calculadora de Presupuesto PEC:** Desglose automático de PEM, Gastos Generales (13%), Beneficio Industrial (6%) e IVA (21%).
- **Ejercicios numéricos de ingeniería:** 4 problemas prácticos con validación y puntuación adicional.

---

## 🏆 Evaluación, Logros e Informe de Misión

- **8 Medallas Desbloqueables** correspondientes a competencias profesionales.
- **Informe de Misión Final:**
  - Porcentaje de maestría técnica en **U1** y **U2**.
  - Historial pedagógico de fallos cometidos con justificación técnica y cita de página del libro de Paraninfo.
  - **Certificado Oficial de Montaje Eólico** descargable / imprimible con el sello institucional del **CIFP Aguas Nuevas**.
  - **Exportación en CSV y JSON** para evaluación docente y registro de notas en aula virtual.
- **Vademécum Técnico Integrado:** Modal de consulta rápida con resúmenes, fórmulas, esquemas y normativas aplicables (RD 1627/1997, RD 614/2001, RD 337/2014 RAT, REBT).

---

## 🛠️ Tecnologías Empleadas

- **Frontend:** React 19 + TypeScript + Vite
- **Estilos:** Tailwind CSS con estética industrial / SCADA (azul eólico, verde sostenibilidad, gris acero y acentos amarillos de seguridad)
- **Animaciones e Interactividad:** Lucide Icons, Canvas Confetti
- **Audio:** Sintetizador Web Audio API autónomo (sin dependencias de archivos externos de audio)
- **Persistencia:** LocalStorage cliente (guarda automáticamente el avance del alumno/a)

---

## 🚀 Instalación y Puesta en Marcha

Para clonar y ejecutar este proyecto en local o desplegarlo en GitHub Pages / Vercel:

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/eolicamaster-aguasnuevas.git

# 2. Entrar al directorio
cd eolicamaster-aguasnuevas

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Compilar para producción
npm run build
```

---

## 🏫 Centro Educativo
**CIFP Aguas Nuevas**  
Centro Integrado de Formación Profesional  
Familia Profesional: Energía y Agua  
Ciclo: Técnico Superior en Energías Renovables  
Albacete, Castilla-La Mancha (España)
