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
  match_deadline: String, //last day for loan to be matched
  payback_days: Number, //# of days to payback loan after it's accepted
  category: String,
  purpose: String,
  status: { type: String,
            default: "pending" },
  borrower_id: {type: Schema.Types.ObjectId, ref: 'User'},
  lender_id: {type: Schema.Types.ObjectId, ref: 'User'}
});


mongoose.model('User', UserSchema);