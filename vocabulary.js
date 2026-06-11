async function getVocabularyStore(mode = "readonly") {

    await initDB();

    const transaction =
        db.transaction(
            ["vocabulary"],
            mode
        );

    return transaction.objectStore(
        "vocabulary"
    );
}

async function saveVocabulary() {

    const store =
        await getVocabularyStore(
            "readwrite"
        );

    const item = {

        japanese:
            document.getElementById("japanese").value,

        reading:
            document.getElementById("reading").value,

        meaning:
            document.getElementById("meaning").value,

        example:
            document.getElementById("example").value,

        memo:
            document.getElementById("memo").value,

        created:
            Date.now()
    };

    store.add(item);

    alert("保存しました");

    location.href =
        "vocabulary.html";
}

async function loadVocabularyList() {

    const list =
        document.getElementById(
            "vocabularyList"
        );

    if (!list) return;

    const store =
        await getVocabularyStore();

    const request =
        store.getAll();

    request.onsuccess =
        () => {

            const data =
                request.result.reverse();

            list.innerHTML = "";

            data.forEach(item => {

                list.innerHTML += `

                <div class="word-card">

                    <a href="
                    vocabulary_detail.html?id=${item.id}
                    ">

                        ${item.japanese}

                    </a>

                </div>

                `;
            });
        };
}

async function loadVocabularyDetail() {

    const container =
        document.getElementById(
            "detailContainer"
        );

    if (!container) return;

    const params =
        new URLSearchParams(
            location.search
        );

    const id =
        Number(params.get("id"));

    const store =
        await getVocabularyStore();

    const request =
        store.get(id);

    request.onsuccess =
        () => {

            const item =
                request.result;

            if (!item) return;

            container.innerHTML = `

            <div class="detail-card">

                <h1>
                    ${item.japanese}
                </h1>

                <p>
                    <strong>読み方</strong><br>
                    ${item.reading}
                </p>

                <p>
                    <strong>意味</strong><br>
                    ${item.meaning}
                </p>

                <p>
                    <strong>例文</strong><br>
                    ${item.example}
                </p>

                <p>
                    <strong>メモ</strong><br>
                    ${item.memo}
                </p>

            </div>

            `;
        };
}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadVocabularyList();

        loadVocabularyDetail();
    }
);
async function loadVocabularyEdit() {

    const japanese =
        document.getElementById("japanese");

    if (!japanese) return;

    const params =
        new URLSearchParams(
            location.search
        );

    const id =
        Number(params.get("id"));

    const store =
        await getVocabularyStore();

    const request =
        store.get(id);

    request.onsuccess = () => {

        const item =
            request.result;

        if (!item) return;

        japanese.value =
            item.japanese;

        document.getElementById(
            "reading"
        ).value =
            item.reading;

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
async function updateVocabulary() {

    const params =
        new URLSearchParams(
            location.search
        );

    const id =
        Number(params.get("id"));

    const store =
        await getVocabularyStore(
            "readwrite"
        );

    store.put({

        id,

        japanese:
            document.getElementById(
                "japanese"
            ).value,

        reading:
            document.getElementById(
                "reading"
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
        "vocabulary_detail.html?id=" + id;
}

async function deleteVocabulary(id) {

    if (
        !confirm("削除しますか？")
    ) return;

    const store =
        await getVocabularyStore(
            "readwrite"
        );

    store.delete(id);

    alert("削除しました");

    location.href =
        "vocabulary.html";
}
