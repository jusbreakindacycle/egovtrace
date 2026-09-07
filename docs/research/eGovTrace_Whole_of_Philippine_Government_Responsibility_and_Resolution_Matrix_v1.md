# eGovTrace Whole-of-Philippine-Government Responsibility and Resolution Matrix v1

**Status:** Research-to-engineering handoff.  
**Date baseline:** 2026-09-08.  
**Repository role:** This is a research/strategy artifact under docs/research. It does not become authoritative engineering truth merely by being committed. Promotion into eGovTrace implementation must follow the repository rule: Research Evidence → Research Specification → Decision → Requirement → Implementation → Test.

## Executive finding

The Philippines should **not invent another national super-master-plan bureaucracy** for the flood, mobility, infrastructure and resilience problem.

Republic Act No. 12145, the Economy, Planning and Development Act, already reorganizes NEDA into the Department of Economy, Planning, and Development (DEPDev), establishes a long-term development framework, requires agencies to formulate sectoral infrastructure master plans responsive to that framework, and requires those plans to be consolidated and vetted by the Infrastructure Development Committee (InfraCom) into a **Comprehensive Infrastructure Development Master Plan (CIDMP)**. The initial long-term development framework is required to cover the period ending in 2050.

The operating architecture for this handoff is therefore:

> **Whole-of-Philippine-Government Responsibility and Resolution Matrix → agency/sector master plans → DEPDev/InfraCom CIDMP → budget/procurement/project execution → operations/maintenance → outcome measurement → continuous revision**

The role of this matrix is not to create a rival government hierarchy. It is to make explicit which branch, department, bureau, attached agency, GOCC, LGU layer, autonomous-region institution, regulator, science body, emergency actor, financing actor, auditor and continuity-only institution owns which part of the problem.

## 1. Why this matrix exists

A flood-and-traffic plan becomes incomplete when it says only “DPWH, DOTr, DENR and LGUs must coordinate.” The physical system crosses mandates:

- water begins in watersheds, runs through rivers, irrigation and drainage, interacts with solid waste, roads, settlements, pumps, lake/estuary levels, tides and coasts;
- mobility crosses walking, cycling, buses/PUVs, rail, roads, ports, ferries and airports;
- housing decisions create transport demand and flood exposure;
- power and telecom failures disable pumps, signals, rail, hospitals and emergency command;
- procurement, contractor performance, inspection, payment and maintenance determine whether designed infrastructure exists and works;
- disaster operations require BFP, PNP, PCG, AFP, DOH, DSWD, LGUs, OCD/NDRRMC and utilities;
- accountability involves COA, Ombudsman, prosecutors and courts, none of which should be collapsed into an executive analytics platform.

The matrix therefore resolves both forms of fragmentation:

1. **institutional fragmentation** — agencies optimize within their own mandate without seeing the whole system; and
2. **information fragmentation** — the same project, asset, place or problem appears under different identifiers, systems and reporting formats.

## 2. Legal and institutional anchor

The matrix is anchored on the current legal architecture, especially:

- **RA 12145** — DEPDev, long-term framework, sectoral infrastructure master plans, InfraCom, CIDMP, RDC integration and public-investment monitoring;
- **RA 12254** — whole-of-government e-governance, interoperability and government enterprise architecture;
- **RA 12009 and its IRR** — lifecycle, transparency, sustainability, open contracting and PhilGEPS as the government electronic procurement portal;
- **RA 10121** — national/local DRRM architecture and mainstreaming of disaster risk;
- **RA 7160** — Local Government Code allocation of local roads, bridges, drainage, sewerage, flood-control, solid-waste and other services;
- **RA 9729** — mainstreaming of climate change into government policy and planning;
- the **2026 Philippine Government Directory** and **FY 2026 General Appropriations Act** as the institutional baseline.

This document does **not** claim that every proposed responsibility below is already a statutory power. Each row separates: (a) an institution's existing mandate or natural policy position; from (b) the operating resolution this master-plan architecture requires. Where implementation would require new legislation, regulation, intergovernmental agreement or budget authority, that must be identified during promotion to formal policy.

## 3. Completeness rule

“Complete” does not mean placing every government office on one steering committee. It means **no institution disappears from the State Control Universe**.

Coverage rules:

1. Every national branch and constitutional body is in scope.
2. Every executive department and named attached agency in the 2026 institutional baseline is in scope.
3. GOCCs and GFIs are covered either individually where system-critical or by mandatory sector/continuity rules.
4. Every province, city, municipality and barangay is covered through its legal LGU layer; every individual LGU need not be repeated by name.
5. Every SUC is covered through the SUC rule; regionally significant institutions may receive additional named roles later.
6. BARMM is treated through autonomous/intergovernmental interoperability, not as a national field office.
7. Every remaining office that has no direct infrastructure role receives **CO** rather than an invented engineering mandate.
8. The matrix must be versioned against future reorganizations; renamed, abolished or newly created bodies must be reconciled rather than silently dropped.

## 4. Responsibility classification


| Code | Meaning |
|---|---|
| L | System/sector lead |
| I | Implementer/operator |
| R | Regulator/standards authority |
| D | Authoritative data provider |
| F | Funder/financing actor |
| A | Audit/accountability actor |
| E | Emergency/continuity actor |
| J | Justice/enforcement actor |
| C | Mandatory coordination/consultation actor |
| S | Scientific/research/capacity-building actor |
| CO | Continuity-only obligation: the institution is not assigned an invented engineering mandate, but its facilities, records, workforce, and public services must remain resilient |


An institution may carry multiple codes. The codes describe its role in this master-plan operating model; they do not transfer constitutional or statutory powers.

## 5. Non-negotiable governance rules

1. **No super-agency.** DEPDev/InfraCom integrates planning; it does not operate every road, pump, rail line, housing site or database.
2. **Constitutional independence.** Congress, Judiciary, COA, Ombudsman, CSC, COMELEC, CHR and other independent bodies remain independent.
3. **BARMM autonomy.** Integration is intergovernmental and interoperable, not administrative takeover.
4. **Source systems remain authoritative.** eGovTrace or any national observability layer reconciles source data; it does not replace PhilGEPS, DBM, PSA, NAMRIA, PAGASA, PHIVOLCS, sector asset systems or audit systems.
5. **No corruption-by-correlation.** Duplicate coordinates, contractor recurrence, missing evidence, delay or cross-agency overlap may justify verification; none is a legal finding.
6. **Lifecycle responsibility.** Planning and construction are not completion. Operations, maintenance, condition, outcome and eventual rehabilitation/replacement must have owners.
7. **Public-transport first for dense corridors.** Mobility performance is measured primarily in people moved and accessibility, not only vehicle speed.
8. **Nature is a constraint and asset.** Watersheds, floodplains, wetlands, mangroves, coastlines and geological hazards are inputs before design lock-in, not an afterthought.
9. **Data minimization and rights.** Public-interest infrastructure transparency must not expose protected personal, health, financial, security or vulnerability data.
10. **Outcome accountability.** Spending and completion must ultimately connect to whether flooding, accessibility, safety, reliability, affordability and resilience improved.


## 6. Constitutional and central state institutions

| Institution / body | Role | Required responsibility and resolution | Required data / evidence | Coordination and accountability |
|---|---|---|---|---|
| **Office of the President** | L/C | Set national outcome targets; direct executive departments to align sectoral infrastructure master plans with the DEPDev/InfraCom CIDMP; resolve executive interdepartmental deadlocks; require outcome-based delivery reporting rather than project-count reporting. | National priority outcomes, executive directives, cross-agency blockers. | DEPDev, DBM, Cabinet departments, PMS. Must respect constitutional independence of Congress, Judiciary, COA, Ombudsman, CSC, COMELEC, CHR and other independent bodies. |
| **Office of the Vice President** | C/CO | Maintain constitutional continuity and resilience of its own services. Where it runs social or emergency programs, coordinate with the statutory lead rather than creating parallel infrastructure, DRRM or welfare chains. | Program locations, beneficiary/service continuity requirements. | DSWD, DOH, DILG/LGUs, OCD/NDRRMC as relevant. |
| **Presidential Management Staff** | D/C | Maintain an executive delivery view of unresolved ROW, permits, procurement, implementation milestones, inter-agency dependencies and outcome failures. Escalate blockers without becoming the authoritative source system for sector data. | Milestones, blockers, decision logs, escalation status. | DEPDev monitoring, DBM, implementing agencies, OP. |
| **Senate of the Philippines** | A/C | Legislate and oversee national transport, water, housing, climate, procurement and accountability frameworks; scrutinize appropriations against network and regional plans; require lifecycle and geospatial visibility where constitutionally and legally appropriate. | Legislative and appropriations records, oversight findings. | House, DBM, DEPDev, COA, sector committees. |
| **House of Representatives** | A/C | Legislate and oversee; evaluate district and party-list priorities against approved regional/national networks so project selection is not reduced to disconnected line items. | Legislative and appropriations records, district project proposals. | Senate, DBM, DEPDev, RDCs, LGUs. |
| **Commission on Appointments** | CO | No invented flood or mobility mandate. Ensure continuity of constitutional appointment functions and resilient records/facilities. | Continuity plan, facility risk profile. | Congress administration, relevant facility operators. |
| **Senate Electoral Tribunal / House Electoral Tribunal** | CO | Judicial/constitutional continuity only; resilient records and access. | Case and facility continuity information. | Congress, Judiciary-related continuity actors. |
| **Supreme Court and Judiciary** | J/CO | Preserve judicial independence while improving lawful, timely adjudication of ROW, expropriation, environmental, land/title, procurement and infrastructure disputes. Maintain resilient digital and physical court operations. | Case status, court-facility risk, jurisprudence and procedural data within lawful disclosure rules. | Lower courts, DOJ actors, LRA, DENR, implementing agencies. |
| **Court of Appeals** | J/CO | Appellate resolution of infrastructure, land, environmental and procurement disputes within jurisdiction; resilient records and operations. | Case and facility continuity data. | Judiciary. |
| **Sandiganbayan** | J/CO | Adjudicate qualifying public-corruption cases. No analytical signal may be treated as guilt or a judicial finding. | Public case status and lawful records. | Ombudsman, prosecutors, courts. |
| **Court of Tax Appeals** | J/CO | Resolve tax/customs disputes within jurisdiction; maintain resilient operations. No project-selection role. | Case and facility continuity data. | DOF revenue agencies, Judiciary. |

