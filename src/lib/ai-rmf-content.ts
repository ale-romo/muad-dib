
interface AiRmfProps {
  [key: string]: {
    title: string;
    steps: string[][];
  }[];
}
export const data:AiRmfProps = {
      Govern: [
{
  title: "Govern-1: Policies, processes, procedures and practices across the organization related to the mapping, measuring and managing of AI risks are in place, transparent, and implemented effectively",
  steps: [
["Governance and Oversight", "Legal and Regulatory, Governance", "Govern-1.1 Legal and regulatory requirements involving AI are understood, managed, and documented.", "AI systems may be subject to specific applicable legal and regulatory requirements. Some legal requirements can mandate (e.g., nondiscrimination, data privacy and security controls) documentation, disclosure, and increased AI system transparency. These requirements are complex and may not be applicable or differ across applications and contexts. \n \nFor example, AI system testing processes for bias measurement, such as disparate impact, are not applied uniformly within the legal context. Disparate impact is broadly defined as a facially neutral policy or practice that disproportionately harms a group based on a protected trait. Notably, some modeling algorithms or debiasing techniques that rely on demographic information, could also come into tension with legal prohibitions on disparate treatment (i.e., intentional discrimination).\n\nAdditionally, some intended users of AI systems may not have consistent or reliable access to fundamental internet technologies (a phenomenon widely described as the â€œdigital divideâ€) or may experience difficulties interacting with AI systems due to disabilities or impairments. Such factors may mean different communities experience bias or other negative impacts when trying to access AI systems. Failure to address such design issues may pose legal risks, for example in employment related activities affecting persons with disabilities.", "* Maintain awareness of the applicable legal and regulatory considerations and requirements specific to industry, sector, and business purpose, as well as the application context of the deployed AI system.\n* Align risk management efforts with applicable legal standards.\n* Maintain policies for training (and re-training) organizational staff about necessary legal or regulatory considerations that may impact AI-related design, development and deployment activities.", "### Organizations can document the following\n- To what extent has the entity defined and documented the regulatory environmentâ€”including minimum requirements in laws and regulations?\n- Has the system been reviewed for its compliance to applicable laws, regulations, standards, and guidance? \n- To what extent has the entity defined and documented the regulatory environmentâ€”including applicable requirements in laws and regulations? \n- Has the system been reviewed for its compliance to relevant applicable laws, regulations, standards, and guidance? \n\n### AI Transparency Resources\n\nGAO-21-519SP: AI Accountability Framework for Federal Agencies & Other Entities. [URL](https://www.gao.gov/products/gao-21-519sp)", "Andrew Smith, “Using Artificial Intelligence and Algorithms,” FTC Business Blog (2020). https://www.ftc.gov/business-guidance/blog/2020/04/using-artificial-intelligence-and-algorithms\n\nRebecca Kelly Slaughter, “Algorithms and Economic Justice,” ISP Digital Future Whitepaper & YJoLT Special Publication (2021). https://law.yale.edu/sites/default/files/area/center/isp/documents/algorithms_and_economic_justice_master_final.pdf\n\nPatrick Hall, Benjamin Cox, Steven Dickerson, Arjun Ravi Kannan, Raghu Kulkarni, and Nicholas Schmidt, “A United States fair lending perspective on machine learning,” Frontiers in Artificial Intelligence 4 (2021). https://www.frontiersin.org/articles/10.3389/frai.2021.695301/full\n\nAI Hiring Tools and the Law, Partnership on Employment & Accessible Technology (PEAT, peatworks.org). https://www.peatworks.org/ai-disability-inclusion-toolkit/ai-hiring-tools-and-the-law/"],
["Governance and Oversight", "Trustworthy Characteristics, Governance, Validity and Reliability, Safety, Secure and Resilient, Accountability and Transparency, Explainability and Interpretability, Privacy, Fairness and Bias", "Govern-1.2 The characteristics of trustworthy AI are integrated into organizational policies, processes, and procedures.", "Policies, processes, and procedures are central components of effective AI risk management and fundamental to individual and organizational accountability. All stakeholders benefit from policies, processes, and procedures which require preventing harm by design and default. \n\nOrganizational policies and procedures will vary based on available resources and risk profiles, but can help systematize AI actor roles and responsibilities throughout the AI lifecycle. Without such policies, risk management can be subjective across the organization, and exacerbate rather than minimize risks over time.  Policies, or summaries thereof, are understandable to relevant AI actors. Policies reflect an understanding of the underlying metrics, measurements, and tests that are necessary to support policy and AI system design, development, deployment and use.\n\nLack of clear information about responsibilities and chains of command will limit the effectiveness of risk management.", "Organizational AI risk management policies should be designed to:\n\n- Define key terms and concepts related to AI systems and the scope of their purposes and intended uses.\n- Connect AI governance to existing organizational governance and risk controls. \n- Align to broader data governance policies and practices, particularly the use of sensitive or otherwise risky data.\n- Detail standards for experimental design, data quality, and model training.\n- Outline and document risk mapping and measurement processes and standards.\n- Detail model testing and validation processes.\n- Detail review processes for legal and risk functions.\n- Establish the frequency of and detail for monitoring, auditing and review processes.\n- Outline change management requirements.\n- Outline processes for internal and external stakeholder engagement.\n- Establish whistleblower policies to facilitate reporting of serious AI system concerns.\n- Detail and test incident response plans.\n- Verify that formal AI risk management policies align to existing legal standards, and industry best practices and norms.\n- Establish AI risk management policies that broadly align to AI system trustworthy characteristics.\n- Verify that formal AI risk management policies include currently deployed and third-party AI systems.", "### Organizations can document the following\n- To what extent do these policies foster public trust and confidence in the use of the AI system?\n- What policies has the entity developed to ensure the use of the AI system is consistent with its stated values and principles?\n- What policies and documentation has the entity developed to encourage the use of its AI system as intended?\n- To what extent are the model outputs consistent with the entityâ€™s values and principles to foster public trust and equity?\n\n### AI Transparency Resources\n\n\nGAO-21-519SP: AI Accountability Framework for Federal Agencies & Other Entities. [URL](https://www.gao.gov/products/gao-21-519sp)", "Off. Comptroller Currency, Comptroller’s Handbook: Model Risk Management (Aug. 2021). https://www.occ.gov/publications-and-resources/publications/comptrollers-handbook/files/model-risk-management/index-model-risk-management.html\n\nGAO, “Artificial Intelligence: An Accountability Framework for Federal Agencies and Other Entities,” GAO@100 (GAO-21-519SP), June 2021. https://www.gao.gov/assets/gao-21-519sp.pdf\n\nNIST, “U.S. Leadership in AI: A Plan for Federal Engagement in Developing Technical Standards and Related Tools”. https://www.nist.gov/system/files/documents/2019/08/10/ai_standards_fedengagement_plan_9aug2019.pdf \n\nLipton, Zachary and McAuley, Julian and Chouldechova, Alexandra, Does mitigating ML’s impact disparity require treatment disparity? Advances in Neural Information Processing Systems, 2018. https://proceedings.neurips.cc/paper/2018/file/8e0384779e58ce2af40eb365b318cc32-Paper.pdf \n\nSAS Institute, “The SAS® Data Governance Framework: A Blueprint for Success”. https://www.sas.com/content/dam/SAS/en_us/doc/whitepaper1/sas-data-governance-framework-107325.pdf \n\nISO, “Information technology — Reference Model of Data Management, “ ISO/IEC TR 10032:200. https://www.iso.org/standard/38607.html \n\n“Play 5: Create a formal policy,” Partnership on Employment & Accessible Technology (PEAT, peatworks.org). https://www.peatworks.org/ai-disability-inclusion-toolkit/the-equitable-ai-playbook/play-5-create-a-formal-equitable-ai-policy/ \n\n“plainlanguage.gov – Home,” The U.S. Government. https://www.plainlanguage.gov/ "],
["Governance and Oversight", "Risk Tolerance, Governance", "Govern-1.3 Processes and procedures are in place to determine the needed level of risk management activities based on the organization's risk tolerance.", "Risk management resources are finite in any organization. Adequate AI governance policies delineate the mapping, measurement, and prioritization of risks to allocate resources toward the most material issues for an AI system to ensure effective risk management. Policies may specify systematic processes for assigning mapped and measured risks to standardized risk scales. \n\nAI risk tolerances  range from negligible to critical â€“ from, respectively, almost no risk to risks that can result in irredeemable human, reputational, financial, or environmental losses. Risk tolerance rating policies consider different sources of risk, (e.g., financial, operational, safety and wellbeing, business, reputational, or model risks). A typical risk measurement approach entails the multiplication, or qualitative combination, of measured or estimated impact and likelihood of impacts into a risk score (risk â‰ˆ impact x likelihood). This score is then placed on a risk scale. Scales for risk may be qualitative, such as red-amber-green (RAG), or may entail simulations or econometric approaches. Impact assessments are a common tool for understanding the severity of mapped risks. In the most fulsome AI risk management approaches, all models are assigned to a risk level.", "- Establish policies to define mechanisms for measuring or understanding an AI systemâ€™s potential impacts, e.g., via regular impact assessments at key stages in the AI lifecycle, connected to system impacts and frequency of system updates.\n- Establish policies to define mechanisms for measuring or understanding the likelihood of an AI systemâ€™s impacts and their magnitude at key stages in the AI lifecycle. \n- Establish policies that define assessment scales for measuring potential AI system impact. Scales may be qualitative, such as red-amber-green (RAG), or may entail simulations or econometric approaches. \n- Establish policies for assigning an overall risk measurement approach for an AI system, or its important components, e.g., via multiplication or combination of a mapped riskâ€™s impact and likelihood (risk â‰ˆ impact x likelihood).\n- Establish policies to assign systems to uniform risk scales that are valid across the organizationâ€™s AI portfolio (e.g. documentation templates), and acknowledge risk tolerance and risk levels may change over the lifecycle of an AI system.", "### Organizations can document the following\n- How do system performance metrics inform risk tolerance decisions?\n- What policies has the entity developed to ensure the use of the AI system is consistent with organizational risk tolerance?\n- How do the entityâ€™s data security and privacy assessments inform risk tolerance decisions?\n\n\n### AI Transparency Resources\n- GAO-21-519SP: AI Accountability Framework for Federal Agencies & Other Entities. [URL](https://www.gao.gov/products/gao-21-519sp)", "Board of Governors of the Federal Reserve System. SR 11-7: Guidance on Model Risk Management. (April 4, 2011). https://www.federalreserve.gov/supervisionreg/srletters/sr1107.htm \n\nThe Office of the Comptroller of the Currency. Enterprise Risk Appetite Statement. (Nov. 20, 2019). https://www.federalreserve.gov/supervisionreg/srletters/sr1107.htm \n\nBrenda Boultwood, How to Develop an Enterprise Risk-Rating Approach (Aug. 26, 2021). Global Association of Risk Professionals (garp.org). Accessed Jan. 4, 2023. https://www.garp.org/risk-intelligence/culture-governance/how-to-develop-an-enterprise-risk-rating-approach \n\nGAO-17-63: Enterprise Risk Management: Selected Agencies’ Experiences Illustrate Good Practices in Managing Risk. https://www.gao.gov/assets/gao-17-63.pdf "],
["Governance and Oversight", "Risk Management, Governance, Documentation", "Govern-1.4 The risk management process and its outcomes are established through transparent policies, procedures, and other controls based on organizational risk priorities.", "Clear policies and procedures relating to documentation and transparency facilitate and enhance efforts  to communicate roles and responsibilities for the Map, Measure and Manage functions across the AI lifecycle. Standardized documentation can help organizations systematically integrate AI risk management processes and enhance accountability efforts. For example, by adding their contact information to a work product document, AI actors can improve communication, increase ownership of work products, and potentially enhance consideration of product quality. Documentation may generate downstream benefits related to improved system replicability and robustness. Proper documentation storage and access procedures allow for quick retrieval of critical information during a negative incident. Explainable machine learning efforts (models and explanatory methods) may bolster technical documentation practices by introducing additional information for review and interpretation by AI Actors.", "- Establish and regularly review documentation policies that, among others, address information related to:\n    - AI actors contact informations\n    - Business justification\n    - Scope and usages\n    - Expected and potential risks and impacts\n    - Assumptions and limitations\n    - Description and characterization of training data\n    - Algorithmic methodology\n    - Evaluated alternative approaches\n    - Description of output data\n    - Testing and validation results (including explanatory visualizations and information)\n    - Down- and up-stream dependencies\n    - Plans for deployment, monitoring, and change management\n    - Stakeholder engagement plans\n- Verify documentation policies for AI systems are standardized across the organization and remain current.\n- Establish policies for a model documentation inventory system and regularly review its completeness, usability, and efficacy.\n- Establish mechanisms to regularly review the efficacy of risk management processes.\n- Identify AI actors responsible for evaluating efficacy of risk management processes and approaches, and for course-correction based on results.\n- Establish policies and processes regarding public disclosure of the use of AI and risk management material such as impact assessments, audits, model documentation and validation and testing results.\n- Document and review the use and efficacy of different types of transparency tools and follow industry standards at the time a model is in use.", "### Organizations can document the following\n- To what extent has the entity clarified the roles, responsibilities, and delegated authorities to relevant stakeholders?\n- What are the roles, responsibilities, and delegation of authorities of personnel involved in the design, development, deployment, assessment and monitoring of the AI system?\n- How will the appropriate performance metrics, such as accuracy, of the AI be monitored after the AI is deployed? How much distributional shift or model drift from baseline performance is acceptable?\n\n### AI Transparency Resources\n- GAO-21-519SP: AI Accountability Framework for Federal Agencies & Other Entities. [URL](https://www.gao.gov/products/gao-21-519sp)\n- Intel.gov: AI Ethics Framework for Intelligence Community  - 2020. [URL](https://www.intelligence.gov/artificial-intelligence-ethics-framework-for-the-intelligence-community)", "Bd. Governors Fed. Rsrv. Sys., Supervisory Guidance on Model Risk Management, SR Letter 11-7 (Apr. 4, 2011).\n\nOff. Comptroller Currency, Comptroller’s Handbook: Model Risk Management (Aug. 2021). https://www.occ.gov/publications-and-resources/publications/comptrollers-handbook/files/model-risk-management/index-model-risk-management.html \n\nMargaret Mitchell et al., “Model Cards for Model Reporting.” Proceedings of 2019 FATML Conference. https://arxiv.org/pdf/1810.03993.pdf \n\nTimnit Gebru et al., “Datasheets for Datasets,” Communications of the ACM 64, No. 12, 2021. https://arxiv.org/pdf/1803.09010.pdf \n\nEmily M. Bender, Batya Friedman, Angelina McMillan-Major (2022). A Guide for Writing Data Statements for Natural Language Processing. University of Washington. Accessed July 14, 2022. https://techpolicylab.uw.edu/wp-content/uploads/2021/11/Data_Statements_Guide_V2.pdf \n\nM. Arnold, R. K. E. Bellamy, M. Hind, et al. FactSheets: Increasing trust in AI services through supplier’s declarations of conformity. IBM Journal of Research and Development 63, 4/5 (July-September 2019), 6:1-6:13. https://arxiv.org/abs/1808.07261 \n\nNavdeep Gill, Abhishek Mathur, Marcos V. Conde (2022). A Brief Overview of AI Governance for Responsible Machine Learning Systems. ArXiv, abs/2211.13130. https://arxiv.org/pdf/2211.13130.pdf \n\nJohn Richards, David Piorkowski, Michael Hind, et al. A Human-Centered Methodology for Creating AI FactSheets. Bulletin of the IEEE Computer Society Technical Committee on Data Engineering. http://sites.computer.org/debull/A21dec/p47.pdf \n\nChristoph Molnar, Interpretable Machine Learning, lulu.com. https://christophm.github.io/interpretable-ml-book/ \n\nDavid A. Broniatowski. 2021. Psychological Foundations of Explainability and Interpretability in Artificial Intelligence. National Institute of Standards and Technology (NIST) IR 8367. National Institute of Standards and Technology, Gaithersburg, MD. https://nvlpubs.nist.gov/nistpubs/ir/2021/NIST.IR.8367.pdf \n\nOECD (2022), “OECD Framework for the Classification of AI systems”, OECD Digital Economy Papers, No. 323, OECD Publishing, Paris. https://www.oecd-ilibrary.org/science-and-technology/oecd-framework-for-the-classification-of-ai-systems_cb6d9eca-en"],
["Governance and Oversight, Operation and Monitoring", "Continuous monitoring, Governance", "Govern-1.5 Ongoing monitoring and periodic review of the risk management process and its outcomes are planned, organizational roles and responsibilities are clearly defined, including determining the frequency of periodic review.", "AI systems are dynamic and may perform in unexpected ways once deployed or after deployment. Continuous monitoring is a risk management process for tracking unexpected issues and performance changes, in real-time or at a specific frequency, across the AI system lifecycle.\n\nIncident response and â€œappeal and overrideâ€ are commonly used processes in information technology management. These processes enable real-time flagging of potential incidents, and human adjudication of system outcomes.\n\nEstablishing and maintaining incident response plans can reduce the likelihood of additive impacts during an AI incident. Smaller organizations which may not have fulsome governance programs, can utilize incident response plans for addressing system failures, abuse or misuse.", "- Establish policies to allocate appropriate resources and capacity for assessing impacts of AI systems on individuals, communities and society.\n- Establish policies and procedures for monitoring and addressing AI system performance and trustworthiness, including bias and security problems, across the lifecycle of the system.\n- Establish policies for AI system incident response, or confirm that existing incident response policies apply to AI systems.\n- Establish policies to define organizational functions and personnel responsible for AI system monitoring and incident response activities.\n- Establish mechanisms to enable the sharing of feedback from impacted individuals or communities about negative impacts from AI systems.\n- Establish mechanisms to provide recourse for impacted individuals or communities to contest problematic AI system outcomes.\n- Establish opt-out mechanisms.", "### Organizations can document the following\n- To what extent does the system/entity consistently measure progress towards stated goals and objectives?\n- Did your organization implement a risk management system to address risks involved in deploying the identified AI solution (e.g. personnel risk or changes to commercial objectives)?\n- Did your organization address usability problems and test whether user interfaces served their intended purposes? \n\n### AI Transparency Resources\n- GAO-21-519SP: AI Accountability Framework for Federal Agencies & Other Entities. [URL](https://www.gao.gov/products/gao-21-519sp)\n- WEF Model AI Governance Framework Assessment 2020. [URL](https://www.pdpc.gov.sg/-/media/Files/PDPC/PDF-Files/Resource-for-Organisation/AI/SGModelAIGovFramework2.pdf)", "National Institute of Standards and Technology. (2018). Framework for improving critical infrastructure cybersecurity. https://nvlpubs.nist.gov/nistpubs/cswp/nist.cswp.04162018.pdf \n\nNational Institute of Standards and Technology. (2012). Computer Security Incident Handling Guide. NIST Special Publication 800-61 Revision 2. https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-61r2.pdf "],
["Governance and Oversight", "Risk Management, Governance, Data, Documentation", "Govern-1.6 Mechanisms are in place to inventory AI systems and are resourced according to organizational risk priorities.", "An AI system inventory is an organized database of artifacts relating to an AI system or model. It may include system documentation, incident response plans, data dictionaries, links to implementation software or source code, names and contact information for relevant AI actors, or other information that may be helpful for model or system maintenance and incident response purposes. AI system inventories also enable a holistic view of organizational AI assets. A serviceable AI system inventory may allow for the quick resolution of:\n\n- specific queries for single models, such as  â€œwhen was this model last refreshed?â€ \n- high-level queries across all models, such as, â€œhow many models are currently deployed within our organization?â€ or â€œhow many users are impacted by our models?â€ \n\nAI system inventories are a common element of traditional model risk management approaches and can provide technical, business and risk management benefits. Typically inventories capture all organizational models or systems, as partial inventories may not provide the value of a full inventory.", "- Establish policies that define the creation and maintenance of AI system inventories.\n- Establish policies that define a specific individual or team that is responsible for maintaining the inventory.\n- Establish policies that define which models or systems are inventoried, with preference to inventorying all models or systems, or minimally, to high risk models or systems, or systems deployed in high-stakes settings.\n- Establish policies that define model or system attributes to be inventoried, e.g, documentation, links to source code, incident response plans, data dictionaries, AI actor contact information.", "### Organizations can document the following\n- Who is responsible for documenting and maintaining the AI system inventory details?\n- What processes exist for data generation, acquisition/collection, ingestion, staging/storage, transformations, security, maintenance, and dissemination?\n- Given the purpose of this AI, what is an appropriate interval for checking whether it is still accurate, unbiased, explainable, etc.? What are the checks for this model?\n\n### AI Transparency Resources\n- GAO-21-519SP: AI Accountability Framework for Federal Agencies & Other Entities. [URL](https://www.gao.gov/products/gao-21-519sp)\n- Intel.gov: AI Ethics Framework for Intelligence Community - 2020. [URL](https://www.intelligence.gov/artificial-intelligence-ethics-framework-for-the-intelligence-community)", "“A risk-based integrity level schema”, in IEEE 1012, IEEE Standard for System, Software, and Hardware Verification and Validation. See Annex B. https://ieeexplore.ieee.org/document/ \n\nOff. Comptroller Currency, Comptroller’s Handbook: Model Risk Management (Aug. 2021). See “Model Inventory,” pg. 26. https://www.occ.gov/publications-and-resources/publications/comptrollers-handbook/files/model-risk-management/index-model-risk-management.html \n\nVertaAI, “ModelDB: An open-source system for Machine Learning model versioning, metadata, and experiment management.” Accessed Jan. 5, 2023. https://github.com/VertaAI/modeldb "],
["AI Deployment, Operation and Monitoring", "Decommission, Governance", "Govern-1.7 Processes and procedures are in place for decommissioning and phasing out of AI systems safely and in a manner that does not increase risks or decrease the organization’s trustworthiness.", "Irregular or indiscriminate termination or deletion of models or AI systems may be inappropriate and increase organizational risk. For example, AI systems may be subject to regulatory requirements or implicated in future security or legal investigations. To maintain trust, organizations may consider establishing policies and processes for the systematic and deliberate decommissioning of AI systems. Typically, such policies consider user and community concerns, risks in dependent and linked systems, and security, legal or regulatory concerns. Decommissioned models or systems may be stored in a model inventory along with active models,  for an established length  of time.", "- Establish policies for decommissioning AI systems. Such policies typically address:\n    - User and community concerns, and reputational risks. \n    - Business continuity and financial risks.\n    - Up and downstream system dependencies. \n    - Regulatory requirements (e.g., data retention). \n    - Potential future legal, regulatory, security or forensic investigations.\n    - Migration to the replacement system, if appropriate.\n- Establish policies that delineate where and for how long decommissioned systems, models and related artifacts are stored.\n- Establish practices to track accountability and consider how decommission and other adaptations or changes in system deployment contribute to downstream impacts for individuals, groups and communities. \n- Establish policies that address ancillary data or artifacts that must be preserved for fulsome understanding or execution of the decommissioned AI system, e.g., predictions, explanations, intermediate input feature representations, usernames and passwords, etc.", "### Organizations can document the following\n- What processes exist for data generation, acquisition/collection, ingestion, staging/storage, transformations, security, maintenance, and dissemination?\n- To what extent do these policies foster public trust and confidence in the use of the AI system?\n- If anyone believes that the AI no longer meets this ethical framework, who will be responsible for receiving the concern and as appropriate investigating and remediating the issue? Do they have authority to modify, limit, or stop the use of the AI?\n- If it relates to people, were there any ethical review applications/reviews/approvals? (e.g. Institutional Review Board applications)\n\n### AI Transparency Resources\n- GAO-21-519SP: AI Accountability Framework for Federal Agencies & Other Entities. [URL](https://www.gao.gov/products/gao-21-519sp)\n- Intel.gov: AI Ethics Framework for Intelligence Community - 2020. [URL](https://www.intelligence.gov/artificial-intelligence-ethics-framework-for-the-intelligence-community)\n- Datasheets for Datasets. [URL](http://arxiv.org/abs/1803.09010)", "Michelle De Mooy, Joseph Jerome and Vijay Kasschau, “Should It Stay or Should It Go? The Legal, Policy and Technical Landscape Around Data Deletion,” Center for Democracy and Technology, 2017. https://cdt.org/wp-content/uploads/2017/02/2017-02-23-Data-Deletion-FNL2.pdf \n\nBurcu Baykurt, “Algorithmic accountability in US cities: Transparency, impact, and political economy.” Big Data & Society 9, no. 2 (2022): 20539517221115426. https://journals.sagepub.com/doi/full/10.1177/20539517221115426 \n\n“Information System Decommissioning Guide,” Bureau of Land Management, 2011. https://www.blm.gov/sites/blm.gov/files/uploads/IM2011-174_att1.pdf "]
  ]
}
],
Manage: [
{
  title: "Manage-1: AI risks based on assessments and other analytical output from the Map and Measure functions are prioritized, responded to, and managed",
  steps: [
["AI Deployment, Operation and Monitoring, AI Impact Assessment", "AI Deployment, Risk Assessment", "Manage-1.1 A determination is made as to whether the AI system achieves its intended purpose and stated objectives and whether its development or deployment should proceed.", "AI systems may not necessarily be the right solution for a given business task or problem. A standard risk management practice is to formally weigh an AI systemâ€™s negative risks against its benefits, and to determine if the AI system is an  appropriate solution. Tradeoffs among trustworthiness characteristics â€”such as deciding to deploy a system based on system performance vs system transparencyâ€“may require regular assessment throughout the AI lifecycle.", "- Consider trustworthiness characteristics when evaluating AI systemsâ€™ negative risks and benefits.\n- Utilize TEVV outputs from map and measure functions when considering risk treatment.\n- regularly track and monitor negative risks and benefits throughout the AI system lifecycle including in post-deployment monitoring.\n- regularly assess and document system performance relative to trustworthiness characteristics and tradeoffs between negative risks and opportunities.\n- evaluate tradeoffs in connection with real-world use cases and impacts and as enumerated in map function outcomes.", "### Organizations can document the following\n\n- How do the technical specifications and requirements align with the AI systemâ€™s goals and objectives?\n- To what extent are the metrics consistent with system goals, objectives, and constraints, including ethical and compliance considerations?\n- What goals and objectives does the entity expect to achieve by designing, developing, and/or deploying the AI system?\n\n### AI Transparency Resources\n\n- GAO-21-519SP - Artificial Intelligence: An Accountability Framework for Federal Agencies & Other Entities. [URL](https://www.gao.gov/products/gao-21-519sp)\n- Artificial Intelligence Ethics Framework For The Intelligence Community. [URL](https://www.intelligence.gov/artificial-intelligence-ethics-framework-for-the-intelligence-community) \n- WEF Companion to the Model AI Governance Framework â€“ Implementation and Self-Assessment Guide for Organizations [URL](https://www.pdpc.gov.sg/-/media/files/pdpc/pdf-files/resource-for-organisation/ai/sgisago.ashx)"],
["AI Deployment, Operation and Monitoring, AI Impact Assessment", "Risk Tolerance", "Manage-1.2 Treatment of documented AI risks is prioritized based on impact, likelihood, or available resources or methods.", "Risk refers to the composite measure of an eventâ€™s probability of occurring and the magnitude (or degree) of the consequences of the corresponding events. The impacts, or consequences, of AI systems can be positive, negative, or both and can result in opportunities or risks.  \n\nOrganizational risk tolerances are often informed by several internal and external factors, including existing industry practices, organizational values, and legal or regulatory requirements. Since risk management resources are often limited, organizations usually assign them based on risk tolerance. AI risks that are deemed more serious receive more oversight attention and risk management resources.", "- Assign risk management resources relative to established risk tolerance. AI systems with lower risk tolerances receive greater oversight, mitigation and management resources. \n- Document AI risk tolerance determination practices and resource decisions.\n- Regularly review risk tolerances and re-calibrate, as needed, in accordance with information from AI system monitoring and assessment .", "### Organizations can document the following\n\n- Did your organization implement a risk management system to address risks involved in deploying the identified AI solution (e.g. personnel risk or changes to commercial objectives)?\n- What assessments has the entity conducted on data security and privacy impacts associated with the AI system?\n- Does your organization have an existing governance structure that can be leveraged to oversee the organizationâ€™s use of AI?\n\n### AI Transparency Resources\n\n- WEF Companion to the Model AI Governance Framework â€“ Implementation and Self-Assessment Guide for Organizations [URL](https://www.pdpc.gov.sg/-/media/files/pdpc/pdf-files/resource-for-organisation/ai/sgisago.ashx)\n- GAO-21-519SP - Artificial Intelligence: An Accountability Framework for Federal Agencies & Other Entities. [URL](https://www.gao.gov/products/gao-21-519sp)"],
["AI Deployment, Operation and Monitoring, AI Impact Assessment", "Legal and Regulatory, Risk Tolerance", "Manage-1.3 Responses to the AI risks deemed high priority as identified by the Map function, are developed, planned, and documented. Risk response options can include mitigating, transferring, avoiding, or accepting.", "Outcomes from GOVERN-1, MAP-5 and MEASURE-2, can be used to address and document identified risks based on established risk tolerances. Organizations can follow existing regulations and guidelines for risk criteria, tolerances and responses established by organizational, domain, discipline, sector, or professional requirements. In lieu of such guidance, organizations can develop risk response plans based on strategies such as accepted model risk management, enterprise risk management, and information sharing and disclosure practices.", "- Observe regulatory and established organizational, sector, discipline, or professional standards and requirements for applying risk tolerances within the organization.\n- document procedures for acting on AI system risks related to trustworthiness characteristics.\n- Prioritize risks involving physical safety, legal liabilities, regulatory compliance, and negative impacts on individuals, groups, or society.\n- identify risk response plans and resources and organizational teams for carrying out response functions.\n- Store risk management and system documentation in an organized, secure repository that is accessible by relevant AI actors and appropriate personnel.", "### Organizations can document the following\n\n- Has the system been reviewed to ensure the AI system complies with relevant laws, regulations, standards, and guidance?\n- To what extent has the entity defined and documented the regulatory environmentâ€”including minimum requirements in laws and regulations?\n- Did your organization implement a risk management system to address risks involved in deploying the identified AI solution (e.g. personnel risk or changes to commercial objectives)?\n\n### AI Transparency Resources\n\n- GAO-21-519SP - Artificial Intelligence: An Accountability Framework for Federal Agencies & Other Entities. [URL](https://www.gao.gov/products/gao-21-519sp)\n- Datasheets for Datasets. [URL](https://arxiv.org/abs/1803.09010)"],
["AI Deployment, Operation and Monitoring, AI Impact Assessment", "Risk Response", "Manage-1.4 Negative residual risks (defined as the sum of all unmitigated risks) to both downstream acquirers of AI systems and end users are documented.", "Organizations may choose to accept or transfer some of the documented risks  from MAP and MANAGE 1.3 and 2.1.  Such risks, known as residual risk, may affect downstream AI actors such as those engaged in system procurement or use. Transparent monitoring and managing residual risks enables cost benefit analysis and the examination of potential values of AI systems versus its potential negative impacts.", "- Document residual risks within risk response plans, denoting risks that have been accepted, transferred, or subject to minimal mitigation. \n- Establish procedures for disclosing residual risks to relevant downstream AI actors .\n- Inform relevant downstream AI actors of requirements for safe operation, known limitations, and suggested warning labels as identified in MAP 3.4.", "### Organizations can document the following\n\n- What are the roles, responsibilities, and delegation of authorities of personnel involved in the design, development, deployment, assessment and monitoring of the AI system?\n- Who will be responsible for maintaining, re-verifying, monitoring, and updating this AI once deployed?\n- How will updates/revisions be documented and communicated? How often and by whom?\n- How easily accessible and current is the information available to external stakeholders?\n\n### AI Transparency Resources\n\n- GAO-21-519SP - Artificial Intelligence: An Accountability Framework for Federal Agencies & Other Entities. [URL](https://www.gao.gov/products/gao-21-519sp)\n- Artificial Intelligence Ethics Framework For The Intelligence Community. [URL](https://www.intelligence.gov/artificial-intelligence-ethics-framework-for-the-intelligence-community) \n- Datasheets for Datasets. [URL](https://arxiv.org/abs/1803.09010)"]
  ]
}
]
  };