/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { X, Award, AlertCircle, Sparkles, AlertTriangle, Info, HelpCircle } from 'lucide-react';

// ─── DATA ──────────────────────────────────────────────────────────────────

const DOMAINS = [
  'Geestelijke gezondheid',
  'Lichamelijke gezondheid',
  'Sociaal netwerk',
  'Maatschappelijke participatie',
  'Financiën',
  'Huisvesting',
  'Justitie',
  'Dagbesteding',
  'Instrumentele ADL',
  'Gewoontes & gedragingen',
];

// Two-line label splits for long names
const DOMAIN_LABELS: [string, string?][] = [
  ['Geestelijke gezondheid'],
  ['Lichamelijke', 'gezondheid'],
  ['Sociaal netwerk'],
  ['Maatschappelijke', 'participatie'],
  ['Financiën'],
  ['Huisvesting'],
  ['Justitie'],
  ['Dagbesteding'],
  ['Instrumentele ADL'],
  ['Gewoontes &', 'gedragingen'],
];

// DHLS population baselines
const T0_DATA = [30, 55, 35, 20, 40, 45, 70, 25, 45, 30];
const T3_DATA = [65, 70, 65, 55, 70, 75, 90, 75, 75, 65];

const PERSONAS = [
  {
    id: 'marco',
    name: 'Marco Rossi',
    subtitle: 'De werkende student',
    info: '24 jaar · man · MBO logistiek · parttime magazijnwerk · woont bij ouders',
    color: '#F59E0B',
    t1: [75, 75, 71, 50, 100, 75, 100, 100, 88, 75],
    t0: [38, 63, 46, 25, 100, 75, 100, 100, 50, 50],
    diff: [37, 12, 25, 25, 0, 0, 0, 0, 38, 25],
    alerts: [] as number[],
  },
  {
    id: 'sarah',
    name: 'Sarah Visser',
    subtitle: 'De zorgbehoevende',
    info: '21 jaar · vrouw · werkeloos · begeleid wonen · bijstand · POH-GGZ',
    color: '#EC4899',
    t1: [50, 57, 50, 25, 40, 50, 100, 25, 63, 100],
    t0: [10, 32, 25, 0, 40, 50, 100, 50, 13, 100],
    diff: [40, 25, 25, 25, 0, 0, 0, -25, 50, 0],
    alerts: [7], // Alert on Dagbesteding due to negative change (-25%) or low score
  },
  {
    id: 'jelle',
    name: 'Jelle de Boer',
    subtitle: 'De herstarter',
    info: '26 jaar · man · justitieverleden · zelfstandig wonend · gokverslaving',
    color: '#8B5CF6',
    t1: [50, 50, 50, 25, 60, 100, 25, 100, 88, 75],
    t0: [41, 57, 25, 0, 0, 100, 0, 0, 38, 0],
    diff: [9, -7, 25, 25, 60, 0, 25, 100, 50, 75],
    alerts: [1, 6], // Alert on Lichamelijke Gezondheid (-7%)
  },
];

const STAKEHOLDERS = [
  { id: 1, name: 'DHLS / Wouter Borghs', role: 'Opdrachtgever & programmamanager', belang: 'HOOG', macht: 'HOOG', kwadrant: 'MANAGE CLOSELY', x: 82, y: 85, strategie: 'Nauw betrekken & co-creëren' },
  { id: 2, name: 'Gemeenten', role: 'Financiers · indirecte stakeholder', belang: 'GEMIDDELD', macht: 'HOOG', kwadrant: 'KEEP SATISFIED', x: 48, y: 80, strategie: 'Tevreden houden via heldere rapportage' },
  { id: 3, name: 'Deelnemers DHLS', role: 'Eindgebruikers begeleidingstraject', belang: 'HOOG', macht: 'LAAG', kwadrant: 'KEEP INFORMED', x: 78, y: 22, strategie: 'Betrekken bij validatie' },
  { id: 4, name: "Hello's", role: 'Uitvoerende coaches binnen DHLS', belang: 'GEMIDDELD', macht: 'HOOG', kwadrant: 'KEEP SATISFIED', x: 52, y: 74, strategie: 'Behoeften proactief signaleren' },
  { id: 5, name: 'Werknemers sociaal domein', role: 'Bredere beroepsgroep buiten DHLS', belang: 'HOOG', macht: 'LAAG', kwadrant: 'KEEP INFORMED', x: 72, y: 28, strategie: 'Informeren bij scope-wijzigingen' },
];

const SWOT = {
  sterktes: {
    color: 'border-2 border-[#1A1A1A] bg-white shadow-[4px_4px_0px_#22c55e] text-[#1A1A1A]',
    hdr: 'text-emerald-700 font-extrabold',
    label: 'Sterktes',
    sub: 'Intern · Positief',
    items: [
      {
        text: 'Gevalideerde basis (CPHQ 2.0) met sterke psychometrische onderbouwing',
        rationale: 'Zorgt voor wetenschappelijke betrouwbaarheid en brede erkenning door subsidiegevers en academische toetsingscommissies.'
      },
      {
        text: 'Digitaal, laagdrempelig en zelfstandig invulbaar — ook buiten programmacontext',
        rationale: 'Cruciaal voor het kosteneffectief en zelfstandig bereiken van deelnemers tijdens de follow-up (T2/T3) via smartphone.'
      },
      {
        text: 'Geïntegreerd kostenrekenmodel — financiële impact direct communiceerbaar naar gemeenten',
        rationale: 'Maakt de maatschappelijke opbrengsten (SROI) tastbaar en overtuigend voor gemeentelijke besluitvormers in euro\'s.'
      },
      {
        text: 'ZRM-aansluiting — herkenbaar voor professionals in het sociaal domein',
        rationale: 'Garandeert herkenbaarheid en naadloze overdracht van inzichten tussen coaches en externe ketenpartners.'
      },
      {
        text: 'Zelfstandig gebouwd en onderhoudbaar — geen afhankelijkheid van externe ontwikkelaars',
        rationale: 'Voorkomt vendor lock-in en bespaart structurele licentiekosten, waardoor de langetermijnexploitatie zeer goedkoop is.'
      }
    ],
  },
  zwaktes: {
    color: 'border-2 border-[#1A1A1A] bg-white shadow-[4px_4px_0px_#f97316] text-[#1A1A1A]',
    hdr: 'text-orange-600 font-extrabold',
    label: 'Zwaktes',
    sub: 'Intern · Negatief',
    items: [
      {
        text: 'DHLS-module nog niet formeel psychometrisch gevalideerd',
        rationale: 'Hoewel inhoudelijk sterk, ontbreekt nog de statistische toetsing op betrouwbaarheid (zoals interne consistentie).'
      },
      {
        text: 'Nog niet getest met de doelgroep — gebruiksvriendelijkheid en begrijpelijkheid onbekend',
        rationale: 'Zonder gebruikerstests met laaggeletterde of digitaal minder vaardige deelnemers riskeert men invulfouten.'
      },
      {
        text: 'Hello\'s-integratie ontbreekt — geen structurele inbedding in bestaand systeem',
        rationale: 'Dit vereist van coaches dubbele invoer of handmatig overschrijven, wat de dagelijkse werkdruk verhoogt.'
      }
    ],
  },
  kansen: {
    color: 'border-2 border-[#1A1A1A] bg-white shadow-[4px_4px_0px_#3b82f6] text-[#1A1A1A]',
    hdr: 'text-blue-600 font-extrabold',
    label: 'Kansen',
    sub: 'Extern · Positief',
    items: [
      {
        text: 'Verdieping maatschappelijke kostencijfers voor sterker kostenrekenmodel',
        rationale: 'Door lokale gemeentelijke tarieven of specifiekere CJG/GGD-data te integreren, wint het model aan zeggingskracht.'
      },
      {
        text: 'AI-assistent in het instrument voor begrijpelijkere vragen voor de doelgroep',
        rationale: 'Kan live verduidelijking per vraag geven op maat van taalniveau A2/B1 of de vragen voorlezen via text-to-speech.'
      },
      {
        text: 'Integratie met Hello\'s maakt dataverzameling automatisch voor coaches',
        rationale: 'Zodra de koppeling live is, worden metingen automatisch klaargezet bij intake, wat de coaches volledig ontlast.'
      },
      {
        text: 'Landelijke uitrol naar alle DHLS-locaties — vergelijkbare nationale data',
        rationale: 'Creëert een unieke landelijke benchmark-database om het succes van de Harde Leerschool-aanpak macro-economisch te staven.'
      }
    ],
  },
  bedreigingen: {
    color: 'border-2 border-[#1A1A1A] bg-white shadow-[4px_4px_0px_#ef4444] text-[#1A1A1A]',
    hdr: 'text-red-600 font-extrabold',
    label: 'Bedreigingen',
    sub: 'Extern · Negatief',
    items: [
      {
        text: 'Niet-adoptie door coaches — zonder actief gebruik geen data',
        rationale: 'Als de coaches het nut niet direct ervaren of overbelast raken, riskeren metingen onvolledig te worden ingevuld.'
      },
      {
        text: 'Lage T2/T3 respons — deelnemers buiten programmacontext moeilijk te bereiken',
        rationale: 'Deelnemers die het traject succesvol hebben afgerond zijn lastig te motiveren om maanden later nog vragen in te vullen.'
      },
      {
        text: 'Afhankelijkheid van Hello\'s voor structurele implementatie',
        rationale: 'Als een externe partner prioriteiten verlegt, kan dit de geautomatiseerde data-koppelingen vertragen.'
      }
    ],
  },
};

