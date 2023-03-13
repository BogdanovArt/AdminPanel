import { Module, VuexModule, Mutation } from "vuex-module-decorators";

@Module({
  name: "mainModule",
  stateFactory: true,
  namespaced: true,
})
class Main extends VuexModule {
  fetching = false;

  get fetchingState() {
    return this.fetching;
  }

  @Mutation
  setFetching(data: boolean) {
    this.fetching = data;
  }
}

export default Main;
