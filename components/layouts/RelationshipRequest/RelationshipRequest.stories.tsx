import {
  relationshipRequest,
  relationshipRequests,
} from "__mockData__/relationshipRequest";
import React from "react";
import { mockFn } from "storyBookUtils/index";
import Card from "./Card";
import type { Props as CardProps } from "./Card";
import List from "./List";
import type { Props as ListProps } from "./List";
import Notification from "./Notification";
import type { Props as NotificationProps } from "./Notification";

const notificationProps = (): NotificationProps => ({
  count: 3,
  onPress: mockFn("onPress"),
});

const cardProps = (): CardProps => ({
  ...relationshipRequest(),
  onOK: mockFn("onOK"),
  onNG: mockFn("onNG"),
  ngRequesting: false,
  acceptRequesting: false,
});
const listProps = (): ListProps => ({
  items: relationshipRequests(),
  pageInfo: {
    hasNextPage: false,
    endCursor: "",
  },
  onLoadMore: mockFn("onLoadMore"),
  loading: false,
  onOK: mockFn("onOK"),
  onNG: mockFn("onNG"),
  ngRequesting: false,
  acceptRequesting: false,
});

export default {
  title: "organisms/RelationshipRequest",
};

export const _Notification = () => <Notification {...notificationProps()} />;
export const _Card = () => <Card {...cardProps()} />;
export const _List = () => <List {...listProps()} />;