## 7. DEPDev planning system

| Institution / body | Role | Required responsibility and resolution | Required data / evidence | Coordination and accountability |
|---|---|---|---|---|
| **Department of Economy, Planning, and Development (DEPDev)** | L/D | Serve as the primary policy, planning, coordinating and monitoring arm for the national economy; integrate long-term, medium-term, regional, spatial, sector and public-investment planning; require sectoral infrastructure master plans; consolidate and vet them through InfraCom into the CIDMP; connect plans to investment programming, monitoring and evaluation. | Long-term framework, PDP/RDPs, public investment program, spatial frameworks, project appraisals, outcome evaluations. | InfraCom, ICC, RDCs, DBM, all sector agencies, LGUs, BARMM through intergovernmental coordination. |
| **Infrastructure Development Committee (InfraCom)** | L/C | Review and approve infrastructure master plans of national significance for ED Council confirmation; recommend resilient national infrastructure strategy; coordinate agencies and GOCCs involved in infrastructure. | Sectoral master plans, cross-sector conflicts, resilience standards, investment dependencies. | DEPDev/DPWH co-chairs; DA, DBM, DENR, DHSUD, DICT, DILG, DOE, DOF, DOT, DOTr, DTI, Executive Secretary. |
| **Investment Coordination Committee (ICC)** | F/C | Appraise major programs/projects and fiscal exposures using lifecycle, climate, distributional, network and socioeconomic criteria; reject isolated projects that fail network or outcome tests. | Project appraisal, fiscal risk, economic returns, distributional impacts. | DEPDev, DOF, DBM, DOE, DTI, BSP resource participation. |
| **Regional Development Councils (RDCs)** | L/C | Integrate regional plans, LGU priorities, agency regional plans, SUC inputs and special development bodies; identify inter-LGU projects; review metropolitan and river-basin master plans; monitor major projects. | Regional development/spatial plans, RDIPs, LGU project pipelines, regional outcome data. | DEPDev regional offices, LGUs, regional line agencies, SUCs, private-sector representatives. |
| **Philippine Statistics Authority** | D | Provide canonical population, household, labor, economic, establishment, poverty, migration and statistical-geography data for accessibility, exposure and demand analysis. | Censuses, surveys, registries/statistical frames, geostatistical boundaries. | DEPDev, DHSUD, DOTr, DILG/LGUs, DOH, DSWD, all planning users. |
| **Commission on Population and Development** | D/C | Provide demographic and population-development scenarios for settlement, services, transport and housing demand. | Population projections, demographic indicators. | PSA, DEPDev, DHSUD, DOH, LGUs. |
| **PPP Center** | F/C | Screen PPP concepts for network value, affordability, climate resilience, fiscal risk, competition and public-service outcomes, not merely bankability. | PPP pipeline, value-for-money and fiscal-risk assessments. | DEPDev, DOF, implementing agencies, PCC, DBM. |
| **Philippine Statistical Research and Training Institute** | S | Develop and train on common statistical methods for accessibility, resilience, infrastructure outcomes and uncertainty. | Methods, standards, training materials. | PSA, DEPDev, agencies, LGUs. |
| **Philippine Institute for Development Studies / Development Academy of the Philippines** | S | Conduct independent policy evaluation, institutional-design studies and post-implementation review; strengthen public-sector capability. | Research, evaluations, training. | DEPDev, agencies, Congress, LGUs. |
| **Philippine National Volunteer Service Coordinating Agency** | E/C | Integrate trained volunteers into disaster and community-resilience systems without substituting volunteer labor for professional responders. | Volunteer capability and deployment data. | OCD/NDRRMC, DILG/LGUs, DSWD, BFP, PCG. |
| **Tariff Commission** | C | Assess trade/tariff implications of strategic imported infrastructure inputs, equipment and supply-chain policy. | Tariff schedules and analysis. | DTI, DOF, implementing agencies. |

## 8. Budget, procurement and public financial management

| Institution / body | Role | Required responsibility and resolution | Required data / evidence | Coordination and accountability |
|---|---|---|---|---|
| **Department of Budget and Management** | F/L | Require major infrastructure budget proposals to carry project identity, coordinates, network function, lifecycle stage, funding source, related assets/projects, hazard exposure, expected outcome and maintenance obligation. Align annual and multi-year appropriations with approved plans. | NEP/GAA structures, allotments, releases, program/project identifiers, multi-year authorities. | DEPDev, implementing agencies, BTr, GPPB/PhilGEPS, COA. |
| **Government Procurement Policy Board - Technical Support Office** | R/D | Set procurement policy and standards under the New Government Procurement Act; support lifecycle/value-for-money, open contracting, professionalization and interoperability. | Procurement rules, standard forms, policy issuances, performance indicators. | PS-DBM/PhilGEPS, procuring entities, COA, DTI/CIAP, DICT. |
| **Procurement Service - DBM / PhilGEPS** | D/R | Remain the primary electronic procurement portal. Expose interoperable procurement lifecycle data; do not create a rival eGovTrace procurement database. | APP/procurement notices, bids, awards, contracts and related public procurement records as authorized. | GPPB, procuring entities, DTI/CIAP, SEC, CDA, BIR and other registries where lawfully integrated. |
| **Bureau of the Treasury** | F/D | Support long-duration infrastructure financing, cash/debt management, disaster-risk instruments and fiscal-risk visibility. | Debt issuance, cash and financing data. | DOF, DBM, DEPDev. |
| **Commission on Audit** | A | Independently audit public funds and assets. The desired traceability chain is appropriation → procurement → contract → asset → coordinates → milestones → inspection → payment → completion → maintenance → outcome, while COA retains authority over its audit methodologies. | Audit observations, reports and lawful public records. | All audited entities; eGovTrace must not impersonate COA or turn anomalies into findings. |
| **Anti-Money Laundering Council** | A/J/CO | Use financial intelligence only within statutory authority. Infrastructure analytics must not become indiscriminate financial surveillance. | Lawfully accessible financial intelligence. | DOJ/Ombudsman/NBI and competent authorities as legally applicable. |

## 9. Public works, flood control and national roads

| Institution / body | Role | Required responsibility and resolution | Required data / evidence | Coordination and accountability |
|---|---|---|---|---|
| **Department of Public Works and Highways** | L/I/D | Own national roads, bridges, major drainage/flood-control and relevant public works. Shift from construction-output metrics to lifecycle outcomes: accessibility, safety, travel time, public-transport movement, flood resilience, condition and maintenance. Maintain a geospatial asset register with design capacity, condition, inspections, hazard exposure and maintenance history. | National road/bridge/flood-control asset inventory, project lifecycle, inspections, condition, traffic and hydraulic design data. | DEPDev/InfraCom, DENR, PAGASA, DILG/LGUs, DOTr, DBM, OCD, DHSUD, NIA/NWRB, utilities. |
| **DPWH regional/district engineering offices** | I/D | Implement and maintain assets according to national standards while exposing consistent project/asset IDs, coordinates, quantities, milestones, inspections and maintenance records. District boundaries must not fragment river-basin or corridor planning. | Local project and asset records. | DPWH central, LGUs, regional councils, utilities, contractors. |
| **Contractors and consultants through public procurement** | I/C | Deliver exactly scoped, quality-assured work; preserve design, change-order, inspection, materials and as-built evidence. Contractor history is an input to verification, not a presumption of wrongdoing. | Bids, contracts, beneficial ownership where lawfully disclosed, change orders, progress, quality and warranty records. | Procuring entities, PhilGEPS, CIAP/PCAB, COA. |

## 10. Transportation and archipelagic mobility

