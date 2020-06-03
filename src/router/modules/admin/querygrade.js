
import Layout from '@/layout'

const adminQuerygradeRouter = {
  path: '/adminquerygrade',
  component: Layout,
  redirect: 'noRedirect',
  name: 'adminquerygrade',
  meta: {
    title: 'adminquerygrade',
    icon: 'chart',
    roles: ['manager']
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/admin/verifyGrade'),
      name: 'Icons',
      meta: { title: '成绩审核', icon: 'list', noCache: true, roles: ['manager'] }
    },
    {
      path: '/secondvertify',
      component: () => import('@/views/admin/verifyGrade'),
      name: 'Icons',
      meta: { title: '成绩复核', icon: 'list', noCache: true, roles: ['manager'] }
    },
    {
      path: '/vertified',
      component: () => import('@/views/admin/verifyGrade'),
      name: 'Icons',
      meta: { title: '已审核', icon: 'list', noCache: true, roles: ['manager'] }
    }
  ]

}

export default adminQuerygradeRouter
