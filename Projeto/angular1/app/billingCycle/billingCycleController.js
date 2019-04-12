(function() { // função com compornentes para operações dentro da aplicação
    angular.module('primeiraApp').controller('BillingCycleCtrl', [
        '$http',
        '$location',
        'msgs',
        'tabs',
        BillingCycleController
    ])

    function BillingCycleController($http, $location, msgs, tabs)  {
        const vm = this
        const url='http://localhost:3003/api/billingCycles'
        // limpar campos após operação

        vm.refresh = function() {
        const page = parseInt($location.search().page) || 1
        $http.get(`${url}?skip=${(page - 1) * 2}&limit=2`).then(function(response){
          vm.billingCycle = {credits: [{}], debts: [{}]}
          vm.billingCycles = response.data
          vm.calculateValues()

          // função de paginação
          $http.get(`${url}/count`).then(function(response){
         vm.pages = Math.ceil(response.data.value / 2)
         tabs.show(vm, {tabList: true, tabCreate: true})

            })
        })
      }

      // função Inserir
        vm.create = function() {
        $http.post(url, vm.billingCycle).then(function(response){
          vm.refresh()
          msgs.addSuccess('Operação realizada com sucesso!')
          console.log('Sucesso!')
        })
          .catch(function(response) {
            msgs.addError(response.data.errors)
        })
      }
       //aparecer funções dentro da tabela
       vm.showTabUpdate = function(billingCycle){
         vm.billingCycle = billingCycle
         vm.calculateValues()
         tabs.show( vm, { tabUpdate: true})
    }

       vm.showTabDelete = function(billingCycle){
         vm.billingCycle = billingCycle
         vm.calculateValues()
         tabs.show(vm, { tabDelete: true})
    }
    // função alterar
    vm.update = function(){
      const updateUrl =  `${url}/${vm.billingCycle._id}`
      $http.put(updateUrl, vm.billingCycle).then(function(response){
        vm.refresh()
        msgs.addSuccess('Operação realizada com sucesso!')
      })
        .catch(function(response){
        msgs.addError(response.data.errors)
      })
    }
      // função deletar
     vm.delete = function(){
     const deleteUrl = `${url}/${vm.billingCycle._id}`
     $http.delete(deleteUrl, vm.billingCycle).then(function(response) {
       vm.refresh()
       msgs.addSuccess('Operação realizada com sucesso!!!')
     })
        .catch(function(response){
        msgs.addError(response.data.errors)
     })
        }
        // botões das Listas de Créditos
        //Créditos
      vm.addCredit = function(index) {
      vm.billingCycle.credits.splice(index + 1, 0, {})
    }

    vm.cloneCredit = function(index, {name, value}) {
      vm.billingCycle.credits.splice(index +1, 0, {name, value})
      vm.calculateValues()
    }

      vm.deleteCredit = function(index) {
        if (vm.billingCycle.credits.length > 1) {
          vm.billingCycle.credits.splice(index, 1)
          vm.calculateValues()
        }
      }
      //Débitos
      vm.addDebt = function(index) {
      vm.billingCycle.debts.splice(index + 1, 0, {})
    }

      vm.cloneDebt = function(index, {name, value}){
      vm.billingCycle.debts.splice(index +1, 0, {name, value})
      vm.calculateValues()
    }

      vm.deleteDebt = function(index) {
        if (vm.billingCycle.debts.length > 1) {
          vm.billingCycle.debts.splice(index, 1)
          vm.calculateValues()
   }
}
   // Sumário
    vm.calculateValues = function() {
      vm.credit = 0
      vm.debt = 0

      if(vm.billingCycle) { // forEach, isNaN e parseFloat interferem na atualização
        vm.billingCycle.credits.forEach(function({value}) {
          vm.credit += !value || isNaN(value) ? 0 : parseFloat(value)
        })
        vm.billingCycle.debts.forEach(function({value}){
          vm.debt += !value || isNaN(value) ? 0 : parseFloat(value)
        })
      }

      vm.total = vm.credit - vm.debt
    }//é necesssário que chame o método

        vm.refresh()

      }
 }) ()
