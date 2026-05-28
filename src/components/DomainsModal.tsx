/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Heart, Shield, Landmark, Home, Scale, Briefcase, Users, Brain, Activity, UserCheck } from 'lucide-react';

interface DomainsModalProps {
  onClose: () => void;
}

const DOMAINS_INFO = [
  {
    category: 'CPHQ 2.0 — Brede Gezondheid (Soft)',
    color: 'border-blue-500/30 bg-blue-500/5 text-blue-600',
    badgeColor: 'bg-blue-500/10 text-blue-700',
    items: [
      {
        icon: Brain,
        title: 'Geestelijke gezondheid & Ontspanning',
        desc: 'Mentale fitheid, stressbestendigheid en de mate van innerlijke rust. Richt zich op het constructief omgaan met emotionele uitdagingen en druk.',
        levels: [
          'Acute psychische nood of crisis; volledige desorganisatie.',
          'Ernstige klachten of verslavingsproblematiek; professionele hulp continu noodzakelijk.',
          'Matige klachten; incidenteel uit balans maar stabiel met ambulante hulp of coaching.',
          'Lichte klachten of stabiele toestand, voldoende herstelvaardigheden aanwezig.',
          'Optimale mentale gezondheid, hoge veerkracht en effectieve copingmechanismen.'
        ]
      },
      {
        icon: Activity,
        title: 'Lichamelijke gezondheid & Vitaliteit',
        desc: 'Fysieke fitheid, uithoudingsvermogen, energieniveau en levenskracht. Wordt binnen DHLS direct gestimuleerd door de rugbytrainingen.',
        levels: [
          'Chronische of acute fysieke crisis die functioneren volledig onmogelijk maakt.',
          'Ernstige verminderde vitaliteit of lichamelijke problematiek; intensieve medische zorg vereist.',
          'Beperkte vitaliteit; fysiek functioneren kost veel moeite en beperkt dagelijkse taken.',
          'Goede lichamelijke conditie, incidentele milde fysieke klachten zonder belemmering.',
          'Uitstekende fysieke vitaliteit; energiek en lichamelijk volledig belastbaar.'
        ]
      },
      {
        icon: Users,
        title: 'Sociaal Netwerk & Acceptatie',
        desc: 'Zich geaccepteerd en thuis voelen in een groep. Het hebben van positieve, betekenisvolle relaties en het ervaren van een gevoel van community.',
        levels: [
          'Volledig sociaal geïsoleerd of uitsluitend omringd door een destructief netwerk (criminaliteit/verslaving).',
          'Nauwelijks betrouwbare contacten; sterk wantrouwen en eenzaamheid domineren.',
          'Beperkt netwerk van steun; prille pogingen tot gezonde contacten buiten het destructieve circuit.',
          'Ondersteunend en positief netwerk aanwezig, waaronder contact met teamgenoten of coaches.',
          'Hechte, gezonde en stabiele relaties; voelt zich volledig lid van een positieve gemeenschap.'
        ]
      },
      {
        icon: UserCheck,
        title: 'Maatschappelijke participatie & Sociale Steun',
        desc: 'Deelnemen aan het sociale verkeer en betekenisvolle bijdragen leveren. Het durven vragen én kunnen ontvangen van hulp en steun.',
        levels: [
          'Geen enkele maatschappelijke aansluiting; weigert of is niet in staat tot maatschappelijk contact.',
          'Zeer passief; drempel tot maatschappelijke participatie is extreem hoog wegens angst of schaamte.',
          'Eerste stappen gezet richting maatschappelijk initiatief; zoekt incidenteel zelfstandig ondersteuning.',
          'Neemt actief deel aan burgerinitiatieven, clubs, sportverenigingen of de DHLS-community.',
          'Volledig geïntegreerd; fungeert zelf als positieve steunpilaar of rolmodel voor anderen.'
        ]
      },
      {
        icon: Heart,
        title: 'Welbevinden & Eigenwaarde',
        desc: 'Kwaliteit van leven, zelfacceptatie, intrinsieke motivatie en geloof in eigen kunnen. Tevredenheid met de huidige levensrichting.',
        levels: [
          'Diepe somberheid, geen perspectief of uitzichtloosheid; extreem lage eigenwaarde.',
          'Ernstige twijfel aan eigen kunnen en waarde; passieve, moedeloze houding.',
          'Wisselend welbevinden; begint te geloven in mogelijke vooruitgang, maar wankel.',
          'Positief zelfbeeld en geloof in de toekomst; gemotiveerd om barrières te doorbreken.',
          'Hoog gevoel van levensgeluk, tevredenheid en sterke autonomie over het eigen levenspad.'
        ]
      },
      {
        icon: Shield,
        title: 'Gezondheidsvaardigheden & Gewoontes',
        desc: 'In staat zijn om informatie over gezondheid te begrijpen en toe te passen. Gezonde dagelijkse routines en helpende gedragspatronen.',
        levels: [
          'Compleet destructieve gewoontes (ernstig middelenmisbruik, verwaarlozing van basisverzorging).',
          'Slechte leefstijlkeuzes domineren; geen kennis of kunde om gezonde keuzes te maken.',
          'Bewust van destructieve patronen; probeert met hulp een gezondere leefstijl op te bouwen.',
          'Gezonde dagelijkse gewoontes (structuur, beweging, gezonde voeding); herkent terugvalgedrag.',
          'Volledige regie over leefstijl en vitaliteit; herkent, voorkomt en stuurt risicogedrag zelfstandig bij.'
        ]
      }
    ]
  },
  {
    category: 'Aanvullende DHLS-Module — Praktisch & Structureel (Hard)',
    color: 'border-orange-500/30 bg-orange-500/5 text-orange-600',
    badgeColor: 'bg-orange-500/10 text-orange-700',
    items: [
      {
        icon: Landmark,
        title: 'Financiën & Schuldenvrijheid',
        desc: 'Financieel overzicht, schuldenbeheer en inkomenszekerheid. Het hebben van voldoende rust om niet dagelijks in overlevingsmodus te verkeren.',
        levels: [
          'Acute financiële crisis; actieve loonbeslagen, geen inkomstenbron of problematische schulden zonder beheer.',
          'Grote, onbeheersbare schuldenlast; brieven worden niet geopend, geen contact met crediteuren.',
          'Schuldenregeling is opgestart of stabiel onder bewind; milde rust maar beperkte bestedingsruimte.',
          'Financieel stabiel met beheersbare, lopende afbetalingen of stabiele bijstand/inkomen; overzicht is terug.',
          'Volledig schuldenvrij, financieel zelfredzaam en in staat om te sparen of buffers op te bouwen.'
        ]
      },
      {
        icon: Home,
        title: 'Huisvesting & Woonsituatie',
        desc: 'Stabiliteit en veiligheid van de woning. Een dak boven het hoofd vormt de fundamentele basis voor verdere verandering.',
        levels: [
          'Dak- of thuisloos; verblijf in crisisopvang, op straat of wisselende slaapplekken bij vrienden.',
          'Dreigende huisuitzetting of extreem onveilige/onstabiele woonsituatie.',
          'Tijdelijk gehuisvest (begeleid wonen, maatschappelijke opvang of tijdelijke kamer) met perspectief.',
          'Stabiele, veilige huurwoning of vaste kamervoorziening; eigen persoonlijke leefruimte is gegarandeerd.',
          'Duurzame, veilige en zelfstandige woonsituatie met volledige rust en woongarantie.'
        ]
      },
      {
        icon: Scale,
        title: 'Justitie & Reclassering',
        desc: 'Aanraking met politie of justitie, lopende reclasseringstrajecten en het risico op delinquent of recidiverend gedrag.',
        levels: [
          'Actief betrokken bij criminaliteit; lopende gevangenisstraf of directe dreiging van detentie.',
          'Intensief reclasseringstoezicht wegens hoog recidiverisico en recente delicten.',
          'Lopend, stabiel toezicht of taakstraf; constructieve werkhouding richting reclasseringsambtenaar.',
          'Nazorg-fase of toezicht succesvol afgerond; geen nieuwe politiecontacten of criminele associaties.',
          'Volledig los van justitie en reclassering; geen criminele activiteiten of risico-omgevingsfactoren.'
        ]
      },
      {
        icon: Briefcase,
        title: 'Dagbesteding & Werk',
        desc: 'Zinvolle invulling van de dag (bijv. werk, opleiding of vrijwilligerswerk), het hebben van een structuur en dagelijks ritme.',
        levels: [
          'Geen enkele dagbesteding of structuur; passief en sociaal geïsoleerd thuiszittend.',
          'Incidentele klussen of onregelmatige activiteiten zonder verplichting of continuïteit.',
          'Vaste dagbesteding (zoals vrijwilligerswerk of participatiebaan) voor minimaal 2 dagen per week.',
          'Stabiele leerwerkbaan, parttime werk of reguliere beroepsopleiding met vast ritme.',
          'Volledig aan het werk (fulltime leerbaan of vaste baan) of volgt een succesvolle voltijdstudie.'
        ]
      }
    ]
  }
];