// ─── SVG RADAR HELPERS ─────────────────────────────────────────────────────

const SIZE = 460;
const CENTER = SIZE / 2;
const MAX_R = 155;
const LABEL_R = 195;
const N = 10;

function coords(pct: number, idx: number) {
  const angle = (idx / N) * 2 * Math.PI - Math.PI / 2;
  const r = (pct / 100) * MAX_R;
  return { x: CENTER + r * Math.cos(angle), y: CENTER + r * Math.sin(angle) };
}

function polyPoints(data: number[]) {
  return data.map((v, i) => {
    const { x, y } = coords(v, i);
    return `${x},${y}`;
  }).join(' ');
}

function anchor(idx: number) {
  const a = (idx / N) * 2 * Math.PI - Math.PI / 2;
  const cx = Math.cos(a);
  return cx > 0.1 ? 'start' : cx < -0.1 ? 'end' : 'middle';
}

// ─── TYPES ─────────────────────────────────────────────────────────────────

type Tab = 'radar' | 'personas' | 'stakeholders' | 'swot';
interface TT {
  x: number;
  y: number;
  domain: string;
  score: number;
  diff?: number;
  label: string;
}

// ─── COMPONENT ─────────────────────────────────────────────────────────────

export default function RadarDashboard() {
  const [tab, setTab] = useState<Tab>('radar');
  const [showT0, setShowT0] = useState(true);
  const [showT3, setShowT3] = useState(true);
  const [active, setActive] = useState<Set<string>>(new Set());
  const [tt, setTt] = useState<TT | null>(null);
  const [sources, setSources] = useState(false);
  const [hoveredS, setHoveredS] = useState<number | null>(null);
  const [hoveredSwotItem, setHoveredSwotItem] = useState<{ quadrant: string; index: number } | null>(null);
  const [clickedSwotItem, setClickedSwotItem] = useState<{ quadrant: string; index: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const toggleP = (id: string) => {
    setActive(prev => {
      const n = new Set(prev);
      if (n.has(id)) {
        n.delete(id);
      } else {
        n.add(id);
      }
      return n;
    });
  };

  const onHover = (e: React.MouseEvent<SVGElement>, domain: string, score: number, label: string, diff?: number) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) {
      setTt({
        x: e.clientX - rect.left + 12,
        y: e.clientY - rect.top - 50,
        domain,
        score,
        diff,
        label,
      });
    }
  };

  return (
    <div className="text-[#1A1A1A] font-sans bg-white border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] rounded-none overflow-hidden" id="radar-dashboard-wrapper">

      {/* Sources modal */}
      {sources && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A]/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in" onClick={() => setSources(false)} id="sources-modal">
          <div className="bg-white border-2 border-[#1A1A1A] max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 shadow-[6px_6px_0px_#1A1A1A]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 border-b-2 border-[#1A1A1A] pb-3">
              <h2 className="text-md font-black uppercase tracking-tight">Bronnenlijst (APA 7e editie)</h2>
              <button onClick={() => setSources(false)} className="w-8 h-8 flex items-center justify-center border-2 border-[#1A1A1A] hover:bg-[#FF6321] hover:text-white transition cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4 text-xs text-[#1A1A1A]/85 leading-relaxed">
              <p className="border-l-4 border-[#FF6321] pl-3">
                <strong>Bannink, R., Broerse, J., Klazinga, N., & Tsang, K. (2015).</strong> <em>Zelfredzaamheidsmatrix: Handleiding.</em> GGD Amsterdam.
              </p>
              <p className="border-l-4 border-[#FF6321] pl-3">
                <strong>Bloemen-van Gurp, E., Dubbeldeman, W., Peeters, M., & Bours, G. (2025).</strong> <em>Validation of the Context-Sensitive Positive Health Questionnaire 2.0.</em> Journal of Patient-Reported Outcomes.
              </p>
              <p className="border-l-4 border-[#FF6321] pl-3">
                <strong>BMC. (2025).</strong> <em>Tien jaar De Harde Leerschool: Een onderzoek naar de impact en ontwikkeling van de deelnemers.</em> Stichting De Harde Leerschool.
              </p>
              <p className="border-l-4 border-[#FF6321] pl-3">
                <strong>CBS. (2024).</strong> <em>Jongeren zonder werk en opleiding.</em> Centraal Bureau voor de Statistiek. <a href="https://www.cbs.nl" target="_blank" rel="noopener noreferrer" className="text-[#FF6321] hover:underline">https://www.cbs.nl</a>
              </p>
              <p className="border-l-4 border-[#FF6321] pl-3">
                <strong>CBS. (2025).</strong> <em>Bijstandsuitkeringen; uitkeringsontvangers naar leeftijd.</em> Centraal Bureau voor de Statistiek. <a href="https://www.cbs.nl" target="_blank" rel="noopener noreferrer" className="text-[#FF6321] hover:underline">https://www.cbs.nl</a>
              </p>
              <p className="border-l-4 border-[#FF6321] pl-3">
                <strong>De Nooij, M. (2024).</strong> <em>Maatschappelijke kosten-batenanalyse Werkwinkel Utrecht.</em> Michiel de Nooij Economisch Onderzoek en Advies.
              </p>
              <p className="border-l-4 border-[#FF6321] pl-3">
                <strong>DHLS. (2025).</strong> <em>Organisatiedocumentatie Stichting De Harde Leerschool.</em> Stichting De Harde Leerschool.
              </p>
              <p className="border-l-4 border-[#FF6321] pl-3">
                <strong>Dubbeldeman, W., Bloemen-van Gurp, E., & Peeters, M. (2025).</strong> <em>Development and psychometric evaluation of the CPHQ 2.0.</em>
              </p>
              <p className="border-l-4 border-[#FF6321] pl-3">
                <strong>Flinterman, F., Lauriks, S., de Wit, M., Cremer, S., Fassaert, T., Verhoeff, A., & Manshanden, J. (2019).</strong> <em>Mijn Positieve Gezondheid en de Zelfredzaamheid-Matrix.</em> TSG Tijdschrift voor Gezondheidswetenschappen, 97(5), 160–164.
              </p>
              <p className="border-l-4 border-[#FF6321] pl-3">
                <strong>Kennis, M., & Eimers, T. (2017).</strong> <em>Kwetsbare jongvolwassenen in beeld: Kenmerken en begeleidingsbehoeften.</em> Expertisecentrum Beroepsonderwijs (ecbo).
              </p>
              <p className="border-l-4 border-[#FF6321] pl-3">
                <strong>Lauriks, S., Buster, M., de Wit, M., Aarts, E., Weerd, S. van de, & Fassaert, T. (2013).</strong> <em>Zelfredzaamheid-Matrix.</em> GGD Amsterdam.
              </p>
              <p className="border-l-4 border-[#FF6321] pl-3">
                <strong>Mendelow, A. L. (1991).</strong> <em>Stakeholder mapping: The power/interest matrix.</em> Proceedings of the 2nd International Conference on Information Systems, Cambridge.
              </p>
              <p className="border-l-4 border-[#FF6321] pl-3">
                <strong>Nahar-van Venrooij, L., Smit, C., & Huber, M. (2025).</strong> <em>The PH-22: A measure for positive health.</em>
              </p>
              <p className="border-l-4 border-[#FF6321] pl-3">
                <strong>Pharos. (2022).</strong> <em>Gezondheidsvaardigheden in de praktijk: Richtlijnen voor begrijpelijke communicatie.</em> Pharos, Expertisecentrum gezondheidsverschillen.
              </p>
              <p className="border-l-4 border-[#FF6321] pl-3">
                <strong>RIVM. (2019).</strong> <em>Kosten van ziekten in Nederland.</em> Rijksinstituut voor Volksgezondheid en Milieu. <a href="https://www.rivm.nl" target="_blank" rel="noopener noreferrer" className="text-[#FF6321] hover:underline">https://www.rivm.nl</a>
              </p>
              <p className="border-l-4 border-[#FF6321] pl-3">
                <strong>Schoemaker, C. (2025).</strong> <em>Maatschappelijke waarde van sport en bewegen: Wellbeing Valuation Approach.</em>
              </p>
              <p className="border-l-4 border-[#FF6321] pl-3">
                <strong>Van Vliet, M., Vijn, P., & Hassink, J. (2021).</strong> <em>Positieve Gezondheid in de praktijk.</em> Tijdschrift voor Gezondheidswetenschappen, 99(1).
              </p>
              <p className="border-l-4 border-[#FF6321] pl-3">
                <strong>WODC. (2024).</strong> <em>Recidivemonitor: Terugkeer na detentie.</em> Wetenschappelijk Onderzoek- en Documentatiecentrum. <a href="https://www.wodc.nl" target="_blank" rel="noopener noreferrer" className="text-[#FF6321] hover:underline">https://www.wodc.nl</a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="border-b-2 border-[#1A1A1A] flex items-center justify-between px-4 py-2 flex-wrap gap-2 bg-[#1A1A1A]/5" id="radar-dashboard-tabs">
        <div className="flex gap-2 overflow-x-auto py-1">
          {([
            ['radar', 'Radar Chart'],
            ['personas', 'Personas'],
            ['stakeholders', 'Stakeholders'],
            ['swot', 'SWOT-Analyse'],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              id={`tab-btn-${key}`}
              className={`px-3 py-1.5 text-xs font-black transition whitespace-nowrap border-2 border-[#1A1A1A] uppercase cursor-pointer ${
                tab === key ? 'bg-[#1A1A1A] text-white shadow-[2px_2px_0px_#FF6321]' : 'bg-white text-[#1A1A1A] hover:bg-neutral-100 shadow-[2px_2px_0px_#1A1A1A]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setSources(true)}
          id="btn-literatuur-bronnen"
          className="px-3 py-1.5 text-[10px] font-black border-2 border-[#1A1A1A] bg-white hover:bg-neutral-100 transition uppercase tracking-widest cursor-pointer shadow-[2px_2px_0px_#1A1A1A]"
        >
          Bronnen
        </button>
      </div>

      <main className="p-4 md:p-6 bg-transparent">

        {/* €3.15 reference bar */}
        <div id="cphq-reference-notice" className="mb-4 text-xs text-[#1A1A1A]/85 border-2 border-[#1A1A1A] p-3 leading-relaxed bg-white shadow-[2px_2px_0px_#1A1A1A] border-l-[6px] border-l-[#FF6321]">
          <strong className="text-[#FF6321]">Referentiekader Social Return:</strong> Sectorbreed onderzoek (De Nooij, 2024 – Werkwinkel Utrecht) toont aan dat begeleidingsinterventies voor kwetsbare jongeren een substantiële maatschappelijke return opleveren. DHLS hanteert dit als <em>extern referentiekader</em> om de bredere impact van hersteltrajecten contextueel te duiden.
        </div>

        {/* ── RADAR TAB ── */}
        {tab === 'radar' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in" id="radar-tab-view">
            <div className="lg:col-span-2 relative">
              <div className="bg-[#white] border-2 border-[#1A1A1A] p-2 md:p-6 relative overflow-hidden flex flex-col justify-center min-h-[460px] shadow-[4px_4px_0px_#1A1A1A] rounded-xl">
                {tt && (
                  <div
                    className="absolute z-50 bg-white/90 backdrop-blur-md border-2 border-[#1A1A1A] rounded-xl px-4 py-3 text-xs pointer-events-none shadow-[4px_4px_0px_#1A1A1A] border-t-[6px] transition-all duration-150 animate-fade-in"
                    style={{ 
                      left: Math.min(tt.x, SIZE - 180), 
                      top: Math.max(tt.y, 10), 
                      maxWidth: 220,
                      borderTopColor: tt.diff !== undefined ? '#FF6321' : '#1A1A1A'
                    }}
                  >
                    <p className="font-mono text-[8px] uppercase tracking-widest text-[#1A1A1A]/45 font-black mb-1">Meting Detail</p>
                    <p className="font-black text-[#1A1A1A] mb-1.5 uppercase tracking-tight text-[11px] leading-tight">{tt.domain}</p>
                    
                    <div className="flex items-center justify-between gap-4 border-t border-[#1A1A1A]/10 pt-1.5 mt-1">
                      <span className="text-[#1A1A1A]/70 font-bold text-[10px]">{tt.label}</span>
                      <span className="font-mono text-[#FF6321] font-extrabold text-xs">{tt.score}%</span>
                    </div>
                    {tt.diff !== undefined && (
                      <div className="flex items-center justify-between gap-4 mt-1 border-t border-dashed border-[#1A1A1A]/5 pt-1">
                        <span className="text-[#1A1A1A]/60 text-[9.5px]">Groei (vs. instroom)</span>
                        <span className={`font-black font-mono text-[10px] ${tt.diff < 0 ? 'text-red-650' : tt.diff > 0 ? 'text-emerald-650' : 'text-neutral-500'}`}>
                          {tt.diff > 0 ? `+${tt.diff}%` : tt.diff < 0 ? `${tt.diff}%` : '='}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                <svg ref={svgRef} viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full max-w-[420px] md:max-w-[450px] mx-auto select-none" id="radar-svg">
                  <defs>
                    <radialGradient id="grad-t0" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.01" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.12" />
                    </radialGradient>
                    <radialGradient id="grad-t3" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity="0.01" />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity="0.12" />
                    </radialGradient>
                    <radialGradient id="grad-marco" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.01" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.22" />
                    </radialGradient>
                    <radialGradient id="grad-sarah" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#EC4899" stopOpacity="0.01" />
                      <stop offset="100%" stopColor="#EC4899" stopOpacity="0.22" />
                    </radialGradient>
                    <radialGradient id="grad-jelle" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.01" />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.22" />
                    </radialGradient>
                  </defs>

                  {/* Subtle Shaded Radial Polygons */}
                  {[100, 75, 50, 25].map(r => (
                    <polygon
                      key={r}
                      points={DOMAINS.map((_, i) => {
                        const p = coords(r, i);
                        return `${p.x},${p.y}`;
                      }).join(' ')}
                      fill={r === 100 ? 'rgba(26,26,26,0.012)' : r === 50 ? 'rgba(26,26,26,0.025)' : 'none'}
                      stroke={r === 100 ? '#1A1A1A' : 'rgba(26,26,26,0.1)'}
                      strokeWidth={r === 100 ? 1.5 : 0.75}
                      strokeDasharray={r < 100 ? '3 3' : undefined}
                    />
                  ))}
                  {/* Ring % labels */}
                  {[25, 50, 75, 100].map(r => {
                    const p = coords(r, 0);
                    return (
                      <text key={r} x={CENTER + 5} y={p.y + 3} fill="#1A1A1A" fontSize="8" fontFamily="monospace" fontWeight="black" className="opacity-35">
                        {r}%
                      </text>
                    );
                  })}
                  {/* Axes */}
                  {DOMAINS.map((_, i) => {
                    const o = coords(100, i);
                    return (
                      <line key={i} x1={CENTER} y1={CENTER} x2={o.x} y2={o.y} stroke="rgba(26,26,26,0.08)" strokeWidth={1} />
                    );
                  })}
                  {/* Axis Text Labels (Upgraded typography and readability) */}
                  {DOMAIN_LABELS.map((lines, i) => {
                    const angle = (i / N) * 2 * Math.PI - Math.PI / 2;
                    const lx = CENTER + LABEL_R * Math.cos(angle);
                    const ly = CENTER + LABEL_R * Math.sin(angle);
                    const anc = anchor(i);
                    const sinA = Math.sin(angle);
                    const baseY = sinA > 0.3 ? 0 : sinA < -0.3 ? -(lines.length - 1) * 11 : -((lines.length - 1) * 11) / 2;
                    return (
                      <text key={i} textAnchor={anc} fill="#1a1a1a" fontSize="9.5" fontWeight="900" className="uppercase tracking-tight select-none">
                        {lines.map((line, j) => (
                          <tspan key={j} x={lx} dy={j === 0 ? `${baseY}` : '10'}>
                            {line}
                          </tspan>
                        ))}
                      </text>
                    );
                  })}
                  {/* T0 Baseline */}
                  {showT0 && (
                    <>
                      <polygon points={polyPoints(T0_DATA)} fill="url(#grad-t0)" stroke="#3b82f6" strokeWidth={2.5} strokeDasharray="5 3" />
                      {T0_DATA.map((v, i) => {
                        const p = coords(v, i);
                        return (
                          <circle
                            key={i}
                            cx={p.x}
                            cy={p.y}
                            r={5}
                            fill="#3b82f6"
                            stroke="#1A1A1A"
                            strokeWidth={1.5}
                            className="cursor-pointer hover:scale-130 transition-transform duration-100"
                            onMouseEnter={e => onHover(e, DOMAINS[i], v, 'T0 Referentiegroep Start')}
                            onMouseLeave={() => setTt(null)}
                          />
                        );
                      })}
                    </>
                  )}
                  {/* T3 Baseline */}
                  {showT3 && (
                    <>
                      <polygon points={polyPoints(T3_DATA)} fill="url(#grad-t3)" stroke="#22c55e" strokeWidth={2.5} />
                      {T3_DATA.map((v, i) => {
                        const p = coords(v, i);
                        return (
                          <circle
                            key={i}
                            cx={p.x}
                            cy={p.y}
                            r={5}
                            fill="#22c55e"
                            stroke="#1A1A1A"
                            strokeWidth={1.5}
                            className="cursor-pointer hover:scale-130 transition-transform duration-100"
                            onMouseEnter={e => onHover(e, DOMAINS[i], v, 'T3 Referentiegroep 12 maanden')}
                            onMouseLeave={() => setTt(null)}
                          />
                        );
                      })}
                    </>
                  )}
                  {/* Personas */}
                  {PERSONAS.filter(p => active.has(p.id)).map(p => (
                    <g key={p.id}>
                      <polygon points={polyPoints(p.t1)} fill={`url(#grad-${p.id})`} stroke={p.color} strokeWidth={3} />
                      {p.t1.map((v, i) => {
                        const pt = coords(v, i);
                        const alert = p.alerts.includes(i) || p.diff[i] < 0;
                        return (
                          <circle
                            key={i}
                            cx={pt.x}
                            cy={pt.y}
                            r={alert ? 7 : 5.5}
                            fill={alert ? '#FF6321' : p.color}
                            stroke="#1A1A1A"
                            strokeWidth={2}
                            className="cursor-pointer transition-all duration-150 hover:scale-130"
                            onMouseEnter={e => onHover(e, DOMAINS[i], v, `${p.name} (T1)`, p.diff[i])}
                            onMouseLeave={() => setTt(null)}
                          />
                        );
                      })}
                    </g>
                  ))}
                  <circle cx={CENTER} cy={CENTER} r={4} fill="#1a1a1a" />
                </svg>
              </div>
            </div>

            {/* Controls sidebar */}
            <div className="flex flex-col gap-4 text-xs">
              <div className="bg-white border-2 border-[#1A1A1A] p-4 shadow-[2px_2px_0px_#1A1A1A]" id="cohorts-control">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#1A1A1A]/50 mb-3">Zorg-Cohorten (Referentiedata DHLS)</p>
                {[
                  { label: 'T0 – Referentiegroep (Instroom)', color: '#3b82f6', show: showT0, toggle: () => setShowT0(!showT0), dash: true },
                  { label: 'T3 – Referentiegroep (Uitstroom +12m)', color: '#22c55e', show: showT3, toggle: () => setShowT3(!showT3), dash: false },
                ].map(({ label, color, show, toggle, dash }) => (
                  <button
                    key={label}
                    onClick={toggle}
                    className={`w-full flex items-center gap-3 p-2 border-2 text-left transition text-[11px] font-bold mb-2 last:mb-0 cursor-pointer ${
                      show ? 'border-[#1A1A1A] bg-white shadow-[2px_2px_0px_#FF6321] text-[#1A1A1A] font-black' : 'border-[#1A1A1A]/30 bg-neutral-50 text-[#1A1A1A]/40 shadow-[1px_1px_0px_rgba(26,26,26,0.1)]'
                    }`}
                  >
                    <svg width="24" height="10" className="shrink-0">
                      <line x1="0" y1="5" x2="24" y2="5" stroke={color} strokeWidth="2.5" strokeDasharray={dash ? '4 3' : undefined} />
                    </svg>
                    <span className="truncate">{label}</span>
                  </button>
                ))}
              </div>

              <div className="bg-white border-2 border-[#1A1A1A] p-4 shadow-[2px_2px_0px_#1A1A1A]" id="personas-toggle">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-[10px] font-black uppercase tracking-wider text-[#1A1A1A]/50">Selecteer Persona op de Radar</p>
                  {active.size > 0 && (
                    <button onClick={() => setActive(new Set())} className="text-[10px] font-bold text-[#FF6321] hover:underline uppercase tracking-tight">wis alle</button>
                  )}
                </div>
                {PERSONAS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => toggleP(p.id)}
                    className={`w-full p-2.5 border-2 text-left transition mb-2 last:mb-0 cursor-pointer ${
                      active.has(p.id) ? 'border-[#1A1A1A] bg-neutral-50 shadow-[2px_2px_0px_#FF6321] text-[#1A1A1A]' : 'border-[#1A1A1A]/35 bg-white text-[#1A1A1A]/70 hover:bg-neutral-50 shadow-[2px_2px_0px_rgba(26,26,26,0.1)]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="w-2.5 h-2.5 rounded-none border border-[#1A1A1A] shrink-0" style={{ backgroundColor: p.color }} />
                      <span className="text-xs font-black uppercase tracking-tight">{p.name}</span>
                    </div>
                    <p className="text-[10px] text-[#1A1A1A]/60 pl-4">"{p.subtitle}"</p>
                  </button>
                ))}
              </div>

              <div className="bg-[#FF6321]/10 border-2 border-[#1A1A1A] p-3 shadow-[2px_2px_0px_#FF6321] flex items-start gap-2.5">
                <span className="w-3.5 h-3.5 border border-[#1A1A1A] bg-[#FF6321] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-[#FF6321] uppercase tracking-tight">Aandachtspunt of Knelpunt</p>
                  <p className="text-[10px] text-[#1A1A1A]/75 mt-0.5 font-medium leading-normal">
                    Oranje stippen representeren een score die gedaald is ten opzichte van T0 of direct onder de gedefinieerde normwaarde ligt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── PERSONAS TAB ── */}
        {tab === 'personas' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" id="personas-tab-view">
            {PERSONAS.map(p => (
              <div 
                key={p.id} 
                className="bg-white border border-neutral-100/80 hover:border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(26,26,26,0.08)] rounded-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative group"
              >
                {/* Accent thin banner indicating persona accent color */}
                <span className="absolute top-0 left-0 w-full h-[5px] transition-all duration-300 group-hover:h-2" style={{ backgroundColor: p.color }} />
                
                <div className="pt-1.5">
                  <div className="flex items-center gap-3 bg-neutral-50/50 p-5 border-b border-neutral-100 mb-4">
                    <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shrink-0 shadow-xs" style={{ backgroundColor: p.color }}>
                      <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="font-extrabold text-xs uppercase tracking-tight text-[#1A1A1A] truncate">{p.name}</h3>
                        <span className="text-[7.5px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-white border border-neutral-150 font-bold text-neutral-450 uppercase shrink-0">
                          Dossier
                        </span>
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-tight truncate mt-0.5" style={{ color: p.color }}>
                        "{p.subtitle}"
                      </p>
                    </div>
                  </div>
                  
                  <div className="px-5">
                    <p className="text-[10.5px] text-neutral-600 mb-4 leading-relaxed font-semibold italic border-l-2 pl-3 py-0.5" style={{ borderColor: p.color }}>
                      {p.info}
                    </p>
                    <div className="text-[8px] font-mono font-bold text-neutral-400 uppercase tracking-widest mb-3">
                      Domeinnaam & Behaald Niveau (T1)
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 mb-5 px-5">
                    {DOMAINS.map((domain, i) => {
                      const d = p.diff[i];
                      const alert = p.alerts.includes(i) || d < 0;
                      return (
                        <div
                          key={i}
                          className={`flex items-center justify-between text-[11px] p-2.5 rounded-lg transition-all ${
                            alert 
                              ? 'bg-rose-50/40 hover:bg-rose-50 border border-rose-100 shadow-[0_2px_8px_-3px_rgba(239,68,68,0.15)]' 
                              : 'bg-[#F9F7F2]/45 hover:bg-[#F9F7F2]/80 border border-neutral-150/70 hover:border-[#1A1A1A]/20 shadow-xs'
                          }`}
                        >
                          <div className="flex flex-col flex-1 min-w-0 mr-2.5">
                            <div className="flex items-center gap-1.5">
                              {alert && <span className="w-1.5 h-1.5 rounded-full bg-[#FF6321] shrink-0" title="Aandachtspunt of daling" />}
                              <span className="text-[#1A1A1A] font-extrabold truncate text-[10px] uppercase tracking-tight" title={domain}>
                                {domain}
                              </span>
                            </div>
                            
                            {/* Elegant minimalist progress bar */}
                            <div className="flex items-center gap-2 mt-1.5">
                              <div className="flex-1 h-1.5 bg-neutral-200/50 rounded-full overflow-hidden shrink-0 border border-neutral-300/10">
                                <div 
                                  className="h-full rounded-full transition-all duration-500 shadow-inner" 
                                  style={{ 
                                    width: `${p.t1[i]}%`, 
                                    backgroundColor: alert ? '#FF6321' : p.color 
                                  }} 
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 shrink-0 font-mono pl-1">
                            <span className="font-extrabold text-[11px] text-right w-7" style={{ color: alert ? '#FF6321' : p.color }}>
                              {p.t1[i]}%
                            </span>
                            <span
                              className={`text-[8.5px] px-1.5 py-0.5 rounded-sm border font-bold w-12 text-center transition-all ${
                                d > 0 
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:scale-105' 
                                  : d < 0 
                                    ? 'bg-rose-50 text-rose-750 border-rose-100 hover:scale-105' 
                                    : 'bg-white text-neutral-400 border-neutral-200'
                              }`}
                            >
                              {d > 0 ? `+${d}%` : d < 0 ? `${d}%` : '='}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="px-5 pb-5">
                  <button
                    onClick={() => {
                      setTab('radar');
                      setActive(new Set([p.id]));
                    }}
                    className="w-full text-center text-[10px] text-white font-black bg-[#1A1A1A] hover:bg-[#FF6321] transition duration-150 uppercase tracking-widest py-3 rounded-lg cursor-pointer shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center"
                  >
                    Toon op de Radar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── STAKEHOLDERS TAB ── */}
        {tab === 'stakeholders' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in" id="stakeholders-tab-view">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono tracking-widest text-[#FF6321] uppercase font-bold">INVLOED & INTERESSE</span>
                  <h2 className="text-xl font-black uppercase tracking-tight text-[#1A1A1A]">Macht / Belang Matrix (Mendelow)</h2>
                </div>
                <div className="text-[9px] font-bold border border-[#1A1A1A]/20 bg-neutral-50 px-2 py-1 rounded font-mono">
                  MATRIX 2026
                </div>
              </div>

              <div className="bg-[#1A1A1A]/2 border-2 border-[#1A1A1A] p-5 relative shadow-[6px_6px_0px_#1A1A1A] rounded-2xl bg-white" id="stakeholders-matrix-wrapper">
                <svg viewBox="0 0 420 400" className="w-full">
                  <defs>
                    {/* Glowing colored gradients for each selector quadrant */}
                    <radialGradient id="keepSatisfiedGrad" cx="50%" cy="50%" r="75%">
                      <stop offset="0%" stopColor="#eab308" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="manageCloselyGrad" cx="50%" cy="50%" r="75%">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="monitorGrad" cx="50%" cy="50%" r="75%">
                      <stop offset="0%" stopColor="#6b7280" stopOpacity="0.06" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="keepInformedGrad" cx="50%" cy="50%" r="75%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </radialGradient>

                    {/* Arrow marker for axis tips */}
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1A1A1A" />
                    </marker>
                  </defs>

                  {/* Quadrant background fills */}
                  <rect x={18} y={10} width={196.5} height={181} fill="url(#keepSatisfiedGrad)" />
                  <rect x={214.5} y={10} width={196.5} height={181} fill="url(#manageCloselyGrad)" />
                  <rect x={18} y={191} width={196.5} height={181} fill="url(#monitorGrad)" />
                  <rect x={214.5} y={191} width={196.5} height={181} fill="url(#keepInformedGrad)" />

                  {/* Outer border container */}
                  <rect x={18} y={10} width={393} height={362} fill="none" stroke="#1A1A1A" strokeWidth={2.5} />

                  {/* Center dividers */}
                  <line x1={214.5} y1={10} x2={214.5} y2={372} stroke="#1A1A1A" strokeWidth={1.5} strokeDasharray="4 4" opacity={0.7} />
                  <line x1={18} y1={191} x2={411} y2={191} stroke="#1A1A1A" strokeWidth={1.5} strokeDasharray="4 4" opacity={0.7} />

                  {/* Quadrant Header Labels (Aesthetic positioning) */}
                  <g opacity="0.85">
                    <rect x={25} y={16} width={100} height={16} fill="white" stroke="#1A1A1A" strokeWidth={1} rx={3} />
                    <text x={75} y={27} textAnchor="middle" fill="#854D0E" fontSize="7.5" fontWeight="900" letterSpacing="0.5" className="uppercase font-sans">
                      🤝 Keep Satisfied
                    </text>
                  </g>

                  <g opacity="0.85">
                    <rect x={295} y={16} width={100} height={16} fill="white" stroke="#1A1A1A" strokeWidth={1} rx={3} />
                    <text x={345} y={27} textAnchor="middle" fill="#991B1B" fontSize="7.5" fontWeight="900" letterSpacing="0.5" className="uppercase font-sans">
                      🔥 Manage Closely
                    </text>
                  </g>

                  <g opacity="0.85">
                    <rect x={25} y={345} width={120} height={16} fill="white" stroke="#1A1A1A" strokeWidth={1} rx={3} />
                    <text x={85} y={356} textAnchor="middle" fill="#374151" fontSize="7" fontWeight="900" letterSpacing="0.5" className="uppercase font-sans">
                      👁️ Minimal Effort
                    </text>
                  </g>

                  <g opacity="0.85">
                    <rect x={295} y={345} width={100} height={16} fill="white" stroke="#1A1A1A" strokeWidth={1} rx={3} />
                    <text x={345} y={356} textAnchor="middle" fill="#1E40AF" fontSize="7.5" fontWeight="900" letterSpacing="0.5" className="uppercase font-sans">
                      📢 Keep Informed
                    </text>
                  </g>

                  {/* Dynamic Projection lines on hover */}
                  {STAKEHOLDERS.map(s => {
                    if (hoveredS !== s.id) return null;
                    const sx = 18 + (s.x / 100) * 393;
                    const sy = 10 + ((100 - s.y) / 100) * 362;
                    return (
                      <g key={`proj-${s.id}`} className="transition duration-150">
                        {/* Horizontal guide to Y axis */}
                        <line x1={18} y1={sy} x2={sx} y2={sy} stroke="#FF6321" strokeWidth={1.5} strokeDasharray="3 3" opacity={0.65} />
                        {/* Vertical guide to X axis */}
                        <line x1={sx} y1={372} x2={sx} y2={sy} stroke="#FF6321" strokeWidth={1.5} strokeDasharray="3 3" opacity={0.65} />
                      </g>
                    );
                  })}

                  {/* Axis arrows + label backgrounds */}
                  <text x={214.5} y={392} textAnchor="middle" fill="#1A1A1A" fontSize="9" fontWeight="900" letterSpacing="1.2" className="font-sans">
                    BELANG / INTERESSE →
                  </text>
                  <text x={10} y={191} textAnchor="middle" fill="#1A1A1A" fontSize="9" fontWeight="900" letterSpacing="1.2" transform="rotate(-90,10,191)" className="font-sans">
                    MACHT / INVLOED →
                  </text>

                  {/* Low / High descriptive values */}
                  <text x={24} y={383} fill="#1A1A1A" fontSize="7.5" fontWeight="950" opacity="0.5" className="font-mono">LAAG</text>
                  <text x={395} y={383} fill="#1A1A1A" fontSize="7.5" fontWeight="950" opacity="0.5" className="font-mono" textAnchor="end">HOOG</text>
                  <text x={10} y={366} fill="#1A1A1A" fontSize="7.5" fontWeight="950" opacity="0.5" className="font-mono" transform="rotate(-90,10,366)">LAAG</text>
                  <text x={10} y={20} fill="#1A1A1A" fontSize="7.5" fontWeight="950" opacity="0.5" className="font-mono" transform="rotate(-90,10,20)">HOOG</text>

                  {/* Interaction Nodes */}
                  {STAKEHOLDERS.map(s => {
                    const sx = 18 + (s.x / 100) * 393;
                    const sy = 10 + ((100 - s.y) / 100) * 362;
                    const isHov = hoveredS === s.id;
                    const col = s.kwadrant === 'MANAGE CLOSELY' ? '#ef4444' : s.kwadrant === 'KEEP SATISFIED' ? '#f59e0b' : '#3b82f6';
                    return (
                      <g
                        key={s.id}
                        onMouseEnter={() => setHoveredS(s.id)}
                        onMouseLeave={() => setHoveredS(null)}
                        className="cursor-pointer"
                      >
                        {/* Outer radiating aura on hover */}
                        {isHov && (
                          <circle cx={sx} cy={sy} r={19} fill="none" stroke="#FF6321" strokeWidth={1.5} className="animate-ping opacity-35" />
                        )}
                        <circle cx={sx} cy={sy} r={isHov ? 15 : 11} fill={col} stroke="#1A1A1A" strokeWidth={2.5} className="transition-all duration-150 shadow-sm" />
                        <text x={sx} y={sy + 3.5} textAnchor="middle" fill="white" fontSize={isHov ? "11.5" : "9"} fontWeight="950" className="font-sans leading-none pointer-events-none">
                          {s.id}
                        </text>
                      </g>
                    );
                  })}

                  {/* Floating Micro-Information popover layer inside SVG */}
                  {STAKEHOLDERS.map(s => {
                    if (hoveredS !== s.id) return null;
                    const sx = 18 + (s.x / 100) * 393;
                    const sy = 10 + ((100 - s.y) / 100) * 362;
                    const popLeft = sx > 214.5;
                    const popWidth = 145;
                    const popHeight = 52;
                    const popX = popLeft ? sx - popWidth - 16 : sx + 16;
                    const popY = sy - popHeight / 2;

                    return (
                      <g key={`pop-${s.id}`} className="pointer-events-none z-50 animate-slide-up">
                        {/* Drop shadow background rectangle */}
                        <rect x={popX + 3} y={popY + 3} width={popWidth} height={popHeight} fill="#1A1A1A" rx={8} opacity={0.15} />
                        {/* Main neubrutalist card container */}
                        <rect x={popX} y={popY} width={popWidth} height={popHeight} fill="#1A1A1A" rx={8} stroke="#FF6321" strokeWidth={2} />
                        
                        {/* Content lines */}
                        <text x={popX + 10} y={popY + 16} fill="white" fontSize="9" fontWeight="950" className="font-sans">
                          {s.name.length > 22 ? `${s.name.substring(0, 20)}...` : s.name}
                        </text>
                        <text x={popX + 10} y={popY + 28} fill="rgba(255,255,255,0.65)" fontSize="7" fontStyle="italic" className="font-sans">
                          {s.role.length > 28 ? `${s.role.substring(0, 26)}...` : s.role}
                        </text>
                        
                        {/* Little colorful quadrant pill inside the popover */}
                        <rect 
                          x={popX + 10} 
                          y={popY + 34} 
                          width={95} 
                          height={12} 
                          fill={s.kwadrant === 'MANAGE CLOSELY' ? 'rgba(239,68,68,0.2)' : s.kwadrant === 'KEEP SATISFIED' ? 'rgba(245,158,11,0.2)' : 'rgba(59,130,246,0.2)'} 
                          rx={2} 
                        />
                        <text 
                          x={popX + 14} 
                          y={popY + 42} 
                          fill={s.kwadrant === 'MANAGE CLOSELY' ? '#f87171' : s.kwadrant === 'KEEP SATISFIED' ? '#fbbf24' : '#60a5fa'} 
                          fontSize="6.5" 
                          fontWeight="bold" 
                          className="font-mono uppercase tracking-wider"
                        >
                          ● {s.kwadrant}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono tracking-widest text-[#FF6321] uppercase font-bold">BEVELEN & BETROKKENHEID</span>
                  <h2 className="text-xl font-black uppercase tracking-tight text-[#1A1A1A]">Stakeholders & Begeleidingsstrategie</h2>
                </div>
              </div>

              <div className="overflow-x-auto border-2 border-[#1A1A1A] p-1.5 bg-white shadow-[6px_6px_0px_#1A1A1A] rounded-2xl">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b-2 border-[#1A1A1A] text-left bg-neutral-50">
                      {['#', 'Stakeholder & Rol', 'Macht', 'Belang', 'Strategie & Richting'].map(h => (
                        <th key={h} className="py-3 px-3.5 text-[#1A1A1A] font-black uppercase tracking-wider text-[9px] font-sans">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {STAKEHOLDERS.map(s => {
                      const isRowHov = hoveredS === s.id;
                      return (
                        <tr
                          key={s.id}
                          onMouseEnter={() => setHoveredS(s.id)}
                          onMouseLeave={() => setHoveredS(null)}
                          className={`border-b last:border-b-0 border-[#1A1A1A]/10 transition-all duration-100 ${
                            isRowHov 
                              ? 'bg-[#FF6321]/5 text-[#1A1A1A] font-medium scale-[1.005]' 
                              : 'hover:bg-neutral-50/70'
                          }`}
                        >
                          {/* Circle bullet index */}
                          <td className="py-3 px-3.5 font-mono font-black text-[#1A1A1A] text-xs">
                            <span className={`w-6 h-6 flex items-center justify-center rounded-lg border font-mono text-[10px] ${
                              s.kwadrant === 'MANAGE CLOSELY' 
                                ? 'bg-red-500/10 text-red-700 border-red-200' 
                                : s.kwadrant === 'KEEP SATISFIED' 
                                  ? 'bg-amber-500/10 text-amber-700 border-amber-200' 
                                  : 'bg-blue-500/10 text-blue-700 border-blue-200'
                            }`}>
                              {s.id}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-extrabold block text-xs tracking-tight text-[#1A1A1A] uppercase">{s.name}</span>
                            <span className="text-[10px] font-medium text-neutral-400 leading-tight block mt-0.5">{s.role}</span>
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 text-[8.5px] font-black uppercase tracking-wider transition rounded-md font-mono ${
                                s.macht === 'HOOG' 
                                  ? 'bg-[#ef4444]/10 text-[#dc2626] border border-[#ef4444]/20' 
                                  : 'bg-neutral-100 text-neutral-500 border border-neutral-200'
                              }`}
                            >
                              {s.macht}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 text-[8.5px] font-black uppercase tracking-wider transition rounded-md font-mono ${
                                s.belang === 'HOOG' 
                                  ? 'bg-[#f97316]/10 text-[#ea580c] border border-[#f97316]/20' 
                                  : 'bg-neutral-100 text-neutral-500 border border-neutral-200'
                              }`}
                            >
                              {s.belang}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-[10.5px] font-bold text-[#1A1A1A]/95 max-w-[180px] leading-relaxed">
                            {s.strategie}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── SWOT TAB ── */}
        {tab === 'swot' && (
          <div className="flex flex-col gap-8 animate-fade-in" id="swot-tab-view">
            {/* Elegant Infographic Intro Bar */}
            <div className="bg-[#1A1A1A] p-6 text-white rounded-xl shadow-[4px_4px_0px_#FF6321] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
              <div className="space-y-1 z-10">
                <span className="text-[10px] font-mono tracking-widest text-[#FF6321] uppercase font-bold">MILIEU- EN INTERN ONDERZOEK</span>
                <h2 className="text-xl font-black uppercase tracking-tight">SWOT Matrix & Strategische Richting</h2>
                <p className="text-xs text-white/70 max-w-2xl leading-relaxed">
                  Strategische analyse van de implementatie van het CPHQ 2.0 instrument en de DHLS-module. Deze matrix brengt de sterktes en zwaktes van de organisatie samen met de externe kansen en bedreigingen om de impact van het project duurzaam te borgen.
                </p>
              </div>
              <div className="flex gap-4 shrink-0 bg-white/5 border border-white/10 p-3 rounded-lg text-center font-mono z-10">
                <div>
                  <div className="text-lg font-black text-[#22c55e]">5</div>
                  <div className="text-[8px] text-white/50 uppercase font-black">Sterktes</div>
                </div>
                <div className="border-l border-white/10 pl-3">
                  <div className="text-lg font-black text-[#f97316]">3</div>
                  <div className="text-[8px] text-white/50 uppercase font-black">Zwaktes</div>
                </div>
                <div className="border-l border-white/10 pl-3">
                  <div className="text-lg font-black text-[#3b82f6]">4</div>
                  <div className="text-[8px] text-white/50 uppercase font-black">Kansen</div>
                </div>
                <div className="border-l border-white/10 pl-3">
                  <div className="text-lg font-black text-[#ef4444]">3</div>
                  <div className="text-[8px] text-white/50 uppercase font-black">Bedreigingen</div>
                </div>
              </div>
            </div>

            {/* SWOT 2x2 Infographic Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(SWOT).map(([key, { color, label, sub, items }]) => {
                const initial = label === 'Sterktes' ? 'S' : label === 'Zwaktes' ? 'W' : label === 'Kansen' ? 'O' : 'T';
                
                // Fine-tune styles per quadrant with modern gradients and shadows
                let qIcon = <Award className="w-5 h-5 text-emerald-650" />;
                let qPill = "bg-emerald-500/10 text-emerald-800 border-emerald-200/50";
                let qBulletColor = "bg-emerald-500/15 text-emerald-850 font-bold";
                let qAccent = "border-t-[8px] border-t-emerald-500 shadow-[6px_6px_0px_rgba(34,197,94,0.15)]";
                
                if (key === 'zwaktes') {
                  qIcon = <AlertCircle className="w-5 h-5 text-orange-600" />;
                  qPill = "bg-orange-500/10 text-orange-850 border-orange-200/50";
                  qBulletColor = "bg-orange-500/15 text-orange-850 font-bold";
                  qAccent = "border-t-[8px] border-t-orange-500 shadow-[6px_6px_0px_rgba(249,115,22,0.15)]";
                } else if (key === 'kansen') {
                  qIcon = <Sparkles className="w-5 h-5 text-blue-600" />;
                  qPill = "bg-blue-500/10 text-blue-805 border-blue-200/50";
                  qBulletColor = "bg-blue-500/15 text-blue-850 font-bold";
                  qAccent = "border-t-[8px] border-t-blue-500 shadow-[6px_6px_0px_rgba(59,130,246,0.15)]";
                } else if (key === 'bedreigingen') {
                  qIcon = <AlertTriangle className="w-5 h-5 text-red-650" />;
                  qPill = "bg-red-500/10 text-red-800 border-red-200/50";
                  qBulletColor = "bg-red-500/15 text-red-850 font-bold";
                  qAccent = "border-t-[8px] border-t-red-500 shadow-[6px_6px_0px_rgba(239,68,68,0.15)]";
                }

                return (
                  <div 
                    key={key} 
                    className={`bg-white border-2 border-[#1A1A1A] p-6 relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-[10px_10px_0px_#1A1A1A] rounded-2xl ${qAccent}`}
                  >
                    {/* Visual watermark identifier in background */}
                    <span className="absolute -right-3 -bottom-6 font-mono text-[140px] font-black pointer-events-none opacity-[0.035] select-none leading-none">
                      {initial}
                    </span>

                    <div className="z-10">
                      {/* Quadrant Header Card */}
                      <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#1A1A1A]/10">
                        <div className="flex items-center gap-3">
                          <div className="p-2 sm:p-2.5 bg-[#1a1a1a]/5 rounded-xl border border-[#1a1a1a]/15">
                            {qIcon}
                          </div>
                          <div>
                            <h3 className="text-sm font-black text-[#1A1A1A] uppercase tracking-tight">{label}</h3>
                            <p className="text-[9px] font-bold text-neutral-400 font-mono tracking-wider">{sub.toUpperCase()}</p>
                          </div>
                        </div>
                        <span className={`text-[9px] font-black uppercase border font-mono px-2 py-1 rounded-md ${qPill}`}>
                          {initial} · FACTOR
                        </span>
                      </div>

                      {/* Items lists */}
                      <ul className="space-y-3">
                        {items.map((item: any, i: number) => {
                          const isHovered = hoveredSwotItem?.quadrant === key && hoveredSwotItem?.index === i;
                          const isClicked = clickedSwotItem?.quadrant === key && clickedSwotItem?.index === i;
                          const showRationale = isHovered || isClicked;

                          return (
                            <li 
                              key={i} 
                              onMouseEnter={() => setHoveredSwotItem({ quadrant: key, index: i })}
                              onMouseLeave={() => setHoveredSwotItem(null)}
                              onClick={() => {
                                if (clickedSwotItem?.quadrant === key && clickedSwotItem?.index === i) {
                                  setClickedSwotItem(null);
                                } else {
                                  setClickedSwotItem({ quadrant: key, index: i });
                                }
                              }}
                              className={`text-[11.2px] text-[#1A1A1A]/90 font-semibold leading-relaxed flex flex-col border p-3 rounded-xl transition duration-150 cursor-pointer ${
                                showRationale 
                                  ? 'border-[#FF6321] bg-[#FF6321]/5 shadow-sm' 
                                  : 'border-[#1A1A1A]/10 bg-white hover:bg-neutral-50/50 hover:border-[#1A1A1A]/30'
                              }`}
                            >
                              <div className="flex items-start justify-between w-full">
                                <div className="flex items-start gap-3">
                                  <span className={`shrink-0 w-5 h-5 flex items-center justify-center rounded-lg font-mono text-[10px] ${qBulletColor}`}>
                                    {initial}{i + 1}
                                  </span>
                                  <span className="pt-0.5">{item.text}</span>
                                </div>
                                <span className={`text-[9px] font-bold text-neutral-400 font-mono flex items-center gap-0.5 shrink-0 pt-1 pl-2 transition ${
                                  showRationale ? 'text-[#FF6321]' : 'hover:text-[#FF6321]'
                                }`}>
                                  <HelpCircle className="w-3.5 h-3.5" />
                                </span>
                              </div>

                              {showRationale && (
                                <div className="mt-2 text-[10px] font-bold leading-relaxed bg-[#1A1A1A] text-white/95 p-3 rounded-lg border-l-4 border-[#FF6321] transition-all duration-200 animate-slide-up shadow-sm">
                                  <p className="font-extrabold text-[#FF6321] text-[9px] uppercase tracking-wider mb-1 flex items-center gap-1 font-mono">
                                    <Info className="w-3.5 h-3.5 text-[#FF6321] shrink-0" /> Toelichting / Rationele achtergrond
                                  </p>
                                  {item.rationale}
                                </div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-wider text-[#1A1A1A]/50 mb-3">Confrontatiematrix & Vervolgacties</h3>
              <div className="border-2 border-[#1A1A1A] overflow-hidden bg-white shadow-[4px_4px_0px_#1A1A1A]">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b-2 border-[#1A1A1A] bg-[#1A1A1A]/5 text-left">
                      {['Type Strategie', 'Vervlechting', 'Belangrijkste Richting / Actie binnen DHLS'].map(h => (
                        <th key={h} className="py-2.5 px-4 text-[#1A1A1A] font-black uppercase tracking-wider text-[9px]">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [
                        'Groeien & Benutten (S × O)',
                        'Sterktes × Kansen',
                        'Bestaande succes-factoren van de sport- en beweeginterventie koppelen aan vergelijkbare cohort-data om de wetenschappelijke status extern te verzilveren bij gemeentelijke gesprekken.',
                        'border-l-[#22c55e]'
                      ],
                      [
                        'Versterken & Benutten (W × O)',
                        'Zwaktes × Kansen',
                        'De digitale laagdrempeligheid van de vragenlijst inzetten om de lage respons of moeilijke follow-up van uitgestroomde deelnemers te tackelen via SMS of WhatsApp integratie.',
                        'border-l-[#f97316]'
                      ],
                      [
                        'Verdedigen (S × T)',
                        'Sterktes × Bedreigingen',
                        'De hechte band tussen coaches en deelnemers gebruiken om de adoptie van de intake-vragenlijst en herhaaldmeting (T0/T1) als vaste, betekenisvolle routine in te bedden.',
                        'border-[#3b82f6]'
                      ],
                      [
                        'Vermijden / Aanpassen (W × T)',
                        'Zwaktes × Bedreigingen',
                        'Het technisch minimaliseren van handmatige data-invoer door coaches via directe integraties met registratiepartners (Hello\'s), waardoor weerstand wegens werkdruk wegvalt.',
                        'border-[#a855f7]'
                      ],
                    ].map(([s, c, d, borderCol]) => (
                      <tr key={s} className="border-b border-[#1A1A1A]/10 last:border-0 hover:bg-neutral-50 transition">
                        <td className={`py-3 px-4 font-black uppercase tracking-tight text-[#1A1A1A] border-l-[6px] ${borderCol} text-[11px] bg-[#1A1A1A]/2`}>{s}</td>
                        <td className="py-3 px-4 font-mono text-[#1A1A1A]/65 text-[10px] font-bold">{c}</td>
                        <td className="py-3 px-4 text-[#1A1A1A]/85 font-semibold leading-relaxed text-[11px]">{d}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
