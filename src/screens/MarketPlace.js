import * as React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 55
    },
    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  })

export default MarketPlace = () => {
    let SATURATIONS = [
        {id: '1', value: 'Overdrive'},
        {id: '2', value: 'Distorsion'},
        {id: '3', value: 'Fuzz'},
    ];

    let FILTRES = [
        {id: '4', value: 'équaliseur'},
        {id: '5', value: 'wah-wah'},
        {id: '6', value: 'auto-wah'},
    ];

    let TEMPORELS = [
        {id: '7', value: 'Delay'},
        {id: '8', value: 'Reverb'},
    ];

    let MODULATION = [
        {id: '9', value: 'Chorus'},
        {id: '10', value: 'Flanger'},
        {id: '11', value: 'Harmoniser'},
        {id: '12', value: 'Tremolo'},
        {id: '13', value: 'Whammy'},
    ];

    let DYNAMIQUE = [
        {id: '14', value: 'Compression'},
        {id: '15', value: 'Noise Gate'},
        {id: '16', value: 'Limiteur'},
        {id: '17', value: 'Enhancer'},
    ];

    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            {title: 'EFFETS DE SATURATIONS', data: SATURATIONS},
            {title: 'EFFETS DE FILTRES', data: FILTRES},
            {title: 'EFFETS TEMPORELS', data: TEMPORELS},
            {title: 'EFFETS DE MODULATION', data: MODULATION},
            {title: 'EFFETS DYNAMIQUE', data: DYNAMIQUE},
          ]}
          renderSectionHeader={({section}) => (
            <Text style={styles.sectionHeader}>
              {section.title}
            </Text>
          )}
          renderItem={({item}) => (
            // Item for the FlatListItems
            <Text
              style={styles.item}
              //Item Separator View
              onPress={() => alert(JSON.stringify(item))}>
              {item.value}
            </Text>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
}