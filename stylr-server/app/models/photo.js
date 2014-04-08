/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Photo Schema
 */
var PhotoSchema = new Schema({
  style_name: String,
  image_url: String,
  alt_image_url: String,
  name: String,
  category: String,
  classic_score: Number,
  romantic_score: Number,
  edgy_score: Number,
  boho_score: Number,
  glam_score: Number,
  casual_score: Number,
  cute_top_score: Number,
  preppy_score: Number,
  fit_top: String,
  fit_bottom: String,
  good_for_top_body_type: String,
  good_for_bottom_body_type: String,
  fit_petite: String
});



mongoose.model('Photo', PhotoSchema);