#!/usr/bin/env python3
"""Build NEO manifests for Oak RSHE (PSHE) Years 9 and 10 from data read off thenational.academy on 29 Sep 2026.
Oak's RSHE is not in the curriculum ontology download; unit/lesson slugs were read from the site.
Learner (pupil) pages exist for only a small subset of lessons; the rest are educator-only on Oak."""
import json

PUPIL = {
  9: {"the-equality-act-2010-and-modern-britain","long-term-relationships","civil-partnerships","the-importance-of-quality-sleep","good-sleep-routines",
      "basic-first-aid-cuts-burns-breaks-and-sprains-and-stings","basic-first-aid-heat-imbalances-choking-and-anaphylaxis","basic-first-aid-unconsciousness"},
  10: {"online-relationships","seeking-support-online","online-data","work-education-and-the-internet","water-safety"},
}

Y9 = [
 ("communities-how-can-we-understand-and-respect-different-types-of-relationships","Communities: How can we understand and respect different types of relationships?",[
  ("the-equality-act-2010-and-modern-britain","The Equality Act (2010) and modern Britain","I can describe the key points of the Equality Act of 2010 and its impact on modern Britain."),
  ("lgbt-people-in-modern-britain","LGBT people in modern Britain","I can explain how the law and attitudes have changed for LGBT people in the UK and describe the contributions of some LGBT people in modern Britain."),
  ("marriage-equality","Marriage equality","I can explain the key legal changes in the UK relating to civil partnerships and marriage equality."),
  ("diversity-and-the-law-in-modern-britain","Diversity and the law in modern Britain","I can explain diversity in Britain, legal protections, and the difference between acceptable and unacceptable protest.")]),
 ("healthy-relationships-how-do-relationships-change","Healthy relationships: How do relationships change?",[
  ("a-healthy-romantic-relationship","A healthy romantic relationship","I can describe the features of healthy romantic relationships."),
  ("long-term-relationships","Long-term relationships","I can explain the different types of long-term relationship, including cohabitation."),
  ("marriage","Marriage","I can explain the importance of marriage, why people choose to marry, and key marriage laws in the UK."),
  ("civil-partnerships","Civil partnerships","I can explain the importance of civil partnerships and why people might choose to enter into a civil partnership.")]),
 ("power-in-relationships-how-can-we-keep-safe","Power in relationships: How can we keep safe?",[
  ("power-and-consent","Power and consent","I can explain how power imbalances affect consent and describe what grooming is."),
  ("exploitation","Exploitation","I can describe the signs of exploitation and explain where someone could access support."),
  ("sexual-harassment","Sexual harassment","I can explain what sexual harassment is, the law surrounding it and how to get help.")]),
 ("healthy-intimate-relationships-how-can-sex-be-safe","Healthy intimate relationships: How can sex be safe?",[
  ("healthy-intimate-relationships","Healthy intimate relationships","I can describe the features of healthy intimate relationships, evaluate readiness for intimacy, and discuss strategies for not pressuring or resisting pressure."),
  ("condoms","Condoms","I can explain the purpose of condoms and how they are used."),
  ("contraceptive-choices","Contraceptive choices","I can evaluate the different methods of contraception available and know when each one might be suitable."),
  ("sex-and-other-aspects-of-health","Sex and other aspects of health","I can explain how to access confidential sexual and reproductive health advice and treatment."),
  ("sexually-transmitted-infections-stis","Sexually transmitted infections (STIs)","I can describe what STIs are, how they are transmitted, and ways to prevent them."),
  ("human-immunodeficiency-virus-hiv","Human immunodeficiency virus (HIV)","I can explain what HIV is, how it is transmitted, its transmission rates, and how it affects the immune system.")]),
 ("media-influence-how-can-i-look-after-myself","Media influence: How can I look after myself?",[
  ("sharing-personal-information-online","Sharing personal information online","I can explain the risks of sharing personal information and personal images online."),
  ("the-laws-and-impacts-of-viewing-pornography","Pornography and healthy relationships","I can describe the laws around pornography and explain how pornography can cause harm."),
  ("online-addiction","Online addiction","I can describe the signs of online addiction and explain how to manage screen time."),
  ("online-gambling","Online gambling","I can describe the rules around online gambling, explain why people gamble and explain how to access support for an online gambling addiction."),
  ("trolls-and-harassment","Trolls and harassment","I can describe the harm that online trolls and online harassment can cause and explain ways to manage this.")]),
 ("physical-health-whats-so-important-about-sleep","Physical health: What's so important about sleep?",[
  ("the-importance-of-quality-sleep","The importance of quality sleep","I can explain why sleep is important and the consequences of too little or too much sleep."),
  ("good-sleep-routines","Good sleep routines","I can explain how to maximise my chances of getting a good night's sleep.")]),
 ("risky-substances-what-do-i-need-to-know-about-illegal-and-prescription-drugs","Risky substances: What do I need to know about illegal and prescription drugs?",[
  ("drugs-and-their-risks","Drugs and their risks","I can explain what drugs are, distinguish between legal and illegal drugs, explain why people might take them and identify the risks involved."),
  ("stimulants","Stimulants","I can describe what stimulants are, explain why people might use them, identify the risks involved and know how to help if someone has taken them."),
  ("depressants","Depressants","I can describe what depressants are, explain the risks of taking them and know how to respond if someone is having a bad reaction."),
  ("hallucinogens","Hallucinogens","I can describe what hallucinogens are, explain their risks and effects, and know how to respond if someone needs help.")]),
 ("staying-safe-and-healthy-what-do-i-need-to-know-about-basic-first-aid","Staying safe and healthy: What do I need to know about basic first aid?",[
  ("basic-first-aid-cuts-burns-breaks-and-sprains-and-stings","Basic first aid: cuts, burns, breaks and sprains, and stings","I can explain how to help in cases of cuts, burns, breaks and sprains, and stings."),
  ("basic-first-aid-heat-imbalances-choking-and-anaphylaxis","Basic first aid: heat imbalances, choking and anaphylaxis","I can explain how to help casualties suffering from heat imbalances, choking and anaphylaxis."),
  ("basic-first-aid-unconsciousness","Basic first aid: unconsciousness","I can describe how to help an unconscious casualty including the recovery position, CPR and AED use.")]),
 ("our-changing-bodies-what-changes-occur-as-you-age","Our changing bodies: When might I need to seek support?",[
  ("changes-in-puberty-and-when-to-seek-help","Changes in puberty and when to seek help","I can describe the different changes experienced during puberty and explain when it is best to seek help and support."),
  ("menstruation-and-how-to-access-support","Women's health conditions","I can describe some common women's health conditions and explain when someone should seek support from a healthcare professional."),
  ("menstruation-and-how-cycles-change-with-age","Menstruation and how cycles change with age","I can explain how menstrual cycles change with age."),
  ("puberty-and-brain-development","Puberty and brain development","I can describe how my body and brain change during puberty and how to stay healthy as I grow.")]),
 ("staying-safe-what-do-i-need-to-know-about-knife-crime","Staying safe: what do I need to know about knife crime?",[
  ("knife-crime","Knife crime","I can explain what knife crime is, how it is misrepresented online, and where to get help if I'm worried about violence."),
  ("the-laws-about-knives-and-weapons","The laws about knives and weapons","I can explain the law on knives and weapons."),
  ("the-consequences-of-knife-crime","The consequences of knife crime","I can explain the consequences of knife crime for individuals and communities and how it impacts future choices.")]),
]

