/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const adminQueryTeacherRouter = {
  path: '/adminqueryteacher',
  component: Layout,
  redirect: 'noRedirect',
  name: 'adminqueryteacher',
  meta: {
    title: 'adminqueryteacher',
    icon: 'chart',
    roles: ['manager']
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/table/complex-table'),
      name: 'Icons',
      meta: { title: 'adminqueryteacher', icon: 'peoples', noCache: true, roles: ['manager'] }
    }
  ]

}

export default adminQueryTeacherRouter