| Institution / body | Role | Required responsibility and resolution | Required data / evidence | Coordination and accountability |
|---|---|---|---|---|
| **Department of Transportation** | L | Own a National Multimodal Mobility Plan within the CIDMP. Apply a people-moving hierarchy: walking, cycling, high-capacity public transport, other public transport, shared/service access, then private-car capacity where justified. Integrate land, rail, maritime and aviation networks. | Network/service plans, passenger/freight demand, intermodal nodes, standards, capital pipeline. | DPWH, DHSUD, DILG/LGUs, DEPDev, transport agencies, ports/airports, MMDA/metropolitan bodies. |
| **Land Transportation Office** | R/D | Vehicle registration, driver licensing, roadworthiness/inspection policy and road-safety data. Support emergency/special-vehicle standards and interoperable fleet statistics. | Registered fleet, licenses, enforcement/inspection data subject to privacy rules. | DOTr, LTFRB, PNP/HPG, LGUs, insurers. |
| **Land Transportation Franchising and Regulatory Board** | R/D | Regulate public-transport services with route/network logic, service quality, minimum frequencies, accessibility and data reporting. Move planning focus from individual franchises to passenger-network performance. | Franchise/route/service data, fleet/service indicators. | DOTr, OTC, LGUs, operators/cooperatives. |
| **Office of Transportation Cooperatives** | I/C | Support professionalized PUV cooperatives and fleet/service organizations, including transition assistance and governance. | Cooperative/operator data, modernization/support programs. | DOTr, LTFRB, CDA, TESDA, DTI/finance institutions. |
| **Light Rail Transit Authority** | I/D | Operate/develop rail assets under its mandate; maintain resilient stations, accessibility, feeder integration and asset condition information. | Rail assets, service reliability, ridership, maintenance, incidents. | DOTr, LGUs, utilities, emergency actors. |
| **Philippine National Railways** | I/D | Develop/operate national and regional rail functions under current law and programs; integrate passenger and freight planning with ports, buses and land use. | Rail assets, corridors, operations, condition, ridership/freight. | DOTr, DPWH, PPA, LGUs, DHSUD. |
| **Philippine Railways Institute** | S/R | Build rail workforce competency, certification, standards and research capacity. | Training/certification data, standards. | DOTr, rail operators, TESDA/PRC where relevant. |
| **Toll Regulatory Board** | R | Regulate toll facilities/concessions and interoperability. Toll capacity must complement, not displace, high-capacity public transport where demand requires it. | Concession, toll, performance and traffic data. | DPWH/DOTr, concessionaires, PCC, LGUs. |
| **Civil Aeronautics Board** | R | Economic regulation of air services and connectivity; incorporate continuity and interregional access implications. | Route/service/economic regulation data. | DOTr, CAAP, airport authorities. |
| **Civil Aviation Authority of the Philippines** | I/R/D | Airport and air-navigation operations/safety under mandate; map flood, seismic, volcanic, wind and power/telecom single points of failure. | Airport assets, operations, safety, closure and resilience data. | PAGASA, PHIVOLCS, DOE, DICT, airport authorities, OCD. |
| **MIAA, MCIAA, CIAC and other airport authorities** | I/D | Facility-specific capital, resilience, surface-access and mass-transit integration; maintain emergency continuity plans. | Airport asset and passenger/cargo data. | DOTr/CAAP, LGUs, utilities, tourism and emergency actors. |
| **Maritime Industry Authority** | R/D | Regulate maritime industry/vessels and support safe, reliable inter-island service standards. | Vessel/operator/service data. | DOTr, PCG, PPA/CPA/BPMA, LGUs. |
| **Philippine Coast Guard** | E/I/D | Maritime safety, search and rescue, marine environmental response, navigational safety and disaster logistics. Treat ferries/ports as part of national accessibility and emergency networks. | Incidents, SAR resources, navigational/port safety, marine pollution response. | DOTr, MARINA, ports, OCD/NDRRMC, AFP, LGUs. |
| **Philippine Ports Authority / Cebu Port Authority** | I/D | Operate/develop ports as passenger/freight network nodes; publish service, asset-condition, hazard and intermodal-access information. | Port assets, vessel/passenger/cargo flows, outages, capital plans. | DOTr, MARINA, PCG, LGUs, freight/logistics actors. |
| **Office for Transportation Security** | E/R | Critical transport-security and continuity standards across modes without replacing operator safety responsibilities. | Threat/continuity requirements as lawfully sharable. | DOTr agencies, PNP, security bodies. |
| **MMDA for Metro Manila** | L/I/D | Integrate metropolitan traffic operations, signals, incident management, bus priority, flood-control/pumping, drainage, solid-waste interfaces, emergency routes and development planning. MMDA is NCR-specific and must not be treated as the national governance model. | Traffic, incident, pumping/drainage, flood, road and metropolitan planning data. | 17 NCR LGUs, DPWH, DOTr, DILG, DENR, utilities, OCD. |
| **Metro BLISTT Development Authority and other metropolitan/special development bodies** | L/C | Coordinate cross-LGU planning where functional urban regions exceed political boundaries. BLISTT additionally requires mountain-specific carrying capacity, slope/landslide, water, tourism and public-transport management. | Metropolitan plans, inter-LGU projects, hazard and mobility data. | RDCs, LGUs, DEPDev, line agencies. |
| **Local transport terminals, ports and ferry services under LGU authority** | I/R | Integrate local routes and terminals with national networks, enforce accessible and safe facilities, and ensure emergency continuity. | Local terminal/route/service data. | DOTr agencies, LGUs, PCG/MARINA where maritime. |

## 11. Interior, local government and public safety

| Institution / body | Role | Required responsibility and resolution | Required data / evidence | Coordination and accountability |
|---|---|---|---|---|
| **Department of the Interior and Local Government** | L/R/C | Translate national resilience and mobility outcomes into Local Resilience and Mobility Performance Standards; strengthen LGU planning, emergency capacity, local road/drainage/solid-waste governance, zoning enforcement and public-safety coordination while respecting local autonomy. | LGU capability/performance, local plans, compliance indicators, public-safety readiness. | LGUs, BFP, PNP, BJMP, OCD, DEPDev/RDCs, DHSUD, DENR, DPWH, DOTr. |
| **Bureau of Fire Protection** | E/R/D | Create a National Emergency Accessibility Program. Map station catchments, normal and hazard response times, inaccessible road segments, bridge/width constraints, hydrants, alternate routes, backup power/comms and rescue-watercraft needs. Incorporate emergency access into road, drainage, rail, tunnel, terminal and building planning. | Station locations, apparatus/resources, response times, hydrants, rescue incidents, access constraints. | DILG/LGUs, DPWH, DOTr, DOH, OCD/NDRRMC, PAGASA; BFP already has disaster/rescue/medical/HAZMAT roles under applicable law. |
| **Philippine National Police** | E/J/D | Traffic and access enforcement where authorized; evacuation security, crowd management, critical-facility protection and public-order continuity. Preserve rights and due process. | Incident, traffic/enforcement and emergency deployment data subject to law. | DILG/LGUs, BFP, OCD, DOTr/LTO, CHR safeguards. |
| **PNP Highway Patrol Group** | J/D | Road-safety and national traffic enforcement intelligence; identify crash and obstruction hot spots without becoming the transport planner. | Crash/enforcement hotspot data. | PNP, LTO, DPWH, DOTr, LGUs. |
| **National Police Commission** | R/A | Police governance/accountability. No engineering role. | Governance and oversight data. | DILG/PNP. |
| **Bureau of Jail Management and Penology** | E/CO | Every detention facility requires hazard assessment, evacuation/transfer plan, backup water/power/comms, secure transport and access continuity. | Facility risk, capacity and continuity data. | DILG/LGUs, BFP, DOH, PNP, utilities. |
| **Local Government Academy** | S | Professionalize local planners, traffic managers, engineers, DRRM officers, GIS/data and procurement personnel. | Training, competency and capability data. | DILG/LGUs, CSC, PRC, TESDA, DEPDev. |
| **Philippine Public Safety College** | S | Build responder/public-safety professional capability relevant to incident management and resilience. | Training/certification data. | DILG family and emergency agencies. |
| **Early Childhood Care and Development Council** | C/CO | Hazard-safe child-development facilities, safe access and service continuity; include child-specific evacuation/access needs. | Facility and service-continuity data. | DILG/LGUs, DSWD, DepEd, DOH. |
| **National Commission on Muslim Filipinos** | C | Culturally competent public-service, emergency and community consultation support. | Community/service needs. | DILG/LGUs, OCD, social-sector agencies. |
| **National Youth Commission** | C | Youth road-safety, climate/resilience and public-space participation. | Youth program/community input. | DILG/LGUs, DOTr, DepEd, CCC. |
| **Philippine Commission on Women** | C/R | Gender-responsive transport, lighting, safety, caregiving-trip, evacuation and shelter standards. | Gender-disaggregated indicators and policy guidance. | DOTr, DHSUD, DSWD, LGUs, NDRRMC actors. |

## 12. LGU responsibility layers

