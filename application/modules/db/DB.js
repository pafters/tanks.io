const sqlite3 = require('sqlite3').verbose();
const { resolve } = require('path');
const path = require('path');

class DB {
    constructor({ NAME }) {
        this.db = new sqlite3.Database(path.join(__dirname, NAME));

        // this.db.get
        // this.db.all
        // this.db.run
    }

    destructor() {
        if (this.db) this.db.close();
    }

    getUserByLogin(login) {
        return new Promise(resolve =>
            this.db.serialize(() => {
                const query = "SELECT * FROM users WHERE login=?";
                this.db.get(query, [login], (err, row) => resolve(err ? null : row));
            })
        );
    }

    updateUserToken(id, token) {
        return new Promise(resolve => {
            const query = "UPDATE users SET token=? WHERE id=?";
            this.db.run(query, [token, id], err => resolve(!err));
        });
    }
}

module.exports = DB;