import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const movieReviewSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
      unique: true
    },
    movie_id: {
      type: Number,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    url: String
});
  
export default mongoose.model('MovieReview', movieReviewSchema);