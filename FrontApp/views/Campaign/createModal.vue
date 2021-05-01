<template>
	<div>
     <div class="modal modal-scrollable" :class="{show:modalActive,'d-block':modalActive}" v-if="modalActive" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered " role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Create new Campaign</h5>
                    
                </div>
                 <loading :active.sync="isLoading" 
                :can-cancel="false" 
           
                :is-full-page="false"></loading>
                <div class="modal-body">

                    <form action="" @submit.prevent="">
                        <h6>Choose a Campaign Objective</h6>
                        
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">

                                    <label>Awareness</label>
                                        <div class="kt-radio-list">
                                            <label class="kt-radio">
                                                <input type="radio" value="BRAND_AWARENESS" name="objective" v-model="form.objective"> Brand Awareness
                                                <span></span>
                                            </label>
                                            <label class="kt-radio">
                                                <input type="radio" value="REACH" name="objective" v-model="form.objective"> Reach
                                                <span></span>
                                            </label>
                                            
                                        </div>                            
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Consideration</label>
                                        <div class="kt-radio-list">
                                            <label class="kt-radio">
                                                <input type="radio" value="LINK_CLICKS" name="objective" v-model="form.objective"> Traffic
                                                <span></span>
                                            </label>
                                            <label class="kt-radio">
                                                <input type="radio" value="POST_ENGAGEMENT" name="objective" v-model="form.objective"> Engagement
                                                <span></span>
                                            </label>
                                            <label class="kt-radio">
                                                <input type="radio" value="APP_INSTALLS" name="objective" v-model="form.objective"> App installs
                                                <span></span>
                                            </label>

                                            <label class="kt-radio">
                                                <input type="radio" value="VIDEO_VIEWS" name="objective" v-model="form.objective"> Video views
                                                <span></span>
                                            </label>

                                            <label class="kt-radio">
                                                <input type="radio" value="LEAD_GENERATION" name="objective" v-model="form.objective"> Lead Generation
                                                <span></span>
                                            </label>

                                            <label class="kt-radio">
                                                <input type="radio" value="MESSAGES" name="objective" v-model="form.objective"> Messages
                                                <span></span>
                                            </label>
                                            
                                        </div>                            
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Conversion</label>
                                        <div class="kt-radio-list">
                                            <label class="kt-radio">
                                                <input type="radio" value="CONVERSIONS" name="objective" v-model="form.objective"> Conversions
                                                <span></span>
                                            </label>
                                            <label class="kt-radio">
                                                <input type="radio" value="PRODUCT_CATALOG_SALES" name="objective" v-model="form.objective"> Catalog Sales
                                                <span></span>
                                            </label>

                                            <label class="kt-radio">
                                                <input type="radio" value="STORE_VISITS" name="objective" v-model="form.objective"> Store Traffic
                                                <span></span>
                                            </label>
                                            
                                        </div>                            
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group ">
                                    <label>Campaign Name</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" v-model="form.name" placeholder="Name">
                                    </div>
                                </div>
                            </div>
                           <!--  <div class="col-md-6">
                                <div class="form-group ">
                                    <label>Daily Budget</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" v-model="form.daily_budget" placeholder="Daily Budget">
                                    </div>
                                </div>
                            </div>   -->
                        </div>
                        
                        <hr>
                        <h5 class="d-flex align-items-centers"><span>Campaign Budget Optimization</span> <span class="ml-2 kt-switch--sm kt-switch kt-switch--outline">
                                <label class="mb-0">
                                <input v-model="form.campaign_budget_optimization" type="checkbox" value="1">
                                <span></span>
                                </label>
                                </span></h5>


                        <div v-if="form.campaign_budget_optimization">

                            <div class="form-group ">
                                <label>Campaign Budget</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                         <select class="form-control" v-model="form.campaign_budget">
                                            <option value="daily_budget">Daily Budget</option>
                                            <option value="lifetime_budget">Lifetime Budget</option>
                                        </select>
                                    </div>
                                    <input v-if="form.campaign_budget == 'daily_budget'" v-model="form.daily_budget" type="text" class="form-control">                           
                                    <input v-if="form.campaign_budget == 'lifetime_budget'" v-model="form.lifetime_budget" type="text" class="form-control">

                                    <div class="input-group-append"><span class="input-group-text" id="basic-addon2">
                                        {{ currency }}
                                    </span></div>                        
                                </div>                      
                                
                            </div>

                        </div>
                        
                        <hr>
                        
                        <div class="row">
                            
                            <div class="col-md-6">
                                <div class="form-group ">
                                    <label>Bid Strategy</label>
                                    <div class="input-group">

                                        <select v-model="form.bid_strategy" class="form-control">
                                            <option value="" selected="">None</option>
                                            <option value="LOWEST_COST_WITHOUT_CAP">LOWEST COST WITHOUT CAP</option>
                                            <option value="LOWEST_COST_WITH_BID_CAP">LOWEST COST WITH BID CAP</option>
                                            <option value="TARGET_COST">TARGET COST</option>
                                            <option value="COST_CAP">COST CAP</option>
                                        </select>

                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group ">
                                    <label>Status</label>
                                    <div class="input-group">
                                 
                                        <select v-model="form.status" class="form-control">
                                            <option value="PAUSED" selected="">Paused</option>
                                            <option value="ACTIVE">Active</option>
                                             
                                        </select>

                                    </div>
                                </div>
                            </div>

                        </div>

                        
                            
                    </form>
                </div>
                <div class="modal-footer d-block">

                    <div v-if="msg" class="alert fade show" :class="{'alert-danger' : (type == 'danger')}" role="alert">
                         
                        <div class="alert-text">{{ msg }}</div>
                        <div class="alert-close">
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true"><i class="la la-close"></i></span>
                            </button>
                        </div>
                    </div>

                    <button @click="closeModal" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button @click="post" type="button" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>

     <div class="modal-backdrop" :class="{show:modalActive}" v-if="modalActive" ></div>   
    </div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
        name:"CampaignCreateModal",
        props:{
            active:{
                type:Boolean,
                default:false,
            },
            adaccount : {
                type:String
            },
            acid : {
                type:String
            },
           
        },
		
		data(){
			return {
                modalActive:false,
                isLoading:false,

                msg:"",
                type:"",

				form : this.newForm()
			}
		},
        computed:{
           ...mapState(['currency'])
        },
		methods:{
            newForm(){
                return {
                    objective : "",
                    special_ad_categories : "NONE",
                    name : "",
                    status : "PAUSED",
                    daily_budget : "",
                    bid_strategy : "",

                    campaign_budget_optimization:'',
                    campaign_budget:'daily_budget',
                };
            },
            closeModal(res = null){
                this.modalActive = false;
                var res = {
                    'active' : this.modalActive,
                    'res' :res,
                }
                this.$emit('close',res);
            },
	 
            post(){
                this.msg = "";
                this.isLoading = true;
                var params = [
                 `acid=${this.acid}`,
                 `adaccount=${this.adaccount}`,
              ].join('&');

                axios.post('/api/ad_compaigns?'+params,this.form)
                      .then((response) => {
                       
                        if(response.data.error){
                            this.type = 'danger';
                            this.msg = response.data.error.error_user_msg;
                            // this.notifyFailed(response.data.error.error_user_msg);
                        }

                        if(response.data.id){
                            this.notifySuccess('Campaign Added.');
                            this.form = this.newForm();
                            this.closeModal('reload');
                        }
                         // this.accounts = response.data.data;
                         // this.isLoading = false;
                      })
                      .catch(function (error) {
                       
                      }).finally( () => {
                        this.isLoading = false;
                      });;

            }

		},
		created(){
            
		},

        watch:{
            active:function(val){
                this.modalActive = val;
                this.msg = '';
                this.type = '';
            },

            'form.campaign_budget': function(val){
                console.log(val);
                if(val == 'daily_budget'){
                    this.form.lifetime_budget = '';
                }else if(val == 'lifetime_budget'){
                    this.form.daily_budget = '';
                }
            }
        }
	}

</script>