const mongodb = require('../database/mongodb'),
    apiTelegram = require("./apiTelegram")

const forwardSkype = async (_data) => {
    console.log("telegram: ", _data)
    var getDataUser = await mongodb.findOne(process.env.MONGODB_COLLECTION, { "idRoomRocket": _data.channel_id }).then(data => data).catch(data => data);
    if (getDataUser && _data.user_name.trim() != process.env.ROCKET_USERNAME) {
        console.log("telegram getDataUser: ", getDataUser)
        await apiTelegram.sendMessenger(_data.text, getDataUser.userDetail.message.chat.id);
    }
}


module.exports = { forwardSkype }