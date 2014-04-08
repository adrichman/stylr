/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */
var UserSchema = new Schema({
  name: String,
  stitchfix: {
    account: String
  },
  style_preferences: {
    classic_score: Number,
    romantic_score: Number,
    edgy_score: Number,
    boho_score: Number,
    glam_score: Number,
    casual_score: Number,
    cute_top_score: Number,
    preppy_score: Number
  }
});


mongoose.model('User', UserSchema);