Y10 = [
 ("communities-why-is-respect-understanding-and-compassion-important","Communities: Why is respect, understanding and compassion important?",[
  ("equality-in-modern-britain","Equality in modern Britain","I can explain the Equality Act, how it protects people from discrimination, and what to do if I witness discrimination."),
  ("rights-and-responsibilities-in-our-community","Rights and responsibilities in our community","I can explain how rights and responsibilities work together to build a safe community, and describe practical steps to take when I feel unsafe."),
  ("rights-and-responsibilities-in-the-workplace","Rights and responsibilities in the workplace","I can explain my basic rights and responsibilities at work and know what to do if something goes wrong."),
  ("support-in-our-community","Support in our community","I can explain when I might need support in a public space, describe different sources of support, and practise ways to ask for help.")]),
 ("healthy-relationships-how-do-separation-and-change-affect-relationships","Healthy relationships: How do separation and change affect relationships?",[
  ("separation-and-sudden-changes","Separation and sudden changes","I can describe how separation or sudden change can affect people and explain where to find support."),
  ("death-grief-and-loss","Death, grief and loss","I can explain the possible impacts of grief and know where to get support."),
  ("grieving-processes","Grieving processes","I can explain some common processes of grief and how I can get support.")]),
 ("power-in-relationships-what-does-a-healthy-relationships-feel-like","Power in relationships: What does a healthy relationship feel like?",[
  ("healthy-relationships","Healthy relationships","I can describe aspects of healthy long-term relationships."),
  ("recognising-abuse-and-violence","Recognising abuse and violence","I can describe different forms of domestic abuse and explain how to seek support."),
  ("how-to-protect-myself-and-others","How to protect myself and others","I can describe the signs of domestic abuse that others might see, and explain how to challenge unacceptable behaviour and attitudes.")]),
 ("healthy-intimate-relationships-what-influences-risky-sexual-behaviour","Healthy intimate relationships: What influences risky sexual behaviour?",[
  ("unhealthy-relationships","Unhealthy relationships","I can describe possible indicators of unhealthy relationships and explain how this can affect wellbeing."),
  ("consent","Consent","I can explain what consent means, why it matters, and how to recognise whether it is present."),
  ("safety-respect-and-trust-in-intimate-relationships","Safety, respect and trust in intimate relationships","I can explain the qualities of a healthy intimate relationship, describe unsafe or harmful behaviours, and explain where to get help and support."),
  ("drugs-and-risky-sexual-behaviour","Drugs and risky sexual behaviour","I can explain the impact of drugs on decision-making and risky sexual behaviour."),
  ("alcohol-and-risky-sexual-behaviour","Alcohol and risky sexual behaviour","I can describe how alcohol can influence decision-making and lead to risky sexual behaviours.")]),
 ("media-influence-is-the-internet-a-good-influence-in-our-lives","Media influence: Is the internet a good influence in our lives?",[
  ("the-impact-of-the-internet-on-me","The impact of the internet on me","I can describe the impacts of the internet, spot false information and explain risks of illegal online behaviours."),
  ("online-relationships","Online relationships","I can describe how online communications can impact relationships and how to communicate safely online."),
  ("seeking-support-online","Seeking support online","I can explain which online resources are reliable sources of support and advice."),
  ("online-data","Online data","I can describe how data is collected, sold and used online and explain how to protect my sensitive data."),
  ("work-education-and-the-internet","Work, education and the internet","I can describe how the internet can be used in education, work and business.")]),
 ("our-online-lives-how-can-being-online-impact-my-life","Our online lives: How can being online impact my life?",[
  ("what-healthy-internet-use-looks-like","What healthy internet use looks like","I can describe healthy online activity and explain how the internet can connect people."),
  ("social-media-and-mental-health","Social media and mental health","I can describe the potential effects of social media on mental health."),
  ("social-media-and-communities","Social media and communities","I can explain how communities can be affected by social media."),
  ("social-media-and-difference","Social media and difference","I can describe how social media is not always representative of society."),
  ("social-media-and-conflict","Social media and conflict","I can explain how social media can escalate conflicts, describe ways to avoid this, and explain where to go for help and advice.")]),
 ("physical-health-how-can-physical-health-affect-others","Physical health: How can physical health affect others?",[
  ("chronic-illness","Chronic illness","I can describe the symptoms of some common chronic illnesses."),
  ("organ-and-blood-donation","Organ, blood and stem cell donation","I can explain the importance of blood, organ and stem cell donation and how people can make informed decisions about donation.")]),
 ("mental-health-what-are-common-types-of-mental-ill-health","Mental health: What are common types of mental health conditions?",[
  ("mental-health-conditions","Mental health conditions","I can explain what a mental health condition is and the factors that may contribute to it."),
  ("stress","Stress","I can describe common stressors, the effects of stress, how to manage it and when to get help."),
  ("anxiety-and-ocd","Anxiety and OCD","I can describe what anxiety and OCD are, their common symptoms, and explain how to support someone and seek help."),
  ("depression","Depression","I can describe some common features of depression and explain how to support someone and when to get help.")]),
 ("staying-safe-and-healthy-how-can-i-check-my-body-is-healthy","Staying safe and healthy: How can I check my body is healthy?",[
  ("signs-of-health-problems","Signs of health problems","I can describe the bodily signs that signal a potential health issue and explain what to do if I spot them."),
  ("immunisation","Immunisation","I can explain the benefits of immunisation and evaluate the arguments around them."),
  ("intimate-health-care","Intimate health care","I can explain the importance of health checks and self-examination, and how to conduct one."),
  ("safety-in-the-sun","Safety in the sun","I can explain how to keep myself safe in the sun, what sun damage looks like, and what to do about it."),
  ("water-safety","Water safety","I can explain how to stay safe around water and how to respond in a water emergency.")]),
]

