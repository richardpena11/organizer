<template>
  <div class="projects-container">
    <div class="projects" v-for="item in 3" :key="item">
      <div class="projects__category">
        <span class="projects__category__title">All projects</span>
        <div class="projects__category__dropdown">
          <v-icon>mdi-chevron-down</v-icon>
        </div>
      </div>
      <div class="projects__cards">
        <div class="projects__cards__new-card projects__cards__card">
          <div class="projects__cards__new-card__title">
            Create a new project
          </div>
          <div class="projects__cards__new-card__plus">
            <v-icon>mdi-plus</v-icon>
          </div>
        </div>
        <div class="projects__cards__card" v-for="item in 2" :key="item">
          <span class="projects__cards__card__title">Millionaie Project</span>
          <span class="projects__cards__card__description">
            Small description
          </span>
          <span class="projects__cards__card__date">
            Finish date: 06/15/2021
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    // this.$store.dispatch('checkIfUserWasLogedIn')
  },
  layout: 'dashboard',
}
</script>

<style lang="scss" scoped>
.projects-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .projects {
    margin: 15px 0;
    &__category {
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      &__title {
        font-size: 16px;
        font-weight: 700;
      }
      &__dropdown {
        margin: 0 10px;
        border-radius: 50%;
        background: var(--ligth-blue-color);
      }
    }
    &__cards {
      display: flex;
      justify-content: space-around;
      &__card {
        height: 200px;
        max-width: 350px;
        width: 30%;
        padding-left: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 12px;
        border: 2px solid var(--ligth-blue-color);
        border-bottom: 8px solid var(--red-color);
        > span {
          margin: 7px 0;
        }
        &__title {
          font-size: 16px;
          color: var(--blue-color);
        }
        &__description,
        &__date {
          font-size: 14px;
          color: var(--gray-color);
        }
      }
      &__new-card {
        border: 1px solid var(--ligth-blue-color);
        color: var(--blue-color);
        text-align: center;
        &__title {
          font-size: 16px;
        }
        &__plus {
          i {
            color: var(--blue-color);
            font-size: 80px;
          }
        }
      }
    }
  }
}
</style>
