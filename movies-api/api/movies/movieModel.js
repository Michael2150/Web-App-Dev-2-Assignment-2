import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MovieSchema = new mongoose.Schema({
  adult: Boolean,
  backdrop_path: String,
  belongs_to_collection: {
    id: Number,
    name: String,
    poster_path: String,
    backdrop_path: String,
  },
  budget: Number,
  genres: [{
    id: Number,
    name: String,
  }],
  homepage: String,
  id: Number,
  imdb_id: String,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  production_companies: [{
    id: Number,
    logo_path: String,
    name: String,
    origin_country: String,
  }],
  production_countries: [{
    iso_3166_1: String,
    name: String,
  }],
  release_date: Date,
  revenue: Number,
  runtime: Number,
  spoken_languages: [{
    english_name: String,
    iso_639_1: String,
    name: String,
  }],
  status: { type: String },
  tagline: { type: String },
  title: { type: String },
  video: { type: Boolean },
  vote_average: { type: Number },
  vote_count: { type: Number },
  isUpcoming: { type: Boolean },
});

const compactMovieFields = { 
   _id: 0,
   adult: 1,
   backdrop_path: 1, 
   genre_ids: "$genres.id", 
   id: 1, 
   original_language: 1, 
   original_title: 1, 
   overview: 1, 
   popularity: 1, 
   poster_path: 1, 
   title: 1, 
   video: 1, 
   release_date: { $dateToString: { format: "%Y-%m-%d", date: "$release_date" } }, 
   vote_average: 1, 
   vote_count: 1 
  }

MovieSchema.statics.findByMovieDBId = function (id) {
  return this.findOne({ id: id });
};

MovieSchema.statics.getPageMovies = function (page, perPage, genre, sortingCode, isUpcoming) {
  // Split the sorting code into the field and direction
  const [sortField, sortDirection] = sortingCode.split(".");

  //Return all movies
  return this.aggregate([
    {
        $match: genre == -1 || genre == undefined
          ? {
              isUpcoming: isUpcoming
          }
          : {
              isUpcoming: isUpcoming,
              genres: {
                $elemMatch: {
                  id: genre
                }
              }
            }
    },
    {
      $sort: {
        [sortField]: sortDirection == "asc" ? 1 : -1
      }
    },
    {
      $project: compactMovieFields
    },
    {
      $skip: (page - 1) * perPage
    },
    {
      $limit: perPage
    },
  ])
}

MovieSchema.statics.getMovieCount = function () {
  return this.countDocuments();
}

MovieSchema.statics.getGenres = function () {
  return this.aggregate([
    {
      $unwind: "$genres"
    },
    {
      $group: {
        _id: "$genres.id",
        name: { $first: "$genres.name" }
      }
    },
    {
      $sort: {
        name: 1
      }
    }
  ])
}

export default mongoose.model('Movies', MovieSchema);