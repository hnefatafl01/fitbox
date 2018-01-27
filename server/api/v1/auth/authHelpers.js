const bcrypt = require('bcryptjs');

module.exports = {
    hashPassword: function(password) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        return hash;
    },
    checkPassword: function(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
}

// let check = Auth.checkPassword(req.body.password, hashed);