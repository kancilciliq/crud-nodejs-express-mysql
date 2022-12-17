const Validator = require('fastest-validator')
const v = new Validator()

const validation = data=> {
    const schema = {
        username:{type:'string', min: 3,empty:false},
        email: 'email',
        password: {type: 'string',min: 3},
    }
    return v.validate(data, schema)
}

module.exports.validation = validation