| Institution / body | Role | Required responsibility and resolution | Required data / evidence | Coordination and accountability |
|---|---|---|---|---|
| **Barangays** | I/D/E | Maintain hyperlocal visibility of blocked drains, barangay roads/bridges, solid-waste leakage, vulnerable households, local hazards, evacuation communication and first-mile access. Do not carry engineering burdens that legally and technically belong to higher levels. | Local asset/obstruction reports, vulnerable-service needs, evacuation data with privacy controls. | City/municipality, DILG, LDRRMO, BFP, DSWD. |
| **Municipalities** | L/I/R/D | Municipal roads/bridges, drainage/sewerage/flood-control facilities funded locally, land-use/zoning, public markets, local terminals, small water systems, solid waste and local emergency services under the Local Government Code and other laws. | CLUP/CDP/LDRRMP, local assets, permits, drainage, traffic, waste, project and maintenance data. | Province, DILG, DHSUD, DENR, DPWH, DOTr, OCD, utilities. |
| **Cities** | L/I/R/D | Perform local road, drainage, traffic, zoning, solid-waste, water, public-market and emergency functions at urban scale; in functional metro areas, enter enforceable cross-LGU service agreements/authorities where appropriate. | City plans, assets, permits, traffic/public transport, drainage and service data. | DILG, metropolitan bodies, national agencies, adjacent LGUs. |
| **Provinces** | L/I/C | Coordinate intermunicipal roads, bridges, water/drainage/flood-control, hospitals and regional logistics; resolve cross-boundary infrastructure and watershed dependencies with RDCs and line agencies. | Provincial plans/assets and inter-LGU project pipeline. | Municipalities/cities, RDC, DILG, DPWH, DOH, DENR. |
| **LDRRMOs / local DRRM councils** | E/D | Maintain local risk maps, warning systems, critical-infrastructure and emergency-resource data; integrate DRR/CCA into local development, land-use and investment programs. | Hazard/exposure maps, incident and preparedness data. | OCD/NDRRMC, PAGASA, PHIVOLCS, DILG, LGU departments. |
| **Local sanggunians** | R/A | Enact lawful zoning, traffic, environmental, budget and service ordinances; scrutinize local investment/maintenance and public outcomes. | Ordinances, appropriations, oversight records. | Local chief executive, departments, citizens. |

## 13. Disaster risk reduction and emergency operations

| Institution / body | Role | Required responsibility and resolution | Required data / evidence | Coordination and accountability |
|---|---|---|---|---|
| **National Disaster Risk Reduction and Management Council** | L/E/C | Use the statutory NDRRMC architecture as the national multi-agency disaster governance mechanism. Operate one common operational picture rather than parallel command centers; align prevention/mitigation, preparedness, response and rehabilitation/recovery. | National risk, preparedness, response and recovery indicators; common operational picture. | OCD secretariat; DOST/PAGASA/PHIVOLCS, DILG/LGUs, DPWH, DOTr, DENR, DSWD, DOH, DND/AFP, BFP, PNP, PCG, DOE, DICT and members. |
| **Office of Civil Defense** | L/E/D | Administer the comprehensive civil-defense/DRRM program and serve as NDRRMC secretariat. Define interoperable incident information and trigger-based actions while respecting sector command responsibilities. | Situation reports, alerts, emergency-resource and incident data. | NDRRMC members and LDRRMOs. |
| **AFP support to civil authorities** | E/I | Provide extraordinary logistics, engineering, airlift, sealift and isolation-support capability when lawfully activated, without militarizing ordinary civilian infrastructure governance. | Deployable capability and mission status. | DND/OCD/NDRRMC, LGUs, PCG, civilian leads. |
| **Philippine Army** | E/I | Land logistics/engineering support under activation. | Capability/deployment data. | AFP/OCD/civilian leads. |
| **Philippine Navy** | E/I | Island/coastal logistics, sealift and disaster support. | Capability/deployment data. | AFP/OCD/PCG. |
| **Philippine Air Force** | E/I | Airlift, reconnaissance/support and isolated-community response. | Capability/deployment data. | AFP/OCD/CAAP. |
| **National Defense College of the Philippines** | S | Critical-infrastructure and national-resilience policy research. | Research and training. | DND, civilian planning bodies. |

## 14. Science, weather, hazards and geospatial intelligence

| Institution / body | Role | Required responsibility and resolution | Required data / evidence | Coordination and accountability |
|---|---|---|---|---|
| **DOST proper** | L/S | Coordinate science and technology support for resilience, transport, water, energy, materials and digital infrastructure. | R&D portfolio and technology programs. | DEPDev/InfraCom, line agencies, academe. |
| **PAGASA** | D/S | Authoritative hydro-meteorological layer: weather, rainfall, flood forecasting, tropical cyclones, storm surge and climate information. Provide updated design rainfall/intensity-duration-frequency assumptions and operational thresholds. | Weather/climate observations and forecasts, rainfall/river/flood data. | DPWH, DENR, NIA, OCD, LGUs, DOTr, CAAP, PCG. |
| **PHIVOLCS** | D/S | Authoritative earthquake, volcano, tsunami and geotectonic hazard information for infrastructure screening and operational thresholds. | Fault, shaking, liquefaction, tsunami, volcano and related hazard products. | DPWH, DOTr/CAAP/ports/rail, DHSUD/LGUs, OCD. |
| **Advanced Science and Technology Institute** | S/I | Sensors, communications, remote sensing, data engineering and resilient technical infrastructure R&D. | Sensor/network and R&D data. | DICT, DOST, hazard agencies, implementing agencies. |
| **MIRDC** | S | Domestic engineering/manufacturing capability for pumps, transport/rail parts and resilience equipment. | Testing/R&D outputs. | DPWH, DOTr, DTI, industry. |
| **ITDI / FPRDI / PTRI and other DOST research institutes** | S | Materials, process, renewable-material and specialized technical research for infrastructure/environmental applications where validated. | Research/test results. | Implementing agencies, DTI, academe. |
| **PCAARRD / PCIEERD / PCHRD** | S | Agriculture/natural resources, infrastructure/energy/transport, and health resilience R&D respectively. | R&D programs and evaluations. | Sector departments, universities. |
| **PNRI** | S/E | Radiological/nuclear safety and emergency preparedness within mandate. | Facility/safety and emergency information. | OCD, DOH, security actors. |
| **NAST / NRCP** | S | Independent scientific advice and review. | Scientific assessments. | DOST, policy bodies. |
| **Science Education Institute / PSHS System** | S | Build future STEM workforce and resilience literacy. | Education/capability data. | DOST, DepEd/CHED. |
| **NAMRIA** | D | Canonical national geospatial base: topography, hydrography, coastline, elevation and mapping reference. Support a common spatial framework without replacing thematic agency data. | Base maps, elevation and geodetic/hydrographic products. | All geospatial planning users. |

## 15. Environment, water, watersheds and climate

| Institution / body | Role | Required responsibility and resolution | Required data / evidence | Coordination and accountability |
|---|---|---|---|---|
| **Department of Environment and Natural Resources** | L/R/D | Make ecosystems part of infrastructure planning. Use watershed/river-basin/coastal systems as planning units; protect forests, wetlands, mangroves and ecological corridors; integrate cumulative environmental impacts before project lock-in. | Land/environmental status, protected areas, forest/watershed data, environmental approvals. | DPWH, DA/NIA, DHSUD/LGUs, DEPDev, CCC, NWRB, LLDA. |
| **Environmental Management Bureau** | R/D | Environmental impact, air/water quality, wastewater, pollution and cumulative-impact regulation. | EIA/ECC and environmental monitoring data. | DENR, LGUs, project proponents. |
| **Mines and Geosciences Bureau** | D/R | Geohazards, geology, landslides/subsidence and extractive-industry geotechnical implications. | Geohazard/geology products. | DHSUD/LGUs, DPWH, DEPDev, OCD. |
| **National Water Resources Board** | R/D | Water allocation and national water-resource governance; reconcile municipal, agricultural, industrial, ecological and energy demands. | Water rights/allocation, source and availability data. | DENR, NIA, LWUA/MWSS, LGUs, DOE. |
| **Laguna Lake Development Authority** | L/R/I | Integrate Laguna de Bay watershed, wastewater, urbanization, lake levels, flooding, settlements and industry as one basin system. | Lake/basin water quality, levels, permits and development data. | DENR, MMDA/LGUs, DPWH, DHSUD, MWSS/water utilities. |
| **Palawan Council for Sustainable Development** | R/C | Apply Palawan-specific ecosystem and carrying-capacity safeguards to transport, tourism, housing and utilities. | Protected/ecological zone data and clearances. | DENR, DOT, LGUs, transport agencies. |
| **Climate Change Commission** | L/R/D | Set national climate-risk/adaptation policy assumptions; align national/local climate action, climate budget tagging and adaptation outcomes; ensure infrastructure design uses plausible future climate conditions rather than historic averages alone. | Climate scenarios, adaptation policy, climate expenditure and local plan information. | DEPDev, DBM, LGUs, DENR, DOST, DHSUD, sector agencies. |

## 16. Housing, settlements and land use

| Institution / body | Role | Required responsibility and resolution | Required data / evidence | Coordination and accountability |
|---|---|---|---|---|
| **Department of Human Settlements and Urban Development** | L/R | Integrate national housing, settlement and land-use policy with hazard, water, drainage and public-transport capacity. Require safe, accessible, serviceable growth rather than remote housing that creates transport poverty. | Settlement framework, CLUP guidance, housing pipeline, land-use/hazard overlays. | NHA/SHFC/NHMFC, LGUs, DOTr, DPWH, DENR, DILG, DEPDev. |
| **National Housing Authority** | I/D | For danger-zone and ROW resettlement, apply a Resettlement + Mobility + Livelihood + Services gate. No relocation site should pass without hazard, water, drainage, schools, health, jobs, public transport, walking access and household transport-cost tests. | Origin/destination households, site locations, housing project status, services/access indicators with privacy controls. | DHSUD, DOTr, DILG/LGUs, DPWH, DepEd, DOH, utilities, DSWD. |
| **Social Housing Finance Corporation** | F/I | Finance community-led/socialized housing only in safe, accessible and serviceable locations; connect financing decisions to land-use and transport plans. | Housing finance/project data. | DHSUD, LGUs, communities, utilities. |
| **National Home Mortgage Finance Corporation** | F | Use housing-finance mechanisms to support safe and transit-accessible development consistent with policy. | Housing finance/portfolio data. | DHSUD, financial regulators/institutions. |
| **Pag-IBIG Fund** | F | Incorporate hazard and accessibility considerations into public housing finance programs where legally and actuarially appropriate. | Housing finance data subject to privacy. | DHSUD, borrowers/developers. |
| **Human Settlements Adjudication Commission** | J/R | Adjudicate housing/settlement disputes within jurisdiction; improve timely resolution without weakening due process. | Case/public decision data. | DHSUD, LGUs, parties. |

