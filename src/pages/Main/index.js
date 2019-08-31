import React, { Component } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';
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

class Main extends Component {
  static navigationOptions = {
    title: 'Usuários',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  async componentDidMount() {
    const savedUsers = await AsyncStorage.getItem('users');

    if (savedUsers) {
      this.setState(() => {
        return {
          users: JSON.parse(savedUsers),
        };
      });
    }
  }

  componentDidUpdate(props, prevState) {
    const { users } = this.state;

    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const { newUser } = this.state;

    if (!newUser) return;

    this.setState({ loading: true });

    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState(prevState => {
      return {
        users: [...prevState.users, data],
        newUser: '',
        loading: false,
      };
    });

    Keyboard.dismiss();
  };

  handleNavigate = user => {
    const { navigation } = this.props;

    navigation.navigate('User', { user });
  };

  handleDelete = user => {
    this.setState(prevState => {
      const newListOfUsers = prevState.users.filter(
        u => u.login !== user.login,
      );

      return { users: newListOfUsers };
    });
  };

  render() {
    const { newUser, users, loading } = this.state;
    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton
            loading={loading}
            onPress={this.handleAddUser}
            enabled={!loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Icon name="add-circle" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtractor={user => user.login}
          ItemSeparatorComponent={() => <RowSeparator />}
          renderItem={({ item }) => (
            <UserContainer>
              <TouchableOpacity onPress={() => this.handleNavigate(item)}>
                <User>
                  <Avatar source={{ uri: item.avatar }} />
                  <UserInfo>
                    <Name>{item.name}</Name>
                    <Login>{item.login}</Login>
                  </UserInfo>
                </User>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.handleDelete(item)}>
                <Icon name="remove-circle-outline" size={25} color="#dc3545" />
              </TouchableOpacity>
            </UserContainer>
          )}
        />
      </Container>
    );
  }
}

export default Main;
