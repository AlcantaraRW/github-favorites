import React from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

function Repo({ navigation }) {
  return <WebView source={{ uri: navigation.getParam('repo').url }} />;
}

export default Repo;

Repo.navigationOptions = ({ navigation }) => ({
  title: `${navigation.getParam('repo').name}`,
});

Repo.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
