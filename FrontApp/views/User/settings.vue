<template>

<div class="kt-portlet kt-portlet--last kt-portlet--head-lg kt-portlet--responsive-mobile" id="kt_page_portlet">
            <password-change-modal :active="ChangePasswordModal" @close="userModalClose"></password-change-modal>
            <div class="kt-portlet__body">

                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#" data-target="#kt_tabs_1_1">Profile</a>
                    </li>
                    
                    <li v-if="isMainAccount()" class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#kt_tabs_1_2">Team</a>
                    </li>
                    
                </ul>

                <div class="tab-content">
                    <div class="tab-pane active" id="kt_tabs_1_1" role="tabpanel">
                        <form class="kt-form" id="kt_form">
                            <div class="row">
                             
                                <div class="col-xl-12">
                                    <div class="kt-section kt-section--first">
                                        <div class="kt-section__body">
                                            <h3 class="kt-section__title kt-section__title-lg">Profile</h3>
                                             

                                            <div class="form-group">
                                                <label>Full Name</label>
                                                <input type="email" class="form-control" v-model="data.name" placeholder="Enter full name">
                                                <!-- <span class="form-text text-muted">Please enter your full name</span> -->
                                            </div>

                                             <div class="form-group">
                                                <label>Email</label>
                                                <input type="email" class="form-control" v-model="data.email" placeholder="Email">
                                             
                                            </div>

                                            <div v-if="isMainAccount()" class="form-group">
                                                <label>Company Name</label>
                                                <input type="email" class="form-control" v-model="data.business_name" placeholder="Company Name">
                                            </div>


                                            <div class="form-group">
                                                
                                                <button type="button" class="btn btn-outline-primary btn-sm kt-margin-t-5 kt-margin-b-5">Update</button>
                                                 
                                            </div>

                                            <hr>


                                            <div class="kt-section kt-section--last">
                                                <div class="kt-section__body">
                                                    <h3 class="kt-section__title kt-section__title-lg mb-2">Change Password:</h3>
                                                    <div class="form-group">
                 
                                                        <div class="">
                                                            <span @click="ChangePasswordModal = true" class="btn btn-outline-primary btn-sm kt-margin-t-5 kt-margin-b-5">Change Password</span>
                 
                                                        </div>
                                                    </div>
                                                     
                                                </div>
                                            </div>
         
                                        </div>
                                    </div>
                                     
                                </div>
                                 
                            </div>
                        </form>
                    </div>
                    <div v-if="isMainAccount()" class="tab-pane" id="kt_tabs_1_2" role="tabpanel">
                         
                        <team-index></team-index>
                             
                    </div>
                     
                </div>

                
            </div>
        </div>
 
</template>

<script>
    import PasswordChangeModal from './PasswordChange';
    import TeamIndex from '../Team/index';

    import { mapState } from 'vuex'
    export default{
        components:{
            PasswordChangeModal,
            TeamIndex
        },
        name:"Settings",
        data(){
            return {
                data:{},
                ChangePasswordModal:false,
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

            userModalClose(val){
                this.ChangePasswordModal = val.status;
               
                
            },

        },
        watch:{
           
        }, 
        created(){
             this.data = window.auth_user;             
        }
    }

</script>