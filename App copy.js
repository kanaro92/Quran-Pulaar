import React from 'react';
import { 
  Image, Animated, Text, View, Dimensions, I18nManager,
  StyleSheet, ImageBackground, ScrollView, SafeAreaView
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook , faBookmark, faTools, faInfoCircle, faPlay, faPauseCircle} from '@fortawesome/free-solid-svg-icons';
import RNRestart from 'react-native-restart';
import custoMStyle from "./customStyle.scss";

const { width, height } = Dimensions.get('screen');
const imageW = width * 1;
const imageH = imageW * 1.56;

const data = [
  {
    "surat_number": 1,
    "lang": "ar",
    "juzz": "سورة 30",
    "surat": "سورة الفاتحة",
    "juzz_number": 30,
    "surat_title": "الفاتحة",
    "ayat_number": 7,
    "ayat_img": require("./images/ayat/7.png"),
    "fatih_tilte": "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
    "page_number": 1,
    "ayat": [
      {
        "number": 1,
        "text": "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
        "img": require("./images/ayat/1.png")
      },
      {
        "number": 2,
        "text": "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        "img": require("./images/ayat/2.png")
      },
      {
        "number": 3,
        "text": "الرَّحْمَنِ الرَّحِيمِ",
        "img": require("./images/ayat/3.png")
      },
      {
        "number": 4,
        "text": "مَالِكِ يَوْمِ الدِّينِ",
        "img": require("./images/ayat/4.png")
      },
      {
        "number": 5,
        "text": "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        "img": require("./images/ayat/5.png")
      },
      {
        "number": 6,
        "text": "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        "img": require("./images/ayat/6.png")
      },
      {
        "number": 7,
        "text": "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        "img": require("./images/ayat/7.png")
      },
      {
        "number": 2,
        "text": "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        "img": require("./images/ayat/2.png")
      },
      {
        "number": 3,
        "text": "الرَّحْمَنِ الرَّحِيمِ",
        "img": require("./images/ayat/3.png")
      },
      {
        "number": 4,
        "text": "مَالِكِ يَوْمِ الدِّينِ",
        "img": require("./images/ayat/4.png")
      },
      {
        "number": 5,
        "text": "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        "img": require("./images/ayat/5.png")
      },
      {
        "number": 6,
        "text": "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        "img": require("./images/ayat/6.png")
      },
      {
        "number": 7,
        "text": "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        "img": require("./images/ayat/7.png")
      },
      {
        "number": 2,
        "text": "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        "img": require("./images/ayat/2.png")
      },
      {
        "number": 3,
        "text": "الرَّحْمَنِ الرَّحِيمِ",
        "img": require("./images/ayat/3.png")
      },
      {
        "number": 4,
        "text": "مَالِكِ يَوْمِ الدِّينِ",
        "img": require("./images/ayat/4.png")
      },
      {
        "number": 5,
        "text": "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        "img": require("./images/ayat/5.png")
      },
      {
        "number": 6,
        "text": "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        "img": require("./images/ayat/6.png")
      },
      {
        "number": 7,
        "text": "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        "img": require("./images/ayat/7.png")
      },
      {
        "number": 2,
        "text": "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        "img": require("./images/ayat/2.png")
      },
      {
        "number": 3,
        "text": "الرَّحْمَنِ الرَّحِيمِ",
        "img": require("./images/ayat/3.png")
      },
      {
        "number": 4,
        "text": "مَالِكِ يَوْمِ الدِّينِ",
        "img": require("./images/ayat/4.png")
      },
      {
        "number": 5,
        "text": "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        "img": require("./images/ayat/5.png")
      },
      {
        "number": 6,
        "text": "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        "img": require("./images/ayat/6.png")
      },
      {
        "number": 7,
        "text": "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        "img": require("./images/ayat/7.png")
      }
    ]
  },
  {
    "surat_number": 1,
    "lang": "pr",
    "juzz": "Tummbutere 30",
    "surat": "Simoore Udditirde",
    "juzz_number": 30,
    "surat_title": "Udditirde",
    "ayat_number": 7,
    "ayat_img": require("./images/ayat/7.png"),
    "fatih_tilte": "Innde Alla Jurumdeero Jurmotooɗo",
    "page_number": 2,
    "ayat": [
      {
        "number": 1,
        "text": "Innde Alla Jurumdeero Jurmotooɗo",
        "img": require("./images/ayat/1.png")
      },
      {
        "number": 2,
        "text": "Jettooɗe ngoodani Alla",
        "img": require("./images/ayat/2.png")
      },
      {
        "number": 3,
        "text": "oon mo ɓe ngoni e yeddondirde e mum",
        "img": require("./images/ayat/3.png")
      }
    ]
  },
  {
    "surat_number": 2,
    "lang": "pr",
    "juzz": "Tummbutere 30",
    "surat": "Simoore An-naba'i",
    "juzz_number": 30,
    "surat_title": "Naba’I (Kumpitaali)",
    "ayat_number": 78,
    "ayat_img": require("./images/ayat/7.png"),
    "fatih_tilte": "Innde Alla Jurumdeero Jurmotooɗo",
    "page_number": 3,
    "ayat": [
      {
        "number": 1,
        "text": "ko e holi ɗuum ɓe naamnondirta",
        "img": require("./images/ayat/1.png")
      },
      {
        "number": 2,
        "text": "dow fiyaakuuji kumpa mawɗo o fiyaakuuji kumpa mawɗo o",
        "img": require("./images/ayat/2.png")
      },
      {
        "number": 3,
        "text": "oon mo ɓe ngoni e yeddondirde e mum",
        "img": require("./images/ayat/3.png")
      }
    ]
  }
];

