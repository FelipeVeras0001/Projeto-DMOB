(function(){ // função para paginação
  angular.module('primeiraApp').component('paginator', {
    bindings: {
      url: '@',
      pages: '@', //quantidde de páginas que irá aparecer
    },
    controller:[
      '$location',
      function($location){
        this.$onInit = function(){
          const pages = parseInt(this.pages) || 1
          this.pagesArray = Array(pages).fill(0).map((e, i) => i + 1)
          this.current = parseInt($location.search().page) || 1
          this.needPagination = this.pages > 1 // se precisa reinderizar
          this.hasPrev = this.current > 1 // se precisa do botão anterior
          this.hasNext = this.current < this.pages // se precisa o botão próximo, se o current for menor que o total de pages
        }
        this.isCurrent = function(i){
          return this.current == i
        }
      }
    ],//criado na aplicação para aparecer os botões de paginação
    template: `
      <ul ng-if="$ctrl.needPagination" class="pagination pagination-sm no-margin pull-right">
      <li ng-if="$ctrl.hasPrev">
        <a href="{{ $ctrl.url}}?page={{ $ctrl.current -1}}">Anterior</a>
      </li>
      <li ng-class="{active: $ctrl.isCurrent(index)}" ng-repeat="index in $ctrl.pagesArray">
        <a href="{{ $ctrl.url}}?page={{ index}}">{{ index }}</a>
      </li>
      <li ng-if="$ctrl.hasNext">
        <a href="{{ $ctrl.url }}?page={{ $ctrl.current + 1 }}">Próximo</a>
      </li>
      </ul>
    `
  })
})()
