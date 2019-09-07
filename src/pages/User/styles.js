import styled from 'styled-components/native';
import {
  VERY_LIGHT_GRAY,
  DARKEST_GRAY,
  DARK_GRAY,
  VERY_LIGHT_GRAY_MOSTLY_WHITE,
  VERY_DARK_GRAY,
} from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  padding: 15px 30px 0;
`;

export const Header = styled.View`
  align-items: center;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: ${VERY_LIGHT_GRAY};
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: ${VERY_LIGHT_GRAY};
`;

export const Name = styled.Text`
  font-size: 20px;
  color: ${DARKEST_GRAY};
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

export const Bio = styled.Text`
  font-size: 14px;
  line-height: 18px;
  color: ${DARK_GRAY};
  margin-top: 5px;
  text-align: center;
`;

export const Loader = styled.View`
  margin-top: 20px;
`;

export const StarredRepos = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Starred = styled.View`
  background: ${VERY_LIGHT_GRAY_MOSTLY_WHITE};
  border-radius: 4px;
  padding: 10px 15px;
  margin-top: 15px;
  flex-direction: row;
  align-items: center;
`;

export const OwnerAvatar = styled.Image`
  height: 42px;
  width: 42px;
  border-radius: 21px;
  background: ${VERY_LIGHT_GRAY};
`;

export const Info = styled.View`
  margin-left: 10px;
  flex: 1;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 15px;
  font-weight: bold;
  color: ${DARKEST_GRAY};
`;

export const Author = styled.Text`
  font-size: 13px;
  color: ${VERY_DARK_GRAY};
  margin-top: 2px;
`;
