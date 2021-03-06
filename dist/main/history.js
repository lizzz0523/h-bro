"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = require("sqlite3");
const rpc = require("pauls-electron-rpc");
const manifest_1 = require("./manifest");
class HistoryManager {
    static destroy() {
        HistoryManager.database.close();
    }
    static setup() {
        HistoryManager.create();
        rpc.exportAPI('history-api', manifest_1.historyManifest, {
            insert: HistoryManager.insert,
            remove: HistoryManager.remove,
            removeAll: HistoryManager.removeAll,
            search: HistoryManager.search
        });
    }
    static create() {
        const { database: db } = HistoryManager;
        const sql = `
            CREATE TABLE IF NOT EXISTS visit (
                url         CHAR(200) NOT NULL PRIMARY KEY,
                title       CHAR(200) NOT NULL,
                num_visited INT       NOT NULL
            );
        `;
        db.run(sql);
    }
    static insert(url, title) {
        const { database: db } = HistoryManager;
        return new Promise((resolve, reject) => {
            db.get('SELECT num_visited FROM visit WHERE url=?;', [url], (err, row) => {
                if (!row) {
                    const numVisited = 1;
                    db.run('INSERT INTO visit (url, title, num_visited) VALUES (?, ?, ?);', [url, title, numVisited], () => {
                        resolve();
                    });
                }
                else {
                    const numVisited = row.num_visited + 1;
                    db.run('UPDATE visit SET title=?, num_visited=? WHERE url=?;', [title, numVisited, url], () => {
                        resolve();
                    });
                }
            });
        });
    }
    static remove(url) {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
    static removeAll() {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
    static search(query) {
        const { database: db } = HistoryManager;
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT url, title, num_visited FROM visit
                WHERE url LIKE ?
                ORDER BY num_visited DESC
                LIMIT 10;
            `;
            db.all(sql, [`%${query}%`], (err, rows = []) => {
                return rows.map(({ url, title }) => {
                    return { url, title };
                });
            });
        });
    }
}
HistoryManager.database = new sqlite3_1.Database(':memory:');
exports.HistoryManager = HistoryManager;
//# sourceMappingURL=history.js.map