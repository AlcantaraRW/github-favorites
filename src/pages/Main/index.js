import React, { useState, useEffect } from 'react';
import { Keyboard, ActivityIndicator, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';
import { translate } from '../../locales';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  UserContainer,
  User,
  Avatar,
  UserInfo,
  Name,
  Login,
  RowSeparator,
} from './styles';
import { WHITE, BRIGHT_RED } from '../../styles/colors';

export default function Main({ navigation }) {
  const [newUser, setNewUser] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getSavedUsers() {
      const savedUsers = await AsyncStorage.getItem('users');

      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
      }
    }

    getSavedUsers();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  function userIsRepeated() {
    const loginList = users.map(u => u.login.toLowerCase());

    return loginList.includes(newUser.toLowerCase());
  }

  async function handleAddUser() {
    if (!newUser) return;

    if (userIsRepeated(users, newUser)) {
      setNewUser('');
      Alert.alert(translate('warning'), translate('userAlreadyAdded'), [
        { text: 'OK' },
      ]);

      return;
    }

    setLoading(true);

    try {
      const response = await api.get(`/users/${newUser}`);

      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url,
      };

      setUsers([...users, data]);
      setNewUser('');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert(err.name, err.message, [{ text: 'OK' }]);
    }

    Keyboard.dismiss();
  }

  function handleNavigate(user) {
    navigation.navigate('User', { user });
  }

  function handleDelete(user) {
    setUsers(users.filter(u => u.login !== user.login));
  }

  function confirmeDeletion(user) {
    Alert.alert(
      translate('confirm'),
      translate('removeUser', { userLogin: user.login }),
      [
        {
          text: translate('cancel'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => handleDelete(user),
        },
      ],
    );
  }

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder={translate('addUser')}
          value={newUser}
          onChangeText={text => setNewUser(text)}
          returnKeyType="send"
          onSubmitEditing={handleAddUser}
        />
        <SubmitButton
          loading={loading}
          onPress={handleAddUser}
          enabled={!loading}
        >
          {loading ? (
            <ActivityIndicator color={WHITE} />
          ) : (
            <Icon name="add-circle" size={20} color={WHITE} />
          )}
        </SubmitButton>
      </Form>

      <List
        data={users}
        keyExtractor={user => user.login}
        ItemSeparatorComponent={() => <RowSeparator />}
        renderItem={({ item }) => (
          <UserContainer>
            <TouchableOpacity onPress={() => handleNavigate(item)}>
              <User>
                <Avatar source={{ uri: item.avatar }} />
                <UserInfo>
                  <Name>{item.name}</Name>
                  <Login>{item.login}</Login>
                </UserInfo>
              </User>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => confirmeDeletion(item)}>
              <Icon name="remove-circle-outline" size={25} color={BRIGHT_RED} />
            </TouchableOpacity>
          </UserContainer>
        )}
      />
    </Container>
  );
}

Main.navigationOptions = {
  title: translate('users'),
};

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
