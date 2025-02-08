module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/variables.scss";` // Si tienes un archivo de variables globales
      }
    }
  }
};
