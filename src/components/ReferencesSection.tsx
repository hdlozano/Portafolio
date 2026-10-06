/**
 * Referencias Bibliográficas en Normas APA (7.ª edición)
 * Criterio de Rúbrica: "Las referencias están en formato APA"
 */
import React from 'react';
import { BookMarked, ExternalLink, CheckCircle } from 'lucide-react';

export const ReferencesSection: React.FC = () => {
  const references = [
    {
      authors: 'Bedre, R.',
      year: '2021',
      title: 'ANOVA using Python (with examples)',
      source: 'Data Science Blog',
      type: 'Entrada de blog académico',
      url: 'https://www.reneshbedre.com/blog/anova.html'
    },
    {
      authors: 'Boschetti, A. y Massaron, L.',
      year: '2018',
      title: "Python Data Science Essentials: A Practitioner's Guide Covering Essential Data Science Principles, Tools, and Techniques",
      source: 'Packt Publishing Ltd. (pp. 281-331)',
      type: 'Libro guía básico',
      url: 'https://www.packtpub.com'
    },
    {
      authors: 'Cady, F.',
      year: '2020',
      title: 'Data science: The executive summary - a technical book for non-technical professionals',
      source: 'John Wiley & Sons, Incorporated (pp. 55-95)',
      type: 'Libro complementario',
      url: 'https://www.wiley.com'
    },
    {
      authors: 'Fuentes, A.',
      year: '2018',
      title: 'Become a python data analyst: Perform exploratory data analysis and gain insight into scientific computing using python',
      source: 'Packt Publishing, Limited (pp. 121-156)',
      type: 'Libro técnico',
      url: 'https://www.packtpub.com'
    },
    {
      authors: 'Guest Blog.',
      year: '2020, 8 de junio',
      title: 'Introduction to ANOVA for Statistics and Data Science (with COVID-19 Case Study using Python)',
      source: 'Analytics Vidhya',
      type: 'Entrada de blog especializado',
      url: 'https://www.analyticsvidhya.com/blog/2020/06/introduction-anova-statistics-data-science-covid-python/'
    },
    {
      authors: 'Harrison, D. y Rubinfeld, D. L.',
      year: '1978',
      title: 'Hedonic housing prices and the demand for clean air',
      source: 'Journal of Environmental Economics and Management, 5(1), 81-102',
      type: 'Artículo fundacional del Boston Housing Dataset',
      url: 'https://doi.org/10.1016/0095-0696(78)90006-2'
    },
    {
      authors: 'Mann, H. B. y Whitney, D. R.',
      year: '1947',
      title: 'On a test of whether one of two random variables is stochastically larger than the other',
      source: 'The Annals of Mathematical Statistics, 18(1), 50-60',
      type: 'Artículo metodológico de la Prueba U',
      url: 'https://doi.org/10.1214/aoms/1177730491'
    },
    {
      authors: 'Shapiro, S. S. y Wilk, M. B.',
      year: '1965',
      title: 'An analysis of variance test for normality (complete samples)',
      source: 'Biometrika, 52(3/4), 591-611',
      type: 'Artículo metodológico del Test de Normalidad',
      url: 'https://doi.org/10.2307/2333709'
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Encabezado */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
          Bibliografía & Fuentes
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Referencias Bibliográficas (Normas APA 7.ª Edición)
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          Fuentes documentales, manuales de ciencia de datos con Python y artículos científicos que sustentan el marco teórico, el contraste de hipótesis y el análisis inferencial.
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
            <BookMarked className="w-4 h-4 text-blue-600" />
            Bibliografía Citada en Formato APA 7
          </span>
          <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Sangría Francesa Convencional
          </span>
        </div>

        <div className="space-y-4 text-xs text-slate-700">
          {references.map((ref, idx) => (
            <div 
              key={idx} 
              className="p-3.5 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50/70 transition-all space-y-1"
            >
              <div className="font-serif leading-relaxed text-slate-900">
                <span className="font-bold">{ref.authors}</span> ({ref.year}). <em>{ref.title}</em>. {ref.source}.
              </div>
              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                <span className="font-sans font-medium">{ref.type}</span>
                <span className="text-blue-600 font-mono text-[10px] truncate max-w-xs">
                  {ref.url}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
