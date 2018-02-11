<template>
  <div id="dashboard">
      <h3>Dashboard</h3>
      <ul class="collection with-header">
          <li class="collection-header"><h4>Employees</h4></li>
          <li v-for="employee in employees" v-bind:key="employee.id" class="collection-item">
                <div class="chip teal lighten-5">
                  {{employee.dept}}
                </div>
              {{employee.employee_id}}:{{employee.name}}

              <router-link class="secondary-content" 
              v-bind:to="{name: 'view-employee', params: {employee_id: employee.employee_id}}">
                <i class="fa fa-eye"></i>
              </router-link>
          </li>
      </ul>
      <div class="loading" v-if="loading">
        Loading...
      </div>
      <div class="fixed-action-btn">
          <router-link to="/new" class="btn-floating btn-large red">
            <i class="fa fa-plus"></i>
          </router-link>
      </div>
  </div>
</template>

<script>
import database from '../environments/firebaseInit'
export default {
    name: 'dashboard',
    data() {
        return {
            employees: [],
            loading: true
        }
    },
    created() {
        database.collection('employees').orderBy('employee_id').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const document = {
                    'id': doc.id,
                    'employee_id': doc.data().employee_id,
                    'name': doc.data().name,
                    'dept': doc.data().dept,
                    'position': doc.data().position
                }
                this.employees.push(document);
            })
        }).then(()=> {
            this.loading = false
        })
    }
}
</script>
