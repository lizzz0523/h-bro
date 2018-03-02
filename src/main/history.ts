import { Database } from 'sqlite3'
import * as rpc from 'pauls-electron-rpc'
import { historyManifest } from '../manifest'

export class HistoryManager {
    static database = new Database(':memory:')

    static destroy() {
        HistoryManager.database.close()
    }

    static setup() {
        HistoryManager.create()

        rpc.exportAPI('history-api', historyManifest, {
            insert: HistoryManager.insert,
            remove: HistoryManager.remove,
            removeAll: HistoryManager.removeAll,
            search: HistoryManager.search
        })
    }

    static create() {
        const { database: db } = HistoryManager
        const sql = `
            CREATE TABLE IF NOT EXISTS visit (
                url         CHAR(200) NOT NULL PRIMARY KEY,
                title       CHAR(200) NOT NULL,
                num_visited INT       NOT NULL
            );
        `

        db.run(sql);
    }

    static insert(url: string, title: string): Promise<void> {
        const { database: db } = HistoryManager

        return new Promise((resolve, reject) => {
            db.get('SELECT num_visited FORM visit WHERE url=?;', [url], (err, row) => {
                if (!row) {
                    const numVisited = 1
                    
                    db.run('INSERT INTO visit (url, title, num_visited) VALUES (?, ?);', [url, title, numVisited], () => {
                        resolve()
                    })
                } else {
                    const numVisited = row.num_visited + 1

                    db.run('UPDATE visit SET title=?, num_visited=? WHERE url=?;', [title, numVisited, url], () => {
                        resolve()
                    })
                }
            })
        })
    }

    static remove(url: string): Promise<void> {
        return new Promise((resolve, reject) => {
            resolve()
        })
    }

    static removeAll(): Promise<void> {
        return new Promise((resolve, reject) => {
            resolve()
        })
    }

    static search(query?: string): Promise<any[]> {
        const { database: db } = HistoryManager

        return new Promise((resolve, reject) => {
            const sql = `
                SELECT url, title, num_visited FORM visit
                WHERE visit MATCH ?
                ORDER BY visit.num_visited DESC
                LIMIT 10;
            `

            db.all(sql, [query], (err, rows) => {
                return rows.map(({ url, title }) => {
                    return { url, title }
                })
            })
        })
    }
}