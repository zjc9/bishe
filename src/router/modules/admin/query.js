/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const adminQueryRouter = {
  path: '/adminquerystudent',
  component: Layout,
  redirect: 'noRedirect',
  name: 'adminquerystudent',
  meta: {
    title: 'adminquerystudent',
    icon: 'chart',
    roles: ['manager']
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/admin/studentInformation'),
      name: 'Icons',
      meta: { title: 'adminquerystudent', icon: 'peoples', noCache: true, roles: ['manager'] }
    }
  ]

}

export default adminQueryRouter
