require('./bootstrap');

import Vue from 'vue'

import router from './router'

import App from './App.vue'

import Loading from 'vue-loading-overlay';

import 'vue-loading-overlay/dist/vue-loading.css';

import VueFormWizard from 'vue-form-wizard'

import 'vue-form-wizard/dist/vue-form-wizard.min.css'

import moment from 'moment'

Vue.use(VueFormWizard)

import store from './store'

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

Vue.component('date-picker',DatePicker)

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.mixin({
	 
	methods:{
		$can(permissions) {
	   		if(!permissions){
		        return true;
		      }else{
		      	 
		      	if(window.auth_user_permissions){

		      		if(permissions.filter(e => window.auth_user_permissions.indexOf(e) !== -1).length > 0){
		      			return true;
		      		}else{
		      			return false;
		      		}
		      	}
		      	return false;
		      }
	   		
        	// return this.authUser.permissions.indexOf(permissionName) !== -1;
	    },
		getPropIfExist(data,field,fallback_res = false){
			if(typeof data === 'object' && data !== null){
				return data[field];
			}
			if(fallback_res !== false){
				return fallback_res;
			}
			return '';
		},
		formatDate(date,format = 'D MMM YYYY'){
			if(date){
				return moment(date).format(format);
			}
		},
		
		getStatus(status){
			if(status == 'ACTIVE'){
				return true;
			}else if(status == '1'){
				return true;
			}else if(status == 'true'){
				return true;
			}
			return false;
		},

		getPropIfExist(data,field,fallback_res = false){
			if(typeof data === 'object' && data !== null){
				return data[field];
			}
			if(fallback_res !== false){
				return fallback_res;
			}
			return '';
		},

		notEmptyObject(someObject){
	      return Object.keys(someObject).length
	    },

		notifySuccess(msg,option =  { delay:2000,allow_dismiss: true,animate: {
				enter: '',
				exit: ''
			},placement: {
				from: "bottom",
				align: "center"
			},}){
					$.notify(msg, option);
				},
		notifyFailed(msg,title = null,option =  { delay:10000,type: "danger",allow_dismiss: true,animate: {
					enter: '',
					exit: ''
				},placement: {
			from: "bottom",
			align: "center"
		},}){

		$.notify({
			title:title,
			message:msg,
			type: 'danger'
		}, option);

		},

		getSetting(){

			axios.get('/api/setting/default/fb')
				  .then((response) => {
				  
				  	this.$store.commit("SET_DEFAULT_SETTING",response.data);
				 	this.show = true;
				  })
				  .catch(function (error) {
				   
				  }).finally( () => {
                     
                  });

		},


		updateSetting(key_name,value,acid = null){

				axios.post('/api/setting/default/fb',{
					"key_name" : key_name,
					"value" : value,
					"acid" : acid,
				})
					  .then((response) => {

					  	this.getSetting();
					    
					  });

			},

		objectToQueryString(obj) {
		  var str = [];
		  for (var p in obj)
		    if (obj.hasOwnProperty(p)) {
		      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		    }
		  return str.join("&");
		},


		isMainAccount(){

			if(window.auth_account_type  == 'MAIN_ACCOUNT'){
				return true;
			}else{
				return false;
			}
		},


		getCurrentSpend(){

			return new Promise(function(resolve,reject){

				axios.get('/api/info/get_adspent')
				  .then((response) => {
				  resolve(response);
				  })
				  .catch(function (error) {
				   reject(error);
				  });

			});
			

		}
 
	},

});

Vue.component('loading',Loading)
new Vue({
  data(){
  	return {
  		show:false
  	}
  },
  router,
  store,
  methods:{
  	getSetting(){

  		axios.get('/api/setting/default/fb')
				  .then((response) => {
				  
				  	this.$store.commit("SET_DEFAULT_SETTING",response.data);
				 	this.show = true;
				  })
				  .catch(function (error) {
				   
				  });

  	}
  },
  mounted(){
  	this.getSetting();
  }
}).$mount('#app');