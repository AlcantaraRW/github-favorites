import React, { useState, useEffect } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
import { MODERATE_BLUE, WHITE } from '../../styles/colors';

export default function User({ navigation }) {
  const [user, setUser] = useState('');
  const [page, setPage] = useState(1);
  const [starred, setStarred] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadStarredRepos() {
    const selectedUser = navigation.getParam('user');

    const response = await api.get(`/users/${selectedUser.login}/starred`, {
      params: { page },
    });

    setStarred(page > 1 ? [...starred, ...response.data] : response.data);

    if (starred.length === 30) {
      setPage(page + 1);
    }
  }

  useEffect(() => {
    setUser(navigation.getParam('user'));

    async function init() {
      setLoading(true);
      await loadStarredRepos();
      setLoading(false);
    }

    init();
  }, []);

  async function loadMore() {
    await loadStarredRepos(page);
  }

  async function handleGoToRepo(repo) {
    const { name, html_url: url } = repo;

    navigation.navigate('Repo', { repo: { name, url } });
  }

  async function refresh() {
    setRefreshing(false);
    await loadStarredRepos(1);
    setRefreshing(false);
  }

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        {user.bio && <Bio>{user.bio}</Bio>}
      </Header>

      {loading ? (
        <Loader>
          <ActivityIndicator color={MODERATE_BLUE} />
        </Loader>
      ) : (
        <StarredRepos
          data={starred}
          keyExtractor={star => String(star.id)}
          onEndReachedThreshold={5}
          onEndReached={loadMore}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refresh}
              colors={[WHITE]}
              progressBackgroundColor={MODERATE_BLUE}
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleGoToRepo(item)}>
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            </TouchableOpacity>
          )}
        />
      )}
    </Container>
  );
}

User.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('user').login,
});

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};
