import Icons from '../Icons';
import {Images} from '../Images';
import {Screens} from '../Screens/Screens';
import { store } from '../../Store/store';
import { logOut } from '../../Store/Reducers/AuthReducers';

export const StoryData = [
  {
    user_id: 1,
    user_image:
      'https://pbs.twimg.com/profile_images/1222140802475773952/61OmyINj.jpg',
    user_name: 'Ahmet Çağlar Durmuş',
    stories: [
      {
        story_id: 1,
        story_image:
          'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
      {
        story_id: 2,
        story_image:
          'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
      },
    ],
  },
  {
    user_id: 2,
    user_image:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    user_name: 'Test User',
    stories: [
      {
        story_id: 1,
        story_image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
      {
        story_id: 2,
        story_image:
          'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 2 swiped'),
      },
    ],
  },
];

export const NotificationData = [
  {
    id: 1,
    title: 'New',
    data: [
      {
        id: 1,
        type: `comment`,
        image: Images.user1,
        text: `Landon and Emila also commented on Anna Delvey's post`,
        time: `about an hour ago`,
        unread: true,
      },
      {
        id: 2,
        type: `react`,
        image: Images.user2,
        text: `Jim Hopper, Robin Buckley and Rachael Podrez love your story`,
        time: `6 hour ago`,
        unread: true,
      },
    ],
  },
  {
    id: 2,
    title: 'Ealier',
    data: [
      {
        id: 1,
        type: `reel`,
        image: Images.user3,
        text: `Robin Buckley shared a reel: Design faster with the best figma AI plugin`,
        time: `a day ago`,
        unread: false,
      },
      {
        id: 2,
        type: `request`,
        image: Images.user4,
        text: `Racheal Podrez sent you a friend request`,
        time: ``,
        unread: false,
      },
      {
        id: 3,
        type: `comment`,
        image: Images.user1,
        text: `Millie Brown commented in a post that you're taged in "Seriously"?`,
        time: `4 days ago`,
        unread: false,
      },
      {
        id: 4,
        type: `react`,
        image: Images.user2,
        text: `Anna Mary and Will Byers reacted to your comment "Great Work"`,
        time: `6 days ago`,
        unread: false,
      },
      {
        id: 5,
        type: `react`,
        image: Images.user3,
        text: `Erica Sincliar and Will Byers liked your comment "Thank you"`,
        time: `7 days ago`,
        unread: false,
      },
    ],
  },
];

export const RequestData = [
  {
    id: 1,
    image: Images.user1,
    name: `Jim Hopper`,
    mutual: `34 mutual`,
  },
  {
    id: 2,
    image: Images.user2,
    name: `Landon Bloom`,
    mutual: `12 mutual`,
  },
  {
    id: 3,
    image: Images.user3,
    name: `Rachael Podrez`,
    mutual: `193 mutual`,
  },
];

export const PeopleKnowData = [
  {
    id: 1,
    userImg: Images.user1,
    title: `Nancy Wheeler`,
    new: true,
    mutual: `7 mutual friends`,
  },
  {
    id: 2,
    userImg: Images.user2,
    title: `Will Byers`,
    new: false,
    mutual: `89 mutual friends`,
  },
  {
    id: 3,
    userImg: Images.user3,
    title: `Nancy Wheeler`,
    new: true,
    mutual: `7 mutual friends`,
  },
  {
    id: 4,
    userImg: Images.user4,
    title: `Will Byers`,
    new: false,
    mutual: `89 mutual friends`,
  },
];

export const marketData = [
  {
    id: 1,
    image: Images.market1,
    price: `$1.10`,
    title: `13-inch M2 MacBook Air 256GB - Midnight`,
    condition: `Brand New`,
  },
  {
    id: 2,
    image: Images.market2,
    price: `$1.29`,
    title: `iPhone 13 Pro Max 512GB Sierra Blue 5G`,
    condition: `Used`,
  },
  {
    id: 3,
    image: Images.market3,
    price: `$1.29`,
    title: `iPhone 13 Pro Max 512GB Sierra Blue 5G`,
    condition: `Used`,
  },
  {
    id: 4,
    image: Images.market4,
    price: `$1.29`,
    title: `iPhone 13 Pro Max 512GB Sierra Blue 5G`,
    condition: `Used`,
  },
];

export const FilterData = [
  {
    id: 1,
    title: 'Travelling',
  },
  {
    id: 2,
    title: 'Guns',
  },
  {
    id: 3,
    title: 'Hunting',
  },
  {
    id: 4,
    title: 'Vehicles',
  },
  {
    id: 5,
    title: 'Home',
  },
  {
    id: 6,
    title: 'Goods',
  },
  {
    id: 7,
    title: 'Furniture',
  },
];

export const PagesData = [
  {
    id: 1,
    title: 'Profile',
    icon: Icons.profile,
    navigate: Screens.ProfileScreen,
  },
  {
    id: 2,
    title: 'Edit Profile',
    icon: Icons.editProfile,
    navigate: Screens.ProfileScreen,
  },
  {
    id: 3,
    title: 'Blocked Friends',
    icon: Icons.blockedUsers,
    navigate: Screens.BlockedFriendsScreen,
    block: true,
  },
  {
    id: 4,
    title: 'Friends',
    icon: Icons.blockedUsers,
    navigate: Screens.FriendsScreen,
    block: false,
  },
  {
    id: 5,
    title: 'Delete Account',
    icon: Icons.deleteUser,
    navigate: '',
    modal: true,
  },
  {
    id: 6,
    title: 'Locators',
    icon: Icons.locator,
    navigate: Screens.LocatorScreen,
  },
  {
    id: 7,
    title: 'Around The Campfire',
    icon: Icons.campFire,
    navigate: Screens.LocatorScreen,
  },
  {
    id: 8,
    title: `Recipe's`,
    icon: Icons.recipe,
    navigate: Screens.RecipesScreen,
  },
  {
    id: 9,
    title: `Post your adventure`,
    icon: Icons.adventure,
    navigate: Screens.AdventureScreen,
  },
  {
    id: 10,
    title: `Hiking`,
    icon: Icons.hiking,
    navigate: Screens.HikingScreen,
  },
  {
    id: 11,
    title: `How To`,
    icon: Icons.store,
    navigate: Screens.HowToScreen,
  },
  {
    id: 12,
    title: `Store`,
    icon: Icons.store,
    navigate: Screens.HowToScreen,
  },
  {
    id: 13,
    title: `Contact Us`,
    icon: Icons.contact,
    navigate: Screens.ContactUsScreen,
  },
  {
    id: 13,
    title: `Logout`,
    icon: Icons.logout,
    action: () => store.dispatch(logOut()),
  }
  // {
  //   id: 14,
  //   title: `More`,
  //   icon: Icons.more,
  //   navigate: '',
  // },
];

export const HikingData = [
  {
    id: 1,
    image: Images.hike1,
  },
  {
    id: 2,
    image: Images.hike2,
  },
  {
    id: 3,
    image: Images.hike3,
  },
  {
    id: 4,
    image: Images.hike4,
  },
  {
    id: 5,
    image: Images.hike5,
  },
  {
    id: 6,
    image: Images.hike6,
  },
];

export const AdventureData = [
  {
    id: 1,
    description: `Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken. Het heeft niet alleen vijf eeuwen overleefd maar is ook, vrijwel onveranderd, overg enomen in elektronische letterzetting. Het is in de jaren '60 populair geworden met de introductie van Letraset vellen met Lorem Ipsum passages en meer recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum bevatten.Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen.overgenomen in elektronische letterzetting. Het is in de jaren '60 t recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum bevatten.`,
    comments: `3.4k`,
    share: `46`,
    commentUser: `Q&A with Mark & 361k others`,
    user: {
      name: 'Scott Halbert',
      time: '111 days ago',
      image: Images.user4,
    },
    comment: {
      name: `Mark Ramos`,
      comment: `Greet work! Well done girl. 👏🏽`,
      image: Images.user3,
    },
  },
  {
    id: 2,
    description: `Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken. Het heeft niet alleen vijf eeuwen overleefd maar is ook, vrijwel onveranderd, overg enomen in elektronische letterzetting. Het is in de jaren '60 populair geworden met de introductie van Letraset vellen met Lorem Ipsum passages en meer recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum bevatten.Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen.overgenomen in elektronische letterzetting. Het is in de jaren '60 t recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum bevatten.`,
    comments: `3.4k`,
    share: `46`,
    commentUser: `Q&A with Mark & 361k others`,
    user: {
      name: 'Scott Halbert',
      time: '111 days ago',
      image: Images.user4,
    },
    comment: {
      name: `Mark Ramos`,
      comment: `Greet work! Well done girl. 👏🏽`,
      image: Images.user3,
    },
  },
  {
    id: 3,
    description: `Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken. Het heeft niet alleen vijf eeuwen overleefd maar is ook, vrijwel onveranderd, overg enomen in elektronische letterzetting. Het is in de jaren '60 populair geworden met de introductie van Letraset vellen met Lorem Ipsum passages en meer recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum bevatten.Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen.overgenomen in elektronische letterzetting. Het is in de jaren '60 t recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum bevatten.`,
    comments: `3.4k`,
    share: `46`,
    commentUser: `Q&A with Mark & 361k others`,
    user: {
      name: 'Scott Halbert',
      time: '111 days ago',
      image: Images.user4,
    },
    comment: {
      name: `Mark Ramos`,
      comment: `Greet work! Well done girl. 👏🏽`,
      image: Images.user3,
    },
  },
];

export const HowToData = [
  {
    id: 1,
    description: `Welcome everyone! Let's get this thing rolling? Where is everyone from?`,
    image: Images.post3,
    comments: `3.4k`,
    share: `46`,
    commentUser: `Q&A with Mark & 361k others`,
    user: {
      name: 'Scott Halbert',
      time: '111 days ago',
      image: Images.user4,
    },
    comment: {
      name: `Mark Ramos`,
      comment: `Greet work! Well done girl. 👏🏽`,
      image: Images.user3,
    },
  },
  {
    id: 2,
    description: `Welcome everyone! Let's get this thing rolling? Where is everyone from?`,
    image: Images.post3,
    comments: `3.4k`,
    share: `46`,
    commentUser: `Q&A with Mark & 361k others`,
    user: {
      name: 'Scott Halbert',
      time: '111 days ago',
      image: Images.user4,
    },
    comment: {
      name: `Mark Ramos`,
      comment: `Greet work! Well done girl. 👏🏽`,
      image: Images.user3,
    },
  },
  {
    id: 3,
    description: `Welcome everyone! Let's get this thing rolling? Where is everyone from?`,
    image: Images.post3,
    comments: `3.4k`,
    share: `46`,
    commentUser: `Q&A with Mark & 361k others`,
    user: {
      name: 'Scott Halbert',
      time: '111 days ago',
      image: Images.user4,
    },
    comment: {
      name: `Mark Ramos`,
      comment: `Greet work! Well done girl. 👏🏽`,
      image: Images.user3,
    },
  },
];

export const FriendsData = [
  {
    id: 1,
    image: Images.friend1,
    name: 'Jim Hooper',
    mutual: '34 mutual friends',
  },
  {
    id: 2,
    image: Images.friend2,
    name: 'Landon Bloom',
    mutual: '12 mutual friends',
  },
  {
    id: 3,
    image: Images.friend3,
    name: 'Rachael Podrez',
    mutual: '193 mutual friends',
  },
  {
    id: 4,
    image: Images.friend1,
    name: 'Jim Hooper',
    mutual: '34 mutual friends',
  },
  {
    id: 5,
    image: Images.friend2,
    name: 'Landon Bloom',
    mutual: '12 mutual friends',
  },
  {
    id: 6,
    image: Images.friend3,
    name: 'Rachael Podrez',
    mutual: '193 mutual friends',
  },
  {
    id: 7,
    image: Images.friend1,
    name: 'Jim Hooper',
    mutual: '34 mutual friends',
  },
  {
    id: 8,
    image: Images.friend2,
    name: 'Landon Bloom',
    mutual: '12 mutual friends',
  },
  {
    id: 9,
    image: Images.friend3,
    name: 'Rachael Podrez',
    mutual: '193 mutual friends',
  },
];
