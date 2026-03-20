import { useState, useEffect, useRef } from "react";

const MOMENTS = [
  {
    id: "breakfast",
    category: "Food",
    yours: "You skipped breakfast because you weren't hungry.",
    theirs: "A 7-year-old in Yemen walked 4km to a feeding station today. There was nothing left when she arrived.",
    stat: "733 million people go to bed hungry every night. A child dies of hunger-related causes every 10 seconds.",
    action: "Next time you waste food, pause. That pause is the beginning of a different kind of person.",
    actions: [
      { effort: "5 min", label: "Donate $5 to WFP", detail: "The UN World Food Programme feeds 100M+ people. $5 feeds a child for a week. wfp.org/donate", link: "https://www.wfp.org/donate" },
      { effort: "Today", label: "Meal prep instead of tossing", detail: "Plan one meal this week using what's already in your fridge. App: Too Good To Go rescues surplus food near you." },
      { effort: "Monthly", label: "Set up a $10/month food bank donation", detail: "Local food banks convert $1 into ~$6 worth of food due to bulk purchasing. Find yours at feedingamerica.org." },
      { effort: "Lifestyle", label: "Halve your food waste", detail: "The average household wastes $1,500/year in food. Track it for one week. Redirect half that amount to hunger relief annually." },
    ],
  },
  {
    id: "cab",
    category: "Mobility",
    yours: "You were tired, so you took a cab instead of the subway.",
    theirs: "A nurse in Malawi walked 11km to work in the dark this morning because there is no public transport and she cannot afford a bicycle.",
    stat: "1 billion people have no access to any form of motorized transport. Healthcare workers in rural Africa walk an average of 8km per shift.",
    action: "Your fatigue is real. So is hers. The distance between your tiredness and hers is measured in accident-of-birth.",
    actions: [
      { effort: "5 min", label: "Donate a bike to a health worker", detail: "World Bicycle Relief provides bikes to students and health workers in rural Africa. One bike costs ~$150. bicyclerelief.org", link: "https://worldbicyclerelief.org" },
      { effort: "Today", label: "Walk or cycle your next short trip", detail: "Under 2km? Walk it. Under 5km? Cycle it. Every trip you don't take by car is a small vote for a different world." },
      { effort: "Monthly", label: "Support rural transport access orgs", detail: "Engineers Without Borders and Practical Action work on rural transport infrastructure. Even $20/month sustains field teams." },
      { effort: "Lifestyle", label: "Advocate for public transit in your city", detail: "Write to your local representative. Vote for candidates who prioritize public transit. The systemic fix starts at home too." },
    ],
  },
  {
    id: "water",
    category: "Water",
    yours: "You let the shower run for two minutes waiting for it to get warm.",
    theirs: "A mother in sub-Saharan Africa spent 3 hours today collecting water for her family. It wasn't clean. Her daughter has diarrhea again.",
    stat: "2.2 billion people lack safe drinking water. Women and girls spend 200 million collective hours per day collecting it. Dirty water kills 1.4 million children a year.",
    action: "Turn the tap off. But also understand: conservation alone doesn't fix infrastructure. Both matter.",
    actions: [
      { effort: "5 min", label: "Donate to charity: water", detail: "100% of donations fund clean water projects. $40 gives one person clean water for life. charitywater.org", link: "https://www.charitywater.org" },
      { effort: "Today", label: "Cut your shower by 2 minutes", detail: "2 fewer minutes = 10 litres saved per shower. That's 3,650 litres/year per person. Multiply that by your household." },
      { effort: "Monthly", label: "Run a birthday fundraiser for water", detail: "Replace birthday gifts with a charity: water campaign once a year. Average campaign raises $500 — enough for 12 people's lifetime supply." },
      { effort: "Lifestyle", label: "Fix household leaks", detail: "A dripping faucet wastes 3,000 litres per year. A running toilet: 200 litres per day. Fix it. Then donate the plumber savings." },
    ],
  },
  {
    id: "dog",
    category: "Loss & Grief",
    yours: "You wished you had more time with your dog.",
    theirs: "A child in Gaza wishes he could bring his brother back to life. He said it with a smile on his face and a completely broken heart.",
    stat: "Over 400,000 children have been killed or injured in conflict zones in the last decade. In Gaza alone, over 15,000 children were killed in 2023–24.",
    action: "Your love for your dog is real and beautiful. Don't lose it. Let it expand — into the awareness that some children mourn people the way you'd mourn your pet, and the world barely notices.",
    actions: [
      { effort: "5 min", label: "Read one story, not a headline", detail: "Go to UNICEF's website and read a child's story from a conflict zone. Not the stats. The name. The face. newsroom.unicef.org" },
      { effort: "Today", label: "Donate to UNICEF Emergency Relief", detail: "UNICEF provides clean water, vaccines, and trauma support to children in conflict zones. Even $25 provides emergency supplies for a child. unicef.org/donate", link: "https://www.unicef.org/donate" },
      { effort: "Monthly", label: "Follow and amplify conflict journalists", detail: "Many frontline journalists covering children in conflict are shadowbanned or ignored. Follow them. Share their work. Their visibility is their protection." },
      { effort: "Lifestyle", label: "Call your representatives about arms exports", detail: "Many Western governments export weapons to conflict zones. Look up your country's arms export policy. Write to your MP or Senator. Your vote and your voice on this issue is not nothing." },
    ],
  },
  {
    id: "sleep",
    category: "Labor & Rest",
    yours: "You complained about only getting 6 hours of sleep.",
    theirs: "A garment worker in Bangladesh works 14-hour shifts, six days a week, making the clothes on your back. She sleeps 5 hours and earns less than $3 a day.",
    stat: "The global fashion industry is worth $2.5 trillion. The workers who make it earn an average of $96/month. 80% are women.",
    action: "Hate your job from a chair that doesn't break your spine. And then check the label.",
    actions: [
      { effort: "5 min", label: "Check a brand's ethical rating now", detail: "Go to Good On You (goodonyou.eco). Type in a brand you wear. Read the rating. This takes 2 minutes and changes what you buy next.", link: "https://goodonyou.eco" },
      { effort: "Today", label: "Buy one thing secondhand instead of new", detail: "Thrift stores, Vinted, Depop, ThredUp. Buying secondhand removes demand from exploitative supply chains. Start with one item." },
      { effort: "Monthly", label: "Buy fewer, better things", detail: "The average person buys 68 new garments per year and wears each item 7 times. Halving that halves your footprint. Redirect savings to fair-wage brands." },
      { effort: "Lifestyle", label: "Support garment worker unions", detail: "The Asia Floor Wage Alliance and Clean Clothes Campaign organize for living wages. A $10 monthly donation sustains their advocacy in factories you buy from. cleanclothes.org", link: "https://cleanclothes.org" },
    ],
  },
  {
    id: "phone",
    category: "Information & Access",
    yours: "You scrolled mindlessly for 90 minutes before bed because you were bored.",
    theirs: "A teenager in North Korea has never used the internet. He has no idea what he doesn't know. His world ends at the border.",
    stat: "3.5 billion people lack meaningful internet access. In North Korea, 25 million people live in total information isolation. In 60+ countries, governments block or surveil internet use.",
    action: "Information is the oxygen of freedom. Your 90 minutes of boredom-scrolling sits on a system of infrastructure that billions cannot touch.",
    actions: [
      { effort: "5 min", label: "Support internet freedom orgs", detail: "Access Now and EFF fight digital censorship and surveillance globally. accessnow.org accepts donations and they work in countries where using the internet can get you imprisoned.", link: "https://www.accessnow.org" },
      { effort: "Today", label: "Use your scroll time deliberately once a week", detail: "Replace 30 mins of random scrolling with reading one long-form piece about a crisis you know nothing about. Start: ICRC.org or refworld.org" },
      { effort: "Monthly", label: "Support a digital literacy NGO", detail: "Computers for Africa and similar orgs provide devices and training in digital deserts. Even $15/month funds a device-share program for a month." },
      { effort: "Lifestyle", label: "Pressure your government on digital rights", detail: "Vote for candidates who oppose mass surveillance. Support net neutrality. The same freedoms you use to scroll are being dismantled globally — and at home." },
    ],
  },
  {
    id: "hospital",
    category: "Healthcare",
    yours: "You were annoyed that your doctor's appointment ran 45 minutes late.",
    theirs: "In Sierra Leone, there is 1 doctor for every 45,000 people. Most people never see a doctor in their entire lives.",
    stat: "Half the world's population lacks access to essential health services. 100 million people are pushed into extreme poverty each year by healthcare costs.",
    action: "Your 45-minute wait was an inconvenience. Theirs is a lifetime without ever being examined. Those are not the same problem.",
    actions: [
      { effort: "5 min", label: "Donate to MSF (Médecins Sans Frontières)", detail: "MSF runs hospitals in 70+ countries, including active war zones and disease outbreaks. $30 covers one outpatient consultation. msf.org", link: "https://www.msf.org/donate" },
      { effort: "Today", label: "Book the appointment you've been putting off", detail: "Access to healthcare you're not using is its own kind of waste. Make the call today. Preventive care also costs the system less." },
      { effort: "Monthly", label: "Support Partners in Health", detail: "PIH builds permanent healthcare infrastructure in Haiti, Rwanda, Malawi and more — not just emergency aid. $25/month sustains a community health worker. pih.org", link: "https://www.pih.org" },
      { effort: "Lifestyle", label: "Advocate for universal healthcare policy", detail: "Every country that has fought for universal healthcare did so because people demanded it. If you live somewhere without it, that fight is yours too. Show up to it." },
    ],
  },
  {
    id: "complain_job",
    category: "Labor & Rest",
    yours: "You vented hard about how much you hate your job.",
    theirs: "A 12-year-old in the Democratic Republic of Congo is mining cobalt — the mineral inside your phone battery — with his bare hands. No gloves. No school.",
    stat: "160 million children are in child labor globally. The DRC supplies 70% of the world's cobalt. Up to 40,000 children mine it in dangerous conditions for $1–2/day.",
    action: "Hate your job. You're allowed. And then acknowledge the child who never had the option of a job to hate.",
    actions: [
      { effort: "5 min", label: "Sign a petition on ethical mineral sourcing", detail: "Global Witness runs campaigns pressuring tech companies to certify cobalt supply chains. Takes 2 minutes. globalwitness.org", link: "https://www.globalwitness.org" },
      { effort: "Today", label: "Research your phone brand's supply chain", detail: "Fairphone publishes its full supply chain. Apple, Samsung publish partial data. Search '[your brand] cobalt supply chain ethics'. What you find will stay with you." },
      { effort: "Monthly", label: "Support child labor abolition organizations", detail: "The International Labour Organization and War Child both work on removing children from hazardous labor. $20/month funds monitoring and transition programs." },
      { effort: "Lifestyle", label: "Buy refurbished tech", detail: "Extending your phone's life by 2 years halves the mining demand it generates. Refurbished phones from Backmarket or Swappie are cheaper and cleaner. backmarket.com", link: "https://www.backmarket.com" },
    ],
  },
  {
    id: "medication",
    category: "Healthcare",
    yours: "You forgot to take your medication for two days because you were just too busy.",
    theirs: "A mother with HIV in Mozambique walked 6 hours one way to the nearest clinic to collect her antiretrovirals. She does this every month. If she misses it, her viral load rises.",
    stat: "38 million people live with HIV globally. Life-saving ARV medication costs $75/year to produce. In high-income countries the same drugs cost $30,000+/year — mostly due to patent law.",
    action: "Take your medication. And then look up what TRIPS patent waivers are, because this is a policy problem with a policy solution.",
    actions: [
      { effort: "5 min", label: "Donate to the Global Fund", detail: "The Global Fund finances HIV, TB, and malaria programs in 100+ countries. $10 covers a month of ARVs for one person. theglobalfund.org/donate", link: "https://www.theglobalfund.org/en/donate/" },
      { effort: "Today", label: "Take your medication. Right now.", detail: "Seriously. Access to medication you need but don't take is its own form of waste. Go take it." },
      { effort: "Monthly", label: "Support Médecins Sans Frontières Access Campaign", detail: "MSF campaigns specifically against pharmaceutical patent barriers that keep life-saving drugs out of reach. msf.org/access-campaign" },
      { effort: "Lifestyle", label: "Advocate for patent reform", detail: "Generic drug access is a political issue. The MSF Access Campaign, Oxfam, and Knowledge Ecology International track this. Support their policy advocacy. Write to your elected officials." },
    ],
  },
  {
    id: "birthday",
    category: "Belonging",
    yours: "You stressed for a week about what to get someone for their birthday.",
    theirs: "A Rohingya child in a refugee camp has never celebrated a birthday. She doesn't know her exact birth date. There was no registration, no record, no party.",
    stat: "Over 100 million people are forcibly displaced — the highest ever recorded. 1 in 73 people on earth is currently displaced. 40% are children.",
    action: "Celebrate your people loudly. And once a year, let a celebration be a reason to remember those who have nothing to celebrate.",
    actions: [
      { effort: "5 min", label: "Donate to UNHCR this birthday", detail: "Instead of a gift for someone who has everything, donate to UNHCR in their name. $50 provides a family with emergency supplies for a month. unhcr.org/donate", link: "https://www.unhcr.org/donate" },
      { effort: "Today", label: "Sponsor a refugee family's resettlement costs", detail: "Organizations like Welcome.us and IRC match donors with newly arrived refugee families for practical support — meals, transport, translation help." },
      { effort: "Monthly", label: "Volunteer with a local refugee support org", detail: "Most cities have orgs that need people to help newly arrived refugees with English, job applications, school enrollment. Refugee Council, IRC, local mosques and churches run these." },
      { effort: "Lifestyle", label: "Use your vote and voice on refugee policy", detail: "Refugee quotas are set by governments. Write to your representatives. Attend town halls. The number of people allowed through the door is a political decision." },
    ],
  },
  {
    id: "groceries",
    category: "Food",
    yours: "You threw away a full container of leftovers because you forgot about them.",
    theirs: "A family in South Sudan eats one meal every two days during drought season. The children are quieter now. That's how you know they've stopped asking.",
    stat: "One-third of all food produced globally is wasted — 1.3 billion tonnes per year. That's enough to feed every hungry person on earth three times over.",
    action: "The math of food waste and hunger is not complicated. It is obscene.",
    actions: [
      { effort: "5 min", label: "Download Too Good To Go", detail: "Rescue surplus food from restaurants and cafes near you at 1/3 price. Reduces food waste and saves you money. toogoodtogo.com", link: "https://www.toogoodtogo.com" },
      { effort: "Today", label: "Audit your fridge right now", detail: "Open it. What's about to expire? Cook it tonight. Freeze what you can. One habit change here can eliminate 90% of your household food waste." },
      { effort: "Monthly", label: "Volunteer at a food redistribution org", detail: "Orgs like FareShare (UK), City Harvest (NYC), and Second Harvest redistribute surplus food. They always need volunteers for sorting and delivery shifts." },
      { effort: "Lifestyle", label: "Buy ugly produce", detail: "40% of produce is rejected by supermarkets for cosmetic reasons. Odd Box, Misfits Market, and Imperfect Foods deliver rejected produce at a discount. The food is identical." },
    ],
  },
  {
    id: "school",
    category: "Education",
    yours: "You rolled your eyes at having to sit through a meeting or attend a class.",
    theirs: "A girl in Afghanistan was banned from secondary school at age 12. She hides textbooks under her bedroom floorboards and studies in secret. If found, her family faces consequences.",
    stat: "130 million girls worldwide are out of school. Afghanistan is the only country on earth with a formal ban on girls' secondary education. It was imposed in 2021 and remains in effect.",
    action: "Go to the class. Resent it later from a position of having gone. That's a privilege she is physically banned from.",
    actions: [
      { effort: "5 min", label: "Donate to Malala Fund", detail: "Malala Fund advocates for 12 years of free, quality education for girls globally. $25 funds one girl's education advocacy for a year. malala.org/donate", link: "https://malala.org/donate" },
      { effort: "Today", label: "Read one story from an Afghan girl", detail: "Refworld, UNHCR, and the Guardian have documented accounts. Read one. Not the policy summary. The girl." },
      { effort: "Monthly", label: "Support Room to Read", detail: "Room to Read builds libraries and supports girls' education in 17 countries. $10/month funds books; $50/month sponsors a girl's annual school support. roomtoread.org", link: "https://www.roomtoread.org" },
      { effort: "Lifestyle", label: "Pressure governments to sanction education bans", detail: "The Taliban's education ban violates international law but faces limited consequence. Contact your foreign affairs ministry. Support organizations applying diplomatic pressure through human rights channels." },
    ],
  },
  {
    id: "traffic",
    category: "Mobility",
    yours: "You were furious sitting in traffic for 40 minutes. You missed nothing. You arrived.",
    theirs: "A man in rural Chad has never been in a car. He has never left a 30km radius from where he was born. Not by choice. Because there is simply no road.",
    stat: "More than 1 billion people live in communities with no road access during wet seasons. Physical isolation is one of the strongest predictors of lifelong poverty.",
    action: "You were stuck in traffic because you have somewhere to go. Both the destination and the frustration are privileges.",
    actions: [
      { effort: "5 min", label: "Support Practical Action's transport programs", detail: "Practical Action builds low-cost infrastructure — footbridges, rural roads, river crossings — in isolated communities. practicalaction.org", link: "https://practicalaction.org" },
      { effort: "Today", label: "Use your commute time for something real", detail: "40 minutes in traffic. Put on a podcast about a crisis you know nothing about — ICRC's 'Humanity in War', or UN Radio. Arrive knowing something new." },
      { effort: "Monthly", label: "Donate to rural infrastructure funds", detail: "The Rural Access Index tracks and funds infrastructure in isolated regions. Development banks accept public donations to rural infrastructure bonds in several countries." },
      { effort: "Lifestyle", label: "Support trade policies that build local economies", detail: "Rural isolation is also economic — markets can't reach remote communities. Fair trade certification and advocacy for developing-country market access directly addresses this." },
    ],
  },
  {
    id: "electricity",
    category: "Infrastructure",
    yours: "You were genuinely annoyed when the power went out for 20 minutes.",
    theirs: "A student in rural Nigeria does his homework by kerosene lamp every night. The fumes are slowly accumulating in his lungs. He is still doing his homework.",
    stat: "770 million people have no electricity access. 2.6 billion cook on open fires or inefficient stoves. Indoor air pollution from cooking fires kills 4 million people per year — more than HIV and malaria combined.",
    action: "Your 20-minute outage was an inconvenience. His permanent outage is slowly poisoning him while he tries to learn.",
    actions: [
      { effort: "5 min", label: "Donate to Solar Aid", detail: "Solar Aid distributes solar lights to replace kerosene lamps in sub-Saharan Africa. A solar light costs $5–10, lasts 3 years, improves study hours and air quality. solar-aid.org", link: "https://solar-aid.org" },
      { effort: "Today", label: "Audit your own energy waste", detail: "Devices on standby in a typical home waste 10% of electricity. Unplug what you're not using. Redirect the annual savings (~$100) to an electrification charity." },
      { effort: "Monthly", label: "Support rural electrification NGOs", detail: "Practical Action and Practical Energy work specifically on off-grid renewable solutions for rural communities. $20/month contributes to solar micro-grid installations." },
      { effort: "Lifestyle", label: "Switch to renewable energy at home", detail: "If your grid allows it, choose a renewable energy tariff. Reduces your demand on fossil fuel systems and signals market demand. Then advocate for your council to do the same." },
    ],
  },
  {
    id: "passport",
    category: "Freedom & Movement",
    yours: "You complained that the visa application for your holiday was a pain to fill out.",
    theirs: "A Syrian family has been trying for 6 years to get legal passage to safety. Every application returns a rejection. Every rejection is another year in limbo.",
    stat: "A UK passport grants visa-free access to 192 countries. An Afghan passport: 28. Syrian: 29. The gap isn't merit. It's birth. Refugees wait an average of 17 years in limbo before resettlement.",
    action: "Your holiday inconvenience and their impossible migration are the same bureaucratic system. You are just standing at a very different door.",
    actions: [
      { effort: "5 min", label: "Donate to IRC (International Rescue Committee)", detail: "IRC provides immediate support and long-term integration help to refugees globally. rescue.org/donate", link: "https://www.rescue.org/donate" },
      { effort: "Today", label: "Learn the difference between refugee, asylum seeker, and migrant", detail: "Most people misuse these terms. Understanding them changes how you talk, vote, and advocate. UNHCR has a clear 60-second explainer. unhcr.org" },
      { effort: "Monthly", label: "Sponsor a refugee's resettlement practically", detail: "Welcome.us and Sponsor Refugees (UK) connect ordinary people with refugee families for practical, sustained support — not just one-time donations. welcome.us" },
      { effort: "Lifestyle", label: "Vote on refugee and asylum policy", detail: "Refugee intake numbers, asylum processing times, and deportation policies are decided by elected governments. Know your candidates' positions. Vote accordingly. Talk about it." },
    ],
  },
  {
    id: "dentist",
    category: "Healthcare",
    yours: "You kept putting off the dentist because you hate the discomfort.",
    theirs: "A child in rural Cambodia has never seen a dentist. She has three infected teeth. She has learned to eat on one side of her mouth. She calls it normal.",
    stat: "3.5 billion people suffer from untreated oral disease. Dental care remains among the least accessible healthcare globally. Untreated infections can become fatal.",
    action: "Pain you can treat but choose not to is a very specific kind of luxury. She doesn't have the option of putting it off.",
    actions: [
      { effort: "5 min", label: "Donate to Dentists Without Borders", detail: "DWB provides free dental care in underserved communities globally. Even small donations fund supplies for a clinic day. dentistswithoutborders.org" },
      { effort: "Today", label: "Book your appointment. Today.", detail: "Open your calendar. Find a slot. Book it now, before you close this tab. This is a direct action you can take in 3 minutes." },
      { effort: "Monthly", label: "Support mobile dental clinic programs", detail: "Organizations like Remote Area Medical run mobile dental clinics in low-access areas in the US and globally. Volunteering or donating funds their deployment." },
      { effort: "Lifestyle", label: "Advocate for dental care inclusion in public health", detail: "In many countries, dental care is excluded from universal healthcare. Treat it as a healthcare rights issue, not a cosmetic one. It is not cosmetic." },
    ],
  },
  {
    id: "safety",
    category: "Safety",
    yours: "You went for a late-night walk alone without thinking twice about it.",
    theirs: "A woman in parts of eastern DRC, Honduras, and Afghanistan cannot go outside after dark. The danger is not abstract. It has happened to her neighbors. It has happened to her.",
    stat: "1 in 3 women worldwide experiences physical or sexual violence in her lifetime. In conflict zones, sexual violence is used as a deliberate weapon of war. Most perpetrators face no consequences.",
    action: "Your safety at night is a privilege that should be a right. It is not universal. The difference between your life and hers is not a matter of character.",
    actions: [
      { effort: "5 min", label: "Donate to Women for Women International", detail: "WfWI supports women survivors of war with financial aid, job skills, and rights education in countries like DRC, Afghanistan, and Nigeria. womenforwomen.org", link: "https://www.womenforwomen.org" },
      { effort: "Today", label: "Learn what femicide means statistically", detail: "Look up your own country's femicide rate. It will surprise you. The problem is not only 'over there'. Awareness at home matters as much." },
      { effort: "Monthly", label: "Support a local domestic violence shelter", detail: "Most cities have shelters chronically underfunded. A $25/month recurring donation covers basic supplies. Many also need volunteers. Find yours at domesticshelters.org." },
      { effort: "Lifestyle", label: "Call out unsafe behavior when you see it", detail: "Most harassment and low-level violence happens in front of witnesses who say nothing. Bystander intervention training takes one afternoon. It changes what you do for the rest of your life." },
    ],
  },
  {
    id: "grief",
    category: "Loss & Grief",
    yours: "You felt genuinely sad watching a movie. You had to pause and collect yourself.",
    theirs: "A father in Ukraine identified his 19-year-old son's body from a photograph sent by soldiers last week. He has not spoken since. There is no grief counselor. There is no time.",
    stat: "Since 2022, over 10,000 Ukrainian civilians have been confirmed killed. Estimates are higher. Every statistic is a person whose absence leaves a hole that never fills.",
    action: "Your sadness at a movie is empathy. That is not nothing. Empathy is the raw material of action. Don't let it dissolve when the credits roll.",
    actions: [
      { effort: "5 min", label: "Donate to ICRC Ukraine emergency", detail: "The International Committee of the Red Cross provides medical care, detainee support, and family tracing in active conflict zones. icrc.org/donate", link: "https://www.icrc.org/en/donate" },
      { effort: "Today", label: "Read the name of one civilian casualty", detail: "The Kyiv Independent and Airwaves Memorial publish named records. Read one name. One story. Let it be a person, not a number." },
      { effort: "Monthly", label: "Support conflict grief and trauma organizations", detail: "War Child and HeartMath Institute fund trauma recovery programs for civilian survivors of conflict. warchildalliance.org", link: "https://www.warchildalliance.org" },
      { effort: "Lifestyle", label: "Stay informed past the news cycle", detail: "Most conflicts disappear from headlines but not from the people in them. Follow journalists on the ground. Subscribe to one conflict-focused newsletter. The attention of the world matters to survivors." },
    ],
  },
  {
    id: "vote",
    category: "Freedom & Movement",
    yours: "You almost didn't vote. You told yourself nothing ever changes anyway.",
    theirs: "A woman in Saudi Arabia could not vote in any election until 2015. Today in Belarus, voting against the government gets people jailed. In Myanmar, journalists covering elections disappear.",
    stat: "Half the world's population lives under authoritarian or partly-free governments. People have died — this week, this year — for the right you almost didn't bother using.",
    action: "Apathy is the most expensive form of comfort. It is only available to people whose rights are not yet in the hands of someone else.",
    actions: [
      { effort: "5 min", label: "Register to vote if you haven't", detail: "In most democracies this takes under 5 minutes online. Then put election dates in your calendar as non-negotiable appointments. vote.gov (US), gov.uk/register-to-vote (UK)" },
      { effort: "Today", label: "Read about one electoral prisoner", detail: "Amnesty International maintains a list of people imprisoned for political participation. Read one case. amnesty.org/en/latest/campaigns/2019/09/free-political-prisoners/" },
      { effort: "Monthly", label: "Support pro-democracy organizations", detail: "National Democratic Institute and Freedom House work to strengthen democratic institutions in fragile states. A $20/month donation sustains election monitoring programs. ndi.org", link: "https://www.ndi.org" },
      { effort: "Lifestyle", label: "Bring one person with you to vote", detail: "Every election. Bring one person who might not otherwise go. Drive someone. Make it social. Voter turnout is not an abstract civic statistic — it is the physical sum of individual choices." },
    ],
  },
  {
    id: "therapy",
    category: "Mental Health",
    yours: "You canceled your therapy appointment because you were too drained to go.",
    theirs: "A Somali refugee woman who survived sexual violence and watched her village burn has never spoken to a mental health professional. There are none available. She carries it alone, every day, indefinitely.",
    stat: "75% of people with mental health disorders in low-income countries receive zero treatment. The global treatment gap for mental health is one of the largest in medicine.",
    action: "Show up to your appointment. The access you have is rationed elsewhere with brutal precision. Not using it is not rest — it's waste.",
    actions: [
      { effort: "5 min", label: "Reschedule your appointment right now", detail: "Before you close this tab. Open your email or app. Reschedule. The barrier to rescheduling is lower than the barrier to going. Remove it." },
      { effort: "Today", label: "Donate to HealthRight International", detail: "HealthRight provides mental health services to refugees, trafficking survivors, and conflict-affected communities. healthright.org", link: "https://healthright.org" },
      { effort: "Monthly", label: "Support MSF mental health programs", detail: "MSF has dedicated mental health teams in Syria, South Sudan, DRC, and more. Their programs serve people who have witnessed things no human should. msf.org" },
      { effort: "Lifestyle", label: "Destigmatize mental health in your community", detail: "The treatment gap is partly a funding gap, partly a stigma gap. How you talk about therapy, depression, and trauma in your daily life shapes whether others seek help. This costs nothing." },
    ],
  },
];

