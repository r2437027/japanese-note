const DB_NAME = "JapaneseNoteDB";
const DB_VERSION = 1;

let db;

function initDB() {

    return new Promise((resolve, reject) => {

        const request =
            indexedDB.open(
                DB_NAME,
                DB_VERSION
            );

        request.onerror = () => {
            reject("Database Error");
        };

        request.onsuccess = () => {

            db = request.result;

            resolve(db);
        };

        request.onupgradeneeded = (event) => {

            const db = event.target.result;

            if (
                !db.objectStoreNames.contains(
                    "vocabulary"
                )
            ) {

                db.createObjectStore(
                    "vocabulary",
                    {
                        keyPath: "id",
                        autoIncrement: true
                    }
                );
            }

            if (
                !db.objectStoreNames.contains(
                    "grammar"
                )
            ) {

                db.createObjectStore(
                    "grammar",
                    {
                        keyPath: "id",
                        autoIncrement: true
                    }
                );
            }
        };
    });
}

initDB();