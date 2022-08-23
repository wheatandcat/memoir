import { useEffect, useCallback } from 'react';
import * as Sentry from 'sentry-expo';
import { Breadcrumb } from '@sentry/types';
import { useNavigation, useRoute } from '@react-navigation/native';

const useSentryBreadcrumb = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const captureBreadcrumb = useCallback(async () => {
    const breadcrumb: Breadcrumb = {
      category: 'Focus',
      message: `${route.name} is mounted`,
    };

    if (route.params) {
      breadcrumb.data = route.params;
    }
    Sentry.Native.addBreadcrumb(breadcrumb);
  }, [route]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      captureBreadcrumb();
    });

    return unsubscribe();
  }, [navigation, captureBreadcrumb]);
};

export default useSentryBreadcrumb;
