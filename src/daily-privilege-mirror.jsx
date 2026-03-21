import { useState } from "react";

const MOMENTS = [
  {id:"breakfast",category:"Food & Hunger",
    yours:"You skipped breakfast because you weren't hungry.",
    theirs:"A 7-year-old in Yemen walked 4km to a feeding station today. There was nothing left when she arrived.",
    stat:"733 million people go to bed hungry every single night.",
    action:"Next time you waste food, pause. Donate to a food bank this week. Even $10 feeds a family for days.",
    actions:[
      {time:"5 MIN",type:"today",title:"Download Too Good To Go",desc:"Rescue surplus food from restaurants and cafes near you at 1/3 price. Reduces food waste and saves you money.",link:"toogoodtogo.com"},
      {time:"TODAY",type:"today",title:"Audit your fridge right now",desc:"Open it. What's about to expire? Cook it tonight. Freeze what you can. One habit change here can eliminate 90% of your household food waste."},
      {time:"MONTHLY",type:"monthly",title:"Volunteer at a food redistribution org",desc:"Orgs like FareShare (UK), City Harvest (NYC), and Second Harvest redistribute surplus food. They always need volunteers for sorting and delivery shifts."},
      {time:"LIFESTYLE",type:"lifestyle",title:"Buy ugly produce",desc:"40% of produce is rejected by supermarkets for cosmetic reasons. Odd Box, Misfits Market, and Imperfect Foods deliver rejected produce at a discount. The food is identical."},
    ]},
  {id:"cab",category:"Mobility & Access",
    yours:"You were tired, so you took a cab instead of walking.",
    theirs:"A nurse in Malawi walked 11km to work in the dark this morning. There is no public transport and she cannot afford a bicycle.",
    stat:"1 billion people have no access to any form of motorized transport.",
    action:"Your fatigue is real. So is hers. Consider donating to programs that provide bikes to health workers in low-income countries.",
    actions:[
      {time:"5 MIN",type:"today",title:"Donate to World Bicycle Relief",desc:"$176 provides a Buffalo Bicycle to a student or health worker in sub-Saharan Africa. One bike changes everything about what's reachable.",link:"worldbicyclerelief.org"},
      {time:"TODAY",type:"today",title:"Walk or cycle one trip this week",desc:"Not as guilt — as a reminder. Feeling your legs carry you somewhere is a luxury billions rely on, and you get to choose it."},
      {time:"MONTHLY",type:"monthly",title:"Advocate for public transport funding",desc:"Write to your local representative. Cities with better public transit have lower inequality. It's infrastructure justice, not just convenience."},
      {time:"LIFESTYLE",type:"lifestyle",title:"Notice mobility as a gift",desc:"Every time you choose a cab, bus, or bike — you chose. That freedom is not universal."},
    ]},
  {id:"water",category:"Clean Water",
    yours:"You let the shower run for two minutes waiting for it to warm up.",
    theirs:"A mother in sub-Saharan Africa spent 3 hours today collecting water for her family. It wasn't clean.",
    stat:"2.2 billion people lack access to safe drinking water. Women and girls spend 200 million collective hours every day collecting it.",
    action:"Turn off the tap. Donate to a clean water charity. It costs roughly $50 to give one person clean water for life.",
    actions:[
      {time:"5 MIN",type:"today",title:"Donate to charity: water",desc:"100% of public donations go to water projects. $30 gives one person clean water for life. They send GPS coordinates when your project is complete.",link:"charitywater.org"},
      {time:"TODAY",type:"today",title:"Install a shower timer",desc:"A 4-minute shower uses ~40 litres. A 10-minute one uses ~100. Set a timer starting today. The savings compound."},
      {time:"MONTHLY",type:"monthly",title:"Fix household leaks",desc:"A dripping tap wastes 15 litres a day. 5,500 litres a year. One washer fix, one afternoon, permanent impact."},
      {time:"LIFESTYLE",type:"lifestyle",title:"Rethink your water footprint",desc:"Your diet has a water cost: 1kg of beef uses ~15,000 litres of water. Reducing meat by one meal a week matters more than shorter showers."},
    ]},
  {id:"dog",category:"Loss & Grief",
    yours:"You wished you had more time with your dog.",
    theirs:"A child in Gaza wishes he could bring his brother back to life. He said it with a smile on his face and a broken heart.",
    stat:"Over 400,000 children have been killed or injured in conflict zones in the last decade.",
    action:"Your love for your dog is beautiful. Hold it. And let it remind you that children elsewhere are losing people — not time. That grief deserves your attention.",
    actions:[
      {time:"5 MIN",type:"today",title:"Read one story from a conflict zone",desc:"Not the statistics. One person. UNHCR's website has individual refugee stories. Put a face to the number today.",link:"unhcr.org/stories"},
      {time:"TODAY",type:"today",title:"Donate to UNICEF's emergency fund",desc:"UNICEF reaches children in active conflict zones. $10 provides therapeutic food for a malnourished child for a week.",link:"unicef.org"},
      {time:"MONTHLY",type:"monthly",title:"Talk about it out loud",desc:"One reason conflicts persist is that people in safe countries stop paying attention. Mention it. Post about it. Keep the conversation alive."},
      {time:"LIFESTYLE",type:"lifestyle",title:"Let love radicalize you",desc:"The love you feel for your dog — that fierce, uncomplicated care — is exactly the energy the world needs directed outward. Feed it."},
    ]},
  {id:"sleep",category:"Labor & Rest",
    yours:"You complained about only getting 6 hours of sleep.",
    theirs:"A garment worker in Bangladesh works 14-hour shifts, six days a week, making the clothes you wear. She sleeps 5 hours.",
    stat:"The clothes on your back were likely made by someone earning less than $3 a day.",
    action:"Check the label. Research the brand. Buy less, buy better, or donate the price difference to a fair labor organization.",
    actions:[
      {time:"5 MIN",type:"today",title:"Look up your clothing brand",desc:"Good On You rates fashion brands on labor and environmental impact. Check your most-worn brands right now.",link:"goodonyou.eco"},
      {time:"TODAY",type:"today",title:"Audit your wardrobe",desc:"Count clothes with tags still on. Clothes unworn in a year. Then buy nothing new for 30 days."},
      {time:"MONTHLY",type:"monthly",title:"Support a fair trade brand",desc:"Next purchase, buy from a certified fair trade or B Corp clothing company. It costs more. That extra is someone's fair wage."},
      {time:"LIFESTYLE",type:"lifestyle",title:"Buy less. Buy better. Repeat.",desc:"Fast fashion is cheap because someone else is paying the real price. Choosing less is a political act."},
    ]},
  {id:"phone",category:"Information Access",
    yours:"You scrolled for 90 minutes before bed because you were bored.",
    theirs:"A teenager in North Korea has never used the internet. He doesn't know what he doesn't know.",
    stat:"3.5 billion people — nearly half the world — still lack meaningful internet access.",
    action:"Information is power. Your scroll time costs nothing. Support organizations that fight for internet freedom globally.",
    actions:[
      {time:"5 MIN",type:"today",title:"Donate to Access Now",desc:"Access Now defends the digital rights of at-risk users worldwide — fighting internet shutdowns, surveillance, and censorship.",link:"accessnow.org"},
      {time:"TODAY",type:"today",title:"Use your screen time with intention today",desc:"Not guilt — intention. Read something that matters. Learn something new. Use the access you have."},
      {time:"MONTHLY",type:"monthly",title:"Support the EFF",desc:"The Electronic Frontier Foundation fights for global internet freedom, encryption rights, and surveillance limits.",link:"eff.org"},
      {time:"LIFESTYLE",type:"lifestyle",title:"Notice what free information gives you",desc:"Every time you Google something, find a job, or access a government service online — that's a freedom. Name it."},
    ]},
  {id:"hospital",category:"Healthcare",
    yours:"You were annoyed your doctor's appointment took 45 minutes.",
    theirs:"In Sierra Leone, there is 1 doctor for every 45,000 people. Most people never see one in their lives.",
    stat:"Half the world's population lacks access to essential health services.",
    action:"Your wait was inconvenient. Their wait is a death sentence. Advocate for global health funding.",
    actions:[
      {time:"5 MIN",type:"today",title:"Donate to MSF (Médecins Sans Frontières)",desc:"MSF runs hospitals in 70+ countries, including active war zones and disease outbreaks. $30 covers one outpatient consultation.",link:"msf.org"},
      {time:"TODAY",type:"today",title:"Book the appointment you've been putting off",desc:"Access to healthcare you're not using is its own kind of waste. Make the call today. Preventive care also costs the system less."},
      {time:"MONTHLY",type:"monthly",title:"Support Partners in Health",desc:"PIH builds permanent healthcare infrastructure in Haiti, Rwanda, Malawi and more — not just emergency aid. $25/month sustains a community health worker.",link:"pih.org"},
      {time:"LIFESTYLE",type:"lifestyle",title:"Advocate for universal healthcare policy",desc:"Every country that has fought for universal healthcare did so because people demanded it. If you live somewhere without it, that fight is yours too."},
    ]},
  {id:"complain_job",category:"Labor & Rest",
    yours:"You vented hard about how much you hate your job.",
    theirs:"A 12-year-old in the Democratic Republic of Congo is mining cobalt — the mineral inside your phone battery — with his bare hands. No gloves. No school.",
    stat:"160 million children are in child labor globally. 79 million in hazardous conditions.",
    action:"Hate your job from a desk. Acknowledge the child who has no desk, no childhood, no choice.",
    actions:[
      {time:"5 MIN",type:"today",title:"Sign a petition on ethical mineral sourcing",desc:"Amnesty International campaigns for tech companies to audit cobalt supply chains. Sign and share.",link:"amnesty.org"},
      {time:"TODAY",type:"today",title:"Research your phone brand's supply chain",desc:"Does your phone manufacturer audit for child labor? Apple, Samsung, and others publish supply chain reports. Look yours up."},
      {time:"MONTHLY",type:"monthly",title:"Donate to Save the Children",desc:"Save the Children works directly on child labor elimination — education programs, family support, policy advocacy.",link:"savethechildren.org"},
      {time:"LIFESTYLE",type:"lifestyle",title:"Support companies with ethical supply chains",desc:"Fair Trade certified electronics exist. Fairphone is one. The premium you pay is someone's protected childhood."},
    ]},
  {id:"groceries",category:"Food & Hunger",
    yours:"You threw away a full container of leftovers because you forgot about them.",
    theirs:"A family in South Sudan eats one meal every two days during drought season. The children are quieter now. That's how you know they've stopped asking.",
    stat:"One-third of all food produced globally is wasted. Enough food is wasted every year to feed 3 billion people.",
    action:"Use what you buy. Compost what you can't. The math of waste and hunger is obscene.",
    actions:[
      {time:"5 MIN",type:"today",title:"Download Too Good To Go",desc:"Rescue surplus food from restaurants and cafes near you at 1/3 price. Reduces food waste and saves you money.",link:"toogoodtogo.com"},
      {time:"TODAY",type:"today",title:"Audit your fridge right now",desc:"Open it. What's about to expire? Cook it tonight. Freeze what you can. One habit change here can eliminate 90% of your household food waste."},
      {time:"MONTHLY",type:"monthly",title:"Volunteer at a food redistribution org",desc:"Orgs like FareShare (UK), City Harvest (NYC), and Second Harvest redistribute surplus food. They always need volunteers."},
      {time:"LIFESTYLE",type:"lifestyle",title:"Buy ugly produce",desc:"40% of produce is rejected by supermarkets for cosmetic reasons. Odd Box, Misfits Market, and Imperfect Foods deliver rejected produce at a discount."},
    ]},
  {id:"school",category:"Education",
    yours:"You rolled your eyes at having to sit through a meeting or attend a class.",
    theirs:"A girl in Afghanistan was banned from school at age 12. She hides textbooks under her floorboards and studies in secret.",
    stat:"130 million girls worldwide are out of school. In Afghanistan, secondary education for girls has been banned since 2021.",
    action:"Go to class. Go to the meeting. Or at minimum, support organizations fighting for girls' education globally.",
    actions:[
      {time:"5 MIN",type:"today",title:"Donate to Malala Fund",desc:"The Malala Fund advocates for 12 years of free, quality education for every girl. $1 funds 40 minutes of a girl's education.",link:"malala.org"},
      {time:"TODAY",type:"today",title:"Learn one thing you've been putting off",desc:"Take the online course. Read the chapter. Use your access. It's not unlimited — but right now it's yours."},
      {time:"MONTHLY",type:"monthly",title:"Support Room to Read",desc:"Room to Read has reached 39 million children with literacy and girls' education programs across Asia and Africa.",link:"roomtoread.org"},
      {time:"LIFESTYLE",type:"lifestyle",title:"Treat your education like the gift it is",desc:"Not every day. But once a week, notice. The access you have is actively being fought for by someone on the other side of the world."},
    ]},
  {id:"passport",category:"Freedom & Mobility",
    yours:"You complained the visa process for your vacation was annoying.",
    theirs:"A Syrian family has been trying for 6 years to legally migrate somewhere safe. Every application returns a rejection. Every rejection is another year in limbo.",
    stat:"The world's most powerful passports grant visa-free access to 190+ countries. The weakest grant fewer than 30.",
    action:"Your vacation inconvenience and their impossible migration are the same system, seen from different positions in it.",
    actions:[
      {time:"5 MIN",type:"today",title:"Donate to UNHCR",desc:"UNHCR protects refugees, forcibly displaced communities, and stateless people worldwide. $29 provides a family with essential household items.",link:"unhcr.org"},
      {time:"TODAY",type:"today",title:"Read the Refugee Convention",desc:"A 1951 document that established refugee rights. It takes 20 minutes to read. You'll understand global migration debates differently after.",},
      {time:"MONTHLY",type:"monthly",title:"Support a local refugee resettlement org",desc:"Find one in your city. They need volunteers for English tutoring, furniture collection, and job coaching. Show up."},
      {time:"LIFESTYLE",type:"lifestyle",title:"Think about borders as constructed, not natural",desc:"The accident of where you were born determines most of your freedom. That should make us angry enough to change it."},
    ]},
  {id:"dentist",category:"Healthcare",
    yours:"You kept putting off the dentist because you hate the discomfort.",
    theirs:"A child in rural Cambodia has never seen a dentist. She has three infected teeth. She has learned to eat on one side of her mouth. She calls it normal.",
    stat:"3.5 billion people suffer from oral diseases. Dental care is among the least accessible healthcare globally.",
    action:"Book the appointment. Pain you can treat but choose not to is a luxury others don't have.",
    actions:[
      {time:"5 MIN",type:"today",title:"Book your dental appointment right now",desc:"Open your browser. Find a dentist. Book it. You have been putting this off. The discomfort lasts 45 minutes. Her infection is permanent."},
      {time:"TODAY",type:"today",title:"Donate to Dentists Without Borders",desc:"Dentists Without Borders provides dental care in underserved communities globally. $50 covers a full treatment for one patient.",link:"dentistswithoutborders.org"},
      {time:"MONTHLY",type:"monthly",title:"Support Operation Smile",desc:"Operation Smile provides free surgical care for children with cleft conditions — a simple procedure that transforms a life.",link:"operationsmile.org"},
      {time:"LIFESTYLE",type:"lifestyle",title:"Floss daily as an act of gratitude",desc:"It sounds absurd. But maintaining what you have access to — dentistry, preventive care — is a form of respect for the luck involved."},
    ]},
  {id:"safety",category:"Safety & Freedom",
    yours:"You went for a late-night walk alone without thinking twice about it.",
    theirs:"A woman in parts of eastern DRC, Honduras, and Afghanistan cannot go outside after dark. The danger is not abstract. It has happened to her neighbors. It has happened to her.",
    stat:"Globally, 1 in 3 women experience physical or sexual violence in their lifetime. In conflict zones, it is weaponized.",
    action:"Your safety at night is a privilege. It should be universal. Support women's safety and rights organizations.",
    actions:[
      {time:"5 MIN",type:"today",title:"Donate to UN Women",desc:"UN Women works globally on ending violence against women, economic empowerment, and leadership representation.",link:"unwomen.org"},
      {time:"TODAY",type:"today",title:"Check in on a woman in your life",desc:"Ask how she's doing. Whether she feels safe. What small things she does daily that you never have to think about."},
      {time:"MONTHLY",type:"monthly",title:"Support your local domestic violence shelter",desc:"Most need cash donations, volunteer time, and donated goods. Find yours and show up."},
      {time:"LIFESTYLE",type:"lifestyle",title:"Notice the space you occupy",desc:"If you've never had to calculate whether a route is safe, that calculation-free life is a gift. Use it to make space safer for others."},
    ]},
  {id:"grief",category:"Loss & Grief",
    yours:"You felt genuinely sad watching a movie.",
    theirs:"A father in Ukraine identified his son's body from a photograph last week. His son was 19.",
    stat:"Since 2022, over 10,000 civilians have been killed in Ukraine alone. Families everywhere carry grief that the news cycle has long since moved past.",
    action:"Your sadness from a movie is empathy. Feed it. Let it be the beginning of caring, not the end of it.",
    actions:[
      {time:"5 MIN",type:"today",title:"Donate to the International Committee of the Red Cross",desc:"The ICRC works in active conflict zones on both sides to protect civilians and trace missing persons.",link:"icrc.org"},
      {time:"TODAY",type:"today",title:"Read one story from an ongoing conflict",desc:"Not the summary. One family. One person. BBC, The Guardian, and Reuters all publish long-form human interest pieces. Find one."},
      {time:"MONTHLY",type:"monthly",title:"Stay informed about one conflict for 6 months",desc:"Pick one. Ukraine. Sudan. Gaza. Myanmar. Follow it through. Sustained attention is rare and powerful."},
      {time:"LIFESTYLE",type:"lifestyle",title:"Let fiction grow your empathy muscles",desc:"The sadness you felt watching that movie is the same emotion, differently triggered. Keep watching. Keep reading. Keep feeling."},
    ]},
  {id:"vote",category:"Freedom & Mobility",
    yours:"You almost didn't vote because 'nothing ever changes anyway.'",
    theirs:"A woman in Saudi Arabia could not vote in any national election until 2015. Millions of people worldwide still cannot.",
    stat:"Half the world's population still lives under authoritarian or partly-free governments with no meaningful electoral voice.",
    action:"Apathy is a privilege. Voting is one of the few free, legal, direct levers you have. Use it.",
    actions:[
      {time:"5 MIN",type:"today",title:"Register to vote if you haven't",desc:"Takes 5 minutes in most countries. If you're already registered, check your registration is current and your address is correct.",},
      {time:"TODAY",type:"today",title:"Read about one upcoming election or referendum",desc:"Local elections matter more than national ones on daily life. Know what's on your ballot."},
      {time:"MONTHLY",type:"monthly",title:"Volunteer for a campaign or civic org",desc:"Phone banking, canvassing, or data entry. Two hours a month from people who care changes election outcomes. It always has."},
      {time:"LIFESTYLE",type:"lifestyle",title:"Vote every time, for everything",desc:"City council. School board. Referendum. Judge. Every ballot. Every time. The people who don't want you to vote are counting on your fatigue."},
    ]},
  {id:"therapy",category:"Mental Health",
    yours:"You canceled your therapy appointment because you were too tired.",
    theirs:"A Somali refugee woman who survived sexual violence has never spoken to a mental health professional. There are none where she lives, and she couldn't afford one anyway.",
    stat:"75% of people with mental health disorders in low-income countries receive no treatment whatsoever.",
    action:"Show up to your appointment. The access you have is rationed elsewhere. Use it.",
    actions:[
      {time:"5 MIN",type:"today",title:"Reschedule your appointment right now",desc:"Open your phone. Find the number. Send the text. You can be tired and still show up."},
      {time:"TODAY",type:"today",title:"Donate to the Global Mental Health Fund",desc:"The GMHF funds community-based mental health programs in low and middle income countries where professionals are unavailable.",},
      {time:"MONTHLY",type:"monthly",title:"Support Médecins Sans Frontières' mental health programs",desc:"MSF has a major mental health component in their work — trauma counseling in conflict zones, PTSD support for survivors.",link:"msf.org"},
      {time:"LIFESTYLE",type:"lifestyle",title:"Treat mental healthcare like physical healthcare",desc:"You wouldn't cancel a cardiology appointment because you were tired. Your mind is the same organ. Show up for it."},
    ]},
  {id:"electricity",category:"Infrastructure",
    yours:"You were annoyed when the power went out for 20 minutes.",
    theirs:"A student in rural Nigeria does his homework by kerosene lamp every night. The fumes are slowly damaging his lungs.",
    stat:"770 million people have no access to electricity. 2.6 billion still cook on open fires, inhaling smoke equivalent to smoking 2 packs of cigarettes a day.",
    action:"Your 20-minute outage was an inconvenience. His is a life lived in the dark. Support rural electrification programs.",
    actions:[
      {time:"5 MIN",type:"today",title:"Donate to Solar Aid",desc:"Solar Aid distributes affordable solar lights in Malawi and Zambia, replacing kerosene lamps. $5 provides a solar light to one family.",link:"solar-aid.org"},
      {time:"TODAY",type:"today",title:"Audit your own energy use today",desc:"Turn off lights in empty rooms. Unplug chargers. Not as guilt — as a reminder that energy is not infinite or equally distributed."},
      {time:"MONTHLY",type:"monthly",title:"Switch to a renewable energy provider",desc:"If your country offers it, switching your electricity supply to renewable energy takes one phone call and costs roughly the same."},
      {time:"LIFESTYLE",type:"lifestyle",title:"Notice electricity as infrastructure, not magic",desc:"It gets to you through investment, policy, and physical infrastructure. That investment was made for you. It wasn't made equally."},
    ]},
  {id:"medication",category:"Healthcare",
    yours:"You forgot to take your medication for two days because you were busy.",
    theirs:"A mother with HIV in Mozambique walked 6 hours one way to collect her antiretrovirals. She does this every month. If she misses a month, she dies.",
    stat:"38 million people live with HIV. Millions cannot access life-saving medication that costs pennies to manufacture but remains unaffordable in low-income countries.",
    action:"Take your medication. If you can, donate to MSF or the Global Fund.",
    actions:[
      {time:"5 MIN",type:"today",title:"Set a daily medication alarm",desc:"Right now. On your phone. One alarm. No more forgetting. You have access to medication — don't waste it."},
      {time:"TODAY",type:"today",title:"Donate to the Global Fund",desc:"The Global Fund fights AIDS, tuberculosis, and malaria in 100+ countries. $10 provides one month of HIV treatment.",link:"theglobalfund.org"},
      {time:"MONTHLY",type:"monthly",title:"Support MSF's access to medicines campaign",desc:"MSF campaigns for pharmaceutical companies to lower prices on essential medicines in low-income countries. Sign their petitions and donate.",link:"msf.org"},
      {time:"LIFESTYLE",type:"lifestyle",title:"Learn what 'patent cliff' means",desc:"Many essential medicines become unaffordable because of patent protections. Understanding this system is the first step to changing it."},
    ]},
  {id:"birthday",category:"Belonging & Identity",
    yours:"You stressed about what to get someone for their birthday.",
    theirs:"A Rohingya child in a refugee camp has never celebrated a birthday. She doesn't know her exact date of birth because birth records were never kept for people like her.",
    stat:"Over 100 million people are forcibly displaced worldwide — the highest number ever recorded in human history.",
    action:"Celebrate your people. And once a year, redirect one gift's worth of money to a refugee relief fund.",
    actions:[
      {time:"5 MIN",type:"today",title:"Donate to UNHCR in someone's name",desc:"Give a 'tribute gift' to UNHCR in someone's birthday honor. They get a card, a refugee gets real support.",link:"unhcr.org"},
      {time:"TODAY",type:"today",title:"Learn about the Rohingya crisis",desc:"Over 1 million Rohingya have been displaced since 2017. Most people couldn't point to Myanmar on a map. Change that today."},
      {time:"MONTHLY",type:"monthly",title:"Sponsor a refugee family",desc:"Many countries have community refugee sponsorship programs where groups of people support one resettled family. Find your country's program."},
      {time:"LIFESTYLE",type:"lifestyle",title:"Know someone's story",desc:"Find one refugee story and follow it. UNHCR, IRC, and Amnesty all share individual stories. Let one person become real to you."},
    ]},
  {id:"commute",category:"Infrastructure",
    yours:"You complained about your commute being too long.",
    theirs:"A teacher in rural Mozambique cycles 2 hours each way on an unpaved road every day to reach a school that has no electricity and shares one textbook between 40 students.",
    stat:"258 million children worldwide are still out of school. In the countries with the worst teacher shortages, one teacher may serve 80+ students.",
    action:"Your commute has an endpoint. He has a purpose that keeps him pedaling. Honor that by not wasting the day you arrive to.",
    actions:[
      {time:"5 MIN",type:"today",title:"Donate to Teach For All",desc:"Teach For All is a global network developing teacher leadership in 60 countries, particularly in underserved communities.",link:"teachforall.org"},
      {time:"TODAY",type:"today",title:"Use your commute to learn something",desc:"Podcast. Audiobook. Language app. Your commute is discretionary time that he would trade anything for. Fill it intentionally."},
      {time:"MONTHLY",type:"monthly",title:"Support a teacher in a low-income country",desc:"Many platforms allow direct support to teachers and classrooms in developing countries for school supplies, books, and infrastructure."},
      {time:"LIFESTYLE",type:"lifestyle",title:"Rethink what 'too long' means",desc:"A commute with a seat, a phone, a coffee, and a destination is not hardship. Name it for what it is: imperfect comfort."},
    ]},
  {id:"restaurant",category:"Food & Hunger",
    yours:"You couldn't decide what to order because everything looked good.",
    theirs:"A family in Yemen is eating one ration of emergency food aid per day — for 6 people. It runs out in two days and no one knows when the next delivery is coming.",
    stat:"Yemen has been experiencing one of the world's worst humanitarian crises since 2015. 21 million people need humanitarian assistance.",
    action:"The abundance in front of you is extraordinary. Notice it. Order what you'll finish. Leave a tip.",
    actions:[
      {time:"5 MIN",type:"today",title:"Donate to the Yemen Crisis Appeal",desc:"The International Rescue Committee and CARE both have active Yemen emergency programs.",link:"rescue.org"},
      {time:"TODAY",type:"today",title:"Finish what you ordered",desc:"Take it home if you can't. Leftovers tomorrow are a meal you don't have to buy. Waste nothing when you have everything."},
      {time:"MONTHLY",type:"monthly",title:"Support the World Food Programme",desc:"WFP is the largest humanitarian organization addressing hunger. They feed 115 million people in 120 countries.",link:"wfp.org"},
      {time:"LIFESTYLE",type:"lifestyle",title:"Eat with gratitude, not guilt",desc:"Not every meal. Just sometimes. Pause before the first bite. Name the luck out loud, even quietly. It changes something."},
    ]},
};

