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

    function search(rawQuery) {
        const query = normalize(rawQuery);
        if (!query) {
            status.textContent = "Enter a Bible reference or topic to search.";
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