## 17. Agriculture, irrigation, food and rural logistics

| Institution / body | Role | Required responsibility and resolution | Required data / evidence | Coordination and accountability |
|---|---|---|---|---|
| **Department of Agriculture** | L/C | Integrate food production, floodplain management, irrigation, rural access, farm-to-market roads, cold chain and climate adaptation. Avoid road projects that damage watershed/flood function or duplicate other corridors. | Agriculture production, FMR pipeline, logistics and climate-risk data. | NIA, BFAR, DPWH, DENR, LGUs, DEPDev. |
| **Bureau of Fisheries and Aquatic Resources** | I/R/D | Climate-resilient fisheries/coastal infrastructure, landing sites, municipal-water coordination and fisher access. | Fisheries, ports/landing and coastal-resource data. | DA, PFDA, DENR, LGUs, PCG. |
| **National Fisheries Research and Development Institute** | S | Fisheries/climate science and monitoring. | Research data. | BFAR, academe. |
| **Fertilizer and Pesticide Authority** | R | Reduce agricultural chemical risks to water systems and communities. | Regulatory/monitoring data. | DA, DENR/EMB, LGUs. |
| **National Meat Inspection Service** | R/E | Resilient meat inspection/logistics and continuity of food safety during disasters. | Facility/logistics data. | DA, LGUs, cold-chain actors. |
| **PHilMech** | S/I | Storage, drying, mechanization and post-harvest logistics resilience. | Facility/technology data. | DA, LGUs, cooperatives. |
| **Philippine Council for Agriculture and Fisheries** | C | Farmer/fisher participation in infrastructure and logistics planning. | Stakeholder inputs. | DA, RDCs/LGUs. |
| **PhilFIDA / Philippine Carabao Center / commodity agencies** | S/I | Commodity-specific resilience, production and rural-access requirements. | Program and commodity data. | DA, LGUs. |
| **National Irrigation Administration** | L/I/D | Treat irrigation, reservoirs and canals as part of the national water graph. Reconcile irrigation operations with river-basin flow, flood management, drought, downstream communities and urban drainage. | Irrigation/reservoir assets, operations, releases, service areas, project data. | DA, DENR/NWRB, PAGASA, DPWH, LGUs, DOE where hydropower interacts. |
| **National Food Authority** | E/I | Strategic food warehousing and emergency logistics continuity. | Warehouse stocks/locations and logistics data subject to policy. | DA, DSWD, LGUs, transport agencies. |
| **Philippine Fisheries Development Authority** | I/D | Resilient fish ports, cold chain and intermodal access. | Port/cold-chain asset and flow data. | DA/BFAR, DOTr/ports, LGUs. |
| **Philippine Crop Insurance Corporation** | F/D | Use hazard-loss data to strengthen risk transfer and agricultural adaptation. | Claims/loss and exposure data subject to law. | DA, insurers, climate/hazard agencies. |
| **Philippine Coconut Authority / Sugar Regulatory Administration / National Dairy Authority / PhilRice** | I/S | Commodity-specific production, adaptation, logistics and research contributions. | Commodity and program data. | DA, LGUs, research bodies. |

## 18. Energy and critical utilities

| Institution / body | Role | Required responsibility and resolution | Required data / evidence | Coordination and accountability |
|---|---|---|---|---|
| **Department of Energy** | L/R | Set resilience standards for electricity/fuel systems serving pumping stations, rail, traffic systems, hospitals, telecom, ports, airports, water and evacuation centers. Identify single points of failure. | Generation/supply resilience, fuel, critical-load and restoration data. | ERC, NEA, NPC, TransCo/NGCP ecosystem, utilities, critical-service agencies. |
| **Energy Regulatory Commission** | R | Include reliability and resilience of critical public services in applicable regulatory oversight. | Reliability/performance data. | DOE, utilities, consumers. |
| **National Electrification Administration / electric cooperatives** | I/F/D | Provincial/island power resilience, restoration and hardening; map critical loads and restoration priorities. | Distribution assets/outages/restoration, critical customers. | DOE/ERC, LGUs, critical facilities. |
| **National Power Corporation** | I/D | Off-grid/island generation and supply resilience under mandate. | Generation assets and outage data. | DOE, NEA, LGUs. |
| **National Transmission Corporation / transmission ecosystem** | I/D | Transmission-corridor resilience and critical-node dependency mapping within legal roles. | Transmission asset/outage information. | DOE/ERC, distribution utilities, critical services. |
| **PNOC and energy subsidiaries** | F/I | Strategic fuel/energy continuity and infrastructure within mandate. | Asset/supply data. | DOE, DOF, emergency actors. |
| **PSALM** | F/CO | Asset/liability decisions must not undermine required resilience of transferred/retained energy assets. | Asset/liability information. | DOE/DOF. |
| **MWSS** | L/R/D | Metro Manila water/sewerage system resilience, source-treatment-transmission-distribution continuity and wastewater/flood interaction. | Water/sewerage assets, service, outage and resilience data. | Concessionaires, DENR/NWRB, LLDA, LGUs/MMDA, DOE. |
| **Local Water Utilities Administration** | F/R/D | Strengthen local water-district asset management, financing, seismic/flood resilience, backup power and source protection. | Water district asset/service data. | Local water districts, LGUs, NWRB, DOE. |
| **Local water districts** | I/D | Map source, treatment, reservoirs, pumps, transmission, critical customers, backup power, flood/earthquake exposure and restoration priorities. | Local water asset/service data. | LWUA, LGUs, NWRB, DOE, DOH. |
| **National Telecommunications Commission** | R/D | Telecom continuity, emergency restoration and service-performance standards. | Network/service outage and restoration information as lawfully available. | DICT, carriers, OCD, LGUs. |
| **DICT** | L/R | Own government interoperability, enterprise architecture, cybersecurity and resilient digital-government standards. Do not become the owner of every sector database. | Government data/API/interoperability standards, shared digital infrastructure. | All agencies, NPC, CICC, NTC, EGov UPMO. |
| **National Privacy Commission** | R | Privacy-by-design and lawful data governance, especially for household, health, financial and emergency-vulnerability data. | Privacy policies, decisions, guidance. | All data-processing agencies. |
| **Cybercrime Investigation and Coordination Center** | E/J/C | Cyber-incident coordination for critical digital infrastructure under mandate; maintain separation between cyber response and ordinary sector operations. | Incident and threat coordination data subject to law. | DICT, law-enforcement/cybersecurity actors, critical operators. |

## 19. Health, welfare and human services

| Institution / body | Role | Required responsibility and resolution | Required data / evidence | Coordination and accountability |
|---|---|---|---|---|
| **Department of Health** | L/E | Map hospital and critical health access under normal and hazard conditions; require backup power, water, communications, medicine/oxygen supply routes and surge capability. | Health-facility locations/capacity, emergency access, continuity data. | LGUs, BFP, DPWH/DOTr, DOE, water utilities, DSWD/OCD. |
| **National specialty hospitals and retained hospitals** | I/E | Facility-specific flood/fire/seismic continuity, patient transfer and supply-chain plans. | Facility assets, capacity and continuity data. | DOH, utilities, emergency responders. |
| **PhilHealth** | F/CO | Healthcare-financing and claims continuity following disasters; preserve access when facilities or communications are disrupted. | Claims/service continuity data subject to privacy. | DOH, providers, DICT. |
| **National Nutrition Council** | C/E | Nutrition continuity during displacement and prolonged emergencies. | Nutrition/vulnerability indicators. | DOH, DSWD, LGUs. |
| **Philippine National AIDS Council** | C/CO | Ensure continuity of essential HIV-related services and treatment during disruptions. | Program continuity indicators. | DOH, LGUs. |
| **Department of Social Welfare and Development** | L/E | Own humanitarian logistics and social-protection response, not civil engineering. Map evacuation/relief hubs, warehouses, distribution routes and vulnerable-service needs. | Relief assets, evacuation/beneficiary data with privacy safeguards. | OCD/NDRRMC, LGUs, DOH, DepEd, transport actors. |
| **Council for the Welfare of Children** | C/E | Child-safe evacuation, shelter and transport requirements. | Child protection and facility guidance. | DSWD, LGUs, DepEd, DOH. |
| **National Commission of Senior Citizens** | C/E | Senior-specific mobility, evacuation, medicine and shelter requirements. | Senior service needs. | DSWD, LGUs, DOH. |
| **National Council on Disability Affairs** | R/C | Universal accessibility as a transport, building, evacuation and public-space acceptance requirement. | Accessibility policy/indicators. | DPWH, DOTr, DHSUD, LGUs, DSWD. |
| **Presidential Commission for the Urban Poor** | C | Participatory resettlement and protection against infrastructure planning that merely displaces poverty. | Community consultations and case data. | DHSUD/NHA, LGUs, CHR, DSWD. |
| **National Anti-Poverty Commission** | C/D | Treat transport cost, service accessibility and disaster exposure as poverty variables. | Poverty/accessibility policy data. | PSA, DSWD, DEPDev, LGUs. |
| **National Authority for Child Care / Juvenile Justice and Welfare Council** | C/CO | Continuity and evacuation requirements for facilities and services within their mandates. | Facility/service continuity data. | DSWD, LGUs, justice/health actors. |

