import { RouteRecordRaw } from 'vue-router';
import NotFound from '../components/NotFound.vue';
import Doc from '../views/doc/index.vue';
import ButtonDoc from '../views/doc/button/index.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/login/index.vue'),
        meta: {
            title: '登录',
            hidden: false,
            toOne: false,
        },
    },
    {
        path: '/index',
        name: 'index',
        redirect: '/echarts',
        component: () => import('../components/layout/index.vue'),
        meta: {
            title: '工作台',
            hidden: false,
            toOne: false,
            icon: 'icontable',
        },

        children: [
            {
                path: '/echarts',
                name: 'echarts',
                component: () => import('../views/echarts/index.vue'),
                meta: {
                    title: 'echarts',
                    hidden: false,
                    toOne: false,
                    icon: 'iconpie-chart_sharp',
                },
            },
            {
                path: '/list',
                name: 'list',
                component: () => import('../views/animateList/index.vue'),
                meta: {
                    title: '列表',
                    hidden: false,
                    toOne: false,
                    icon: 'iconliebiao1',
                },
            },
            {
                path: '/map',
                name: 'map',
                component: () => import('../views/map/index.vue'),
                meta: {
                    title: '地图',
                    hidden: false,
                    toOne: false,
                    icon: 'iconditu',
                },
            },
            {
                path: '/table',
                name: 'table',
                component: () => import('../views/table/index.vue'),
                meta: {
                    title: '表格',
                    hidden: false,
                    toOne: false,
                    icon: 'icontable',
                },
            },
            {
                path: '/tables',
                name: 'tables',
                component: () => import('../views/tables/index.vue'),
                meta: {
                    title: '表格嵌套',
                    hidden: false,
                    toOne: false,
                    icon: 'icontable',
                },
            },
            {
                path: '/test',
                name: 'test',
                component: () => import('../views/test/index.vue'),
                meta: {
                    title: 'test',
                    hidden: false,
                    toOne: false,
                    icon: 'icontable',
                },
            },
            {
                path: '/draw',
                name: 'draw',
                component: () => import('../views/draw/index.vue'),
                meta: {
                    title: 'draw',
                    hidden: false,
                    toOne: false,
                    icon: 'icontable',
                },
            },
            {
                path: '/upload',
                name: 'upload',
                component: () => import('../views/upload/upload.vue'),
                meta: {
                    title: '上传',
                    hidden: false,
                    toOne: false,
                    icon: 'icontable',
                },
            },
            {
                path: '/rrweb',
                name: 'rrweb',
                component: () => import('../views/rrweb/index.vue'),
                meta: {
                    title: 'rrweb',
                    hidden: false,
                    toOne: false,
                    icon: 'icontable',
                },
            },
        ],
    },
    {
        path: '/doc',
        name: 'doc',
        component: () => import('../components/layout/index.vue'),
        redirect: '/button',
        meta: {
            title: 'doc',
            hidden: false,
            toOne: false,
            icon: 'icondocument',
        },
        children: [
            { path: '/button', name: 'button', component: ButtonDoc, meta: { title: 'button', toOne: false, hidden: false, icon: 'iconanniu' } },
            {
                path: '/typescript',
                name: 'typescript',
                component: () => import('@/views/ts/TypeTest.vue'),
                meta: {
                    title: 'ts in vue',
                    hidden: false,
                    toOne: false,
                    icon: 'icontypescript-def',
                },
            },
            {
                path: '/tsx',
                name: 'tsx',
                component: () => import('../views/tsx'),
                meta: {
                    title: 'tsx',
                    hidden: false,
                    toOne: false,
                    icon: 'icontsx',
                },
            },
            {
                path: '/edit',
                name: 'edit',
                component: () => import('../views/edit/index.vue'),
                meta: {
                    title: '富文本编辑器',
                    hidden: false,
                    toOne: true,
                    icon: 'iconfuwenbenkuang',
                },
            },
            {
                path: '/animation',
                name: 'animation',
                component: () => import('../views/animation/index.vue'),
                meta: {
                    title: 'animation',
                    hidden: false,
                    toOne: true,
                    icon: 'icondonghua',
                },
            },

            {
                path: '/404',
                name: '404',
                component: () => import('../components/404.vue'),
                meta: {
                    title: '404',
                    hidden: false,
                    toOne: true,
                    icon: 'icon40401',
                },
            },
        ],
    },
    {
        path: '/virtual',
        name: 'virtual',
        // redirect: '/virtualList',
        component: () => import('../components/layout/index.vue'),
        meta: {
            title: '虚拟列表',
            hidden: false,
            toOne: false,
            icon: 'icondocument',
        },
        children: [
            {
                path: '/virtualList',
                name: 'virtualList',
                component: () => import('../views/virtually/virtuallyList.vue'),
                meta: {
                    title: '列表',
                    hidden: false,
                    toOne: false,
                    icon: 'iconpie-chart_sharp',
                },
            },
            {
                path: '/virtualTable',
                name: 'virtualTable',
                component: () => import('../views/virtually/virtuallyTable.vue'),
                meta: {
                    title: '表格',
                    hidden: false,
                    toOne: false,
                    icon: 'iconpie-chart_sharp',
                },
            },
        ],
    },
];

export default routes;
