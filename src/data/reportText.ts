/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BuyerPersona } from '../types';

export interface ReportSection {
  id: string;
  title: string;
  content: string[];
  bullets?: string[];
}

export interface ReportChapter {
  id: string;
  title: string;
  subTitle?: string;
  icon: string;
  sections: ReportSection[];
}

export const reportChapters: ReportChapter[] = [
  {
    id: 'cover',
    title: 'Over dit project',
    icon: 'FileText',
    sections: [
      {
        id: 'title',
        title: 'Wat is dit?',
        content: [
          'Dit is het interactieve projectrapport bij het afstudeerstage-onderzoek van Rein Kessels aan de HAN University of Applied Sciences, uitgevoerd in opdracht van Stichting De Harde Leerschool (DHLS) te Nijmegen.',
          'Het project draait om één centrale vraag: hoe bewijs je dat een interventieprogramma écht werkt? Niet als gevoel, niet als anekdote — maar als harde, herhaalbare meting die standhoudt bij subsidieaanvragen, gemeentegesprekken en wetenschappelijke toetsing.',
          'Het resultaat is een volledig nieuw digitaal meetinstrument dat de zelfredzaamheid van DHLS-deelnemers meet op 10 leefgebieden, van mentale ontspanning tot justitiecontact. Inclusief een geautomatiseerd kostenbesparingsmodel dat de maatschappelijke waarde van het DHLS-programma in euro\'s uitdrukt.'
        ],
        bullets: [
          'Auteur: Rein Kessels',
          'Onderwijsinstelling: HAN University of Applied Sciences',
          'Begeleider: Arnoud van de Ven',
          'Opdrachtgever: Wouter Borghs, Programmamanager DHLS',
          'Datum: Mei 2026 — Schooljaar 2025/2026'
        ]
      },
      {
        id: 'hoe-gebruiken',
        title: 'Hoe gebruik je dit rapport?',
        content: [
          'Rechts zie je drie interactieve tools. Het Spinnenweb-diagram laat zien hoe deelnemers groeien op alle 10 domeinen tussen hun start (T0) en hun eindmeting (T1). Je kunt wisselen tussen drie buyer personas — Jelle de Boer, Sarah Visser en Marco Rossi — elk met een eigen achtergrond en problematiek.',
          'Het Kostenrekenmodel berekent live hoeveel maatschappelijke kosten er bespaard worden als iemand op een domein verbetert. Dit is het model dat DHLS kan gebruiken in gesprekken met gemeenten en financiers.',
          'De Afbeeldingenreeks kun je vullen met eigen materiaal: foto\'s van trainingen, sessies of andere visuele onderbouwing van het project.',
          'Wil je zelf met de data aan de slag? Via het Analyse Dashboard (tool 2) kun je resultaten verwerken tot grafieken en data-analyses, exporteerbaar naar PDF.'
        ]
      }
    ]
  },
  {
    id: 'inleiding',
    title: 'Hfdst. 1 — De Paradox',
    subTitle: 'Aanleiding & Projectopdracht',
    icon: 'Info',
    sections: [
      {
        id: 'aanleiding',
        title: 'Een organisatie die werkt maar het niet kan bewijzen',
        content: [
          'Stichting De Harde Leerschool staat voor een paradox. De organisatie begeleidt jaarlijks circa tweehonderd jongvolwassenen met een grote afstand tot de arbeidsmarkt en boekt daarin aantoonbare resultaten (BMC, 2025). Deelnemers vinden werk, stabiliseren hun leefomstandigheden en doorbreken patronen die hen jarenlang in een kwetsbare positie hielden. Toch kan DHLS die effectiviteit niet objectief documenteren. Het ontbreekt de organisatie aan een meetinstrument waarmee de impact van haar programma structureel, betrouwbaar en herhaalbaar in kaart wordt gebracht.',
          'En dat is geen bijzaak meer. Gemeenten en financiers stellen in toenemende mate als harde eis dat organisaties in het sociaal domein aantoonbare, vergelijkbare resultaten kunnen overleggen. Maar die unieke waarde moet meetbaar worden gemaakt — voor de organisatie zelf, zodat coaches op basis van data het programma kunnen bijsturen, én richting gemeenten en financiers die in toenemende mate om aantoonbare resultaten vragen (BMC, 2025).'
        ]
      },
      {
        id: 'urgentie',
        title: 'De maatschappelijke urgentie',
        content: [
          'Het aantal jongvolwassenen zonder werk én zonder opleiding stijgt nationaal al meerdere jaren. Eind maart 2025 ontvingen 41.500 jongvolwassenen tot 27 jaar een bijstandsuitkering — het negende kwartaal op rij dat dit aantal steeg ten opzichte van een jaar eerder (CBS, 2025). Tegelijkertijd weten we dat vroeg ingrijpen de maatschappelijke kosten op de lange termijn drastisch verlaagt: elke geïnvesteerde euro in re-integratie levert gemiddeld €3,15 aan maatschappelijke baten op (De Nooij, 2024).',
          'DHLS zit precies op die vroege interventiepositie. Het programma bereikt mensen die voor andere hulpverlening te weinig gemotiveerd, te wantrouwend of te ver heen zijn. De outreachende, persoonlijke en niet-oordelende aanpak van DHLS sluit aan bij wat onderzoek aantoont als de enige effectieve ingang voor deze doelgroep (Kennis & Eimers, 2017). Maar die unieke waarde moet meetbaar worden gemaakt — anders staat DHLS met lege handen bij subsidieaanvragen.'
        ]
      },
      {
        id: 'organisatie',
        title: 'Stichting De Harde Leerschool',
        content: [
          'DHLS is geen gewone sociale organisatie. Het is een bewust onconventionele aanpak: een intensief tienwekenprogramma dat rugby combineert met de Op Eigen Kracht-methodiek (OEK). De doelgroep is formeel 18 tot 30 jaar — in de praktijk tot circa 50 jaar — en bestaat uit mensen die vastlopen op meerdere leefgebieden tegelijk (DHLS, 2025; BMC, 2025). In 2020 ontving DHLS de erkenning als Erkende Sport- en Beweeginterventie — een keurmerk dat de methodologische kwaliteit van het programma bevestigt (DHLS, 2025).'
        ]
      },
      {
        id: 'opdracht',
        title: 'De projectopdracht',
        content: [
          'De opdracht is geformuleerd door Wouter Borghs, programmamanager bij DHLS. Zijn vraag is concreet: hoe kunnen we de impact van ons programma beter en betrouwbaarder in kaart brengen? Niet voor onszelf — DHLS weet zelf dat het werkt — maar om het te kunnen aantonen aan de buitenwereld.',
          'Dat heeft twee dimensies. Intern: coaches willen op basis van betrouwbare uitkomstdata het programma kunnen bijsturen. Extern: de cijfers moeten DHLS in staat stellen haar interventie aantoonbaar te onderbouwen richting gemeenten en subsidiegevers.',
          'Op basis van eigen literatuuronderzoek, gesprekken met coaches en analyse van de doelgroep heeft de projectuitvoerder zelfstandig bepaald welk meetinstrument het meest passend is en hoe de aanvullende module eruit moet zien.'
        ]
      },
      {
        id: 'vragen',
        title: 'Projectvraag & deelvragen',
        content: [
          '"Op welke wijze kan DHLS de impact van haar interventieprogramma op de zelfredzaamheid van deelnemers structureel en betrouwbaar meten, en hoe vertaalt dit zich naar een praktisch inzetbaar digitaal meetinstrument?"'
        ],
        bullets: [
          'DV1: Welke beperkingen kent het bestaande meetinstrumentarium van DHLS, en in hoeverre sluit dit aan bij de visie, het beleid en maatschappelijke ontwikkelingen?',
          'DV2: Wie zijn de relevante stakeholders en wat zijn de kenmerken en begeleidingsbehoeften van de doelgroep?',
          'DV3: Welk meetinstrument vormt de meest geschikte basis voor het herontwerp?',
          'DV4: Hoe is de aanvullende DHLS-module opgebouwd?',
          'DV5: Op welke wijze is het instrument technisch gerealiseerd, en wat zijn de succes- en faalfactoren voor succesvolle implementatie?',
          'DV6: In hoeverre voldoet het gerealiseerde instrument aan de gestelde eisen, en welke aanbevelingen gelden voor de vervolgfase?'
        ]
      }
    ]
  },
  {
    id: 'analyse',
    title: 'Hfdst. 2 — De Analyse',
    subTitle: 'Doelgroep, ZRM & Stakeholders',
    icon: 'TrendingUp',
    sections: [
      {
        id: 'bestaande-situatie',
        title: 'Wat gebruikte DHLS al?',
        content: [
          'De OEK-meting is een intern instrument dat de beleving en zelfbeoordeling van deelnemers in kaart brengt op basis van de OEK-methodiek. Het levert kwalitatieve inzichten op, maar is niet psychometrisch gevalideerd en daarmee niet geschikt voor wetenschappelijk verantwoorde effectmeting (BMC, 2025).',
          'Daarnaast wordt de Zelfredzaamheidsmatrix (ZRM) van GGD Amsterdam ingezet — dé gouden standaard in het sociaal domein. De ZRM dekt dertien leefgebieden en is wetenschappelijk gevalideerd (Lauriks et al., 2013). Maar er zitten twee fundamentele problemen. Ten eerste moet de ZRM door een professional worden ingevuld op basis van een individueel gesprek en observaties — dat kost per deelnemer aanzienlijke coach-tijd. Ten tweede maakt diezelfde werkwijze het instrument ongeschikt voor zelfstandige invulling door deelnemers na afloop van het programma (Flinterman et al., 2019).',
          'Het resultaat? DHLS kan T0 (instroom) en T1 (uitstroom) nog wel meten, maar T2 en T3 — de follow-up na 6 en 12 maanden — zijn praktisch onmogelijk. En juist die follow-up is het bewijs dat de verandering blijvend is (BMC, 2025).'
        ]
      },
      {
        id: 'doelgroep',
        title: 'Doelgroepanalyse',
        content: [
          'De doelgroep van DHLS is wat professionals een "multi-problemdoelgroep" noemen: mensen die op meerdere leefgebieden tegelijk vastlopen. Dat zijn niet alleen praktische problemen als schulden of werkloosheid — het zijn problemen die elkaar versterken en samen een patroon vormen dat extreem moeilijk te doorbreken is (BMC, 2025).',
          'Ruim 100.000 jongeren in Nederland hebben geen werk en volgen geen opleiding (CBS, 2024). Eind maart 2025 ontvingen 41.500 jongvolwassenen tot 27 jaar een bijstandsuitkering — het negende kwartaal op rij dat dit aantal steeg (CBS, 2025). Daarbinnen vormen ex-gedetineerden een omvangrijke subgroep: jaarlijks keren circa 23.000 mensen na detentie terug in de samenleving, van wie 80% geen dagbesteding heeft en bijna 50% binnen twee jaar opnieuw in contact komt met justitie (WODC, 2024).',
          'Voor een vragenlijst betekent dit concrete ontwerpeisen: maximaal taalniveau A2 tot B1, korte en concrete vragen, geen klinisch of beoordelend taalgebruik, een beperkte antwoordschaal, en volledige mobielvriendelijkheid — want veel deelnemers hebben geen laptop maar wél een smartphone (Pharos, 2022).'
        ]
      },
      {
        id: 'stakeholders',
        title: 'Stakeholderanalyse',
        content: [
          'Via de macht/belang-matrix van Mendelow (1991) zijn vijf stakeholders systematisch in kaart gebracht. De positionering bepaalt per partij welke communicatie- en betrokkenheidsstrategie passend is.',
          'DHLS en Wouter Borghs als programmamanager hebben de hoogste invloed én het hoogste belang — zij zijn de primaire opdrachtgever en bepalen of het instrument structureel wordt ingebed in de werkwijze. Gemeenten en financiers hebben formeel hoge macht: zij bepalen de subsidiekraan. Hun belang zit niet in het ontwerp, maar in de uitkomsten — impactdata die zij kunnen verantwoorden aan hun eigen bestuur. De deelnemers zelf hebben weinig formele macht maar het hoogste persoonlijke belang: hun behoeften sturen het ontwerp. Hello\'s, het registratieplatform dat DHLS gebruikt, is de toekomstige technische partner voor geautomatiseerde datastromen. Werknemers in het sociaal domein fungeren als verwijzers en hebben een middelgroot belang bij de effectiviteit van het programma.',
          'De volledige stakeholderanalyse inclusief macht/belang-matrix is hieronder ingebedde te bekijken.'
        ]
      }
    ]
  },
  {
    id: 'ontwerp',
    title: 'Hfdst. 3 — Het Ontwerp',
    subTitle: 'Instrumentkeuze & Methodiek',
    icon: 'Layers',
    sections: [
      {
        id: 'selectie',
        title: 'Waarom de CPHQ 2.0?',
        content: [
          'Voor het herontwerp zijn vier bestaande instrumenten systematisch vergeleken op zeven selectiecriteria: zelfinvulbaarheid, psychometrische validatie, taalniveau (A2/B1), domeinbreedte, digitale afneembaarheid, belasting voor de deelnemer en aansluiting bij het zelfredzaamheidsvocabulaire in het sociaal domein (Pharos, 2022).',
          'ZRM: scoort sterk op domeinbreedte en beleidsaansluiting, maar valt af op zelfinvulbaarheid: de ZRM wordt door een professional ingevuld op basis van observaties en een gesprek (Flinterman et al., 2019).',
          'IPH-17: neemt betekenisgeving mee maar blijft beperkt in contextuele factoren, waardoor structurele belemmeringen zoals financiële onzekerheid onderbelicht blijven (Van Vliet et al., 2021).',
          'PH-22: voegt enkele contextuele elementen toe, maar is minder breed inzetbaar wanneer omgevingsfactoren een centrale rol spelen (Nahar-van Venrooij et al., 2025).',
          'CPHQ 2.0: voldoet als enige aan alle zeven criteria. Psychometrisch gevalideerd, ontwikkeld in co-creatie met burgers uit een lage sociaaleconomische positie, geschikt voor digitale zelfrapportage op B1-niveau (Bloemen-van Gurp et al., 2025; Dubbeldeman et al., 2025). Met 20 items dekt de CPHQ 2.0 acht domeinen: mentale ontspanning, sociale acceptatie, welbevinden, vitaliteit, sociale steun, financiële middelen, gezondheidsvaardigheden en mobiliteit.'
        ]
      },
      {
        id: 'dhls-module',
        title: 'De aanvullende DHLS-module',
        content: [
          'Ook de CPHQ 2.0 dekt de harde zelfredzaamheidsdomeinen niet volledig. Tegelijkertijd waren dit precies de domeinen die in de bestaande instrumenten ontbraken of onvoldoende uitgewerkt waren. Bovendien zijn het feitelijke, objectief bevraagbare onderdelen — anders dan subjectieve beleving zijn ze direct uitvraagbaar en goed kwantificeerbaar. Dat maakte ze geschikt voor een aanvullende module met gesloten vragen.',
          'De DHLS-module dekt acht domeinen: werk, opleiding en dagbesteding, huisvesting, uitkeringen en maatschappelijke ondersteuning, zorggebruik, politie en justitie, sport en bewegen, instrumentele ADL en gewoontes en gedragingen. De scoringslogica is bewust gealigneerd met de Zelfredzaamheidsmatrix, zodat coaches historische ZRM-data kunnen vergelijken met de nieuwe metingen (Lauriks et al., 2013).',
          'Bij het domein justitie zijn de vragen bewust niet-stigmatiserend geformuleerd: het gaat om de situatie, niet om het oordeel. Scores van de CPHQ 2.0 en de DHLS-module worden nooit samengevoegd — zij meten respectievelijk de subjectieve beleving en de optionele objectieve leefsituatie van de deelnemer.'
        ]
      },
      {
        id: 'herhaaldmeetontwerp',
        title: 'Het herhaaldmeetontwerp: T0 tot T3',
        content: [
          'Het instrument is ontworpen voor vier meetmomenten. T0 is de startmeting vóór het programma. T1 is de eindmeting na tien weken. T2 en T3 zijn follow-upmetingen na respectievelijk zes en twaalf maanden. Dit herhaaldmeetontwerp maakt niet alleen de directe impact zichtbaar, maar ook de duurzaamheid ervan.',
          'De kracht zit in T2 en T3: die kunnen deelnemers zelfstandig invullen via hun smartphone — zonder dat een coach aanwezig hoeft te zijn. Dat was met de ZRM onmogelijk. Met dit instrument wordt voor het eerst de vraag beantwoord: blijft de verandering ook na de programmaperiode bestaan? (BMC, 2025).'
        ]
      },
      {
        id: 'rekenmodel-theorie',
        title: 'Het kostenrekenmodel',
        content: [
          'Om de impact richting gemeenten te vertalen in financiële taal, berekent de applicatie indicatieve maatschappelijke kostenbesparingen per deelnemer. Het model combineert NZa-tarieven (2026), DSW-tarieven (2024–2025) en RIVM Kosten van Ziekten-data (2019). Voor sport en bewegen wordt de maatschappelijke welzijnswaarde berekend via de Wellbeing Valuation Approach (Schoemaker, 2025).',
          'Het model is uitdrukkelijk indicatief: het illustreert de orde van grootte van maatschappelijke besparingen en produceert geen exacte bedragen. Onderzoek naar re-integratietrajecten laat zien dat elke geïnvesteerde euro gemiddeld €3,15 aan maatschappelijke baten oplevert (De Nooij, 2024) — het kostenrekenmodel maakt dit voor DHLS concreet per domein en per deelnemer.'
        ]
      }
    ]
  },
  {
    id: 'implementatie',
    title: 'Hfdst. 4 & 5 — Realisatie & Advies',
    subTitle: 'Techniek, Risico\'s & Aanbevelingen',
    icon: 'CheckCircle',
    sections: [
      {
        id: 'technisch',
        title: 'Wat is er technisch opgeleverd?',
        content: [
          'De technische oplevering bestaat uit drie afzonderlijke webapplicaties die samenwerken als één systeem. Het instrument is gerealiseerd als open-source webapplicatie, gehost via Netlify en beheerd via Git-versiebeheer — zonder licentiekosten en volledig onderhoudbaar door DHLS of een eenvoudige webbeheerder.',
          'De invultool is een stap-voor-stap digitale vragenlijst voor deelnemers. Grote touch-targets, helder taalgebruik op A2/B1-niveau, volledig mobielvriendelijk. Deelnemers doorlopen de tien domeinen en slaan hun antwoorden automatisch op gekoppeld aan hun deelnemersnummer en meetmoment.',
          'De analysetool is een dashboard voor coaches. Zij kunnen hierin individuele deelnemers opzoeken, de spinnenwebdiagrammen van T0 tot en met T3 naast elkaar leggen en de berekende maatschappelijke besparingen per deelnemer aflezen. Exporteerbaar naar PDF voor rapportages aan gemeenten.',
          'De Supabase-backend slaat alle metingen veilig op in een PostgreSQL-database en vervangt de eerder gebruikte Google Sheets-oplossing. De backend maakt opslag en analyse van meetdata voor meerdere deelnemers en meetmomenten tegelijk mogelijk.'
        ]
      },
      {
        id: 'risicos',
        title: 'Wat zijn de risico\'s?',
        content: [
          'De voornaamste risico\'s liggen niet op het technische vlak — de applicatie werkt. Ze liggen in de adoptie door mensen en organisaties.',
          '1. Niet-adoptie door coaches. Wanneer coaches het instrument niet structureel integreren in hun werkwijze, zal het instrument geen data genereren, ongeacht de kwaliteit van het ontwerp.',
          '2. Lage respons op T2 en T3. Deelnemers zijn na afronding niet langer gebonden aan de programmastructuur. Een laagdrempelige mobielvriendelijke interface verlaagt de drempel, maar actieve herinnering via een bestaand communicatiekanaal verhoogt de respons.',
          '3. Technische integratie met Hello\'s. Structurele implementatie vereist uiteindelijk integratie in het bestaande informatiesysteem van DHLS.',
          '4. Ontbrekende formele validatie van de DHLS-module. Het CPHQ 2.0 is psychometrisch gevalideerd, maar de aanvullende DHLS-module is dat nog niet. Formele validatie is een noodzakelijke vervolgstap.'
        ]
      },
      {
        id: 'aanbeveling',
        title: 'Conclusie & aanbevelingen voor DHLS',
        content: [
          'Het herontworpen instrument verenigt wetenschappelijke validiteit via het CPHQ 2.0, ZRM-vergelijkbaarheid via de DHLS-module en de praktische reality van een organisatie zonder grote data-afdeling. Het is ontworpen om duurzaam te zijn: laag in onderhoud, hoog in bruikbaarheid.',
          'De drie meest urgente aanbevelingen voor de vervolgfase zijn:',
          '1. Verplicht T0 en T1 in het intake- en afsluitingsprotocol. Niet als optie, maar als standaard werkwijze. Dit is de absolute voorwaarde voor bruikbare data.',
          '2. Valideer de DHLS-module psychometrisch. Het CPHQ 2.0 is al gevalideerd, maar de acht harde domeinen van de DHLS-module moeten nog formeel worden getest op betrouwbaarheid en interne consistentie.',
          '3. Integreer met Hello\'s. Een directe koppeling met het bestaande registratieplatform van DHLS vermindert dubbele registratie voor coaches en maakt geautomatiseerde datastromen mogelijk.'
        ]
      }
    ]
  }
];

