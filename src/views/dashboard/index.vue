<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import tablecomponet from '@/views/tablecomponet'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard, tablecomponet },
  data() {
    return {
      currentRole: 'editorDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    this.currentRole = 'editorDashboard'
  }
}
</script>
