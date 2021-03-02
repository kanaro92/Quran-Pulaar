import React from 'react';
import { 
  Image, Animated, Text, View, Dimensions, I18nManager,
  StyleSheet, ImageBackground, ScrollView, SafeAreaView
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook , faBookmark, faTools, faInfoCircle, faPlay, faPauseCircle} from '@fortawesome/free-solid-svg-icons';
import RNRestart from 'react-native-restart';

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


const HelloWorldApp = () => {
  I18nManager.forceRTL(true);
  //RNRestart.Restart();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return ( <SafeAreaView style={styles.container}>
    <View 
        style={[
          StyleSheet.absoluteFillObject
        ]}
    >
      {data.map((image, index) => {
        return <Image 
          key={'image-${index}'}
          source={require('./images/background.png')}
          style={styles.image}
          blurRadius={50}
        />
      })}
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
          return <View style={{ }}>    
            <View style={styles.juzz}>
              <Text>{item.juzz}</Text>
              <Text>{item.surat}</Text>
            </View>
            <ImageBackground style={styles.image} source={require('./images/background.png')}>
            <View style={styles.title_view}>
              <ImageBackground style={styles.bg_surat} source={require('./images/bg_sourate.png')}>
                <View style={styles.surat_title_view}>
                  <Text style={styles.surat_title_text}>{item.surat_title}</Text>
                  <Image source={item.ayat_img} style={styles.ayat_image}/>
                </View>
              </ImageBackground>
              </View>
              <View style={styles.content}> 
                <ScrollView>
                  <Text style={styles.fatih_title_text}>{item.fatih_tilte}</Text>
                  {item.ayat.map(ayat => {
                    return <View style={styles.ayat_content} >
                        <Text style={styles.text}>{ayat.text}</Text>
                        <Image source={ayat.img} style={styles.ayat_image}/>
                      </View>;
                  })}
                </ScrollView>
              </View>
              <View style={styles.footer}>
            <Text></Text>
              <Text style={styles.footer_text}>{item.page_number}</Text>
              <FontAwesomeIcon icon={faBookmark} size={20} color={"#24561F"}/>
            </View>
            </ImageBackground>
          </View>
        }}
      />
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: imageW,
    height: imageH,
  },
  bg_surat: {
    width: 343,
    height: 50,
    resizeMode: 'cover'
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15,
    height: imageW * 1.3
  },
  title_view: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  surat_title_view: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignContent: 'stretch',
    paddingTop: 8
 },
  surat_title_text: {
    marginTop: 5,
    paddingRight: 5,
    fontWeight: 'bold',
    fontSize: 18,
 },
 fatih_title_text: {
  marginTop: 5,
  marginBottom: 10,
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 20,
},
 ayat_count_img: {
  paddingLeft:5,
  paddingRight:5,
  flexDirection: 'row',
  justifyContent: 'space-between',
 },
 juzz: {
  paddingLeft:5,
  paddingRight:5,
  flexDirection: 'row',
  justifyContent: 'space-between',
 },
 ayat_content: {
   flexDirection: 'row',
   flexWrap: 'wrap'
 },
 text: {
  fontSize: 18,
  textAlign: 'left',
 },
 ayat_image: {
  width: 30,
  height: 30,
 },
 rightToLeft: {
  textAlign: 'right',
 },
 leftToRight: {
  textAlign: 'left',
 },
 footer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingLeft: 15,
  paddingRight: 15
 },
 footer_text: {
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 18,
 },
});
export default HelloWorldApp;