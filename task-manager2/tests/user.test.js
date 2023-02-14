const User = require('../src/models/user')

const userOne = {
    name: "Mike",
    email: "mike@example.com",
    password: "Mike@123"
}
beforeEach(async () => {
    console.log('before each')
    await User.deleteMany()
    await new User(userOne).save()
})