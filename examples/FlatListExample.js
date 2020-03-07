import React from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Dimensions
} from 'react-native';
import { 
  PageControlAji,
  PageControlAleppo,
  PageControlJaloro,
  PageControlPoblano 
} from 'react-native-chi-page-control';

const width = Dimensions.get('window').width;
const DATA = ["red", "blue", "green", "yellow"];

class FlatListExample extends React.Component{

  state = {
    progress: 0
  };

  constructor(props) {
    super(props);

    this.onScroll = this.onScroll.bind(this)
  };

  render() {
    return (
      <>
        <SafeAreaView>
          <FlatList
            style={{marginBottom: 20}}
            data={DATA}
            horizontal
            pagingEnabled
            renderItem={this.renderItem}
            onScroll={this.onScroll}
            keyExtractor={item => item}
          />

          <View style={{alignItems: 'center'}}>
            <PageControlAji progress={this.state.progress} numberOfPages={DATA.length} style={{marginBottom: 10}} />
            <PageControlAleppo progress={this.state.progress} numberOfPages={DATA.length} style={{marginBottom: 10}}/>
            <PageControlJaloro progress={this.state.progress} numberOfPages={DATA.length} style={{marginBottom: 10}}/>
            <PageControlPoblano progress={this.state.progress} numberOfPages={DATA.length} style={{marginBottom: 10}}/>
          </View>
        </SafeAreaView>
      </>
    )
  };

  renderItem({item}) {
    return <View style={{height: 100, width: width, backgroundColor: item, borderColor: 'black', borderWidth: 2}} />
  };

  onScroll(e) {
    // Get progress by dividing current FlatList X offset with full FlatList width
    this.setState({ progress: e.nativeEvent.contentOffset.x / ((DATA.length - 1) * width) })
  };
};

export default FlatListExample;
