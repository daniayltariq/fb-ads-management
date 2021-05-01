<template>

<div class="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">

    <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">

         <div class="row">
            <div class="col-lg-12">

                <loading :active.sync="isLoading" 
                :can-cancel="false" 
                :is-full-page="false"></loading>

                <div class="kt-portlet kt-portlet--height-fluid">
                        <div class="kt-portlet__body kt-portlet__body--fit p-5">

                            <h1>Integration</h1>
                            <hr>

                            <div class="mb-3">
                                <h4>Facebook </h4>
                                <p>Create Facebook ads and automate them using advanced automated rules.</p>
                            </div>
                            <div class="row">
             
                                <div class="col-lg-4">
                                    <div class="kt-portlet kt-callout card-borderd">
                                        <div class="kt-portlet__body">
                                            <div class="kt-callout__body">
                                                <div class="kt-callout__content d-flex">
                                                    <div class="mr-3">
                                                        <img src="/frontend/img/facebook.svg" style="height:40px" alt="">
                                                    </div>
                                                    <div>
                                                        <h4 class="mb-0">Facebook Ads</h4>
                                                        <p class="kt-callout__desc">
                                                            <span v-if="fb_account">{{ fb_account.account_id }}</span><span v-else> No accounts connected</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="kt-callout__action">
                                                    <router-link v-if="fb_account" :to="'/app/integration/facebook?default='+$route.query.default" class="btn btn-bold btn-upper btn-font-sm  btn-outline-dark">Manage</router-link>
                                                    <a v-else :href="app_url+'/connect/facebook'" class="btn btn-bold btn-upper btn-font-sm  btn-outline-dark">Connect</a>
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
        
    </div>      
</div>
</template>

<script>
    import { mapState } from 'vuex'
    export default{
        name:"Settings",
        data(){
            return {

                app_url:"",
                fb_default_ad_account:'',
                fb_account:{},
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
            
            fetchAccount(channel){
                this.isLoading = true;
                axios.get('/api/accounts?data=single&channel=fb')
                      .then((response) => {
                         this.fb_account = response.data;
                         
                      })
                      .catch(function (error) {
                       
                      }).finally( () => {
                        this.isLoading = false;
                      });
            },

        },
        watch:{
           
        }, 
        created(){
             this.app_url = window.app_url;
             this.fetchAccount();
 
        }
    }

</script>