const mongoose = require('mongoose');


const conversationSchema = new mongoose.Schema({
  type:{
    type: String,
    enum: ['one-to-one', 'group'],
    default: 'private'
  },
  participants:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  },],
  createdby:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
    
  },name:{
    type: String,
    required: function(){
      return this.type === 'group';
    }
  }
},{timestamps: true});

module.exports = mongoose.model('Conversation', conversationSchema);