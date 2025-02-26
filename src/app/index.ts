import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from "./App.vue";
import { router } from "./providers/index";

import "@/shared/ui/style/app.scss";
import { apolloClient } from '@/shared/api/apolloClientInstance';


const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app.use(router);

export * from './providers/index'
export { app }
