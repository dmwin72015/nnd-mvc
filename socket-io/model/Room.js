const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

/* Room model
 * name: 房间名字
 * members: 房间成员
 * create_user: 创建者_id
 * create_user_name:创建者名字
 * create_at ： 创建时间
 */

let RoomSchema = new Schema({
    name: {
        type: String
    },
    members: {
        type: [ObjectId]
    },
    create_user: {
        type: ObjectId
    },
    create_user_name: {
        type: String
    },
    create_at: {
        type: Date,
        default: Date.now
    }
});
// MessageSchema.plugin(BaseModel);
// MessageSchema.index({ master_id: 1, has_read: -1, create_at: -1 });

mongoose.model('Room', RoomSchema);