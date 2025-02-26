import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./providers/index";

import "@/shared/ui/style/app.scss";

const app = createApp(App);

app.use(router);

export * from './providers/index'
export { app }
