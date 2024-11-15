<template>
    <main>
      <h1>{{ score }}</h1>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Y--mXjQKzgENOzer6m0nHvS2qpYCOgNxDw&s"
      @click="handleClickEvent"
      />
    </main>
</template>

<script>
  export default{
data () {
  return {
    score: 0,
  }
},

    methods: {
      handleClickEvent ()  {
        this.score += 1;
      }
    }
  }
</script>

<style scoped>
* {
  font-family: Arial, Helvetica, sans-serif;
}

main {
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}
img {
  width: 200px;
  object-fit: contain;
}
</style>