export default function DomainsModal({ onClose }: DomainsModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
      id="domains-modal-overlay"
    >
      <div
        className="bg-[#F9F7F2] border-2 border-[#1A1A1A] text-[#1A1A1A] rounded-none shadow-[6px_6px_0px_#1A1A1A] max-w-4xl w-full my-8 max-h-[85vh] flex flex-col focus:outline-none"
        onClick={e => e.stopPropagation()}
        id="domains-modal-content"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b-2 border-[#1A1A1A] bg-white">
          <div>
            <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 bg-[#FF6321]/15 text-[#FF6321] border border-[#FF6321]/35 font-bold">
              CPHQ 2.0 & DHLS-Module
            </span>
            <h2 className="text-xl md:text-2xl font-black mt-1">De 10 Domeinen van Zelfredzaamheid</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border-2 border-[#1A1A1A] hover:bg-[#FF6321] hover:text-white transition-colors cursor-pointer"
            title="Sluit modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#F9F7F2]">
          <div className="text-xs leading-relaxed max-w-2xl opacity-80 border-l-2 border-[#FF6321] pl-3 py-1">
            Het herontworpen meetinstrument is geënt op de <strong>CPHQ 2.0 (Context-Sensitive Positive Health Questionnaire)</strong>, uitgebreid met vier cruciale 'harde' leefgebieden uit de ZRM-methodologie. Elk domein wordt gescoord op een schaal van 1 (meest kwetsbaar) t/m 5 (volledig zelfredzaam).
          </div>

          {DOMAINS_INFO.map((cat, catIdx) => (
            <div key={catIdx} className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#1A1A1A] border-b-2 border-[#1A1A1A] pb-1.5 flex items-center justify-between">
                <span>{cat.category}</span>
                <span className="text-[10px] font-mono font-medium opacity-50 font-normal">{cat.items.length} domeinen</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={itemIdx}
                      className="bg-white border-2 border-[#1A1A1A] p-4 flex flex-col justify-between shadow-[2px_2px_0px_#1A1A1A]"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-8 h-8 rounded-none border border-[#1A1A1A] flex items-center justify-center shrink-0`}>
                            <Icon className="w-4 h-4 text-[#1A1A1A]" />
                          </div>
                          <h4 className="text-xs font-black uppercase tracking-tight leading-tight">{item.title}</h4>
                        </div>
                        <p className="text-[11px] leading-relaxed opacity-75 mb-4">{item.desc}</p>
                      </div>

                      {/* Levels expansion */}
                      <div className="border-t border-[#1A1A1A]/10 pt-3">
                        <p className="text-[9px] font-mono uppercase tracking-widest opacity-40 font-bold mb-2">
                          Scoringsindicator (Niveau 1 t/m 5)
                        </p>
                        <div className="space-y-1.5">
                          {item.levels.map((lvl, lIdx) => (
                            <div key={lIdx} className="text-[10px] leading-snug flex items-start gap-1.5">
                              <span className="font-mono font-bold text-[#FF6321] shrink-0 w-3">{lIdx + 1}:</span>
                              <span className="opacity-75">{lvl}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t-2 border-[#1A1A1A] bg-white flex justify-between items-center text-[10px] font-mono text-[#1A1A1A]/50">
          <span>Stichting De Harde Leerschool · Afstudeerstage 2026</span>
          <span>Rein Kessels · HAN University</span>
        </div>
      </div>
    </div>
  );
}
