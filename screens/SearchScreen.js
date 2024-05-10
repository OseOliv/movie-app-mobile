import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { debounce } from "lodash";
import { fallbackMoviePoster, image185, searchMovies } from "../api/moviedb";

var { width, height } = Dimensions.get("window");
let movieName = "After: What Happens when people die";

export default function SearchScreen() {
  const [results, setResults] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleSearch = (value) => {
    if (value && value.length > 2) {
      setLoading(true);
      searchMovies({
        query: value,
        include_adult: true,
        language: "pt-BR",
        page: "1",
      }).then((data) => {
        setLoading(false);
        // console.log("got movies:", data);
        if (data && data.results) setResults(data.results);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView className="bg-neutral-950 flex-1">
      <View className="mx-4 mb-3 mt-8 flex-row justify-between items-center border border-purple-600 rounded-full">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Procurar filme"
          placeholderTextColor={"#c4b5fd"}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-violet-300 tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeScreen")}
          className="rounded-full p-3 m-1 bg-neutral-700"
        >
          <XMarkIcon size={25} color="#c4b5fd" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          className="space-y-3"
        >
          <Text className="text-purple-600 font-semibold ml-1">
            Results ({results.length})
          </Text>

          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View className="space-y-2 mb-4 ml-1 mr-1">
                    <Image
                      className="rounded-3xl"
                      // source={require("../assets/images/aloneposter.jpg")}
                      source={{
                        uri: image185(item.poster_path) || fallbackMoviePoster,
                      }}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className="text-violet-300 ml-1">
                      {item?.title && item.title.length > 22
                        ? item.title.slice(0, 22) + "..."
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/notfound.png")}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
