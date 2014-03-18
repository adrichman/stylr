/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Photo Schema
 */
var PhotoSchema = new Schema({
  principal: Number,
  payback_amount: Number,
  match_deadline: String, //last day for loan to be matched
  payback_days: Number, //# of days to payback loan after it's accepted
  category: String,
  purpose: String,
  status: { type: String,
            default: "pending" },
  borrower_id: {type: Schema.Types.ObjectId, ref: 'User'},
  lender_id: {type: Schema.Types.ObjectId, ref: 'User'}
});

"Style Name",
   "Image URL",
   "Alt Image URL",
   "name",
   "name",
   "classic_score",
   "romantic_score",
   "edgy_score",
   "boho_score",
   "glam_score",
    "casual_score",
    "cute_top_score",
    "preppy_score",
    "fit_top",
    "fit_bottom",
    "good_for_top_body_type",
    "good_for_bottom_body_type",
    "fit_petite"


mongoose.model('Photo', PhotoSchema);