import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {
  fallbackMoviePoster,
  fetchCreditsDetails,
  fetchMovieDetails,
  fetchSimilarDetails,
  image500,
} from "../api/moviedb";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";
let movieName = "After: What Happens when people die";

export default function MovieScreen() {
  const { params: item } = useRoute();
  const [isFavorite, toggleFavorite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimularMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    // console.log("itemid: ", item.id);
    setLoading(true);
    getMoviesDetails(item.id);
    getMoviesCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMoviesDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    // console.log("got movie details: ", data);
    if (data) setMovie(data);
    setLoading(false);
  };

  const getMoviesCredits = async (id) => {
    const data = await fetchCreditsDetails(id);
    // console.log('movie credits', data);
    if (data && data.cast) setCast(data.cast);
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarDetails(id);
    // console.log('Similar movies: ', data);
    if (data && data.results) setSimularMovies(data.results);
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4 " +
            topMargin
          }
        >
          <TouchableOpacity
            style={styles.background}
            className="rounded-xl p-1"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
            <HeartIcon
              size={35}
              color={isFavorite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              // source={require("../assets/images/aloneposter.jpg")}
              source={{
                uri: image500(movie?.poster_path) || fallbackMoviePoster,
              }}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text className="text-purple-400 text-center text-3xl font-bold tracking-wider ">
          {movie.title}
        </Text>

        {movie?.id ? (
          <Text className="text-violet-300 font-semibold text-base text-center">
            {movie?.status === "Released" ? "Lançado" : movie?.status} •{" "}
            {movie?.release_date?.split("-")[0]} • {movie?.runtime} min
          </Text>
        ) : null}

        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 != movie.genres.length;
            return (
              <Text
                key={index}
                className="text-violet-300 font-semibold text-base text-center"
              >
                {genre?.name} {showDot ? "•" : null}
              </Text>
            );
          })}
        </View>

        <Text className="text-violet-300 mx-4 tracking-wide">
          {movie.overview}
        </Text>
      </View>
      {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}

      {similarMovies.length > 0 && (
        <MovieList
          title="Recomendações"
          hideSeeAll={true}
          data={similarMovies}
        />
      )}
    </ScrollView>
  );
}
