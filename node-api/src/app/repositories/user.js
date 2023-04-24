export class UserRepository {
    constructor() {
        this.db = database;
    }

    async getUserById(id) {
        return this.db.query('SELECT * FROM users WHERE id = ?', [id]);
    }

    async getUserByEmail(email) {
        return this.db.query('SELECT * FROM users WHERE email = ?', [email]);
    }

    async createUser(user) {
        return this.db.query('INSERT INTO users SET ?', [user]);
    }

    async updateUser(id, user) {
        return this.db.query('UPDATE users SET ? WHERE id = ?', [user, id]);
    }

    async deleteUser(id) {
        return this.db.query('DELETE FROM users WHERE id = ?', [id]);
    }
}