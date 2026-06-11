async function getGrammarStore(mode = "readonly") {

    await initDB();

    const transaction =
        db.transaction(
            ["grammar"],
            mode
        );

    return transaction.objectStore(
        "grammar"
    );
}

async function saveGrammar() {

    const store =
        await getGrammarStore(
            "readwrite"
        );

    const item = {

        grammar:
            document.getElementById(
                "grammar"
            ).value,

        connection:
            document.getElementById(
                "connection"
            ).value,

        meaning:
            document.getElementById(
                "meaning"
            ).value,

        example:
            document.getElementById(
                "example"
            ).value,

        memo:
            document.getElementById(
                "memo"
            ).value,

        created:
            Date.now()
    };

    store.add(item);

    alert("保存しました");

    location.href =
        "grammar.html";
}

async function loadGrammarList() {

    const list =
        document.getElementById(
            "grammarList"
        );

    if (!list) return;

    const store =
        await getGrammarStore();

    const request =
        store.getAll();

    request.onsuccess = () => {

        const data =
            request.result.reverse();

        list.innerHTML = "";

        data.forEach(item => {

            list.innerHTML += `

            <div class="word-card">

                <a href="
                grammar_detail.html?id=${item.id}
                ">

                    ${item.grammar}

                </a>

            </div>

            `;
        });
    };
}

async function loadGrammarDetail() {

    const detail =
        document.getElementById(
            "grammarDetail"
        );

    if (!detail) return;

    const params =
        new URLSearchParams(
            location.search
        );

    const id =
        Number(
            params.get("id")
        );

    const store =
        await getGrammarStore();

    const request =
        store.get(id);

    request.onsuccess = () => {

        const item =
            request.result;

        if (!item) return;

        detail.innerHTML = `

        <div class="detail-card">

            <h1>
                ${item.grammar}
            </h1>

            <p>
                <strong>接続</strong>
                <br>
                ${item.connection}
            </p>

            <p>
                <strong>意味</strong>
                <br>
                ${item.meaning}
            </p>

            <p>
                <strong>例文</strong>
                <br>
                ${item.example}
            </p>

            <p>
                <strong>メモ</strong>
                <br>
                ${item.memo}
            </p>

        </div>

        `;
    };
}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadGrammarList();

        loadGrammarDetail();

        loadGrammarEdit();
    }
);


async function loadGrammarEdit() {

    const grammar =
        document.getElementById(
            "grammar"
        );

    if (!grammar) return;

    const params =
        new URLSearchParams(
            location.search
        );

    const id =
        Number(
            params.get("id")
        );

    const store =
        await getGrammarStore();

    const request =
        store.get(id);

    request.onsuccess = () => {

        const item =
            request.result;

        if (!item) return;

        grammar.value =
            item.grammar;

        document.getElementById(
            "connection"
        ).value =
            item.connection;

        document.getElementById(
            "meaning"
        ).value =
            item.meaning;

        document.getElementById(
            "example"
        ).value =
            item.example;

        document.getElementById(
            "memo"
        ).value =
            item.memo;
    };
}


async function updateGrammar() {

    const params =
        new URLSearchParams(
            location.search
        );

    const id =
        Number(
            params.get("id")
        );

    const store =
        await getGrammarStore(
            "readwrite"
        );

    store.put({

        id: id,

        grammar:
            document.getElementById(
                "grammar"
            ).value,

        connection:
            document.getElementById(
                "connection"
            ).value,

        meaning:
            document.getElementById(
                "meaning"
            ).value,

        example:
            document.getElementById(
                "example"
            ).value,

        memo:
            document.getElementById(
                "memo"
            ).value,

        created:
            Date.now()
    });

    alert("更新しました");

    location.href =
        "grammar_detail.html?id=" + id;
}


async function deleteGrammar(id) {

    if (
        !confirm("削除しますか？")
    ) return;

    const store =
        await getGrammarStore(
            "readwrite"
        );

    store.delete(id);

    alert("削除しました");

    location.href =
        "grammar.html";
}
