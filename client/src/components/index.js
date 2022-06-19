import Header from './Header.vue'
import Registration from './Registration.vue'
import PostForm from './PostForm.vue'
import PostList from './PostList.vue';
import PostSingle from './PostSingle.vue';
import UserList from './UserList.vue';
import UserSingle from './UserSingle.vue';
import Login from './Login.vue';
import UserCard from './UserCard.vue'

import animations from './animations';
import ui from './UI';

export default [
    Header, Registration, PostForm, PostList, PostSingle, UserList, UserSingle, Login, UserCard,
    ...animations, ...ui
]