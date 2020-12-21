import Home from "../views/Home.vue";
import Stategy from "../views/Strategy.vue";
import { RouteConfig } from 'vue-router'

const masterRoutes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            code:'home'
        }
    },
    {
        path: '/strategy',
        name: 'Stategy',
        component: Stategy,
        meta: {
            code:'strategy'
        }
    }
];

export default masterRoutes;