## 20. Education, workforce and professional capacity

| Institution / body | Role | Required responsibility and resolution | Required data / evidence | Coordination and accountability |
|---|---|---|---|---|
| **Department of Education** | I/E/D | Every school gets hazard classification, safe access, drainage, structural/utility condition, accessibility and evacuation-suitability assessment. Do not assume every school is a safe evacuation center. | School locations, enrollment, facility condition, hazard/evacuation status. | DPWH, LGUs, OCD, BFP, DOH, DOE/water utilities. |
| **Commission on Higher Education** | R/C | Higher-education continuity, campus resilience and research mobilization. | Institution/campus data. | SUCs/private HEIs, DOST, LGUs. |
| **State universities and colleges** | S/I/CO | All SUCs inherit campus hazard/continuity/accessibility obligations and can supply regional research/technical capacity. Engineering-intensive and regionally relevant SUCs may serve as independent technical-review partners. | Campus assets, research, regional studies. | CHED, RDCs, DOST, LGUs. |
| **Technical Education and Skills Development Authority** | S | Build mass skills pipelines for rail, electrical systems, pumps, drainage maintenance, heavy equipment, rescue, GIS/survey, renewable energy and utility maintenance. | Training/certification and labor-demand data. | DOLE, DOTr, DPWH, DOE, DILG, industry. |
| **Professional Regulation Commission** | R/S | Competency and ethical standards for engineers, architects, planners and other regulated professions relevant to infrastructure. | Licensing/standards data. | Professional boards, CSC, implementing agencies. |
| **Civil Service Commission** | R/A | Professionalize technical public-sector career tracks in planning, hydrology, transport, GIS, procurement, asset management, project management, cybersecurity and data governance. | Qualification, staffing and competency frameworks. | Agencies, DAP/LGA/TESDA/PRC. |
| **Career Executive Service Board** | R/S | Strengthen leadership competency and continuity for career executive positions. | Competency/appointment data. | CSC, departments. |
| **Department of Labor and Employment** | R/C | Construction safety, extreme-heat/flood worker protection, labor-transition impacts of transport modernization and accessibility of jobs. | Labor market, OSH and commute-related research. | TESDA, DOTr, DPWH, DTI, LGUs. |
| **Institute for Labor Studies** | S | Research commute burden, transport affordability and infrastructure labor impacts. | Studies/data. | DOLE, DEPDev. |
| **NLRC / NCMB / NWPC** | J/C | Labor dispute resolution, wage/productivity analysis and continuity as relevant; no invented infrastructure authority. | Case/wage data. | DOLE ecosystem. |

## 21. Finance, industry, trade and competition

| Institution / body | Role | Required responsibility and resolution | Required data / evidence | Coordination and accountability |
|---|---|---|---|---|
| **Department of Finance** | F/L | National climate/resilience financing, fiscal-risk strategy, tax/guarantee implications and infrastructure-finance policy. | Fiscal risk, financing, revenue policy. | DBM, DEPDev, BTr, GFIs, revenue agencies. |
| **Bureau of Local Government Finance** | F/D | Assess LGU fiscal capacity to build, operate and maintain infrastructure; align local revenue capacity with lifecycle obligations. | LGU fiscal indicators. | DOF, DILG, DBM, LGUs. |
| **BIR / Bureau of Customs** | D/R | Revenue/customs functions and lawful registry interfaces relevant to contractors, imports and public finance; no project-selection authority. | Tax/customs records under lawful access. | DOF, PhilGEPS/GPPB, DTI as authorized. |
| **Insurance Commission** | R/F | Promote sound disaster-risk pricing and insurance/guarantee mechanisms where applicable. | Insurance market/risk information. | DOF, insurers, project sponsors. |
| **LandBank / Development Bank of the Philippines** | F | Finance resilient LGU infrastructure, public transport, housing, water, agriculture logistics and clean energy under sound credit and public-policy criteria. | Project finance and portfolio risk data subject to law. | DOF, DEPDev, LGUs, sector agencies. |
| **Philippine Guarantee Corporation** | F | Provide guarantees for qualifying strategic/resilient investments under mandate. | Guarantee/fiscal-risk data. | DOF, project sponsors. |
| **GSIS / SSS** | F/CO | Institutional-investment and service-continuity roles subject to fiduciary mandates; ensure benefits continuity after disasters. | Portfolio/service continuity data subject to law. | DOF/regulators, members. |
| **PDIC** | CO | Financial-system/service continuity; no direct infrastructure-planning role. | Institutional continuity data. | BSP, banks. |
| **Maharlika Investment Corporation** | F | Any infrastructure investment should pass the same network, economic, climate, governance and lifecycle tests as other public financing channels. | Investment decisions and portfolio data subject to governing law. | DEPDev/DOF/DBM and project sponsors. |
| **Department of Trade and Industry** | L/C | Integrate industrial location, logistics, supply chains, construction capacity and business continuity with transport, water, power and hazard capacity. | Industry/establishment/investment data. | BOI, CIAP, DEPDev, DOE, DOTr, DPWH, LGUs. |
| **Board of Investments** | F/C | Investment incentives should account for transport, power, water, housing and hazard capacity rather than externalize congestion/flood costs. | Registered project/incentive data. | DTI, LGUs, utilities, DEPDev. |
| **Construction Industry Authority of the Philippines / PCAB** | R/D | Build contractor performance history around quality, delay, defects, safety, change orders, warranty and maintenance, while preserving due process and separating risk indicators from findings. | Licensing, contractor and industry performance data. | DTI, PhilGEPS, procuring entities, COA. |
| **Cooperative Development Authority** | R/C | Support transport, utility and community cooperatives with governance and data standards. | Cooperative registry/program data. | OTC, DTI, LGUs, finance institutions. |
| **Small Business Corporation** | F | Disaster-recovery and resilience finance for SMEs. | Program/loan data subject to law. | DTI, LGUs. |
| **Philippine Competition Commission** | R/A | Assess competition risks in construction, transport, utilities, logistics and concessions; analytics may flag structures for review but cannot itself establish anticompetitive conduct. | Market studies/decisions. | DTI, regulators, procurement authorities. |
| **Economic zone/freeport authorities including BCDA, SBMA, AFAB, CEZA, APECO and similar bodies** | L/I/D | Publish transport demand, worker access, freight, water, power, housing, drainage and climate impacts; coordinate cross-boundary infrastructure with host/neighboring LGUs rather than externalize costs. | Zone assets, tenants, demand, utilities, capital plans. | DTI/DEPDev, LGUs, utilities, transport agencies, DENR. |
| **Bases Conversion and Development Authority** | I/L | Plan major estates/corridors as integrated land-use, transport, utilities and resilience systems with transparent lifecycle information. | Land, infrastructure, concession and capital data. | DEPDev, DOTr/DPWH, LGUs, utilities. |

## 22. Tourism, culture and national assets

| Institution / body | Role | Required responsibility and resolution | Required data / evidence | Coordination and accountability |
|---|---|---|---|---|
| **Department of Tourism** | L/C | Integrate destination carrying capacity, inter-island/urban accessibility, disaster readiness and visitor communication. | Visitor flows, destination plans, tourism facilities. | TIEZA, LGUs, DENR, DOTr, PCG/CAAP. |
| **Tourism Infrastructure and Enterprise Zone Authority** | I/F | Tourism infrastructure only after ecosystem, hazard, water, transport and lifecycle screens. | Project/zone data. | DOT, DENR, LGUs, DEPDev. |
| **Tourism Promotions Board** | C/CO | Demand management and emergency visitor communication; no engineering authority. | Campaign/visitor information. | DOT, LGUs. |
| **Intramuros Administration / National Parks Development Committee** | I/CO | Heritage/public-space accessibility, drainage, emergency and resilience planning. | Asset/facility data. | DOT/cultural agencies, LGUs, BFP. |
| **National Commission for Culture and the Arts / NHCP / National Museum / National Archives / National Library / CCP and related institutions** | I/CO | Protect irreplaceable heritage, archives and cultural assets with flood/fire/seismic risk assessment, digitization, climate control, evacuation and resilient access. | Cultural asset/facility inventories. | DPWH/BFP/OCD, LGUs, DICT for digital continuity. |
| **Komisyon sa Wikang Filipino / Philippine Information Agency / Presidential communications bodies** | C/CO | Multilingual, accessible risk, transport and emergency public information; preserve institutional continuity. | Public communication content/channels. | OCD, PAGASA, PHIVOLCS, LGUs, transport operators. |

## 23. Justice, accountability, rights and integrity

