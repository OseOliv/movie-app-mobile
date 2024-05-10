import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles, theme } from "../theme";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {
  fallbackPersonPoster,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../api/moviedb";

var { width, height } = Dimensions.get("window");
const ios = Platform == "ios";
const verticalMargin = ios ? "" : "my-3";

export default function PersonScreen() {
  const { params: item } = useRoute();

  const [isFavorite, toggleFavorite] = useState(false);
  const navigation = useNavigation();
  const [personMovies, setPersonMovies] = useState([]);
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item && item.id) {
      setLoading(true);
      getPersonDetails(item.id);
      getPersonMovies(item.id);
    }
  }, [item]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    if (data) setPerson(data);
    setLoading(false);
  };

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    if (data && data.cast) setPersonMovies(data.cast);
  };

  return (
    <ScrollView
      className="flex-1 bg-neutral-950"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <SafeAreaView
        className={
          "z-20 w-full flex-row justify-between items-center px-4" +
          verticalMargin
        }
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.background}
          className="rounded-xl p-1 ml-4 mt-2"
        >
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          className="mr-4 mt-2"
          onPress={() => toggleFavorite(!isFavorite)}
        >
          <HeartIcon size={35} color={isFavorite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowColor: "gray",
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}
          >
            <View className="item-center rounded-full overflow-hidden h-72 w-72 border-2 border-purple-600">
              <Image
                // source={require("../assets/images/kvprofile.jpeg")}
                source={{
                  uri: image342(person?.profile_path) || fallbackPersonPoster,
                }}
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-3xl text-violet-300 font-bold text-center">
              {person?.name}
            </Text>
            <Text className="text-base text-violet-300 text-center">
              {person?.place_of_birth}
            </Text>
          </View>
          <View className="mx-3 p-4 mt-6 px-4 flex-row justify-center items-center bg-neutral-700 rounded-full">
            {/* <View className="border-r-2 border-r-neutral-300 px-2 items-center -1 ">
              <Text className="text-white font-semibold">Gênero</Text>
              <Text className="text-neutral-300 font-sm">
                {person?.gender === 0
                  ? "Não definido"
                  : person?.gender === 1
                  ? "Feminino"
                  : person?.gender === 2
                  ? "Masculino"
                  : "Não-Binário"}
              </Text>
            </View> */}
            <View className="border-r-2 border-r-neutral-300 px-2 items-center -1 ">
              <Text className="text-white font-semibold">Nascimento</Text>
              <Text className="text-neutral-300 font-sm">
                {person?.birthday}
              </Text>
            </View>
            {/* <View className="border-r-2 border-r-neutral-300 px-2 items-center -1 ">
              <Text className="text-white font-semibold">Conhecido(a) por</Text>
              <Text className="text-neutral-300 font-sm">
                {person?.known_for_department === "Acting"
                  ? "Atuação"
                  : person?.known_for_department}
              </Text>
            </View> */}
            <View className="px-2 items-center mx--1">
              <Text className="text-white font-semibold">Popularidade</Text>
              <Text className="text-neutral-300 font-sm">
                {person?.popularity?.toFixed(2)} %
              </Text>
            </View>
          </View>
          <View className="my-6 mx-4 space-x-2">
            <Text className="text-purple-400 text-lg">Biografia</Text>
            <Text className="text-violet-300 tracking-wide">
              {person?.biography || "N/A"}
            </Text>
          </View>

          {personMovies.length > 0 && (
            (<MovieList title={"Filmes"} hideSeeAll={true} data={personMovies} />)
          )}
        </View>
      )}
    </ScrollView>
  );
}