const CATEGORIES = [...new Set(MOMENTS.map(m => m.category))];
const EFFORT_COLORS = { "5 min": "#7AE6C0", "Today": "#7AB8E6", "Monthly": "#E6C87A", "Lifestyle": "#E67AC0" };

export default function App() {
  const [checked, setChecked] = useState({});
  const [view, setView] = useState("home");
  const [filter, setFilter] = useState("All");
  const [revealed, setRevealed] = useState({});
  const [expandedActions, setExpandedActions] = useState({});
  const topRef = useRef(null);

  const toggleCheck = id => setChecked(p => ({ ...p, [id]: !p[id] }));
  const toggleReveal = id => setRevealed(p => ({ ...p, [id]: true }));
  const toggleActions = id => setExpandedActions(p => ({ ...p, [id]: !p[id] }));

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const totalMoments = MOMENTS.length;
  const ignoranceScore = Math.round((checkedCount / totalMoments) * 100);
  const filtered = filter === "All" ? MOMENTS : MOMENTS.filter(m => m.category === filter);
  const checkedMoments = MOMENTS.filter(m => checked[m.id]);

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: "smooth" });
  const goTo = v => { setView(v); scrollTop(); };

  const getVerdict = score => {
    if (score >= 80) return { label: "Deeply Asleep", color: "#ff4444", msg: "You move through life almost entirely unaware of the weight others carry. That's not a character flaw — it's the natural result of comfort without disruption. But comfort without consciousness eventually becomes complicity. You know more now than you did five minutes ago. What you do with that is the only question left." };
    if (score >= 60) return { label: "Mostly Comfortable", color: "#ff8844", msg: "You take a lot for granted. Not maliciously — just by default. That's how privilege works: it doesn't need to be cruel to be real. The good news is you're capable of seeing it. The bad news is that seeing it and doing nothing about it is just a more sophisticated version of not seeing it at all." };
    if (score >= 40) return { label: "Beginning to See", color: "#E6C87A", msg: "You recognize some of what you take for granted. That's genuinely harder than it sounds — most people never get here. But recognition is the cheapest possible response to injustice. The question now is what you do on the days it's inconvenient to care. Those days are the test." };
    if (score >= 20) return { label: "Consciously Grateful", color: "#7AE6C0", msg: "You're more aware than most. You feel the weight of what you have. Don't let that awareness become its own form of comfort — the 'at least I know' trap is real. Sustained action matters more than sustained awareness. Pick something and do it, not once, but as a rhythm." };
    return { label: "Genuinely Awake", color: "#7AB8E6", msg: "You carry an unusual degree of consciousness about your position in the world. The challenge now isn't awareness — it's not burning out from it, and not letting clarity become paralysis. Channel it. The world needs people who stay awake and stay functional. Both. Not one or the other." };
  };

  const verdict = getVerdict(ignoranceScore);

  // Group checked moments by category for action plan
  const byCategory = checkedMoments.reduce((acc, m) => {
    if (!acc[m.category]) acc[m.category] = [];
    acc[m.category].push(m);
    return acc;
  }, {});

  return (
    <div ref={topRef} style={{ minHeight: "100vh", background: "#0C0C0C", color: "#E0D8CC", fontFamily: "'Georgia','Times New Roman',serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Mono:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}button{cursor:pointer;}
        ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:#2a2a2a;}
        .cta{background:#E6C87A;color:#0C0C0C;border:none;padding:14px 36px;font-family:'DM Mono',monospace;font-size:11px;font-weight:500;letter-spacing:0.12em;cursor:pointer;transition:all 0.2s;text-transform:uppercase;}
        .cta:hover{background:#f0d48a;transform:translateY(-1px);}
        .ghost{background:transparent;border:1px solid rgba(255,255,255,0.14);color:rgba(255,255,255,0.5);padding:11px 26px;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:0.08em;cursor:pointer;transition:all 0.2s;text-transform:uppercase;}
        .ghost:hover{color:#E0D8CC;border-color:rgba(255,255,255,0.32);}
        .pill{background:transparent;border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.35);padding:5px 12px;border-radius:20px;font-family:'DM Mono',monospace;font-size:9px;cursor:pointer;transition:all 0.18s;letter-spacing:0.05em;}
        .pill:hover{color:rgba(255,255,255,0.7);border-color:rgba(255,255,255,0.25);}
        .pill.on{border-color:#E6C87A;color:#E6C87A;background:rgba(230,200,122,0.07);}
        .mcard{border:1px solid rgba(255,255,255,0.07);border-radius:4px;overflow:hidden;transition:border-color 0.2s;}
        .mcard:hover{border-color:rgba(255,255,255,0.13);}
        .mcard.chk{border-color:rgba(255,68,68,0.3);}
        .reveal-btn{background:transparent;border:none;color:rgba(255,180,100,0.55);cursor:pointer;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:0.08em;padding:0;text-decoration:underline;text-underline-offset:3px;transition:color 0.2s;}
        .reveal-btn:hover{color:rgba(255,200,130,0.9);}
        .action-tab{background:transparent;border:none;padding:4px 10px;border-radius:3px;font-family:'DM Mono',monospace;font-size:9px;cursor:pointer;transition:all 0.15s;border:1px solid transparent;}
        .action-tab:hover{border-color:rgba(255,255,255,0.15);}
        @keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes pulseRed{0%,100%{box-shadow:0 0 0 0 rgba(255,68,68,0)}50%{box-shadow:0 0 30px 6px rgba(255,68,68,0.1)}}
        .su{animation:slideUp 0.4s ease both;}
        .fi{animation:fadeIn 0.6s ease both;}
      `}</style>

      {/* ══ HOME ══════════════════════════════════════════════════════════════ */}
      {view === "home" && (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 32px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 30% 60%, rgba(230,200,122,0.04) 0%, transparent 55%), radial-gradient(ellipse at 75% 25%, rgba(255,60,60,0.04) 0%, transparent 50%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }} />

          <div style={{ maxWidth: 640, position: "relative" }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "rgba(255,255,255,0.18)", letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 36 }}>A Reality Check · {totalMoments} Moments</div>

            <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(56px,11vw,104px)", lineHeight: 0.92, letterSpacing: "0.02em", marginBottom: 32 }}>
              What You Call<br />
              <span style={{ color: "#E6C87A" }}>Tuesday</span><br />
              <span style={{ fontSize: "0.6em", color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em" }}>Is Someone Else's</span><br />
              <span style={{ color: "#ff5533" }}>Miracle</span>
            </h1>

            <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: 19, color: "rgba(255,255,255,0.42)", lineHeight: 1.8, marginBottom: 14 }}>
              You woke up. You ate. Water came from a tap. You probably complained about something before 9am.
            </p>
            <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: 19, color: "rgba(255,255,255,0.42)", lineHeight: 1.8, marginBottom: 50 }}>
              Somewhere right now, a child is wishing his dead brother could come back to life. He's smiling when he says it — because what else do you do with a broken heart and no other options?
            </p>

            <div style={{ width: 32, height: 1, background: "rgba(255,255,255,0.12)", margin: "0 auto 50px" }} />

            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.28)", lineHeight: 1.9, marginBottom: 50, letterSpacing: "0.03em" }}>
              This is not a feel-good exercise.<br />
              Check what you did today. Read what it means.<br />
              Then use the action plan to actually do something.
            </p>

            <button className="cta" onClick={() => goTo("mirror")}>Open the Mirror →</button>

            <div style={{ marginTop: 56, display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
              {["733M go hungry tonight", "2.2B lack clean water", "100M+ forcibly displaced", "160M children in labor"].map((s, i) => (
                <div key={i} style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, color: "rgba(255,255,255,0.18)", letterSpacing: "0.1em" }}>{s}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══ MIRROR ════════════════════════════════════════════════════════════ */}
      {view === "mirror" && (
        <div>
          {/* Sticky header */}
          <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(12,12,12,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, color: "rgba(255,255,255,0.18)", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 2 }}>Daily Privilege Mirror</div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 15, letterSpacing: "0.06em", color: "rgba(255,255,255,0.5)" }}>Check what happened to you today. Then read what it means.</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexShrink: 0 }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, color: checkedCount > 12 ? "#ff4444" : checkedCount > 6 ? "#E6C87A" : "#7AE6C0", lineHeight: 1 }}>{checkedCount}</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, color: "rgba(255,255,255,0.2)" }}>moments checked</div>
              </div>
              {checkedCount > 0 && <button className="cta" style={{ padding: "10px 18px", fontSize: 9 }} onClick={() => goTo("report")}>See Report →</button>}
            </div>
          </div>

          <div style={{ padding: "28px 32px", maxWidth: 860, margin: "0 auto" }}>
            <div style={{ background: "rgba(230,200,122,0.04)", border: "1px solid rgba(230,200,122,0.11)", borderRadius: 4, padding: "14px 18px", marginBottom: 24 }}>
              <div style={{ fontFamily: "'Crimson Pro',serif", fontSize: 14, color: "rgba(255,255,255,0.42)", lineHeight: 1.7 }}>
                <strong style={{ color: "rgba(255,255,255,0.62)" }}>Check every moment that happened to you today, or recently.</strong> Then click "their reality" to read the other side. Each checked moment generates specific, tiered actions in your report — from 5-minute to lifestyle changes.
              </div>
            </div>

            {/* Filters */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
              {["All", ...CATEGORIES].map(c => (
                <button key={c} className={`pill ${filter === c ? "on" : ""}`} onClick={() => setFilter(c)}>{c}</button>
              ))}
            </div>

            {/* Moment cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filtered.map((m, i) => {
                const isChecked = checked[m.id];
                const isRevealed = revealed[m.id];
                return (
                  <div key={m.id} className={`mcard ${isChecked ? "chk" : ""} su`} style={{ animationDelay: `${i * 0.025}s` }}>
                    <div style={{ padding: "16px 20px", display: "flex", alignItems: "flex-start", gap: 15, background: isChecked ? "rgba(255,50,50,0.04)" : "rgba(255,255,255,0.012)" }}>
                      {/* Checkbox */}
                      <button onClick={() => toggleCheck(m.id)} style={{ width: 22, height: 22, borderRadius: 3, flexShrink: 0, marginTop: 3, background: isChecked ? "rgba(255,68,68,0.18)" : "transparent", border: `1.5px solid ${isChecked ? "rgba(255,80,80,0.6)" : "rgba(255,255,255,0.14)"}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                        {isChecked && <span style={{ color: "#ff7777", fontSize: 12 }}>✓</span>}
                      </button>

                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, color: "rgba(230,200,122,0.45)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>{m.category}</div>
                        <div style={{ fontFamily: "'Crimson Pro',serif", fontSize: 17, color: isChecked ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.58)", lineHeight: 1.55, marginBottom: 10 }}>{m.yours}</div>

                        {!isRevealed ? (
                          <button className="reveal-btn" onClick={() => toggleReveal(m.id)}>→ read their reality</button>
                        ) : (
                          <div className="fi">
                            <div style={{ borderLeft: "2px solid rgba(255,80,60,0.35)", paddingLeft: 14, marginTop: 10, marginBottom: 12 }}>
                              <div style={{ fontFamily: "'Crimson Pro',serif", fontSize: 15, color: "rgba(255,185,165,0.82)", lineHeight: 1.7, marginBottom: 8, fontStyle: "italic" }}>{m.theirs}</div>
                              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "rgba(255,255,255,0.25)", lineHeight: 1.65 }}>{m.stat}</div>
                            </div>
                            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 3, padding: "9px 13px", borderLeft: "2px solid rgba(230,200,122,0.3)" }}>
                              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "rgba(230,200,122,0.65)", lineHeight: 1.65 }}>{m.action}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {checkedCount > 0 && (
              <div style={{ textAlign: "center", padding: "52px 0 64px" }}>
                <div style={{ fontFamily: "'Crimson Pro',serif", fontSize: 15, color: "rgba(255,255,255,0.28)", marginBottom: 22, fontStyle: "italic" }}>
                  {checkedCount} ordinary moments. Each one is someone else's impossible dream.
                </div>
                <button className="cta" onClick={() => goTo("report")}>Read Your Report & Action Plan →</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══ REPORT ════════════════════════════════════════════════════════════ */}
      {view === "report" && (
        <div style={{ minHeight: "100vh" }}>
          {checkedCount === 0 ? (
            <div style={{ textAlign: "center", padding: "100px 40px" }}>
              <div style={{ fontFamily: "'Crimson Pro',serif", fontSize: 22, color: "rgba(255,255,255,0.3)", marginBottom: 24 }}>No moments checked yet.</div>
              <button className="cta" onClick={() => goTo("mirror")}>Go back to the Mirror</button>
            </div>
          ) : (
            <>
              {/* ── Score Hero ── */}
              <div style={{ padding: "80px 40px 60px", textAlign: "center", background: "radial-gradient(ellipse at center, rgba(255,50,50,0.07) 0%, transparent 65%)", animation: "pulseRed 4s ease infinite" }}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, color: "rgba(255,255,255,0.18)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 28 }}>Your Reality Check</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(90px,16vw,150px)", lineHeight: 0.88, color: verdict.color, marginBottom: 12 }}>
                  {ignoranceScore}<span style={{ fontSize: "0.28em", color: "rgba(255,255,255,0.18)", fontFamily: "'DM Mono',monospace" }}>/100</span>
                </div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 30, letterSpacing: "0.1em", color: verdict.color, marginBottom: 24 }}>{verdict.label}</div>
                <div style={{ maxWidth: 580, margin: "0 auto 28px", fontFamily: "'Crimson Pro',serif", fontSize: 18, color: "rgba(255,255,255,0.48)", lineHeight: 1.85, fontStyle: "italic" }}>"{verdict.msg}"</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.22)" }}>{checkedCount} of {totalMoments} ordinary moments. {totalMoments - checkedCount} you didn't check — don't know if that's better or worse.</div>
              </div>

              {/* ── Side by Side ── */}
              <div style={{ padding: "48px 40px 0", maxWidth: 960, margin: "0 auto" }}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, color: "rgba(255,255,255,0.18)", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 24 }}>What You Took For Granted</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {checkedMoments.map((m, i) => (
                    <div key={m.id} className="su" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden", animationDelay: `${i * 0.04}s` }}>
                      <div style={{ padding: "18px 22px", background: "rgba(255,255,255,0.018)" }}>
                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, color: "rgba(230,200,122,0.4)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 7 }}>You · {m.category}</div>
                        <div style={{ fontFamily: "'Crimson Pro',serif", fontSize: 14, color: "rgba(255,255,255,0.58)", lineHeight: 1.65 }}>{m.yours}</div>
                      </div>
                      <div style={{ padding: "18px 22px", background: "rgba(255,40,30,0.04)", borderLeft: "1px solid rgba(255,68,68,0.12)" }}>
                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, color: "rgba(255,100,80,0.45)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 7 }}>Somewhere Else</div>
                        <div style={{ fontFamily: "'Crimson Pro',serif", fontSize: 14, color: "rgba(255,178,158,0.72)", lineHeight: 1.65, fontStyle: "italic" }}>{m.theirs}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Now Do Better ── */}
              <div style={{ padding: "56px 40px 0", maxWidth: 960, margin: "0 auto" }}>
                <div style={{ padding: "40px 44px", background: "rgba(230,200,122,0.04)", border: "1px solid rgba(230,200,122,0.14)", borderRadius: 6 }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 38, letterSpacing: "0.06em", color: "#E6C87A", marginBottom: 22 }}>Now Do Better.</div>
                  <div style={{ fontFamily: "'Crimson Pro',serif", fontSize: 17, color: "rgba(255,255,255,0.48)", lineHeight: 1.9, marginBottom: 28 }}>
                    Awareness without action is just a slightly more sophisticated form of not caring. You've seen the mirror. The world doesn't need your guilt — it needs your choices. Specific, sustained, repeated choices.
                    <br /><br />
                    Below is your personal action plan — built from every moment you checked. Each one has four levels: something you can do in 5 minutes, something for today, a monthly commitment, and a lifestyle shift. You don't have to do all of them. But you have to do <em>something</em>.
                    <br /><br />
                    <strong style={{ color: "rgba(255,255,255,0.72)" }}>The child with the broken heart and the brave smile didn't ask for your pity. He deserves to live in a world that actually gives a damn. That world is built by people who do things — not just people who feel things.</strong>
                  </div>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    {Object.entries(EFFORT_COLORS).map(([label, color]) => (
                      <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "rgba(255,255,255,0.35)" }}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Action Plan Per Moment ── */}
              <div style={{ padding: "40px 40px 0", maxWidth: 960, margin: "0 auto" }}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, color: "rgba(255,255,255,0.18)", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 28 }}>Your Personal Action Plan · {checkedCount} Moments</div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {checkedMoments.map((m, i) => (
                    <div key={m.id} className="su" style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, overflow: "hidden", animationDelay: `${i * 0.05}s` }}>
                      {/* Header */}
                      <div style={{ padding: "18px 24px 14px", background: "rgba(255,255,255,0.025)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                          <div>
                            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, color: "rgba(230,200,122,0.5)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>{m.category}</div>
                            <div style={{ fontFamily: "'Crimson Pro',serif", fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>{m.yours}</div>
                          </div>
                          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "rgba(255,100,80,0.5)", flexShrink: 0, marginTop: 20 }}>
                            {m.actions.length} actions
                          </div>
                        </div>
                        {/* Their reality reminder */}
                        <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.05)", fontFamily: "'Crimson Pro',serif", fontSize: 12, color: "rgba(255,165,145,0.55)", lineHeight: 1.55, fontStyle: "italic" }}>
                          {m.theirs}
                        </div>
                      </div>

                      {/* Actions grid */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0 }}>
                        {m.actions.map((act, ai) => (
                          <div key={ai} style={{ padding: "18px 22px", borderRight: ai % 2 === 0 ? "1px solid rgba(255,255,255,0.05)" : "none", borderBottom: ai < 2 ? "1px solid rgba(255,255,255,0.05)" : "none", background: ai % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent" }}>
                            {/* Effort badge */}
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                              <div style={{ width: 7, height: 7, borderRadius: "50%", background: EFFORT_COLORS[act.effort], flexShrink: 0 }} />
                              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, color: EFFORT_COLORS[act.effort], letterSpacing: "0.12em", textTransform: "uppercase" }}>{act.effort}</span>
                            </div>
                            {/* Action label */}
                            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.72)", marginBottom: 8, lineHeight: 1.4, fontWeight: 500 }}>{act.label}</div>
                            {/* Detail */}
                            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.32)", lineHeight: 1.7 }}>{act.detail}</div>
                            {/* Link if available */}
                            {act.link && (
                              <a href={act.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 8, fontFamily: "'DM Mono',monospace", fontSize: 9, color: "rgba(230,200,122,0.55)", textDecoration: "none", borderBottom: "1px solid rgba(230,200,122,0.25)", paddingBottom: 1, transition: "color 0.15s" }}>
                                Open link →
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Category Action Summary ── */}
              <div style={{ padding: "48px 40px 0", maxWidth: 960, margin: "0 auto" }}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, color: "rgba(255,255,255,0.18)", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 24 }}>By Category — Where To Focus</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
                  {Object.entries(byCategory).map(([cat, moments]) => {
                    const allActions = moments.flatMap(m => m.actions);
                    const quickest = allActions.find(a => a.effort === "5 min");
                    return (
                      <div key={cat} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 5, padding: "18px 20px" }}>
                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "rgba(230,200,122,0.55)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 6 }}>{cat}</div>
                        <div style={{ fontFamily: "'Crimson Pro',serif", fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 12 }}>{moments.length} moment{moments.length > 1 ? "s" : ""} checked</div>
                        {quickest && (
                          <div style={{ background: "rgba(122,230,192,0.06)", border: "1px solid rgba(122,230,192,0.15)", borderRadius: 3, padding: "9px 12px" }}>
                            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, color: "rgba(122,230,192,0.55)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 5 }}>Start here · 5 min</div>
                            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{quickest.label}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── Stats ── */}
              <div style={{ padding: "40px 40px 0", maxWidth: 960, margin: "0 auto" }}>
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 5, padding: "26px 30px" }}>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, color: "rgba(255,255,255,0.18)", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 20 }}>The Numbers Behind Your Ordinary Day</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {checkedMoments.map(m => (
                      <div key={m.id} style={{ display: "flex", gap: 12, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <span style={{ color: "rgba(255,68,68,0.5)", fontFamily: "'DM Mono',monospace", fontSize: 10, flexShrink: 0, marginTop: 1 }}>—</span>
                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.32)", lineHeight: 1.65 }}>{m.stat}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Footer CTA ── */}
              <div style={{ padding: "48px 40px 80px", maxWidth: 960, margin: "0 auto", display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="ghost" onClick={() => goTo("mirror")}>← Back to Mirror</button>
                <button className="ghost" onClick={() => { setChecked({}); setRevealed({}); goTo("home"); }} style={{ color: "rgba(255,255,255,0.2)", borderColor: "rgba(255,255,255,0.07)" }}>Start Over</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