const AppHeader = () => (
  <View style={styles.header}>
    <FontAwesomeIcon icon={faInfoCircle} size={28} color={"#24561F"} onPress={() => alert('Info')} />
    <FontAwesomeIcon icon={faPlay} size={25} color={"#24561F"} onPress={() => playSong()}/>
    <FontAwesomeIcon icon={faPauseCircle} size={28} color={"#24561F"}/>
    <FontAwesomeIcon icon={faBookmark} size={25} color={"#24561F"}/>
    <FontAwesomeIcon icon={faBook} size={25} color={"#24561F"}/>
    <FontAwesomeIcon icon={faTools} size={25} color={"#24561F"}/>
  </View>
);


const QuranApp = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
      <View style={styles.container}>
        <SafeAreaView style={styles.content}>
          <View 
            style={[
              StyleSheet.absoluteFillObject
            ]}>
              <Image 
                source={require('./images/background.png')}
                style={styles.image}
                blurRadius={50}
              />
          </View>
          <AppHeader />
          <Animated.FlatList
            data={data}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true}
            )}
            keyExtractor={(_, index) => index.toString}
            horizontal
            pagingEnabled
            renderItem={({item}) => {
              return <View style={styles.content2}>
                <View style={styles.juzz}>
              <Text>{item.juzz}</Text>
              <Text>{item.surat}</Text>
            </View>
                <View style={styles.body}>
                <ImageBackground source={require('./images/background.png')} style={styles.backGroundImage}>
                </ImageBackground>
              </View>
              </View>
            }}
    ..l      />
        </SafeAreaView>
      </View>);
}

const styles = StyleSheet.create({
  container: {
  },
  content: {
    width: '100%', 
    height: Dimensions.get('window').height,
  },
  image: {
    width: '90%',
    height: "90%",
  },
  header: {
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content2: {
    width: '85%', 
    height: '100%',
  },
  juzz: {
   paddingLeft:5,
   paddingRight:5,
   flexDirection: 'row',
   justifyContent: 'space-between',
  },
  backGroundImage: {
    width: '100%', 
    height: '100%',
    resizeMode: 'cover',
  },
  body: {
    marginLeft: 2,
    width: '99%', 
    height: '95%',
    borderWidth: 8,
    borderColor: '#4dbf81',
    borderRadius: 10
  }
});

export default QuranApp;