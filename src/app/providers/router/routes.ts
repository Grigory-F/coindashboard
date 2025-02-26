import { Home } from "@/pages/home";
import type { TAppRouterRecord } from "@/shared/lib";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
] as const satisfies readonly TAppRouterRecord[]; // Определяем массив маршрутов как константу, которая удовлетворяет требованиям TAppRouterRecord

export { routes };
