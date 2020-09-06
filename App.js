import React from "react";
import { AppLoading } from "expo";
import * as Font from 'expo-font';

import { Ionicons } from '@expo/vector-icons';
//  Navegação
import Navigation from "./src/components/navigation";

//  REDUX
import { Provider } from 'react-redux';
import { store } from "./src/redux/reducers/index";
import { Root } from "native-base";
//  Moment
import moment from "moment/min/moment-with-locales";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    moment.locale(['pt-br', 'en'])
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }
  render() {

    var whatToShow = <AppLoading />

    if (this.state.isReady)
      whatToShow = (
        <Root>
          <Provider store={store}>
            <Navigation />
          </Provider>
        </Root>
      )

    return whatToShow;
  }
};
