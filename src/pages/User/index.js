import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Loader,
  StarredRepos,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').login,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    starred: [],
    user: '',
    loading: false,
  };

  async componentDidMount() {
    const { navigation } = this.props;

    const user = navigation.getParam('user');
    this.setState({ user, loading: true });

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({ starred: response.data, loading: false });
  }

  render() {
    const { starred, user, loading } = this.state;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          {user.bio ? <Bio>{user.bio}</Bio> : null}
        </Header>

        {loading ? (
          <Loader>
            <ActivityIndicator color="#7159c1" />
          </Loader>
        ) : (
          <StarredRepos
            data={starred}
            keyExtractor={star => String(star.id)}
            onEndReachedThreshold={0.8}
            onEndReached={() => console.tron.log('END REACHED')}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}

export default User;
