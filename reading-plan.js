(() => {
    "use strict";

    const plans = {
        jesus: {
            title: "30 Days: Start with Jesus",
            readings: [
                ["Jesus and the beginning", "John 1:1-18", "How does John introduce Jesus, and what images does he use?"],
                ["A new beginning", "Mark 1:1-15", "What does Jesus announce, and how do people respond?"],
                ["The first disciples", "John 1:19-51", "What draws people toward Jesus in this passage?"],
                ["Jesus teaches about life", "Matthew 5:1-16", "What kind of people does Jesus call blessed?"],
                ["Love your enemies", "Matthew 5:38-48", "How does Jesus challenge ordinary ideas about fairness and retaliation?"],
                ["Prayer and trust", "Matthew 6:5-15, 25-34", "What does Jesus teach about prayer, worry, and priorities?"],
                ["A wise foundation", "Matthew 7:13-29", "What is the difference between hearing Jesus and putting his words into practice?"],
                ["Jesus welcomes the weary", "Matthew 11:25-30", "What kind of rest does Jesus offer?"],
                ["Mercy over appearances", "Mark 2:13-17, 23-28", "What do these stories reveal about mercy and the Sabbath?"],
                ["Who is my neighbor?", "Luke 10:25-37", "Who acts as a neighbor, and what does love require?"],
                ["Learning to pray", "Luke 11:1-13", "What does Jesus say about persistence and God's generosity?"],
                ["The lost are sought", "Luke 15:1-10", "Why do the shepherd and the woman rejoice?"],
                ["A story of two sons", "Luke 15:11-32", "How do the father and the two sons each respond?"],
                ["Jesus and Nicodemus", "John 3:1-21", "What does Jesus say about new birth and God's love?"],
                ["Living water", "John 4:4-26", "How does Jesus move the conversation beyond outward differences?"],
                ["The good shepherd", "John 10:1-18", "What does Jesus say distinguishes the good shepherd?"],
                ["Jesus weeps", "John 11:1-44", "What do Jesus' grief and actions reveal about him?"],
                ["Serving others", "John 13:1-17, 34-35", "How does Jesus connect leadership with humble service?"],
                ["The way, truth, and life", "John 14:1-14", "What comfort and promises does Jesus give his disciples?"],
                ["Abiding in the vine", "John 15:1-17", "What does it mean to remain in Christ and bear fruit?"],
                ["Jesus prays for his followers", "John 17:1-23", "What does Jesus ask for his followers?"],
                ["The crucifixion", "Mark 15:16-39", "What details does Mark emphasize about Jesus' death?"],
                ["The resurrection", "John 20:1-18", "How does Mary move from grief to recognition and witness?"],
                ["The road to Emmaus", "Luke 24:13-35", "How do the travelers' understanding and feelings change?"],
                ["The risen Jesus sends disciples", "Matthew 28:16-20", "What does Jesus command and promise?"],
                ["The Spirit empowers witness", "Acts 1:1-11", "What mission and hope does Jesus give his followers?"],
                ["The first Christian community", "Acts 2:1-21, 37-47", "What changes when the Spirit comes?"],
                ["Grace and new life", "Ephesians 2:1-10", "What is God's role in salvation, and where do good works fit?"],
                ["Love in action", "1 Corinthians 13:1-13", "How does this chapter describe love?"],
                ["A life shaped by Jesus", "Philippians 2:1-16", "What attitudes and actions reflect the example of Christ?"]
            ]
        },
        overview: {
            title: "60 Days: A Bible Overview",
            readings: [
                ["Creation and God's purpose", "Genesis 1:1-2:3", "What does the creation account emphasize about God and the world?"],
                ["Humanity and the garden", "Genesis 2:4-25", "What do you learn about human dignity, work, and relationship?"],
                ["The fall and its consequences", "Genesis 3", "How do trust, choices, and blame shape this story?"],
                ["Cain and Abel", "Genesis 4:1-16", "What warnings about anger and responsibility appear here?"],
                ["Noah and the flood", "Genesis 6:9-9:17", "What do judgment and covenant mean in this account?"],
                ["The call of Abram", "Genesis 12:1-9; 15:1-6", "What does Abram trust, and what is promised?"],
                ["God provides for Abraham", "Genesis 22:1-19", "What does this difficult story say about testing and provision?"],
                ["Jacob becomes Israel", "Genesis 32:22-32", "How does this encounter mark a turning point for Jacob?"],
                ["Joseph's journey", "Genesis 37:1-11; 50:15-21", "How does Joseph look back on suffering and providence?"],
                ["God calls Moses", "Exodus 3:1-15", "What does God reveal about himself and his concern for Israel?"],
                ["Passover and deliverance", "Exodus 12:1-14, 29-42", "How does this event become a lasting remembrance?"],
                ["The sea crossing", "Exodus 14:10-31", "How do fear, trust, and deliverance appear in the story?"],
                ["The Ten Commandments", "Exodus 20:1-17", "What does the opening reminder say about God's relationship with Israel?"],
                ["Justice and mercy", "Leviticus 19:1-18", "How are holiness and practical love connected?"],
                ["A wilderness lesson", "Numbers 13:25-14:9", "How do fear and faith shape the people's response?"],
                ["Choose life", "Deuteronomy 6:4-9; 30:11-20", "What does wholehearted love for God involve?"],
                ["Joshua's charge", "Joshua 1:1-9; 24:14-24", "What choices and responsibilities are placed before the people?"],
                ["Ruth's loyalty", "Ruth 1:1-18; 4:13-17", "How do loyalty and ordinary faithfulness shape this story?"],
                ["Samuel listens", "1 Samuel 3:1-21", "What helps Samuel recognize and answer God's call?"],
                ["David and Goliath", "1 Samuel 17:32-50", "What reason does David give for his confidence?"],
                ["David's repentance", "Psalm 51", "What does honest confession ask of God?"],
                ["A prayer for guidance", "Psalm 23; Psalm 121", "Which images express God's care and protection?"],
                ["Wisdom begins with reverence", "Proverbs 1:1-7; 3:1-12", "How does Proverbs define the beginning of wisdom?"],
                ["Life's seasons", "Ecclesiastes 3:1-15; 12:9-14", "What limits and responsibilities does the writer emphasize?"],
                ["Justice and true worship", "Isaiah 1:10-20; 58:1-12", "What does God say is missing from empty religious practice?"],
                ["Hope in the promised servant", "Isaiah 52:13-53:12", "What suffering and purpose are described in this poem?"],
                ["A new covenant", "Jeremiah 31:31-34", "What is promised about God's law and forgiveness?"],
                ["Faithfulness in exile", "Daniel 1:1-21", "How do the young exiles balance conviction and respectful conduct?"],
                ["A vision of God's kingdom", "Daniel 7:9-14, 21-27", "What contrast is made between earthly powers and God's kingdom?"],
                ["Micah's summary", "Micah 6:6-8", "What does the passage say God requires?"],
                ["The birth of Jesus foretold", "Isaiah 9:1-7", "What hope is expressed through the promised child?"],
                ["Jesus' birth", "Luke 1:26-38; 2:1-20", "How do Mary and the shepherds respond to the news?"],
                ["Jesus is baptized", "Matthew 3:13-17", "What do you notice about the Father, Son, and Spirit in this scene?"],
                ["Jesus resists temptation", "Matthew 4:1-11", "How does Jesus answer each temptation?"],
                ["The kingdom announced", "Luke 4:14-30", "How does Jesus describe his mission, and how is he received?"],
                ["The good news in parables", "Mark 4:1-20, 30-32", "What do the soils and the mustard seed teach?"],
                ["Jesus calms the storm", "Mark 4:35-41", "How do the disciples respond to Jesus' authority?"],
                ["Peter's confession", "Mark 8:27-38", "What does following Jesus involve beyond recognizing who he is?"],
                ["The transfiguration", "Luke 9:28-36", "What is revealed about Jesus, and what are the disciples told?"],
                ["The greatest commandments", "Matthew 22:34-40", "How does Jesus summarize the law and the prophets?"],
                ["The last supper", "Luke 22:7-23", "What meaning does Jesus give the meal?"],
                ["Jesus before Pilate", "John 18:28-40; 19:1-16", "What do the different ideas of kingship reveal?"],
                ["The death of Jesus", "Luke 23:32-49", "What responses to Jesus appear at the cross?"],
                ["The resurrection", "Luke 24:1-12, 36-49", "What evidence and mission are connected to the resurrection?"],
                ["The Spirit and the church", "Acts 2:1-21, 37-47", "What marks the community formed after Pentecost?"],
                ["The gospel crosses boundaries", "Acts 10:1-48", "What does Peter learn about God's welcome?"],
                ["Salvation by grace", "Romans 3:21-31; 5:1-11", "How are grace, faith, peace, and reconciliation connected?"],
                ["Life in the Spirit", "Romans 8:1-17, 31-39", "What assurance does Paul offer, and what does life in the Spirit mean?"],
                ["Love and spiritual gifts", "1 Corinthians 12:12-27; 13:1-13", "Why do both gifts and love matter to the church?"],
                ["Freedom and the Spirit", "Galatians 5:13-26", "How does freedom relate to serving others and the fruit of the Spirit?"],
                ["Unity in Christ", "Ephesians 2:11-22; 4:1-16", "What creates unity among people who were once divided?"],
                ["The mind of Christ", "Philippians 2:1-16", "How does Jesus' example shape humility?"],
                ["Christ's supremacy", "Colossians 1:15-23", "What claims are made about Christ and creation?"],
                ["Hope in Christ's return", "1 Thessalonians 4:13-18; 5:1-11", "How does future hope shape grief and daily life?"],
                ["Faith that acts", "James 1:19-27; 2:14-18", "How does James connect hearing, doing, and faith?"],
                ["Living hope", "1 Peter 1:3-9, 13-25", "How does hope shape life amid difficulty?"],
                ["Love and truth", "1 John 4:7-21", "How does God's love become visible in the way believers treat others?"],
                ["A vision of God's throne", "Revelation 4-5", "How do worship and the Lamb's worthiness shape this vision?"],
                ["The Lamb's victory", "Revelation 12:7-12; 14:6-12", "What themes of endurance, witness, and worship stand out?"],
                ["A new heaven and earth", "Revelation 21:1-7; 22:1-5", "What is removed, and what is restored in God's final vision?"]
            ]
        }
    };

    const storagePrefix = "myBibleBeltReadingPlan:";
    const planSelect = document.getElementById("readingPlanSelect");
    const readingList = document.getElementById("readingList");
    const readingFilter = document.getElementById("readingFilter");
    const toggleReadingCheckboxes = document.getElementById("toggleReadingCheckboxes");
    let readingCheckboxesVisible = true;
    const progressText = document.getElementById("progressText");
    const progressBar = document.getElementById("progressBar");
    const progressFill = document.getElementById("progressFill");
    const progressMessage = document.getElementById("progressMessage");
    const detailDay = document.getElementById("detailDay");
    const detailTitle = document.getElementById("detailTitle");
    const detailReference = document.getElementById("detailReference");
    const detailSummary = document.getElementById("detailSummary");
    const openPassage = document.getElementById("openPassage");
    const detailComplete = document.getElementById("detailComplete");
    const reflectionNotes = document.getElementById("reflectionNotes");
    const notesStatus = document.getElementById("notesStatus");
    let activeDay = 0;

    function getState(planId) {
        try {
            return JSON.parse(localStorage.getItem(storagePrefix + planId)) || { completed: [], notes: {} };
        } catch (error) {
            return { completed: [], notes: {} };
        }
    }

    function saveState(planId, state) {
        try {
            localStorage.setItem(storagePrefix + planId, JSON.stringify(state));
            return true;
        } catch (error) {
            return false;
        }
    }

    function passageUrl(reference) {
        return "https://www.biblegateway.com/passage/?search=" + encodeURIComponent(reference) + "&version=KJV";
    }

    function renderList() {
        const planId = planSelect.value;
        const plan = plans[planId];
        const state = getState(planId);
        const filter = readingFilter.value;
        readingList.classList.toggle("hide-reading-checkboxes", !readingCheckboxesVisible);
        readingList.replaceChildren();

        plan.readings.forEach((reading, index) => {
            const isComplete = state.completed.includes(index);
            if (filter === "complete" && !isComplete) return;
            if (filter === "incomplete" && isComplete) return;

            const item = document.createElement("article");
            item.className = "reading-list-item" + (index === activeDay ? " selected" : "") + (isComplete ? " completed" : "");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = isComplete;
            checkbox.id = "reading-check-" + planId + "-" + index;
            checkbox.setAttribute("aria-label", "Mark day " + (index + 1) + " complete");
            checkbox.addEventListener("change", () => {
                const current = getState(planId);
                current.completed = current.completed.filter(day => day !== index);
                if (checkbox.checked) current.completed.push(index);
                saveState(planId, current);
                renderList();
                renderProgress();
                if (index === activeDay) renderDetail();
            });

            const choose = document.createElement("button");
            choose.type = "button";
            choose.className = "reading-item-open";
            choose.setAttribute("aria-label", "Open day " + (index + 1) + ": " + reading[0]);
            choose.innerHTML = '<span class="reading-item-day">Day ' + (index + 1) + '</span><strong></strong><span class="reading-item-reference"></span>';
            choose.querySelector("strong").textContent = reading[0];
            choose.querySelector(".reading-item-reference").textContent = reading[1];
            choose.addEventListener("click", () => {
                activeDay = index;
                renderList();
                renderDetail();
            });

            item.append(checkbox, choose);
            readingList.appendChild(item);
        });
    }

    function renderProgress() {
        const plan = plans[planSelect.value];
        const completed = getState(planSelect.value).completed.length;
        const total = plan.readings.length;
        const percent = Math.round((completed / total) * 100);
        progressText.textContent = completed + " of " + total + " completed (" + percent + "%)";
        progressFill.style.width = percent + "%";
        progressBar.setAttribute("aria-valuemax", String(total));
        progressBar.setAttribute("aria-valuenow", String(completed));
        progressMessage.textContent = percent === 100
            ? "Plan complete—well done! Consider revisiting a passage that meant something to you."
            : completed === 0
                ? "Every reading is a step forward. Begin wherever you are."
                : "Keep going at a pace that works for you. There is no need to rush.";
    }

    function renderDetail() {
        const planId = planSelect.value;
        const reading = plans[planId].readings[activeDay];
        const state = getState(planId);
        detailDay.textContent = "DAY " + (activeDay + 1);
        detailTitle.textContent = reading[0];
        detailReference.textContent = reading[1];
        detailSummary.textContent = reading[2];
        openPassage.href = passageUrl(reading[1]);
        detailComplete.checked = state.completed.includes(activeDay);
        reflectionNotes.value = state.notes[activeDay] || "";
        notesStatus.textContent = "";
    }

    planSelect.addEventListener("change", () => {
        activeDay = 0;
        readingFilter.value = "all";
        renderList();
        renderDetail();
        renderProgress();
    });

    readingFilter.addEventListener("change", renderList);
    toggleReadingCheckboxes.addEventListener("click", () => {
        readingCheckboxesVisible = !readingCheckboxesVisible;
        toggleReadingCheckboxes.textContent = readingCheckboxesVisible ? "Hide" : "Show";
        toggleReadingCheckboxes.setAttribute("aria-pressed", String(readingCheckboxesVisible));
        renderList();
    });

    detailComplete.addEventListener("change", () => {
        const planId = planSelect.value;
        const state = getState(planId);
        state.completed = state.completed.filter(day => day !== activeDay);
        if (detailComplete.checked) state.completed.push(activeDay);
        saveState(planId, state);
        renderList();
        renderProgress();
    });

    document.getElementById("saveNotes").addEventListener("click", () => {
        const planId = planSelect.value;
        const state = getState(planId);
        state.notes[activeDay] = reflectionNotes.value;
        const saved = saveState(planId, state);
        notesStatus.textContent = saved ? "Notes saved on this device." : "Could not save notes. Your browser storage may be unavailable.";
    });

    document.getElementById("showNextReading").addEventListener("click", () => {
        const plan = plans[planSelect.value];
        const state = getState(planSelect.value);
        const next = plan.readings.findIndex((reading, index) => !state.completed.includes(index));
        activeDay = next === -1 ? plan.readings.length - 1 : next;
        readingFilter.value = "all";
        renderList();
        renderDetail();
        document.getElementById("readingDetail").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    document.getElementById("resetPlan").addEventListener("click", () => {
        const planId = planSelect.value;
        if (!window.confirm("Reset all completed readings and saved notes for this plan on this device? This cannot be undone.")) return;
        saveState(planId, { completed: [], notes: {} });
        activeDay = 0;
        readingFilter.value = "all";
        renderList();
        renderDetail();
        renderProgress();
    });

    renderList();
    renderDetail();
    renderProgress();
})();