| Institution / body | Role | Required responsibility and resolution | Required data / evidence | Coordination and accountability |
|---|---|---|---|---|
| **Department of Justice** | J | Legal policy and prosecution where evidence supports violations; preserve due process and prosecutorial independence. | Cases/referrals and legal opinions as lawfully public. | NBI, prosecutors, courts, Ombudsman where applicable. |
| **National Bureau of Investigation** | J | Investigate infrastructure/procurement fraud and related offenses within authority and lawful referrals. eGovTrace signals are leads, not findings. | Investigation data subject to strict access controls. | DOJ, Ombudsman, prosecutors, law-enforcement partners. |
| **Land Registration Authority** | D/J | Land/title interoperability for ROW, expropriation and public-land issues within lawful disclosure constraints. | Title/registry data. | DOJ, DHSUD/LGUs, DPWH/DOTr, courts. |
| **Office of the Solicitor General / Office of the Government Corporate Counsel** | J/C | Represent government/GOCC interests in relevant litigation and legal advice. | Case/legal data. | Client agencies. |
| **Public Attorney's Office** | J/C | Protect access to justice for affected communities and individuals, including lawful relocation/expropriation disputes. | Case/service data. | Courts, affected communities. |
| **Office for Alternative Dispute Resolution** | J/C | Facilitate lawful ADR for appropriate infrastructure/ROW/project disputes. | ADR case data. | Agencies, LGUs, affected parties. |
| **Bureau of Corrections / Parole and Probation Administration** | E/CO | Facility and service continuity, evacuation/transfer access and resilient utilities. | Facility/service continuity data. | DOJ, BFP, DOH, utilities. |
| **Office of the Ombudsman** | A/J | Independently investigate/prosecute matters within constitutional/statutory authority. No analytical system may label a person guilty or corrupt. | Public decisions and lawful case information. | COA, DOJ/NBI, Sandiganbayan and agencies as legally appropriate. |
| **Commission on Human Rights** | A/C | Rights safeguards in relocation, demolition, emergency policing, indigenous communities, accessibility and treatment of vulnerable groups. | Investigations/advisories/public reports. | LGUs, DHSUD/NHA, DILG, agencies. |
| **Commission on Elections** | E/CO | Election continuity, resilient/accessibile voting facilities and logistics; no flood-control mandate. | Election facility/logistics continuity data. | LGUs, DepEd, PNP, DICT. |
| **National Commission on Indigenous Peoples** | R/C | Ancestral-domain rights, FPIC and indigenous knowledge requirements must be integrated before project lock-in. | Ancestral-domain and process information subject to law. | DENR, DEPDev, implementing agencies, LGUs. |
| **Anti-Red Tape Authority** | R/A | Measure and reduce approval/permitting delays by fixing process design and interoperability, not by removing substantive safeguards. | Process times, bottlenecks, compliance data. | Agencies, LGUs, DICT. |
| **National Intelligence Coordinating Agency / National Security Council** | C/CO | Critical-infrastructure threat intelligence/strategy within lawful national-security authority; not ordinary project management. | Threat information under classification controls. | Critical operators, DND/DICT/OP. |
| **OPAPRU** | C/I | Conflict-sensitive infrastructure and peace-area development coordination; require project identity and outcome visibility while recognizing security constraints. | Program/project and peace-area context. | LGUs/BARMM, line agencies, DEPDev. |
| **Philippine Drug Enforcement Agency / Dangerous Drugs Board** | CO/J | Operational continuity and limited security coordination within mandate; no invented transport/flood planning role. | Operational continuity data. | DILG/DOJ/OCD as relevant. |

## 24. Foreign affairs, migration and international cooperation

| Institution / body | Role | Required responsibility and resolution | Required data / evidence | Coordination and accountability |
|---|---|---|---|---|
| **Department of Foreign Affairs** | C/CO | International climate, maritime, transport, development-partner and technical cooperation; protect continuity of consular services during disasters. | Treaties/cooperation and continuity information. | DEPDev, DENR, DOTr, DOST, DMW. |
| **Foreign Service Institute / Technical Cooperation Council of the Philippines / UNESCO National Commission** | S/C | Capability building, technical cooperation and heritage/international obligations relevant to resilience. | Training/cooperation data. | DFA and sector agencies. |
| **Department of Migrant Workers** | C/CO | Overseas-worker family emergency coordination, service continuity and reintegration opportunities in infrastructure skills. | Service and labor data subject to privacy. | OWWA, DILG/LGUs, TESDA, DFA. |
| **Overseas Workers Welfare Administration** | E/CO | Disaster assistance and continuity for migrant workers/families within mandate. | Assistance/service data subject to privacy. | DMW, DFA, LGUs. |

## 25. BARMM intergovernmental architecture

| Institution / body | Role | Required responsibility and resolution | Required data / evidence | Coordination and accountability |
|---|---|---|---|---|
| **Bangsamoro Government / Office of the Chief Minister** | L/C | Coordinate as an autonomous regional government, not as a national field office. National integration must be based on intergovernmental interoperability and respect the Bangsamoro Organic Law and current institutions. | Regional plans, budgets, projects and outcome data under intergovernmental agreements. | DEPDev/ED Council mechanisms, national departments, BARMM ministries, LGUs. |
| **Bangsamoro Planning and Development Authority** | L/D | Regional counterpart/coordinator for integrated development, spatial and investment planning. | BARMM development/investment data. | DEPDev, ministries, LGUs. |
| **Ministry of Public Works** | L/I/D | BARMM roads, bridges, public works and flood-related infrastructure within authority; maintain project/asset lifecycle visibility. | Assets/projects/maintenance data. | BPDA, MENRE, MOTC, LGUs. |
| **Ministry of Transportation and Communications** | L/I/R | Regional land/water/transport and communications functions within current authority; integrate with national networks. | Transport/service/asset data. | DOTr/DICT counterparts, BPMA, LGUs. |
| **Bangsamoro Ports Management Authority** | I/D | Ports/inter-island network within BARMM; resilience and intermodal integration. | Port assets/flows/outages. | MOTC, MARINA/PCG/national ports counterparts as legally relevant. |
| **Ministry of Environment, Natural Resources and Energy** | L/R/D | Watershed, environment, geology/natural resources and energy planning within BARMM powers. | Environmental/water/energy data. | National counterparts through intergovernmental coordination. |
| **Ministry of Agriculture, Fisheries and Agrarian Reform** | L/I | Agriculture, irrigation/fisheries and rural logistics within regional powers. | Agriculture/fisheries/infrastructure data. | BPDA, national DA/NIA interfaces as applicable. |
| **Ministry of Human Settlements and Development** | L/I | Safe, accessible housing and settlement planning. | Housing/settlement data. | BPDA, LGUs, national DHSUD interfaces. |
| **Ministry of the Interior and Local Government / Ministry of Public Order and Safety** | L/E/C | Local-government capability, emergency/public-safety coordination within regional structure. | LGU/public-safety readiness. | OCD/NDRRMC and national public-safety interfaces as legally appropriate. |
| **Ministry of Finance, Budget and Management** | F/L | Regional budget and program alignment with approved BARMM plans and interoperable project identity. | Budget/program data. | BPDA, ministries, national fiscal interfaces. |
| **Ministry of Science and Technology / BI/ICT Office** | S/L | Regional science, hazard/data and digital interoperability capacity. | R&D/digital infrastructure data. | National DOST/DICT counterparts. |
| **Ministry of Health / Ministry of Social Services and Development** | E/I | Health, relief and vulnerable-population resilience. | Facility/service/relief data. | LGUs, regional emergency actors. |
| **Bangsamoro Human Rights Commission / Women Commission / Indigenous Peoples ministry / cultural institutions** | A/C | Rights, gender, indigenous and cultural safeguards in infrastructure, relocation and emergency planning. | Advisories, consultations and public reports. | BARMM ministries and LGUs. |

## 26. Other executive and continuity-only bodies

| Institution / body | Role | Required responsibility and resolution | Required data / evidence | Coordination and accountability |
|---|---|---|---|---|
| **Commission on Filipinos Overseas** | C/CO | Overseas-Filipino communication, migration-development input and continuity. | Program/migration data. | DFA, DMW, LGUs. |
| **Film Development Council of the Philippines / MTRCB / Optical Media Board** | CO | Facility, workforce and service continuity only unless a specific lawful project creates a direct dependency. | Continuity plans. | Local emergency/utilities actors. |
| **Games and Amusements Board / Philippine Racing Commission / sports regulatory bodies** | CO | Venue/event continuity and public-safety coordination; no national infrastructure-planning role. | Facility/event continuity information. | LGUs, BFP, PNP. |
| **Philippine Sports Commission** | I/CO | Hazard-safe public sports facilities; designated facilities may support emergency functions only when technically suitable. | Facility assets/continuity. | LGUs, BFP/OCD. |
| **Philippine Space Agency** | S/D | Earth observation, satellite imagery, disaster monitoring and communications research; use as complementary evidence, not replacement for authoritative ground systems. | Remote-sensing and satellite products. | DOST, NAMRIA, DENR, OCD, implementing agencies. |
| **Mindanao Development Authority** | L/C | Mindanao-wide economic, logistics and interregional coordination, avoiding duplication with RDC/BARMM authority. | Regional/corridor plans and project pipeline. | DEPDev/RDCs/BARMM/LGUs. |
| **Marawi Compensation Board** | C/J | Lawful compensation/property information relevant to recovery; no generalized project authority. | Claims/compensation data under applicable disclosure rules. | BARMM/national recovery actors, courts/registries. |
| **GCG** | R/A | For covered GOCCs, include service reliability, asset condition, capital delivery and climate resilience in performance governance where appropriate. | GOCC performance and governance data. | GOCCs, DOF/DBM/sector departments. |
| **All remaining national offices, commissions, boards and councils in the current DBM Government Directory** | CO/C | They remain inside the State Control Universe. If no direct flood/mobility/infrastructure mandate exists, they inherit continuity, facility resilience, records continuity, workforce access and lawful consultation duties rather than an invented engineering role. | Facility/service continuity and any mandate-specific dependency data. | Their parent/oversight institutions and relevant local/emergency/utilities actors. |

