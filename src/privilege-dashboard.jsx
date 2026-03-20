import { useState, useRef } from "react";

// ─── 62 QUESTIONS ACROSS 7 DIMENSIONS ────────────────────────────────────────

const DIMENSIONS = [
  {
    id: "economic", label: "Economic", emoji: "💰", color: "#E6C87A", bg: "rgba(230,200,122,0.08)",
    description: "Wealth, income, financial stability & material access — 12 questions", weight: 1.2,
    sections: [
      {
        title: "Childhood Financial Environment",
        questions: [
          { id: "eco_childhood_class", label: "What was your household's economic class growing up?", detail: "Consider your primary caregiver's income, assets, and lifestyle up to age 18.",
            options: [
              { value: 0, label: "Extreme poverty", detail: "Regular hunger, no stable shelter, survival-mode living" },
              { value: 1, label: "Poverty", detail: "Below poverty line, frequent financial crises, limited basics" },
              { value: 2, label: "Working poor", detail: "Income but constant financial stress, little to no savings" },
              { value: 3, label: "Working class", detail: "Stable income, bills covered, very rare extras" },
              { value: 4, label: "Lower-middle class", detail: "Comfortable basics, occasional vacations, modest savings" },
              { value: 5, label: "Middle class", detail: "Financial security, college accessible, moderate assets" },
              { value: 6, label: "Upper-middle class", detail: "Private school possible, investments, no financial stress" },
              { value: 7, label: "Wealthy", detail: "Significant assets, multiple properties, generational wealth building" },
              { value: 8, label: "Very wealthy", detail: "Inherited wealth, staff, elite private education, trust funds" },
            ]
          },
          { id: "eco_food_security", label: "How consistent was food security in your childhood home?",
            options: [
              { value: 0, label: "We regularly went hungry or skipped meals due to lack of money" },
              { value: 1, label: "We sometimes couldn't afford enough food" },
              { value: 2, label: "Food was adequate but choices were very limited" },
              { value: 3, label: "We always had enough to eat, variety was limited" },
              { value: 4, label: "We always had enough with reasonable variety" },
              { value: 5, label: "We had abundance and wide food choices always" },
            ]
          },
          { id: "eco_housing_stability", label: "How stable was your housing situation growing up?",
            options: [
              { value: 0, label: "Experienced homelessness or emergency shelter living" },
              { value: 1, label: "Moved frequently due to eviction or inability to pay" },
              { value: 2, label: "Rented and moved often, but not due to financial crisis" },
              { value: 3, label: "Rented stably in the same place for years" },
              { value: 4, label: "Family owned a modest home" },
              { value: 5, label: "Family owned a comfortable home or multiple properties" },
            ]
          },
          { id: "eco_inheritance", label: "Did your family have or pass down any wealth or assets?",
            options: [
              { value: 0, label: "Family had debt or nothing to pass on" },
              { value: 1, label: "No assets — we started from scratch each generation" },
              { value: 2, label: "Minor help (a car, small gift) but no real wealth transfer" },
              { value: 3, label: "Some inheritance expected (modest home, modest savings)" },
              { value: 4, label: "Significant inheritance (property, investments)" },
              { value: 5, label: "Substantial family wealth passed down or readily available" },
            ]
          },
          { id: "eco_extracurricular", label: "Did you have access to extracurricular activities growing up (sports, arts, tutoring, camps)?",
            options: [
              { value: 0, label: "No — cost was entirely out of reach" },
              { value: 1, label: "Very limited — one subsidized activity at most" },
              { value: 2, label: "Some — a couple of free or low-cost options" },
              { value: 3, label: "Moderate — a few paid activities occasionally" },
              { value: 4, label: "Good — regular paid activities without financial stress" },
              { value: 5, label: "Extensive — multiple paid activities, travel, enrichment programs" },
            ]
          },
          { id: "eco_medical_childhood", label: "Did you receive regular medical and dental care as a child?",
            options: [
              { value: 0, label: "No — we avoided doctors entirely due to cost" },
              { value: 1, label: "Emergency only — went when absolutely unavoidable" },
              { value: 2, label: "Sporadic — some care but very inconsistent" },
              { value: 3, label: "Basic — annual checkups and basic dental" },
              { value: 4, label: "Regular — consistent care with decent coverage" },
              { value: 5, label: "Comprehensive — full medical, dental, vision, specialists as needed" },
            ]
          },
        ]
      },
      {
        title: "Current Financial Standing",
        questions: [
          { id: "eco_income_now", label: "Where does your personal income fall relative to your country's median?",
            options: [
              { value: 0, label: "Below 50% of median — significant poverty" },
              { value: 1, label: "50–80% of median — lower income" },
              { value: 2, label: "80–100% of median — near median" },
              { value: 3, label: "100–150% of median — comfortably above average" },
              { value: 4, label: "150–300% of median — upper income" },
              { value: 5, label: "300%+ of median — high income" },
            ]
          },
          { id: "eco_safety_net", label: "If you lost your income today, how long could you survive financially without help?",
            options: [
              { value: 0, label: "Less than 1 week — I'm already in crisis" },
              { value: 1, label: "1–4 weeks" },
              { value: 2, label: "1–3 months" },
              { value: 3, label: "3–6 months" },
              { value: 4, label: "6–12 months" },
              { value: 5, label: "1–2 years" },
              { value: 6, label: "Indefinitely — I have enough saved or invested" },
            ]
          },
          { id: "eco_debt", label: "How does debt affect your financial freedom today?",
            options: [
              { value: 0, label: "Crushing — debt consumes most of my income, causing crisis" },
              { value: 1, label: "Heavy — significant debt stress, very hard to save" },
              { value: 2, label: "Moderate — payments are manageable but limiting" },
              { value: 3, label: "Light — some debt but it's not stressful" },
              { value: 4, label: "Minimal — very little debt, nearly paid off" },
              { value: 5, label: "None — completely debt-free with positive net worth" },
            ]
          },
          { id: "eco_family_bailout", label: "Could your family help you financially in a serious crisis?",
            options: [
              { value: 0, label: "No — family would need help from me, not the other way around" },
              { value: 1, label: "Unlikely — family has little to spare" },
              { value: 2, label: "Possibly — small amounts in a real emergency" },
              { value: 3, label: "Yes — a few thousand dollars if absolutely needed" },
              { value: 4, label: "Yes — significant financial support available" },
              { value: 5, label: "Yes — substantial safety net from family wealth" },
            ]
          },
          { id: "eco_home_ownership", label: "What is your current housing situation?",
            options: [
              { value: 0, label: "Unhoused or in emergency shelter" },
              { value: 1, label: "Renting with significant instability or unaffordability" },
              { value: 2, label: "Renting stably but unable to save toward ownership" },
              { value: 3, label: "Renting comfortably and actively saving" },
              { value: 4, label: "Own a home with a mortgage" },
              { value: 5, label: "Own property outright or have multiple properties" },
            ]
          },
          { id: "eco_investment_access", label: "Do you have investments, retirement savings, or equity-building assets?",
            options: [
              { value: 0, label: "No — I have no savings of any kind" },
              { value: 1, label: "No investments — only very basic savings if any" },
              { value: 2, label: "Minimal — small retirement contributions only" },
              { value: 3, label: "Some — retirement account and modest savings" },
              { value: 4, label: "Good — diversified savings and retirement well funded" },
              { value: 5, label: "Substantial — investments, equity, and long-term financial security" },
            ]
          },
        ]
      }
    ]
  },
  {
    id: "geographic", label: "Geographic", emoji: "🌍", color: "#7AB8E6", bg: "rgba(122,184,230,0.08)",
    description: "Country of birth, passport, conflict, infrastructure & mobility — 8 questions", weight: 1.1,
    sections: [
      {
        title: "Country & Birth Circumstances",
        questions: [
          { id: "geo_country_hdi", label: "How developed is the country you were born in?", detail: "HDI (Human Development Index) is a UN measure combining life expectancy, education, and income.",
            options: [
              { value: 0, label: "Very Low HDI (e.g. Niger, Chad, South Sudan)", detail: "Life expectancy under 60, extreme poverty widespread" },
              { value: 1, label: "Low HDI (e.g. Ethiopia, Haiti, Yemen)", detail: "Significant poverty, limited healthcare and education" },
              { value: 2, label: "Medium HDI (e.g. India, Egypt, Bolivia)", detail: "Developing, growing middle class, very uneven access" },
              { value: 3, label: "High HDI (e.g. Brazil, China, Mexico)", detail: "Significant development, inequality still substantial" },
              { value: 4, label: "Very High HDI (e.g. UK, Japan, France)", detail: "Strong institutions, welfare systems, high life expectancy" },
              { value: 5, label: "Top-tier HDI (e.g. Norway, Switzerland, Australia)", detail: "World's best outcomes across health, education, income" },
            ]
          },
          { id: "geo_passport", label: "How powerful is your passport (visa-free travel access)?",
            options: [
              { value: 0, label: "Very weak — fewer than 30 countries visa-free (e.g. Afghanistan, Yemen)" },
              { value: 1, label: "Weak — 30–60 countries" },
              { value: 2, label: "Below average — 60–100 countries" },
              { value: 3, label: "Average — 100–140 countries" },
              { value: 4, label: "Strong — 140–170 countries (e.g. Brazil, Malaysia)" },
              { value: 5, label: "Very strong — 170+ countries visa-free (e.g. US, EU, Japan)" },
            ]
          },
          { id: "geo_war", label: "Has your home region experienced armed conflict or war during your lifetime?",
            options: [
              { value: 0, label: "Active war zone — lived through shelling, displacement, or occupation" },
              { value: 1, label: "Serious conflict — civil unrest, armed groups, real ongoing danger" },
              { value: 2, label: "Nearby conflict — war was close but didn't directly affect me" },
              { value: 3, label: "Historical conflict — ended before or shortly after I was born" },
              { value: 4, label: "No conflict — peace throughout my entire life" },
            ]
          },
        ]
      },
      {
        title: "Local Access & Environment",
        questions: [
          { id: "geo_urban_access", label: "What level of urban infrastructure did you grow up with?",
            options: [
              { value: 0, label: "No paved roads, no grid electricity, no running water" },
              { value: 1, label: "Very rural — basic infrastructure, hours from any major city" },
              { value: 2, label: "Small town — some services, limited specialists and options" },
              { value: 3, label: "Suburban or mid-size city — good access to most services" },
              { value: 4, label: "Large city — full access to healthcare, education, transport" },
              { value: 5, label: "Major global city — world-class infrastructure and opportunity" },
            ]
          },
          { id: "geo_clean_water", label: "Has safe drinking water always been reliably available to you?",
            options: [
              { value: 0, label: "No — water-related illness has been a real concern in my life" },
              { value: 1, label: "Mostly no — access was unreliable or unsafe" },
              { value: 2, label: "Inconsistently — access varied by location or season" },
              { value: 3, label: "Yes — tap water was safe and always available" },
              { value: 4, label: "Yes, completely — never once thought twice about it" },
            ]
          },
          { id: "geo_electricity", label: "What was your access to reliable electricity growing up?",
            options: [
              { value: 0, label: "No electricity at all" },
              { value: 1, label: "Frequent and prolonged outages — hours per day" },
              { value: 2, label: "Occasional outages but mostly available" },
              { value: 3, label: "Reliable electricity with rare interruptions" },
              { value: 4, label: "Fully reliable, never a meaningful concern" },
            ]
          },
          { id: "geo_climate_risk", label: "How exposed are you to climate and environmental risks?",
            options: [
              { value: 0, label: "Extreme — floods, droughts, or disasters have directly upended my life" },
              { value: 1, label: "High — significant environmental risk shapes daily decisions" },
              { value: 2, label: "Moderate — some risk but mostly manageable" },
              { value: 3, label: "Low — occasional weather events, no major ongoing threat" },
              { value: 4, label: "Minimal — stable climate, well-protected by infrastructure" },
            ]
          },
          { id: "geo_mobility", label: "How free are you to move, migrate, or choose where you live?",
            options: [
              { value: 0, label: "Stateless or trapped — I cannot legally live elsewhere" },
              { value: 1, label: "Very restricted — immigration options almost entirely closed to me" },
              { value: 2, label: "Limited — some options but major obstacles (money, visas, language)" },
              { value: 3, label: "Moderate — could emigrate with real effort and sacrifice" },
              { value: 4, label: "Good — multiple countries would accept me without major difficulty" },
              { value: 5, label: "Full — I can live, work, and move freely almost anywhere on earth" },
            ]
          },
        ]
      }
    ]
  },
  {
    id: "racial", label: "Race & Ethnicity", emoji: "✊", color: "#E68A7A", bg: "rgba(230,138,122,0.08)",
    description: "Racial identity, systemic treatment, representation & generational impact — 8 questions", weight: 1.15,
    sections: [
      {
        title: "Structural & Systemic Experience",
        questions: [
          { id: "race_majority_status", label: "What is your racial/ethnic status in the country where you live?",
            options: [
              { value: 0, label: "Heavily persecuted minority — active discrimination, real risk of violence" },
              { value: 1, label: "Marginalized minority — systemic disadvantage, frequent discrimination" },
              { value: 2, label: "Minority with regular friction — subtle and overt bias is common" },
              { value: 3, label: "Minority with limited friction — some bias but mostly functional" },
              { value: 4, label: "Visible minority, largely accepted — minimal systemic barriers" },
              { value: 5, label: "Dominant racial majority — race rarely if ever creates obstacles" },
            ]
          },
          { id: "race_police", label: "How does your race or ethnicity affect your experience with law enforcement?",
            options: [
              { value: 0, label: "I live in genuine fear of police — real risk of violence or targeting" },
              { value: 1, label: "Regular negative encounters clearly tied to my race" },
              { value: 2, label: "Occasional profiling or discrimination" },
              { value: 3, label: "Sometimes feels unfair but rarely rises to serious level" },
              { value: 4, label: "Rarely a concern — interactions mostly neutral" },
              { value: 5, label: "Police are generally helpful and non-threatening to me" },
            ]
          },
          { id: "race_hiring", label: "Has your name, appearance, or accent likely affected hiring or career opportunities?",
            options: [
              { value: 0, label: "Definitely — significant documented or clearly felt disadvantage" },
              { value: 1, label: "Probably — I've noticed patterns I can't fully explain otherwise" },
              { value: 2, label: "Possibly — uncertain but have some circumstantial evidence" },
              { value: 3, label: "Unlikely — my identity is probably neutral in my professional context" },
              { value: 4, label: "Advantaged — my identity likely helps me professionally" },
            ]
          },
          { id: "race_generational", label: "How have historical racial policies affected your family's wealth or land access?", detail: "Think about redlining, colonization, land theft, segregation, caste systems, or other forms of dispossession.",
            options: [
              { value: 0, label: "Severely — direct dispossession of land or wealth (slavery, colonization, etc.)" },
              { value: 1, label: "Significantly — historical policies blocked wealth-building for generations" },
              { value: 2, label: "Moderately — some historical barriers, partial recovery over time" },
              { value: 3, label: "Minimally — limited historical disadvantage in my family's case" },
              { value: 4, label: "Not affected — or family actively benefited from historical policies" },
            ]
          },
        ]
      },
      {
        title: "Cultural & Daily Experience",
        questions: [
          { id: "race_media", label: "How well is your racial/ethnic group represented in media, leadership, and public life?",
            options: [
              { value: 0, label: "Invisible, or depicted only negatively and stereotypically" },
              { value: 1, label: "Rare — often stereotyped or tokenized when present" },
              { value: 2, label: "Growing but still meaningfully underrepresented" },
              { value: 3, label: "Reasonably represented with some noticeable gaps" },
              { value: 4, label: "Well represented across most domains" },
              { value: 5, label: "Dominant — the cultural default in most media and narratives" },
            ]
          },
          { id: "race_microaggressions", label: "How often do you experience race-based comments, assumptions, or microaggressions?",
            options: [
              { value: 0, label: "Daily — exhausting and constant" },
              { value: 1, label: "Weekly — frequent enough to significantly affect wellbeing" },
              { value: 2, label: "Monthly — occasional but noticeable and wearing" },
              { value: 3, label: "A few times a year — rare enough to be surprising" },
              { value: 4, label: "Almost never" },
              { value: 5, label: "Never — my racial identity creates no social friction" },
            ]
          },
          { id: "race_housing_discrimination", label: "Has racial discrimination ever affected your ability to rent, buy, or access housing?",
            options: [
              { value: 0, label: "Yes — directly blocked from housing or neighborhoods due to race" },
              { value: 1, label: "Probably — experienced clear signals of bias in housing" },
              { value: 2, label: "Possibly — uncertain but noticed patterns" },
              { value: 3, label: "Unlikely — my race has not noticeably affected housing access" },
              { value: 4, label: "Never — my race has been neutral or advantageous in housing" },
            ]
          },
          { id: "race_healthcare_bias", label: "Has racial bias ever affected the quality of healthcare you received?",
            options: [
              { value: 0, label: "Yes — I've received clearly inferior care or been dismissed due to race" },
              { value: 1, label: "Probably — experienced differential treatment I believe was race-related" },
              { value: 2, label: "Possibly — some situations felt unequal" },
              { value: 3, label: "Unlikely — my race has not noticeably affected my healthcare quality" },
              { value: 4, label: "Never — race has been neutral in all my healthcare interactions" },
            ]
          },
        ]
      }
    ]
  },
  {
    id: "gender", label: "Gender & Sexuality", emoji: "⚧", color: "#A87AE6", bg: "rgba(168,122,230,0.08)",
    description: "Gender identity, sexual orientation, bodily autonomy, safety & legal rights — 8 questions", weight: 1.1,
    sections: [
      {
        title: "Gender Identity & Safety",
        questions: [
          { id: "gender_identity", label: "How does your gender identity affect your safety and social acceptance?",
            options: [
              { value: 0, label: "Trans/non-binary in a hostile environment — real danger, no legal protection" },
              { value: 1, label: "Trans/non-binary with minimal support — daily friction and discrimination" },
              { value: 2, label: "Trans/non-binary in a mixed environment — some support, real challenges" },
              { value: 3, label: "Trans/non-binary in an accepting community — mostly manageable friction" },
              { value: 4, label: "Cisgender but with gender-based disadvantage in some domains" },
              { value: 5, label: "Cisgender man — minimal gender-based structural friction" },
            ]
          },
          { id: "gender_pay", label: "Do you experience a gender-based pay or opportunity gap?",
            options: [
              { value: 0, label: "Severe — my gender significantly blocks income and career advancement" },
              { value: 1, label: "Significant — I earn or advance measurably less due to gender" },
              { value: 2, label: "Moderate — some disadvantage in pay or promotion patterns" },
              { value: 3, label: "Slight — minor, hard-to-prove gap" },
              { value: 4, label: "None — my gender doesn't affect income or advancement" },
              { value: 5, label: "Advantaged — my gender identity creates measurable professional advantages" },
            ]
          },
          { id: "gender_safety", label: "How often does your gender affect your sense of personal safety in public spaces?",
            options: [
              { value: 0, label: "Daily — I constantly modify behavior to avoid harassment or violence" },
              { value: 1, label: "Often — regular concern in public, at night, or with strangers" },
              { value: 2, label: "Sometimes — specific situations trigger real concern" },
              { value: 3, label: "Rarely — occasional awareness but not life-altering" },
              { value: 4, label: "Almost never — gender rarely affects my felt personal safety" },
            ]
          },
          { id: "gender_autonomy", label: "What level of bodily and reproductive autonomy do you legally and practically have?",
            options: [
              { value: 0, label: "None — laws or cultural norms remove control over my own body" },
              { value: 1, label: "Very limited — severe legal or social restrictions" },
              { value: 2, label: "Partial — some rights exist but significant restrictions remain" },
              { value: 3, label: "Mostly available — access exists with some practical barriers" },
              { value: 4, label: "Full — complete autonomy, legally protected and socially accepted" },
            ]
          },
          { id: "gender_leadership", label: "Do people in your gender group hold positions of power and leadership in your society?",
            options: [
              { value: 0, label: "Almost never — my gender is systematically excluded from power" },
              { value: 1, label: "Rarely — heavily underrepresented in leadership" },
              { value: 2, label: "Growing — some representation but far from equal" },
              { value: 3, label: "Moderate — reasonably represented with gaps" },
              { value: 4, label: "Well represented — close to proportional representation" },
              { value: 5, label: "Dominant — my gender holds most positions of power and leadership" },
            ]
          },
        ]
      },
      {
        title: "Sexual Orientation",
        questions: [
          { id: "sexuality_safety", label: "How safe is it for you to be open about your sexual orientation?",
            options: [
              { value: 0, label: "Illegal — my orientation could result in imprisonment or execution" },
              { value: 1, label: "Dangerous — real risk of violence, family rejection, or job loss" },
              { value: 2, label: "Unsafe in many spaces — must hide in most contexts" },
              { value: 3, label: "Mostly safe but with friction — selective disclosure still needed" },
              { value: 4, label: "Generally accepted — out without major consequences" },
              { value: 5, label: "Fully accepted — orientation completely irrelevant to safety or opportunity" },
            ]
          },
          { id: "sexuality_legal", label: "What legal protections exist for your sexual orientation in your country?",
            options: [
              { value: 0, label: "Criminalized — active legal persecution" },
              { value: 1, label: "No protections — legal but completely unprotected from discrimination" },
              { value: 2, label: "Partial protections — some laws, inconsistently enforced" },
              { value: 3, label: "Decent protections — anti-discrimination laws in most areas" },
              { value: 4, label: "Full legal equality — marriage, adoption, and employment all protected" },
            ]
          },
          { id: "sexuality_family_acceptance", label: "How did/does your family respond to your sexual orientation?",
            options: [
              { value: 0, label: "Rejected entirely — kicked out, disowned, or subjected to conversion attempts" },
              { value: 1, label: "Hostile — ongoing conflict, shame, or denial" },
              { value: 2, label: "Tolerant but uncomfortable — accepted but never truly affirmed" },
              { value: 3, label: "Mostly accepting — some adjustment, now mostly supportive" },
              { value: 4, label: "Fully accepting — immediate and unconditional support" },
              { value: 5, label: "Not applicable — heterosexual, no family tension on this dimension" },
            ]
          },
        ]
      }
    ]
  },
  {
    id: "health", label: "Health & Ability", emoji: "🧠", color: "#7AE6C0", bg: "rgba(122,230,192,0.08)",
    description: "Physical health, mental health, disability, neurodivergence & healthcare — 9 questions", weight: 1.1,
    sections: [
      {
        title: "Physical Health & Disability",
        questions: [
          { id: "health_physical", label: "How does your physical health and ability status affect your daily life?",
            options: [
              { value: 0, label: "Severe disability with no support — significant barriers in almost every domain" },
              { value: 1, label: "Significant disability — daily life requires major adaptation, some support" },
              { value: 2, label: "Chronic illness or moderate disability — affects work and social function" },
              { value: 3, label: "Manageable health condition — present but doesn't define daily life" },
              { value: 4, label: "Minor health issues — rarely limit my activity" },
              { value: 5, label: "Full physical health and ability — no health-related barriers" },
            ]
          },
          { id: "health_chronic_cost", label: "Have chronic health costs ever meaningfully affected your financial stability?",
            options: [
              { value: 0, label: "Yes — medical costs caused bankruptcy, serious debt, or housing instability" },
              { value: 1, label: "Yes — significant ongoing financial strain from health expenses" },
              { value: 2, label: "Somewhat — health costs are a real and regular budget concern" },
              { value: 3, label: "Minor — manageable with insurance or modest savings" },
              { value: 4, label: "No — health costs have never been a meaningful financial concern" },
            ]
          },
          { id: "health_life_expectancy", label: "How does your background and environment affect your likely lifespan?", detail: "Research shows race, income, and zip code predict life expectancy — sometimes by 10–20 years.",
            options: [
              { value: 0, label: "Significantly shortened — multiple factors (poverty, race, environment) reduce expected lifespan" },
              { value: 1, label: "Somewhat shortened — one or more meaningful risk factors present" },
              { value: 2, label: "Near average — no major lifespan-reducing factors" },
              { value: 3, label: "Above average — factors in my background favor longer healthy life" },
              { value: 4, label: "Well above average — strong predictors of longevity (wealth, access, low stress)" },
            ]
          },
        ]
      },
      {
        title: "Mental Health",
        questions: [
          { id: "health_mental", label: "How significantly do mental health challenges affect your daily functioning?",
            options: [
              { value: 0, label: "Severely — I struggle to maintain work, relationships, or basic self-care" },
              { value: 1, label: "Significantly — mental health requires major management and affects outcomes" },
              { value: 2, label: "Moderately — present and sometimes limiting but generally manageable" },
              { value: 3, label: "Mildly — occasional struggles, mostly functional" },
              { value: 4, label: "Minimal — generally stable mental health with no significant impairment" },
            ]
          },
          { id: "health_mental_access", label: "Have you been able to access meaningful mental health support when needed?",
            options: [
              { value: 0, label: "No access at all — cost, stigma, or unavailability made it impossible" },
              { value: 1, label: "Very limited — needed help but faced major, sometimes insurmountable barriers" },
              { value: 2, label: "Some access — can get basic support but not ideal or consistent care" },
              { value: 3, label: "Good access — therapy or professional support available and utilized" },
              { value: 4, label: "Full access — robust, ongoing mental health support whenever needed" },
            ]
          },
          { id: "health_trauma", label: "Have you experienced significant trauma (abuse, violence, loss, displacement) that affects your life?",
            options: [
              { value: 0, label: "Yes — severe, multiple traumas with lasting and significant impact" },
              { value: 1, label: "Yes — significant trauma with real ongoing effects" },
              { value: 2, label: "Some — moderately difficult experiences, partially processed" },
              { value: 3, label: "Minor — difficult experiences but not significantly life-altering" },
              { value: 4, label: "No significant trauma — relatively protected early life" },
            ]
          },
        ]
      },
      {
        title: "Healthcare Access & Neurodivergence",
        questions: [
          { id: "health_coverage", label: "What is your healthcare coverage situation?",
            options: [
              { value: 0, label: "No coverage — I avoid all healthcare due to cost" },
              { value: 1, label: "Emergency only — uninsured except in life-threatening situations" },
              { value: 2, label: "Underinsured — have coverage but gaps create real financial risk" },
              { value: 3, label: "Basic coverage — covers most needs with manageable out-of-pocket costs" },
              { value: 4, label: "Good coverage — comprehensive with low costs" },
              { value: 5, label: "Excellent coverage — full coverage, minimal costs, virtually no gaps" },
            ]
          },
          { id: "health_neuro", label: "Do you identify as neurodivergent (ADHD, autism, dyslexia, etc.)?",
            options: [
              { value: 0, label: "Yes — severe impact, undiagnosed, and no support whatsoever" },
              { value: 1, label: "Yes — significant impact with very minimal support" },
              { value: 2, label: "Yes — diagnosed and have some accommodations or support" },
              { value: 3, label: "Yes — well-supported and largely thriving with accommodations" },
              { value: 4, label: "No — neurotypical, no significant cognitive or learning barriers" },
            ]
          },
          { id: "health_dental", label: "What has your access to dental care been like throughout your life?",
            options: [
              { value: 0, label: "None — dental problems went untreated due to cost" },
              { value: 1, label: "Emergency only — tooth pain had to be severe before I'd seek care" },
              { value: 2, label: "Irregular — occasional care but not consistent" },
              { value: 3, label: "Regular — annual checkups, basic procedures covered" },
              { value: 4, label: "Comprehensive — cleanings, orthodontics, full dental care throughout life" },
            ]
          },
        ]
      }
    ]
  },
  {
    id: "education", label: "Education", emoji: "📚", color: "#E6D87A", bg: "rgba(230,216,122,0.08)",
    description: "School quality, access, language advantage, social capital & networks — 9 questions", weight: 1.0,
    sections: [
      {
        title: "Formal Education Access",
        questions: [
          { id: "edu_school_quality", label: "What was the quality of your primary and secondary schooling?",
            options: [
              { value: 0, label: "No formal schooling — never attended or dropped out very early" },
              { value: 1, label: "Very poor — overcrowded, dangerous, severely under-resourced" },
              { value: 2, label: "Below average — functional but significantly lacking in quality" },
              { value: 3, label: "Average — adequate, standard public education" },
              { value: 4, label: "Good — well-resourced public or subsidized private school" },
              { value: 5, label: "Excellent — elite private or highly selective school with superior outcomes" },
            ]
          },
          { id: "edu_higher", label: "What is your highest level of completed education?",
            options: [
              { value: 0, label: "No formal education" },
              { value: 1, label: "Primary school only" },
              { value: 2, label: "Secondary school (high school or equivalent)" },
              { value: 3, label: "Some college or vocational/technical training" },
              { value: 4, label: "Bachelor's degree" },
              { value: 5, label: "Postgraduate degree (Master's, PhD, or professional degree)" },
            ]
          },
          { id: "edu_cost", label: "What was the personal financial cost of your education?",
            options: [
              { value: 0, label: "Unaffordable — couldn't access education I wanted due to cost" },
              { value: 1, label: "High debt — still paying off significant student loans with real burden" },
              { value: 2, label: "Some debt — manageable but a real ongoing financial commitment" },
              { value: 3, label: "Partially funded — scholarships, grants, or family significantly helped" },
              { value: 4, label: "Fully funded — family paid or full scholarships covered all costs" },
              { value: 5, label: "Free public education — no cost at any level of my schooling" },
            ]
          },
          { id: "edu_private_tutoring", label: "Did you have access to tutoring, test prep, or academic coaching growing up?",
            options: [
              { value: 0, label: "No — never, wasn't a possibility financially" },
              { value: 1, label: "Rarely — occasional free or school-provided help only" },
              { value: 2, label: "Some — limited tutoring when struggling in a subject" },
              { value: 3, label: "Yes — regular tutoring or exam prep available" },
              { value: 4, label: "Extensive — private tutors, SAT/ACT prep courses, academic coaches" },
            ]
          },
        ]
      },
      {
        title: "Language, Social Capital & Networks",
        questions: [
          { id: "edu_language", label: "What is your native or first language?", detail: "Some languages carry enormous global economic, academic, and employment advantages.",
            options: [
              { value: 0, label: "A language spoken by fewer than 1 million people, no official status" },
              { value: 1, label: "A regional language — significant within one country, limited beyond it" },
              { value: 2, label: "A national language with moderate but limited global reach" },
              { value: 3, label: "A major international language (e.g. Spanish, French, Mandarin, Arabic)" },
              { value: 4, label: "English — the world's dominant language for business, academia, and tech" },
            ]
          },
          { id: "edu_parents", label: "What is the highest level of education completed by your parent(s) or guardian(s)?",
            options: [
              { value: 0, label: "No formal education" },
              { value: 1, label: "Primary school" },
              { value: 2, label: "Secondary school" },
              { value: 3, label: "Some college or vocational training" },
              { value: 4, label: "Bachelor's degree" },
              { value: 5, label: "Postgraduate degree" },
            ]
          },
          { id: "edu_internet", label: "What has your access to the internet and personal technology been like?",
            options: [
              { value: 0, label: "No personal device or internet access" },
              { value: 1, label: "Very limited — shared device or occasional public access only" },
              { value: 2, label: "Basic — reliable but slow connection, older devices" },
              { value: 3, label: "Good — regular broadband, capable personal device" },
              { value: 4, label: "Excellent — fast connection, multiple devices, always available" },
            ]
          },
          { id: "edu_network", label: "How strong and useful is your professional and social network?",
            options: [
              { value: 0, label: "Isolated — I know very few people outside my immediate community" },
              { value: 1, label: "Very limited — small network, little access to opportunity via connections" },
              { value: 2, label: "Some connections — functional but not particularly influential" },
              { value: 3, label: "Decent network — can open some meaningful doors" },
              { value: 4, label: "Strong — broad, diverse network that creates real opportunity" },
              { value: 5, label: "Elite network — connections to power, prestige, and significant resources" },
            ]
          },
          { id: "edu_books_at_home", label: "How many books and educational resources were available in your childhood home?",
            options: [
              { value: 0, label: "None — no books, no educational materials at all" },
              { value: 1, label: "Very few — a handful of books at most" },
              { value: 2, label: "Some — modest collection, limited educational materials" },
              { value: 3, label: "Good — reasonable library, some educational resources" },
              { value: 4, label: "Extensive — large book collection, encyclopedias, educational games, maps" },
            ]
          },
        ]
      }
    ]
  },
  {
    id: "social", label: "Social & Identity", emoji: "🤝", color: "#E67AC0", bg: "rgba(230,122,192,0.08)",
    description: "Family stability, religion, belonging, citizenship, caste & class mobility — 8 questions", weight: 1.0,
    sections: [
      {
        title: "Family & Early Environment",
        questions: [
          { id: "soc_family", label: "How would you describe your family environment growing up?",
            options: [
              { value: 0, label: "Severely abusive or neglectful — profoundly harmful, trauma-forming" },
              { value: 1, label: "Abusive or highly dysfunctional — significant harm occurred regularly" },
              { value: 2, label: "Unstable — frequent conflict, unpredictability, or serious neglect" },
              { value: 3, label: "Mixed — genuine love alongside real dysfunction or inconsistency" },
              { value: 4, label: "Mostly stable — occasional problems but fundamentally safe and caring" },
              { value: 5, label: "Stable and nurturing — consistent love, safety, structure, and support" },
            ]
          },
          { id: "soc_single_parent", label: "What was your primary family structure during childhood?",
            options: [
              { value: 0, label: "No consistent guardian — state care, various relatives, or fending for myself" },
              { value: 1, label: "Single parent under significant financial or emotional stress" },
              { value: 2, label: "Single parent who managed reasonably well despite real challenges" },
              { value: 3, label: "Two parents or guardians but with significant instability" },
              { value: 4, label: "Two stable, involved parents or guardians" },
              { value: 5, label: "Two stable parents plus strong extended family support network" },
            ]
          },
          { id: "soc_domestic_violence", label: "Was domestic violence or abuse present in your childhood home or community?",
            options: [
              { value: 0, label: "Yes — I was directly subjected to abuse" },
              { value: 1, label: "Yes — I witnessed domestic violence regularly in the home" },
              { value: 2, label: "Occasionally — some exposure but not the dominant experience" },
              { value: 3, label: "Rarely — isolated incidents only" },
              { value: 4, label: "No — my home was free from domestic violence and abuse" },
            ]
          },
        ]
      },
      {
        title: "Identity, Citizenship & Community",
        questions: [
          { id: "soc_religion", label: "How does your religious identity (or lack thereof) affect your daily life and safety?",
            options: [
              { value: 0, label: "Actively persecuted — real physical danger due to my faith or atheism" },
              { value: 1, label: "Discriminated against — regular friction, exclusion, professional barriers" },
              { value: 2, label: "Minority faith — some friction but generally tolerated" },
              { value: 3, label: "Minority faith, widely accepted — no meaningful daily disadvantage" },
              { value: 4, label: "Secular or atheist in a tolerant society — no meaningful friction" },
              { value: 5, label: "Member of dominant faith — social, cultural, and sometimes legal advantages" },
            ]
          },
          { id: "soc_caste", label: "Does a caste system, class hierarchy, or hereditary social order affect your opportunities?", detail: "Caste systems exist formally in South Asia, and informally in many other societies.",
            options: [
              { value: 0, label: "Yes — I belong to a historically oppressed or untouchable caste with severe disadvantage" },
              { value: 1, label: "Yes — lower caste or class with significant daily discrimination" },
              { value: 2, label: "Yes — middle tier with some friction but not severe disadvantage" },
              { value: 3, label: "Minimal — upper caste or class hierarchy exists but doesn't much affect me" },
              { value: 4, label: "Not applicable — no meaningful caste or hereditary hierarchy in my context" },
              { value: 5, label: "Advantaged — I belong to a historically privileged caste or social class" },
            ]
          },
          { id: "soc_citizenship", label: "What is your legal status in the country where you live?",
            options: [
              { value: 0, label: "Stateless — I have no recognized nationality anywhere in the world" },
              { value: 1, label: "Undocumented — living without legal status, at real risk of deportation" },
              { value: 2, label: "Refugee or asylum seeker — precarious, conditional legal status" },
              { value: 3, label: "Temporary visa — legal but conditional, could be revoked" },
              { value: 4, label: "Permanent resident — long-term legal status but not full citizenship" },
              { value: 5, label: "Full citizen — complete rights, voting, and legal security" },
            ]
          },
          { id: "soc_belonging", label: "How strong is your sense of community belonging and social inclusion?",
            options: [
              { value: 0, label: "Deeply isolated — no meaningful community, chronically excluded" },
              { value: 1, label: "Largely excluded — on the social margins in most contexts" },
              { value: 2, label: "Some belonging — a few real connections but often an outsider" },
              { value: 3, label: "Moderate belonging — have community but sometimes excluded" },
              { value: 4, label: "Strong belonging — feel genuinely part of a community" },
              { value: 5, label: "Deep roots — embedded in a strong, diverse, supportive community" },
            ]
          },
          { id: "soc_class_mobility", label: "How has your economic class changed compared to where you started?",
            options: [
              { value: 0, label: "Significant downward mobility — notably worse off than my upbringing" },
              { value: 1, label: "Stagnant at the bottom — no real improvement from a low starting point" },
              { value: 2, label: "Stagnant in the middle — little meaningful movement up or down" },
              { value: 3, label: "Modest upward mobility — somewhat better than where I started" },
              { value: 4, label: "Significant upward mobility — clearly crossed class boundaries" },
              { value: 5, label: "Major upward mobility — dramatically transformed life circumstances" },
            ]
          },
        ]
      }
    ]
  }
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function hexToRgb(hex) {
  return `${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)}`;
}
function getAllQs(dim) { return dim.sections.flatMap(s => s.questions); }
function getDimScore(answers, dim) {
  const qs = getAllQs(dim), answered = qs.filter(q => answers[q.id] !== undefined);
  if (!answered.length) return null;
  const maxP = answered.reduce((s,q) => s + q.options[q.options.length-1].value, 0);
  const actual = answered.reduce((s,q) => s + answers[q.id], 0);
  return maxP === 0 ? 0 : (actual/maxP)*100;
}
function getOverall(answers) {
  const sc = DIMENSIONS.map(d => ({ s: getDimScore(answers,d), w: d.weight })).filter(x => x.s !== null);
  if (!sc.length) return null;
  const tw = sc.reduce((a,x) => a+x.w, 0);
  return sc.reduce((a,x) => a+x.s*x.w, 0)/tw;
}

function getInsights(answers) {
  const a = answers, out = [];
  const add = (type, text) => out.push({type, text});
  if (a.eco_childhood_class >= 6) add("advantage","Born into an upper-middle or wealthy household — a significant head start in access to opportunity, education, and social capital.");
  if (a.eco_childhood_class !== undefined && a.eco_childhood_class <= 1) add("barrier","Grew up in poverty — foundational disadvantage with documented lifelong effects on education, health, and economic outcomes.");
  if (a.eco_extracurricular >= 4) add("advantage","Access to extensive extracurricular activities — sports, arts, tutoring, and enrichment programs that build skills, networks, and resumes.");
  if (a.eco_medical_childhood >= 3) add("advantage","Regular medical and dental care in childhood — preventive health access that compounds over a lifetime.");
  if (a.eco_safety_net >= 5) add("advantage","Financial safety net of over a year — removes survival anxiety and enables risk-taking most people cannot afford.");
  if (a.eco_safety_net !== undefined && a.eco_safety_net <= 1) add("barrier","Financial safety net of under a month — one unexpected crisis away from genuine hardship with no buffer.");
  if (a.eco_family_bailout >= 4) add("advantage","Family financial backstop available — fundamentally changes risk tolerance and the ability to pursue opportunity.");
  if (a.eco_inheritance >= 3) add("advantage","Family wealth expected to be passed down — inherited assets compound over generations and reduce the need to start from zero.");
  if (a.eco_investment_access >= 4) add("advantage","Investments and retirement savings — long-term wealth-building that most people globally never access.");
  if (a.geo_country_hdi >= 4) add("advantage","Born in a high-HDI country — access to stable institutions, rule of law, functioning healthcare, and quality public education.");
  if (a.geo_passport >= 4) add("advantage","Strong passport — the freedom to travel, work abroad, and escape crises that billions of people simply do not have.");
  if (a.geo_war === 4) add("advantage","Never experienced war or armed conflict — a privilege denied to tens of millions alive today.");
  if (a.geo_war !== undefined && a.geo_war <= 1) add("barrier","Lived through armed conflict — profound trauma and disruption with lasting effects on education, health, and life trajectory.");
  if (a.geo_clean_water >= 3) add("advantage","Safe drinking water always reliably available — a basic human need that over 2 billion people lack secure access to.");
  if (a.geo_electricity >= 3) add("advantage","Reliable electricity throughout life — access to refrigeration, lighting, charging, and connectivity that poverty strips away.");
  if (a.race_majority_status >= 4) add("advantage","Racial majority or minimal racial friction — race is rarely a barrier, and often an invisible tailwind.");
  if (a.race_majority_status !== undefined && a.race_majority_status <= 1) add("barrier","Marginalized racial minority — systemic discrimination measurably affects housing, hiring, policing, health, and daily safety.");
  if (a.race_generational !== undefined && a.race_generational <= 1) add("barrier","Historical racial policies directly and demonstrably reduced your family's ability to build and transfer wealth across generations.");
  if (a.race_police >= 4) add("advantage","Police encounters generally neutral or positive — freedom from fear of law enforcement many minorities do not share.");
  if (a.race_police !== undefined && a.race_police <= 1) add("barrier","Living with genuine fear of law enforcement — a chronic stressor with documented negative health and economic consequences.");
  if (a.gender_identity >= 4) add("advantage","Cisgender identity — gender matches societal norms, removing a major source of discrimination, legal risk, and daily danger.");
  if (a.gender_identity !== undefined && a.gender_identity <= 1) add("barrier","Trans or non-binary in a hostile environment — facing legal, social, and physical danger cisgender people never encounter.");
  if (a.gender_safety >= 3) add("advantage","Gender rarely affects personal safety — a freedom most women and gender minorities do not fully share worldwide.");
  if (a.gender_autonomy >= 3) add("advantage","Meaningful bodily and reproductive autonomy — a legal and practical right still denied to billions globally.");
  if (a.sexuality_safety >= 4) add("advantage","Sexual orientation is safe to express openly — legal and social acceptance most LGBTQ+ people globally still lack.");
  if (a.sexuality_safety !== undefined && a.sexuality_safety <= 1) add("barrier","Sexual orientation is criminalized or genuinely dangerous — a fundamental human rights violation affecting daily life.");
  if (a.sexuality_family_acceptance >= 3) add("advantage","Family acceptance of sexual orientation — crucial protection against the homelessness and mental health crises that family rejection causes.");
  if (a.health_physical >= 4) add("advantage","Full physical ability — access to spaces, employment, and social life that many disabled people face structural barriers to.");
  if (a.health_coverage >= 4) add("advantage","Comprehensive healthcare coverage — eliminates the catastrophic financial risk that medical events create for hundreds of millions.");
  if (a.health_coverage !== undefined && a.health_coverage <= 1) add("barrier","No meaningful healthcare coverage — a single illness or injury can create life-altering financial ruin.");
  if (a.health_trauma !== undefined && a.health_trauma <= 1) add("barrier","Severe multiple traumas — adverse childhood experiences have documented long-term effects on brain development, health, and outcomes.");
  if (a.health_dental >= 3) add("advantage","Regular dental care throughout life — oral health is a major predictor of overall health and strongly tracks with class.");
  if (a.edu_language >= 3) add("advantage","Native speaker of a major or global language — significant advantage in education, international employment, and global opportunity.");
  if (a.edu_parents >= 4) add("advantage","Educated parents — they navigated complex systems for you, modeled academic success, and provided social capital invisible to those without it.");
  if (a.edu_school_quality >= 4) add("advantage","High quality schooling — access to better teachers, resources, alumni networks, and credentials with lifelong compounding effects.");
  if (a.edu_cost >= 3) add("advantage","Education largely funded — avoided the debt burden that increasingly limits economic mobility for graduates in many countries.");
  if (a.edu_private_tutoring >= 3) add("advantage","Access to private tutoring or exam prep — a pay-to-play system that systematically advantages those who can afford it.");
  if (a.edu_books_at_home >= 3) add("advantage","Books and educational resources in childhood home — a strong predictor of literacy, academic performance, and cognitive development.");
  if (a.soc_family >= 4) add("advantage","Stable, nurturing family environment — emotional security with documented lifelong effects on mental health, attachment, and resilience.");
  if (a.soc_family !== undefined && a.soc_family <= 1) add("barrier","Abusive or neglectful upbringing — trauma with well-documented lifelong consequences for health, relationships, and economic outcomes.");
  if (a.soc_domestic_violence >= 3) add("advantage","Grew up free from domestic violence — a protective factor with profound effects on psychological development and future relationships.");
  if (a.soc_caste !== undefined && a.soc_caste <= 1) add("barrier","Oppressed caste or hereditary class — some of the world's most entrenched and multigenerational forms of systemic disadvantage.");
  if (a.soc_caste >= 4) add("advantage","No meaningful caste disadvantage — free from one of the oldest and most rigid forms of inherited social hierarchy.");
  if (a.soc_citizenship >= 5) add("advantage","Full citizenship — legal security, voting rights, and social entitlements that stateless and undocumented people are categorically excluded from.");
  if (a.soc_citizenship !== undefined && a.soc_citizenship <= 1) add("barrier","Stateless or undocumented — living without legal recognition is among the most severe and all-encompassing structural vulnerabilities.");
  if (a.soc_class_mobility >= 3) add("advantage","Upward class mobility achieved — crossed structural barriers that most people born into lower economic positions never fully clear.");
  return out;
}

const scoreColor = s => !s && s!==0 ? "#444" : s>=75 ? "#E6C87A" : s>=55 ? "#7AE6C0" : s>=35 ? "#7AB8E6" : "#E68A7A";
const scoreLabel = s => s===null ? "No data" : s>=80 ? "Highly Privileged" : s>=65 ? "Above Average Privilege" : s>=50 ? "Moderate Privilege" : s>=35 ? "Below Average Privilege" : s>=20 ? "Significant Disadvantage" : "Severe Disadvantage";

// ─── RADAR CHART ─────────────────────────────────────────────────────────────

function RadarChart({ answers, size=300 }) {
  const cx=size/2, cy=size/2, r=size*0.32, n=DIMENSIONS.length;
  const pts = DIMENSIONS.map((d,i) => {
    const a=(2*Math.PI*i)/n-Math.PI/2, s=getDimScore(answers,d), ratio=s!==null?s/100:0;
    return { dx:cx+r*ratio*Math.cos(a), dy:cy+r*ratio*Math.sin(a), lx:cx+(r+42)*Math.cos(a), ly:cy+(r+42)*Math.sin(a), s, d };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{overflow:"visible"}}>
      {[.25,.5,.75,1].map(lv=><polygon key={lv} points={DIMENSIONS.map((_,i)=>{const a=(2*Math.PI*i)/n-Math.PI/2;return `${cx+r*lv*Math.cos(a)},${cy+r*lv*Math.sin(a)}`;}).join(" ")} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>)}
      {DIMENSIONS.map((_,i)=>{const a=(2*Math.PI*i)/n-Math.PI/2;return <line key={i} x1={cx} y1={cy} x2={cx+r*Math.cos(a)} y2={cy+r*Math.sin(a)} stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>;})}
      <polygon points={pts.map(p=>`${p.dx},${p.dy}`).join(" ")} fill="rgba(230,200,122,0.1)" stroke="#E6C87A" strokeWidth="1.5"/>
      {pts.map((p,i)=>(
        <g key={i}>
          <circle cx={p.dx} cy={p.dy} r="4" fill={p.d.color}/>
          <text x={p.lx} y={p.ly} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontFamily="'DM Mono',monospace" fill="rgba(255,255,255,0.38)">{p.d.label}</text>
          {p.s!==null&&<text x={p.lx} y={p.ly+11} textAnchor="middle" dominantBaseline="middle" fontSize="8" fontFamily="'DM Mono',monospace" fill={p.d.color}>{Math.round(p.s)}</text>}
        </g>
      ))}
    </svg>
  );
}

// ─── QUESTION BLOCK ───────────────────────────────────────────────────────────

function QuestionBlock({ q, value, onChange, color }) {
  return (
    <div style={{marginBottom:28}}>
      <div style={{fontSize:15,color:"rgba(255,255,255,0.85)",marginBottom:4,lineHeight:1.55,fontFamily:"Cormorant Garamond,serif",fontWeight:400}}>{q.label}</div>
      {q.detail && <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginBottom:12,lineHeight:1.7,fontStyle:"italic"}}>{q.detail}</div>}
      <div style={{display:"flex",flexDirection:"column",gap:5}}>
        {q.options.map(opt=>{
          const sel = value===opt.value;
          return (
            <button key={opt.value} onClick={()=>onChange(q.id,opt.value)} style={{
              background: sel?`rgba(${hexToRgb(color)},0.1)`:"rgba(255,255,255,0.015)",
              border:`1px solid ${sel?color:"rgba(255,255,255,0.07)"}`,
              borderRadius:5,padding:"10px 15px",cursor:"pointer",textAlign:"left",
              transition:"all 0.15s",fontFamily:"'DM Mono',monospace",
            }}>
              <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                <div style={{width:17,height:17,borderRadius:"50%",flexShrink:0,marginTop:2,background:sel?color:"transparent",border:`1.5px solid ${sel?color:"rgba(255,255,255,0.18)"}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}>
                  {sel&&<div style={{width:6,height:6,borderRadius:"50%",background:"#0A0A0B"}}/>}
                </div>
                <div>
                  <div style={{fontSize:12,color:sel?"#E8E0D0":"rgba(255,255,255,0.52)",lineHeight:1.5}}>{opt.label}</div>
                  {opt.detail&&<div style={{fontSize:10,color:"rgba(255,255,255,0.27)",marginTop:3,lineHeight:1.5}}>{opt.detail}</div>}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

const TOTAL_QS = DIMENSIONS.reduce((s,d)=>s+getAllQs(d).length,0); // 62

export default function App() {
  const [answers, setAnswers] = useState({});
  const [dimIdx, setDimIdx] = useState(0);
  const [view, setView] = useState("intro");
  const topRef = useRef(null);

  const dim = DIMENSIONS[dimIdx];
  const totalAns = Object.keys(answers).length;
  const pct = Math.round((totalAns/TOTAL_QS)*100);
  const overall = getOverall(answers);
  const insights = getInsights(answers);
  const setAnswer = (qid,val) => setAnswers(p=>({...p,[qid]:val}));
  const scrollTop = () => topRef.current?.scrollIntoView({behavior:"smooth"});
  const goTo = v => { setView(v); scrollTop(); };

  return (
    <div ref={topRef} style={{minHeight:"100vh",background:"#0A0A0B",fontFamily:"'DM Mono','Courier New',monospace",color:"#E8E0D0"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}button{cursor:pointer;}
        ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:#1e1e1e;}
        .fade{animation:fd 0.4s ease both;}@keyframes fd{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
        .cta{background:#E6C87A;color:#0A0A0B;border:none;padding:12px 28px;border-radius:4px;font-family:'DM Mono',monospace;font-size:11px;font-weight:500;letter-spacing:0.08em;transition:all 0.18s;}
        .cta:hover{background:#f0d48a;transform:translateY(-1px);}
        .ghost{background:transparent;border:1px solid rgba(255,255,255,0.13);color:rgba(255,255,255,0.55);padding:10px 22px;border-radius:4px;font-family:'DM Mono',monospace;font-size:11px;letter-spacing:0.05em;transition:all 0.18s;}
        .ghost:hover{border-color:rgba(255,255,255,0.3);color:#E8E0D0;}
        .pill{background:transparent;border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.45);padding:6px 14px;border-radius:20px;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:0.05em;transition:all 0.18s;}
        .pill:hover{border-color:rgba(255,255,255,0.25);color:#E8E0D0;}
        .pill.on{border-color:#E6C87A;color:#E6C87A;background:rgba(230,200,122,0.07);}
        .dimcard{width:100%;background:rgba(255,255,255,0.018);border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:11px 13px;cursor:pointer;text-align:left;font-family:'DM Mono',monospace;transition:all 0.15s;margin-bottom:5px;}
        .dimcard:hover{background:rgba(255,255,255,0.035);}
        .dimcard.on{background:rgba(255,255,255,0.055);border-color:rgba(255,255,255,0.11);}
      `}</style>

      {/* HEADER */}
      <div style={{borderBottom:"1px solid rgba(255,255,255,0.055)",padding:"15px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,background:"rgba(10,10,11,0.96)",backdropFilter:"blur(12px)",zIndex:100}}>
        <div>
          <div style={{fontSize:8,color:"rgba(255,255,255,0.2)",letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:3}}>Structural Self-Awareness</div>
          <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:18,fontWeight:500}}>Privilege Dashboard</div>
        </div>
        {view!=="intro"&&(
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            <span style={{fontSize:9,color:"rgba(255,255,255,0.2)",marginRight:4}}>{totalAns}/{TOTAL_QS} answered</span>
            <button className={`pill ${view==="survey"?"on":""}`} onClick={()=>goTo("survey")}>Survey</button>
            <button className={`pill ${view==="results"?"on":""}`} onClick={()=>goTo("results")}>Results {overall!==null?`· ${Math.round(overall)}`:""}</button>
          </div>
        )}
      </div>

      {view==="survey"&&<div style={{height:2,background:"rgba(255,255,255,0.04)"}}><div style={{height:"100%",width:`${pct}%`,background:"#E6C87A",transition:"width 0.4s ease"}}/></div>}

      {/* INTRO */}
      {view==="intro"&&(
        <div className="fade" style={{maxWidth:700,margin:"0 auto",padding:"72px 32px"}}>
          <div style={{fontSize:8,color:"rgba(255,255,255,0.2)",letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:22}}>What is this?</div>
          <h1 style={{fontFamily:"Cormorant Garamond,serif",fontSize:44,fontWeight:300,lineHeight:1.15,marginBottom:26}}>
            Understand which systems were<br/><em style={{color:"#E6C87A"}}>working for you</em> — and which<br/>were working against you.
          </h1>
          <p style={{fontSize:13,color:"rgba(255,255,255,0.45)",lineHeight:1.85,marginBottom:18}}>
            Privilege is about structural advantages you were born into — systems that created tailwinds or headwinds independent of your effort. Most people hold privilege in some dimensions and face disadvantage in others. This tool helps you see the full picture.
          </p>
          <p style={{fontSize:13,color:"rgba(255,255,255,0.45)",lineHeight:1.85,marginBottom:42}}>
            <strong style={{color:"rgba(255,255,255,0.7)"}}>7 dimensions · {TOTAL_QS} questions</strong> — each answered option generates a specific insight about what structural advantage or barrier that answer implies.
          </p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:44}}>
            {DIMENSIONS.map(d=>(
              <div key={d.id} style={{background:d.bg,border:`1px solid ${d.color}28`,borderRadius:7,padding:"14px 17px"}}>
                <div style={{fontSize:18,marginBottom:6}}>{d.emoji}</div>
                <div style={{fontSize:12,color:d.color,fontWeight:500,marginBottom:3}}>{d.label}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.32)",lineHeight:1.6}}>{d.description}</div>
              </div>
            ))}
          </div>
          <div style={{background:"rgba(230,200,122,0.05)",border:"1px solid rgba(230,200,122,0.14)",borderRadius:6,padding:"16px 22px",marginBottom:38}}>
            <div style={{fontSize:8,color:"rgba(230,200,122,0.55)",letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:9}}>Before you begin</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",lineHeight:1.75}}>A high score reflects structural advantage — not that your life was easy or your achievements unearned. A low score reflects real systemic barriers — not personal failure. The goal is honest self-understanding.</div>
          </div>
          <div style={{display:"flex",gap:12}}>
            <button className="cta" onClick={()=>goTo("survey")}>Begin Assessment →</button>
            {totalAns>0&&<button className="ghost" onClick={()=>goTo("results")}>View Results</button>}
          </div>
        </div>
      )}

      {/* SURVEY */}
      {view==="survey"&&(
        <div style={{display:"flex",minHeight:"calc(100vh - 59px)"}}>
          {/* Sidebar */}
          <div style={{width:210,borderRight:"1px solid rgba(255,255,255,0.055)",padding:"18px 10px",flexShrink:0,overflowY:"auto"}}>
            <div style={{fontSize:8,color:"rgba(255,255,255,0.18)",letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:12,paddingLeft:4}}>Dimensions</div>
            {DIMENSIONS.map((d,i)=>{
              const qs=getAllQs(d), ans=qs.filter(q=>answers[q.id]!==undefined).length, sc=getDimScore(answers,d);
              return (
                <button key={d.id} className={`dimcard ${dimIdx===i?"on":""}`} onClick={()=>{setDimIdx(i);scrollTop();}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                    <span style={{fontSize:13}}>{d.emoji}</span>
                    <span style={{fontSize:11,color:dimIdx===i?"#E8E0D0":"rgba(255,255,255,0.42)"}}>{d.label}</span>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{fontSize:9,color:"rgba(255,255,255,0.2)"}}>{ans}/{qs.length} answered</div>
                    {sc!==null&&<div style={{fontSize:10,color:d.color}}>{Math.round(sc)}</div>}
                  </div>
                  <div style={{height:2,background:"rgba(255,255,255,0.05)",borderRadius:1,marginTop:5,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${(ans/qs.length)*100}%`,background:d.color,borderRadius:1,transition:"width 0.3s"}}/>
                  </div>
                </button>
              );
            })}
            <div style={{height:1,background:"rgba(255,255,255,0.05)",margin:"14px 0"}}/>
            <div style={{paddingLeft:4}}>
              <div style={{fontSize:8,color:"rgba(255,255,255,0.18)",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:7}}>Overall</div>
              <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:28,color:overall!==null?scoreColor(overall):"rgba(255,255,255,0.15)"}}>
                {overall!==null?Math.round(overall):"—"}<span style={{fontSize:11,color:"rgba(255,255,255,0.2)",fontFamily:"DM Mono"}}>/100</span>
              </div>
              <div style={{fontSize:9,color:"rgba(255,255,255,0.18)",marginTop:3}}>{pct}% · {totalAns}/{TOTAL_QS} answers</div>
            </div>
          </div>

          {/* Questions panel */}
          <div style={{flex:1,overflowY:"auto",padding:"40px 50px"}}>
            <div className="fade" key={dimIdx} style={{maxWidth:680}}>
              <div style={{marginBottom:32}}>
                <div style={{fontSize:28,marginBottom:9}}>{dim.emoji}</div>
                <h2 style={{fontFamily:"Cormorant Garamond,serif",fontSize:30,fontWeight:400,marginBottom:7}}>{dim.label}</h2>
                <p style={{fontSize:11,color:"rgba(255,255,255,0.35)",lineHeight:1.65,marginBottom:12}}>{dim.description}</p>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{height:2,flex:1,background:"rgba(255,255,255,0.05)",borderRadius:1,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${(getAllQs(dim).filter(q=>answers[q.id]!==undefined).length/getAllQs(dim).length)*100}%`,background:dim.color,transition:"width 0.3s"}}/>
                  </div>
                  <div style={{fontSize:9,color:"rgba(255,255,255,0.22)",flexShrink:0}}>{getAllQs(dim).filter(q=>answers[q.id]!==undefined).length}/{getAllQs(dim).length}</div>
                </div>
              </div>

              {dim.sections.map((sec,si)=>(
                <div key={si} style={{marginBottom:48}}>
                  <div style={{fontSize:8,color:dim.color,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:22,opacity:0.75,paddingBottom:10,borderBottom:`1px solid rgba(${hexToRgb(dim.color)},0.12)`}}>{sec.title}</div>
                  {sec.questions.map(q=><QuestionBlock key={q.id} q={q} value={answers[q.id]} onChange={setAnswer} color={dim.color}/>)}
                </div>
              ))}

              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:22,paddingBottom:60,borderTop:"1px solid rgba(255,255,255,0.055)"}}>
                <button className="ghost" onClick={()=>{if(dimIdx>0){setDimIdx(dimIdx-1);scrollTop();}}} style={{opacity:dimIdx===0?0.2:1}}>← Previous</button>
                <div style={{fontSize:9,color:"rgba(255,255,255,0.2)"}}>{dimIdx+1} / {DIMENSIONS.length}</div>
                {dimIdx===DIMENSIONS.length-1
                  ?<button className="cta" onClick={()=>goTo("results")}>View Results →</button>
                  :<button className="cta" onClick={()=>{setDimIdx(dimIdx+1);scrollTop();}}>Next →</button>
                }
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESULTS */}
      {view==="results"&&(
        <div style={{padding:"48px 40px",maxWidth:1020,margin:"0 auto"}} className="fade">
          {totalAns===0?(
            <div style={{textAlign:"center",padding:"100px 20px"}}>
              <div style={{fontSize:48,marginBottom:20,opacity:0.12}}>◈</div>
              <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:26,marginBottom:14,color:"rgba(255,255,255,0.3)"}}>No answers yet</div>
              <button className="cta" onClick={()=>goTo("survey")}>Start the Assessment</button>
            </div>
          ):(
            <>
              {/* Hero */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1.15fr",gap:20,marginBottom:20}}>
                <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:8,padding:"36px 40px",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                  <div>
                    <div style={{fontSize:8,color:"rgba(255,255,255,0.2)",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:20}}>Overall Privilege Score</div>
                    <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:88,fontWeight:300,color:scoreColor(overall),lineHeight:0.85,marginBottom:10}}>{overall!==null?Math.round(overall):"—"}</div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,0.2)",marginBottom:14}}>out of 100</div>
                    <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:18,fontStyle:"italic",color:scoreColor(overall),marginBottom:20}}>{scoreLabel(overall)}</div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,0.22)",lineHeight:1.6}}>{totalAns} of {TOTAL_QS} questions answered ({pct}% complete)</div>
                  </div>
                  <div style={{display:"flex",gap:8,marginTop:26,flexWrap:"wrap"}}>
                    <button className="ghost" onClick={()=>goTo("survey")}>Edit Answers</button>
                    <button onClick={()=>{setAnswers({});goTo("intro");}} style={{background:"transparent",border:"none",color:"rgba(255,255,255,0.2)",fontFamily:"DM Mono,monospace",fontSize:10,cursor:"pointer",padding:"10px 12px"}}>Reset All</button>
                  </div>
                </div>
                <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
                  <RadarChart answers={answers} size={310}/>
                </div>
              </div>

              {/* Dimension breakdown */}
              <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:8,padding:"26px 30px",marginBottom:20}}>
                <div style={{fontSize:8,color:"rgba(255,255,255,0.2)",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:24}}>Breakdown by Dimension</div>
                <div style={{display:"flex",flexDirection:"column",gap:22}}>
                  {DIMENSIONS.map(d=>{
                    const sc=getDimScore(answers,d), qs=getAllQs(d), ans=qs.filter(q=>answers[q.id]!==undefined).length;
                    return (
                      <div key={d.id}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:9}}>
                          <div>
                            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                              <span>{d.emoji}</span>
                              <span style={{fontSize:14,color:"rgba(255,255,255,0.75)",fontFamily:"Cormorant Garamond,serif"}}>{d.label}</span>
                              {sc!==null&&<span style={{fontSize:10,color:scoreColor(sc),marginLeft:4}}>{scoreLabel(sc)}</span>}
                            </div>
                          </div>
                          <div style={{textAlign:"right",flexShrink:0,marginLeft:20}}>
                            <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:26,color:sc!==null?d.color:"rgba(255,255,255,0.12)"}}>{sc!==null?Math.round(sc):"—"}</div>
                            <div style={{fontSize:9,color:"rgba(255,255,255,0.2)"}}>{ans}/{qs.length}</div>
                          </div>
                        </div>
                        <div style={{height:3,background:"rgba(255,255,255,0.05)",borderRadius:2,overflow:"hidden",marginBottom:9}}>
                          <div style={{height:"100%",width:`${sc??0}%`,background:d.color,borderRadius:2,transition:"width 0.8s cubic-bezier(0.4,0,0.2,1)",opacity:sc===null?0:0.8}}/>
                        </div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                          {qs.map(q=>{
                            const val=answers[q.id];
                            if(val===undefined)return null;
                            const maxV=q.options[q.options.length-1].value, ratio=val/maxV;
                            const selOpt=q.options.find(o=>o.value===val);
                            const bg=ratio>=0.7?`rgba(${hexToRgb(d.color)},0.12)`:ratio<=0.3?"rgba(230,138,122,0.1)":"rgba(255,255,255,0.04)";
                            const border=ratio>=0.7?`${d.color}35`:ratio<=0.3?"#E68A7A35":"rgba(255,255,255,0.07)";
                            return <div key={q.id} title={`${q.label} → ${selOpt?.label}`} style={{background:bg,border:`1px solid ${border}`,borderRadius:3,padding:"4px 9px",fontSize:9,color:"rgba(255,255,255,0.35)",maxWidth:240,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{selOpt?.label}</div>;
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Insights */}
              {insights.length>0&&(
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
                  <div style={{background:"rgba(122,230,192,0.035)",border:"1px solid rgba(122,230,192,0.14)",borderRadius:8,padding:"22px 26px"}}>
                    <div style={{fontSize:8,color:"rgba(122,230,192,0.55)",letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:16}}>Advantages · {insights.filter(i=>i.type==="advantage").length}</div>
                    <div style={{display:"flex",flexDirection:"column",gap:13}}>
                      {insights.filter(i=>i.type==="advantage").map((ins,idx)=>(
                        <div key={idx} style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                          <div style={{color:"#7AE6C0",fontSize:10,marginTop:3,flexShrink:0}}>✓</div>
                          <div style={{fontSize:11,color:"rgba(255,255,255,0.47)",lineHeight:1.7}}>{ins.text}</div>
                        </div>
                      ))}
                      {!insights.filter(i=>i.type==="advantage").length&&<div style={{fontSize:11,color:"rgba(255,255,255,0.2)",fontStyle:"italic"}}>No specific advantages identified from your answers.</div>}
                    </div>
                  </div>
                  <div style={{background:"rgba(230,138,122,0.035)",border:"1px solid rgba(230,138,122,0.14)",borderRadius:8,padding:"22px 26px"}}>
                    <div style={{fontSize:8,color:"rgba(230,138,122,0.55)",letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:16}}>Barriers · {insights.filter(i=>i.type==="barrier").length}</div>
                    <div style={{display:"flex",flexDirection:"column",gap:13}}>
                      {insights.filter(i=>i.type==="barrier").map((ins,idx)=>(
                        <div key={idx} style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                          <div style={{color:"#E68A7A",fontSize:10,marginTop:3,flexShrink:0}}>×</div>
                          <div style={{fontSize:11,color:"rgba(255,255,255,0.47)",lineHeight:1.7}}>{ins.text}</div>
                        </div>
                      ))}
                      {!insights.filter(i=>i.type==="barrier").length&&<div style={{fontSize:11,color:"rgba(255,255,255,0.2)",fontStyle:"italic"}}>No significant barriers identified from your answers.</div>}
                    </div>
                  </div>
                </div>
              )}

              {/* Reflection */}
              <div style={{background:"rgba(230,200,122,0.04)",border:"1px solid rgba(230,200,122,0.11)",borderRadius:8,padding:"22px 28px",marginBottom:60}}>
                <div style={{fontSize:8,color:"rgba(230,200,122,0.45)",letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:12}}>On Interpretation</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.37)",lineHeight:1.85}}>
                  This score measures <em>structural advantage</em> — not personal virtue, effort, or the depth of your suffering. Two people can have identical scores and radically different lived experiences. Privilege compounds and intersects — your standing in one dimension shapes outcomes in others. Treat this as a tool for honest inquiry, not a final verdict on your life.
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
