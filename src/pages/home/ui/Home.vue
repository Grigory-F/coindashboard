<template>
  <div class="home-page">
    {{ resultComputed }}

    <div @click="wefewf">wefwfee</div>
    <BitcoinRateComponent />
    <VisualInvestmentPortfolio />
  </div>
</template>

<script lang="ts" setup>
import { apolloClient } from "@/shared/api/apolloClientInstance";
import { BitcoinRateComponent } from "@/widgets/bitcoin-rate-component";
import { VisualInvestmentPortfolio } from "@/widgets/visual-investment-portfolio";
import {
  provideApolloClient,
  useLazyQuery,
  useQuery,
} from "@vue/apollo-composable";
import gql from "graphql-tag";
import { computed } from "vue";

const { result, loading, error, refetch, load } = useLazyQuery(gql`
  query ExampleQuery {
    capsulesPast {
      dragon {
        active
        crew_capacity
        description
        diameter {
          feet
          meters
        }
        first_flight
        wikipedia
      }
      id
      landings
      missions {
        flight
        name
      }
      status
      reuse_count
      original_launch
    }
  }
`);

console.log(result.value);

const resultComputed = computed(() => result.value);

const wefewf = async () => {
  try {
    let data = await load();
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