## 27. GOCC and public-corporation coverage rule

| Institution / body | Role | Required responsibility and resolution | Required data / evidence | Coordination and accountability |
|---|---|---|---|---|
| **Infrastructure/service GOCCs** | I/D | Every GOCC operating physical infrastructure or public services must expose asset, hazard, service-continuity, capital-plan, maintenance and outcome information through lawful interoperability. Examples include transport, water, energy, housing, area-development and port/airport corporations. | Asset/service/capital/outage data. | Sector department, GCG, DEPDev, DBM/DOF, LGUs. |
| **Government financial institutions** | F | Finance projects subject to the same lifecycle, climate, affordability and network tests as budget-funded projects. | Project finance and risk data under law. | DOF/DEPDev, sector sponsors. |
| **Area-development authorities** | L/I/D | Treat estates/freeports/economic zones as complete urban systems: transport, worker access, drainage, water, power, housing, environment and emergency access. | Land, infrastructure, utilities and demand data. | Host LGUs, DEPDev, sector agencies. |
| **Supported GOCCs and other public corporations** | CO/C | Where no direct infrastructure/service role exists, apply continuity-only requirements and specific mandate dependencies. | Continuity data. | Sector/oversight body. |

## 28. Cross-agency resolution mechanisms

The matrix becomes operational through six shared mechanisms.

### A. One project identity, many authoritative systems

A major public project should have a durable project identity that can relate, without copying authority away from source systems, to:

- planning/appraisal identity;
- appropriation/program identity;
- procurement/PhilGEPS identifiers;
- contract and contractor;
- geospatial footprint;
- physical asset(s);
- milestones/inspections;
- payments;
- maintenance work;
- outcome indicators.

The purpose is traceability, not centralization.

### B. One geographic object graph

Agencies frequently refer to the same place differently. The national layer must reconcile:

- road segment/corridor;
- bridge;
- river/tributary;
- drainage catchment;
- watershed;
- housing site;
- port/airport/station;
- school/hospital;
- barangay/LGU;
- project polygon/line/point.

Geographic overlap must be classified as legitimate complementarity, coordinated co-financing, intersecting scope, probable duplication or possible double funding. It must **never** be automatically labeled corruption.

### C. Formal dependency declaration

Every major project should state dependencies such as:

- ROW acquisition;
- utility relocation;
- upstream/downstream flood works;
- power supply;
- drainage outfall;
- feeder transport;
- permits/ECC;
- resettlement;
- port/rail/bus interchange;
- local connecting road;
- operation and maintenance organization.

A dependency without an owner becomes a monitored risk.

### D. Escalation without mandate theft

Cross-agency blockers should follow:

> implementing agency → regional/interagency resolution → RDC/InfraCom/ICC or appropriate statutory body → executive escalation when necessary

The resolution layer does not take over the underlying agency's legal function.

### E. Common outcome vocabulary

At minimum:

**Flood/resilience:** people exposed, depth, duration, frequency, critical-service downtime, evacuation access, ecological condition.

**Mobility:** person-throughput, travel time, reliability, public-transport access, affordability, road deaths/injuries, walking/cycling access, intermodal transfer quality.

**Housing:** hazard exposure, jobs/services access, combined housing+transport burden, post-relocation livelihood/service retention.

**Infrastructure lifecycle:** condition, preventive maintenance compliance, defects, downtime, warranty performance, lifecycle cost.

**Government delivery:** planning-to-budget consistency, procurement duration, change orders, schedule/cost variance, unresolved dependencies, verified completion, outcome attainment.

### F. Accountability firewall

The national observability system may say:

- evidence missing;
- expected milestone not observed;
- two project geometries overlap;
- contract variation exceeds a threshold;
- contractor recurs unusually;
- payment appears ahead of expected verification;
- asset outcome deteriorated.

It may **not** say, without competent legal process:

- corrupt;
- stolen;
- fraudulent;
- guilty;
- illegal enrichment;
- conspiracy.

Those conclusions belong to authorized investigative, prosecutorial, audit and judicial institutions.

## 29. Required agency/sector master-plan template

Every sectoral infrastructure master plan submitted into the RA 12145 architecture should contain:

1. statutory/administrative mandate;
2. current asset and service baseline;
3. geospatial scope and network;
4. demand/population/economic scenarios;
5. climate and multi-hazard assumptions;
6. critical dependencies on other agencies/utilities;
7. existing project pipeline and funding sources;
8. operations and maintenance plan;
9. data systems and authoritative identifiers;
10. interoperability requirements;
11. service/outcome KPIs;
12. equity/accessibility impacts;
13. environmental/nature-based requirements;
14. emergency/continuity plan;
15. procurement and market-capacity risks;
16. workforce and institutional-capacity needs;
17. financing and lifecycle-cost plan;
18. legal/regulatory changes required;
19. projects to stop, merge, redesign or defer;
20. uncertainty, evidence gaps and required studies.

## 30. Minimum national governance products

The matrix should result in, at minimum:

1. **State Control Universe register** — versioned institutional list, mandate category, parent/oversight relationships.
2. **Sector master-plan registry** — current approved plans, geographic coverage, validity and responsible body.
3. **National project/asset identity model** — cross-system identifiers and geospatial references.
4. **Dependency graph** — project-to-project, asset-to-utility and upstream/downstream dependencies.
5. **Critical-service accessibility graph** — communities to hospitals, BFP, evacuation, ports/airports and other essential services under normal and hazard scenarios.
6. **Outcome registry** — which problem each investment was intended to solve and how success is measured.
7. **Exception/verification workflow** — unresolved discrepancies routed to the competent body, with uncertainty preserved.
8. **Continuous-revision record** — each major hazard event, project evaluation and audit finding can update assumptions for the next planning cycle.

## 31. Relationship to eGovTrace

This document is useful to eGovTrace because the product's central question is:

> **What should have happened, what actually happened, and where do they diverge?**

The matrix supplies the **institutional “should” layer**: which institution is expected to plan, fund, procure, build, regulate, inspect, operate, maintain, respond, audit or adjudicate.

It does not mean eGovTrace should immediately model hundreds of agencies in code. Promotion should be incremental:

1. research the authoritative mandate and source system;
2. define the expected control path;
3. define government events and evidence/provenance;
4. reconcile observed events against the expected path;
5. produce explainable, non-accusatory signals;
6. preserve human verification and legal authority boundaries.

## 32. Source register

Primary references used to anchor this handoff:

- Republic Act No. 12145, Economy, Planning and Development Act: https://lawphil.net/statutes/repacts/ra2025/ra_12145_2025.html
- Republic Act No. 12254, E-Governance Act: https://lawphil.net/statutes/repacts/ra2025/ra_12254_2025.html
- Republic Act No. 12009, New Government Procurement Act: https://lawphil.net/statutes/repacts/ra2024/ra_12009_2024.html
- IRR of Republic Act No. 12009: https://lawphil.net/statutes/repacts/ra2025/irr_12009_2025.html
- Republic Act No. 10121, Philippine Disaster Risk Reduction and Management Act: https://lawphil.net/statutes/repacts/ra2010/ra_10121_2010.html
- Republic Act No. 7160, Local Government Code: https://lawphil.net/statutes/repacts/ra1991/ra_7160_1991.html
- Republic Act No. 9729, Climate Change Act: https://lawphil.net/statutes/repacts/ra2009/ra_9729_2009.html
- DBM 2026 Philippine Government Directory: https://www.dbm.gov.ph/wp-content/uploads/AboutDBM/2026-Government-Directory.pdf
- DBM FY 2026 General Appropriations Act index: https://www.dbm.gov.ph/index.php/2026/general-appropriations-act-gaa-fy-2026
- Philippine Development Plan 2023–2028: https://pdp.depdev.gov.ph/wp-content/uploads/2022/12/The-Philippine-Development-Plan-2023-2028.pdf
- DILG mandate reference: https://ncr.dilg.gov.ph/dilg-ncr-mandate/
- BFP program/powers reference including disaster/rescue functions: https://bfp.gov.ph/wp-content/uploads/2023/04/BFP-Program-Thrusts-and-Policy-Directions-for-CY-2023.pdf
- NHA Citizens Charter/mandate reference for ROW, danger-zone and transitional-shelter functions: https://nha.gov.ph/wp-content/uploads/2020/10/NHA-2020-Corporate-Citizens-Charter-Handbook.pdf
- MMDA metropolitan service/mandate reference: https://mmfmp.mmda.gov.ph/who-we-are
- Bangsamoro government institutional reference: https://officialgazette.bangsamoro.gov.ph/

## 33. Handoff rule

This matrix should be read together with the separate **National Flood, Mobility, Resilience and Infrastructure Engineering Master Plan v1**. The matrix answers **who owns what and how agencies must interlock**. The engineering master plan answers **what physical, operational, data and lifecycle system should be built**.

Neither document authorizes implementation on its own. Any eGovTrace implementation consequence must pass the repository's research-to-engineering promotion path and must be tested against the live legal and institutional state at the time of implementation.
