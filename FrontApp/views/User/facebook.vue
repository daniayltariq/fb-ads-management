<template>

<div class="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">

    <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">

         <div class="row">
            <div class="col-lg-12">

                

                <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__body kt-portlet__body--fit p-5">

                            <h1>Facebook</h1>
                            <hr class="w-100">

                            <div class="section__1">
                                
                                <div class="row">

                                    <div class="col-lg-4" >
                                        <div class="my-3">
                                            <h4>Accounts <a href="/connect/facebook" class="btn btn-sm btn-primary float-right">Add</a></h4>
                                        </div>
                                    </div>
                                 </div>
                                <div class="row">

                                  
                 
                                    <div class="col-lg-4" >
                                        <loading :active.sync="isLoading" 
                                            :can-cancel="false" 
                                            :is-full-page="false"></loading>
                                        <div class="kt-portlet kt-callout card-borderd" v-for="(ac,i) in accounts" :key="'id_'+i" @click="fetchAdAccount(ac.account_id)">
                                            <div class="kt-portlet__body">
                                                <div class="kt-callout__body">
                                                    <div class="kt-callout__content d-flex">
                                                        <div class="mr-3">
                                                            <img :src="ac.photo" style="height:40px" class="rounded-circle" alt="">
                                                        </div>
                                                        <div>
                                                            <h4 class="mb-0">{{ ac.name }}</h4>
                                                            <p class="kt-callout__desc">
                                                                <span>{{ ac.account_id }}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                   
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                     
                                </div>
                            </div>
                            <div class="section__2">

                                <div class="my-3">
                                    <h4>Ad Account</h4>
                                </div>


                                <div class="row">
                 
                                    <div class="col-lg-4" >
                                        <loading :active.sync="isLoading2" 
                                            :can-cancel="false" 
                                            :is-full-page="false"></loading>
                                        <div class="kt-portlet kt-callout card-borderd" v-for="(adac,i) in ad_accounts" :key="'id_'+i">
                                            <div class="card-header-right kt-portlet__head-toolbar d-flex justify-content-end">
                                                <a href="#" class="btn btn-sm" >
                                                   <span v-if="(defaults.fb_default_ad_account == adac.id)">Default</span>
                                                   <span v-on:click.prevent="setDefault(adac.id,selected_acid)" v-else>Set Default</span>
                                                </a>
                                               <!--  <div class="dropdown-menu dropdown-menu-fit dropdown-menu-right">
                                                    <ul class="kt-nav">
                                                        
                                                        <li class="kt-nav__item">
                                                            <a href="#" class="kt-nav__link" @click.prevent="setDefault(true)">
                                                                <i class="kt-nav__link-icon flaticon2-delete"></i>
                                                                <span class="kt-nav__link-text">Set Default</span>
                                                            </a>

                                                        </li>

                                                    </ul>
                                                </div> -->
                                            </div>
                                            <div class="kt-portlet__body">
                                                <div class="kt-callout__body">
                                                    <div class="kt-callout__content d-flex">
                                                       
                                                        <router-link tag="span" :to="'/app/automation/rules?channel=fb&acid='+selected_acid+'&adaccount='+adac.id">
                                                            <div>
                                                                <h4 class="mb-0">{{ adac.name }}</h4>
                                                                <div>
                                                                         Balance {{ adac.balance }} {{ adac.currency }}
                                                                    </div>
                                                                    <div>
                                                                        Current Spent {{ adac.balance }} {{ adac.currency }}
                                                                    </div>
                                                            </div>
                                                        </router-link>
                                                    </div>
                                                   
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                     
                                </div>


                                <!-- <div class="kt-widget kt-widget--project-1" v-for="(ac,i) in ad_accounts" :key="'id_'+i">
                                    <div class="kt-widget__head">
                                        <div class="kt-widget__label">
                                             
                                            <div class="kt-widget__info kt-margin-t-5">
                                                <a href="#" class="kt-widget__title">
                                                   {{ ac.name }}                                              
                                                </a>
                                                <span class="kt-widget__desc">
                                                    Balance {{ ac.balance }} {{ ac.currency }}
                                                </span>

                                                <span class="kt-widget__desc">
                                                    Current Spent {{ ac.balance }} {{ ac.currency }}
                                                </span>

                                            </div>
                                        </div>
                                        <div class="kt-portlet__head-toolbar">
                                            <a href="#" class="btn btn-clean btn-sm btn-icon btn-icon-md" data-toggle="dropdown">
                                                <i class="flaticon-more-1"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-fit dropdown-menu-right">
                                                <ul class="kt-nav">
                                                    
                                                    <li class="kt-nav__item">
                                                        <a href="#" class="kt-nav__link" @click.prevent="setDefault(true)">
                                                            <i class="kt-nav__link-icon flaticon2-delete"></i>
                                                            <span class="kt-nav__link-text">Set Default</span>
                                                        </a>

                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                 

                                    <div class="kt-widget__footer">
                                        <div class="kt-widget__wrapper">
                                            

                                            <div class="kt-widget__section">
                                                
                                                <router-link tag="button" class="btn btn-brand btn-sm btn-upper btn-bold" :to="{ name: 'automation.accounts', query:{channel:'fb',default:false}}">Manage</router-link>

                                            </div>
                                        </div>
                                    </div>
                                </div> -->
                                 
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
        name:"Settings",
        data(){
            return {
                selected_acid:'',
                ad_accounts:[],

                accounts:[],
                fb_default_ad_account:'',
                fb_account:{},
                channel:"",
                acid:"",
               
                isLoading:false,
                isLoading2:false,
            }
        },

        computed:{
           ...mapState({
                defaults: state => state.defaults,
              })
        },

        methods:{
            setDefault(val,selected_acid = null){
                this.updateSetting('fb_default_ad_account',val,selected_acid);
            },
            fetchAccount(){
                this.isLoading = true;
                axios.get('/api/accounts?channel=fb')
                      .then((response) => {
                         this.accounts = response.data;
                         this.isLoading = false;

                         if(this.accounts.length > 0){
                            this.fetchAdAccount(this.accounts[0].account_id);
                         }

                      })
                      .catch(function (error) {
                       
                      }).finally( () => {
                        this.isLoading = false;
                      });
            },

            fetchAdAccount(acid){
                this.isLoading2 = true;
                var params = [
                 `channel=fb`,
                 `acid=${acid}`,
              ].join('&');

                this.selected_acid = acid;
                axios.get('/api/adaccounts?'+params)
                      .then((response) => {
                        if(this.getPropIfExist(response.data,'error')){
                            if(response.data.error.code == 190){
                                this.notifyFailed('Please Reconnect your Facebook Account');
                                this.$router.push('/app/automation/accounts?channel=fb&reconnect=');
                            }
                        }else{
                            this.ad_accounts = response.data.data;
                        }
                        
                      })
                      .catch(function (error) {
                       
                      }).finally( () => {
                        this.isLoading2 = false;
                      });
            },

        },
        watch:{
           
        }, 
        created(){

              if(this.$route.query.default != 'false' && this.$route.query.default != false){
               
                if(!this.defaults.fb_default_account){
                 
                }else if(this.defaults.fb_default_account && this.defaults.fb_default_ad_account){
                    this.$router.push('/app/automation/rules?channel=fb&acid='+this.defaults.fb_default_account+'&adaccount='+this.defaults.fb_default_ad_account);
                }else{
                    // this.$router.push('/app/automation/adaccounts?channel=fb&acid='+this.defaults.fb_default_account);
                }

            }

            if(this.defaults.fb_default_account){
                this.fb_default_account = this.defaults.fb_default_account;
            }

            
            this.app_url = window.app_url;

            this.fetchAccount();
             
        }
    }

</script>

<style>
.card-header-right{
    position:absolute;
    right:10px;
}
</style>