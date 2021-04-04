import master from 'lib/master';

const setting = () => ({
  size: {
    base: 50,
  },
  main: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  icon: [
    {
      id: 1,
      image: require('../../../img/categories/category_aquarium.png'),
      category: master.CATEGORY_1,
      name: '生活2',
    },
    {
      id: 2,
      image: require('../../../img/categories/category_book.png'),
      category: master.CATEGORY_1,
      name: '趣味',
    },
    {
      id: 3,
      image: require('../../../img/categories/category_door_close.png'),
      category: master.CATEGORY_1,
      name: '外出',
    },
    {
      id: 4,
      image: require('../../../img/categories/category_heart.png'),
      category: master.CATEGORY_2,
      name: '健康',
    },
    {
      id: 5,
      image: require('../../../img/categories/category_musical.png'),
      category: master.CATEGORY_2,
      name: '鑑賞',
    },
    {
      id: 6,
      image: require('../../../img/categories/category_money.png'),
      category: master.CATEGORY_2,
      name: 'お金',
    },
    {
      id: 7,
      image: require('../../../img/categories/category_dancing.png'),
      category: master.CATEGORY_3,
      name: '習いごと',
    },
    {
      id: 8,
      image: require('../../../img/categories/category_conference.png'),
      category: master.CATEGORY_3,
      name: '仕事',
    },
    {
      id: 9,
      image: require('../../../img/categories/category_shopping.png'),
      category: master.CATEGORY_3,
      name: '買い物',
    },
  ],
});

export const icon = (id: number) => {
  const s = setting();

  const r = s.icon.find((v) => v.id === id);
  if (!r) {
    return s.icon[0];
  }

  return r;
};

export default setting;
