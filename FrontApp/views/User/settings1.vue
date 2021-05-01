<template>

<div class="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">

    <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">


        <div class="row">
            <div class="col-lg-4">

                <div class="kt-portlet kt-portlet--height-fluid">
            <div class="kt-portlet__body kt-portlet__body--fit">
                <!--begin::Widget -->
                <div class="kt-widget kt-widget--project-1">
                    <div class="kt-widget__head">
                        <div class="kt-widget__label">
                            <div class="kt-widget__media">
                                <span class="kt-media kt-media--lg kt-media--circle"> 
                                    <img :src="defaults.fb_default_photo" alt="image">  
                                </span>
                            </div>
                            <div class="kt-widget__info kt-margin-t-5">
                                <a href="#" class="kt-widget__title">
                                    {{ defaults.fb_default_name }}                                               
                                </a>
                                <span class="kt-widget__desc">
                                    ID {{defaults.fb_default_account}}
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
 
                                            <router-link :to="{ name: 'automation.adaccounts', query:{channel:'fb',acid:defaults.fb_default_account,account_id:defaults.fb_default_account,default:false}}" class="kt-nav__link">
                                           <i class="kt-nav__link-icon flaticon2-settings"></i>
                                            <span class="kt-nav__link-text">Manage AdAccounts</span>
                                        </router-link>
                                    </li>

                                    <li class="kt-nav__item">
                                        <a href="#" class="kt-nav__link">
                                            <i class="kt-nav__link-icon flaticon2-delete"></i>
                                            <span class="kt-nav__link-text">Remove</span>
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
 

                    <div class="kt-widget__footer">
                        <div class="kt-widget__wrapper">
                            <!-- <div class="kt-widget__section">
                                <div class="kt-widget__blog">
                                    <i class="flaticon2-list-1"></i>
                                    <a href="#" class="kt-widget__value kt-font-brand">72 Tasks</a>
                                </div>

                                <div class="kt-widget__blog">
                                    <i class="flaticon2-talk"></i>
                                    <a href="#" class="kt-widget__value kt-font-brand">648 Comments</a>
                                </div>
                            </div> -->

                            <div class="kt-widget__section">
                                
                                <router-link tag="button" class="btn btn-brand btn-sm btn-upper btn-bold" :to="{ name: 'automation.accounts', query:{channel:'fb',default:false}}">Manage</router-link>

                            </div>
                        </div>
                    </div>
                </div>
                <!--end::Widget -->
            </div>
        </div>
                                
            </div>
        </div>

       <!--  <div class="kt-portlet kt-portlet--tabs kt-portlet--height-fluid">

            <div class="kt-portlet__head">
                <div class="kt-portlet__head-label">
                    <h3 class="kt-portlet__head-title">
                        Settings
                    </h3>
                </div>
            </div>
 
        
            <div class="row">
                <div class="col-xl-3">
                    
                    <div class="kt-portlet kt-portlet--height-fluid">
                        
                        <div class="kt-portlet__body">

                            <h3 class="kt-portlet__head-title">
                               Connect Facebook
                            </h3>
 
                            <div class="kt-widget kt-widget--user-profile-2">
 
                                <div class="kt-widget__footer">

                                    <router-link tag="button" class="btn btn-label-brand btn-lg btn-upper" :to="{ name: 'automation.accounts', query:{channel:'fb',default:false}}">
                                        Connect
                                    </router-link>

                                    
                                </div>
                            </div>         
                          
                        </div>
                    </div>
                   
                </div>


                <div class="col-xl-3">
                   
                    <div class="kt-portlet kt-portlet--height-fluid">
                        
                        <div class="kt-portlet__body">

                            <h3 class="kt-portlet__head-title">
                               Default AdAccount 
                            </h3>
 
                            <div class="kt-widget kt-widget--user-profile-2">
 
                                <div class="kt-widget__footer">
 
                                    <router-link :to="{ name: 'automation.adaccounts', query:{channel:'fb',acid:defaults.fb_default_account,account_id:defaults.fb_default_account,default:false}}" class="btn btn-label-brand btn-lg btn-upper">
                                       Set
                                    </router-link>

                                </div>
                            </div>         
                          
                        </div>
                    </div>
                   
                </div>

            </div>
        </div> -->
    </div>      
</div>
</template>

<script>
    import { mapState } from 'vuex'
    export default{
        name:"Settings",
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
            

        },
        watch:{
           
        }, 
        created(){

             
        }
    }

</script>