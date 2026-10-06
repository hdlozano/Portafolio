/**
 * Portafolio de Evidencias - Análisis Inferencial de Datos | UNIMINUTO
 * Asignatura: Fundamentos para IA
 * Dataset: Boston Housing Dataset
 * Autor: Herdarioloz22 (herdarioloz22@gmail.com)
 */
import React, { useState } from 'react';
import { Header } from './components/Header';
import { PortadaSection } from './components/PortadaSection';
import { TableOfContents } from './components/TableOfContents';
import { IntroSection } from './components/IntroSection';
import { ProblemHypothesisSection } from './components/ProblemHypothesisSection';
import { DescriptiveSection } from './components/DescriptiveSection';
import { AssumptionsSection } from './components/AssumptionsSection';
import { InferentialSection } from './components/InferentialSection';
import { ConclusionsSection } from './components/ConclusionsSection';
import { ReferencesSection } from './components/ReferencesSection';
import { ColabNotebookSection } from './components/ColabNotebookSection';
import { DeliveryDocModal } from './components/DeliveryDocModal';
import { InteractiveInferentialLab } from './components/InteractiveInferentialLab';
import { 
  generateJupyterNotebookJson 
} from './data/bostonHousingData';
import { 
  FileText, 
  ExternalLink, 
  Download, 
  BookMarked, 
  Code2, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('portada');
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState<boolean>(false);

  // Datos del estudiante y entrega académica (editables para el usuario)
  const [studentName, setStudentName] = useState<string>('HERNAN DARIO LOZANO CAMARGO');
  const [studentEmail] = useState<string>('herdarioloz22@gmail.com');
  const [teacherName, setTeacherName] = useState<string>('CESAR ALFONSO BOLADO SILVA');
  const [courseName] = useState<string>('Fundamentos para IA');
  const [deliveryDate] = useState<string>('Octubre de 2026');

  const handleDownloadNotebook = () => {
    const jsonStr = generateJupyterNotebookJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'uniminuto_boston_housing_analisis_inferencial.ipynb';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navigation Bar adhering to Universal Frontend Design Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDeliveryDoc={() => setIsDeliveryModalOpen(true)}
        onDownloadNotebook={handleDownloadNotebook}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Renderizado de la Sección Activa */}
        {activeTab === 'portada' && (
          <div className="space-y-8">
            <PortadaSection
              onNavigate={(tab) => setActiveTab(tab)}
              onOpenDeliveryDoc={() => setIsDeliveryModalOpen(true)}
              studentName={studentName}
              setStudentName={setStudentName}
              studentEmail={studentEmail}
              teacherName={teacherName}
              setTeacherName={setTeacherName}
              courseName={courseName}
              deliveryDate={deliveryDate}
            />

            {/* Tabla de contenido interactiva */}
            <TableOfContents
              activeTab={activeTab}
              onSelectTab={(tab) => setActiveTab(tab)}
              onOpenDeliveryDoc={() => setIsDeliveryModalOpen(true)}
            />

            {/* Simulador Inferencial destacado en la portada */}
            <InteractiveInferentialLab />
          </div>
        )}

        {activeTab === 'intro' && (
          <div className="space-y-8">
            <IntroSection onNext={() => setActiveTab('problema')} />
          </div>
        )}

        {activeTab === 'problema' && (
          <div className="space-y-8">
            <ProblemHypothesisSection onNext={() => setActiveTab('descriptiva')} />
          </div>
        )}

        {activeTab === 'descriptiva' && (
          <div className="space-y-8">
            <DescriptiveSection onNext={() => setActiveTab('supuestos')} />
          </div>
        )}

        {activeTab === 'supuestos' && (
          <div className="space-y-8">
            <AssumptionsSection onNext={() => setActiveTab('inferencia')} />
          </div>
        )}

        {activeTab === 'inferencia' && (
          <div className="space-y-8">
            <InferentialSection onNext={() => setActiveTab('conclusiones')} />
            <InteractiveInferentialLab />
          </div>
        )}

        {activeTab === 'conclusiones' && (
          <div className="space-y-8">
            <ConclusionsSection
              onNavigateToColab={() => setActiveTab('colab')}
              onNavigateToRefs={() => setActiveTab('referencias')}
            />
          </div>
        )}

        {activeTab === 'referencias' && (
          <div className="space-y-8">
            <ReferencesSection />
          </div>
        )}

        {activeTab === 'colab' && (
          <div className="space-y-8">
            <ColabNotebookSection />
          </div>
        )}
      </main>

      {/* Footer académico y de acreditación */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
              U
            </div>
            <div>
              <span className="font-bold text-slate-800">UNIMINUTO · Corporación Universitaria Minuto de Dios</span>
              <div className="text-[11px] text-slate-500">
                Portafolio de Evidencias · Asignatura: Fundamentos para IA · Boston Housing Dataset
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setActiveTab('referencias')}
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              Referencias APA
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveTab('colab')}
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              Google Colab
            </button>
            <span>·</span>
            <button
              onClick={() => setIsDeliveryModalOpen(true)}
              className="text-blue-600 font-semibold hover:underline"
            >
              Ficha de Entrega (Word / PDF)
            </button>
          </div>
        </div>
      </footer>

      {/* Modal del Documento de Entrega formal para Word / PDF */}
      <DeliveryDocModal
        isOpen={isDeliveryModalOpen}
        onClose={() => setIsDeliveryModalOpen(false)}
        studentName={studentName}
        studentEmail={studentEmail}
        teacherName={teacherName}
        courseName={courseName}
        deliveryDate={deliveryDate}
      />
    </div>
  );
}
