const register = async(req,res) => {
    res.send('reqister user')
}

const login = async (req,res) => {
    res.send('login user')
}

module.exports = {
    register,
    login,
}