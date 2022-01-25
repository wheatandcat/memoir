import React, { memo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRelationshipsQuery } from 'queries/api/index';
import { User as TUser } from 'queries/api/index';
import { userState } from 'store/atoms';
import { useRecoilValue } from 'recoil';
import { State as Input } from 'components/templates/Search/Page';
import dayjs from 'lib/dayjs';
import { ScreenNavigationProp as SearchNavigationProp } from './';
import Plain from './Plain';

type User = Pick<TUser, 'id' | 'image'>;

export type Props = {};

export type ConnectedType = {
  users: User[];
  onSearch: (input: Input) => void;
};

const Connected: React.FC<Props> = () => {
  const navigation = useNavigation<SearchNavigationProp>();
  const user = useRecoilValue(userState);
  const relationshipsQuery = useRelationshipsQuery({
    variables: {
      input: {
        after: '',
        first: 5,
      },
      skip: false,
    },
  });

  const onSearch = useCallback(
    (input: Input) => {
      navigation.navigate('Memoir', {
        startDate: dayjs(input.startDate).format('YYYY-MM-DDT00:00:00+09:00'),
        endDate: dayjs(input.endDate).format('YYYY-MM-DDT00:00:00+09:00'),
        userIDList: input.userIDList,
        categoryID: input.categoryID,
        like: input.like,
        dislike: input.dislike,
        search: true,
      });
    },
    [navigation]
  );

  const users: User[] = [
    {
      id: user.userID || '',
      image: user.image,
    },
  ];
  const relationships = relationshipsQuery.data?.relationships?.edges || [];
  const relationshipUsers: User[] = relationships.map((v) => ({
    id: v?.node?.user?.id || '',
    image: v?.node?.user?.image || '',
  }));
  const tUsers = [...users, ...relationshipUsers];

  return (
    <Plain
      loading={relationshipsQuery.loading}
      error={null}
      users={tUsers}
      onSearch={onSearch}
    />
  );
};

export default memo(Connected);
