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

    getUserByName(name) {
        return new Promise(resolve =>
            this.db.serialize(() => {
                const query = "SELECT * FROM users WHERE name=?";
                this.db.get(query, [name], (err, row) => resolve(err ? null : row));
            })
        );
    }


    createUser(name) {
        return new Promise(resolve => {
            const query = "INSERT INTO `users` (name) VALUES (?)";
            this.db.run(query, [name], err => resolve(err));
        });
    }

    removeUserByName(name) {
        return new Promise(resolve => {
            const query = "DELETE FROM `users` WHERE name = ?";
            this.db.run(query, [name], err => resolve(err));
        });
    }

    findUserByName(name) {
        return new Promise(resolve =>
            this.db.serialize(() => {
                const query = 'SELECT name FROM users WHERE name = ?';
                this.db.get(query, [name], (err, row) => resolve(err ? null : row));
            })
        );
    }

    getUserIdByName(name) {
        return new Promise(resolve =>
            this.db.serialize(() => {
                const query = 'SELECT id FROM users WHERE name = ?';
                this.db.get(query, [name], (err, row) => resolve(err ? null : row));
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