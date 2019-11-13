import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Invoice from '../views/Invoice.vue'
import Bill from '../views/Invoice/Bill.vue'
import CredictNotes from '../views/Invoice/CredictNotes.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    children: [
      {
        path: 'facturacion',
        name: 'Billing',
        component: Invoice,
        children: [
            {
              path: 'factura',
              name: 'factura',
              component: Bill
            },
            {
              path: 'notas_credito',
              name: 'CredictNotes',
              component: CredictNotes
            },
          ],
      },
      ]
    }]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
