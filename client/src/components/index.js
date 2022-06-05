import Header from './Header.vue'
import Registration from './Registration.vue'
import PostForm from './PostForm.vue'
import PostList from './PostList.vue';


import animations from './animations';
import ui from './UI';

export default [
    Header, Registration, PostForm, PostList, ...animations, ...ui
]