export const buyerPersonas: BuyerPersona[] = [
  {
    id: 'jelle',
    name: 'Jelle de Boer',
    age: 26,
    tags: ['Ex-gedetineerde', 'Financiële schulden', 'Geen dagstructuur'],
    situation: 'Jelle de Boer — ex-gedetineerde met lopend reclasseringstoezicht, schulden en geen dagstructuur. Relevante domeinen: justitie, dagbesteding, huisvesting, financiën.',
    instroom: 'Doorverwezen door reclasseringsmedewerker. Staat open voor het programma maar heeft diep wantrouwen richting formele instanties en hulpverleners.',
    belemmeringen: [
      'Beperkte schrijf- en leesvaardigheid (ca. A2)',
      'Geen structuur in dagindeling — slaapt tot laat, nauwelijks routine',
      'Lage digitale vaardigheden maar heeft wel smartphone'
    ],
    relevanteDomeinen: ['Justitie', 'Dagbesteding', 'Huisvesting', 'Financiën'],
    ontwerpBelang: 'Instrument moet extreem kort aanvoelen en niet-beoordelend zijn. Justitievragen mogen niet stigmatiserend zijn. Lange teksten of academisch taalgebruik zorgen voor directe afhakers.',
    avatarSeed: 'jelle',
    scores: [
      { name: 'ontspanning', label: 'Mentale Ontspanning', t0: 41, t1: 50, t2: 50, t3: 50, description: 'Voelde constante angst en alertheid vanuit zijn detentietijd. Door rugbytraining en ademhalingstechnieken uit de OEK-methodiek binnengekomen in rustiger vaarwater.' },
      { name: 'acceptatie', label: 'Sociale Acceptatie', t0: 25, t1: 50, t2: 50, t3: 50, description: 'Voelde zich breed uitgestoten door zijn strafblad. Voelt zich nu geaccepteerd door teamgenoten — voor het eerst zonder dat hij zijn verleden hoeft te verbergen.' },
      { name: 'welbevinden', label: 'Welbevinden', t0: 41, t1: 50, t2: 50, t3: 50, description: 'Lage eigenwaarde bij instroom. Via de OEK-methodiek heeft hij geleerd zijn eigen gedrag bewust te sturen en zichzelf niet langer te definiëren via zijn verleden.' },
      { name: 'vitaliteit', label: 'Vitaliteit', t0: 57, t1: 50, t2: 50, t3: 50, description: 'Rugby heeft zijn fysieke conditie en mentale weerbaarheid verhoogd. Dit is het domein waar de rugbycomponent van DHLS het meeste directe effect heeft.' },
      { name: 'steun', label: 'Sociale Steun', t0: 25, t1: 50, t2: 50, t3: 50, description: 'Geen enkel betrouwbaar sociaal netwerk bij start — alleen mensen in het hetzelfde circuit. Nu onderdeel van de DHLS-community en voor het eerst in contact met positieve rolmodellen.' },
      { name: 'gezondheid', label: 'Gezondheidsvaardigheden', t0: 0, t1: 100, t2: 100, t3: 100, description: 'Wist niet hoe hij hulp moest zoeken of vragen. Heeft geleerd hulp te accepteren als teken van kracht, niet van zwakte.' },
      { name: 'financien', label: 'Financiën', t0: 0, t1: 60, t2: 60, t3: 60, description: 'Actieve loonbeslagen en volledig overzichtverlies bij instroom. Nu gekoppeld aan schuldhulpverlening en stabiele bijstand met betalingsafspraken.' },
      { name: 'huisvesting', label: 'Huisvesting', t0: 100, t1: 100, t2: 100, t3: 100, description: 'Zwierf tussen adres van moeder en vrienden — instabiele woonsituatie. Nu een stabiele kamer via sociaal verhuurbureau, eerste vaste basis in jaren.' },
      { name: 'justitie', label: 'Justitie', t0: 38, t1: 88, t2: 88, t3: 88, description: 'Actief reclasseringstoezicht met hoog recidiverisico bij instroom. Reclasseringstoezicht is inmiddels succesvol afgerond.' },
      { name: 'dagbesteding', label: 'Dagbesteding', t0: 0, t1: 75, t2: 75, t3: 75, description: 'Geen herkenbare dagstructuur bij instroom. Uitgestroomd naar een leerwerkbaan in de groenvoorziening — zijn eerste betaalde werk in jaren.' }
    ]
  },
  {
    id: 'sarah',
    name: 'Sarah Visser',
    age: 21,
    tags: ['Voortijdig schoolverlater', 'Angstklachten', 'Sociaal geïsoleerd'],
    situation: 'Sarah Visser — voortijdig schoolverlater met angstklachten, bijstandsafhankelijk en sociaal geïsoleerd. Relevante domeinen: geestelijke gezondheid, sociaal netwerk, maatschappappelijke participatie.',
    instroom: 'Doorverwezen door haar gemeentelijke casemanager. Aarzelt enorm over deelname maar wil dolgraag iets veranderen aan haar isolement.',
    belemmeringen: [
      'Angstklachten verlagen motivatie voor deelname aan groepen sterk',
      'Diepe schaamte rondom het toegeven van problemen',
      'Negatieve ervaringen met eerdere hulpverlening'
    ],
    relevanteDomeinen: ['Geestelijke gezondheid', 'Sociaal netwerk', 'Maatschappelijke participatie'],
    ontwerpBelang: 'Taalgebruik moet zeer toegankelijk en absoluut niet-klinisch zijn. Het instrument mag niet aanvoelen als een toets of diagnostisch interview — ze haakt dan direct af.',
    avatarSeed: 'sarah',
    scores: [
      { name: 'ontspanning', label: 'Mentale Ontspanning', t0: 10, t1: 50, t2: 50, t3: 50, description: 'Begon met regelmatige paniekaanvallen en extreme overprikkeling. De sportcomponent heeft haar een uitlaatklep gegeven die ze eerder miste.' },
      { name: 'acceptatie', label: 'Sociale Acceptatie', t0: 25, t1: 50, t2: 50, t3: 50, description: 'Diepe faalangst zorgde voor sociale terugtrekking. Voelt zich nu gerespecteerd en gehoord binnen het team — iets wat ze thuis of op school nooit heeft ervaren.' },
      { name: 'welbevinden', label: 'Welbevinden', t0: 10, t1: 50, t2: 50, t3: 50, description: 'Eenzaam en somber bij aanvang, negatief zelfbeeld. Nu hoopvoller over haar toekomst en actiever in het bouwen eraan.' },
      { name: 'vitaliteit', label: 'Vitaliteit', t0: 32, t1: 57, t2: 57, t3: 57, description: 'Fysiek sterker geworden door de trainingen. Dat lichamelijke zelfvertrouwen helpt haar om mentale drempels te overwinnen.' },
      { name: 'steun', label: 'Sociale Steun', t0: 25, t1: 50, t2: 50, t3: 50, description: 'Volledig sociaal isolement bij instroom. Via DHLS twee vriendschappen opgebouwd en durft weer naar buiten.' },
      { name: 'gezondheid', label: 'Gezondheidsvaardigheden', t0: 40, t1: 40, t2: 40, t3: 40, description: 'Is tijdens het programma gestart met reguliere psychologische begeleiding — iets wat ze daarvoor steeds uitstelde.' },
      { name: 'financien', label: 'Financiën', t0: 50, t1: 50, t2: 50, t3: 50, description: 'Had een sobere maar beheersbare bijstandsuitkering zonder grote schulden. Stabiel domein dat licht verbetert naarmate ze meer zelfregie ervaart.' },
      { name: 'huisvesting', label: 'Huisvesting', t0: 100, t1: 100, t2: 100, t3: 100, description: 'Zelfstandige sociale huurwoning was en blijft stabiel.' },
      { name: 'justitie', label: 'Justitie', t0: 50, t1: 25, t2: 25, t3: 25, description: 'Geen justitieel verleden of enig risico — niet relevant voor haar traject.' },
      { name: 'dagbesteding', label: 'Dagbesteding', t0: 13, t1: 63, t2: 63, t3: 63, description: 'Zat maandenlang alleen thuis. Doet nu vrijwilligerswerk bij een buurthuis en begint volgend kwartaal aan een MBO-1 opleiding.' }
    ]
  },
  {
    id: 'marco',
    name: 'Marco Rossi',
    age: 41,
    tags: ['Langdurig werkloos', 'Verslavingsverleden', 'Begeleid wonen'],
    situation: 'Marco Rossi — langdurig werkloze met verslavingsverleden, woonachtig in een begeleid wonentraject. Relevante domeinen: financiën, dagbesteding, lichamelijke gezondheid.',
    instroom: 'Zelf aangemeld op aanraden van zijn persoonlijk begeleider. Heeft een hoge intrinsieke motivatie om zijn leven weer ritme en betekenis te geven — maar weinig geloof in zijn eigen kunnen.',
    belemmeringen: [
      'Laag zelfvertrouwen door zeven jaar werkloosheid en verslavingsgeschiedenis',
      'Sceptisch over hulpverlening door eerdere teleurstellingen en mislukte trajecten',
      'Conditie en gezondheid nog herstellende na jarenlange roofbouw'
    ],
    relevanteDomeinen: ['Financiën', 'Dagbesteding', 'Lichamelijke gezondheid'],
    ontwerpBelang: 'Follow-up metingen (T2 en T3) zijn voor Marco extra kritiek: ze volgen de duurzaamheid van zijn nuchterheid en leefstijlherstel, wat voor zowel hem persoonlijk als voor DHLS de belangrijkste uitkomstmaat is.',
    avatarSeed: 'marco',
    scores: [
      { name: 'ontspanning', label: 'Mentale Ontspanning', t0: 38, t1: 75, t2: 75, t3: 75, description: 'Nerveus en rusteloosheid door de vroege fase van herstel. Nu mentaal in balans, de fysieke rugbytrainingen zijn zijn anker geworden.' },
      { name: 'acceptatie', label: 'Sociale Acceptatie', t0: 46, t1: 71, t2: 71, t3: 71, description: 'Voelde zich afgeschreven door zijn leeftijd, zijn verleden en zijn langdurige inactiviteit. Is nu een trotse ambassadeur van het team — ook naar jongere deelnemers.' },
      { name: 'welbevinden', label: 'Welbevinden', t0: 100, t1: 100, t2: 100, t3: 100, description: 'Zijn geloof in eigen kunnen is het meest gegroeid van alle drie de persona\'s. Hij schaamt zich niet langer voor zijn verleden maar gebruikt het als kracht.' },
      { name: 'vitaliteit', label: 'Vitaliteit', t0: 63, t1: 75, t2: 75, t3: 75, description: 'Lichamelijk hersteld van de roofbouw door jarenlang alcoholgebruik. Rugby heeft zijn fysieke herstel versneld en zichtbaar gemaakt.' },
      { name: 'steun', label: 'Sociale Steun', t0: 75, t1: 75, t2: 75, t3: 75, description: 'Sociaal netwerk bestond nog volledig uit mede-gebruikers. Nu een gezonde, ondersteunende vriendengroep opgebouwd via DHLS.' },
      { name: 'gezondheid', label: 'Gezondheidsvaardigheden', t0: 100, t1: 100, t2: 100, t3: 100, description: 'Lange-termijn focus op nuchterheid, gezonde voeding en bewust leefgedrag. Dit domein blijft groeien na het programma.' },
      { name: 'financien', label: 'Financiën', t0: 25, t1: 50, t2: 50, t3: 50, description: 'Saneringstraject loopt stabiel door. Vaste betalingsafspraken worden keurig nagekomen — voor het eerst in jaren structuur in zijn financiën.' },
      { name: 'huisvesting', label: 'Huisvesting', t0: 50, t1: 88, t2: 88, t3: 88, description: 'Woonde in de begeleid-wonen vleugel. Stroomt binnenkort door naar een volledig zelfstandig appartement — een grote stap in zijn hersteltraject.' },
      { name: 'justitie', label: 'Justitie', t0: 50, t1: 75, t2: 75, t3: 75, description: 'Geen criminele activiteit, kleine preventieve nazorgcontacten die inmiddels volledig zijn afgerond.' },
      { name: 'dagbesteding', label: 'Dagbesteding', t0: 25, t1: 100, t2: 100, t3: 100, description: 'Zeven jaar inactief geweest. Via het DHLS-netwerk binnengekomen als logistiek medewerker — inmiddels vaste aanstelling voor drie dagen per week.' }
    ]
  }
];
