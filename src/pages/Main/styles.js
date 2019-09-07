import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import {
  VERY_LIGHT_GRAY,
  DARK_GRAY,
  MODERATE_BLUE,
  DARKEST_GRAY,
  LIGHTEST_GRAY,
} from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  padding: 30px 30px 0;
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: ${VERY_LIGHT_GRAY};
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: DARK_GRAY,
})`
  flex: 1;
  height: 40px;
  background: ${VERY_LIGHT_GRAY};
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid ${VERY_LIGHT_GRAY};
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: ${MODERATE_BLUE};
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
  opacity: ${props => (props.loading ? 0.7 : 1)};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const UserContainer = styled.View`
  flex-direction: row;
  padding-top: 15px;
  padding-bottom: 20px;
  justify-content: space-between;
  align-content: center;
  align-items: center;
`;

export const User = styled.View`
  align-items: center;
  flex-direction: row;
  width: 90%;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: ${VERY_LIGHT_GRAY};
`;

export const UserInfo = styled.View`
  margin-left: 10px;
  max-width: 75%;
`;

export const Name = styled.Text`
  font-size: 14px;
  color: ${DARKEST_GRAY};
  font-weight: bold;
  margin-top: 7px;
`;

export const Login = styled.Text`
  font-size: 13px;
  line-height: 18px;
  color: ${DARK_GRAY};
  margin-bottom: 5px;
`;

export const RowSeparator = styled.View`
  border-bottom-width: 1px;
  border-color: ${LIGHTEST_GRAY};
`;
