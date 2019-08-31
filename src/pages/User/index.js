import React, { Component } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
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
    page: 1,
    refreshing: false,
  };

  async componentDidMount() {
    const { navigation } = this.props;

    const user = navigation.getParam('user');
    this.setState({ user, loading: true });

    const { page } = this.state;
    await this.loadStarredRepos(page);

    this.setState({ loading: false });
  }

  loadStarredRepos = async page => {
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page },
    });

    this.setState(prevState => {
      const newState = {};

      if (page > 1) {
        newState.starred = [...prevState.starred, ...response.data];
      } else {
        newState.starred = response.data;
      }

      if (newState.starred.length === 30) {
        newState.page = page + 1;
      }

      return newState;
    });
  };

  loadMore = async () => {
    const { page } = this.state;

    await this.loadStarredRepos(page);
  };

  refresh = async () => {
    this.setState({ refreshing: false });

    await this.loadStarredRepos(1);

    this.setState({ refreshing: false });
  };

  render() {
    const { starred, user, loading, refreshing } = this.state;

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
            onEndReachedThreshold={5}
            onEndReached={this.loadMore}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.refresh}
                colors={['#fff']}
                progressBackgroundColor="#7159C1"
              />
            }
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
