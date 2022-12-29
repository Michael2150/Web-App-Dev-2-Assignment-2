import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tvShowSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    original_name: String,
    overview: String,
    first_air_date: String,
    last_air_date: String,
    episode_run_time: [Number],
    genres: [{
      id: Number,
      name: String
    }],
    homepage: String,
    imdb_id: String,
    poster_path: String,
    backdrop_path: String,
    popularity: Number,
    vote_average: Number,
    vote_count: Number,
    networks: [{
      id: Number,
      logo_path: String,
      name: String,
      origin_country: String
    }],
    origin_country: [String],
    spoken_languages: [{
      iso_639_1: String,
      name: String
    }],
    images: {
      backdrops: [{
        file_path: String,
        width: Number,
        height: Number
      }],
      posters: [{
        file_path: String,
        width: Number,
        height: Number
      }]
    },
    reviews: [{
      id: String,
      author: String,
      content: String,
      url: String
    }]
  });
  
export default mongoose.model('TvShow', tvShowSchema);