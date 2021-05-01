<template>

<div class="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">

    <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">


        <div class="row">
            <div class="col-lg-4">

                <div class="kt-portlet kt-portlet--height-fluid">
            <div class="kt-portlet__body kt-portlet__body--fit">

                <loading :active.sync="isLoading" 
                :can-cancel="false" 
                :is-full-page="false"></loading>
              
                        <div class="kt-widget kt-widget--project-1" v-for="(ac,i) in accounts" :key="'id_'+i">
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
            setDefault(val){
                this.updateSetting('fb_default_ad_account',val);
            },
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