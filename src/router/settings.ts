
import BrokerAccount from "../views/settings/BrokerAccount.vue";
import { RouteConfig } from 'vue-router'

const settingsRoutes: Array<RouteConfig> = [
    {
        path: 'broker',
        name: 'Broaker',
        component: BrokerAccount,
        meta: {
            code: 'broker'
        }
    }
];

export default settingsRoutes;