const TYPE_COLORS={today:"#7AE6C0",monthly:"#E6C87A",lifestyle:"#A87AE6","5 MIN":"#7AB8E6"};
const CATEGORIES=[...new Set(MOMENTS.map(m=>m.category))];

export default function DailyMirror({dark:darkProp,onToggleTheme}){
  const [checked,setChecked]=useState({});
  const [expanded,setExpanded]=useState({});
  const [view,setView]=useState("mirror");
  const [filter,setFilter]=useState("All");

  const dark=darkProp!==undefined?darkProp:true;

  const D={
    bg:dark?"#0C0C0C":"#F5F2EC",
    bg2:dark?"#111112":"#EDEAE3",
    text:dark?"#E0D8CC":"#1A1810",
    textMid:dark?"rgba(255,255,255,0.55)":"rgba(0,0,0,0.55)",
    textLow:dark?"rgba(255,255,255,0.28)":"rgba(0,0,0,0.32)",
    border:dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.1)",
    borderMid:dark?"rgba(255,255,255,0.12)":"rgba(0,0,0,0.15)",
    cardBg:dark?"rgba(255,255,255,0.02)":"rgba(255,255,255,0.75)",
    headerBg:dark?"rgba(12,12,12,0.97)":"rgba(245,242,236,0.97)",
    checkedBg:dark?"rgba(255,68,68,0.04)":"rgba(200,40,0,0.03)",
    checkedBorder:dark?"rgba(255,68,68,0.25)":"rgba(200,40,0,0.2)",
    theirsBg:dark?"rgba(255,40,40,0.04)":"rgba(200,40,0,0.03)",
    theirsBorder:dark?"rgba(255,68,68,0.3)":"rgba(200,40,0,0.2)",
    theirs:dark?"rgba(255,180,160,0.85)":"rgba(160,40,0,0.85)",
    actionBg:dark?"rgba(230,200,122,0.06)":"rgba(180,140,40,0.06)",
    goldText:dark?"#E6C87A":"#8B6914",
    red:dark?"#ff6644":"#CC3300",
    redText:dark?"#ff8866":"#993300",
  };

  const checkedCount=Object.values(checked).filter(Boolean).length;
  const totalMoments=MOMENTS.length;
  const ignoranceScore=Math.round((checkedCount/totalMoments)*100);
  const filtered=filter==="All"?MOMENTS:MOMENTS.filter(m=>m.category===filter);

  const getVerdict=score=>{
    if(score>=80)return{label:"Deeply Asleep",color:dark?"#ff4444":"#CC0000",msg:"You move through life almost entirely unaware of the weight others carry. That's not a personality flaw — it's a symptom of comfort. But comfort without consciousness becomes complicity."};
    if(score>=60)return{label:"Mostly Comfortable",color:dark?"#ff8844":"#CC5500",msg:"You take a lot for granted. Not maliciously — just by default. The good news: awareness is the first step. The bad news: awareness without action is still just watching."};
    if(score>=40)return{label:"Beginning to See",color:D.goldText,msg:"You recognize some of what you take for granted. But recognition is cheap. The question is what you do with it on the days when it's inconvenient to care."};
    if(score>=20)return{label:"Consciously Grateful",color:dark?"#7AE6C0":"#007A50",msg:"You're more aware than most. Don't let that become a reason to stop. Awareness without sustained action still leaves the world unchanged."};
    return{label:"Genuinely Awake",color:dark?"#7AB8E6":"#1A5FAF",msg:"You carry an unusual degree of consciousness about your position in the world. The challenge now isn't awareness — it's not burning out from it."};
  };
  const verdict=getVerdict(ignoranceScore);

  return(
    <div style={{minHeight:"100vh",background:D.bg,color:D.text,fontFamily:"Georgia,'Times New Roman',serif",transition:"background 0.3s,color 0.3s"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');
        *{box-sizing:border-box;}button{cursor:pointer;}
        ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:#888;}
        .cat-pill{border-radius:20px;padding:5px 12px;font-family:'DM Mono',monospace;font-size:9px;cursor:pointer;transition:all 0.18s;letter-spacing:0.06em;background:transparent;}
        .moment-card{border-radius:6px;overflow:hidden;transition:border-color 0.2s;margin-bottom:10px;}
        .reveal-btn{background:transparent;border:none;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:0.08em;padding:0;text-decoration:underline;text-underline-offset:3px;transition:color 0.2s;cursor:pointer;}
        .action-card{border-radius:4px;padding:14px;border:1px solid;}
        .cta-btn{background:#C8A84B;color:#0C0C0C;border:none;padding:12px 24px;border-radius:4px;font-family:'DM Mono',monospace;font-size:11px;font-weight:500;letter-spacing:0.08em;transition:all 0.2s;cursor:pointer;}
        .cta-btn:hover{background:#d4b455;}
        .ghost-btn{background:transparent;border:1px solid;border-radius:4px;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:0.08em;padding:10px 20px;transition:all 0.2s;cursor:pointer;}
        @keyframes slideUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        .slide-up{animation:slideUp 0.35s ease both;}

        /* MOBILE FIXES */
        @media(max-width:640px){
          .report-grid{grid-template-columns:1fr!important;}
          .actions-grid{grid-template-columns:1fr!important;}
          .filter-row{flex-wrap:wrap!important;gap:6px!important;}
          .mirror-header{padding:12px 14px!important;}
          .mirror-header-right{gap:8px!important;}
        }
      `}</style>

      {/* HEADER */}
      <div style={{position:"sticky",top:0,zIndex:40,background:D.headerBg,backdropFilter:"blur(10px)",borderBottom:`1px solid ${D.border}`}}>
        <div className="mirror-header" style={{padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
          <div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:D.textLow,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:2}}>Daily Privilege Mirror</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:"0.06em",color:D.textMid}}>Check what you did today. Read what it means.</div>
          </div>
          <div className="mirror-header-right" style={{display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
            {onToggleTheme&&<button onClick={onToggleTheme} style={{background:"transparent",border:`1px solid ${D.border}`,color:D.textMid,padding:"6px 12px",borderRadius:3,fontFamily:"'DM Mono',monospace",fontSize:11}}>{dark?"☀️":"🌙"}</button>}
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,color:checkedCount>10?D.red:checkedCount>5?D.goldText:"#7AE6C0",lineHeight:1}}>{checkedCount}</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:D.textLow}}>checked</div>
            </div>
            {view==="mirror"&&checkedCount>0&&<button className="cta-btn" style={{fontSize:10,padding:"8px 14px"}} onClick={()=>setView("report")}>Report</button>}
            {view==="report"&&<button className="ghost-btn" onClick={()=>setView("mirror")} style={{borderColor:D.borderMid,color:D.textMid}}>← Mirror</button>}
          </div>
        </div>
      </div>

      {/* ── MIRROR VIEW ── */}
      {view==="mirror"&&(
        <div style={{padding:"20px 16px",maxWidth:740,margin:"0 auto"}}>
          {/* Instruction */}
          <div style={{background:D.actionBg,border:`1px solid ${D.border}`,borderRadius:4,padding:"14px 16px",marginBottom:20}}>
            <div style={{fontFamily:"'Crimson Pro',serif",fontSize:14,color:D.textMid,lineHeight:1.7}}>
              <strong style={{color:D.text}}>Check the moments that happened to you today, or recently.</strong> Then tap "their reality" to read what that same moment looks like for someone else on this planet right now.
            </div>
          </div>

          {/* Category filter */}
          <div className="filter-row" style={{display:"flex",gap:6,marginBottom:20,overflowX:"auto",paddingBottom:4}}>
            {["All",...CATEGORIES].map(c=>(
              <button key={c} className="cat-pill" onClick={()=>setFilter(c)}
                style={{border:`1px solid ${filter===c?D.goldText:D.border}`,color:filter===c?D.goldText:D.textLow,background:filter===c?`rgba(230,200,122,0.07)`:"transparent",whiteSpace:"nowrap"}}>
                {c}
              </button>
            ))}
          </div>

          {/* Moment cards */}
          {filtered.map((m,i)=>{
            const isChecked=checked[m.id];
            const isExpanded=expanded[m.id];
            return(
              <div key={m.id} className={`moment-card slide-up`} style={{animationDelay:`${i*0.025}s`,border:`1px solid ${isChecked?D.checkedBorder:D.border}`,background:isChecked?D.checkedBg:D.cardBg}}>
                <div style={{padding:"16px"}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                    {/* Checkbox */}
                    <button onClick={()=>setChecked(p=>({...p,[m.id]:!p[m.id]}))} style={{width:22,height:22,borderRadius:4,flexShrink:0,marginTop:2,background:isChecked?"rgba(255,68,68,0.2)":"transparent",border:`1.5px solid ${isChecked?"rgba(255,68,68,0.6)":D.borderMid}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}>
                      {isChecked&&<span style={{color:D.redText,fontSize:12,lineHeight:1}}>✓</span>}
                    </button>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:D.goldText,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:6,opacity:0.7}}>{m.category}</div>
                      <div style={{fontFamily:"'Crimson Pro',serif",fontSize:"clamp(14px,3.5vw,17px)",color:isChecked?D.text:D.textMid,lineHeight:1.55,marginBottom:10}}>{m.yours}</div>
                      {!isExpanded?(
                        <button className="reveal-btn" onClick={()=>setExpanded(p=>({...p,[m.id]:true}))} style={{color:D.textLow}}>
                          → their reality
                        </button>
                      ):(
                        <div style={{animation:"slideUp 0.35s ease both"}}>
                          {/* Their reality */}
                          <div style={{borderLeft:`2px solid ${D.theirsBorder}`,paddingLeft:12,marginBottom:12,marginTop:4}}>
                            <div style={{fontFamily:"'Crimson Pro',serif",fontSize:"clamp(13px,3vw,15px)",color:D.theirs,lineHeight:1.65,marginBottom:8,fontStyle:"italic"}}>{m.theirs}</div>
                            <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:D.textLow,lineHeight:1.6}}>{m.stat}</div>
                          </div>
                          {/* Action summary */}
                          <div style={{background:D.actionBg,borderRadius:3,padding:"10px 12px",display:"flex",gap:8,alignItems:"flex-start"}}>
                            <span style={{color:D.goldText,fontSize:10,flexShrink:0,marginTop:2}}>→</span>
                            <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:D.goldText,lineHeight:1.65,opacity:0.8}}>{m.action}</div>
                          </div>
                          {/* 4 action cards */}
                          <div className="actions-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:10}}>
                            {m.actions.map((a,ai)=>(
                              <div key={ai} className="action-card" style={{background:D.bg2,borderColor:D.border}}>
                                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                                  <div style={{width:7,height:7,borderRadius:"50%",background:TYPE_COLORS[a.time]||"#888",flexShrink:0}}/>
                                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:TYPE_COLORS[a.time]||D.textLow,letterSpacing:"0.12em"}}>{a.time}</div>
                                </div>
                                <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:D.text,lineHeight:1.4,marginBottom:6,fontWeight:500}}>{a.title}</div>
                                <div style={{fontFamily:"'DM Mono',monospace",fontSize:9.5,color:D.textMid,lineHeight:1.6}}>{a.desc}</div>
                                {a.link&&<a href={`https://${a.link}`} target="_blank" rel="noreferrer" style={{display:"block",marginTop:8,fontFamily:"'DM Mono',monospace",fontSize:9,color:D.goldText,textDecoration:"underline",textUnderlineOffset:3}}>Open link →</a>}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {checkedCount>0&&(
            <div style={{textAlign:"center",padding:"36px 0 60px"}}>
              <div style={{fontFamily:"'Crimson Pro',serif",fontSize:14,color:D.textLow,marginBottom:16}}>You checked {checkedCount} ordinary moments.<br/>Each one is someone else's impossible dream.</div>
              <button className="cta-btn" onClick={()=>setView("report")}>Read Your Report →</button>
            </div>
          )}
        </div>
      )}

      {/* ── REPORT VIEW ── */}
      {view==="report"&&(
        <div style={{padding:"40px 16px 80px",maxWidth:860,margin:"0 auto"}}>
          {/* Score hero */}
          <div style={{textAlign:"center",padding:"48px 20px 40px",borderBottom:`1px solid ${D.border}`,marginBottom:28}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:D.textLow,letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:20}}>Your Reality Check</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(72px,15vw,120px)",lineHeight:0.9,color:verdict.color,marginBottom:12}}>{ignoranceScore}<span style={{fontSize:"0.28em",color:D.textLow,fontFamily:"'DM Mono',monospace"}}>/100</span></div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(20px,5vw,28px)",letterSpacing:"0.08em",color:verdict.color,marginBottom:20}}>{verdict.label}</div>
            <div style={{maxWidth:520,margin:"0 auto",fontFamily:"'Crimson Pro',serif",fontSize:"clamp(14px,3vw,17px)",color:D.textMid,lineHeight:1.8,fontStyle:"italic",marginBottom:16}}>"{verdict.msg}"</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:D.textLow}}>You checked {checkedCount} of {totalMoments} ordinary moments as things you experienced.</div>
          </div>

          {/* Checked items — stacked on mobile */}
          {checkedCount>0&&(
            <div style={{marginBottom:24}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:D.textLow,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:20}}>What You Took For Granted</div>
              {MOMENTS.filter(m=>checked[m.id]).map((m,i)=>(
                <div key={m.id} className="slide-up" style={{border:`1px solid ${D.border}`,borderRadius:6,overflow:"hidden",marginBottom:12,animationDelay:`${i*0.04}s`}}>
                  <div style={{padding:"16px",background:dark?"rgba(255,255,255,0.02)":"rgba(255,255,255,0.6)"}}>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:D.goldText,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:8,opacity:0.6}}>{m.category}</div>
                    <div style={{fontFamily:"'Crimson Pro',serif",fontSize:14,color:D.textMid,lineHeight:1.6,marginBottom:12}}><strong style={{color:D.text}}>You:</strong> {m.yours}</div>
                    <div style={{borderLeft:`2px solid ${D.theirsBorder}`,paddingLeft:12}}>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:D.redText,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:6,opacity:0.6}}>Somewhere Else</div>
                      <div style={{fontFamily:"'Crimson Pro',serif",fontSize:14,color:D.theirs,lineHeight:1.6,fontStyle:"italic"}}>{m.theirs}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* The ask */}
          <div style={{background:D.actionBg,border:`1px solid ${dark?"rgba(230,200,122,0.15)":"rgba(180,140,40,0.2)"}`,borderRadius:6,padding:"28px 24px",marginBottom:24}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(24px,6vw,32px)",letterSpacing:"0.06em",color:D.goldText,marginBottom:16}}>Now Do Better.</div>
            <div style={{fontFamily:"'Crimson Pro',serif",fontSize:"clamp(14px,3vw,16px)",color:D.textMid,lineHeight:1.9,marginBottom:24}}>
              Awareness without action is just a slightly more sophisticated form of not caring. You've seen the mirror. The world doesn't need your guilt — it needs your choices.
              <br/><br/>
              <strong style={{color:D.text}}>The child with the broken heart and the brave smile didn't ask for your pity. He just deserves to exist in a world that actually gives a damn.</strong>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {MOMENTS.filter(m=>checked[m.id]).map((m,i)=>(
                <div key={m.id} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"10px 14px",background:dark?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.5)",borderRadius:3}}>
                  <span style={{color:D.goldText,fontFamily:"'DM Mono',monospace",fontSize:10,flexShrink:0,marginTop:2}}>{String(i+1).padStart(2,"0")}</span>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:D.textMid,lineHeight:1.7}}>{m.action}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{background:D.cardBg,border:`1px solid ${D.border}`,borderRadius:6,padding:"22px 20px",marginBottom:28}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:D.textLow,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:16}}>The Numbers Behind Your Day</div>
            {MOMENTS.filter(m=>checked[m.id]).map(m=>(
              <div key={m.id} style={{display:"flex",gap:10,paddingBottom:10,marginBottom:10,borderBottom:`1px solid ${D.border}`}}>
                <span style={{color:"rgba(255,68,68,0.5)",fontFamily:"'DM Mono',monospace",fontSize:10,flexShrink:0,marginTop:1}}>—</span>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:D.textLow,lineHeight:1.65}}>{m.stat}</div>
              </div>
            ))}
          </div>

          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            <button className="ghost-btn" onClick={()=>setView("mirror")} style={{borderColor:D.borderMid,color:D.textMid}}>← Back to Mirror</button>
            <button onClick={()=>{setChecked({});setExpanded({});setView("mirror");}} style={{background:"transparent",border:"none",color:D.textLow,fontFamily:"'DM Mono',monospace",fontSize:10,cursor:"pointer",padding:"10px 12px"}}>Start Over</button>
          </div>
        </div>
      )}
    </div>
  );
}
