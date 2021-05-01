<template>
	
<div class="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">

    <div class="kt-container ">

        <div class="kt-portlet kt-portlet--tabs kt-portlet--height-fluid">
        	<div class="kt-portlet__head">
        		<div class="kt-portlet__head-label">
        			<h3 class="kt-portlet__head-title">
        				Ad Accounts
        			</h3>
        		</div>
        		 
        	</div>
            <div class="kt-portlet__body position-relative">
                <loading :active.sync="isLoading" 
                :can-cancel="false" 
                :is-full-page="false"></loading>

                <table class="table table-head-bg-brand">
                    <thead class="thead-inverse">
                        <tr>

                             
                            <th>Name</th>
                            <th>Balance</th>
                            <th>Current Spent</th>
                            <th>Default</th>
                            <!-- <th>Operation</th> -->
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="tr-link" v-for="(ac,i) in accounts" :key="'id_'+i">
                            
                        
                       <!--  <router-link class="tr-link"  :to="{ name: 'automation.ad_compaigns', query:{channel:channel,adaccount:ac.id,account_id:ac.account_id,acid:acid}, params:{
                        currency: ac.currency
                    } }" tag="tr"> -->
                        <!-- <tr > -->
                            
                            <td  @click="selectAdAccount(ac)">{{ ac.name }}</td>
                            <td  @click="selectAdAccount(ac)">{{ ac.balance }} {{ ac.currency }}</td>
                            <td  @click="selectAdAccount(ac)">{{ ac.amount_spent }} {{ ac.currency }}</td>
                            <td>
                                <label class="m-checkbox">

                                        <input v-model="fb_default_ad_account" type="checkbox" :true-value="ac.id" false-value="" ><span></span>

                                    </label>
                            </td>
                            <!-- <td>

                                <div class="dropdown">
                                <a  type="text" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <i class="fa fa-cog"></i>
                                </a>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                  <a class="dropdown-item text-danger" href="#">Remove</a>
                                </div>
                              </div>

                            </td> -->
                        <!-- </tr> -->
                        <!-- </router-link> -->
                        </tr>
                    </tbody>
                </table>
            </div>
            

        </div>

	</div>


             
</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default{
		name:"AdAccounts",
		data(){
			return {
                fb_default_ad_account:'',
				accounts:[],
                channel:"",
                acid:"",
               
                isLoading:false,
			}
		},

        computed:{
            ...mapState({
                defaults: state => state.defaults,
              })
        },

		methods:{
            selectAdAccount(ac){
                this.$store.commit("SET_ADACCOUNT",ac);
            
              

                this.$router.push({ name:'automation.rules', query:{channel:this.channel,adaccount:ac.id,account_id:ac.account_id,acid:this.acid},params:{
                        currency: ac.currency
                    }  });
            },
			fetch(channel,acid){
                this.isLoading = true;
                var params = [
                 `channel=${channel}`,
                 `acid=${acid}`,
              ].join('&');

				axios.get('/api/adaccounts?'+params)
					  .then((response) => {
                        if(this.getPropIfExist(response.data,'error')){
                            if(response.data.error.code == 190){
                                this.notifyFailed('Please Reconnect your Facebook Account');
                                this.$router.push('/app/automation/accounts?channel=fb&reconnect=');
                            }
                        }else{
                            this.accounts = response.data.data;
                        
                        }
                        
					     
					  })
					  .catch(function (error) {
					   
					  }).finally( () => {
                        this.isLoading = false;
                      });

			},


		},
        watch:{
            'fb_default_ad_account' : function(val){
                this.updateSetting('fb_default_ad_account',val);
            }
        }, 
		created(){

            if(this.$route.query.default != 'false' && this.$route.query.default != false){
             
                if(!this.defaults.fb_default_ad_account){
                 
                }else if(this.defaults.fb_default_ad_account && this.defaults.fb_default_ad_account){
                    this.$router.push('/app/automation/rules?channel=fb&acid='+this.defaults.fb_default_account+'&adaccount='+this.defaults.fb_default_ad_account);
                }else{
                    this.$router.push('/app/automation/adaccounts?channel=fb&acid='+this.defaults.fb_default_ad_account);
                }

            }
            
            if(this.defaults.fb_default_ad_account){
                this.fb_default_ad_account = this.defaults.fb_default_ad_account;
            }

            if((this.channel = this.$route.query.channel) && (this.acid = this.$route.query.acid)){
                this.fetch(this.channel,this.acid);   
            }
			 
		}
	}

</script>