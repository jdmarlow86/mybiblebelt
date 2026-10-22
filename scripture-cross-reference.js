(() => {
    "use strict";

    const crossReferences = [
        { topic: "Sabbath and Creation", tags: ["sabbath", "creation", "seventh day", "rest", "commandments", "god's law", "law"], passages: [
            ["Genesis 2:1-3", "Creation account", "God rests, blesses, and sanctifies the seventh day."],
            ["Exodus 20:8-11", "The fourth commandment", "The commandment grounds Sabbath rest in God's creation work."],
            ["Deuteronomy 5:12-15", "Remembering deliverance", "This version of the commandment also recalls Israel's deliverance from slavery."],
            ["Mark 2:27-28", "Jesus and the Sabbath", "Jesus speaks about the Sabbath's purpose and His authority."],
            ["Luke 4:16", "Jesus' custom", "Luke describes Jesus attending the synagogue on the Sabbath."],
            ["Isaiah 58:13-14", "A delight", "The prophet describes honoring the Sabbath as a delight."]
        ]},
        { topic: "Salvation by grace through faith", tags: ["salvation", "grace", "faith", "saved", "works", "gospel", "jesus"], passages: [
            ["John 3:16-17", "God's love and the Son", "Jesus describes God's love and the purpose of His sending."],
            ["Romans 3:21-24", "Righteousness through faith", "Paul explains that all have sinned and are justified by grace."],
            ["Ephesians 2:8-10", "Grace, faith, and good works", "Salvation is God's gift; good works follow as part of the new life."],
            ["Titus 2:11-14", "Grace that teaches", "Grace brings salvation and trains believers toward godly living."],
            ["Romans 10:9-13", "Calling on the Lord", "Paul describes confession, belief, and calling on the Lord."]
        ]},
        { topic: "The state of the dead and resurrection", tags: ["state of the dead", "death", "dead", "sleep", "soul", "resurrection", "hell"], passages: [
            ["Ecclesiastes 9:5-6, 10", "The dead and earthly activity", "Read the statements in the context of Ecclesiastes' discussion of life under the sun."],
            ["Psalm 146:3-4", "Human plans end at death", "The psalm contrasts mortal rulers with trust in God."],
            ["John 11:11-14, 21-27", "Jesus and Lazarus", "Jesus uses sleep language for Lazarus' death, then speaks of resurrection."],
            ["1 Thessalonians 4:13-18", "Hope for the dead in Christ", "Paul comforts grieving believers with Christ's return and the resurrection."],
            ["1 Corinthians 15:12-26, 51-55", "The resurrection hope", "Paul connects Christian hope to Christ's resurrection and the defeat of death."],
            ["Genesis 3:19", "Mortality", "The verse describes humanity's return to the dust."]
        ]},
        { topic: "The Second Coming of Christ", tags: ["second coming", "return of jesus", "jesus returns", "advent", "coming of christ", "rapture", "prophecy"], passages: [
            ["John 14:1-3", "Jesus promises to return", "Jesus tells His disciples He will come again and receive them."],
            ["Matthew 24:3-44", "Signs and watchfulness", "Read Matthew 24 in full for Jesus' teaching about watchfulness and His coming."],
            ["Acts 1:9-11", "The ascension and return", "The messengers tell the disciples Jesus will return."],
            ["1 Thessalonians 4:13-18", "Resurrection at Christ's coming", "Paul describes the Lord's descent and the gathering of believers."],
            ["Revelation 1:7", "Every eye will see Him", "The verse emphasizes the public, visible character of Christ's appearing."],
            ["Matthew 24:36-44", "Be ready", "Jesus warns against setting dates and calls for readiness."]
        ]},
        { topic: "God's law, love, and obedience", tags: ["god's law", "law", "ten commandments", "commandments", "obedience", "love", "sin"], passages: [
            ["Exodus 20:1-17", "The Ten Commandments", "The commandments begin with God's deliverance of Israel."],
            ["Matthew 22:34-40", "Love God and neighbor", "Jesus identifies the two great commandments as summaries of the law and prophets."],
            ["John 14:15", "Love and keeping commandments", "Jesus connects love for Him with keeping His commandments."],
            ["Romans 3:31", "Faith and the law", "Paul asks whether faith nullifies the law and answers his own question."],
            ["Romans 6:14-18", "Grace and service", "Read the whole section to follow Paul's argument about sin, grace, and obedience."],
            ["1 John 5:2-3", "Love and God's commandments", "John connects love for God with keeping His commandments."],
            ["James 2:8-12", "The royal law", "James discusses love of neighbor and accountability in relation to the law."]
        ]},
        { topic: "Who is Jesus Christ?", tags: ["jesus", "christ", "son of god", "messiah", "divinity", "word", "john 1"], passages: [
            ["John 1:1-18", "The Word made flesh", "The prologue describes the Word and His coming into the world."],
            ["Matthew 16:13-17", "Peter's confession", "Peter identifies Jesus as the Christ, the Son of the living God."],
            ["Colossians 1:15-20", "Christ's supremacy", "Paul describes Christ's role in creation and reconciliation."],
            ["Hebrews 1:1-4", "God speaks through the Son", "The opening of Hebrews describes the Son's status and work."],
            ["John 20:26-31", "Thomas' confession and John's purpose", "The account concludes with a confession about Jesus and the purpose of the Gospel."]
        ]},
        { topic: "Baptism and new life", tags: ["baptism", "repentance", "new life", "born again", "conversion"], passages: [
            ["Matthew 28:18-20", "The great commission", "Jesus commands His disciples to make disciples and baptize."],
            ["Acts 2:37-41", "Repent and be baptized", "Peter calls his hearers to respond to the message."],
            ["Romans 6:1-4", "Buried and raised with Christ", "Paul uses baptism to describe union with Christ's death and new life."],
            ["Colossians 2:12-13", "Raised through faith", "Paul connects baptism imagery with faith and God's action."],
            ["John 3:3-8", "Born of the Spirit", "Jesus speaks with Nicodemus about new birth."]
        ]},
        { topic: "Prayer and trust in God", tags: ["prayer", "trust", "anxiety", "worry", "faith", "petition"], passages: [
            ["Matthew 6:5-13", "Jesus teaches prayer", "Jesus warns against performative prayer and gives a model prayer."],
            ["Philippians 4:6-7", "Prayer instead of anxiety", "Paul encourages prayer and describes God's peace."],
            ["Psalm 23", "The Lord as shepherd", "The psalm expresses trust in God's care through danger and uncertainty."],
            ["1 John 5:14-15", "Confidence in prayer", "John describes confidence in asking according to God's will."],
            ["James 5:13-18", "Prayer in community", "James discusses prayer in suffering, joy, and sickness."]
        ]},
        { topic: "The sanctuary and Christ's priestly ministry", tags: ["sanctuary", "heavenly sanctuary", "atonement", "priest", "high priest", "cleansing"], passages: [
            ["Exodus 25:1-9", "The earthly sanctuary", "God instructs Israel to make a sanctuary."],
            ["Leviticus 16:15-22", "Day of Atonement", "The chapter describes key rituals of Israel's annual cleansing service."],
            ["Hebrews 8:1-6", "A minister in heaven", "Hebrews presents Christ as high priest and compares the earthly and heavenly."],
            ["Hebrews 9:11-14", "Christ's greater ministry", "The passage contrasts Christ's work with the earlier sanctuary rituals."],
            ["Hebrews 9:23-28", "Christ's sacrifice", "The writer emphasizes Christ's offering and future appearing."]
        ]},
        { topic: "The new covenant", tags: ["new covenant", "covenant", "heart", "forgiveness", "jeremiah 31"], passages: [
            ["Jeremiah 31:31-34", "Promise of a new covenant", "God promises a covenant marked by His law written on hearts and forgiveness."],
            ["Ezekiel 36:25-27", "A new heart and spirit", "The prophet describes cleansing and inner renewal."],
            ["Luke 22:19-20", "The covenant in Jesus' words", "Jesus connects the cup with the new covenant in His blood."],
            ["Hebrews 8:6-13", "The promise quoted", "Hebrews quotes Jeremiah and applies the promise to Christ's ministry."],
            ["Hebrews 10:15-18", "Law in the heart and forgiveness", "The passage returns to the new-covenant promise."]
        ]},
        { topic: "Love and Christian character", tags: ["love", "charity", "forgiveness", "fruit of the spirit", "character"], passages: [
            ["1 Corinthians 13:1-13", "The way of love", "Paul describes love's qualities and lasting importance."],
            ["Matthew 5:43-48", "Love your enemies", "Jesus calls His hearers to love beyond ordinary reciprocity."],
            ["Galatians 5:22-23", "Fruit of the Spirit", "Paul lists qualities produced by the Spirit."],
            ["Colossians 3:12-14", "Put on love", "Paul connects compassion, forgiveness, and love in community."],
            ["1 John 4:7-12", "God is love", "John grounds Christian love in God's prior love."]
        ]},
        { topic: "Creation and the Creator", tags: ["creation", "creator", "beginning", "genesis", "origin of life"], passages: [
            ["Genesis 1:1-31", "The creation account", "The opening chapter presents God as Creator and describes the ordered creation of the world."],
            ["Psalm 19:1-6", "Creation declares God's glory", "The psalm uses the heavens as a witness to God's glory."],
            ["Psalm 33:6-9", "Created by God's word", "The psalm celebrates God's command and the coming-to-be of creation."],
            ["Isaiah 40:25-28", "The everlasting Creator", "Isaiah contrasts the Creator's strength with human weakness."],
            ["Romans 1:19-20", "Creation and knowledge of God", "Paul discusses what creation reveals about God's power."]
        ]},
        { topic: "Forgiveness and repentance", tags: ["forgiveness", "repentance", "confession", "mercy", "pardon"], passages: [
            ["Psalm 32:1-5", "Confession and forgiveness", "The psalm describes the relief of acknowledging sin before God."],
            ["Psalm 51:1-12", "A prayer for cleansing", "David appeals to God's mercy and asks for a clean heart."],
            ["Proverbs 28:13", "Confess and forsake", "The proverb contrasts hiding wrongdoing with confessing and turning from it."],
            ["Acts 3:19-21", "Repent and turn to God", "Peter calls his hearers to repentance and speaks of restoration."],
            ["1 John 1:7-9", "Confession and cleansing", "John connects walking in the light, confession, forgiveness, and cleansing."]
        ]},
        { topic: "The Holy Spirit", tags: ["holy spirit", "spirit of god", "comforter", "helper", "spiritual gifts"], passages: [
            ["John 14:16-17, 26", "The promised Helper", "Jesus promises the Helper who will teach and remind His disciples."],
            ["John 16:7-13", "The Spirit guides", "Jesus describes the Spirit's work in relation to truth and the world."],
            ["Acts 1:8", "Power to witness", "Jesus connects the Spirit's power with being His witnesses."],
            ["Romans 8:9-16", "Life in the Spirit", "Paul describes the Spirit's role in belonging to Christ and living as God's children."],
            ["1 Corinthians 12:4-11", "Gifts for the common good", "Paul describes diverse gifts given by the same Spirit."]
        ]},
        { topic: "The kingdom of God", tags: ["kingdom of god", "kingdom of heaven", "kingdom", "gospel", "parable"], passages: [
            ["Daniel 2:44-45", "An everlasting kingdom", "Daniel interprets the image as a sequence of kingdoms and God's enduring kingdom."],
            ["Matthew 4:17", "Jesus announces the kingdom", "Jesus begins preaching that the kingdom of heaven is at hand."],
            ["Matthew 13:31-33", "Mustard seed and leaven", "Jesus uses short parables to illustrate the kingdom."],
            ["Luke 17:20-21", "The kingdom among you", "Jesus answers a question about the coming of God's kingdom."],
            ["Revelation 11:15", "The kingdom belongs to God", "The heavenly proclamation announces the reign of God and His Christ."]
        ]},
        { topic: "Sin, temptation, and victory", tags: ["sin", "temptation", "overcome", "devil", "satan", "victory"], passages: [
            ["Genesis 3:1-15", "The first temptation", "The account describes deception, disobedience, and God's response."],
            ["Matthew 4:1-11", "Jesus is tempted", "Jesus answers the tempter by appealing to Scripture."],
            ["1 Corinthians 10:12-13", "A way to endure temptation", "Paul warns against overconfidence and speaks of God's faithfulness in temptation."],
            ["James 1:12-15", "How temptation develops", "James distinguishes temptation from God's character and describes how desire can lead to sin."],
            ["1 John 2:1-2", "Christ our advocate", "John encourages believers not to sin and points to Jesus Christ as advocate."]
        ]},
        { topic: "Judgment and the end of evil", tags: ["judgment", "final judgment", "hell", "lake of fire", "wicked", "punishment", "end of evil"], passages: [
            ["Ecclesiastes 12:13-14", "God brings deeds into judgment", "The closing lines connect reverence for God with accountability."],
            ["Matthew 10:28", "God's authority over life", "Jesus tells His followers whom they should ultimately fear; read alongside the surrounding teaching."],
            ["Malachi 4:1-3", "The day that burns", "Malachi portrays the fate of evil and the vindication of the righteous using vivid imagery."],
            ["John 5:28-29", "Resurrection to life or judgment", "Jesus speaks of a coming resurrection and its outcomes."],
            ["Revelation 20:11-15", "The great white throne", "John describes the final judgment in apocalyptic imagery."],
            ["Revelation 21:1-5", "All things made new", "The vision moves from judgment to the removal of death, sorrow, and pain."]
        ]},
        { topic: "Bible inspiration and Scripture", tags: ["bible", "scripture", "inspiration", "word of god", "prophecy", "study"], passages: [
            ["2 Timothy 3:14-17", "Scripture equips the believer", "Paul describes Scripture's value for teaching and training in righteousness."],
            ["2 Peter 1:19-21", "Prophecy and the Spirit", "Peter discusses prophecy and its origin in the work of the Holy Spirit."],
            ["Psalm 119:9-16", "Treasuring God's word", "The psalmist describes keeping and meditating on God's word."],
            ["Isaiah 8:20", "Test teaching by God's instruction", "Isaiah points readers back to God's testimony and instruction."],
            ["Acts 17:10-12", "Examining the Scriptures", "The Bereans are commended for examining the Scriptures to test what they heard."]
        ]},
        { topic: "Christian unity and the church", tags: ["unity", "church", "body of christ", "division", "fellowship", "brothers"], passages: [
            ["John 17:20-23", "Jesus prays for unity", "Jesus prays for those who will believe through the disciples' message."],
            ["1 Corinthians 1:10-13", "Avoiding divisions", "Paul challenges factions and asks whether Christ is divided."],
            ["1 Corinthians 12:12-27", "One body, many members", "Paul uses the body to explain the interdependence of believers."],
            ["Ephesians 4:1-6", "Keeping the unity of the Spirit", "Paul urges humility, patience, and unity around one Lord, faith, and baptism."],
            ["Colossians 3:12-15", "Love and peace in community", "Paul connects compassion, forgiveness, love, and peace."]
        ]},
        { topic: "Humility and serving others", tags: ["humility", "service", "servant", "pride", "greatness"], passages: [
            ["Micah 6:6-8", "What God requires", "The prophet summarizes justice, mercy, and humble walking with God."],
            ["Matthew 20:25-28", "Greatness through service", "Jesus contrasts worldly rule with serving others and gives Himself as an example."],
            ["John 13:3-17", "Jesus washes feet", "Jesus models humble service and tells His disciples to follow His example."],
            ["Philippians 2:1-11", "Christ's humility", "Paul calls believers to humility and points to Christ's self-giving."],
            ["1 Peter 5:5-7", "Clothe yourselves with humility", "Peter urges humility toward one another and trust in God's care."]
        ]},
        { topic: "Marriage, family, and relationships", tags: ["marriage", "family", "husband", "wife", "parents", "children", "relationships"], passages: [
            ["Genesis 2:18-24", "Companionship and marriage", "The creation narrative describes human companionship and the joining of husband and wife."],
            ["Matthew 19:3-9", "Jesus on marriage", "Jesus responds to a question about divorce by referring to the creation account."],
            ["Ephesians 5:21-33", "Mutual duties in marriage", "Paul's instructions should be read as a whole, including the call to mutual submission."],
            ["Ephesians 6:1-4", "Parents and children", "Paul addresses children and parents, including a warning not to provoke children."],
            ["1 Corinthians 13:4-7", "Love's conduct", "Paul describes the patience, kindness, and endurance that should shape relationships."]
        ]},
        { topic: "Hope, comfort, and suffering", tags: ["hope", "comfort", "suffering", "grief", "trials", "encouragement"], passages: [
            ["Psalm 34:17-19", "God hears the afflicted", "The psalm acknowledges real trouble and speaks of God's nearness to the brokenhearted."],
            ["Isaiah 41:10", "Do not fear", "God reassures His people of His presence and help."],
            ["Matthew 11:28-30", "Rest for the weary", "Jesus invites the burdened to come to Him."],
            ["Romans 8:18-28", "Hope amid suffering", "Paul sets present suffering beside future glory and speaks of God's work for good."],
            ["2 Corinthians 1:3-7", "Comfort that can be shared", "Paul describes God as the source of comfort in affliction."],
            ["Revelation 21:1-4", "Death and sorrow removed", "The vision promises a future without death, mourning, crying, or pain."]
        ]},
        { topic: "Faith and works", tags: ["faith and works", "works", "faith", "obedience", "fruit", "deeds"], passages: [
            ["Genesis 15:1-6", "Abraham believes God", "Abraham's faith is counted to him as righteousness."],
            ["Matthew 7:16-23", "Known by their fruits", "Jesus teaches that a person's fruit matters and warns against mere profession."],
            ["Romans 4:1-5", "Righteousness and faith", "Paul uses Abraham to discuss faith and receiving righteousness."],
            ["Ephesians 2:8-10", "Saved for good works", "The passage holds together salvation as a gift and a life shaped for good works."],
            ["James 2:14-26", "Faith demonstrated by action", "James argues that living faith is shown in action; read alongside Paul's discussion of grace and faith."]
        ]}
    ];

    const form = document.getElementById("crossrefForm");
    const input = document.getElementById("crossrefQuery");
    const results = document.getElementById("crossrefResults");
    const status = document.getElementById("crossrefStatus");
    const summary = document.getElementById("crossrefResultSummary");

    function normalize(value) {
        return value.toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9:\s-]/g, " ").replace(/\s+/g, " ").trim();
    }

    function passageUrl(reference) {
        return "https://www.biblegateway.com/passage/?search=" + encodeURIComponent(reference) + "&version=KJV";
    }

    function addText(parent, tag, className, value) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        element.textContent = value;
        parent.appendChild(element);
        return element;
    }

    function renderTopic(topic, query) {
        const card = document.createElement("article");
        card.className = "crossref-topic-card";
        addText(card, "h4", "", topic.topic);
        const list = document.createElement("div");
        list.className = "crossref-passage-list";
        topic.passages.forEach(([reference, label, note]) => {
            const item = document.createElement("div");
            item.className = "crossref-passage";
            const heading = document.createElement("div");
            heading.className = "crossref-passage-heading";
            const link = document.createElement("a");
            link.href = passageUrl(reference);
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = reference;
            heading.appendChild(link);
            addText(heading, "span", "crossref-passage-label", label);
            item.appendChild(heading);
            addText(item, "p", "", note);
            list.appendChild(item);
        });
        card.appendChild(list);
        const matchingRefs = topic.passages.filter(([reference]) => normalize(reference).includes(query));
        if (matchingRefs.length) {
            const note = document.createElement("p");
            note.className = "crossref-match-note";
            note.textContent = "Your reference appears in this topic's index.";
            card.insertBefore(note, list);
        }
        return card;
    }

    const specificReferences = [
        { source: "John 3:16", related: [
            ["Romans 5:6-8", "God's love demonstrated", "Paul describes God's love shown while humanity was still sinful."],
            ["Ephesians 2:4-10", "Saved by grace", "This passage explains God's mercy, grace, faith, and the good works that follow."],
            ["1 John 4:9-10", "Love made visible", "John describes God's love revealed by sending His Son."],
            ["Romans 10:9-13", "Calling on the Lord", "Paul discusses faith, confession, and the promise of salvation."]
        ]},
        { source: "Genesis 2:2-3", related: [
            ["Exodus 20:8-11", "The Sabbath commandment", "The commandment points back to God's creation and rest on the seventh day."],
            ["Mark 2:27-28", "The Sabbath's purpose", "Jesus speaks about the Sabbath being made for humanity."],
            ["Hebrews 4:1-11", "Entering God's rest", "Read this larger section to consider the writer's use of rest imagery."]
        ]},
        { source: "Exodus 20:8-11", related: [
            ["Genesis 2:1-3", "Creation and the seventh day", "The creation account provides the foundation recalled in the commandment."],
            ["Deuteronomy 5:12-15", "A second telling of the commandment", "Compare this version, which also recalls deliverance from slavery."],
            ["Mark 2:27-28", "Jesus and the Sabbath", "Jesus discusses the Sabbath's purpose and His authority."]
        ]},
        { source: "Deuteronomy 6:4-5", related: [
            ["Matthew 22:34-40", "Love God and neighbor", "Jesus identifies love for God and neighbor as the great commandments."],
            ["Mark 12:28-34", "The greatest commandment", "Mark records a parallel conversation about wholehearted love for God."],
            ["Luke 10:25-28", "Love and eternal life", "Luke records the commandments in a discussion about inheriting eternal life."]
        ]},
        { source: "Matthew 22:37-40", related: [
            ["Deuteronomy 6:4-5", "Love God wholeheartedly", "Jesus draws on Israel's confession and command to love God."],
            ["Leviticus 19:18", "Love your neighbor", "This is the command Jesus pairs with loving God."],
            ["Romans 13:8-10", "Love fulfills the law", "Paul explains how love of neighbor relates to the commandments."]
        ]},
        { source: "John 1:1-3", related: [
            ["Genesis 1:1-3", "In the beginning", "Compare the opening language and creation themes in Genesis and John."],
            ["Colossians 1:15-17", "Christ and creation", "Paul describes Christ's role in relation to all created things."],
            ["Hebrews 1:1-3", "God speaks through the Son", "Hebrews describes the Son and His relation to creation."]
        ]},
        { source: "John 1:14", related: [
            ["Matthew 1:18-23", "Jesus' birth and Immanuel", "Matthew recounts Jesus' birth and the name Immanuel."],
            ["Philippians 2:5-11", "Christ's humility", "Paul describes Christ's self-humbling and exaltation."],
            ["Hebrews 2:14-18", "Sharing in humanity", "The passage explains why the Son shared in flesh and blood."]
        ]},
        { source: "John 14:15", related: [
            ["1 John 5:2-3", "Love and God's commandments", "John connects love for God with keeping His commandments."],
            ["1 John 2:3-6", "Knowing God", "The passage discusses knowing God and walking as Jesus walked."],
            ["Matthew 22:34-40", "Love as the great commandment", "Jesus summarizes the law and prophets through love for God and neighbor."]
        ]},
        { source: "Ecclesiastes 9:5-6", related: [
            ["Psalm 146:3-4", "Human mortality", "The psalm contrasts mortal human plans with trust in God."],
            ["John 11:11-14", "Jesus and Lazarus", "Jesus uses sleep as a figure for Lazarus' death and then speaks plainly."],
            ["1 Thessalonians 4:13-18", "Hope in the resurrection", "Paul comforts grieving believers with the resurrection at Christ's coming."]
        ]},
        { source: "1 Thessalonians 4:13-18", related: [
            ["John 11:11-27", "Lazarus and resurrection", "Jesus speaks of resurrection while comforting Martha."],
            ["1 Corinthians 15:51-55", "Death defeated", "Paul describes transformation and the defeat of death."],
            ["John 14:1-3", "Jesus promises to return", "Jesus promises to come again and receive His followers."]
        ]},
        { source: "1 Corinthians 15:51-55", related: [
            ["1 Thessalonians 4:13-18", "The Lord's coming and resurrection", "Both passages describe Christian hope connected with Christ's return."],
            ["Isaiah 25:8", "Death swallowed up", "Paul's language echoes the prophetic promise that death will be swallowed up."],
            ["Revelation 21:1-4", "Death and sorrow removed", "Revelation describes the future removal of death and pain."]
        ]},
        { source: "Ephesians 2:8-10", related: [
            ["Romans 3:21-24", "Justified by grace", "Paul describes righteousness and justification as gifts of grace."],
            ["Titus 2:11-14", "Grace trains us", "Grace not only saves but teaches believers to live godly lives."],
            ["James 2:14-26", "Faith shown in action", "Compare how James describes living faith demonstrated by works."]
        ]},
        { source: "Romans 3:23-24", related: [
            ["Romans 6:23", "Sin and God's gift", "Paul contrasts sin's wages with God's gift of eternal life."],
            ["Ephesians 2:1-10", "Made alive by grace", "The passage explains humanity's need and God's gracious response."],
            ["Titus 3:4-7", "Saved by mercy", "Paul emphasizes God's mercy rather than human righteous deeds as the source of salvation."]
        ]},
        { source: "James 2:14-26", related: [
            ["Ephesians 2:8-10", "Grace and good works", "Read the whole passage to see both salvation as a gift and the resulting good works."],
            ["Romans 4:1-5", "Abraham and faith", "Paul discusses Abraham's faith and righteousness apart from boasting in works."],
            ["Galatians 5:6", "Faith working through love", "Paul describes faith expressing itself through love."]
        ]},
        { source: "Daniel 7:9-14", related: [
            ["Matthew 24:30-31", "The Son of Man comes", "Jesus uses Son of Man and coming imagery in His teaching."],
            ["Revelation 1:7", "Every eye will see Him", "Revelation describes the appearing of Christ in public, prophetic language."],
            ["Mark 14:61-62", "Jesus' answer before the council", "Jesus applies Son of Man imagery in His response."]
        ]},
        { source: "Matthew 24:30-31", related: [
            ["Daniel 7:13-14", "The Son of Man", "Jesus' imagery draws on Daniel's vision of the Son of Man."],
            ["1 Thessalonians 4:13-18", "Gathering at Christ's coming", "Paul describes the Lord's descent and the gathering of believers."],
            ["Revelation 1:7", "The appearing of Christ", "The verse emphasizes that every eye will see Him."]
        ]},
        { source: "Revelation 20:11-15", related: [
            ["Daniel 7:9-10", "The heavenly court", "Daniel's vision also portrays a court and books opened for judgment."],
            ["John 5:28-29", "Resurrection and judgment", "Jesus speaks of a coming resurrection with different outcomes."],
            ["Revelation 21:1-4", "After judgment: all things new", "The next vision describes the end of death, mourning, and pain."]
        ]},
        { source: "Jeremiah 31:31-34", related: [
            ["Hebrews 8:6-13", "The new covenant quoted", "Hebrews quotes Jeremiah's new-covenant promise."],
            ["Ezekiel 36:25-27", "A new heart and spirit", "Ezekiel describes cleansing and inward renewal."],
            ["Hebrews 10:15-18", "Forgiveness and the law in the heart", "Hebrews returns to the promise of the Spirit, the law in hearts, and forgiveness."]
        ]},
        { source: "Micah 6:8", related: [
            ["Matthew 23:23", "Justice, mercy, and faith", "Jesus criticizes neglecting weightier matters while focusing on lesser details."],
            ["Zechariah 7:8-10", "Practice justice and mercy", "The prophet calls for justice, compassion, and care for the vulnerable."],
            ["James 1:27", "Practical religion", "James describes care for vulnerable people and keeping oneself unstained by the world."]
        ]},
        { source: "Genesis 3:19", related: [
            ["Ecclesiastes 3:19-20", "Human mortality", "Ecclesiastes reflects on the mortality shared by humans and animals."],
            ["Psalm 104:29-30", "Life and breath", "The psalm describes creatures depending on God's breath for life."],
            ["1 Corinthians 15:42-49", "The resurrection body", "Paul contrasts the mortal body with the body raised in incorruption."]
        ]}
    ];

    // Additional verse-level cross-reference sets.
    specificReferences.push([{"source":"Psalm 22:1","related":[["Matthew 27:45-46","Jesus quotes the psalm","Matthew records Jesus' cry from the cross, echoing Psalm 22."],["Mark 15:33-34","The cry from the cross","Mark also records Jesus quoting the psalm's opening words."],["Psalm 22:16-18","Suffering imagery","Later lines describe suffering and the dividing of garments."]]},{"source":"Psalm 110:1","related":[["Matthew 22:41-46","Jesus asks about David's Lord","Jesus uses this psalm to pose a question about the Messiah."],["Acts 2:32-36","Peter cites the psalm","Peter uses this verse when explaining Jesus' resurrection and exaltation."],["Hebrews 1:13","The Son at God's right hand","Hebrews cites the verse in its presentation of the Son."]]},{"source":"Isaiah 7:14","related":[["Matthew 1:18-23","Matthew's use of the prophecy","Matthew connects Jesus' birth with Isaiah's Immanuel passage."],["Isaiah 8:1-10","Historical context","Read nearby chapters to consider the historical setting and Immanuel theme."]]},{"source":"Isaiah 53:4-6","related":[["Matthew 8:14-17","Matthew cites Isaiah","Matthew quotes Isaiah in connection with Jesus' healing ministry."],["1 Peter 2:21-25","Bearing sins","Peter applies the servant's suffering imagery to Christ."],["Romans 4:24-25","Delivered for our trespasses","Paul connects Jesus' death and resurrection with justification."]]},{"source":"Joel 2:28-32","related":[["Acts 2:14-21","Peter quotes Joel","Peter cites this prophecy while explaining events at Pentecost."],["Romans 10:12-13","Calling on the Lord","Paul quotes the promise that everyone who calls on the Lord will be saved."],["Acts 10:44-48","The Spirit poured out","The account describes the Spirit coming upon Gentile hearers."]]},{"source":"Matthew 5:17-20","related":[["Romans 3:31","Faith and the law","Paul says faith does not nullify the law."],["Romans 7:7-12","The law and sin","Paul discusses the law's role in identifying sin."],["Luke 16:16-17","The law and the prophets","Jesus speaks about the law and the kingdom."]]},{"source":"John 5:28-29","related":[["Daniel 12:1-2","Awakening from the dust","Daniel describes a future awakening with different outcomes."],["Acts 24:14-15","Resurrection of the just and unjust","Paul affirms a resurrection of both righteous and unrighteous."],["Revelation 20:11-15","The final judgment","Revelation portrays the dead standing before God's throne."]]},{"source":"Acts 17:11","related":[["Isaiah 8:20","Test by God's instruction","Isaiah directs attention to God's testimony and instruction."],["1 Thessalonians 5:19-22","Test everything","Paul says to test all things and hold fast to what is good."],["1 John 4:1","Test the spirits","John warns believers not to accept every spiritual claim without testing it."]]},{"source":"Romans 6:23","related":[["Genesis 2:16-17","The warning about death","God's command to Adam introduces the biblical theme of sin and death."],["Ephesians 2:1-10","Made alive by grace","Paul describes being made alive with Christ by God's grace."],["John 3:16","The gift of eternal life","Jesus contrasts perishing with receiving eternal life through belief in the Son."]]},{"source":"Galatians 3:26-29","related":[["Romans 10:12-13","The same Lord for all","Paul emphasizes the same Lord and promise for all who call on Him."],["Colossians 3:9-11","A renewed community","Paul says old social divisions do not define identity in Christ."],["Acts 10:34-35","God shows no partiality","Peter recognizes that God does not show favoritism."]]},{"source":"Philippians 2:9-11","related":[["Isaiah 45:22-23","Every knee bows","Isaiah describes every knee bowing to the Lord; Paul echoes this language about Jesus."],["Romans 14:10-12","Account before God","Paul speaks of every person giving account to God."],["Revelation 5:11-14","Worship of the Lamb","Revelation portrays praise directed to the One on the throne and the Lamb."]]},{"source":"Revelation 14:6-12","related":[["Exodus 20:8-11","Worship the Creator","The first angel's message calls people to worship the One who made heaven, earth, and sea."],["Ecclesiastes 12:13-14","Fear God and keep His commandments","Ecclesiastes links reverence for God and obedience with judgment."],["Revelation 12:17","The testimony of Jesus","The surrounding visions describe conflict involving God's commandments and Jesus' testimony."]]}]);

    const connectionTypes = {"deuteronomy 6:4-5|matthew 22:34-40":"Quotation or allusion","deuteronomy 6:4-5|mark 12:28-34":"Parallel account","matthew 22:37-40|deuteronomy 6:4-5":"Quotation or allusion","matthew 22:37-40|leviticus 19:18":"Quotation or allusion","1 corinthians 15:51-55|isaiah 25:8":"Quotation or allusion","psalm 22:1|matthew 27:45-46":"Quotation or allusion","psalm 22:1|mark 15:33-34":"Quotation or allusion","psalm 110:1|matthew 22:41-46":"Quotation or allusion","psalm 110:1|acts 2:32-36":"Quotation or allusion","psalm 110:1|hebrews 1:13":"Quotation or allusion","isaiah 7:14|matthew 1:18-23":"Quotation or allusion","isaiah 53:4-6|matthew 8:14-17":"Quotation or allusion","joel 2:28-32|acts 2:14-21":"Quotation or allusion","daniel 7:9-14|matthew 24:30-31":"Prophetic imagery","matthew 24:30-31|daniel 7:13-14":"Prophetic imagery","philippians 2:9-11|isaiah 45:22-23":"Quotation or allusion","hebrews 4:9-11|genesis 2:2-3":"Quotation or allusion"};
    function connectionType(source, reference) { return connectionTypes[normalize(source)+"|"+normalize(reference)] || "Thematic connection"; }

    function canonicalBook(book) {
        const key = normalize(book).replace(/\bfirst\b/g, "1").replace(/\bsecond\b/g, "2").replace(/\bthird\b/g, "3").replace(/\s+/g, " ");
        const aliases = {
            "psalm": "psalms", "ps": "psalms", "jn": "john", "jhn": "john", "mt": "matthew", "matt": "matthew", "mk": "mark", "mrk": "mark", "lk": "luke", "lu": "luke", "rom": "romans", "ro": "romans", "1 cor": "1 corinthians", "2 cor": "2 corinthians", "1 thess": "1 thessalonians", "2 thess": "2 thessalonians", "song of solomon": "song of songs", "canticles": "song of songs", "revelations": "revelation", "apocalypse": "revelation"
        };
        return aliases[key] || key;
    }

    function parseReference(reference) {
        const match = reference.trim().match(/^(.+?)\s+(\d+)(?::(\d+)(?:\s*[-–]\s*(\d+))?)?$/i);
        if (!match) return null;
        const book = canonicalBook(match[1]);
        const chapter = Number(match[2]);
        const verseStart = match[3] ? Number(match[3]) : null;
        const verseEnd = match[4] ? Number(match[4]) : verseStart;
        if (!book || !chapter || (verseStart !== null && !verseStart)) return null;
        return { book, chapter, verseStart, verseEnd };
    }

    function referenceOverlaps(queryReference, indexedReference) {
        const query = parseReference(queryReference);
        const indexed = parseReference(indexedReference);
        if (!query || !indexed || query.book !== indexed.book || query.chapter !== indexed.chapter) return false;
        if (query.verseStart === null || indexed.verseStart === null) return true;
        return query.verseStart <= indexed.verseEnd && indexed.verseStart <= query.verseEnd;
    }

    function renderReferenceResults(rawQuery, related, matchedTopics) {
        results.replaceChildren();
        const card = document.createElement("article");
        card.className = "crossref-topic-card";
        addText(card, "h4", "", "Cross-references for " + rawQuery.trim());
        addText(card, "p", "crossref-reference-intro", "These are curated study connections, not a claim that the passages are identical in meaning. Read each passage in its surrounding context.");
        const list = document.createElement("div");
        list.className = "crossref-passage-list";
        related.forEach(([reference, label, note]) => {
            const item = document.createElement("div");
            item.className = "crossref-passage";
            const heading = document.createElement("div");
            heading.className = "crossref-passage-heading";
            const link = document.createElement("a");
            link.href = passageUrl(reference);
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = reference;
            heading.appendChild(link);
            addText(heading, "span", "crossref-passage-label", label);
            const type = document.createElement("span");
            type.className = "crossref-connection-type";
            type.textContent = connectionType(rawQuery, reference);
            heading.appendChild(type);
            item.appendChild(heading);
            addText(item, "p", "", note);
            list.appendChild(item);
        });
        card.appendChild(list);
        results.appendChild(card);

        if (matchedTopics.length) {
            const topicCard = document.createElement("article");
            topicCard.className = "crossref-topic-card";
            addText(topicCard, "h4", "", "Topics containing this reference");
            const topicList = document.createElement("ul");
            matchedTopics.forEach(topic => addText(topicList, "li", "", topic.topic));
            topicCard.appendChild(topicList);
            results.appendChild(topicCard);
        }
        summary.textContent = related.length + " curated cross-reference" + (related.length === 1 ? "" : "s") + " found" +
            (matchedTopics.length ? "; also found in " + matchedTopics.length + " topic group" + (matchedTopics.length === 1 ? "" : "s") : "") + ".";
        status.textContent = "Showing cross-references for “" + rawQuery.trim() + "”.";
    }

    function search(rawQuery) {
        const query = normalize(rawQuery);
        if (!query) {
            status.textContent = "Enter a Bible reference or topic to search.";
            return;
        }

        const parsed = parseReference(rawQuery);
        if (parsed) {
            const exact = specificReferences.find(item => normalize(item.source) === query);
            const related = exact ? exact.related : [];
            const matchedTopics = crossReferences.filter(topic =>
                topic.passages.some(([reference]) => referenceOverlaps(rawQuery, reference))
            );
            if (related.length || matchedTopics.length) {
                renderReferenceResults(rawQuery, related, matchedTopics);
                if (!related.length) {
                    const note = document.createElement("p");
                    note.className = "crossref-match-note";
                    note.textContent = "This reference overlaps an indexed passage, but no dedicated verse-to-verse cross-reference set is available yet.";
                    results.prepend(note);
                    summary.textContent = "Found indexed passage matches; no dedicated cross-reference set yet.";
                }
                return;
            }
            results.replaceChildren();
            const empty = document.createElement("div");
            empty.className = "crossref-empty";
            addText(empty, "h4", "", "No indexed cross-references for this reference yet");
            addText(empty, "p", "", "The reference is valid search text, but it is not yet connected to a specific cross-reference set in this library. You can open it directly or search a related topic.");
            const link = document.createElement("a");
            link.href = passageUrl(rawQuery.trim());
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.className = "submit-btn crossref-direct-link";
            link.textContent = "Read " + rawQuery.trim() + " on BibleGateway";
            empty.appendChild(link);
            results.appendChild(empty);
            summary.textContent = "No dedicated cross-reference set found.";
            status.textContent = "No indexed connections yet; direct reading link provided.";
            return;
        }

        const matches = crossReferences.map(topic => {
            const topicName = normalize(topic.topic);
            const tags = topic.tags.map(normalize);
            const passageText = topic.passages.map(([reference, label, note]) => normalize(reference + " " + label + " " + note)).join(" ");
            let score = 0;
            if (topicName === query) score += 12;
            if (topicName.includes(query)) score += 8;
            if (tags.some(tag => tag === query)) score += 10;
            if (tags.some(tag => tag.includes(query) || query.includes(tag))) score += 5;
            if (passageText.includes(query)) score += 7;
            const queryTerms = query.split(" ").filter(term => term.length > 2);
            const combined = topicName + " " + tags.join(" ") + " " + passageText;
            queryTerms.forEach(term => { if (combined.includes(term)) score += 2; });
            return { topic, score };
        }).filter(item => item.score > 0).sort((a, b) => b.score - a.score);

        results.replaceChildren();
        summary.textContent = "";
        if (matches.length) {
            const shown = matches.slice(0, 6);
            shown.forEach(item => results.appendChild(renderTopic(item.topic, query)));
            summary.textContent = "Showing " + shown.length + " topic" + (shown.length === 1 ? "" : "s") + " from the study index.";
            status.textContent = "Found related passages for “" + rawQuery.trim() + "”.";
            return;
        }

        const empty = document.createElement("div");
        empty.className = "crossref-empty";
        addText(empty, "h4", "", "No exact match in the study index");
        addText(empty, "p", "", "You can still look up this reference directly, or try a broader topic such as grace, Sabbath, prayer, resurrection, or God's law.");
        const link = document.createElement("a");
        link.href = passageUrl(rawQuery.trim());
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.className = "submit-btn crossref-direct-link";
        link.textContent = "Open this reference on BibleGateway";
        empty.appendChild(link);
        results.appendChild(empty);
        summary.textContent = "No indexed topic matched this search.";
        status.textContent = "No exact match found. A direct reading link is available below.";
    }

    form.addEventListener("submit", event => {
        event.preventDefault();
        search(input.value);
    });

    document.querySelectorAll(".crossref-chip").forEach(button => {
        button.addEventListener("click", () => {
            input.value = button.dataset.query;
            search(input.value);
            input.focus();
        });
    });
})();