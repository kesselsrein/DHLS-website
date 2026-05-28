/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { reportChapters } from './data/reportText';
import DomainsModal from './components/DomainsModal';
import RadarDashboard from './components/RadarDashboard';
import {
  BookOpen, ExternalLink, Search,
  Layers, Activity, Coins, Award, FileText, Grid3x3, FileSearch
} from 'lucide-react';

export default function App() {
  const [activeChapter, setActiveChapter] = useState('cover');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDomainsModal, setShowDomainsModal] = useState(false);

  const filteredChapters = reportChapters.map(ch => ({
    ...ch,
    matchingSections: ch.sections.filter(s => {
      const q = searchQuery.toLowerCase();
      return s.title.toLowerCase().includes(q) || s.content.some(p => p.toLowerCase().includes(q)) || s.bullets?.some(b => b.toLowerCase().includes(q));
    })
  })).filter(ch => ch.matchingSections.length > 0 || ch.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#1A1A1A] pb-20">

      {showDomainsModal && <DomainsModal onClose={() => setShowDomainsModal(false)} />}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#F9F7F2]/95 border-b-2 border-[#1A1A1A] px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 font-sans">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6321] animate-pulse"></span>
            <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 bg-[#FF6321]/15 text-[#FF6321] border border-[#FF6321]/35 font-bold">
              Interactief Scriptieverslag
            </span>
            <span className="text-xs font-medium text-[#1A1A1A]/60">Rein Kessels · HAN 2026</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <button
              onClick={() => setShowDomainsModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-[#1A1A1A] text-white border-2 border-[#1A1A1A] hover:bg-[#FF6321] hover:border-[#FF6321] transition-colors cursor-pointer rounded-none"
            >
              <Grid3x3 className="w-3.5 h-3.5" /> 10 Domeinen
            </button>
            <a
              href="https://gezondmeten.org/wp-content/uploads/CPHQ-2.0-Brede-gezondheid_Position-paper-ZonMW.pdf"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-white border-2 border-[#1A1A1A] hover:bg-[#FF6321] hover:border-[#FF6321] hover:text-white transition-colors rounded-none"
            >
              <FileSearch className="w-3.5 h-3.5" /> CPHQ 2.0
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 gap-8">

        {/* Hero */}
        <section className="bg-white border-2 border-[#1A1A1A] p-6 md:p-8 shadow-[4px_4px_0px_#1A1A1A] relative" id="hero-section">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-[#1A1A1A] pb-4 mb-4 gap-4">
            <div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                Project:<br />Zelfredzaamheid
              </h1>
              <p className="mt-2 text-xs md:text-sm font-medium italic opacity-70">
                Herontwerp van het zelfredzaamheidsmeetinstrument voor Stichting De Harde Leerschool
              </p>
            </div>
            <div className="text-left md:text-right">
              <div className="text-[10px] font-black uppercase tracking-widest bg-[#1A1A1A] text-white px-2.5 py-1 mb-2 inline-block">
                Afstudeerstage 2026
              </div>
              <p className="text-xs font-mono opacity-70">
                Student: Kessels Rein<br />
                Begeleider: Arnoud van de Ven<br />
                Opdrachtgever: Wouter Borghs
              </p>
            </div>
          </div>
          <p className="text-xs md:text-sm leading-relaxed max-w-3xl opacity-80">
            Een digitaal, laagdrempelig en gevalideerd meetconcept ter vervanging van de traditionele ZRM voor{' '}
            <strong>Stichting De Harde Leerschool (DHLS)</strong>, inclusief een geïntegreerd SROI-kostenbesparingsmodel.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 border-t border-[#1A1A1A]/10 mt-4 text-xs font-semibold opacity-70">
            <span className="flex items-center gap-1.5"><FileText className="w-4 h-4" /> Auteur: Rein Kessels</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4" /> HAN University of Applied Sciences</span>
          </div>
        </section>

        {/* Live tools callout */}
        <section className="border-2 border-[#1A1A1A] bg-[#1A1A1A] text-white p-8 shadow-[4px_4px_0px_#1A1A1A] md:p-10" id="live-tools-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="flex flex-col justify-between gap-4 pb-6 md:pb-0 md:pr-8">
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#FF6321] text-black font-black flex items-center justify-center text-sm">1</span>
                  Het Meetinstrument
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">De invul-tool voor cliënten en zorgverleners. Digitale vragenlijst op B1-niveau, mobielvriendelijk en stap-voor-stap.</p>
              </div>
              <a href="https://kesselsrein.github.io/zelfredzaamheid-meetinstrument/vragenlijst/invul-tool/index.html" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold py-3 px-6 hover:bg-[#FF6321] transition-colors uppercase text-xs tracking-widest border-2 border-white self-start cursor-pointer rounded-none">
                Start Vragenlijst <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div className="flex flex-col justify-between gap-4 pt-6 md:pt-0 md:pl-8">
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-blue-400 text-black font-black flex items-center justify-center text-sm">2</span>
                  Analyse Tool
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">Verwerk resultaten tot bruikbare grafieken en data-analyses voor het zorgdossier. Exporteerbaar naar PDF.</p>
              </div>
              <a href="https://kesselsrein.github.io/zelfredzaamheid-meetinstrument/vragenlijst/analyse/index.html" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold py-3 px-6 hover:bg-blue-400 hover:border-blue-400 hover:text-black transition-colors uppercase text-xs tracking-widest self-start cursor-pointer rounded-none">
                Open Analyse Tool <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4" id="metrics-grid">
          {[
            { icon: BookOpen, color: 'bg-[#FF6321]/10 text-[#FF6321]', label: 'Gevalideerd Model', value: 'CPHQ 2.0 Basis' },
            { icon: Coins, color: 'bg-emerald-500/10 text-emerald-600', label: 'SROI-Model', value: 'Maatschappelijke Baten' },
            { icon: Layers, color: 'bg-yellow-500/10 text-amber-600', label: 'Domeinstructuur', value: '10 Leefgebieden' },
            { icon: Activity, color: 'bg-purple-500/10 text-purple-600', label: 'Meetfrequentie', value: 'T0 t/m T3' },
          ].map(({ icon: Icon, color, label, value }) => (
            <div key={label} className="bg-white border-2 border-[#1A1A1A] shadow-[2.5px_2.5px_0px_#1A1A1A] p-4 flex items-center gap-4">
              <div className={`w-10 h-10 flex items-center justify-center shrink-0 ${color} border border-current/20`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-mono tracking-wider opacity-50">{label}</p>
                <h4 className="text-sm font-bold mt-0.5">{value}</h4>
              </div>
            </div>
          ))}
        </section>

        {/* Main 2-col workspace */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">

          {/* LEFT: Report reader */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative">
              <input type="text" placeholder="Zoek in het rapport (bijv. CPHQ, schulden, rugby)…" value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-xs bg-white border-2 border-[#1A1A1A] focus:outline-none focus:border-[#FF6321] shadow-[2px_2px_0px_#1A1A1A]" />
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#1A1A1A]/40" />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2.5 text-[10px] bg-[#1A1A1A]/10 px-1.5 py-1 text-[#1A1A1A]/60 hover:bg-[#1A1A1A]/20 cursor-pointer">Wis</button>
              )}
            </div>

            {!searchQuery && (
              <div className="flex flex-wrap gap-2 pb-1">
                {reportChapters.map(ch => (
                  <button key={ch.id} onClick={() => setActiveChapter(ch.id)}
                    className={`px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer border ${activeChapter === ch.id ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white border-[#1A1A1A]/30 text-[#1A1A1A]/60 hover:border-[#1A1A1A]'}`}>
                    {ch.title.split('—')[0].trim()}
                  </button>
                ))}
              </div>
            )}

            <div className="bg-white border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] p-6 flex flex-col gap-6 overflow-y-auto max-h-[640px]" id="report-chapters-container">
              {searchQuery ? (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono uppercase tracking-wider opacity-50 font-bold">Resultaten voor "{searchQuery}"</h3>
                    <span className="text-[10px] bg-[#FF6321]/20 text-[#FF6321] px-2 py-0.5 font-bold border border-[#FF6321]/30">
                      {filteredChapters.flatMap(c => c.matchingSections).length} gevonden
                    </span>
                  </div>
                  {filteredChapters.length === 0
                    ? <p className="text-xs opacity-50 text-center py-8">Niets gevonden. Probeer een andere zoekterm.</p>
                    : filteredChapters.map(ch => (
                      <div key={ch.id} className="flex flex-col gap-4 pb-4 border-b border-dashed border-[#1A1A1A]/10 last:border-0" id={`search-result-ch-${ch.id}`}>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6321]">{ch.title}</span>
                        {ch.matchingSections.map(sec => (
                          <div key={sec.id} className="flex flex-col gap-2" id={`search-result-sec-${sec.id}`}>
                            <h4 className="text-sm font-bold">{sec.title}</h4>
                            {sec.content.map((p, i) => (
                              <p key={i} className="text-xs opacity-70 leading-relaxed pl-3 border-l-2 border-[#FF6321]">{p}</p>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))
                  }
                </div>
              ) : (
                reportChapters.filter(ch => ch.id === activeChapter).map(chapter => (
                  <div key={chapter.id} className="flex flex-col gap-6" id={`chapter-view-${chapter.id}`}>
                    <div>
                      <span className="text-[10px] font-mono tracking-wider uppercase opacity-40 font-bold block mb-1">{chapter.subTitle ?? 'Projectrapportage'}</span>
                      <h2 className="text-xl md:text-2xl font-black tracking-tight">{chapter.title}</h2>
                    </div>
                    {chapter.sections.map(section => (
                      <div key={section.id} className="flex flex-col gap-3 border-t border-[#1A1A1A]/10 pt-4 first:border-t-0 first:pt-0" id={`sec-${section.id}`}>
                        <h3 className="text-sm font-bold text-[#1A1A1A] border-l-2 border-[#FF6321] pl-3">{section.title}</h3>
                        {section.content.map((p, i) => (
                          <p key={i} className="text-xs leading-relaxed opacity-80">{p}</p>
                        ))}
                        {section.bullets && (
                          <ul className="list-disc list-inside flex flex-col gap-1.5 mt-1 text-xs opacity-60 pl-2">
                            {section.bullets.map((b, i) => <li key={i} className="leading-relaxed">{b}</li>)}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
            <p className="text-[10px] text-center italic opacity-45">Gebruik de tabjes of de zoekfunctie om door de rapportinhoud te navigeren.</p>
          </div>

          {/* RIGHT: Analyse Dashboard */}
          <div className="lg:col-span-7" id="radar-dashboard-section">
            <RadarDashboard />
          </div>
        </section>
      </main>
    </div>
  );
}
