/**
 * Modal y Formato del Documento de Entrega (Word / PDF)
 * Cumple con el Numeral 8 y Forma de Entrega del documento guía de UNIMINUTO
 */
import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  FileText, 
  ExternalLink, 
  GraduationCap, 
  Download 
} from 'lucide-react';

interface DeliveryDocProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  studentEmail: string;
  teacherName: string;
  courseName: string;
  deliveryDate: string;
}

export const DeliveryDocModal: React.FC<DeliveryDocProps> = ({
  isOpen,
  onClose,
  studentName,
  studentEmail,
  teacherName,
  courseName,
  deliveryDate
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href;
  const colabUrl = "https://colab.research.google.com/drive/1cQn4gzZ0Hye_gPFLjZJDMUL02_Zy23ic?usp=sharing";

  // Formato de nombre de archivo solicitado en la guía:
  // primerapellido_primernombre_nombredelaactividad
  const suggestedFileName = "lozano_hernandario_portafoliodeevidencias.pdf";

  const handlePrint = () => {
    window.print();
  };

  const handleCopyWordText = () => {
    const text = `CORPORACIÓN UNIVERSITARIA MINUTO DE DIOS - UNIMINUTO
VICERRECTORÍA GENERAL ACADÉMICA
FACULTAD DE INGENIERÍA
PROGRAMA: FUNDAMENTOS PARA IA

============================================================
TÍTULO DEL TRABAJO:
Portafolio de Evidencias: Análisis Inferencial de Datos
Evaluación de Hipótesis y Validación de Supuestos en el Boston Housing Dataset

DATOS DE IDENTIFICACIÓN:
• Nombre completo del estudiante: ${studentName}
• Correo institucional: ${studentEmail}
• Nombre del curso: ${courseName}
• Número de la semana: Semana 6 / Actividad 4
• Nombre del docente tutor: ${teacherName}
• Fecha de entrega: ${deliveryDate}

============================================================
PÁGINA 2: ENLACES DE EVIDENCIA Y ACCESO PÚBLICO

1. ENLACE AL PORTAFOLIO DIGITAL (GOOGLE SITES / WEB INTERACTIVA):
${currentUrl}

2. ENLACE AL NOTEBOOK DE GOOGLE COLAB REPRODUCIBLE (CÓDIGO Y SALIDAS VISIBLES):
${colabUrl}

DESCRIPCIÓN DE LA EVIDENCIA ENTREGADA:
El presente portafolio compila de forma rigurosa:
• Carga y verificación del Boston Housing Dataset (506 registros, 0 nulos).
• Pregunta investigable e hipótesis estadísticas formales (H0 vs H1).
• Identificación y clasificación de variables (MEDV continua, CHAS dicotómica, covariables RM, LSTAT, CRIM).
• Caracterización muestral (n=506; Grupo CHAS=0: n0=471, Grupo CHAS=1: n1=35).
• Estadística descriptiva completa y visualizaciones científicas (Histograma KDE, Boxplots comparativos, Scatter plots con ajuste OLS y matriz de correlación).
• Validación de supuestos inferenciales (Prueba de Shapiro-Wilk global y por grupos, Q-Q Plot, Test de Levene para homogeneidad de varianzas).
• Selección y justificación metodológica de la prueba no paramétrica (Mann-Whitney U).
• Resultados inferenciales, reporte de estadísticos, p-value (p = 6.45e-5) y decisión formal sobre H0 (se rechaza H0 a favor de H1).
• Conclusiones argumentadas sobre supuestos, limitaciones estructurales del dataset (censura en 50k, desbalance, sesgos históricos) y mejoras futuras.
• Referencias bibliográficas en formato APA 7ma edición.
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Ficha Académica de Entrega (Word / PDF)
              </h3>
              <p className="text-[11px] text-slate-500">
                Portada institucional y enlaces de acceso público para entrega
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cuerpo del documento tipo Hoja de Word */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 bg-slate-50/50">
          {/* Hoja 1: Portada Institucional */}
          <div className="bg-white p-8 rounded-xl shadow-xs border border-slate-200 space-y-6">
            <div className="text-center space-y-1 border-b border-slate-100 pb-5">
              <div className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                CORPORACIÓN UNIVERSITARIA MINUTO DE DIOS - UNIMINUTO
              </div>
              <div className="text-[11px] text-slate-500">
                Facultad de Ingeniería · Vicerrectoría General Académica
              </div>
              <div className="text-xs font-semibold text-slate-700">
                Curso: {courseName}
              </div>
            </div>

            <div className="text-center py-4 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
                Portafolio de Evidencias
              </span>
              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                Análisis Inferencial de Datos & Visualización:<br />
                Evaluación de Hipótesis en el Boston Housing Dataset
              </h2>
            </div>

            <div className="max-w-md mx-auto bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Estudiante:</span>
                <span className="font-bold text-slate-900">{studentName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Correo Electrónico:</span>
                <span className="font-mono text-slate-700">{studentEmail}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Asignatura:</span>
                <span className="text-slate-800 font-medium">{courseName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Periodo Académico:</span>
                <span className="text-slate-800 font-medium">2026-2</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Docente Tutor:</span>
                <span className="text-slate-800 font-medium">{teacherName}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Fecha de Entrega:</span>
                <span className="text-slate-800 font-medium">{deliveryDate}</span>
              </div>
            </div>
          </div>

          {/* Hoja 2: Enlaces de Acceso Público y Ficha Metodológica */}
          <div className="bg-white p-8 rounded-xl shadow-xs border border-slate-200 space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">
                Página 2 · Enlaces Públicos de Acceso a Evidencias
              </span>
              <p className="text-[11px] text-slate-500">
                Acceso público habilitado para consulta del sitio web y cuaderno de análisis
              </p>
            </div>

            {/* Enlace 1: Portafolio */}
            <div className="p-4 rounded-lg border border-blue-200 bg-blue-50/40 space-y-2">
              <span className="text-xs font-bold text-blue-900 block">
                1. Enlace al Portafolio Web Interactivo:
              </span>
              <div className="bg-white px-3 py-2 rounded border border-blue-200 font-mono text-xs text-blue-700 break-all select-all">
                {currentUrl}
              </div>
              <span className="text-[11px] text-slate-500 block">
                Permisos: Acceso público de visualización habilitado. Contiene todas las secciones del estudio y visualizaciones interactivas.
              </span>
            </div>

            {/* Enlace 2: Google Colab */}
            <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50/40 space-y-2">
              <span className="text-xs font-bold text-emerald-900 block">
                2. Enlace al Notebook de Google Colab (Código Reproducible y Salidas Visibles):
              </span>
              <div className="bg-white px-3 py-2 rounded border border-emerald-200 font-mono text-xs text-emerald-800 break-all select-all">
                {colabUrl}
              </div>
              <span className="text-[11px] text-slate-500 block">
                Incluye la ejecución completa de los 9 pasos del anexo con NumPy, Pandas, Matplotlib, Seaborn y SciPy.
              </span>
            </div>

            {/* Nombre de archivo sugerido para subir a la plataforma */}
            <div className="p-3 bg-slate-50 rounded border border-slate-200 text-slate-600 text-[11px]">
              <strong>Nombre requerido para el archivo a entregar:</strong>
              <div className="font-mono text-blue-700 mt-1 font-semibold">
                {suggestedFileName}
              </div>
            </div>
          </div>
        </div>

        {/* Barra de Acciones del Modal */}
        <div className="flex flex-wrap items-center justify-between p-4 px-6 border-t border-slate-200 bg-white">
          <div className="text-[11px] text-slate-500">
            Copie el texto para pegar en Word o imprima directamente como PDF.
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyWordText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-lg transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado!' : 'Copiar Texto para Word'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Guardar PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
