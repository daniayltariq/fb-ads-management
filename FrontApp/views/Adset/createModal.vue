<template>
	<div>
     <div class="modal modal-scrollable" :class="{show:modalActive,'d-block':modalActive}" v-if="modalActive" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered " role="document">
            <div class="modal-content modal-lg">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Create new Adset</h5>
                </div>
                 <loading :active.sync="isLoading" 
                :can-cancel="false" 
           
                :is-full-page="false"></loading>
                <div class="modal-body">
                    
                    <form action="" @submit.prevent="">
                         
                        <div class="form-group ">
                            <label>Adset Name</label>
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="form.name" placeholder="Name">
                            </div>
                        </div>

                        <div class="form-group ">
                            <label>Bid Strategy</label>
                            <div class="input-group">
                         
                                <select v-model="form.bid_strategy" class="form-control" >
                                    <option value="" selected="">None</option>
                                    <option value="LOWEST_COST_WITHOUT_CAP">LOWEST COST WITHOUT CAP</option>
                                    <option value="LOWEST_COST_WITH_BID_CAP">LOWEST COST WITH BID CAP</option>
                                    <option value="TARGET_COST">TARGET COST</option>
                                    <option value="COST_CAP">COST CAP</option>
                                </select>

                            </div>
                        </div>

                        <div class="form-group ">
                            <label>Targeting</label>
                            <div class="input-group">
                         
                                <select v-model="form.targeting.geo_locations.countries" class="form-control" multiple>
                                    <option value="">Select Country</option>
                                    <option v-for="(c,i) in countries" :value="c.COUNTRY_ISO">{{ c.NAME }}</option>
                                </select>

                            </div>
                        </div>

                        <div class="form-group ">
                            <label>Billing Event</label>
                            <div class="input-group">
                         
                                <select v-model="form.billing_event" class="form-control">

                                    <option value="" selected="">Billing Event </option>
                                    <option value="APP_INSTALLS">APP INSTALLS</option>
                                    <option value="IMPRESSIONS">IMPRESSIONS</option>
                                    <option value="LINK_CLICKS">COSTLINK CLICKS</option>
                                    <option value="OFFER_CLAIMS">OFFER CLAIMS</option>
                                    <option value="PAGE_LIKES">PAGE LIKES</option>
                                    <option value="POST_ENGAGEMENT">POST ENGAGEMENT</option>
                                    <option value="THRUPLAY">THRUPLAY</option>
                                    
                                </select>

                            </div>
                        </div>

                        <div class="form-group ">
                            <label>Bid Budget</label>
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="form.bid_amount" placeholder="Bid Budget">
                            </div>
                        </div>


                         <div class="form-group ">
                            <label>Daily Budget</label>
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="form.daily_budget" placeholder="Daily Budget">
                            </div>
                        </div>

                        <div class="form-group ">
                            <label>Daily Impressions</label>
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="form.daily_imps" placeholder="Daily Impressions">
                            </div>
                        </div>
 

                        <div class="form-group ">
                            <label>Daily Spend Cap</label>
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="form.daily_min_spend_target" placeholder="Daily Min Spend Target">
                            </div>
                        </div>

                        <div class="form-group ">
                            <label>Daily Min Spend Target</label>
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="form.daily_min_spend_target" placeholder="Daily Min Spend Target">
                            </div>
                        </div>

                        <div class="form-group ">
                            <label>Destination Type</label>
                            <div class="input-group">
                         
                                <select v-model="form.destination_type" class="form-control">
                                    <option value="UNDEFINED" selected="">UNDEFINED</option>
                                    <option value="WEBSITE">WEBSITE</option>
                                    <option value="APP">APP</option>
                                    <option value="MESSENGER">MESSENGER</option>
                                    <option value="APPLINKS_AUTOMATIC">APPLINKS AUTOMATIC</option>
                                    <option value="FACEBOOK">FACEBOOK</option>
                                     
                                </select>

                            </div>
                        </div>


                        <div class="form-group ">
                            <label>Lifetime Budget</label>
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="form.lifetime_budget" placeholder="Lifetime Budget">
                            </div>
                        </div>

                        <div class="form-group ">
                            <label>Lifetime Impressions</label>
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="form.lifetime_impression" placeholder="Lifetime Impression">
                            </div>
                        </div>

                        <div class="form-group ">
                            <label>Lifetime Min Spend Target</label>
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="form.lifetime_min_spend_target" placeholder="Lifetime Min Spend Target">
                            </div>
                        </div>

            

                        <div class="form-group ">
                            <label>Multi Optimization Goal Weight</label>
                            <div class="input-group">
                                <select v-model="form.multi_optimization_goal_weight" class="form-control">
                                    <option value="UNDEFINED" selected="">UNDEFINED</option>
                                    <option value="BALANCED">BALANCED</option>
                                    <option value="PREFER_INSTALL">PREFER INSTALL</option>
                                    <option value="PREFER_EVENT">PREFER_EVENT</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group ">
                            <label>Optimization Goal</label>
                            <div class="input-group">
                                <select v-model="form.optimization_goal" class="form-control">
                                    <option value="NONE" selected="">NONE</option>
                                    <option value="APP_INSTALLS">APP_INSTALLS</option>
                                    <option value="BRAND_AWARENESS">BRAND AWARENESS</option>
                                    <option value="AD_RECALL_LIFT">AD RECALL LIFT</option>
                                    <option value="CLICKS">CLICKS</option>
                                    <option value="ENGAGED_USERS">ENGAGED USERS</option>
                                    <option value="EVENT_RESPONSES">EVENT RESPONSES</option>
                                    <option value="IMPRESSIONS">IMPRESSIONS</option>
                                    <option value="LEAD_GENERATION">LEAD GENERATION</option>
                                    <option value="QUALITY_LEAD">QUALITY LEAD</option>
                                    <option value="LINK_CLICKS">LINK CLICKS</option>
                                    <option value="OFFER_CLAIMS">OFFER CLAIMS</option>
                                    <option value="OFFSITE_CONVERSIONS">OFFSITE CONVERSIONS</option>
                                    <option value="PAGE_ENGAGEMENT">PAGE ENGAGEMENT</option>
                                    <option value="PAGE_LIKES">PAGE LIKES</option>
                                    <option value="POST_ENGAGEMENT">POST ENGAGEMENT</option>
                                    <option value="REACH">REACH</option>
                                    <option value="SOCIAL_IMPRESSIONS">SOCIAL IMPRESSIONS</option>
                                    <option value="APP_DOWNLOADS">APP DOWNLOADS</option>
                                    <option value="TWO_SECOND_CONTINUOUS_VIDEO_VIEWS">TWO SECOND CONTINUOUS VIDEO VIEWS</option>
                                    <option value="LANDING_PAGE_VIEWS">LANDING PAGE VIEWS</option>
                                    <option value="VISIT_INSTAGRAM_PROFILE">VISIT INSTAGRAM PROFILE</option>
                                    <option value="VALUE">VALUE</option>
                                    <option value="THRUPLAY">THRUPLAY</option>
                                    <option value="REPLIES">REPLIES</option>
                                    <option value="DERIVED_EVENTS">DERIVED EVENTS</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group ">
                            <label>Optimization_Sub Event</label>
                            <div class="input-group">
                                <select v-model="form.optimization_sub_event" class="form-control">
                                    <option value="NONE" selected="">NONE</option>
                                    <option value="TRIP_CONSIDERATION">TRIP_CONSIDERATION</option>
                                    <option value="TRAVEL_INTENT">TRAVEL_INTENT</option>
                                    <option value="TRAVEL_INTENT_NO_DESTINATION_INTENT">TRAVEL_INTENT_NO_DESTINATION_INTENT</option>
                                    <option value="TRAVEL_INTENT_BUCKET_01">TRAVEL_INTENT_BUCKET_01</option>
                                    <option value="TRAVEL_INTENT_BUCKET_02">TRAVEL_INTENT_BUCKET_02</option>
                                    <option value="TRAVEL_INTENT_BUCKET_03">TRAVEL_INTENT_BUCKET_03</option>
                                    <option value="TRAVEL_INTENT_BUCKET_04">TRAVEL_INTENT_BUCKET_04</option>
                                    <option value="TRAVEL_INTENT_BUCKET_05">TRAVEL_INTENT_BUCKET_05</option>
                                </select>
                            </div>
                        </div>


                        <div class="form-group ">
                            <label>Application ID</label>
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="form.application_id" placeholder="Application ID">
                            </div>
                        </div>

                       

                        <div class="form-group ">
                            <label>Custom Event Type</label>
                            <div class="input-group">
                                <select v-model="form.multi_optimization_goal_weight" class="form-control">
                                    <option value="NONE" selected="">NONE</option>
                                    <option value="TRIP_CONSIDERATION">TRIP_CONSIDERATION</option>
                                    <option value="TRAVEL_INTENT">TRAVEL_INTENT</option>
                                    <option value="TRAVEL_INTENT_NO_DESTINATION_INTENT">TRAVEL_INTENT_NO_DESTINATION_INTENT</option>
                                    <option value="TRAVEL_INTENT_BUCKET_01">TRAVEL_INTENT_BUCKET_01</option>
                                    <option value="TRAVEL_INTENT_BUCKET_02">TRAVEL_INTENT_BUCKET_02</option>
                                    <option value="TRAVEL_INTENT_BUCKET_03">TRAVEL_INTENT_BUCKET_03</option>
                                    <option value="TRAVEL_INTENT_BUCKET_04">TRAVEL_INTENT_BUCKET_04</option>
                                    <option value="TRAVEL_INTENT_BUCKET_05">TRAVEL_INTENT_BUCKET_05</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group ">
                            <label>Tune for category</label>
                            <div class="input-group">
                                <select v-model="form.tune_for_category" class="form-control">
                                    <option value="NONE" selected="">NONE</option>
                                    <option value="EMPLOYMENT">EMPLOYMENT</option>
                                    <option value="HOUSING">HOUSING</option>
                                    <option value="CREDIT">CREDIT</option>
                                    <option value="CREDITISSUES_ELECTIONS_POLITICS">ISSUES_ELECTIONS_POLITICS</option>
                               
                                </select>
                            </div>
                        </div>

                        <div class="form-group ">
                            <label>Start Time</label>
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="form.start_time" placeholder="Start Time">
                            </div>
                        </div>


                        <div class="form-group ">
                            <label>End Time</label>
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="form.end_time" placeholder="End Time">
                            </div>
                        </div>


                        <div class="form-group ">
                            <label>Status</label>
                            <div class="input-group">
                         
                                <select v-model="form.status" class="form-control">
                                    <option value="PAUSED" selected="">Paused</option>
                                    <option value="ACTIVE">Active</option>
                                     
                                </select>

                            </div>
                        </div>
                            
                    </form>
                </div>
                <div class="modal-footer d-block">

                    <div v-if="msg" class="alert fade show" :class="{'alert-danger' : (type == 'danger')}" role="alert">
                         
                        <div class="alert-text">{{ msg }}</div>
                        <div class="alert-close">
                            <button type="button" class="close" @click="msg = ''">
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
	
	export default{
        name:"AdsetCreateModal",
        props:{
            active:{
                type:Boolean,
                default:false,
            },
            adaccount : {
                type:String
            },
            campaign : {
                type:String
            },
            token : {
                type:String
            }

        },
		
		data(){
			return {
                modalActive:false,
                isLoading:false,
                countries:[],
                msg:"",
                type:"",

				form : {
                    objective : "",
                    special_ad_categories : "NONE",
                    name : "",
                    status : "PAUSED",
                    bid_strategy : "",

                    daily_budget : "",
                    daily_imps : "",
                    daily_min_spend_target : "",
                    destination_type : "",

                    lifetime_budget : "",
                    lifetime_impression : "",
                    lifetime_min_spend_target : "",

                    bid_amount : "",
                    billing_event : "",
                   
                    multi_optimization_goal_weight : "",
                    optimization_goal : "",
                    optimization_sub_event : "",

                    application_id : "",

                    start_time : "",
                    end_time : "",

                    tune_for_category : "",
                    targeting :  {
                                     "geo_locations":{
                                       "countries":[],
                                     },
                                     "age_min":25,
                                     "age_max":40,
                                     "custom_audiences":[],
                                     "excluded_custom_audiences":
                                       [],
                                 },

                    campaign_id : "",
                }
			}
		},
       
		methods:{

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
                 `tk=${this.token}`,
                 `adaccount=${this.adaccount}`,
                 `campaign=${this.campaign}`,
              ].join('&');

                axios.post('/api/ad_compaign/'+this.campaign+'/adsets?'+params,this.form)
                      .then((response) => {
                       
                        if(response.data.error){
                            this.type = 'danger';
                            if(this.msg = response.data.error.error_user_msg){
                               
                            }else{
                                this.msg = response.data.error.message;
                            }
                            
                            // this.notifyFailed(response.data.error.error_user_msg);
                        }

                        if(response.data.id){
                            this.notifySuccess('Adset Created.');
                            this.closeModal('reload');
                        }
                         // this.accounts = response.data.data;
                         // this.isLoading = false;
                      })
                      .catch(function (error) {
                       
                      }).finally( () => {
                        this.isLoading = false;
                      });;

            },

            getCountry(){

                axios.get('/api/countries').then( (response) =>{

                    this.countries = response.data.data;

                });

            },

		},

        
		created(){
            this.form.campaign_id = this.campaign;
            this.getCountry();
		},

        watch:{
            active:function(val){
                this.modalActive = val;
            },
            campaign:function(val){
                this.form.campaign_id = val;
            }
        }
	}

</script>