ATTR = "Sequencing, lesson titles and outcomes adapted from the Oak National Academy RSHE (PSHE) curriculum, © Oak National Academy, licensed under the Open Government Licence v3.0. Educator-led: most Oak RSHE lessons are published for teachers only."

def build(year, units, ks):
    tp = f"rshe-pshe-secondary-{ks}"
    pp = f"rshe-pshe-secondary-year-{year}"
    out_units = []
    for pos, (uslug, utitle, lessons) in enumerate(units, 1):
        rows = []
        for lpos, (lslug, ltitle, outcome) in enumerate(lessons, 1):
            teacher = f"https://www.thenational.academy/teachers/programmes/{tp}/units/{uslug}/lessons/{lslug}"
            row = {"id": f"{uslug}-{lpos:02d}-{lslug}", "num": f"Lesson {lpos:02d}", "title": ltitle,
                   "url": teacher, "teacherUrl": teacher, "outcome": outcome, "status": "live", "source": "oak", "cornerstones": []}
            if lslug in PUPIL[year]:
                row["pupilUrl"] = f"https://www.thenational.academy/pupils/programmes/{pp}/units/{uslug}/lessons/{lslug}"
            rows.append(row)
        strand = utitle.split(":")[0]
        out_units.append({"id": f"y{year}-{pos:02d}-{uslug}", "title": utitle, "topic": f"Y{year}.{pos:02d} · {utitle}",
                          "stage": f"Year {year}", "year": year, "sequence": pos, "strand": strand, "oakSlug": uslug,
                          "oakUnitUrl": f"https://www.thenational.academy/teachers/programmes/{tp}/units/{uslug}/lessons", "lessons": rows})
    return {"version": "0.1", "brand": "NEO by Nudge Education", "site_title": f"NEO RSHE · Year {year} (Oak)", "attribution": ATTR, "units": out_units}

for year, units, ks in [(9, Y9, "ks3"), (10, Y10, "ks4")]:
    m = build(year, units, ks)
    json.dump(m, open(f"rshe-year{year}-oak.json", "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    print(year, len(m["units"]), sum(len(u["lessons"]) for u in m["units"]), "pupil pages:", sum(1 for u in m["units"] for l in u["lessons"] if "pupilUrl" in l))
