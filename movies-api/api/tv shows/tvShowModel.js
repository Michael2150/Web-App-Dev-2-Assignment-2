import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TVShowSchema = new mongoose.Schema({
  adult: Boolean,
  backdrop_path: String,
  created_by: [
    {
      id: Number,
      credit_id: String,
      name: String,
      gender: Number,
      profile_path: String
    },
  ],
  episode_run_time: [ Number ],
  first_air_date: Date,
  genres: [
    {
      id: Number,
      name: String,
    },
  ],
  homepage: String,
  id: Number,
  in_production: Boolean,
  languages: [ String ],
  last_air_date: Date,
  last_episode_to_air: {
    air_date: Date,
    episode_number: Number,
    id: Number,
    name: String,
    overview: String,
    production_code: String,
    runtime: Number,
    season_number: Number,
    show_id: Number,
    still_path: String,
    vote_average: Number,
    vote_count: Number,
  },
  name: String,
  next_episode_to_air: {
    air_date: Date,
    episode_number: Number,
    id: Number,
    name: String,
    overview: String,
    production_code: String,
    runtime: Number,
    season_number: Number,
    show_id: Number,
    still_path: String,
    vote_average: Number,
    vote_count: Number,
  },
  networks: [
    {
      id: Number,
      name: String,
      logo_path: String,
      origin_country: String,
    },
  ],
  number_of_episodes: Number,
  number_of_seasons: Number,
  origin_country: [ String ],
  original_language: String,
  original_name: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  production_companies: [
    {
      id: Number,
      logo_path: String,
      name: String,
      origin_country: String,
    },
  ],
  seasons: [
    {
      air_date: Date,
      episode_count: Number,
      id: Number,
      name: String,
      overview: String,
      poster_path: String,
      season_number: Number,
    },
  ],
  spoken_languages: [
    {
      iso_639_1:  String,
      name: String,
    },
  ],
  status: String,
  type: String,
  vote_average: Number,
  vote_count: Number,
  isUpcoming: Boolean,
});

const compactTVShowFields = {
  backdrop_path: 1,
  first_air_date: {
    $dateToString: {
      format: "%Y-%m-%d",
      date: "$first_air_date",
    },
  },
  genre_ids: "$genres.id",
  id: 1,
  name: 1,
  origin_country: 1,
  original_language: 1,
  original_name: 1,
  overview: 1,
  popularity: 1,
  poster_path: 1,
  vote_average: 1,
  vote_count: 1,
};

TVShowSchema.statics.findByTVShowDBId = function (id) {
  return this.findOne({ id: id });
};

TVShowSchema.statics.getPageTVShows = function (page, perPage, genre, sortingCode) {
  // Split the sorting code into the field and direction
  const [sortField, sortDirection] = sortingCode.split(".");

  //Return all TV shows
  return this.aggregate([
    {
        $match: genre == -1 || genre == undefined
          ? {}
          : {
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
      $project: compactTVShowFields
    },
    {
      $skip: (page - 1) * perPage
    },
    {
      $limit: perPage
    },
  ])
}

TVShowSchema.statics.getTVShowCount = function () {
  return this.countDocuments();
}

TVShowSchema.statics.getGenres = function () {
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
  ]);
}
  
export default mongoose.model('TvShow', TVShowSchema);