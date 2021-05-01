<template>
	
<div class="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">

    <div class="kt-container ">

        <div class="kt-portlet kt-portlet--tabs kt-portlet--height-fluid">
        	<div class="kt-portlet__head">
        		<div class="kt-portlet__head-label">
        			<h3 class="kt-portlet__head-title">
        				Facebook Accounts
        			</h3>
        		</div>

        		<div class="kt-portlet__head-toolbar">
                     <div class="d-flex align-items-center">
                         <a :href="app_url+'/connect/facebook'" class="btn btn-sm btn-label-brand btn-bold">
                             Connect
                        </a>
                     </div>
                 </div>

        	</div>
        	<div class="kt-portlet__body">
        		 
        				<table v-if="accounts.length > 0" class="table table-striped">
		                  <thead>
		                  <tr>
		                    <th>Account</th>
		                    <th>Default</th>
		                    <th>Actions</th>
		                  </tr>
		                  </thead>
		                  <tbody>
		                  	<tr  v-for="(ac,i) in accounts">
		                  		<td>
		                  			<router-link tag="a" key="id" :to="{ name: 'automation.adaccounts', query:{channel:channel,acid:ac.account_id}}">

			        					<div class="kt-widget4__item">
			        						<div class="kt-widget4__pic kt-widget4__pic--pic d-inline-block">
			        							<i class="la la-facebook icon-size-40"></i>
			        						</div>
			        						<div class="kt-widget4__info d-inline-block">
			        							<a href="#" class="kt-widget4__username">
			        								{{ ac.name }}
			        							</a>
			        							<p class="kt-widget4__text">
			        								{{ ac.account_id }}
			        							</p>							 		 
			        						</div>
			        							 
			        					</div>  
		        					</router-link>
		                  		</td>
		                  		<td>
		                  			<label class="m-checkbox">

		                  				<input v-model="fb_default_account" type="checkbox" :true-value="ac.account_id" false-value="" ><span></span>

		                  			</label>
		                  		</td>

		                  		<td>
		                  			<a v-if="!ac.has_token" :href="app_url+'/connect/facebook'" class="btn btn-sm btn-label-brand btn-bold">
					                           Reconnect
					                        </a>
		                  		</td>
		                  	</tr>
		                  </tbody>
		              </table>


        				<div v-if="accounts.length < 1"  class="row">
        					<div class="col-md-4">
        						<div class="kt-widget4">
        							

		        					<div class="kt-widget4__item">
		        						Connect your account to proceed.
		        					</div>
		        				</div> 
		        			</div>
        				</div>            
        		 

        			
        		 
        	</div>
        </div>

	</div>


             
</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default{
		name:"Accounts",
		data(){
			return {
				accounts:[],
				channel : '',
				isLoading:false,
				fb_default_account : '',
				app_url : "",
			}
		},


		 computed:{
            ...mapState({
                defaults: state => state.defaults,
              })
        },

		methods:{
			fetchAccount(channel){
				this.isLoading = true;
				axios.get('/api/accounts?channel='+channel)
					  .then((response) => {
					     this.accounts = response.data;
					     this.isLoading = false;
					  })
					  .catch(function (error) {
					   
					  }).finally( () => {
                        this.isLoading = false;
                      });
			},

 
			
		},
		created(){

			if(this.$route.query.default != 'false' && this.$route.query.default != false){
			   
				if(!this.defaults.fb_default_account){
			 	 
			 	}else if(this.defaults.fb_default_account && this.defaults.fb_default_ad_account){
			 		this.$router.push('/app/automation/rules?channel=fb&acid='+this.defaults.fb_default_account+'&adaccount='+this.defaults.fb_default_ad_account);
			 	}else{
			 		this.$router.push('/app/automation/adaccounts?channel=fb&acid='+this.defaults.fb_default_account);
			 	}

			}
			
			if(this.defaults.fb_default_account){
				this.fb_default_account = this.defaults.fb_default_account;
			}

			if(this.channel = this.$route.query.channel){

				// this.fetchSetting();
				this.fetchAccount(this.$route.query.channel);
			}

			this.app_url = window.app_url;
		},

		watch:{
			'fb_default_account' : function(val){

				this.updateSetting('fb_default_account',val);

			}
		}
	}

</script>